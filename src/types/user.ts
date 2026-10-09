export interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  role?: 'owner' | 'user';
  passwordHash?: string;
  bio?: string;
  location?: string;
  avatarColor?: string;
  joinedDate: string;
  isVerified: boolean;
  plan: 'Free' | 'Pro' | 'Enterprise';
  stats: {
    documentsMerged: number;
    filesUploaded: number;
    storageUsedMb: number;
  };
  recentActivities: {
    id: string;
    title: string;
    date: string;
    size: string;
    pageCount: number;
  }[];
}

export const DEMO_OTHER_USERS: UserProfile[] = [
  {
    id: 'user-sarah',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@metrocorp.com',
    username: 'sarahj',
    bio: 'Lead Architect & Technical Director. Regular user of PDF merge for enterprise project blueprints and contracts.',
    location: 'San Francisco, CA',
    avatarColor: 'bg-emerald-600',
    joinedDate: 'August 2025',
    isVerified: true,
    plan: 'Pro',
    stats: {
      documentsMerged: 84,
      filesUploaded: 192,
      storageUsedMb: 64.2,
    },
    recentActivities: [
      {
        id: 'act-1',
        title: 'Q3 Architectural Blueprints & Specs.pdf',
        date: 'Today, 10:45 AM',
        size: '14.8 MB',
        pageCount: 38,
      },
      {
        id: 'act-2',
        title: 'Metro Tower Zoning Permits - Combined.pdf',
        date: 'Yesterday, 3:20 PM',
        size: '6.2 MB',
        pageCount: 16,
      },
      {
        id: 'act-3',
        title: 'Structural Engineering Review 2026.pdf',
        date: 'Oct 3, 2026',
        size: '8.5 MB',
        pageCount: 22,
      },
    ],
  },
  {
    id: 'user-alex',
    name: 'Alex Rivera',
    email: 'alex.rivera@legalfirm.io',
    username: 'alexr',
    bio: 'Senior Legal Counsel specializing in compliance and corporate filings. Uses PDF Merge for court bundles.',
    location: 'New York, NY',
    avatarColor: 'bg-purple-600',
    joinedDate: 'May 2025',
    isVerified: true,
    plan: 'Enterprise',
    stats: {
      documentsMerged: 142,
      filesUploaded: 310,
      storageUsedMb: 118.5,
    },
    recentActivities: [
      {
        id: 'act-4',
        title: 'Merger & Acquisition Disclosure Docket.pdf',
        date: 'Yesterday, 5:12 PM',
        size: '24.1 MB',
        pageCount: 76,
      },
      {
        id: 'act-5',
        title: 'Joint Venture Agreement Appendix.pdf',
        date: 'Oct 5, 2026',
        size: '4.7 MB',
        pageCount: 12,
      },
    ],
  },
];
