'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ChatProvider, useChat } from './ChatProvider';
import { ChatLauncher } from './ChatLauncher';

const DynamicChatWindow = dynamic(() => import('./ChatWindow').then(mod => mod.ChatWindow), {
  ssr: false,
});

const ChatWindowWrapper = () => {
  const { isOpen } = useChat();
  return isOpen ? <DynamicChatWindow /> : null;
};

export const GlobalChatAssistant = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null;

  return (
    <ChatProvider>
      <ChatLauncher />
      <ChatWindowWrapper />
    </ChatProvider>
  );
};
