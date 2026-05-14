'use client';

import { useMatchCoverage } from '@/hooks/useMatchCoverage';
import type { LiveMatchState } from '@pawn-stars/shared-types';

interface Props {
  matchId: string;
  fallback: LiveMatchState;
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'connected') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
        </span>
        LIVE
      </span>
    );
  }
  if (status === 'reconnecting') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-700">
        <span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
        Reconnecting…
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-semibold text-primary-600">
      <span className="h-2 w-2 rounded-full bg-primary-400" />
      Offline · cached data
    </span>
  );
}

function ResultChip({ result }: { result: '1-0' | '0-1' | '1/2-1/2' | '*' }) {
  if (result === '1-0') return <span className="font-semibold text-green-700">1-0</span>;
  if (result === '0-1') return <span className="font-semibold text-red-700">0-1</span>;
  if (result === '1/2-1/2') return <span className="font-semibold text-primary-500">½-½</span>;
  return <span className="text-primary-400 italic">ongoing</span>;
}

function timeAgo(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function MatchCoverageClient({ matchId, fallback }: Props) {
  const { state, standings, roundResults, coverageFeed, viewers, connectionStatus, lastMove } =
    useMatchCoverage(matchId, fallback);

  const display = state ?? fallback;

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header */}
      <div className="bg-white border-b border-primary-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="min-w-0">
            <h1 className="font-bold text-primary-900 truncate">{display.tournamentName}</h1>
            <p className="text-xs text-primary-500">{display.roundLabel} · Round {display.currentRound}/{display.totalRounds}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-primary-500">{viewers} watching</span>
            <StatusBadge status={connectionStatus} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid gap-6 lg:grid-cols-3">
        {/* Left column: standings + round results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Last move flash */}
          {lastMove && (
            <div className="rounded-xl border border-accent-300 bg-accent-50 px-4 py-3 flex items-center gap-3">
              <span className="text-xl">♟</span>
              <div>
                <p className="text-xs font-medium text-accent-700">Last move</p>
                <p className="font-mono font-bold text-accent-900">{lastMove.san}</p>
              </div>
              <span className="ml-auto text-xs text-accent-600">ply {lastMove.ply}</span>
            </div>
          )}

          {/* Standings */}
          <section className="bg-white rounded-xl border border-primary-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-primary-100">
              <h2 className="font-semibold text-primary-900 text-sm">Standings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary-50 text-left text-xs text-primary-500">
                    <th className="px-4 py-2 font-medium">#</th>
                    <th className="px-4 py-2 font-medium">Player</th>
                    <th className="px-4 py-2 font-medium text-right">Pts</th>
                    <th className="px-4 py-2 font-medium text-right">W</th>
                    <th className="px-4 py-2 font-medium text-right">D</th>
                    <th className="px-4 py-2 font-medium text-right">L</th>
                    <th className="px-4 py-2 font-medium text-right">GP</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((row, i) => (
                    <tr
                      key={row.playerId}
                      className={`border-t border-primary-100 ${i === 0 ? 'bg-accent-50' : ''}`}
                    >
                      <td className="px-4 py-2.5 font-bold text-primary-500">{i + 1}</td>
                      <td className="px-4 py-2.5 font-medium text-primary-900">
                        <div className="flex items-center gap-2">
                          {i === 0 && <span className="text-accent-500">♛</span>}
                          {row.playerName}
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-right font-bold text-primary-900">{row.points}</td>
                      <td className="px-4 py-2.5 text-right text-green-700">{row.wins}</td>
                      <td className="px-4 py-2.5 text-right text-primary-500">{row.draws}</td>
                      <td className="px-4 py-2.5 text-right text-red-600">{row.losses}</td>
                      <td className="px-4 py-2.5 text-right text-primary-500">{row.gamesPlayed}</td>
                    </tr>
                  ))}
                  {standings.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-6 text-center text-primary-400 text-sm">
                        Standings will appear once results are posted.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Round results */}
          <section className="bg-white rounded-xl border border-primary-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-primary-100">
              <h2 className="font-semibold text-primary-900 text-sm">Round Results</h2>
            </div>
            {roundResults.length === 0 ? (
              <p className="px-4 py-6 text-center text-primary-400 text-sm">No results posted yet.</p>
            ) : (
              <div className="divide-y divide-primary-100">
                {roundResults.map((r, i) => (
                  <div key={i} className="px-4 py-3 flex items-center gap-3 text-sm">
                    <span className="shrink-0 text-xs text-primary-400 w-14">Rd {r.roundNumber}</span>
                    <span className="text-primary-900 min-w-0 truncate flex-1">{r.whitePlayerName}</span>
                    <span className="shrink-0 w-16 text-center">
                      <ResultChip result={r.result} />
                    </span>
                    <span className="text-primary-900 min-w-0 truncate flex-1 text-right">{r.blackPlayerName}</span>
                    {r.moves && (
                      <span className="shrink-0 text-xs text-primary-400 w-12 text-right">{r.moves} mvs</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right column: coverage feed */}
        <div className="space-y-4">
          <section className="bg-white rounded-xl border border-primary-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-primary-100 flex items-center justify-between">
              <h2 className="font-semibold text-primary-900 text-sm">Coverage Feed</h2>
              <span className="text-xs text-primary-400">{coverageFeed.length} entries</span>
            </div>
            <div className="divide-y divide-primary-100 max-h-[60vh] overflow-y-auto">
              {coverageFeed.length === 0 ? (
                <p className="px-4 py-6 text-center text-primary-400 text-sm">Coverage will appear here.</p>
              ) : (
                coverageFeed.map((msg) => (
                  <div key={msg.id} className="px-4 py-3">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-primary-700">{msg.author}</span>
                      <span className="text-xs text-primary-400 shrink-0">{timeAgo(msg.timestamp)}</span>
                    </div>
                    <p className="text-sm text-primary-800 leading-snug">{msg.text}</p>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Connection indicator */}
          {(connectionStatus === 'reconnecting' || connectionStatus === 'disconnected') && (
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-xs text-yellow-800">
              <p className="font-semibold mb-0.5">
                {connectionStatus === 'reconnecting' ? 'Reconnecting to live feed…' : 'Live feed unavailable'}
              </p>
              <p className="text-yellow-700">
                {connectionStatus === 'reconnecting'
                  ? 'Showing last known data. Will resume automatically.'
                  : 'Showing cached state. Check your connection.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
