import React from "react"
import { MatchPreview, MatchStatus } from "@pawn-stars/shared-types"

const _now = Date.now()
const DEFAULT_MATCHES: MatchPreview[] = [
  {
    id: "1",
    date: new Date(_now - 19 * 24 * 60 * 60 * 1000),
    venue: "Liga Continental",
    status: "COMPLETED",
    homeTeam: { id: "team1", name: "Pawn Stars", shortName: "PAWN STARS" },
    awayTeam: { id: "team2", name: "Gambito Elite", shortName: "GAMBITO ELITE" },
    homeScore: 6.5,
    awayScore: 1.5,
  },
]

interface MatchBarProps {
  matches?: MatchPreview[]
  showLive?: boolean
  maxMatches?: number
}

function getOutcomeLabel(match: MatchPreview): { label: string; style: string } | null {
  if (match.status !== "COMPLETED" || match.homeScore === undefined) return null
  if (match.homeScore > (match.awayScore ?? 0)) return { label: "VICTORY", style: "border-success-500 text-success-400" }
  if (match.homeScore < (match.awayScore ?? 0)) return { label: "DEFEAT", style: "border-red-500 text-red-400" }
  return { label: "DRAW", style: "border-carbon-400 text-carbon-800" }
}

export const MatchBar: React.FC<MatchBarProps> = ({
  matches = [],
  showLive = true,
  maxMatches = 1,
}) => {
  const displayMatches = matches.length > 0 ? matches : DEFAULT_MATCHES
  const filtered = displayMatches
    .slice(0, maxMatches)
    .filter((m) => showLive || m.status !== "LIVE")

  if (filtered.length === 0) return null

  const match = filtered[0]
  const outcome = getOutcomeLabel(match)

  return (
    <div className="bg-carbon-50 border-t border-b border-carbon-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
          {/* Competition info */}
          <span className="font-mono text-[10px] tracking-widest text-carbon-700 shrink-0">
            {match.venue?.toUpperCase()} · ROUND 12 · APRIL 28, 2026
          </span>

          {/* Teams + score */}
          <div className="flex items-center gap-4">
            <span className="font-display text-base sm:text-lg tracking-wide text-gold">
              {match.homeTeam.shortName ?? match.homeTeam.name}
            </span>
            <div className="flex items-center gap-1">
              <span className="font-mono text-xs text-carbon-700">Avg {2481}</span>
            </div>

            <span className="font-mono text-xs text-carbon-600 mx-1">VS</span>

            <div className="flex items-center gap-1">
              <span className="font-mono text-xs text-carbon-700">Avg {2390}</span>
            </div>
            <span className="font-display text-base sm:text-lg tracking-wide text-white">
              {match.awayTeam.shortName ?? match.awayTeam.name}
            </span>
          </div>

          {/* Score + outcome */}
          <div className="flex items-center gap-3 shrink-0">
            {match.homeScore !== undefined && (
              <span className="font-display text-xl text-gold tracking-wide">
                {match.homeScore} – {match.awayScore}
              </span>
            )}
            {outcome && (
              <span className={`border font-mono text-[10px] tracking-widest px-2 py-0.5 ${outcome.style}`}>
                {outcome.label}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
