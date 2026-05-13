import { SeasonTournamentRecord } from '@pawn-stars/shared-types'
import Link from 'next/link'

const statusClasses: Record<string, string> = {
  COMPLETED: 'bg-accent-100  text-accent-800',
  ONGOING:   'bg-success-100 text-success-800',
  UPCOMING:  'bg-primary-100 text-primary-800',
}

function fmt(d: Date) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function TournamentsTable({ tournaments }: { tournaments: SeasonTournamentRecord[] }) {
  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-primary-200 text-left">
            <th className="px-4 py-3 font-semibold text-primary-600 whitespace-nowrap">Tournament</th>
            <th className="px-4 py-3 font-semibold text-primary-600 whitespace-nowrap hidden sm:table-cell">Format</th>
            <th className="px-4 py-3 font-semibold text-primary-600 whitespace-nowrap hidden md:table-cell">Dates</th>
            <th className="px-4 py-3 font-semibold text-primary-600 whitespace-nowrap">Status</th>
            <th className="px-4 py-3 font-semibold text-primary-600 whitespace-nowrap text-right">W / D / L</th>
            <th className="px-4 py-3 font-semibold text-primary-600 whitespace-nowrap text-right hidden sm:table-cell">Finish</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-100">
          {tournaments.map((t) => (
            <tr key={t.tournamentId} className="hover:bg-primary-50 transition-colors">
              <td className="px-4 py-3">
                <Link
                  href={`/tournaments/${t.tournamentSlug}`}
                  className="font-medium text-primary-900 hover:text-accent-700 hover:underline"
                >
                  {t.tournamentName}
                </Link>
                {t.location && (
                  <p className="text-xs text-primary-400 mt-0.5 hidden sm:block">{t.location}</p>
                )}
              </td>
              <td className="px-4 py-3 text-primary-600 whitespace-nowrap hidden sm:table-cell">
                {t.format}
              </td>
              <td className="px-4 py-3 text-primary-600 whitespace-nowrap hidden md:table-cell">
                {fmt(t.startDate)}
                {t.endDate && <span className="text-primary-400"> – {fmt(t.endDate)}</span>}
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusClasses[t.status] ?? 'bg-primary-100 text-primary-800'}`}>
                  {t.status.charAt(0) + t.status.slice(1).toLowerCase()}
                </span>
              </td>
              <td className="px-4 py-3 text-right whitespace-nowrap">
                {t.gamesPlayed > 0 ? (
                  <span className="font-mono text-primary-900">
                    <span className="text-success-700">{t.wins}</span>
                    {' / '}
                    <span className="text-primary-500">{t.draws}</span>
                    {' / '}
                    <span className="text-danger-600">{t.losses}</span>
                  </span>
                ) : (
                  <span className="text-primary-400">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-right hidden sm:table-cell">
                {t.teamFinish ? (
                  <span className="font-semibold text-accent-700">{t.teamFinish}</span>
                ) : (
                  <span className="text-primary-400">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
