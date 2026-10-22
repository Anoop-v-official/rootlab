export type PostCategory = 
  | 'all'
  | 'referrals'
  | 'interviews'
  | 'gossip'
  | 'engineering'
  | 'security';

export interface Post {
  id: string;
  title: string;
  content: string;
  category: 'referrals' | 'interviews' | 'gossip' | 'engineering' | 'security';
  authorAlias: string;
  companyName: string;
  companyDomain: string;
  isVerifiedOrg: boolean;
  roleTitle?: string;
  location?: string;
  salaryTc?: string; // e.g. "$185k / €95k / ₹45 LPA"
  upvotes: number;
  commentsCount: number;
  tags: string[];
  createdAt: string;
  referralLinkAvailable?: boolean;
  comments?: PostComment[];
}

export interface PostComment {
  id: string;
  authorAlias: string;
  companyName: string;
  isVerifiedOrg: boolean;
  content: string;
  createdAt: string;
  upvotes: number;
}

export interface DeveloperProfile {
  id: string;
  alias: string;
  avatarSeed: string;
  companyName: string;
  companyDomain: string;
  isVerifiedOrg: boolean;
  role: string;
  experienceYears: number;
  skills: string[];
  referralStatus: 'offering_referral' | 'seeking_referral' | 'open_to_collab';
  location: string;
  githubUrl?: string;
  bio: string;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  authorAlias: string;
  companyName: string;
  isVerifiedOrg: boolean;
  content: string;
  codeSnippet?: string;
  codeLanguage?: string;
  timestamp: string;
}

export interface CurrentUser {
  email?: string;
  companyName: string;
  companyDomain: string;
  isVerified: boolean;
  alias: string;
  saltHash?: string;
}
