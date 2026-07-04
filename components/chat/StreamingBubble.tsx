'use client';
import React, { memo, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStream } from './ChatProvider';
import { messageVariants } from './animations';

/**
 * The ONLY consumer of ChatStreamContext.
 *
 * Re-renders per rAF frame while a response is streaming (~60 fps).
 * All other chat components are completely unaffected during streaming.
 *
 * Wrapped in memo() with no props — ChatMessages renders it unconditionally
 * and memo ensures ChatMessages re-renders don't propagate into this component.
 * This component re-renders only when ChatStreamContext changes.
 */
export const StreamingBubble = memo(() => {
  const { streamingContent, isStreaming } = useChatStream();

  // Auto-scroll the parent log container while content grows.
  // Since this component re-renders per frame we get smooth scroll tracking.
  const selfRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const log = selfRef.current?.closest('[role="log"]') as HTMLDivElement | null;
    if (!log) return;
    const dist = log.scrollHeight - log.scrollTop - log.clientHeight;
    if (dist < 160) log.scrollTop = log.scrollHeight;
  }, [streamingContent]);

  return (
    <AnimatePresence>
      {isStreaming && (
        <motion.div
          ref={selfRef}
          variants={messageVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          <div style={{
            maxWidth: '90%',
            background: '#111111',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '14px 16px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
          }}>
            {/* Bubble header */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', marginBottom: '10px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '18px', height: '18px', borderRadius: '50%',
                  background: '#0a0a0a', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)',
                  flexShrink: 0,
                }}>
                  <img src="/ui/chat-icon.png" alt="" style={{ width: '12px', height: '12px', objectFit: 'contain' }} />
                </div>
                <span style={{ color: '#ffffff', fontSize: '11px', fontWeight: 600 }}>AI Assistant</span>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '2px 8px', borderRadius: '20px',
                background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
              }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#3b82f6', flexShrink: 0 }} />
                <span style={{ color: '#60a5fa', fontSize: '10px', fontWeight: 500 }}>AI Agent</span>
              </div>
            </div>

            {/* Content: markdown stream OR typing dots */}
            <div style={{ color: '#e4e4e7', fontSize: '13px', lineHeight: 1.65, wordBreak: 'break-word' }}>
              {streamingContent ? (
                <ReactMarkdown
                  components={{
                    p:          ({ children }) => <p style={{ margin: '0 0 8px 0', lineHeight: 1.65 }}>{children}</p>,
                    strong:     ({ children }) => <strong style={{ color: '#ffffff', fontWeight: 600 }}>{children}</strong>,
                    em:         ({ children }) => <em style={{ color: '#a1a1aa' }}>{children}</em>,
                    ul:         ({ children }) => <ul style={{ margin: '6px 0', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>{children}</ul>,
                    ol:         ({ children }) => <ol style={{ margin: '6px 0', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>{children}</ol>,
                    li:         ({ children }) => <li style={{ color: '#e4e4e7', lineHeight: 1.6 }}>{children}</li>,
                    code:       ({ children }) => <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: '4px', fontSize: '12px', fontFamily: 'monospace', color: '#a5b4fc' }}>{children}</code>,
                    pre:        ({ children }) => <pre style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '10px', borderRadius: '8px', overflowX: 'auto', margin: '8px 0', fontSize: '12px' }}>{children}</pre>,
                    h1:         ({ children }) => <h1 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, margin: '8px 0 4px' }}>{children}</h1>,
                    h2:         ({ children }) => <h2 style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, margin: '8px 0 4px' }}>{children}</h2>,
                    h3:         ({ children }) => <h3 style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600, margin: '6px 0 4px' }}>{children}</h3>,
                    a:          ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'underline', textUnderlineOffset: '2px' }}>{children}</a>,
                    hr:         () => <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '10px 0' }} />,
                    blockquote: ({ children }) => <blockquote style={{ borderLeft: '2px solid rgba(255,255,255,0.15)', paddingLeft: '12px', margin: '8px 0', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>{children}</blockquote>,
                  }}
                >
                  {streamingContent}
                </ReactMarkdown>
              ) : (
                /* Typing indicator — shown before first token arrives */
                <span style={{ display: 'inline-flex', gap: '3px', alignItems: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: '#a1a1aa',
                      animation: `chat-bounce 1s ease-in-out ${i * 0.15}s infinite`,
                      display: 'inline-block',
                    }} />
                  ))}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

StreamingBubble.displayName = 'StreamingBubble';
