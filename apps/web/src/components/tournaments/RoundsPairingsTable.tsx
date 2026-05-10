"use client"

import React, { useState } from "react"
import { Body } from "@/components/typography/Body"
import { Badge } from "@/components/ui/badge"
import type { TournamentRoundDetail, TournamentPairingDetail, GameResult } from "@pawn-stars/shared-types"

const RESULT_DISPLAY: Record<string, { text: string; whiteClass: string; blackClass: string }> = {
  "1-0":     { text: "1-0",   whiteClass: "text-success-600 font-bold", blackClass: "text-red-500" },
  "0-1":     { text: "0-1",   whiteClass: "text-red-500",               blackClass: "text-success-600 font-bold" },
  "1/2-1/2": { text: "½-½",   whiteClass: "text-primary-500",           blackClass: "text-primary-500" },
  "*":       { text: "…",     whiteClass: "text-primary-400",           blackClass: "text-primary-400" },
}

function ResultCell({ result }: { result?: GameResult }) {
  const display = result ? RESULT_DISPLAY[result] : RESULT_DISPLAY["*"]
  return (
    <span className="font-mono text-sm text-primary-700 tabular-nums">
      {display?.text ?? "·"}
    </span>
  )
}

function PlayerCell({ player, side, result }: {
  player: TournamentPairingDetail["white"]
  side: "white" | "black"
  result?: GameResult
}) {
  const display = result ? RESULT_DISPLAY[result] : null
  const scoreClass = display
    ? (side === "white" ? display.whiteClass : display.blackClass)
    : "text-primary-700"

  return (
    <div className={`flex items-center gap-2 ${side === "black" ? "flex-row-reverse" : ""}`}>
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold
        ${side === "white" ? "bg-white border border-primary-300 text-primary-700" : "bg-primary-800 text-white"}`}>
        {player.playerName[0]}
      </div>
      <div className={side === "black" ? "text-right" : ""}>
        <div className={`text-sm font-medium leading-tight ${scoreClass}`}>
          {player.playerName}
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {player.playerTitle && (
            <Badge className="bg-accent-100 text-accent-700 text-xs px-1 py-0">{player.playerTitle}</Badge>
          )}
          {player.playerNationality && (
            <Body size="xs" className="text-primary-400">{player.playerNationality}</Body>
          )}
          {player.rating && (
            <Body size="xs" className="text-primary-400 font-mono">{player.rating}</Body>
          )}
        </div>
      </div>
    </div>
  )
}

function RoundTable({ round }: { round: TournamentRoundDetail }) {
  if (round.pairings.length === 0) {
    return (
      <div className="py-10 text-center">
        <Body className="text-primary-400">Pairings not yet announced.</Body>
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
              <th className="text-center px-3 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide w-12">Bd.</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">White</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide w-20">Result</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Black</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-50">
            {round.pairings.map((pairing) => (
              <tr key={pairing.board} className="hover:bg-primary-50/50 transition-colors">
                <td className="px-3 py-4 text-center">
                  <span className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center mx-auto text-xs font-semibold text-primary-600">
                    {pairing.board}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <PlayerCell player={pairing.white} side="white" result={pairing.result as GameResult} />
                </td>
                <td className="px-4 py-4 text-center">
                  <ResultCell result={pairing.result as GameResult} />
                </td>
                <td className="px-4 py-4">
                  <PlayerCell player={pairing.black} side="black" result={pairing.result as GameResult} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden divide-y divide-primary-100">
        {round.pairings.map((pairing) => (
          <div key={pairing.board} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Body size="xs" className="text-primary-400">Board {pairing.board}</Body>
              <ResultCell result={pairing.result as GameResult} />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Body size="sm" weight="semibold" className="text-primary-900">{pairing.white.playerName}</Body>
                <Body size="xs" className="text-primary-400">{pairing.white.playerNationality} · {pairing.white.rating}</Body>
              </div>
              <Body size="xs" className="text-primary-400 flex-shrink-0">vs</Body>
              <div className="flex-1 text-right">
                <Body size="sm" weight="semibold" className="text-primary-900">{pairing.black.playerName}</Body>
                <Body size="xs" className="text-primary-400">{pairing.black.playerNationality} · {pairing.black.rating}</Body>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ROUND_STATUS_LABELS: Record<string, string> = {
  COMPLETED: "Completed",
  ONGOING:   "Live",
  PENDING:   "Upcoming",
}

interface RoundsPairingsTableProps {
  rounds: TournamentRoundDetail[]
}

export function RoundsPairingsTable({ rounds }: RoundsPairingsTableProps) {
  const [activeRound, setActiveRound] = useState(0)

  if (rounds.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-primary-200 p-10 text-center">
        <Body className="text-primary-400">Rounds have not started yet.</Body>
      </div>
    )
  }

  const current = rounds[activeRound]

  return (
    <div className="space-y-4">
      {/* Round tabs */}
      <div className="flex gap-2 flex-wrap">
        {rounds.map((round, i) => {
          const isActive = i === activeRound
          const statusLabel = ROUND_STATUS_LABELS[round.status] ?? round.status
          return (
            <button
              key={round.roundNumber}
              onClick={() => setActiveRound(i)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                isActive
                  ? "bg-primary-900 text-white border-primary-900"
                  : "bg-white text-primary-600 border-primary-200 hover:border-primary-400"
              }`}
            >
              Round {round.roundNumber}
              {round.status === "ONGOING" && (
                <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse flex-shrink-0" />
              )}
              {isActive && (
                <span className={`text-xs px-1.5 py-0.5 rounded ml-1 ${
                  round.status === "ONGOING" ? "bg-success-500/20 text-success-300" :
                  round.status === "COMPLETED" ? "bg-primary-700 text-primary-300" :
                  "bg-accent-500/20 text-accent-300"
                }`}>
                  {statusLabel}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {current && (
        <div>
          {current.date && (
            <Body size="sm" className="text-primary-500 mb-3">
              {new Date(current.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </Body>
          )}
          <RoundTable round={current} />
        </div>
      )}
    </div>
  )
}
