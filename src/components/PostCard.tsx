'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  ArrowBigUp, 
  MessageSquare, 
  Share2, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Send,
  Sparkles,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { Post, PostComment, CurrentUser } from '../lib/types';

interface PostCardProps {
  post: Post;
  currentUser: CurrentUser;
  onUpvote: (postId: string) => void;
  onAddComment: (postId: string, comment: PostComment) => void;
  onRequestReferral?: (post: Post) => void;
}

export function PostCard({ post, currentUser, onUpvote, onAddComment, onRequestReferral }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const handleUpvoteClick = () => {
    if (!hasUpvoted) {
      setHasUpvoted(true);
      onUpvote(post.id);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: PostComment = {
      id: 'c-' + Date.now(),
      authorAlias: currentUser.alias || 'Dev_' + Math.floor(100 + Math.random() * 900),
      companyName: currentUser.isVerified ? currentUser.companyName : 'Community Member',
      isVerifiedOrg: currentUser.isVerified,
      content: commentText.trim(),
      createdAt: 'Just now',
      upvotes: 1
    };

    onAddComment(post.id, newComment);
    setCommentText('');
  };

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'referrals':
        return { label: '🤝 Referral', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
      case 'interviews':
        return { label: '🎯 Interview Intel', bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' };
      case 'gossip':
        return { label: '☕ IT Gossip', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
      case 'engineering':
        return { label: '🛠️ DevOps / Eng', bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' };
      case 'security':
        return { label: '🛡️ Security', bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30' };
      default:
        return { label: 'Community', bg: 'bg-slate-500/10 text-slate-400 border-slate-500/30' };
    }
  };

  const catTheme = getCategoryTheme(post.category);

  return (
    <article className="rounded-2xl border border-slate-800/90 bg-slate-900/40 p-5 transition-all hover:border-slate-700/80 hover:bg-slate-900/60 shadow-lg">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Category Pill */}
          <span className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 font-medium ${catTheme.bg}`}>
            {catTheme.label}
          </span>

          {/* Verified Org Badge */}
          {post.isVerifiedOrg ? (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 text-xs font-semibold text-emerald-300">
              <Building2 className="h-3 w-3 text-emerald-400" />
              <span>[Verified @{post.companyName}]</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-slate-400 font-mono text-[11px]">
              @{post.companyName}
            </span>
          )}

          <span className="text-slate-500">•</span>
          <span className="text-slate-400 font-mono">{post.authorAlias}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-500">{post.createdAt}</span>
        </div>

        {/* Request Referral Button if available */}
        {post.category === 'referrals' && post.referralLinkAvailable && (
          <button
            onClick={() => onRequestReferral && onRequestReferral(post)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Request Referral</span>
          </button>
        )}
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug hover:text-emerald-300 transition-colors">
        {post.title}
      </h3>

      {/* Role / Meta Pills if Referral or Interview */}
      {(post.roleTitle || post.location || post.salaryTc) && (
        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
          {post.roleTitle && (
            <div className="inline-flex items-center gap-1 rounded-md bg-slate-800/80 px-2.5 py-1 text-slate-300 font-medium">
              <Briefcase className="h-3.5 w-3.5 text-slate-400" />
              <span>{post.roleTitle}</span>
            </div>
          )}
          {post.location && (
            <div className="inline-flex items-center gap-1 rounded-md bg-slate-800/80 px-2.5 py-1 text-slate-300">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              <span>{post.location}</span>
            </div>
          )}
          {post.salaryTc && (
            <div className="inline-flex items-center gap-1 rounded-md bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 text-emerald-300 font-semibold font-mono">
              <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
              <span>{post.salaryTc}</span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="text-sm text-slate-300 mb-4 whitespace-pre-line leading-relaxed font-sans">
        {post.content}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="rounded-md border border-slate-800 bg-slate-900/60 px-2 py-0.5 font-mono text-[11px] text-slate-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer Actions (Upvotes, Comments count, Share) */}
      <div className="flex items-center justify-between border-t border-slate-800/70 pt-3 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          {/* Upvote */}
          <button
            onClick={handleUpvoteClick}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1 font-semibold transition-colors ${
              hasUpvoted
                ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:text-white'
            }`}
          >
            <ArrowBigUp className={`h-4 w-4 ${hasUpvoted ? 'text-emerald-400 fill-emerald-400' : ''}`} />
            <span>{post.upvotes}</span>
          </button>

          {/* Comment Counter / Toggle */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments ? post.comments.length : post.commentsCount} Comments</span>
          </button>
        </div>

        <button
          onClick={() => {
            navigator.clipboard?.writeText(window.location.origin + '#' + post.id);
            alert('Post link copied to clipboard!');
          }}
          className="flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* Comments Thread Accordion */}
      {showComments && (
        <div className="mt-4 border-t border-slate-800/60 pt-4 space-y-3">
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={`Reply as ${currentUser.alias} (${currentUser.isVerified ? currentUser.companyName : 'Community'})...`}
              className="flex-1 rounded-xl border border-slate-800 bg-slate-950 py-2 px-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-emerald-500 px-3.5 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>

          {post.comments && post.comments.length > 0 ? (
            <div className="space-y-2.5 pt-2">
              {post.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-xl border border-slate-800/60 bg-slate-950/50 p-3 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-200">{comment.authorAlias}</span>
                      {comment.isVerifiedOrg ? (
                        <span className="text-[10px] text-emerald-400 font-semibold">
                          [Verified @{comment.companyName}]
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500">@{comment.companyName}</span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500">{comment.createdAt}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic py-1">No comments yet. Be the first to reply!</p>
          )}
        </div>
      )}
    </article>
  );
}
