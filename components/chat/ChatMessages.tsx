'use client';
import React, { useEffect, useRef } from 'react';
import { useChatState } from './ChatProvider';
import { MessageBubble } from './MessageBubble';
import { StreamingBubble } from './StreamingBubble';
import { WELCOME_MESSAGE, SUGGESTED_QUESTIONS, CHAT_LIMITS } from './constants';
import { motion } from 'framer-motion';
import { staggerContainer, chipVariants } from './animations';

/**
 * Subscribes ONLY to ChatStateContext (settledMessages).
 *
 * This component does NOT re-render during streaming — it re-renders only when:
 *   • A message settles  (stream start: userMsg added; stream end: assistantMsg added)
 *   • Input/open state changes
 *
 * The hot StreamingBubble child handles its own updates via ChatStreamContext.
 * memo() on MessageBubble children ensures settled bubbles never re-render.
 */
export const ChatMessages = () => {
  const {
    settledMessages,
    suggestionsVisible,
    sendMessage,
    messageLimit,
  } = useChatState();

  const containerRef   = useRef<HTMLDivElement>(null);
  const bottomRef      = useRef<HTMLDivElement>(null);

  // Scroll to bottom when settled messages change (stream start / stream end).
  // Mid-stream scrolling is handled inside StreamingBubble itself.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const dist = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (dist < 150) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [settledMessages]);

  const atLimit   = messageLimit.used >= messageLimit.max;
  const remaining = messageLimit.max - messageLimit.used;

  return (
    <div
      ref={containerRef}
      role="log"
      aria-live="polite"
      className="chat-window-scrollbar"
      style={{
        flex: 1, overflowY: 'auto', overflowX: 'hidden',
        padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px',
      }}
    >
      {suggestionsVisible ? (
        /* ── Welcome / suggestion screen ─────────────────────────────────── */
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          height: '100%', textAlign: 'center', padding: '20px 0',
        }}>
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <div style={{
              width: 'clamp(72px, 15vw, 96px)', height: 'clamp(72px, 15vw, 96px)', borderRadius: '50%',
              background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img src="/ui/chat-icon.png" alt="" style={{ width: 'clamp(40px, 8vw, 56px)', height: 'clamp(40px, 8vw, 56px)', objectFit: 'contain' }} />
            </div>
            <div style={{
              position: 'absolute', bottom: '2px', right: '4px',
              width: 'clamp(16px, 3vw, 20px)', height: 'clamp(16px, 3vw, 20px)', borderRadius: '50%',
              background: '#10b981', border: '3px solid #0d0d0d',
            }} />
          </div>

          <h2 style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
            {WELCOME_MESSAGE.title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', maxWidth: '260px', lineHeight: 1.6, marginBottom: '24px' }}>
            {WELCOME_MESSAGE.description}
          </p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxWidth: '300px' }}
          >
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <motion.button
                key={i}
                variants={chipVariants}
                onClick={() => sendMessage(q)}
                disabled={atLimit}
                style={{
                  padding: '8px 14px', borderRadius: '20px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.8)', fontSize: '12px',
                  cursor: atLimit ? 'not-allowed' : 'pointer',
                  transition: 'all 0.15s ease', whiteSpace: 'nowrap',
                  fontFamily: 'inherit', opacity: atLimit ? 0.4 : 1,
                }}
                onMouseEnter={e => {
                  if (atLimit) return;
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.8)';
                }}
              >
                {q}
              </motion.button>
            ))}
          </motion.div>
        </div>
      ) : (
        /* ── Message list ─────────────────────────────────────────────────── */
        <>
          {settledMessages.map((msg, idx) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isNew={idx >= settledMessages.length - 2}
            />
          ))}

          {/*
           * StreamingBubble is always mounted here but returns null when idle.
           * memo() with no props means ChatMessages re-renders (on settle events)
           * do NOT cascade into StreamingBubble.
           */}
          <StreamingBubble />
        </>
      )}

      {/* Session limit warning */}
      {!suggestionsVisible && remaining <= 5 && !atLimit && (
        <div style={{
          textAlign: 'center', fontSize: '11px', padding: '4px 0',
          color: remaining <= 2 ? '#f87171' : 'rgba(255,255,255,0.3)',
        }}>
          {remaining} message{remaining !== 1 ? 's' : ''} remaining this session
        </div>
      )}

      {atLimit && (
        <div style={{
          textAlign: 'center', padding: '12px 16px', borderRadius: '12px',
          background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)',
          color: '#f87171', fontSize: '12px', lineHeight: 1.5,
        }}>
          Session limit reached. Refresh the page to start a new session.
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};
