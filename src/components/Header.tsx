'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Terminal, 
  Building2, 
  ShieldCheck, 
  Plus, 
  MessageSquare, 
  Users, 
  Flame, 
  Lock, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';
import { CurrentUser } from '../lib/types';

interface HeaderProps {
  currentUser: CurrentUser;
  activeTab: 'feed' | 'watercooler' | 'chat' | 'network';
  onSelectTab: (tab: 'feed' | 'watercooler' | 'chat' | 'network') => void;
  onOpenVerifyModal: () => void;
  onOpenCreatePostModal: () => void;
}

export function Header({ currentUser, activeTab, onSelectTab, onOpenVerifyModal, onOpenCreatePostModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: Array<{ id: 'feed' | 'watercooler' | 'chat' | 'network'; label: string; icon: any; isSpecial?: boolean }> = [
    { id: 'feed', label: 'Global Feed', icon: Flame },
    { 
      id: 'watercooler', 
      label: currentUser.isVerified ? `${currentUser.companyName} Lounge` : 'Company Watercooler', 
      icon: currentUser.isVerified ? Building2 : Lock,
      isSpecial: true
    },
    { id: 'chat', label: 'Dev Chat Rooms', icon: MessageSquare },
    { id: 'network', label: 'Dev & Referral Directory', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <button onClick={() => onSelectTab('feed')} className="flex items-center gap-2.5 group text-left">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500/20 transition-all">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-mono text-base font-bold text-white tracking-tight">
                <span>root@lab</span>
                <span className="text-emerald-400">:~$</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Verified Tech Network
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectTab(link.id)}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${link.isSpecial && !currentUser.isVerified ? 'text-amber-400' : 'text-emerald-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Verification Status */}
          {currentUser.isVerified ? (
            <button
              onClick={onOpenVerifyModal}
              className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-950/60 transition-colors"
            >
              <Building2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>[Verified @{currentUser.companyName}]</span>
            </button>
          ) : (
            <button
              onClick={onOpenVerifyModal}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-emerald-500 hover:text-emerald-300 transition-all shadow-sm"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Verify Work Email</span>
            </button>
          )}

          {/* New Post Button */}
          <button
            onClick={onOpenCreatePostModal}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Plus className="h-4 w-4" />
            <span>New Post</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenCreatePostModal}
            className="rounded-lg bg-emerald-500 p-1.5 text-slate-950"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-slate-800 p-1.5 text-slate-300"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-800/80 bg-slate-950 px-4 py-4 sm:hidden space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onSelectTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4 text-emerald-400" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-800 pt-3">
            {currentUser.isVerified ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVerifyModal();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 py-2 text-xs font-semibold text-emerald-300"
              >
                <Building2 className="h-4 w-4 text-emerald-400" />
                <span>[Verified @{currentUser.companyName}]</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVerifyModal();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 py-2 text-xs font-semibold text-slate-200"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Verify Work Email</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
