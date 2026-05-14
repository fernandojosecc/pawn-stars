'use client';

import { useState } from 'react';
import type { SponsorCampaign } from '@pawn-stars/shared-types';

const STATUS_STYLES: Record<SponsorCampaign['status'], string> = {
  active: 'bg-green-100 text-green-700',
  completed: 'bg-primary-100 text-primary-600',
  paused: 'bg-yellow-100 text-yellow-700',
};

function fmt(n: number) {
  return n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `${(n / 1_000).toFixed(1)}K`
    : String(n);
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function fmtUsd(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

interface Props {
  campaigns: SponsorCampaign[];
}

export default function CampaignsClient({ campaigns }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {campaigns.map((c) => {
        const isOpen = expanded === c.id;
        const ctr = c.impressions > 0 ? ((c.clicks / c.impressions) * 100).toFixed(2) : '—';
        const cvr = c.clicks > 0 ? ((c.conversions / c.clicks) * 100).toFixed(1) : '—';

        return (
          <div key={c.id} className="bg-white rounded-xl border border-primary-200 overflow-hidden">
            {/* Header row — always visible */}
            <button
              className="w-full text-left px-5 py-4 flex items-start gap-4"
              onClick={() => setExpanded(isOpen ? null : c.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[c.status]}`}>
                    {c.status}
                  </span>
                  <span className="text-xs text-primary-400">
                    {fmtDate(c.startDate)} – {fmtDate(c.endDate)}
                  </span>
                </div>
                <p className="font-semibold text-primary-900 text-sm">{c.name}</p>
              </div>

              {/* Key metrics strip — hide on mobile, show on md+ */}
              <div className="hidden md:flex items-center gap-6 shrink-0 text-center">
                <div>
                  <p className="text-lg font-bold text-primary-900">{fmt(c.impressions)}</p>
                  <p className="text-xs text-primary-400">Impressions</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-primary-900">{fmt(c.clicks)}</p>
                  <p className="text-xs text-primary-400">Clicks</p>
                </div>
                <div>
                  <p className={`text-lg font-bold ${c.roi > 0 ? 'text-green-700' : 'text-primary-400'}`}>
                    {c.roi > 0 ? `${c.roi}%` : '—'}
                  </p>
                  <p className="text-xs text-primary-400">ROI</p>
                </div>
              </div>

              <span className="shrink-0 text-primary-400 mt-1 text-sm">{isOpen ? '▲' : '▼'}</span>
            </button>

            {/* Mobile metric strip */}
            {c.impressions > 0 && (
              <div className="md:hidden grid grid-cols-3 border-t border-primary-100 divide-x divide-primary-100">
                {[
                  { label: 'Impressions', val: fmt(c.impressions) },
                  { label: 'Clicks', val: fmt(c.clicks) },
                  { label: 'ROI', val: c.roi > 0 ? `${c.roi}%` : '—' },
                ].map(({ label, val }) => (
                  <div key={label} className="py-2 text-center">
                    <p className="text-sm font-bold text-primary-900">{val}</p>
                    <p className="text-xs text-primary-400">{label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Expanded detail */}
            {isOpen && (
              <div className="border-t border-primary-100 px-5 py-5 space-y-5">
                <p className="text-sm text-primary-700 leading-relaxed">{c.description}</p>

                {/* Full metrics grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Budget', val: fmtUsd(c.budget) },
                    { label: 'Impressions', val: fmt(c.impressions) || '—' },
                    { label: 'Clicks', val: fmt(c.clicks) || '—' },
                    { label: 'CTR', val: ctr !== '—' ? `${ctr}%` : '—' },
                    { label: 'Conversions', val: fmt(c.conversions) || '—' },
                    { label: 'CVR', val: cvr !== '—' ? `${cvr}%` : '—' },
                    { label: 'ROI', val: c.roi > 0 ? `${c.roi}%` : '—' },
                    { label: 'Status', val: c.status.charAt(0).toUpperCase() + c.status.slice(1) },
                  ].map(({ label, val }) => (
                    <div key={label} className="rounded-lg bg-primary-50 px-3 py-3">
                      <p className="text-xs text-primary-500 mb-0.5">{label}</p>
                      <p className="text-sm font-semibold text-primary-900">{val}</p>
                    </div>
                  ))}
                </div>

                {/* Placements */}
                <div>
                  <p className="text-xs font-semibold text-primary-500 uppercase tracking-wide mb-2">Placements</p>
                  <div className="flex flex-wrap gap-2">
                    {c.placements.map((p) => (
                      <span key={p} className="rounded-full bg-accent-50 border border-accent-200 text-accent-700 text-xs px-3 py-1 font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
