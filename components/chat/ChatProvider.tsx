'use client';
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import { Message, ChatStateContextType, ChatStreamContextType } from './types';
import { sendMessage as sendApiMessage, loadSearchIndex } from '../../lib/chat/assistant';
import { CHAT_LIMITS } from './constants';

// ── Two separate contexts ───────────────────────────────────────────────────
//
//  ChatStateContext  — stable during streaming (settledMessages never mutates
//                      while tokens are flowing). Consumers: Header, Input,
//                      Launcher, Window, ChatMessages.
//
//  ChatStreamContext — hot during streaming (~60 fps). The ONLY consumer is
//                      StreamingBubble. Every other component is unaffected.
//
const ChatStateContext  = createContext<ChatStateContextType  | undefined>(undefined);
const ChatStreamContext = createContext<ChatStreamContextType | undefined>(undefined);

// ── Session count helpers ────────────────────────────────────────────────────
function readCount(): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(sessionStorage.getItem(CHAT_LIMITS.SESSION_KEY) ?? '0', 10);
}
function writeCount(n: number) {
  sessionStorage.setItem(CHAT_LIMITS.SESSION_KEY, String(n));
}

// ── Provider ─────────────────────────────────────────────────────────────────
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // — Stable state (ChatStateContext) —
  const [isOpen,           setIsOpen]         = useState(false);
  const [settledMessages,  setSettledMessages] = useState<Message[]>([]);
  const [input,            setInput]           = useState('');
  const [isTyping,         setIsTyping]        = useState(false);
  const [sessionCount,     setSessionCount]    = useState(0);

  // — Hot state (ChatStreamContext) —
  const [streamingContent, setStreamingContent] = useState('');
  const [isStreaming,      setIsStreaming]       = useState(false);

  // Ref so callbacks always read current settled messages without depending on them
  const settledRef = useRef<Message[]>([]);
  useEffect(() => { settledRef.current = settledMessages; }, [settledMessages]);

  // Hydrate session count after mount
  useEffect(() => { setSessionCount(readCount()); }, []);

  // Preload BM25 index on first open (eliminates latency on first send)
  const hasPreloaded = useRef(false);
  useEffect(() => {
    if (isOpen && !hasPreloaded.current) {
      hasPreloaded.current = true;
      loadSearchIndex();
    }
  }, [isOpen]);

  const openChat  = useCallback(() => setIsOpen(true),  []);
  const closeChat = useCallback(() => setIsOpen(false), []);

  // Memoized explicitly — both deps only change at stream boundaries (start/end),
  // never per-token. This ensures stateValue never picks up a mid-stream change.
  const suggestionsVisible = useMemo(
    () => settledMessages.length === 0 && !isStreaming,
    [settledMessages, isStreaming]
  );

  const sendMessage = useCallback(async (question: string) => {
    if (!question.trim() || isTyping) return;
    if (sessionCount >= CHAT_LIMITS.MAX_MESSAGES_PER_SESSION) return;

    const newCount = sessionCount + 1;
    setSessionCount(newCount);
    writeCount(newCount);

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: question };

    // Snapshot history before mutating state
    const history = settledRef.current;

    // Update stable context: add user message, enable typing guard
    setSettledMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Update hot context: start streaming
    setStreamingContent('');
    setIsStreaming(true);

    // rAF-batched token accumulation — ONLY setStreamingContent is called per frame.
    // Nothing in ChatStateContext changes until the stream completes.
    let accumulated = '';
    let rafId: number | null = null;
    let done = false;

    const flush = () => {
      setStreamingContent(accumulated);
      rafId = null;
    };

    await sendApiMessage(
      question,
      history,
      // onToken — triggers ~60fps rAF flush into ChatStreamContext only
      (token: string) => {
        accumulated += token;
        if (!rafId) rafId = requestAnimationFrame(flush);
      },
      // onError
      (error: Error) => {
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        const msg = error.message.includes('Rate limit')
          ? '⚠️ Too many requests. Please wait a moment.'
          : '❌ Something went wrong. Please try again.';
        const errMsg: Message = { id: crypto.randomUUID(), role: 'assistant', content: msg };
        // Settle the error message, stop streaming
        setSettledMessages(prev => [...prev, errMsg]);
        setIsStreaming(false);
        setStreamingContent('');
        setIsTyping(false);
        done = true;
      },
      // onComplete — move streamed content into settledMessages, clear hot state
      () => {
        if (done) return;
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        const finalContent = accumulated;
        const assistantMsg: Message = {
          id:      crypto.randomUUID(),
          role:    'assistant',
          content: finalContent,
        };
        // React 18 batches these four updates into one render pass:
        setSettledMessages(prev => [...prev, assistantMsg]);
        setIsStreaming(false);
        setStreamingContent('');
        setIsTyping(false);
      }
    );
  }, [isTyping, sessionCount]);

  const messageLimit = useMemo(
    () => ({ used: sessionCount, max: CHAT_LIMITS.MAX_MESSAGES_PER_SESSION }),
    [sessionCount]
  );

  // ── Memoized context values ─────────────────────────────────────────────
  // stateValue must NOT change while streaming is in progress.
  // The only deps that change during streaming are: none ✓
  const stateValue = useMemo<ChatStateContextType>(() => ({
    isOpen, settledMessages, input, isTyping, messageLimit,
    setIsOpen, setInput, openChat, closeChat, sendMessage, suggestionsVisible,
  }), [isOpen, settledMessages, input, isTyping, messageLimit, openChat, closeChat, sendMessage, suggestionsVisible]);

  // streamValue changes per rAF frame during streaming.
  const streamValue = useMemo<ChatStreamContextType>(
    () => ({ streamingContent, isStreaming }),
    [streamingContent, isStreaming]
  );

  return (
    <ChatStateContext.Provider value={stateValue}>
      <ChatStreamContext.Provider value={streamValue}>
        {children}
      </ChatStreamContext.Provider>
    </ChatStateContext.Provider>
  );
};

// ── Hooks ────────────────────────────────────────────────────────────────────
export const useChatState = (): ChatStateContextType => {
  const ctx = useContext(ChatStateContext);
  if (!ctx) throw new Error('useChatState must be used within ChatProvider');
  return ctx;
};

export const useChatStream = (): ChatStreamContextType => {
  const ctx = useContext(ChatStreamContext);
  if (!ctx) throw new Error('useChatStream must be used within ChatProvider');
  return ctx;
};

// Backward-compat alias — all existing useChat() callers (Header, Launcher, Window, Input)
// continue to work without changes and subscribe only to the stable ChatStateContext.
export const useChat = useChatState;
