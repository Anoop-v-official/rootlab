'use client';

import { Post, DeveloperProfile, ChatMessage, CurrentUser } from './types';
import { INITIAL_POSTS, INITIAL_DEVELOPERS, INITIAL_CHAT_MESSAGES } from './mockData';

const STORAGE_KEYS = {
  POSTS: 'rootlab_posts_v1',
  USER: 'rootlab_current_user_v1',
  DEVELOPERS: 'rootlab_developers_v1',
  CHAT: 'rootlab_chat_messages_v1',
};

// Initial default user: Anonymous until verified
export const DEFAULT_USER: CurrentUser = {
  companyName: 'Community Member',
  companyDomain: '',
  isVerified: false,
  alias: 'TechDev_' + Math.floor(100 + Math.random() * 900),
};

export function getStoredUser(): CurrentUser {
  if (typeof window === 'undefined') return DEFAULT_USER;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read user from storage', e);
  }
  return DEFAULT_USER;
}

export function saveStoredUser(user: CurrentUser): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user', e);
  }
}

export function getStoredPosts(): Post[] {
  if (typeof window === 'undefined') return INITIAL_POSTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.POSTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read posts', e);
  }
  return INITIAL_POSTS;
}

export function saveStoredPosts(posts: Post[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  } catch (e) {
    console.error('Failed to save posts', e);
  }
}

export function getStoredDevelopers(): DeveloperProfile[] {
  if (typeof window === 'undefined') return INITIAL_DEVELOPERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DEVELOPERS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read devs', e);
  }
  return INITIAL_DEVELOPERS;
}

export function getStoredChatMessages(): Record<string, ChatMessage[]> {
  if (typeof window === 'undefined') return INITIAL_CHAT_MESSAGES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHAT);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read chat messages', e);
  }
  return INITIAL_CHAT_MESSAGES;
}

export function saveStoredChatMessages(chat: Record<string, ChatMessage[]>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify(chat));
  } catch (e) {
    console.error('Failed to save chat', e);
  }
}

// Helper: Extract human-readable company name from email domain
export function parseDomainToCompanyName(domain: string): string {
  const d = domain.toLowerCase().trim();
  const known: Record<string, string> = {
    'google.com': 'Google',
    'amazon.com': 'Amazon',
    'microsoft.com': 'Microsoft',
    'meta.com': 'Meta',
    'apple.com': 'Apple',
    'netflix.com': 'Netflix',
    'stripe.com': 'Stripe',
    'uber.com': 'Uber',
    'tcs.com': 'Tata Consultancy Services',
    'infosys.com': 'Infosys',
    'wipro.com': 'Wipro',
    'crowdstrike.com': 'CrowdStrike',
    'cloudflare.com': 'Cloudflare',
    'salesforce.com': 'Salesforce',
    'oracle.com': 'Oracle',
    'nvidia.com': 'NVIDIA',
    'openai.com': 'OpenAI',
  };

  if (known[d]) return known[d];

  // Capitalize domain prefix (e.g. acme-corp.com -> Acme Corp)
  const prefix = d.split('.')[0] || 'Unknown';
  return prefix
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
