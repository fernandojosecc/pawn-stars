import type { Metadata } from 'next';
import CountdownTimer from '@/components/portal/CountdownTimer';
import { mockPortalPlayer, mockNextMatch, mockRecentForm, mockSeasonStats } from '@/lib/mock/portal';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = { title: 'Dashboard' };

const formColors: Record<'W' | 'D' | 'L', string> = {
  W: 'bg-success-500 text-white',
  D: 'bg-primary-400 text-white',
  L: 'bg-red-400 text-white',
};

function formatMatchDate(d: Date) {
  return new Date(d).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function PortalDashboardPage() {
  const { firstName, lastName, title, currentRating } = mockPortalPlayer;

  return (
    <div className="p-6 space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-xl font-semibold text-primary-900">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-sm text-primary-500">
          {title && <span className="font-medium text-primary-700">{title} </span>}
          {firstName} {lastName} · FIDE {currentRating}
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-primary-200 rounded-lg p-4">
          <p className="text-xs text-primary-500 uppercase tracking-wide font-medium">FIDE Rating</p>
          <p className="mt-1 text-2xl font-bold text-primary-900">{currentRating}</p>
        </div>
        <div className="bg-white border border-primary-200 rounded-lg p-4">
          <p className="text-xs text-primary-500 uppercase tracking-wide font-medium">Season Games</p>
          <p className="mt-1 text-2xl font-bold text-primary-900">{mockSeasonStats.totalGamesPlayed}</p>
        </div>
        <div className="bg-white border border-primary-200 rounded-lg p-4">
          <p className="text-xs text-primary-500 uppercase tracking-wide font-medium">Win Rate</p>
          <p className="mt-1 text-2xl font-bold text-success-600">{mockSeasonStats.averageWinRate}%</p>
        </div>
        <div className="bg-white border border-primary-200 rounded-lg p-4">
          <p className="text-xs text-primary-500 uppercase tracking-wide font-medium">Perf. Rating</p>
          <p className="mt-1 text-2xl font-bold text-accent-600">{mockSeasonStats.averagePerformanceRating}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next match + countdown */}
        <div className="bg-white border border-primary-200 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-primary-700 mb-4">Next Match</h2>
          <div className="mb-4">
            <p className="font-semibold text-primary-900">{mockNextMatch.event}</p>
            <p className="text-sm text-primary-600 mt-1">
              vs.{' '}
              <span className="font-medium">
                {mockNextMatch.opponentTitle} {mockNextMatch.opponent}
              </span>
              {' '}· Board {mockNextMatch.board} · {mockNextMatch.side} pieces
            </p>
            <p className="text-xs text-primary-400 mt-1">
              {formatMatchDate(mockNextMatch.date)} · {mockNextMatch.venue}
            </p>
          </div>
          <CountdownTimer targetDate={mockNextMatch.date} />
        </div>

        {/* Recent form */}
        <div className="bg-white border border-primary-200 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-primary-700 mb-4">Recent Form</h2>
          <div className="flex gap-2 mb-4">
            {mockRecentForm.map((game, i) => (
              <div
                key={i}
                className={`w-9 h-9 rounded-md flex items-center justify-center text-sm font-bold ${formColors[game.result]}`}
                title={`${game.result} vs ${game.opponent}`}
              >
                {game.result}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {mockRecentForm.map((game, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-primary-600">{game.event}</span>
                <div className="flex items-center gap-2">
                  <span className="text-primary-500">vs. {game.opponent}</span>
                  <span className={`font-semibold ${game.result === 'W' ? 'text-success-600' : game.result === 'L' ? 'text-red-500' : 'text-primary-500'}`}>
                    {game.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
