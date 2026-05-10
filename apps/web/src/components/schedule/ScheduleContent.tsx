"use client"

import React, { useState, useMemo } from "react"
import type { ScheduleEvent, EventType } from "@pawn-stars/shared-types"
import { ALL_EVENT_TYPES } from "./event-config"
import { EventFilterBar } from "./EventFilterBar"
import { CalendarGrid } from "./CalendarGrid"
import { AgendaList } from "./AgendaList"
import { DayModal } from "./DayModal"

type View = "grid" | "agenda"

interface ScheduleContentProps {
  events: ScheduleEvent[]
  defaultYear: number
  defaultMonth: number
}

export function ScheduleContent({ events, defaultYear, defaultMonth }: ScheduleContentProps) {
  const [year, setYear]     = useState(defaultYear)
  const [month, setMonth]   = useState(defaultMonth)
  const [view, setView]     = useState<View>("grid")
  const [activeFilters, setActiveFilters] = useState<Set<EventType>>(new Set(ALL_EVENT_TYPES))
  const [selectedDay, setSelectedDay]     = useState<string | null>(null)

  function prevMonth() {
    if (month === 1) { setMonth(12); setYear(y => y - 1) }
    else setMonth(m => m - 1)
    setSelectedDay(null)
  }

  function nextMonth() {
    if (month === 12) { setMonth(1); setYear(y => y + 1) }
    else setMonth(m => m + 1)
    setSelectedDay(null)
  }

  const monthPrefix = `${year}-${String(month).padStart(2, "0")}`

  const filteredEvents = useMemo(() =>
    events.filter(ev =>
      ev.date.startsWith(monthPrefix) && activeFilters.has(ev.type)
    ),
    [events, monthPrefix, activeFilters]
  )

  const counts = useMemo(() => {
    const c = { match: 0, tournament: 0, training: 0, media: 0 } as Record<EventType, number>
    for (const ev of events.filter(e => e.date.startsWith(monthPrefix))) {
      c[ev.type] = (c[ev.type] ?? 0) + 1
    }
    return c
  }, [events, monthPrefix])

  const modalEvents = useMemo(() =>
    selectedDay ? filteredEvents.filter(ev => ev.date === selectedDay) : [],
    [filteredEvents, selectedDay]
  )

  function handleDayClick(dateStr: string) {
    const hasEvents = filteredEvents.some(ev => ev.date === dateStr)
    if (hasEvents) setSelectedDay(prev => prev === dateStr ? null : dateStr)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">
      {/* Controls row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <EventFilterBar
          activeFilters={activeFilters}
          onChange={setActiveFilters}
          counts={counts}
        />

        {/* View toggle */}
        <div className="flex items-center bg-primary-100 rounded-lg p-1 gap-1 flex-shrink-0">
          <button
            onClick={() => setView("grid")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              view === "grid"
                ? "bg-white text-primary-900 shadow-sm"
                : "text-primary-500 hover:text-primary-700"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h8M8 10h8M8 14h8M8 18h8" />
            </svg>
            <span className="hidden sm:inline">Calendar</span>
          </button>
          <button
            onClick={() => setView("agenda")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              view === "agenda"
                ? "bg-white text-primary-900 shadow-sm"
                : "text-primary-500 hover:text-primary-700"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span className="hidden sm:inline">Agenda</span>
          </button>
        </div>
      </div>

      {/* View */}
      {view === "grid" ? (
        <CalendarGrid
          year={year}
          month={month}
          events={filteredEvents}
          selectedDay={selectedDay}
          onDayClick={handleDayClick}
          onPrev={prevMonth}
          onNext={nextMonth}
        />
      ) : (
        <AgendaList
          events={filteredEvents}
          year={year}
          month={month}
          onPrev={prevMonth}
          onNext={nextMonth}
        />
      )}

      {/* Day modal */}
      {selectedDay && (
        <DayModal
          date={selectedDay}
          events={modalEvents}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  )
}
