'use client';

import React, { useState } from 'react';
import { 
  Hash, 
  Send, 
  Terminal, 
  Code2, 
  Building2, 
  Users, 
  HelpCircle, 
  Wrench, 
  Sparkles 
} from 'lucide-react';
import { CurrentUser, ChatMessage } from '../lib/types';
import { getStoredChatMessages, saveStoredChatMessages } from '../lib/storage';

interface DevChatRoomsProps {
  currentUser: CurrentUser;
}

export function DevChatRooms({ currentUser }: DevChatRoomsProps) {
  const [chatStore, setChatStore] = useState<Record<string, ChatMessage[]>>(() => getStoredChatMessages());
  const [activeChannel, setActiveChannel] = useState('general-hall');
  const [messageText, setMessageText] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);

  const channels = [
    { id: 'general-hall', name: 'general-hall', topic: 'Global developer discussion & tech news', icon: Hash },
    { id: 'devops-triage', name: 'devops-triage', topic: 'Live incident triage, Docker & K8s errors', icon: Wrench },
    { id: 'interview-prep', name: 'interview-prep', topic: 'System design, LeetCode patterns & prep', icon: HelpCircle },
  ];

  const currentMessages = chatStore[activeChannel] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() && !codeSnippet.trim()) return;

    const newMessage: ChatMessage = {
      id: 'm-' + Date.now(),
      channelId: activeChannel,
      authorAlias: currentUser.alias || 'Dev_' + Math.floor(100 + Math.random() * 900),
      companyName: currentUser.isVerified ? currentUser.companyName : 'Community',
      isVerifiedOrg: currentUser.isVerified,
      content: messageText.trim(),
      codeSnippet: codeSnippet.trim() || undefined,
      codeLanguage: 'bash',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = {
      ...chatStore,
      [activeChannel]: [...currentMessages, newMessage]
    };

    setChatStore(updated);
    saveStoredChatMessages(updated);
    setMessageText('');
    setCodeSnippet('');
    setShowCodeInput(false);
  };

  const activeChannelMeta = channels.find((c) => c.id === activeChannel);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden flex flex-col md:flex-row h-[78vh]">
        {/* Channel Sidebar */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-900/60 p-4 shrink-0 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 px-2">
              <Terminal className="h-3.5 w-3.5 text-emerald-400" />
              <span>Channels</span>
            </div>

            <div className="space-y-1">
              {channels.map((chan) => {
                const isSelected = activeChannel === chan.id;
                const Icon = chan.icon;
                return (
                  <button
                    key={chan.id}
                    onClick={() => setActiveChannel(chan.id)}
                    className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-all text-left ${
                      isSelected
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">#{chan.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden md:block pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 space-y-1">
            <div className="text-slate-400 font-medium">Your Session</div>
            <div className="font-mono text-slate-300">{currentUser.alias}</div>
            {currentUser.isVerified ? (
              <span className="text-emerald-400 font-semibold">[Verified @{currentUser.companyName}]</span>
            ) : (
              <span className="text-slate-500">Unverified Community Member</span>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col h-full bg-slate-950">
          {/* Header */}
          <div className="border-b border-slate-800 bg-slate-900/40 px-5 py-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5 font-mono">
                <Hash className="h-4 w-4 text-emerald-400" />
                <span>{activeChannelMeta?.name}</span>
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">{activeChannelMeta?.topic}</p>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {currentMessages.length > 0 ? (
              currentMessages.map((msg) => (
                <div key={msg.id} className="flex gap-3 text-xs">
                  <div className="h-8 w-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-slate-300 shrink-0">
                    {msg.authorAlias.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 rounded-xl border border-slate-800/80 bg-slate-900/50 p-3 space-y-1.5">
                    <div className="flex items-center justify-between text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-200">{msg.authorAlias}</span>
                        {msg.isVerifiedOrg ? (
                          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                            <Building2 className="h-2.5 w-2.5" />
                            [Verified @{msg.companyName}]
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500">@{msg.companyName}</span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                    </div>

                    <p className="text-slate-300 leading-relaxed font-sans">{msg.content}</p>

                    {msg.codeSnippet && (
                      <pre className="rounded-lg bg-black/60 p-2.5 font-mono text-[11px] text-emerald-400 overflow-x-auto border border-slate-800">
                        <code>{msg.codeSnippet}</code>
                      </pre>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                No messages yet in #{activeChannel}. Say hello!
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-slate-800 bg-slate-900/50 p-4">
            <form onSubmit={handleSendMessage} className="space-y-2">
              {showCodeInput && (
                <textarea
                  rows={3}
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  placeholder="Paste bash script, python code, or error logs..."
                  className="w-full rounded-xl border border-slate-800 bg-black/60 p-2.5 font-mono text-xs text-emerald-300 placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                />
              )}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowCodeInput(!showCodeInput)}
                  className={`rounded-xl border p-2.5 text-xs transition-colors ${
                    showCodeInput
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                  title="Add code snippet"
                >
                  <Code2 className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder={`Message #${activeChannelMeta?.name}...`}
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-950 py-2.5 px-4 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
