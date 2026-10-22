'use client';

import React, { useState, useEffect } from 'react';
import { CurrentUser, Post, PostComment } from '../lib/types';
import { getStoredUser, getStoredPosts, saveStoredPosts, saveStoredUser } from '../lib/storage';
import { Header } from './Header';
import { VerifyOrgModal } from './VerifyOrgModal';
import { CreatePostModal } from './CreatePostModal';

interface AppShellProps {
  children: (props: {
    currentUser: CurrentUser;
    posts: Post[];
    activeTab: 'feed' | 'watercooler' | 'chat' | 'network';
    onSelectTab: (tab: 'feed' | 'watercooler' | 'chat' | 'network') => void;
    onUpvote: (postId: string) => void;
    onAddComment: (postId: string, comment: PostComment) => void;
    onOpenVerifyModal: () => void;
    onOpenCreatePostModal: () => void;
  }) => React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(() => getStoredUser());
  const [posts, setPosts] = useState<Post[]>(() => getStoredPosts());
  const [activeTab, setActiveTab] = useState<'feed' | 'watercooler' | 'chat' | 'network'>('feed');
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  // Sync state on client mount
  useEffect(() => {
    setCurrentUser(getStoredUser());
    setPosts(getStoredPosts());
  }, []);

  const handleUserUpdated = (updatedUser: CurrentUser) => {
    setCurrentUser(updatedUser);
    saveStoredUser(updatedUser);
  };

  const handleUpvote = (postId: string) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        return { ...p, upvotes: p.upvotes + 1 };
      }
      return p;
    });
    setPosts(updated);
    saveStoredPosts(updated);
  };

  const handleAddComment = (postId: string, comment: PostComment) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const comments = p.comments ? [...p.comments, comment] : [comment];
        return {
          ...p,
          comments,
          commentsCount: comments.length,
        };
      }
      return p;
    });
    setPosts(updated);
    saveStoredPosts(updated);
  };

  const handlePostCreated = (newPost: Post) => {
    const updated = [newPost, ...posts];
    setPosts(updated);
    saveStoredPosts(updated);
    setActiveTab('feed');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080b11]">
      <Header
        currentUser={currentUser}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
        onOpenCreatePostModal={() => setIsCreatePostModalOpen(true)}
      />

      <main className="flex-1 pb-16">
        {children({
          currentUser,
          posts,
          activeTab,
          onSelectTab: setActiveTab,
          onUpvote: handleUpvote,
          onAddComment: handleAddComment,
          onOpenVerifyModal: () => setIsVerifyModalOpen(true),
          onOpenCreatePostModal: () => setIsCreatePostModalOpen(true),
        })}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-emerald-400 font-bold">root@lab:~$</span>
            <span>Zero-trace tech networking, verified workplace chat & referrals</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Next.js + Tailwind + Vercel Ready</span>
            <span>•</span>
            <span>Portable / Docker Ready</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <VerifyOrgModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        currentUser={currentUser}
        onUserUpdated={handleUserUpdated}
      />

      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        currentUser={currentUser}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
}
