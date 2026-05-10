import React from "react"
import { Badge } from "@/components/ui/badge"
import { Body } from "@/components/typography/Body"
import type { TeamRanking, FormResult } from "@pawn-stars/shared-types"

interface TeamRankingsTableProps {
  rankings: TeamRanking[]
}

function FormPip({ result }: { result: FormResult }) {
  const config: Record<FormResult, string> = {
    W: "bg-success-500 text-white",
    D: "bg-primary-400 text-white",
    L: "bg-red-500 text-white",
  }
  return (
    <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${config[result]}`}>
      {result}
    </span>
  )
}

function PositionBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent-400 text-white text-sm font-bold">1</span>
  if (rank === 2) return <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-300 text-primary-800 text-sm font-bold">2</span>
  if (rank === 3) return <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-chess-dark text-white text-sm font-bold">3</span>
  return <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-100 text-primary-500 text-sm font-bold">{rank}</span>
}

export const TeamRankingsTable: React.FC<TeamRankingsTableProps> = ({ rankings }) => {
  return (
    <div className="bg-white rounded-xl border border-primary-200 overflow-hidden">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-primary-50 border-b border-primary-200">
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide w-12">#</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Team</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">P</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">W</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">D</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">L</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">MP</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide font-bold">Pts</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Form</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-50">
            {rankings.map((team) => (
              <tr
                key={team.teamId}
                className={`hover:bg-primary-50/50 transition-colors ${team.rank === 1 ? "bg-accent-50/30" : ""}`}
              >
                <td className="px-4 py-3">
                  <PositionBadge rank={team.rank} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary-500">{team.teamShortName?.[0] ?? team.teamName[0]}</span>
                    </div>
                    <div>
                      <Body size="sm" weight="semibold" className="text-primary-900">{team.teamName}</Body>
                      <Body size="xs" className="text-primary-400">{team.season}</Body>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 text-center"><Body size="sm" className="text-primary-700">{team.played}</Body></td>
                <td className="px-3 py-3 text-center"><Body size="sm" className="text-success-600 font-semibold">{team.won}</Body></td>
                <td className="px-3 py-3 text-center"><Body size="sm" className="text-primary-500">{team.drawn}</Body></td>
                <td className="px-3 py-3 text-center"><Body size="sm" className="text-red-500">{team.lost}</Body></td>
                <td className="px-3 py-3 text-center"><Body size="sm" className="text-primary-600 font-mono">{team.matchPoints}</Body></td>
                <td className="px-3 py-3 text-center">
                  <span className="text-sm font-bold text-primary-900">{team.points}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-center">
                    {team.form.map((r, i) => <FormPip key={i} result={r} />)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-primary-100">
        {rankings.map((team) => (
          <div key={team.teamId} className={`p-4 ${team.rank === 1 ? "bg-accent-50/30" : ""}`}>
            <div className="flex items-center gap-3 mb-3">
              <PositionBadge rank={team.rank} />
              <div className="flex-1">
                <Body size="sm" weight="semibold" className="text-primary-900">{team.teamName}</Body>
                <Body size="xs" className="text-primary-400">{team.season}</Body>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary-900">{team.points} pts</div>
                <Body size="xs" className="text-primary-400">MP: {team.matchPoints}</Body>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-3 text-center">
                <div><div className="text-sm font-semibold text-primary-700">{team.played}</div><Body size="xs" className="text-primary-400">P</Body></div>
                <div><div className="text-sm font-semibold text-success-600">{team.won}</div><Body size="xs" className="text-primary-400">W</Body></div>
                <div><div className="text-sm font-semibold text-primary-500">{team.drawn}</div><Body size="xs" className="text-primary-400">D</Body></div>
                <div><div className="text-sm font-semibold text-red-500">{team.lost}</div><Body size="xs" className="text-primary-400">L</Body></div>
              </div>
              <div className="flex items-center gap-1">
                {team.form.map((r, i) => <FormPip key={i} result={r} />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
