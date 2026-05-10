import React from "react"
import { Badge } from "@/components/ui/badge"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import type { MatchDetail } from "@pawn-stars/shared-types"

interface MatchLineupProps {
  lineup: MatchDetail["lineup"]
  homeTeamName: string
  awayTeamName: string
}

function PlayerRow({
  entry,
  align,
}: {
  entry: MatchDetail["lineup"]["home"][number]
  align: "left" | "right"
}) {
  return (
    <div
      className={`flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-primary-50 transition-colors ${
        align === "right" ? "flex-row-reverse" : ""
      }`}
    >
      <div className="w-7 h-7 rounded-full bg-primary-200 flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-bold text-primary-600">{entry.board}</span>
      </div>

      <div className={`flex-1 ${align === "right" ? "text-right" : "text-left"}`}>
        <div className="flex items-center gap-1.5 flex-wrap">
          {align === "right" && entry.playerTitle && (
            <Badge className="bg-accent-100 text-accent-700 text-xs px-1.5 py-0 ml-auto">
              {entry.playerTitle}
            </Badge>
          )}
          <Body size="sm" weight="medium" className="text-primary-900">
            {entry.playerName}
          </Body>
          {align === "left" && entry.playerTitle && (
            <Badge className="bg-accent-100 text-accent-700 text-xs px-1.5 py-0">
              {entry.playerTitle}
            </Badge>
          )}
        </div>
        <div className={`flex items-center gap-2 ${align === "right" ? "justify-end" : ""}`}>
          {entry.playerNationality && (
            <Body size="xs" className="text-primary-400">{entry.playerNationality}</Body>
          )}
          {entry.playerRating && (
            <Body size="xs" className="text-primary-500 font-mono">{entry.playerRating}</Body>
          )}
        </div>
      </div>
    </div>
  )
}

export const MatchLineup: React.FC<MatchLineupProps> = ({
  lineup,
  homeTeamName,
  awayTeamName,
}) => {
  const maxBoards = Math.max(lineup.home.length, lineup.away.length)
  if (maxBoards === 0) return null

  const homeByBoard = Object.fromEntries(lineup.home.map((e) => [e.board, e]))
  const awayByBoard = Object.fromEntries(lineup.away.map((e) => [e.board, e]))
  const boards = Array.from({ length: maxBoards }, (_, i) => i + 1)

  return (
    <section className="bg-white rounded-xl border border-primary-200 overflow-hidden">
      <div className="px-5 py-4 bg-primary-50 border-b border-primary-200">
        <Heading level="h3" className="text-primary-900 text-base font-semibold">
          Lineups
        </Heading>
      </div>

      {/* Team headers */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 px-5 py-3 border-b border-primary-100">
        <Body size="sm" weight="semibold" className="text-primary-700">{homeTeamName}</Body>
        <Body size="xs" className="text-primary-400 self-center">Board</Body>
        <Body size="sm" weight="semibold" className="text-primary-700 text-right">{awayTeamName}</Body>
      </div>

      <div className="divide-y divide-primary-50">
        {boards.map((board) => (
          <div key={board} className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-3">
            <div>
              {homeByBoard[board] ? (
                <PlayerRow entry={homeByBoard[board]!} align="left" />
              ) : (
                <div className="py-2 px-3 text-primary-300 text-sm">TBD</div>
              )}
            </div>
            <div className="w-8 text-center">
              <Body size="xs" weight="semibold" className="text-primary-400">{board}</Body>
            </div>
            <div>
              {awayByBoard[board] ? (
                <PlayerRow entry={awayByBoard[board]!} align="right" />
              ) : (
                <div className="py-2 px-3 text-primary-300 text-sm text-right">TBD</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
