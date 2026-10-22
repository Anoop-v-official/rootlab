import { Post, DeveloperProfile, ChatMessage } from './types';

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    title: 'Hiring 3x Senior DevOps / SREs in Cloud Infrastructure (Direct Team Referral)',
    content: 'My team in Cloud Platform is expanding. We are migrating our internal services to a multi-cluster Cilium service mesh on Kubernetes. Need folks with deep Terraform, Go, and Linux kernel networking debugging experience. Drop your resume or LinkedIn in DMs, I refer within 12 hours.',
    category: 'referrals',
    authorAlias: 'KernelPilot_L6',
    companyName: 'Google',
    companyDomain: 'google.com',
    isVerifiedOrg: true,
    roleTitle: 'Staff SRE',
    location: 'Munich / Hybrid / Remote (EU)',
    salaryTc: '$190k - $240k Base + RSUs',
    upvotes: 42,
    commentsCount: 9,
    tags: ['Kubernetes', 'Go', 'SRE', 'Cilium', 'Terraform'],
    createdAt: '15m ago',
    referralLinkAvailable: true,
    comments: [
      {
        id: 'c-1',
        authorAlias: 'ByteWhisperer',
        companyName: 'Amazon',
        isVerifiedOrg: true,
        content: 'Sent you a DM! Have 6 years in K8s networking and CNI plugin development.',
        createdAt: '10m ago',
        upvotes: 3
      },
      {
        id: 'c-2',
        authorAlias: 'DevOpsVader',
        companyName: 'Stripe',
        isVerifiedOrg: true,
        content: 'Is this team open to full-remote candidates within EMEA?',
        createdAt: '4m ago',
        upvotes: 1
      }
    ]
  },
  {
    id: 'post-2',
    title: 'Google L5 SRE Interview Breakdown: Real Questions, Live Debugging Round & System Design',
    content: "Just cleared the Google SRE loops and accepted the offer. Here is the exact breakdown of the 5 interview rounds:\n\n1. **Coding (Linux & Algorithmic)**: Log streaming aggregation script in Python/Go under memory constraints without loading the entire 50GB file into RAM (used chunking + generator).\n2. **Troubleshooting / Live Triaging**: A 45-minute interactive shell scenario. SSH into a broken VM where an NGINX proxy was dropping 15% of packets. Found out it was an ip_conntrack table overflow (dmesg revealed table full error). Fixed by tuning sysctl net.netfilter.nf_conntrack_max.\n3. **Non-Abstract Large System Design (NALSD)**: Design a globally distributed metric collection agent (like Prometheus Node Exporter) with push vs pull considerations, rate limiting, and write-ahead logs.\n4. **Linux Internals**: Deep dive into Page Cache, iowait, Dirty Pages flushing, inode exhaustion vs disk space exhaustion.\n5. **Googlyness & Leadership**: Handling P0 production incidents, post-mortems, blameless culture.\n\nTotal Comp (TC): €165,000 + €70k/yr equity. Prepare Linux tracing tools (strace, tcpdump, perf) thoroughly!",
    category: 'interviews',
    authorAlias: 'AlpineSRE',
    companyName: 'Google',
    companyDomain: 'google.com',
    isVerifiedOrg: true,
    roleTitle: 'Site Reliability Engineer',
    location: 'Zurich, Switzerland',
    salaryTc: '€235k TC / yr',
    upvotes: 89,
    commentsCount: 14,
    tags: ['GoogleInterview', 'NALSD', 'LinuxInternals', 'Sysctl', 'OfferReview'],
    createdAt: '1h ago',
    comments: [
      {
        id: 'c-3',
        authorAlias: 'NullPointer_X',
        companyName: 'Microsoft',
        isVerifiedOrg: true,
        content: 'The ip_conntrack overflow scenario is a classic SRE bar-raiser question! Great writeup.',
        createdAt: '35m ago',
        upvotes: 7
      }
    ]
  },
  {
    id: 'post-3',
    title: 'Leaked Memo: Mandatory 5-Day RTO Enforcement Starting Q1 - Badge Swipe Tracking Active',
    content: 'Leadership just sent an all-hands internal memo. The 3-day hybrid policy is officially dead starting January 1st. Badge swipes at turnstiles will now be cross-referenced with Slack activity. Managers will receive weekly automated attendance reports. Morale is at an all-time low in our building.',
    category: 'gossip',
    authorAlias: 'ThrowawayEngineer_404',
    companyName: 'Amazon',
    companyDomain: 'amazon.com',
    isVerifiedOrg: true,
    roleTitle: 'Senior Software Dev',
    location: 'Seattle, WA',
    upvotes: 156,
    commentsCount: 38,
    tags: ['RTO', 'LayoffWatch', 'WorkplaceCulture', 'Amazon'],
    createdAt: '2h ago',
    comments: [
      {
        id: 'c-4',
        authorAlias: 'CloudVagabond',
        companyName: 'Meta',
        isVerifiedOrg: true,
        content: 'Every time a big tech firm enforces 5-day RTO, it is 100% stealth layoffs to cut headcount without paying severance.',
        createdAt: '1h ago',
        upvotes: 24
      },
      {
        id: 'c-5',
        authorAlias: 'Rustacean_99',
        companyName: 'Apple',
        isVerifiedOrg: true,
        content: 'Can confirm our team in Cupertino is seeing mass senior resignations over this exact same trend.',
        createdAt: '45m ago',
        upvotes: 11
      }
    ]
  },
  {
    id: 'post-4',
    title: 'Production Incident: How our K8s Cluster went down due to a missing OOMScoreAdjust on DaemonSet',
    content: "Yesterday 40% of our worker nodes turned NotReady simultaneously. Here is the postmortem summary:\n\n* **Root Cause**: A custom log-shipping DaemonSet ran without explicit CPU/Memory limits. During a sudden log burst from a failing frontend pod, the logger ballooned in memory.\n* **The Fatal Bug**: Because kubelet did not prioritize eviction properly, Linux kernel OOM-killer killed containerd and kubelet itself instead of the rogue pod!\n* **The Fix**:\n  1. Enforced tight resources.limits on all DaemonSets.\n  2. Set kubeReserved and systemReserved memory in kubelet config.\n  3. Added PodDisruptionBudgets and node problem detector alerting.",
    category: 'engineering',
    authorAlias: 'KubeSlayer',
    companyName: 'Stripe',
    companyDomain: 'stripe.com',
    isVerifiedOrg: true,
    roleTitle: 'Infrastructure Engineer',
    location: 'San Francisco / Remote',
    upvotes: 67,
    commentsCount: 11,
    tags: ['Kubernetes', 'OOMKilled', 'Containerd', 'Postmortem', 'Linux'],
    createdAt: '3h ago'
  },
  {
    id: 'post-5',
    title: 'Bug Bounty Bounty: Bypassing WAF via Unicode Normalization in GraphQL Endpoints',
    content: 'Found a neat P1 vulnerability on a Fortune 500 target: their Cloudflare/WAF rules inspected raw payloads for `__schema` and SQL keywords, but the backend Node.js GraphQL parser executed Unicode compatibility normalization (`NFKC`). By encoding critical keywords using full-width Unicode characters, the WAF passed the traffic as benign while the backend decoded it into valid query syntax! Rewarded $4,500.',
    category: 'security',
    authorAlias: 'NullByte_Hacker',
    companyName: 'CrowdStrike',
    companyDomain: 'crowdstrike.com',
    isVerifiedOrg: true,
    roleTitle: 'Security Researcher',
    location: 'Remote',
    upvotes: 94,
    commentsCount: 15,
    tags: ['BugBounty', 'GraphQL', 'WAFBypass', 'Unicode', 'AppSec'],
    createdAt: '5h ago'
  },
  {
    id: 'post-6',
    title: 'Hiring 5x Cloud Security Engineers (AWS & Azure) - Fast Track Referrals',
    content: 'We have 5 urgent openings for Cloud Security & DevSecOps. Looking for hands-on experience in IAM permission boundary hardening, CSPM (Wiz/Prisma), and automated container vulnerability scanning. DM me with your resume. I will review and refer directly to our hiring manager.',
    category: 'referrals',
    authorAlias: 'CyberShield_L5',
    companyName: 'Microsoft',
    companyDomain: 'microsoft.com',
    isVerifiedOrg: true,
    roleTitle: 'Senior Cloud Security Architect',
    location: 'Hyderabad / Bengaluru / Remote',
    salaryTc: '₹35 - 55 LPA + Stock',
    upvotes: 38,
    commentsCount: 8,
    tags: ['DevSecOps', 'AWS', 'Azure', 'Referral', 'CloudSecurity'],
    createdAt: '6h ago',
    referralLinkAvailable: true
  }
];

