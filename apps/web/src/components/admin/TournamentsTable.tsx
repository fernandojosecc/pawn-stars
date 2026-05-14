'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import type { TournamentCard, TournamentStatus } from '@pawn-stars/shared-types';
import { Badge } from '@/components/ui/badge';

type StatusFilter = 'ALL' | TournamentStatus;

const STATUS_FILTERS: StatusFilter[] = ['ALL', 'UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED'];

const statusVariant: Record<TournamentStatus, string> = {
  UPCOMING: 'border border-primary-300 bg-primary-50 text-primary-700',
  ONGOING: 'bg-success-100 text-success-700',
  COMPLETED: 'bg-primary-100 text-primary-600',
  CANCELLED: 'bg-red-50 text-red-600',
};

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

interface TournamentsTableProps {
  tournaments: TournamentCard[];
}

export default function TournamentsTable({ tournaments }: TournamentsTableProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

  const filtered = tournaments.filter(
    (t) => statusFilter === 'ALL' || t.status === statusFilter,
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setStatusFilter(f)}
            className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors
              ${statusFilter === f
                ? 'bg-primary-800 text-white'
                : 'bg-white border border-primary-200 text-primary-600 hover:bg-primary-50'}`}
          >
            {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-primary-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-primary-200 bg-primary-50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Format</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Location</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Start Date</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-primary-400 text-sm">
                  No tournaments found.
                </td>
              </tr>
            )}
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-primary-50">
                <td className="px-4 py-3 font-medium text-primary-900">{t.name}</td>
                <td className="px-4 py-3 text-primary-600">{t.format}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusVariant[t.status]}`}>
                    {t.status.charAt(0) + t.status.slice(1).toLowerCase()}
                  </span>
                </td>
                <td className="px-4 py-3 text-primary-600">{t.location ?? '—'}</td>
                <td className="px-4 py-3 text-primary-600">{formatDate(t.startDate)}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/tournaments/${t.slug}/edit`}
                    className="inline-flex p-1.5 rounded text-primary-500 hover:bg-primary-100 hover:text-primary-900 transition-colors"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-xs text-primary-400">{filtered.length} of {tournaments.length} tournaments</p>
    </div>
  );
}
