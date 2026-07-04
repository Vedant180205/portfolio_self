'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useChat } from './ChatProvider';

export const ChatInput = () => {
  const { input, setInput, sendMessage, isTyping, messageLimit } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);
  const atLimit = messageLimit.used >= messageLimit.max;

  // Auto-resize textarea to fit content, capped at 120px
  const resize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, []);

  useEffect(() => { resize(); }, [input, resize]);

  const handleSend = () => {
    if (input.trim() && !isTyping && !atLimit) sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const disabled = isTyping || atLimit;

  return (
    <div style={{ padding: '12px 16px 16px', flexShrink: 0 }}>
      <div style={{
        background: '#111111',
        border: `1px solid ${focused ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '8px',
        padding: '6px 6px 6px 14px',
        transition: 'border-color 0.2s ease',
      }}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => { setInput(e.target.value); resize(); }}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={atLimit ? 'Session limit reached' : 'Ask anything...'}
          disabled={disabled}
          rows={1}
          aria-label="Type your message"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: disabled ? 'rgba(228,228,231,0.4)' : '#e4e4e7',
            fontSize: '13px',
            lineHeight: 1.5,
            resize: 'none',
            minHeight: '36px',
            maxHeight: '120px',
            padding: '6px 0',
            fontFamily: 'inherit',
            overflowY: 'auto',
          }}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          aria-label="Send message"
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: input.trim() && !disabled ? '#ffffff' : 'rgba(255,255,255,0.06)',
            border: 'none',
            cursor: input.trim() && !disabled ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: input.trim() && !disabled ? '#0a0a0a' : 'rgba(255,255,255,0.2)',
            flexShrink: 0,
            transition: 'all 0.15s ease',
            padding: 0,
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
