'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import type { ReachMetrics } from '@pawn-stars/shared-types';

interface Props {
  metrics: ReachMetrics;
}

const PALETTE = ['#475569', '#f59e0b', '#22c55e', '#3b82f6', '#a78bfa', '#f87171'];

function fmt(n: number) {
  return n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n / 1_000).toFixed(0)}K` : String(n);
}

export default function ReachChartsClient({ metrics }: Props) {
  return (
    <div className="space-y-8">
      {/* Pageview trends */}
      <section className="bg-white rounded-xl border border-primary-200 p-5">
        <h2 className="font-semibold text-primary-900 mb-4">Pageview Trends — Sponsor-Adjacent Pages</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={metrics.pageviewTrends} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => fmt(v as number)} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => fmt(v as number)} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="matches" name="Matches" fill="#475569" radius={[3, 3, 0, 0]} />
              <Bar dataKey="tournaments" name="Tournaments" fill="#f59e0b" radius={[3, 3, 0, 0]} />
              <Bar dataKey="players" name="Players" fill="#22c55e" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Demographic split */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Geography */}
        <section className="bg-white rounded-xl border border-primary-200 p-5">
          <h2 className="font-semibold text-primary-900 mb-4">Audience Geography</h2>
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.geographyBreakdown}
                  dataKey="value"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={({ name, value }) => `${name} ${value}%`}
                  labelLine={false}
                >
                  {metrics.geographyBreakdown.map((_, i) => (
                    <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-1.5">
            {metrics.geographyBreakdown.map((d, i) => (
              <li key={d.label} className="flex items-center gap-2 text-sm">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: PALETTE[i % PALETTE.length] }} />
                <span className="flex-1 text-primary-700">{d.label}</span>
                <span className="font-semibold text-primary-900">{d.value}%</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Age range */}
        <section className="bg-white rounded-xl border border-primary-200 p-5">
          <h2 className="font-semibold text-primary-900 mb-4">Audience Age Range</h2>
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.ageBreakdown} layout="vertical" margin={{ top: 0, right: 16, left: 24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="label" tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => `${v}%`} />
                <Bar dataKey="value" name="Audience %" radius={[0, 3, 3, 0]}>
                  {metrics.ageBreakdown.map((_, i) => (
                    <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-1.5">
            {metrics.ageBreakdown.map((d, i) => (
              <li key={d.label} className="flex items-center gap-2 text-sm">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: PALETTE[i % PALETTE.length] }} />
                <span className="flex-1 text-primary-700">{d.label}</span>
                <span className="font-semibold text-primary-900">{d.value}%</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Social reach */}
      <section className="bg-white rounded-xl border border-primary-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-primary-100">
          <h2 className="font-semibold text-primary-900">Social Media Reach</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary-50 text-xs text-primary-500 text-left">
                <th className="px-5 py-2.5 font-medium">Platform</th>
                <th className="px-5 py-2.5 font-medium text-right">Followers</th>
                <th className="px-5 py-2.5 font-medium text-right">Impressions</th>
                <th className="px-5 py-2.5 font-medium text-right">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {metrics.socialReach.map((s, i) => (
                <tr key={s.platform} className={`border-t border-primary-100 ${i % 2 === 0 ? '' : 'bg-primary-50/40'}`}>
                  <td className="px-5 py-3 font-medium text-primary-900">{s.platform}</td>
                  <td className="px-5 py-3 text-right text-primary-700">{fmt(s.followers)}</td>
                  <td className="px-5 py-3 text-right text-primary-700">{fmt(s.impressions)}</td>
                  <td className="px-5 py-3 text-right font-semibold text-accent-700">{s.engagementRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
