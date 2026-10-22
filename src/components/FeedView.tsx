'use client';

import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  HelpCircle, 
  MessageSquareWarning, 
  Wrench, 
  ShieldAlert, 
  Search, 
  TrendingUp, 
  Clock, 
  Flame,
  ShieldCheck,
  CheckCircle2,
  X,
  Send,
  Building2,
  Filter
} from 'lucide-react';
import { Post, PostCategory, PostComment, CurrentUser } from '../lib/types';
import { PostCard } from './PostCard';

interface FeedViewProps {
  posts: Post[];
  currentUser: CurrentUser;
  onUpvote: (postId: string) => void;
  onAddComment: (postId: string, comment: PostComment) => void;
  onOpenVerifyModal: () => void;
}

export function FeedView({ posts, currentUser, onUpvote, onAddComment, onOpenVerifyModal }: FeedViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<PostCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'trending' | 'latest' | 'upvotes'>('trending');
  
  // Referral Request Modal State
  const [activeReferralPost, setActiveReferralPost] = useState<Post | null>(null);
  const [referralNote, setReferralNote] = useState('');
  const [referralSent, setReferralSent] = useState(false);

  const categories = [
    { id: 'all', label: '🌐 All Discussions', icon: Flame },
    { id: 'referrals', label: '🤝 Job Referrals', icon: Briefcase },
    { id: 'interviews', label: '🎯 Interview Intel & TC', icon: HelpCircle },
    { id: 'gossip', label: '☕ IT Gossip & Layoff Watch', icon: MessageSquareWarning },
    { id: 'engineering', label: '🛠️ DevOps & Incidents', icon: Wrench },
    { id: 'security', label: '🛡️ Security & Pentest', icon: ShieldAlert },
  ];

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        if (selectedCategory !== 'all' && post.category !== selectedCategory) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = post.title.toLowerCase().includes(q);
          const matchContent = post.content.toLowerCase().includes(q);
          const matchCompany = post.companyName.toLowerCase().includes(q);
          const matchTags = post.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchContent && !matchCompany && !matchTags) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'upvotes') {
          return b.upvotes - a.upvotes;
        }
        if (sortBy === 'latest') {
          return b.id.localeCompare(a.id);
        }
        // trending default
        return b.upvotes + (b.comments?.length || 0) * 2 - (a.upvotes + (a.comments?.length || 0) * 2);
      });
  }, [posts, selectedCategory, searchQuery, sortBy]);

  const handleSendReferralRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setReferralSent(true);
    setTimeout(() => {
      setReferralSent(false);
      setActiveReferralPost(null);
      setReferralNote('');
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      {/* Top Value Banner */}
      {!currentUser.isVerified && (
        <div className="relative mb-6 overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 p-5 shadow-xl">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 mb-2">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Zero-Trace Workplace Verification</span>
              </div>
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Connect with verified colleagues & unlock direct job referrals
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                Verify your work email (e.g. <span className="font-mono text-emerald-400">@company.com</span>). Your email is cryptographically hashed with zero retention so you stay 100% anonymous.
              </p>
            </div>
            <button
              onClick={onOpenVerifyModal}
              className="shrink-0 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
            >
              Verify Work Email
            </button>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as PostCategory)}
              className={`shrink-0 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 shadow-sm'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Search & Sort Row */}
      <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussions, companies (e.g. Google, Amazon), or tags (#Kubernetes, #RTO)..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
            <Filter className="h-3 w-3" />
            Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300 focus:border-emerald-500 focus:outline-none"
          >
            <option value="trending">🔥 Trending</option>
            <option value="latest">⏱️ Latest</option>
            <option value="upvotes">⭐ Most Upvoted</option>
          </select>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              onUpvote={onUpvote}
              onAddComment={onAddComment}
              onRequestReferral={(p) => setActiveReferralPost(p)}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center">
            <p className="text-sm text-slate-400">No posts found matching your filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-2 text-xs text-emerald-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Referral Request Modal */}
      {activeReferralPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
            <button
              onClick={() => setActiveReferralPost(null)}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-900 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {referralSent ? (
              <div className="py-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Referral Request Sent!</h4>
                <p className="text-xs text-slate-400">
                  Your profile and note have been forwarded to{' '}
                  <strong className="text-emerald-300">@{activeReferralPost.authorAlias}</strong> at{' '}
                  {activeReferralPost.companyName}.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Request Referral @ {activeReferralPost.companyName}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {activeReferralPost.title}
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Send a brief introduction and your LinkedIn/GitHub or resume link to{' '}
                  <span className="font-mono text-slate-200">@{activeReferralPost.authorAlias}</span>.
                </p>

                <form onSubmit={handleSendReferralRequest} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Your Introduction & Experience
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={referralNote}
                      onChange={(e) => setReferralNote(e.target.value)}
                      placeholder="Hi! I have 5 years of SRE experience in Kubernetes and AWS. Here is my portfolio/LinkedIn: linkedin.com/in/... I'd love to apply for this opening."
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveReferralPost(null)}
                      className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 flex items-center gap-1.5"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Submit Request</span>
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