export const INITIAL_DEVELOPERS: DeveloperProfile[] = [
  {
    id: 'dev-1',
    alias: 'KernelPilot_L6',
    avatarSeed: 'alex',
    companyName: 'Google',
    companyDomain: 'google.com',
    isVerifiedOrg: true,
    role: 'Staff SRE & Linux Kernel Specialist',
    experienceYears: 9,
    skills: ['Kubernetes', 'Go', 'eBPF', 'Cilium', 'Terraform', 'Linux Networking'],
    referralStatus: 'offering_referral',
    location: 'Munich, Germany',
    githubUrl: 'https://github.com/google',
    bio: 'Maintaining distributed cloud telemetry and Cilium mesh. Happy to refer senior engineers to Google Cloud Platform teams.'
  },
  {
    id: 'dev-2',
    alias: 'NullByte_Hacker',
    avatarSeed: 'sam',
    companyName: 'CrowdStrike',
    companyDomain: 'crowdstrike.com',
    isVerifiedOrg: true,
    role: 'Senior Application Security Researcher',
    experienceYears: 6,
    skills: ['Burp Suite', 'Web AppSec', 'WAF Bypasses', 'Python', 'Reverse Engineering'],
    referralStatus: 'offering_referral',
    location: 'London, UK',
    githubUrl: 'https://github.com',
    bio: 'Bug hunter and offensive security researcher. Offering referrals for Falcon platform security roles.'
  },
  {
    id: 'dev-3',
    alias: 'CloudVagabond',
    avatarSeed: 'maya',
    companyName: 'Meta',
    companyDomain: 'meta.com',
    isVerifiedOrg: true,
    role: 'Production Engineer (Infra)',
    experienceYears: 7,
    skills: ['Python', 'C++', 'BGP Routing', 'Linux Kernel', 'Grafana', 'SaltStack'],
    referralStatus: 'open_to_collab',
    location: 'Dublin, Ireland',
    githubUrl: 'https://github.com/facebook',
    bio: 'Managing petabyte-scale data ingestion pipelines. Looking for side-project collaborators on eBPF network monitoring tools.'
  },
  {
    id: 'dev-4',
    alias: 'KubeSlayer',
    avatarSeed: 'david',
    companyName: 'Stripe',
    companyDomain: 'stripe.com',
    isVerifiedOrg: true,
    role: 'Staff Infrastructure & DevOps Architect',
    experienceYears: 11,
    skills: ['AWS EKS', 'ArgoCD', 'Terraform', 'FinOps', 'Zero Trust', 'Docker'],
    referralStatus: 'offering_referral',
    location: 'San Francisco, CA',
    githubUrl: 'https://github.com/stripe',
    bio: 'FinOps and resilient payment infrastructure. Reach out for Stripe infra referrals.'
  },
  {
    id: 'dev-5',
    alias: 'DevOpsVader',
    avatarSeed: 'jordan',
    companyName: 'Tata Consultancy Services',
    companyDomain: 'tcs.com',
    isVerifiedOrg: true,
    role: 'Lead Cloud Architect',
    experienceYears: 5,
    skills: ['Docker', 'Kubernetes', 'Ansible', 'Azure DevOps', 'Bash', 'Prometheus'],
    referralStatus: 'seeking_referral',
    location: 'Bengaluru, India',
    githubUrl: 'https://github.com',
    bio: 'CKA & AZ-400 certified. Actively seeking senior DevOps/SRE referrals for product companies.'
  }
];

