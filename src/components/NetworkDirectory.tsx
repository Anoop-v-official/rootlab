'use client';

import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Building2, 
  Briefcase, 
  MapPin, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  X,
  ExternalLink,
  Code
} from 'lucide-react';
import { DeveloperProfile, CurrentUser } from '../lib/types';
import { getStoredDevelopers } from '../lib/storage';

interface NetworkDirectoryProps {
  currentUser: CurrentUser;
}

export function NetworkDirectory({ currentUser }: NetworkDirectoryProps) {
  const [developers] = useState<DeveloperProfile[]>(() => getStoredDevelopers());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Connection Modal
  const [activeDev, setActiveDev] = useState<DeveloperProfile | null>(null);
  const [connectionNote, setConnectionNote] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  const filteredDevs = useMemo(() => {
    return developers.filter((dev) => {
      if (filterStatus !== 'all' && dev.referralStatus !== filterStatus) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = dev.alias.toLowerCase().includes(q);
        const matchCompany = dev.companyName.toLowerCase().includes(q);
        const matchRole = dev.role.toLowerCase().includes(q);
        const matchSkills = dev.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchName && !matchCompany && !matchRole && !matchSkills) {
          return false;
        }
      }
      return true;
    });
  }, [developers, searchQuery, filterStatus]);

  const handleSendConnection = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true);
    setTimeout(() => {
      setRequestSent(false);
      setActiveDev(null);
      setConnectionNote('');
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-400" />
            <span>Developer Directory & Referral Network</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Connect directly with verified software engineers, SREs, and architects open to referrals or collaboration.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by skill (Kubernetes, Go, AWS), company (Google, Stripe), or role..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Engineers' },
            { id: 'offering_referral', label: '🤝 Offering Referral' },
            { id: 'seeking_referral', label: '🎯 Seeking Referral' },
            { id: 'open_to_collab', label: '🚀 Open to Collab' }
          ].map((status) => (
            <button
              key={status.id}
              onClick={() => setFilterStatus(status.id)}
              className={`shrink-0 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                filterStatus === status.id
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Developers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDevs.map((dev) => (
          <div
            key={dev.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 hover:border-slate-700/80 hover:bg-slate-900/60 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Profile Card Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-400">
                    {dev.alias.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-mono">{dev.alias}</h3>
                    <div className="flex items-center gap-1.5 text-[11px] mt-0.5">
                      <span className="font-semibold text-emerald-400 flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        [Verified @{dev.companyName}]
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                {dev.referralStatus === 'offering_referral' && (
                  <span className="rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                    🤝 Referral Open
                  </span>
                )}
                {dev.referralStatus === 'seeking_referral' && (
                  <span className="rounded-lg bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 text-[10px] font-bold text-cyan-300">
                    🎯 Seeking Role
                  </span>
                )}
                {dev.referralStatus === 'open_to_collab' && (
                  <span className="rounded-lg bg-purple-500/15 border border-purple-500/30 px-2 py-0.5 text-[10px] font-bold text-purple-300">
                    🚀 Open Collab
                  </span>
                )}
              </div>

              {/* Role & Location */}
              <div className="space-y-1 mb-3 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 font-medium">
                  <Briefcase className="h-3.5 w-3.5 text-slate-500" />
                  <span>{dev.role}</span>
                  <span className="text-slate-500">({dev.experienceYears}y exp)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  <span>{dev.location}</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-400 mb-4 leading-relaxed font-sans">{dev.bio}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {dev.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="rounded-md border border-slate-800 bg-slate-950 px-2 py-0.5 font-mono text-[10px] text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between">
              {dev.githubUrl ? (
                <a
                  href={dev.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono"
                >
                  <Code className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              ) : (
                <span />
              )}

              <button
                onClick={() => setActiveDev(dev)}
                className="rounded-xl bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>
                  {dev.referralStatus === 'offering_referral' ? 'Request Referral' : 'Send Message'}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Connect Modal */}
      {activeDev && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
            <button
              onClick={() => setActiveDev(null)}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-900 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {requestSent ? (
              <div className="py-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Message Dispatched!</h4>
                <p className="text-xs text-slate-400">
                  Your message has been sent to <strong className="text-emerald-300">@{activeDev.alias}</strong>.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Connect with {activeDev.alias}
                </h3>
                <p className="text-xs text-emerald-400 font-semibold mb-3">
                  [Verified @{activeDev.companyName}] • {activeDev.role}
                </p>

                <form onSubmit={handleSendConnection} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {activeDev.referralStatus === 'offering_referral'
                        ? 'Referral Application Note (Experience, Portfolio, LinkedIn)'
                        : 'Your Message'}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={connectionNote}
                      onChange={(e) => setConnectionNote(e.target.value)}
                      placeholder="Hi! I came across your profile and would love to connect..."
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none font-sans"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveDev(null)}
                      className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 flex items-center gap-1.5"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Send Direct Message</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
