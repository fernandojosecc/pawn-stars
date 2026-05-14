import type { Metadata } from 'next';
import CampaignsClient from '@/components/sponsor-portal/CampaignsClient';
import { mockCampaigns } from '@/lib/mock/sponsor-portal';

export const metadata: Metadata = { title: 'Campaign Reports' };

export default function SponsorReportsPage() {
  const total = mockCampaigns.length;
  const active = mockCampaigns.filter((c) => c.status === 'active').length;
  const completed = mockCampaigns.filter((c) => c.status === 'completed').length;

  const totalImpressions = mockCampaigns.reduce((s, c) => s + c.impressions, 0);
  const totalClicks = mockCampaigns.reduce((s, c) => s + c.clicks, 0);
  const overallCtr = totalImpressions > 0
    ? ((totalClicks / totalImpressions) * 100).toFixed(2)
    : '—';

  function fmt(n: number) {
    return n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n / 1_000).toFixed(0)}K` : String(n);
  }

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-primary-900">Campaign Reports</h1>
        <p className="text-sm text-primary-500 mt-0.5">
          {total} campaigns · {active} active · {completed} completed
        </p>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Impressions', val: fmt(totalImpressions) },
          { label: 'Total Clicks', val: fmt(totalClicks) },
          { label: 'Overall CTR', val: overallCtr !== '—' ? `${overallCtr}%` : '—' },
        ].map(({ label, val }) => (
          <div key={label} className="bg-white rounded-xl border border-primary-200 px-4 py-3 text-center">
            <p className="text-lg font-bold text-primary-900">{val}</p>
            <p className="text-xs text-primary-400">{label}</p>
          </div>
        ))}
      </div>

      <CampaignsClient campaigns={mockCampaigns} />
    </div>
  );
}
