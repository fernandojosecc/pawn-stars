import React, { useEffect } from "react"
import Link from "next/link"
import { Body } from "@/components/typography/Body"
import { Heading } from "@/components/typography/Heading"
import type { ScheduleEvent } from "@pawn-stars/shared-types"
import { EVENT_CONFIG } from "./event-config"

const STATUS_STYLES: Record<string, string> = {
  completed: "text-primary-400",
  live:      "text-success-600 font-semibold",
  upcoming:  "text-primary-600",
  cancelled: "text-red-400 line-through",
}

function formatDateLong(iso: string): string {
  return new Date(iso + "T00:00").toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  })
}

interface DayModalProps {
  date: string
  events: ScheduleEvent[]
  onClose: () => void
}

export function DayModal({ date, events, onClose }: DayModalProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [onClose])

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" />

      {/* Card */}
      <div
        className="relative bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-primary-100">
          <div>
            <Heading level="h3" className="text-primary-900 text-base font-bold leading-tight">
              {formatDateLong(date)}
            </Heading>
            <Body size="xs" className="text-primary-400 mt-0.5">
              {events.length} event{events.length !== 1 ? "s" : ""}
            </Body>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-primary-100 hover:bg-primary-200 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Events list */}
        <div className="divide-y divide-primary-50 max-h-80 overflow-y-auto">
          {events.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <Body className="text-primary-400">No events this day.</Body>
            </div>
          ) : (
            events.map((event) => {
              const cfg = EVENT_CONFIG[event.type]
              const statusClass = STATUS_STYLES[event.status] ?? "text-primary-600"
              const inner = (
                <div className={`flex gap-3 px-5 py-4 hover:bg-primary-50/50 transition-colors ${event.url ? "cursor-pointer" : ""}`}>
                  <div className={`mt-1 w-3 flex-shrink-0 self-stretch rounded-full ${cfg.dotClass}`} style={{ minWidth: "3px", width: "3px" }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mr-2 ${cfg.badgeClass}`}>
                          {cfg.label}
                        </span>
                        {event.status === "live" && (
                          <span className="inline-flex items-center gap-1 text-xs text-success-600 font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
                            Live
                          </span>
                        )}
                      </div>
                      {event.startTime && (
                        <Body size="xs" className="text-primary-400 font-mono flex-shrink-0">
                          {event.startTime}{event.endTime ? `–${event.endTime}` : ""}
                        </Body>
                      )}
                    </div>
                    <Body size="sm" weight="semibold" className={`mt-1 ${statusClass}`}>
                      {event.title}
                    </Body>
                    {event.subtitle && (
                      <Body size="xs" className="text-primary-500 mt-0.5">{event.subtitle}</Body>
                    )}
                    {event.location && (
                      <Body size="xs" className="text-primary-400 mt-0.5">{event.location}</Body>
                    )}
                  </div>
                </div>
              )

              return event.url ? (
                <Link key={event.id} href={event.url}>{inner}</Link>
              ) : (
                <div key={event.id}>{inner}</div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
