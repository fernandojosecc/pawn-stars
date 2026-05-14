'use client';

import { useState } from 'react';
import { NewsletterPreference } from '@pawn-stars/shared-types';
import type { NewsletterSendResult } from '@pawn-stars/shared-types';

const PREF_LABELS: Record<NewsletterPreference, string> = {
  [NewsletterPreference.MATCH_RESULTS]:      'Match Results',
  [NewsletterPreference.TOURNAMENT_UPDATES]: 'Tournament Updates',
  [NewsletterPreference.TEAM_NEWS]:          'Team News',
  [NewsletterPreference.BLOG_POSTS]:         'Blog & Analysis',
};

interface Stats {
  total: number;
  confirmed: number;
  unconfirmed: number;
  unsubscribed: number;
  byPreference: Record<NewsletterPreference, number>;
}

interface Props {
  initialStats: Stats;
  initialHistory: NewsletterSendResult[];
}

type SendState = 'idle' | 'sending' | 'sent' | 'error';

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function NewsletterAdminClient({ initialStats, initialHistory }: Props) {
  const [stats] = useState<Stats>(initialStats);
  const [history, setHistory] = useState<NewsletterSendResult[]>(initialHistory);

  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [segment, setSegment] = useState<NewsletterPreference | ''>('');
  const [sendState, setSendState] = useState<SendState>('idle');
  const [sendError, setSendError] = useState('');
  const [lastResult, setLastResult] = useState<NewsletterSendResult | null>(null);

  const recipientEstimate = segment
    ? (stats.byPreference[segment as NewsletterPreference] ?? 0)
    : stats.confirmed;

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSendState('sending');
    setSendError('');

    // Simulate the send in demo mode (NestJS not running)
    await new Promise((r) => setTimeout(r, 1400));

    const result: NewsletterSendResult = {
      id: `send-${Date.now()}`,
      subject,
      sentAt: new Date().toISOString(),
      recipientCount: recipientEstimate,
      segment: segment as NewsletterPreference | undefined || undefined,
      success: true,
    };

    setLastResult(result);
    setHistory((prev) => [result, ...prev]);
    setSendState('sent');
  }

  function handleReset() {
    setSendState('idle');
    setSubject('');
    setBody('');
    setSegment('');
    setLastResult(null);
  }

  return (
    <div className="space-y-8">
      {/* ── Subscriber stats ─────────────────────────────────────────────── */}
      <section>
        <h2 className="font-semibold text-primary-900 mb-4">Subscriber Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total',        val: stats.total,        color: 'text-primary-900' },
            { label: 'Confirmed',    val: stats.confirmed,    color: 'text-green-700' },
            { label: 'Unconfirmed',  val: stats.unconfirmed,  color: 'text-yellow-700' },
            { label: 'Unsubscribed', val: stats.unsubscribed, color: 'text-red-600' },
          ].map(({ label, val, color }) => (
            <div key={label} className="bg-white rounded-xl border border-primary-200 px-5 py-4">
              <p className={`text-2xl font-bold ${color}`}>{val}</p>
              <p className="text-xs text-primary-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Segment breakdown */}
        <div className="bg-white rounded-xl border border-primary-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-primary-100">
            <h3 className="text-sm font-semibold text-primary-800">Confirmed subscribers by preference</h3>
          </div>
          <div className="divide-y divide-primary-100">
            {Object.entries(stats.byPreference).map(([pref, count]) => {
              const pct = stats.confirmed > 0 ? Math.round((count / stats.confirmed) * 100) : 0;
              return (
                <div key={pref} className="px-5 py-3 flex items-center gap-4">
                  <span className="text-sm text-primary-700 flex-1">{PREF_LABELS[pref as NewsletterPreference] ?? pref}</span>
                  <div className="flex-1 hidden sm:block">
                    <div className="h-2 bg-primary-100 rounded-full overflow-hidden">
                      <div className="h-full bg-accent-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary-900 w-8 text-right">{count}</span>
                  <span className="text-xs text-primary-400 w-10 text-right">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Send form ────────────────────────────────────────────────────── */}
      <section>
        <h2 className="font-semibold text-primary-900 mb-4">Send Newsletter</h2>

        {sendState === 'sent' && lastResult ? (
          <div className="rounded-xl border border-green-200 bg-green-50 px-6 py-8 text-center">
            <p className="text-3xl mb-3">✓</p>
            <p className="font-semibold text-green-900 text-lg">Newsletter sent!</p>
            <p className="text-green-700 text-sm mt-1">
              <strong>{lastResult.recipientCount}</strong> recipients · subject: &ldquo;{lastResult.subject}&rdquo;
            </p>
            {lastResult.segment && (
              <p className="text-green-600 text-xs mt-1">
                Segment: {PREF_LABELS[lastResult.segment]}
              </p>
            )}
            <button onClick={handleReset} className="mt-5 text-sm text-green-700 underline hover:text-green-900">
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="bg-white rounded-xl border border-primary-200 p-6 space-y-5 max-w-2xl">
            <div>
              <label className="block text-xs font-semibold text-primary-500 mb-1.5">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Spring Open 2026 — Round 5 results"
                className="w-full rounded-lg border border-primary-200 px-3 py-2.5 text-sm text-primary-900 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-primary-500 mb-1.5">
                Body <span className="text-red-500">*</span>
                <span className="font-normal ml-1">— separate paragraphs with a blank line</span>
              </label>
              <textarea
                required
                rows={8}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write the newsletter body here. Separate paragraphs with blank lines."
                className="w-full rounded-lg border border-primary-200 px-3 py-2.5 text-sm text-primary-900 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-400 resize-y"
              />
              <p className="mt-1 text-xs text-primary-400">
                ~{body.split(/\s+/).filter(Boolean).length} words
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-primary-500 mb-1.5">
                Segment filter <span className="font-normal">(optional — leave blank to send to all confirmed)</span>
              </label>
              <select
                value={segment}
                onChange={(e) => setSegment(e.target.value as NewsletterPreference | '')}
                className="w-full rounded-lg border border-primary-200 px-3 py-2.5 text-sm bg-white text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-400"
              >
                <option value="">All confirmed subscribers ({stats.confirmed})</option>
                {Object.entries(PREF_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>
                    {label} ({stats.byPreference[val as NewsletterPreference] ?? 0})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between pt-1 flex-wrap gap-3">
              <p className="text-sm text-primary-600">
                Will send to{' '}
                <strong className="text-primary-900">{recipientEstimate}</strong>{' '}
                confirmed subscriber{recipientEstimate !== 1 ? 's' : ''}.
              </p>
              {sendState === 'error' && (
                <p className="text-sm text-red-600">{sendError}</p>
              )}
              <button
                type="submit"
                disabled={sendState === 'sending' || !subject.trim() || !body.trim()}
                className="rounded-lg bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-white font-semibold px-6 py-2.5 text-sm transition-colors flex items-center gap-2"
              >
                {sendState === 'sending' ? (
                  <>
                    <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Sending…
                  </>
                ) : (
                  '✉ Send newsletter'
                )}
              </button>
            </div>
          </form>
        )}
      </section>

      {/* ── Send history ─────────────────────────────────────────────────── */}
      <section>
        <h2 className="font-semibold text-primary-900 mb-4">Send History</h2>
        {history.length === 0 ? (
          <p className="text-sm text-primary-500 bg-white rounded-xl border border-primary-200 px-5 py-6 text-center">
            No newsletters sent yet.
          </p>
        ) : (
          <div className="bg-white rounded-xl border border-primary-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary-50 text-xs text-primary-500 text-left">
                    <th className="px-5 py-2.5 font-medium">Subject</th>
                    <th className="px-5 py-2.5 font-medium">Sent</th>
                    <th className="px-5 py-2.5 font-medium text-right">Recipients</th>
                    <th className="px-5 py-2.5 font-medium">Segment</th>
                    <th className="px-5 py-2.5 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((row, i) => (
                    <tr key={row.id} className={`border-t border-primary-100 ${i % 2 !== 0 ? 'bg-primary-50/40' : ''}`}>
                      <td className="px-5 py-3 font-medium text-primary-900 max-w-xs truncate">{row.subject}</td>
                      <td className="px-5 py-3 text-primary-600 whitespace-nowrap">{fmtDate(row.sentAt)}</td>
                      <td className="px-5 py-3 text-right font-semibold text-primary-900">{row.recipientCount}</td>
                      <td className="px-5 py-3 text-primary-500 text-xs">
                        {row.segment ? PREF_LABELS[row.segment] : 'All'}
                      </td>
                      <td className="px-5 py-3">
                        {row.success ? (
                          <span className="rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold">Sent</span>
                        ) : (
                          <span className="rounded-full bg-red-100 text-red-700 px-2 py-0.5 text-xs font-semibold" title={row.error}>Failed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
