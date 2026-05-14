import type { Metadata } from 'next';
import Link from 'next/link';
import { mockLiveMatches } from '@/lib/mock/live-coverage';
import type { LiveMatchState } from '@pawn-stars/shared-types';

export const metadata: Metadata = {
  title: 'Live Coverage | Pawn Stars',
  description: 'Watch live chess matches from Pawn Stars tournaments in real time.',
};

function MatchCard({ match }: { match: LiveMatchState }) {
  const leader = match.standings[0];
  return (
    <Link
      href={`/live/${match.matchId}`}
      className="block rounded-xl border border-primary-200 bg-white p-5 hover:border-accent-400 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
              </span>
              LIVE
            </span>
            <span className="text-xs text-primary-500">{match.viewers} watching</span>
          </div>
          <h2 className="font-semibold text-primary-900 truncate">{match.tournamentName}</h2>
          <p className="text-sm text-primary-500 mt-0.5">{match.roundLabel} · {match.totalRounds} rounds total</p>
        </div>
        <span className="shrink-0 rounded-md bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700">
          {match.standings.length} players
        </span>
      </div>

      {leader && (
        <div className="mt-4 pt-4 border-t border-primary-100">
          <p className="text-xs text-primary-500 mb-2">Current leader</p>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-accent-400 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {leader.playerName.charAt(0)}
            </div>
            <span className="text-sm font-medium text-primary-900 truncate">{leader.playerName}</span>
            <span className="ml-auto text-sm font-semibold text-accent-600">{leader.points} pts</span>
          </div>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-xs text-primary-500">
        <span>{match.roundResults.length} results posted</span>
        <span className="text-accent-600 font-medium">Watch live →</span>
      </div>
    </Link>
  );
}

export default function LivePage() {
  const liveMatches = mockLiveMatches.filter((m) => m.status === 'live');

  return (
    <div className="min-h-screen bg-primary-50">
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-primary-900">Live Coverage</h1>
            {liveMatches.length > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
                </span>
                {liveMatches.length} LIVE
              </span>
            )}
          </div>
          <p className="text-primary-600">Follow matches in real time with live standings and commentary.</p>
        </div>

        {liveMatches.length === 0 ? (
          <div className="rounded-xl border border-primary-200 bg-white p-12 text-center">
            <p className="text-4xl mb-4">♟</p>
            <p className="font-semibold text-primary-800 text-lg">No live matches right now</p>
            <p className="text-primary-500 text-sm mt-1">Check back when a tournament round is in progress.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {liveMatches.map((m) => (
              <MatchCard key={m.matchId} match={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
