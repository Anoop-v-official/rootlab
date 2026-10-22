'use client';

import React, { useState } from 'react';
import { X, Send, Briefcase, HelpCircle, MessageSquareWarning, Wrench, ShieldAlert } from 'lucide-react';
import { Post, PostCategory, CurrentUser } from '../lib/types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: CurrentUser;
  onPostCreated: (newPost: Post) => void;
}

export function CreatePostModal({ isOpen, onClose, currentUser, onPostCreated }: CreatePostModalProps) {
  const [category, setCategory] = useState<PostCategory>('referrals');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [location, setLocation] = useState('');
  const [salaryTc, setSalaryTc] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [referralLinkAvailable, setReferralLinkAvailable] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Please provide a title and post description.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const newPost: Post = {
      id: 'post-' + Date.now(),
      title: title.trim(),
      content: content.trim(),
      category: category === 'all' ? 'engineering' : category,
      authorAlias: currentUser.alias || 'Dev_' + Math.floor(100 + Math.random() * 900),
      companyName: currentUser.isVerified ? currentUser.companyName : 'Community Member',
      companyDomain: currentUser.companyDomain || '',
      isVerifiedOrg: currentUser.isVerified,
      roleTitle: roleTitle.trim() || undefined,
      location: location.trim() || undefined,
      salaryTc: salaryTc.trim() || undefined,
      upvotes: 1,
      commentsCount: 0,
      tags: tags.length > 0 ? tags : [category.toUpperCase()],
      createdAt: 'Just now',
      referralLinkAvailable: category === 'referrals' ? referralLinkAvailable : undefined,
      comments: []
    };

    onPostCreated(newPost);
    onClose();
  };

  const categories = [
    { id: 'referrals', label: '🤝 Job Referral', icon: Briefcase, color: 'text-emerald-400' },
    { id: 'interviews', label: '🎯 Interview Intel & TC', icon: HelpCircle, color: 'text-cyan-400' },
    { id: 'gossip', label: '☕ IT Gossip & News', icon: MessageSquareWarning, color: 'text-amber-400' },
    { id: 'engineering', label: '🛠️ DevOps / Eng Postmortem', icon: Wrench, color: 'text-indigo-400' },
    { id: 'security', label: '🛡️ Security & Bug Bounty', icon: ShieldAlert, color: 'text-rose-400' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-900 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4">
          <h3 className="text-xl font-bold text-white">Create New Post / Discussion</h3>
          <p className="text-xs text-slate-400">
            Posting as{' '}
            <span className="font-semibold text-slate-200">{currentUser.alias}</span>{' '}
            {currentUser.isVerified ? (
              <span className="text-emerald-400 font-mono">
                [Verified @{currentUser.companyName}]
              </span>
            ) : (
              <span className="text-slate-500">(Unverified)</span>
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Select Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categories.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id as PostCategory)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all text-left ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-sm'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span className={cat.color}>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Headline / Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                category === 'referrals'
                  ? 'e.g. Hiring 3x Senior DevOps / SRE in Cloud Platform (Direct Team Referral)'
                  : category === 'interviews'
                  ? 'e.g. Google L5 SRE Interview Breakdown: Real Questions & NALSD Round'
                  : category === 'gossip'
                  ? 'e.g. Mandatory 5-Day RTO Policy Leaked in All-Hands'
                  : 'e.g. Production Outage Postmortem: How OOMKilled crashed our Ingress'
              }
              className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 px-3.5 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Conditional Fields for Referrals & Interviews */}
          {(category === 'referrals' || category === 'interviews') && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-xl border border-slate-800/80 bg-slate-900/30 p-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Role / Level</label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  placeholder="e.g. Senior SRE, Staff Architect"
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 py-1.5 px-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Location / Remote</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Remote (US/EU), Bengaluru"
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 py-1.5 px-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Salary / Total Comp (TC)</label>
                <input
                  type="text"
                  value={salaryTc}
                  onChange={(e) => setSalaryTc(e.target.value)}
                  placeholder="e.g. $190k + RSU, ₹45 LPA"
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 py-1.5 px-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Content Description */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Details / Story / Questions (Markdown supported)
            </label>
            <textarea
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share the context, requirements, questions asked, or post-mortem breakdown..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 px-3.5 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none font-mono text-xs leading-relaxed"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Kubernetes, Go, Terraform, SRE, InterviewTips"
              className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2 px-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Send className="h-4 w-4" />
              <span>Publish to Community</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
