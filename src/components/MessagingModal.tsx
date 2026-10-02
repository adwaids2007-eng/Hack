'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Message, Profile } from '../types';

interface MessagingModalProps {
  currentUser: Profile;
  targetUserId: string;
  targetUserName: string;
  messages: Message[];
  onClose: () => void;
  onSendMessage: (text: string) => void;
}

export const MessagingModal: React.FC<MessagingModalProps> = ({
  currentUser,
  targetUserId,
  targetUserName,
  messages,
  onClose,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversationMessages = messages.filter(
    (m) =>
      (m.sender_id === currentUser.id && m.receiver_id === targetUserId) ||
      (m.sender_id === targetUserId && m.receiver_id === currentUser.id)
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/40 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-surface-container-lowest max-w-md w-full rounded-2xl border border-outline-variant shadow-xl overflow-hidden flex flex-col h-[520px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 border-b border-outline-variant/40 bg-surface">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs">
              {targetUserName[0]}
            </div>
            <div>
              <h3 className="text-title-md font-semibold text-on-surface">{targetUserName}</h3>
              <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Active on Campus
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface/50">
          {conversationMessages.length === 0 ? (
            <div className="text-center py-8 space-y-1">
              <span className="material-symbols-outlined text-[32px] text-outline">forum</span>
              <p className="text-body-sm text-on-surface-variant font-medium">
                Start conversation with {targetUserName}
              </p>
              <p className="text-[11px] text-outline">Ask about custom orders, dimensions, or pickup times.</p>
            </div>
          ) : (
            conversationMessages.map((msg) => {
              const isMine = msg.sender_id === currentUser.id;

              return (
                <div key={msg.id} className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-body-sm shadow-2xs ${
                      isMine
                        ? 'bg-primary text-on-primary rounded-br-xs'
                        : 'bg-surface-container-high text-on-surface rounded-bl-xs border border-outline-variant/40'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.message}</p>
                  </div>
                  <span className="text-[10px] text-outline mt-0.5 px-1">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={handleSend} className="p-3 bg-surface border-t border-outline-variant/40 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2.5 rounded-full bg-surface-container-lowest border border-outline-variant focus:border-primary-container text-body-sm outline-none px-4"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container transition-colors disabled:opacity-40 shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
