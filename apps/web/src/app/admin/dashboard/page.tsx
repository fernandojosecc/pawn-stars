import type { Metadata } from 'next';
import KpiCard from '@/components/admin/KpiCard';
import { mockKpis } from '@/lib/mock/admin';

export const metadata: Metadata = { title: 'Dashboard' };

function formatImportDate(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold text-primary-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <KpiCard title="Total Players" value={mockKpis.totalPlayers} />
        <KpiCard title="Active Tournaments" value={mockKpis.activeTournaments} highlight />
        <KpiCard title="News Published" value={mockKpis.newsPublished} />
        <KpiCard title="Pending Applications" value={mockKpis.pendingApplications} highlight />
        <KpiCard
          title="Last Ratings Import"
          value={formatImportDate(mockKpis.lastRatingsImport)}
          subtitle="Nightly sync"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-primary-200 p-4">
          <h2 className="text-sm font-semibold text-primary-700 mb-3">Quick Links</h2>
          <div className="space-y-1">
            {[
              { href: '/admin/players', label: 'Manage Players' },
              { href: '/admin/tournaments', label: 'Manage Tournaments' },
              { href: '/admin/applications', label: 'Review Applications' },
              { href: '/admin/news', label: 'Manage News' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="block px-3 py-2 rounded text-sm text-primary-700 hover:bg-primary-50 hover:text-primary-900 transition-colors"
              >
                {label} →
              </a>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-primary-200 p-4">
          <h2 className="text-sm font-semibold text-primary-700 mb-3">System Info</h2>
          <dl className="space-y-2">
            <div className="flex justify-between text-sm">
              <dt className="text-primary-500">Active tournaments</dt>
              <dd className="font-medium text-primary-900">{mockKpis.activeTournaments}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-primary-500">Pending applications</dt>
              <dd className="font-medium text-accent-600">{mockKpis.pendingApplications}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-primary-500">Ratings last synced</dt>
              <dd className="font-medium text-primary-900">{formatImportDate(mockKpis.lastRatingsImport)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
