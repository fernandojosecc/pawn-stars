import React from "react"
import { Badge } from "@/components/ui/badge"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import type { MatchDetail, MatchResultOutcome } from "@pawn-stars/shared-types"

interface RoundResultsProps {
  rounds: MatchDetail["rounds"]
  homeTeamName: string
  awayTeamName: string
}

function ResultBadge({ result, side }: { result: MatchResultOutcome | null; side: "home" | "away" }) {
  if (!result || result === "UNFINISHED") {
    return <span className="text-primary-400 text-xs">–</span>
  }

  const isWin = (side === "home" && result === "WIN") || (side === "away" && result === "LOSS")
  const isLoss = (side === "home" && result === "LOSS") || (side === "away" && result === "WIN")
  const isDraw = result === "DRAW"

  if (isWin) return <span className="text-success-600 font-bold text-sm">1</span>
  if (isLoss) return <span className="text-red-500 font-bold text-sm">0</span>
  if (isDraw) return <span className="text-primary-500 font-bold text-sm">½</span>
  return null
}

export const RoundResults: React.FC<RoundResultsProps> = ({
  rounds,
  homeTeamName,
  awayTeamName,
}) => {
  if (rounds.length === 0) return null

  return (
    <section className="bg-white rounded-xl border border-primary-200 overflow-hidden">
      <div className="px-5 py-4 bg-primary-50 border-b border-primary-200">
        <Heading level="h3" className="text-primary-900 text-base font-semibold">
          Round Results
        </Heading>
      </div>

      <div className="divide-y divide-primary-100">
        {rounds.map((round) => (
          <div key={round.roundNumber}>
            {/* Round header */}
            <div className="flex items-center justify-between px-5 py-3 bg-primary-50/50">
              <Body size="sm" weight="semibold" className="text-primary-700">
                Round {round.roundNumber}
              </Body>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-primary-900">{round.homeRoundScore}</span>
                <span className="text-primary-400 text-xs">–</span>
                <span className="text-sm font-bold text-primary-900">{round.awayRoundScore}</span>
              </div>
            </div>

            {/* Board results */}
            <div className="divide-y divide-primary-50">
              {round.results.map((result) => (
                <div
                  key={result.board}
                  className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-2"
                >
                  {/* Home player */}
                  <div className="flex items-center gap-2">
                    <ResultBadge result={result.result} side="home" />
                    <div>
                      <Body size="sm" className="text-primary-900 truncate">
                        {result.homePlayerName}
                      </Body>
                      {result.homePlayerTitle && (
                        <Badge className="bg-accent-50 text-accent-700 text-xs px-1 py-0">
                          {result.homePlayerTitle}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Board number */}
                  <div className="flex flex-col items-center gap-0.5 px-2">
                    <Body size="xs" className="text-primary-400">Bd.{result.board}</Body>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-mono text-primary-600">{result.homeScore}</span>
                      <span className="text-primary-300 text-xs">–</span>
                      <span className="text-xs font-mono text-primary-600">{result.awayScore}</span>
                    </div>
                  </div>

                  {/* Away player */}
                  <div className="flex items-center gap-2 justify-end">
                    <div className="text-right">
                      <Body size="sm" className="text-primary-900 truncate">
                        {result.awayPlayerName}
                      </Body>
                      {result.awayPlayerTitle && (
                        <Badge className="bg-accent-50 text-accent-700 text-xs px-1 py-0">
                          {result.awayPlayerTitle}
                        </Badge>
                      )}
                    </div>
                    <ResultBadge result={result.result} side="away" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Total score row */}
      <div className="flex items-center justify-between px-5 py-3 bg-primary-900 text-white">
        <Body size="sm" weight="semibold" className="text-white">{homeTeamName}</Body>
        <div className="flex items-center gap-2">
          <span className="text-accent-400 font-bold text-lg">
            {rounds.reduce((s, r) => s + r.homeRoundScore, 0)}
          </span>
          <span className="text-primary-400">–</span>
          <span className="text-accent-400 font-bold text-lg">
            {rounds.reduce((s, r) => s + r.awayRoundScore, 0)}
          </span>
        </div>
        <Body size="sm" weight="semibold" className="text-white">{awayTeamName}</Body>
      </div>
    </section>
  )
}
