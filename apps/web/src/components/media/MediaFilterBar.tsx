import React from "react"
import type { MediaType } from "@pawn-stars/shared-types"

type FilterTab = "all" | MediaType

const TABS: { id: FilterTab; label: string }[] = [
  { id: "all",      label: "All" },
  { id: "photo",    label: "Photos" },
  { id: "video",    label: "Videos" },
  { id: "document", label: "Press Kit" },
]

interface Tournament { slug: string; name: string }

interface MediaFilterBarProps {
  activeType:       FilterTab
  onTypeChange:     (t: FilterTab) => void
  tournamentFilter: string
  onTournamentChange: (slug: string) => void
  tournaments:      Tournament[]
  counts:           Record<FilterTab, number>
}

export function MediaFilterBar({
  activeType, onTypeChange,
  tournamentFilter, onTournamentChange,
  tournaments, counts,
}: MediaFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Type tabs */}
      <div className="flex bg-primary-100 rounded-lg p-1 gap-1">
        {TABS.map(({ id, label }) => {
          const count = counts[id] ?? 0
          return (
            <button
              key={id}
              onClick={() => onTypeChange(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeType === id
                  ? "bg-white text-primary-900 shadow-sm"
                  : "text-primary-500 hover:text-primary-700"
              }`}
            >
              {label}
              {count > 0 && (
                <span className={`text-xs tabular-nums ${activeType === id ? "text-primary-400" : "text-primary-400"}`}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Tournament filter */}
      {tournaments.length > 0 && (
        <select
          value={tournamentFilter}
          onChange={e => onTournamentChange(e.target.value)}
          className="text-sm border border-primary-200 rounded-lg px-3 py-2 bg-white text-primary-700 focus:outline-none focus:ring-2 focus:ring-accent-500 cursor-pointer"
        >
          <option value="">All tournaments</option>
          {tournaments.map(t => (
            <option key={t.slug} value={t.slug}>{t.name}</option>
          ))}
        </select>
      )}
    </div>
  )
}
