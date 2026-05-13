import { SeasonTournamentRecord } from '@pawn-stars/shared-types'
import Link from 'next/link'

const finishColor: Record<string, string> = {
  '1st': 'bg-accent-500  text-white',
  '2nd': 'bg-primary-300 text-primary-900',
  '3rd': 'bg-primary-200 text-primary-700',
}

function RecordBar({ wins, draws, losses }: { wins: number; draws: number; losses: number }) {
  const total = wins + draws + losses
  if (total === 0) return <p className="text-xs text-primary-400">No games played yet</p>
  const wPct = (wins  / total) * 100
  const dPct = (draws / total) * 100
  const lPct = (losses / total) * 100
  return (
    <div className="flex rounded overflow-hidden h-2 w-full mt-1">
      <div className="bg-success-500" style={{ width: `${wPct}%` }} />
      <div className="bg-primary-300" style={{ width: `${dPct}%` }} />
      <div className="bg-danger-400"  style={{ width: `${lPct}%` }} />
    </div>
  )
}

function fmt(d: Date) {
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

export function TeamRecordTimeline({ tournaments }: { tournaments: SeasonTournamentRecord[] }) {
  const sorted = [...tournaments].sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime(),
  )

  return (
    <ol className="relative border-l-2 border-primary-200 space-y-8 pl-6">
      {sorted.map((t) => {
        const dotClass =
          t.status === 'COMPLETED'
            ? 'bg-accent-500'
            : t.status === 'ONGOING'
              ? 'bg-success-500 ring-4 ring-success-100'
              : 'bg-primary-300'

        return (
          <li key={t.tournamentId} className="relative">
            {/* timeline dot */}
            <span
              className={`absolute -left-[1.625rem] top-1 w-3 h-3 rounded-full ${dotClass}`}
              aria-hidden="true"
            />

            <div className="bg-white rounded-xl border border-primary-200 p-4">
              {/* title row */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <Link
                    href={`/tournaments/${t.tournamentSlug}`}
                    className="font-semibold text-primary-900 hover:text-accent-700 hover:underline text-sm"
                  >
                    {t.tournamentName}
                  </Link>
                  {t.location && (
                    <p className="text-xs text-primary-400 mt-0.5">{t.location}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {t.teamFinish && (
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${finishColor[t.teamFinish] ?? 'bg-primary-100 text-primary-700'}`}>
                      {t.teamFinish}
                    </span>
                  )}
                  <span className="text-xs text-primary-400">{fmt(t.startDate)}</span>
                </div>
              </div>

              {/* W/D/L */}
              {t.gamesPlayed > 0 ? (
                <>
                  <div className="flex gap-4 text-xs mb-1">
                    <span className="text-success-700 font-semibold">{t.wins}W</span>
                    <span className="text-primary-500">{t.draws}D</span>
                    <span className="text-danger-600 font-semibold">{t.losses}L</span>
                    <span className="text-primary-400">{t.gamesPlayed} games</span>
                  </div>
                  <RecordBar wins={t.wins} draws={t.draws} losses={t.losses} />
                </>
              ) : (
                <p className="text-xs text-primary-400">Scheduled — no games played yet</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
