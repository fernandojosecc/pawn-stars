import React from "react"
import type { ScheduleEvent } from "@pawn-stars/shared-types"
import { EVENT_CONFIG } from "./event-config"

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
]

interface DayCell {
  day: number
  dateStr: string
  events: ScheduleEvent[]
}

function buildGrid(year: number, month: number, dayEventsMap: Map<string, ScheduleEvent[]>): (DayCell | null)[][] {
  const firstDay = new Date(year, month - 1, 1)
  const daysInMonth = new Date(year, month, 0).getDate()
  // Mon-first: (Sun=0 → 6, Mon=1 → 0, ..., Sat=6 → 5)
  const startPad = (firstDay.getDay() + 6) % 7

  const grid: (DayCell | null)[][] = []
  let dayNum = 1 - startPad

  while (dayNum <= daysInMonth) {
    const row: (DayCell | null)[] = []
    for (let col = 0; col < 7; col++) {
      if (dayNum < 1 || dayNum > daysInMonth) {
        row.push(null)
      } else {
        const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`
        row.push({ day: dayNum, dateStr, events: dayEventsMap.get(dateStr) ?? [] })
      }
      dayNum++
    }
    grid.push(row)
  }

  return grid
}

interface CalendarGridProps {
  year: number
  month: number          // 1–12
  events: ScheduleEvent[]
  selectedDay: string | null
  onDayClick: (dateStr: string) => void
  onPrev: () => void
  onNext: () => void
}

export function CalendarGrid({ year, month, events, selectedDay, onDayClick, onPrev, onNext }: CalendarGridProps) {
  const dayEventsMap = new Map<string, ScheduleEvent[]>()
  for (const ev of events) {
    const existing = dayEventsMap.get(ev.date) ?? []
    existing.push(ev)
    dayEventsMap.set(ev.date, existing)
  }

  const grid = buildGrid(year, month, dayEventsMap)
  const today = new Date().toISOString().slice(0, 10)

  return (
    <div className="bg-white rounded-xl border border-primary-200 overflow-hidden">
      {/* Month navigation header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-primary-100">
        <button
          onClick={onPrev}
          className="w-8 h-8 rounded-full hover:bg-primary-100 flex items-center justify-center transition-colors"
          aria-label="Previous month"
        >
          <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-base font-bold text-primary-900">
          {MONTH_NAMES[month - 1]} {year}
        </span>
        <button
          onClick={onNext}
          className="w-8 h-8 rounded-full hover:bg-primary-100 flex items-center justify-center transition-colors"
          aria-label="Next month"
        >
          <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-primary-100">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="py-2 text-center text-xs font-semibold text-primary-400 uppercase tracking-wide">
            {wd}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div>
        {grid.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 border-b border-primary-50 last:border-b-0">
            {week.map((cell, ci) => {
              if (!cell) {
                return <div key={ci} className="min-h-16 bg-primary-50/30" />
              }

              const isToday = cell.dateStr === today
              const isSelected = cell.dateStr === selectedDay
              const hasEvents = cell.events.length > 0
              const visibleDots = cell.events.slice(0, 3)
              const overflow = cell.events.length - 3

              return (
                <button
                  key={ci}
                  onClick={() => onDayClick(cell.dateStr)}
                  className={`min-h-16 p-1.5 sm:p-2 flex flex-col items-center gap-1 border-r border-primary-50 last:border-r-0 transition-colors text-left w-full ${
                    hasEvents ? "hover:bg-primary-50 cursor-pointer" : "cursor-default"
                  } ${isSelected ? "bg-primary-50" : ""}`}
                >
                  {/* Day number */}
                  <span
                    className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium flex-shrink-0 ${
                      isToday
                        ? "bg-accent-500 text-white font-bold"
                        : isSelected
                        ? "bg-primary-200 text-primary-900"
                        : "text-primary-700"
                    }`}
                  >
                    {cell.day}
                  </span>

                  {/* Event dots */}
                  <div className="flex flex-wrap gap-0.5 justify-center">
                    {visibleDots.map((ev) => (
                      <span
                        key={ev.id}
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${EVENT_CONFIG[ev.type].dotClass}`}
                        title={ev.title}
                      />
                    ))}
                    {overflow > 0 && (
                      <span className="text-xs text-primary-400 leading-none">+{overflow}</span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
