import type { Metadata } from 'next';
import Link from 'next/link';
import { mockPortalSponsor, mockCampaigns, mockReachMetrics } from '@/lib/mock/sponsor-portal';

export const metadata: Metadata = { title: 'Dashboard' };

const TIER_LABEL: Record<string, string> = {
  title: 'Title Sponsor',
  gold: 'Gold Sponsor',
  silver: 'Silver Sponsor',
  partner: 'Partner',
};

const TIER_COLOR: Record<string, string> = {
  title: 'bg-accent-500 text-white',
  gold: 'bg-yellow-400 text-yellow-900',
  silver: 'bg-primary-300 text-primary-800',
  partner: 'bg-primary-100 text-primary-700',
};

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white rounded-xl border border-primary-200 px-5 py-4">
      <p className="text-xs text-primary-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-primary-900">{value}</p>
      {sub && <p className="text-xs text-primary-400 mt-0.5">{sub}</p>}
    </div>
  );
}

export default function SponsorDashboardPage() {
  const sponsor = mockPortalSponsor;
  const activeCampaigns = mockCampaigns.filter((c) => c.status === 'active');
  const completedCampaigns = mockCampaigns.filter((c) => c.status === 'completed');

  const totalImpressions = mockCampaigns.reduce((s, c) => s + c.impressions, 0);
  const totalClicks = mockCampaigns.reduce((s, c) => s + c.clicks, 0);
  const avgRoi =
    completedCampaigns.length > 0
      ? Math.round(completedCampaigns.reduce((s, c) => s + c.roi, 0) / completedCampaigns.length)
      : 0;

  function fmt(n: number) {
    return n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n / 1_000).toFixed(0)}K` : String(n);
  }

  return (
    <div className="p-6 max-w-5xl">
      {/* Welcome */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="h-12 w-12 rounded-xl bg-accent-500 flex items-center justify-center text-white font-bold text-lg">
              {sponsor.logoText ?? sponsor.name.slice(0, 2)}
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-900">{sponsor.name}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${TIER_COLOR[sponsor.tier] ?? ''}`}>
                  {TIER_LABEL[sponsor.tier] ?? sponsor.tier}
                </span>
                <span className="text-xs text-primary-400">Partner since {sponsor.since}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-primary-600 mt-3 max-w-xl">{sponsor.description}</p>
        </div>
      </div>

      {/* KPI snapshot */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Impressions" value={fmt(totalImpressions)} sub="All campaigns" />
        <StatCard label="Total Clicks" value={fmt(totalClicks)} sub="All campaigns" />
        <StatCard label="Avg ROI (completed)" value={avgRoi > 0 ? `${avgRoi}%` : '—'} sub={`${completedCampaigns.length} campaign${completedCampaigns.length !== 1 ? 's' : ''}`} />
        <StatCard label="Unique Visitors" value={fmt(mockReachMetrics.uniqueVisitors)} sub={mockReachMetrics.reportPeriod} />
      </div>

      {/* Active campaigns */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-primary-900">Active Campaigns</h2>
          <Link href="/sponsor-portal/reports" className="text-xs text-accent-600 hover:text-accent-800 font-medium">
            View all →
          </Link>
        </div>
        {activeCampaigns.length === 0 ? (
          <p className="text-sm text-primary-500 bg-white rounded-xl border border-primary-200 px-5 py-6 text-center">
            No active campaigns right now.
          </p>
        ) : (
          <div className="space-y-3">
            {activeCampaigns.map((c) => (
              <div key={c.id} className="bg-white rounded-xl border border-primary-200 px-5 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-block rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold">Active</span>
                      <span className="text-xs text-primary-400">
                        {new Date(c.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} –{' '}
                        {new Date(c.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="font-semibold text-primary-900">{c.name}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {c.placements.map((p) => (
                        <span key={p} className="rounded-full bg-primary-100 text-primary-600 text-xs px-2 py-0.5">{p}</span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center shrink-0">
                    {[
                      { label: 'Impressions', val: fmt(c.impressions) },
                      { label: 'Clicks', val: fmt(c.clicks) },
                      { label: 'Conversions', val: String(c.conversions) },
                    ].map(({ label, val }) => (
                      <div key={label}>
                        <p className="text-sm font-bold text-primary-900">{val}</p>
                        <p className="text-xs text-primary-400">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick links */}
      <section>
        <h2 className="font-semibold text-primary-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: '/sponsor-portal/reports', label: 'Campaign Reports', icon: '◎' },
            { href: '/sponsor-portal/reach', label: 'Reach Metrics', icon: '◉' },
            { href: '/sponsor-portal/assets', label: 'Brand Assets', icon: '◫' },
            { href: '/sponsor-portal/contact', label: 'Contact Us', icon: '◌' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white rounded-xl border border-primary-200 hover:border-accent-300 hover:shadow-sm transition-all px-4 py-4 flex flex-col items-center gap-2 text-center"
            >
              <span className="text-2xl text-accent-500">{item.icon}</span>
              <span className="text-sm font-medium text-primary-800">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
