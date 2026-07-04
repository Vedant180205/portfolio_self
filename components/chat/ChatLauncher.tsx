'use client';
import React, { memo } from 'react';
import { useChat } from './ChatProvider';

export const ChatLauncher = memo(() => {
  const { isOpen, openChat } = useChat();

  return (
    <button
      onClick={openChat}
      aria-label="Open AI Assistant"
      className="chat-launcher-btn"
      style={{
        position: 'fixed',
        zIndex: 99999,
        background: 'transparent',
        border: 'none',
        cursor: isOpen ? 'default' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        outline: 'none',
        flexShrink: 0,
        boxSizing: 'border-box',
        pointerEvents: isOpen ? 'none' : 'auto',
        borderRadius: '50%',
        overflow: 'hidden',
        opacity: isOpen ? 0 : 1,
        transition: 'opacity 0.2s ease-in-out',
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        controls={false}
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          pointerEvents: 'none',
          display: 'block',
          mixBlendMode: 'screen',
        }}
      >
        <source src="/chatbot_vid.webm" type="video/webm" />
      </video>
    </button>
  );
});

ChatLauncher.displayName = 'ChatLauncher';
