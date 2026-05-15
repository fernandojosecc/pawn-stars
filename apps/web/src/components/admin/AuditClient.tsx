'use client';

import { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { AuditLog, AuditAction, AuditStats } from '@pawn-stars/shared-types';

const ACTION_COLORS: Record<AuditAction, string> = {
  [AuditAction.CREATE]: 'bg-green-100 text-green-800',
  [AuditAction.UPDATE]: 'bg-blue-100 text-blue-800',
  [AuditAction.DELETE]: 'bg-red-100 text-red-800',
};

interface Props {
  logs: AuditLog[];
  stats: AuditStats;
}

export default function AuditClient({ logs, stats }: Props) {
  const [entityFilter, setEntityFilter] = useState('');
  const [actionFilter, setActionFilter] = useState<AuditAction | ''>('');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const entities = useMemo(
    () => Array.from(new Set(logs.map((l) => l.entity))).sort(),
    [logs],
  );

  const filtered = useMemo(() => {
    return logs.filter((l) => {
      if (entityFilter && l.entity !== entityFilter) return false;
      if (actionFilter && l.action !== actionFilter) return false;
      if (search && !l.summary.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [logs, entityFilter, actionFilter, search]);

  const chartData = stats.last30Days.slice(-14).map((d) => ({
    date: d.date.slice(5),
    Creates: d.creates,
    Updates: d.updates,
    Deletes: d.deletes,
  }));

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total Logs" value={stats.totalLogs} />
        <StatCard label="Creates" value={stats.byAction[AuditAction.CREATE]} color="text-green-600" />
        <StatCard label="Updates" value={stats.byAction[AuditAction.UPDATE]} color="text-blue-600" />
        <StatCard label="Deletes" value={stats.byAction[AuditAction.DELETE]} color="text-red-600" />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg border border-primary-200 p-4">
        <h2 className="text-sm font-semibold text-primary-800 mb-3">Actions per day (last 14 days)</h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={chartData} margin={{ top: 0, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="Creates" fill="#16a34a" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Updates" fill="#2563eb" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Deletes" fill="#dc2626" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Entity breakdown */}
      <div className="bg-white rounded-lg border border-primary-200 p-4">
        <h2 className="text-sm font-semibold text-primary-800 mb-3">Breakdown by entity</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-primary-500 border-b border-primary-100">
                <th className="pb-2 pr-4 font-medium">Entity</th>
                <th className="pb-2 pr-4 font-medium text-green-600">Creates</th>
                <th className="pb-2 pr-4 font-medium text-blue-600">Updates</th>
                <th className="pb-2 pr-4 font-medium text-red-600">Deletes</th>
                <th className="pb-2 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {stats.byEntity.map((row) => (
                <tr key={row.entity} className="border-b border-primary-50 last:border-0">
                  <td className="py-2 pr-4 font-medium text-primary-900">{row.entity}</td>
                  <td className="py-2 pr-4 text-green-700">{row.creates}</td>
                  <td className="py-2 pr-4 text-blue-700">{row.updates}</td>
                  <td className="py-2 pr-4 text-red-700">{row.deletes}</td>
                  <td className="py-2 text-primary-700 font-medium">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Search summary..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 text-sm border border-primary-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
        />
        <select
          value={entityFilter}
          onChange={(e) => setEntityFilter(e.target.value)}
          className="text-sm border border-primary-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="">All entities</option>
          {entities.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value as AuditAction | '')}
          className="text-sm border border-primary-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="">All actions</option>
          <option value={AuditAction.CREATE}>CREATE</option>
          <option value={AuditAction.UPDATE}>UPDATE</option>
          <option value={AuditAction.DELETE}>DELETE</option>
        </select>
      </div>

      {/* Activity feed */}
      <div className="space-y-2">
        <p className="text-xs text-primary-400">{filtered.length} entries</p>
        {filtered.map((log) => (
          <div
            key={log.id}
            className="bg-white rounded-lg border border-primary-200 overflow-hidden"
          >
            <button
              onClick={() => setExpanded(expanded === log.id ? null : log.id)}
              className="w-full flex items-start gap-3 p-3 text-left hover:bg-primary-50 transition-colors"
            >
              <span className={`mt-0.5 shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${ACTION_COLORS[log.action]}`}>
                {log.action}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-primary-900 truncate">{log.summary}</p>
                <p className="text-xs text-primary-400 mt-0.5">
                  {log.entity} · {log.userEmail} · {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>
            </button>

            {expanded === log.id && (log.before ?? log.after) && (
              <div className="border-t border-primary-100 px-3 py-2 bg-primary-50 text-xs font-mono text-primary-700 space-y-1">
                {log.before && (
                  <div>
                    <span className="font-semibold text-red-600">Before: </span>
                    {JSON.stringify(log.before, null, 2).slice(0, 300)}
                  </div>
                )}
                {log.after && (
                  <div>
                    <span className="font-semibold text-green-600">After: </span>
                    {JSON.stringify(log.after, null, 2).slice(0, 300)}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, color = 'text-primary-900' }: { label: string; value: number; color?: string }) {
  return (
    <div className="bg-white rounded-lg border border-primary-200 p-3">
      <p className="text-xs text-primary-400">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}
