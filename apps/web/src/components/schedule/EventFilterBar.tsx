import React from "react"
import type { EventType } from "@pawn-stars/shared-types"
import { EVENT_CONFIG, ALL_EVENT_TYPES } from "./event-config"

interface EventFilterBarProps {
  activeFilters: Set<EventType>
  onChange: (filters: Set<EventType>) => void
  counts: Record<EventType, number>
}

export function EventFilterBar({ activeFilters, onChange, counts }: EventFilterBarProps) {
  function toggle(type: EventType) {
    const next = new Set(activeFilters)
    if (next.has(type)) {
      if (next.size > 1) next.delete(type)
    } else {
      next.add(type)
    }
    onChange(next)
  }

  function selectAll() {
    onChange(new Set(ALL_EVENT_TYPES))
  }

  const allActive = activeFilters.size === ALL_EVENT_TYPES.length

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={selectAll}
        className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
          allActive
            ? "bg-primary-900 text-white border-primary-900"
            : "bg-white text-primary-500 border-primary-200 hover:border-primary-400"
        }`}
      >
        All
      </button>

      {ALL_EVENT_TYPES.map((type) => {
        const cfg = EVENT_CONFIG[type]
        const active = activeFilters.has(type)
        const count = counts[type] ?? 0
        return (
          <button
            key={type}
            onClick={() => toggle(type)}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
              active
                ? `${cfg.badgeClass} border-transparent`
                : "bg-white text-primary-500 border-primary-200 hover:border-primary-400"
            }`}
          >
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dotClass}`} />
            {cfg.label}
            {count > 0 && (
              <span className={`${active ? "opacity-70" : "text-primary-400"} tabular-nums`}>
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
