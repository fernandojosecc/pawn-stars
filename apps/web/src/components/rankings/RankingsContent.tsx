"use client"

import React, { useState } from "react"
import { TeamRankingsTable } from "./TeamRankingsTable"
import { PlayerRankingsTable } from "./PlayerRankingsTable"
import { EloChart } from "./EloChart"
import type { TeamRanking, PlayerRanking, PlayerEloHistory } from "@pawn-stars/shared-types"

interface RankingsContentProps {
  teamRankings: TeamRanking[]
  playerRankings: PlayerRanking[]
  eloHistories: PlayerEloHistory[]
}

type Tab = "team" | "players" | "elo"

const TABS: { id: Tab; label: string; description: string }[] = [
  { id: "team",    label: "Team Standings", description: "League table with W/D/L and form" },
  { id: "players", label: "Player Rankings", description: "Individual ratings by modality" },
  { id: "elo",     label: "ELO Evolution",  description: "Rating history over the season" },
]

export const RankingsContent: React.FC<RankingsContentProps> = ({
  teamRankings,
  playerRankings,
  eloHistories,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("team")

  return (
    <div>
      {/* Tab bar */}
      <div className="border-b border-primary-200 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-0 -mb-px overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-5 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-accent-500 text-accent-600"
                    : "border-transparent text-primary-500 hover:text-primary-700 hover:border-primary-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "team" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-500">Season 2024–25 · {teamRankings[0]?.played ?? 0} rounds played</p>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-xs text-primary-400">
                <span>P = Played</span>
                <span>MP = Match Points</span>
                <span>Pts = League Points</span>
              </div>
            </div>
            <TeamRankingsTable rankings={teamRankings} />
          </div>
        )}

        {activeTab === "players" && (
          <div className="space-y-4">
            <p className="text-sm text-primary-500">
              Individual ratings updated after each completed match. Select a time control to filter.
            </p>
            <PlayerRankingsTable rankings={playerRankings} />
          </div>
        )}

        {activeTab === "elo" && (
          <div className="space-y-4">
            <p className="text-sm text-primary-500">
              Classical rating progression across the 2024 calendar year for top Pawn Stars players.
            </p>
            <EloChart histories={eloHistories} />
          </div>
        )}
      </div>
    </div>
  )
}
