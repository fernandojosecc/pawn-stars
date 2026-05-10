import React from "react"
import Link from "next/link"
import { Body } from "@/components/typography/Body"
import type { ScheduleEvent } from "@pawn-stars/shared-types"
import { EVENT_CONFIG } from "./event-config"

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
]

function formatDateHeader(iso: string): { day: number; weekday: string; monthYear: string } {
  const d = new Date(iso + "T00:00")
  return {
    day: d.getDate(),
    weekday: d.toLocaleDateString("en-GB", { weekday: "short" }),
    monthYear: `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`,
  }
}

const STATUS_LABEL: Record<string, { text: string; cls: string }> = {
  live:      { text: "Live",      cls: "text-success-600" },
  completed: { text: "Done",      cls: "text-primary-400" },
  upcoming:  { text: "Upcoming",  cls: "text-primary-500" },
  cancelled: { text: "Cancelled", cls: "text-red-400" },
}

interface AgendaListProps {
  events: ScheduleEvent[]
  year: number
  month: number
  onPrev: () => void
  onNext: () => void
}

export function AgendaList({ events, year, month, onPrev, onNext }: AgendaListProps) {
  const MONTH_NAMES_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  // Group by date
  const groups: { date: string; events: ScheduleEvent[] }[] = []
  const seen = new Map<string, ScheduleEvent[]>()
  for (const ev of [...events].sort((a, b) => {
    const d = a.date.localeCompare(b.date)
    if (d !== 0) return d
    return (a.startTime ?? "").localeCompare(b.startTime ?? "")
  })) {
    const g = seen.get(ev.date)
    if (g) {
      g.push(ev)
    } else {
      const arr = [ev]
      seen.set(ev.date, arr)
      groups.push({ date: ev.date, events: arr })
    }
  }

  return (
    <div className="bg-white rounded-xl border border-primary-200 overflow-hidden">
      {/* Month navigation */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-primary-100">
        <button onClick={onPrev} className="w-8 h-8 rounded-full hover:bg-primary-100 flex items-center justify-center transition-colors" aria-label="Previous month">
          <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-base font-bold text-primary-900">
          {MONTH_NAMES[month - 1]} {year}
        </span>
        <button onClick={onNext} className="w-8 h-8 rounded-full hover:bg-primary-100 flex items-center justify-center transition-colors" aria-label="Next month">
          <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="py-16 text-center">
          <Body className="text-primary-400">No events this month.</Body>
        </div>
      ) : (
        <div>
          {groups.map(({ date, events: dayEvs }) => {
            const { day, weekday, monthYear } = formatDateHeader(date)
            return (
              <div key={date}>
                {/* Date separator */}
                <div className="flex items-center gap-4 px-5 py-3 bg-primary-50 border-y border-primary-100 sticky top-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary-900 leading-none">{day}</span>
                    <div>
                      <div className="text-xs font-semibold text-primary-600 uppercase tracking-wide">{weekday}</div>
                      <div className="text-xs text-primary-400">{monthYear}</div>
                    </div>
                  </div>
                  <div className="flex-1 h-px bg-primary-200" />
                  <Body size="xs" className="text-primary-400 flex-shrink-0">{dayEvs.length} event{dayEvs.length !== 1 ? "s" : ""}</Body>
                </div>

                {/* Events */}
                <div className="divide-y divide-primary-50">
                  {dayEvs.map((ev) => {
                    const cfg = EVENT_CONFIG[ev.type]
                    const statusInfo = STATUS_LABEL[ev.status]
                    const inner = (
                      <div className={`flex gap-4 px-5 py-4 hover:bg-primary-50/50 transition-colors ${ev.url ? "cursor-pointer" : ""}`}>
                        {/* Time column */}
                        <div className="w-16 flex-shrink-0 text-right pt-0.5">
                          {ev.startTime ? (
                            <Body size="xs" className="text-primary-500 font-mono">{ev.startTime}</Body>
                          ) : (
                            <Body size="xs" className="text-primary-300">—</Body>
                          )}
                        </div>

                        {/* Color bar */}
                        <div className={`w-1 rounded-full flex-shrink-0 self-stretch ${cfg.dotClass}`} style={{ minWidth: "3px", maxWidth: "3px" }} />

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.badgeClass}`}>{cfg.label}</span>
                            {ev.status === "live" && (
                              <span className="flex items-center gap-1 text-xs text-success-600 font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />Live
                              </span>
                            )}
                          </div>
                          <Body size="sm" weight="semibold" className="text-primary-900">{ev.title}</Body>
                          {ev.subtitle && <Body size="xs" className="text-primary-500 mt-0.5">{ev.subtitle}</Body>}
                          {ev.location && (
                            <div className="flex items-center gap-1 mt-1">
                              <svg className="w-3 h-3 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                              <Body size="xs" className="text-primary-400">{ev.location}</Body>
                            </div>
                          )}
                        </div>

                        {/* Status */}
                        {statusInfo && (
                          <div className="flex-shrink-0 pt-0.5">
                            <Body size="xs" className={statusInfo.cls}>{statusInfo.text}</Body>
                          </div>
                        )}
                      </div>
                    )

                    return ev.url ? (
                      <Link key={ev.id} href={ev.url}>{inner}</Link>
                    ) : (
                      <div key={ev.id}>{inner}</div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
