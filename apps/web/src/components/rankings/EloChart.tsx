"use client"

import React, { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Body } from "@/components/typography/Body"
import type { PlayerEloHistory } from "@pawn-stars/shared-types"

interface EloChartProps {
  histories: PlayerEloHistory[]
}

interface ChartDataPoint {
  date: string
  [playerName: string]: number | string
}

function buildChartData(histories: PlayerEloHistory[]): ChartDataPoint[] {
  const dateSet = new Set<string>()
  histories.forEach((h) => h.dataPoints.forEach((d) => dateSet.add(d.date)))
  const dates = [...dateSet].sort()

  return dates.map((date) => {
    const point: ChartDataPoint = { date }
    histories.forEach((h) => {
      const match = h.dataPoints.find((d) => d.date === date)
      if (match) point[h.playerName] = match.rating
    })
    return point
  })
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { name: string; value: number; color: string }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-primary-900 border border-primary-700 rounded-lg px-3 py-2 shadow-xl">
      <Body size="xs" className="text-primary-300 mb-2">{label}</Body>
      {[...payload].sort((a, b) => b.value - a.value).map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
          <Body size="xs" className="text-white">{entry.name}</Body>
          <Body size="xs" className="text-accent-400 font-mono font-semibold ml-auto pl-3">{entry.value}</Body>
        </div>
      ))}
    </div>
  )
}

export const EloChart: React.FC<EloChartProps> = ({ histories }) => {
  const [visiblePlayers, setVisiblePlayers] = useState<Set<string>>(
    new Set(histories.map((h) => h.playerName)),
  )

  function togglePlayer(name: string) {
    setVisiblePlayers((prev) => {
      const next = new Set(prev)
      if (next.has(name)) {
        if (next.size > 1) next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
  }

  const chartData = buildChartData(histories)

  const allRatings = histories
    .filter((h) => visiblePlayers.has(h.playerName))
    .flatMap((h) => h.dataPoints.map((d) => d.rating))
  const minRating = Math.min(...allRatings) - 10
  const maxRating = Math.max(...allRatings) + 10

  return (
    <div className="bg-white rounded-xl border border-primary-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-primary-100">
        {/* Player toggle pills */}
        <div className="flex flex-wrap gap-2">
          {histories.map((h) => {
            const active = visiblePlayers.has(h.playerName)
            return (
              <button
                key={h.playerId}
                onClick={() => togglePlayer(h.playerName)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                  active
                    ? "text-white border-transparent"
                    : "bg-white text-primary-400 border-primary-200 hover:border-primary-400"
                }`}
                style={active ? { backgroundColor: h.color, borderColor: h.color } : {}}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: active ? "rgba(255,255,255,0.8)" : h.color }}
                />
                {h.playerName}
              </button>
            )
          })}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              domain={[minRating, maxRating]}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={45}
            />
            <Tooltip content={<CustomTooltip />} />
            {histories.map((h) =>
              visiblePlayers.has(h.playerName) ? (
                <Line
                  key={h.playerId}
                  type="monotone"
                  dataKey={h.playerName}
                  stroke={h.color}
                  strokeWidth={2}
                  dot={{ r: 3, fill: h.color, strokeWidth: 0 }}
                  activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
                  connectNulls
                />
              ) : null,
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="px-5 pb-4">
        <Body size="xs" className="text-primary-400">
          Classical rating evolution · 2024 season · Click a player above to toggle visibility
        </Body>
      </div>
    </div>
  )
}
