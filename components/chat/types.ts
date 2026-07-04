export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

/** Stable context — only updates when messages settle or input/open state changes.
 *  Consumers do NOT re-render during streaming token accumulation. */
export interface ChatStateContextType {
  isOpen: boolean;
  /** Completed messages only — never mutates while a response is streaming. */
  settledMessages: Message[];
  input: string;
  /** True while a stream is active. Only flips twice per exchange (start / end). */
  isTyping: boolean;
  messageLimit: { used: number; max: number };
  setIsOpen: (open: boolean) => void;
  setInput: (input: string) => void;
  openChat: () => void;
  closeChat: () => void;
  sendMessage: (question: string) => Promise<void>;
  suggestionsVisible: boolean;
}

/** Hot context — updates ~60 fps during streaming.
 *  Only StreamingBubble should subscribe to this. */
export interface ChatStreamContextType {
  streamingContent: string;
  isStreaming: boolean;
}

// Backward-compat alias so existing useChat() callers compile without changes.
export type ChatContextType = ChatStateContextType;
