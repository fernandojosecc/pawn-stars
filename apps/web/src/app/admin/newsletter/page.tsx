import type { Metadata } from 'next';
import NewsletterAdminClient from '@/components/admin/NewsletterAdminClient';
import { NewsletterPreference } from '@pawn-stars/shared-types';
import type { NewsletterSendResult } from '@pawn-stars/shared-types';

export const metadata: Metadata = { title: 'Newsletter' };

// Mock stats matching the 50-subscriber seed in the NestJS service.
// Derived from the same seed logic: 50 total, ~6 unconfirmed (every 7th), 3 unsubscribed.
const MOCK_STATS = {
  total:        50,
  confirmed:    41,   // 50 - 6 unconfirmed - 3 unsubscribed
  unconfirmed:  6,
  unsubscribed: 3,
  byPreference: {
    [NewsletterPreference.MATCH_RESULTS]:      28,
    [NewsletterPreference.TOURNAMENT_UPDATES]: 24,
    [NewsletterPreference.TEAM_NEWS]:          19,
    [NewsletterPreference.BLOG_POSTS]:         22,
  },
};

const MOCK_HISTORY: NewsletterSendResult[] = [
  {
    id: 'send-001',
    subject: 'Spring Open 2026 — Carlsen Takes the Lead After Round 5',
    sentAt: new Date(Date.now() - 7 * 86_400_000).toISOString(),
    recipientCount: 38,
    success: true,
  },
  {
    id: 'send-002',
    subject: 'New Blog: Ruy Lopez Deep Dive — Opening Theory Explained',
    sentAt: new Date(Date.now() - 18 * 86_400_000).toISOString(),
    recipientCount: 19,
    segment: NewsletterPreference.BLOG_POSTS,
    success: true,
  },
  {
    id: 'send-003',
    subject: 'Winter Classic 2025 Results — Caruana Wins Title in Madrid',
    sentAt: new Date(Date.now() - 35 * 86_400_000).toISOString(),
    recipientCount: 35,
    segment: NewsletterPreference.MATCH_RESULTS,
    success: true,
  },
];

export default function AdminNewsletterPage() {
  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-lg font-semibold text-primary-900">Newsletter</h1>
        <p className="text-sm text-primary-500 mt-0.5">
          Manage subscribers, send campaigns, and review delivery history.
        </p>
      </div>
      <NewsletterAdminClient initialStats={MOCK_STATS} initialHistory={MOCK_HISTORY} />
    </div>
  );
}