export const INITIAL_CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  'general-hall': [
    {
      id: 'm-1',
      channelId: 'general-hall',
      authorAlias: 'NullPointer_X',
      companyName: 'Microsoft',
      isVerifiedOrg: true,
      content: 'Morning folks. Anyone else experiencing intermittent DNS resolution timeouts on AWS us-east-1 this morning?',
      timestamp: '09:14 AM'
    },
    {
      id: 'm-2',
      channelId: 'general-hall',
      authorAlias: 'KubeSlayer',
      companyName: 'Stripe',
      isVerifiedOrg: true,
      content: 'Yeah, Route53 VPC resolver had a brief spike in latency around 08:50 UTC. It resolved after we failed over our secondary upstream.',
      timestamp: '09:16 AM'
    },
    {
      id: 'm-3',
      channelId: 'general-hall',
      authorAlias: 'ByteWhisperer',
      companyName: 'Amazon',
      isVerifiedOrg: true,
      content: 'Can confirm internal ticket was resolved by networking team. Core Route53 is green now.',
      timestamp: '09:19 AM'
    }
  ],
  'devops-triage': [
    {
      id: 'm-4',
      channelId: 'devops-triage',
      authorAlias: 'DevOpsVader',
      companyName: 'TCS',
      isVerifiedOrg: true,
      content: 'Quick question: when your pods exit with code 137, do you check cgroup limits or node-level kernel dmesg first?',
      codeSnippet: `kubectl describe pod backend-service-7f8d
# State: Terminated
# Reason: OOMKilled
# Exit Code: 137`,
      codeLanguage: 'bash',
      timestamp: '10:02 AM'
    },
    {
      id: 'm-5',
      channelId: 'devops-triage',
      authorAlias: 'KernelPilot_L6',
      companyName: 'Google',
      isVerifiedOrg: true,
      content: 'Always check cgroup memory events first! Run this command inside node to see if it throttled or spiked:',
      codeSnippet: `cat /sys/fs/cgroup/memory/kubepods/pod<UID>/memory.oom_control
# If oom_kill_disable is 0 and under_oom is 1, cgroup killed it.`,
      codeLanguage: 'bash',
      timestamp: '10:05 AM'
    }
  ],
  'interview-prep': [
    {
      id: 'm-6',
      channelId: 'interview-prep',
      authorAlias: 'AlpineSRE',
      companyName: 'Google',
      isVerifiedOrg: true,
      content: 'Tip for anyone doing System Design this month: make sure you can calculate storage, throughput (QPS), and bandwidth napkin math in 60 seconds without fumbling.',
      timestamp: '11:20 AM'
    }
  ],
  // Company Watercoolers
  'watercooler-google.com': [
    {
      id: 'w-1',
      channelId: 'watercooler-google.com',
      authorAlias: 'KernelPilot_L6',
      companyName: 'Google',
      isVerifiedOrg: true,
      content: 'Reminder: Perf review calibration cycle closes this Friday. Make sure your peer reviews are submitted before the deadline.',
      timestamp: '08:45 AM'
    },
    {
      id: 'w-2',
      channelId: 'watercooler-google.com',
      authorAlias: 'AlpineSRE',
      companyName: 'Google',
      isVerifiedOrg: true,
      content: 'Did anyone see the new internal AI agent framework announcement on go/agent-infra? Looks promising for triaging PagerDuty alerts.',
      timestamp: '09:30 AM'
    }
  ],
  'watercooler-amazon.com': [
    {
      id: 'w-3',
      channelId: 'watercooler-amazon.com',
      authorAlias: 'ByteWhisperer',
      companyName: 'Amazon',
      isVerifiedOrg: true,
      content: 'The Slack channels regarding the RTO memo are on fire today. VP tried to do a Q&A and turned off thread comments.',
      timestamp: '10:12 AM'
    }
  ]
};
