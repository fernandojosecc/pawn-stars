import React from "react"
import { Body } from "@/components/typography/Body"
import { Badge } from "@/components/ui/badge"
import type { TournamentStandingEntry } from "@pawn-stars/shared-types"

function PositionBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-accent-400 font-bold text-base">1st</span>
  if (rank === 2) return <span className="text-primary-400 font-bold text-sm">2nd</span>
  if (rank === 3) return <span className="text-amber-700 font-bold text-sm">3rd</span>
  return <span className="text-sm font-semibold text-primary-500">{rank}</span>
}

interface StandingsTableProps {
  standings: TournamentStandingEntry[]
}

export function StandingsTable({ standings }: StandingsTableProps) {
  if (standings.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-primary-200 p-10 text-center">
        <Body className="text-primary-400">Standings will be available once the tournament begins.</Body>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-primary-200 overflow-hidden">
      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-primary-50 border-b border-primary-200">
              <th className="text-center px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide w-10">#</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Player</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Score</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">+</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">=</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">-</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">GP</th>
              {standings.some(s => s.tiebreak !== undefined) && (
                <th className="text-center px-3 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">TB</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-50">
            {standings.map((entry) => (
              <tr
                key={entry.player.playerId}
                className={`transition-colors ${entry.rank <= 3 ? "bg-accent-50/30" : "hover:bg-primary-50/50"}`}
              >
                <td className="px-4 py-3 text-center">
                  <PositionBadge rank={entry.rank} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary-400">{entry.player.playerName[0]}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Body size="sm" weight="semibold" className="text-primary-900">{entry.player.playerName}</Body>
                        {entry.player.playerTitle && (
                          <Badge className="bg-accent-100 text-accent-700 text-xs px-1.5 py-0">{entry.player.playerTitle}</Badge>
                        )}
                      </div>
                      {entry.player.playerNationality && (
                        <Body size="xs" className="text-primary-400">{entry.player.playerNationality}</Body>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 text-center">
                  <span className="text-lg font-bold font-mono text-primary-900">{entry.score}</span>
                </td>
                <td className="px-3 py-3 text-center">
                  <span className="text-sm font-mono text-success-600">{entry.wins}</span>
                </td>
                <td className="px-3 py-3 text-center">
                  <span className="text-sm font-mono text-primary-500">{entry.draws}</span>
                </td>
                <td className="px-3 py-3 text-center">
                  <span className="text-sm font-mono text-red-500">{entry.losses}</span>
                </td>
                <td className="px-3 py-3 text-center">
                  <Body size="sm" className="text-primary-600 font-mono">{entry.gamesPlayed}</Body>
                </td>
                {standings.some(s => s.tiebreak !== undefined) && (
                  <td className="px-3 py-3 text-center">
                    <Body size="sm" className="text-primary-500 font-mono">{entry.tiebreak?.toFixed(2) ?? "—"}</Body>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden divide-y divide-primary-100">
        {standings.map((entry) => (
          <div
            key={entry.player.playerId}
            className={`p-4 flex items-center gap-3 ${entry.rank <= 3 ? "bg-accent-50/20" : ""}`}
          >
            <div className="w-8 text-center flex-shrink-0">
              <PositionBadge rank={entry.rank} />
            </div>
            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-primary-400">{entry.player.playerName[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <Body size="sm" weight="semibold" className="text-primary-900 truncate">{entry.player.playerName}</Body>
                {entry.player.playerTitle && (
                  <Badge className="bg-accent-100 text-accent-700 text-xs px-1.5 py-0 flex-shrink-0">{entry.player.playerTitle}</Badge>
                )}
              </div>
              <Body size="xs" className="text-primary-400">
                {entry.player.playerNationality} · {entry.wins}W {entry.draws}D {entry.losses}L
              </Body>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-xl font-bold font-mono text-primary-900">{entry.score}</div>
              <Body size="xs" className="text-primary-400">{entry.gamesPlayed} games</Body>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
