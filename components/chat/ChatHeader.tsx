'use client';
import React from 'react';
import { useChat } from './ChatProvider';

export const ChatHeader = () => {
  const { closeChat } = useChat();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      flexShrink: 0,
    }}>
      <div>
          <div style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, letterSpacing: '0.01em', lineHeight: 1.2 }}>
            Agent Noir at your service
          </div>
          <div style={{ color: '#10b981', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '3px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            Online
          </div>
        </div>
      <button
        onClick={closeChat}
        aria-label="Close chat"
        style={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'transparent',
          color: 'rgba(255,255,255,0.5)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          lineHeight: 1,
          flexShrink: 0,
          transition: 'all 0.15s ease',
          padding: 0,
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)';
          (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)';
        }}
      >
        ✕
      </button>
    </div>
  );
};
