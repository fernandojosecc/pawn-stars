"use client"

import React, { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Body } from "@/components/typography/Body"
import type { PlayerRanking, RatingModality } from "@pawn-stars/shared-types"

interface PlayerRankingsTableProps {
  rankings: PlayerRanking[]
}

type SortKey = "rating" | "winRate" | "gamesPlayed"
type SortDir = "asc" | "desc"

const MODALITIES: { label: string; value: RatingModality }[] = [
  { label: "Classical", value: "classical" },
  { label: "Rapid", value: "rapid" },
  { label: "Blitz", value: "blitz" },
]

function RatingChangeBadge({ change }: { change: number }) {
  if (change === 0) return <span className="text-primary-400 text-xs font-mono">±0</span>
  if (change > 0) return <span className="text-success-600 text-xs font-mono font-semibold">+{change}</span>
  return <span className="text-red-500 text-xs font-mono font-semibold">{change}</span>
}

function WinRateBar({ rate }: { rate: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-primary-100 rounded-full h-1.5 min-w-12">
        <div
          className="bg-success-500 h-1.5 rounded-full"
          style={{ width: `${Math.min(rate, 100)}%` }}
        />
      </div>
      <span className="text-xs font-mono text-primary-600 w-10 text-right">{rate.toFixed(1)}%</span>
    </div>
  )
}

export const PlayerRankingsTable: React.FC<PlayerRankingsTableProps> = ({ rankings }) => {
  const [modality, setModality] = useState<RatingModality>("classical")
  const [sortKey, setSortKey] = useState<SortKey>("rating")
  const [sortDir, setSortDir] = useState<SortDir>("desc")

  const filtered = useMemo(() => {
    return [...rankings]
      .filter((p) => p.modality === modality)
      .sort((a, b) => {
        const mult = sortDir === "desc" ? -1 : 1
        return (a[sortKey] - b[sortKey]) * mult
      })
  }, [rankings, modality, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"))
    } else {
      setSortKey(key)
      setSortDir("desc")
    }
  }

  function SortHeader({ label, sortable }: { label: string; sortable?: SortKey }) {
    const isActive = sortable && sortKey === sortable
    return (
      <th
        className={`px-3 py-3 text-xs font-semibold uppercase tracking-wide text-center ${
          sortable ? "cursor-pointer select-none hover:text-primary-700" : ""
        } ${isActive ? "text-primary-900" : "text-primary-500"}`}
        onClick={() => sortable && toggleSort(sortable)}
      >
        <span className="flex items-center gap-1 justify-center">
          {label}
          {isActive && <span className="text-accent-500">{sortDir === "desc" ? "↓" : "↑"}</span>}
        </span>
      </th>
    )
  }

  return (
    <div className="space-y-4">
      {/* Modality filter */}
      <div className="flex gap-2">
        {MODALITIES.map(({ label, value }) => (
          <Button
            key={value}
            variant={modality === value ? "default" : "outline"}
            size="sm"
            onClick={() => setModality(value)}
          >
            {label}
          </Button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-primary-200 overflow-hidden">
        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-primary-50 border-b border-primary-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide w-10">#</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Player</th>
                <SortHeader label="Rating" sortable="rating" />
                <th className="text-center px-3 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Δ</th>
                <SortHeader label="Games" sortable="gamesPlayed" />
                <th className="text-center px-3 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">W/D/L</th>
                <SortHeader label="Win %" sortable="winRate" />
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-50">
              {filtered.map((player, i) => (
                <tr key={`${player.playerId}-${i}`} className="hover:bg-primary-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-primary-500">{player.rank}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary-400">{player.playerName[0]}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Body size="sm" weight="semibold" className="text-primary-900">{player.playerName}</Body>
                          {player.playerTitle && (
                            <Badge className="bg-accent-100 text-accent-700 text-xs px-1.5 py-0">{player.playerTitle}</Badge>
                          )}
                        </div>
                        {player.playerNationality && (
                          <Body size="xs" className="text-primary-400">{player.playerNationality}</Body>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-sm font-bold font-mono text-primary-900">{player.rating}</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <RatingChangeBadge change={player.ratingChange} />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <Body size="sm" className="text-primary-700 font-mono">{player.gamesPlayed}</Body>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <Body size="xs" className="text-primary-600 font-mono whitespace-nowrap">
                      <span className="text-success-600">{player.wins}</span>
                      <span className="text-primary-400">/{player.draws}/</span>
                      <span className="text-red-500">{player.losses}</span>
                    </Body>
                  </td>
                  <td className="px-4 py-3">
                    <WinRateBar rate={player.winRate} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden divide-y divide-primary-100">
          {filtered.map((player, i) => (
            <div key={`${player.playerId}-${i}`} className="p-4 flex items-center gap-3">
              <span className="text-sm font-semibold text-primary-400 w-6 flex-shrink-0">{player.rank}</span>
              <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary-400">{player.playerName[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <Body size="sm" weight="semibold" className="text-primary-900 truncate">{player.playerName}</Body>
                  {player.playerTitle && (
                    <Badge className="bg-accent-100 text-accent-700 text-xs px-1.5 py-0 flex-shrink-0">{player.playerTitle}</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <Body size="xs" className="text-primary-400">{player.playerNationality}</Body>
                  <WinRateBar rate={player.winRate} />
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-bold font-mono text-primary-900">{player.rating}</div>
                <RatingChangeBadge change={player.ratingChange} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
