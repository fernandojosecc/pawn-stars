import { SeasonPlayerPerformance } from '@pawn-stars/shared-types'
import Link from 'next/link'

export function PlayerPerformanceTable({ performers }: { performers: SeasonPlayerPerformance[] }) {
  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-primary-200 text-left">
            <th className="px-4 py-3 font-semibold text-primary-600">#</th>
            <th className="px-4 py-3 font-semibold text-primary-600">Player</th>
            <th className="px-4 py-3 font-semibold text-primary-600 text-right whitespace-nowrap hidden sm:table-cell">Events</th>
            <th className="px-4 py-3 font-semibold text-primary-600 text-right whitespace-nowrap">Games</th>
            <th className="px-4 py-3 font-semibold text-primary-600 text-right whitespace-nowrap">W / D / L</th>
            <th className="px-4 py-3 font-semibold text-primary-600 text-right whitespace-nowrap hidden md:table-cell">Win %</th>
            <th className="px-4 py-3 font-semibold text-primary-600 text-right whitespace-nowrap hidden md:table-cell">Avg perf.</th>
            <th className="px-4 py-3 font-semibold text-primary-600 text-right whitespace-nowrap hidden lg:table-cell">Avg opp.</th>
            <th className="px-4 py-3 font-semibold text-primary-600 text-right whitespace-nowrap hidden sm:table-cell">Best finish</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-100">
          {performers.map((p, i) => (
            <tr key={p.playerId} className="hover:bg-primary-50 transition-colors">
              <td className="px-4 py-3 font-bold text-primary-400">{i + 1}</td>
              <td className="px-4 py-3">
                <Link
                  href={`/players/${p.playerId}`}
                  className="hover:text-accent-700 hover:underline"
                >
                  <span className="font-medium text-primary-900">
                    {p.playerTitle && (
                      <span className="text-accent-600 mr-1 text-xs">{p.playerTitle}</span>
                    )}
                    {p.playerName}
                  </span>
                </Link>
                <p className="text-xs text-primary-400">{p.playerNationality}</p>
              </td>
              <td className="px-4 py-3 text-right text-primary-600 hidden sm:table-cell">
                {p.tournamentsPlayed}
              </td>
              <td className="px-4 py-3 text-right text-primary-600">{p.totalGames}</td>
              <td className="px-4 py-3 text-right font-mono whitespace-nowrap">
                <span className="text-success-700">{p.wins}</span>
                {' / '}
                <span className="text-primary-500">{p.draws}</span>
                {' / '}
                <span className="text-danger-600">{p.losses}</span>
              </td>
              <td className="px-4 py-3 text-right text-primary-700 font-medium hidden md:table-cell">
                {Math.round(p.winRate * 100)}%
              </td>
              <td className="px-4 py-3 text-right font-bold text-primary-900 hidden md:table-cell">
                {p.averagePerformanceRating}
              </td>
              <td className="px-4 py-3 text-right text-primary-600 hidden lg:table-cell">
                {p.averageOpponentRating}
              </td>
              <td className="px-4 py-3 text-right font-semibold text-accent-700 hidden sm:table-cell">
                {p.bestTournamentFinish}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
