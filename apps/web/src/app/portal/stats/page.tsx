import type { Metadata } from 'next';
import PerformanceChart from '@/components/portal/PerformanceChart';
import {
  mockSeasonStats,
  mockPerformanceHistory,
  mockOpeningStats,
  mockPortalPlayer,
} from '@/lib/mock/portal';

export const metadata: Metadata = { title: 'My Stats' };

function WinDrawLossBar({ wins, draws, losses }: { wins: number; draws: number; losses: number }) {
  const total = wins + draws + losses || 1;
  return (
    <div className="w-full">
      <div className="flex h-3 rounded-full overflow-hidden gap-px">
        <div
          className="bg-success-500 transition-all"
          style={{ width: `${(wins / total) * 100}%` }}
          title={`Wins: ${wins}`}
        />
        <div
          className="bg-primary-300 transition-all"
          style={{ width: `${(draws / total) * 100}%` }}
          title={`Draws: ${draws}`}
        />
        <div
          className="bg-red-400 transition-all"
          style={{ width: `${(losses / total) * 100}%` }}
          title={`Losses: ${losses}`}
        />
      </div>
      <div className="flex gap-4 mt-2 text-xs text-primary-500">
        <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-success-500" />Wins {wins}</span>
        <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-primary-300" />Draws {draws}</span>
        <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-red-400" />Losses {losses}</span>
      </div>
    </div>
  );
}

function OpeningRow({ name, count, wins, draws, losses, winRate }: {
  name: string; count: number; wins: number; draws: number; losses: number; winRate: number;
}) {
  return (
    <div className="py-3 border-b border-primary-100 last:border-0">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-primary-800">{name}</span>
        <span className="text-xs text-primary-500">{count} games</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <WinDrawLossBar wins={wins} draws={draws} losses={losses} />
        </div>
        <span className="text-sm font-semibold text-primary-700 w-12 text-right">{winRate}%</span>
      </div>
    </div>
  );
}

export default function PortalStatsPage() {
  const s = mockSeasonStats;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-lg font-semibold text-primary-900">
        My Stats — {s.seasonName} Season
      </h1>

      {/* Season summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: 'Games Played',  value: s.totalGamesPlayed },
          { label: 'Wins',          value: s.totalWins,        color: 'text-success-600' },
          { label: 'Draws',         value: s.totalDraws,       color: 'text-primary-500' },
          { label: 'Losses',        value: s.totalLosses,      color: 'text-red-500' },
          { label: 'Win Rate',      value: `${s.averageWinRate}%`, color: 'text-success-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-primary-200 rounded-lg p-4">
            <p className="text-xs text-primary-500 uppercase tracking-wide font-medium">{label}</p>
            <p className={`mt-1 text-2xl font-bold ${color ?? 'text-primary-900'}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* W/D/L bar */}
      <div className="bg-white border border-primary-200 rounded-lg p-5">
        <h2 className="text-sm font-semibold text-primary-700 mb-4">Win / Draw / Loss Breakdown</h2>
        <WinDrawLossBar wins={s.totalWins} draws={s.totalDraws} losses={s.totalLosses} />
      </div>

      {/* Performance rating chart */}
      <div className="bg-white border border-primary-200 rounded-lg p-5">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-semibold text-primary-700">Performance Rating by Tournament</h2>
          <div className="flex items-center gap-4 text-xs text-primary-400">
            <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-sm bg-primary-700" />Perf.</span>
            <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-sm bg-primary-300" />Rating</span>
          </div>
        </div>
        <p className="text-xs text-primary-400 mb-4">
          Best: {s.bestPerformanceRating} · Average: {s.averagePerformanceRating}
        </p>
        <PerformanceChart data={mockPerformanceHistory} currentRating={mockPortalPlayer.currentRating} />
      </div>

      {/* Opening repertoire */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-primary-200 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-primary-700 mb-2">Openings as White</h2>
          {mockOpeningStats.asWhite.map((o) => (
            <OpeningRow key={o.name} {...o} />
          ))}
        </div>
        <div className="bg-white border border-primary-200 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-primary-700 mb-2">Openings as Black</h2>
          {mockOpeningStats.asBlack.map((o) => (
            <OpeningRow key={o.name} {...o} />
          ))}
        </div>
      </div>
    </div>
  );
}
