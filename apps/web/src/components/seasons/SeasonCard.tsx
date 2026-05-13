import Link from 'next/link'
import { SeasonSummary } from '@pawn-stars/shared-types'
import { SeasonStatusBadge } from './SeasonStatusBadge'

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center">
      <p className="text-xl font-bold text-primary-900">{value}</p>
      <p className="text-xs text-primary-500 mt-0.5">{label}</p>
    </div>
  )
}

export function SeasonCard({ season }: { season: SeasonSummary }) {
  const record = `${season.wins}W ${season.draws}D ${season.losses}L`
  const winPct = `${Math.round(season.winRate * 100)}%`

  return (
    <Link
      href={`/seasons/${season.slug}`}
      className="block bg-white rounded-xl border border-primary-200 p-5 hover:border-accent-400 hover:shadow-md transition-all group"
    >
      {/* header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-bold text-primary-900 group-hover:text-accent-700 transition-colors leading-tight">
            {season.name}
          </h2>
          <p className="text-xs text-primary-500 mt-0.5">
            {season.startDate.getFullYear()}
            {season.endDate ? ` – ${season.endDate.getFullYear()}` : ' – present'}
          </p>
        </div>
        <SeasonStatusBadge status={season.status} />
      </div>

      {/* stat grid */}
      <div className="grid grid-cols-4 gap-2 py-3 border-y border-primary-100 mb-4">
        <Stat label="Tournaments" value={season.tournamentCount} />
        <Stat label="Record"      value={record} />
        <Stat label="Win rate"    value={winPct} />
        <Stat label="Team rating" value={season.teamRatingAverage} />
      </div>

      {/* top player */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-primary-500">Top performer</p>
          <p className="text-sm font-semibold text-primary-800 mt-0.5">
            {season.topPlayer.playerTitle && (
              <span className="text-accent-600 mr-1">{season.topPlayer.playerTitle}</span>
            )}
            {season.topPlayer.playerName}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-primary-500">Avg perf.</p>
          <p className="text-sm font-bold text-primary-900 mt-0.5">
            {season.topPlayer.averagePerformanceRating}
          </p>
        </div>
      </div>

      <p className="text-xs text-accent-600 font-medium mt-4 group-hover:underline">
        View season →
      </p>
    </Link>
  )
}
