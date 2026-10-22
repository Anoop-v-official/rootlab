'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Lock, 
  ShieldCheck, 
  Send, 
  Users, 
  Coffee, 
  Sparkles, 
  MessageSquare,
  Code2
} from 'lucide-react';
import { CurrentUser, ChatMessage } from '../lib/types';
import { getStoredChatMessages, saveStoredChatMessages } from '../lib/storage';

interface WatercoolerChatProps {
  currentUser: CurrentUser;
  onOpenVerifyModal: () => void;
}

export function WatercoolerChat({ currentUser, onOpenVerifyModal }: WatercoolerChatProps) {
  const [chatStore, setChatStore] = useState<Record<string, ChatMessage[]>>(() => getStoredChatMessages());
  const [messageText, setMessageText] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);

  const companyChannelId = currentUser.isVerified 
    ? `watercooler-${currentUser.companyDomain || 'company.com'}`
    : 'watercooler-locked';

  const messages = chatStore[companyChannelId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() && !codeSnippet.trim()) return;

    const newMessage: ChatMessage = {
      id: 'wm-' + Date.now(),
      channelId: companyChannelId,
      authorAlias: currentUser.alias || 'Dev_' + Math.floor(100 + Math.random() * 900),
      companyName: currentUser.companyName,
      isVerifiedOrg: true,
      content: messageText.trim(),
      codeSnippet: codeSnippet.trim() || undefined,
      codeLanguage: 'bash',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = {
      ...chatStore,
      [companyChannelId]: [...messages, newMessage]
    };

    setChatStore(updated);
    saveStoredChatMessages(updated);
    setMessageText('');
    setCodeSnippet('');
    setShowCodeInput(false);
  };

  // If NOT verified: Show locked watercooler teaser
  if (!currentUser.isVerified) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-center shadow-2xl relative overflow-hidden">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Lock className="h-8 w-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-400 mb-3">
            <Building2 className="h-3.5 w-3.5" />
            <span>Organization Domain Required</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            The Private Company Watercooler
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed mb-6">
            A private, encrypted lounge restricted strictly to colleagues with verified emails from your organization (e.g. <span className="font-mono text-emerald-400">@google.com</span>, <span className="font-mono text-emerald-400">@amazon.com</span>, <span className="font-mono text-emerald-400">@tcs.com</span>).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto mb-8 text-left">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs">
              <span className="font-bold text-emerald-400 block mb-1">💰 Salary & Bands</span>
              <p className="text-slate-400">Discuss appraisal ratings, bonus multipliers, and pay bands without HR snooping.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs">
              <span className="font-bold text-cyan-400 block mb-1">🏢 Internal Culture</span>
              <p className="text-slate-400">Unfiltered reviews of VP reorganizations, return-to-office, and project shifts.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs">
              <span className="font-bold text-purple-400 block mb-1">🛡️ Zero Trace</span>
              <p className="text-slate-400">Your email is salted and discarded. Posts use an anonymous alias.</p>
            </div>
          </div>

          <button
            onClick={onOpenVerifyModal}
            className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
          >
            Verify Work Email to Unlock Your Lounge
          </button>
        </div>
      </div>
    );
  }

  // If VERIFIED: Show the company's private live watercooler
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden flex flex-col h-[75vh]">
        {/* Header */}
        <div className="border-b border-slate-800 bg-slate-900/80 px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  {currentUser.companyName} Private Watercooler
                </h2>
                <span className="rounded-md bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-bold text-emerald-300 font-mono">
                  @{currentUser.companyDomain}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Restricted to verified {currentUser.companyName} staff</span>
              </div>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400">Posting as:</span>
            <div className="font-mono text-xs font-bold text-emerald-400">{currentUser.alias}</div>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg.id} className="flex gap-3 text-xs">
                <div className="h-8 w-8 rounded-lg bg-emerald-950/60 border border-emerald-700/50 flex items-center justify-center font-mono font-bold text-emerald-300 shrink-0">
                  {msg.authorAlias.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 space-y-1.5">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="font-mono font-semibold text-slate-200">{msg.authorAlias}</span>
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
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <Coffee className="h-10 w-10 mb-2 text-slate-600" />
              <p className="text-sm font-medium text-slate-400">The watercooler is quiet today.</p>
              <p className="text-xs">Be the first to share an update, question, or discussion with your colleagues!</p>
            </div>
          )}
        </div>

        {/* Message Composer */}
        <div className="border-t border-slate-800 bg-slate-900/50 p-4">
          <form onSubmit={handleSendMessage} className="space-y-2">
            {showCodeInput && (
              <textarea
                rows={3}
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                placeholder="Paste bash script, snippet, or error log here..."
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
                title="Attach code snippet"
              >
                <Code2 className="h-4 w-4" />
              </button>
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={`Message #${currentUser.companyName.toLowerCase()}-watercooler anonymously...`}
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
  );
}
