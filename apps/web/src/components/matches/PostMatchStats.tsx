import React from "react"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import type { MatchDetail } from "@pawn-stars/shared-types"

interface PostMatchStatsProps {
  stats: NonNullable<MatchDetail["postMatchStats"]>
  homeTeamName: string
  awayTeamName: string
}

function StatRow({
  label,
  homeVal,
  awayVal,
  highlight,
}: {
  label: string
  homeVal: number | string
  awayVal: number | string
  highlight?: "home" | "away" | "none"
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-2.5 border-b border-primary-50 last:border-0">
      <div className={`text-right font-mono text-sm font-semibold ${highlight === "home" ? "text-success-600" : "text-primary-800"}`}>
        {homeVal}
      </div>
      <Body size="xs" className="text-primary-400 text-center min-w-24">{label}</Body>
      <div className={`text-left font-mono text-sm font-semibold ${highlight === "away" ? "text-success-600" : "text-primary-800"}`}>
        {awayVal}
      </div>
    </div>
  )
}

export const PostMatchStats: React.FC<PostMatchStatsProps> = ({
  stats,
  homeTeamName,
  awayTeamName,
}) => {
  const homeWinner = stats.homeTeamScore > stats.awayTeamScore
  const awayWinner = stats.awayTeamScore > stats.homeTeamScore

  return (
    <section className="bg-white rounded-xl border border-primary-200 overflow-hidden">
      <div className="px-5 py-4 bg-primary-50 border-b border-primary-200">
        <Heading level="h3" className="text-primary-900 text-base font-semibold">
          Post-Match Stats
        </Heading>
      </div>

      {/* Team headers */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 px-5 py-3 border-b border-primary-100">
        <Body size="sm" weight="semibold" className={`text-right ${homeWinner ? "text-success-700" : "text-primary-700"}`}>
          {homeTeamName} {homeWinner && "🏆"}
        </Body>
        <div className="min-w-24" />
        <Body size="sm" weight="semibold" className={`text-left ${awayWinner ? "text-success-700" : "text-primary-700"}`}>
          {awayWinner && "🏆 "}{awayTeamName}
        </Body>
      </div>

      <div className="px-5 py-2">
        <StatRow
          label="Final Score"
          homeVal={stats.homeTeamScore}
          awayVal={stats.awayTeamScore}
          highlight={homeWinner ? "home" : awayWinner ? "away" : "none"}
        />
        <StatRow label="Games Played" homeVal={stats.totalGames / 2} awayVal={stats.totalGames / 2} />
        <StatRow
          label="Wins"
          homeVal={stats.homeWins}
          awayVal={stats.awayWins}
          highlight={stats.homeWins > stats.awayWins ? "home" : stats.awayWins > stats.homeWins ? "away" : "none"}
        />
        <StatRow label="Draws" homeVal={stats.draws} awayVal={stats.draws} />
        <StatRow
          label="Avg. Performance"
          homeVal={stats.avgPerformanceHome}
          awayVal={stats.avgPerformanceAway}
          highlight={stats.avgPerformanceHome > stats.avgPerformanceAway ? "home" : "away"}
        />
      </div>

      {stats.highestPerformance && (
        <div className="mx-5 mb-4 p-3 bg-accent-50 rounded-lg border border-accent-100">
          <Body size="xs" className="text-accent-700 font-semibold mb-0.5">Best Performance</Body>
          <Body size="sm" className="text-primary-900">
            {stats.highestPerformance.playerName}{" "}
            <span className="font-mono text-accent-600">{stats.highestPerformance.performance}</span>
          </Body>
        </div>
      )}
    </section>
  )
}
