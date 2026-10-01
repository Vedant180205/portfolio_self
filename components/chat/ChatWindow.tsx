'use client';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from './ChatProvider';
import { windowVariants } from './animations';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

export const ChatWindow = () => {
  const { isOpen, closeChat } = useChat();
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeChat();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (windowRef.current && !windowRef.current.contains(e.target as Node)) {
        closeChat();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      setTimeout(() => document.addEventListener('mousedown', handleClickOutside), 50);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeChat]);

  return createPortal(
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="chat-window-overlay">
            <motion.div
              ref={windowRef}
              variants={windowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label="AI Assistant Chat"
              data-lenis-prevent
              className="chat-window-scrollbar"
              style={{
                width: '100%',
                maxWidth: '380px',
                height: 'calc(100dvh - 110px)',
                maxHeight: '620px',
                minHeight: '300px',
                background: 'rgba(13, 13, 13, 0.97)',
                borderRadius: '20px 20px 0 0',
                border: '1px solid rgba(255,255,255,0.08)',
                borderBottom: 'none',
                boxShadow: '0 -8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                fontFamily: 'inherit',
                position: 'relative',
              }}
            >
              {/* Floating close button */}
              <button
                onClick={closeChat}
                aria-label="Close chat"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  zIndex: 10,
                  flexShrink: 0,
                  transition: 'all 0.15s ease',
                  padding: 0,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)';
                }}
              >
                ✕
              </button>
              <ChatMessages />
              <ChatInput />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
};
