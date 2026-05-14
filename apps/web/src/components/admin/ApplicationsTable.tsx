'use client';

import { useState } from 'react';
import type { Application, ApplicationStatus } from '@pawn-stars/shared-types';

type StatusFilter = 'all' | ApplicationStatus;

const STATUS_FILTERS: StatusFilter[] = ['all', 'pending', 'reviewing', 'accepted', 'rejected'];

const statusStyle: Record<ApplicationStatus, string> = {
  pending: 'bg-primary-100 text-primary-700',
  reviewing: 'bg-accent-100 text-accent-700',
  accepted: 'bg-success-100 text-success-700',
  rejected: 'bg-red-50 text-red-600',
};

const NEXT_STATUSES: Record<ApplicationStatus, ApplicationStatus[]> = {
  pending: ['reviewing', 'accepted', 'rejected'],
  reviewing: ['accepted', 'rejected', 'pending'],
  accepted: ['reviewing', 'rejected'],
  rejected: ['reviewing', 'pending'],
};

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

interface ApplicationsTableProps {
  applications: Application[];
}

export default function ApplicationsTable({ applications }: ApplicationsTableProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [rows, setRows] = useState<Application[]>(applications);

  const filtered = rows.filter(
    (a) => statusFilter === 'all' || a.status === statusFilter,
  );

  function handleStatusChange(id: string, newStatus: ApplicationStatus) {
    setRows((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: newStatus, reviewedAt: new Date(), reviewedBy: 'admin' } : a,
      ),
    );
  }

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
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-primary-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-primary-200 bg-primary-50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Email</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Rating</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Lichess</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Submitted</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-primary-400 text-sm">
                  No applications found.
                </td>
              </tr>
            )}
            {filtered.map((app) => (
              <tr key={app.id} className="hover:bg-primary-50">
                <td className="px-4 py-3 font-medium text-primary-900 whitespace-nowrap">
                  {app.firstName} {app.lastName}
                </td>
                <td className="px-4 py-3 text-primary-600 text-xs">{app.email}</td>
                <td className="px-4 py-3 text-primary-600">{app.rating ?? '—'}</td>
                <td className="px-4 py-3 text-primary-600">{app.lichessHandle ?? '—'}</td>
                <td className="px-4 py-3 text-primary-600 whitespace-nowrap">{formatDate(app.createdAt)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyle[app.status]}`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <select
                    value=""
                    onChange={(e) => {
                      if (e.target.value) handleStatusChange(app.id, e.target.value as ApplicationStatus);
                    }}
                    className="text-xs border border-primary-200 rounded px-2 py-1 text-primary-700 bg-white hover:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
                  >
                    <option value="" disabled>Move to…</option>
                    {NEXT_STATUSES[app.status].map((s) => (
                      <option key={s} value={s} className="capitalize">{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-xs text-primary-400">{filtered.length} of {rows.length} applications</p>
    </div>
  );
}
