import type { Metadata } from 'next';
import ReachChartsClient from '@/components/sponsor-portal/ReachChartsClient';
import { mockReachMetrics } from '@/lib/mock/sponsor-portal';

export const metadata: Metadata = { title: 'Reach Metrics' };

function fmt(n: number) {
  return n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n / 1_000).toFixed(0)}K` : String(n);
}

function fmtSecs(s: number) {
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}m ${rem}s`;
}

export default function SponsorReachPage() {
  const m = mockReachMetrics;

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-primary-900">Reach Metrics</h1>
        <p className="text-sm text-primary-500 mt-0.5">Report period: {m.reportPeriod}</p>
      </div>

      {/* Top-line KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Pageviews', val: fmt(m.totalPageviews) },
          { label: 'Unique Visitors', val: fmt(m.uniqueVisitors) },
          { label: 'Avg Session Duration', val: fmtSecs(m.avgSessionSeconds) },
        ].map(({ label, val }) => (
          <div key={label} className="bg-white rounded-xl border border-primary-200 px-4 py-4 text-center">
            <p className="text-2xl font-bold text-primary-900">{val}</p>
            <p className="text-xs text-primary-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <ReachChartsClient metrics={m} />
    </div>
  );
}
