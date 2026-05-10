import React from "react"
import { Body } from "@/components/typography/Body"
import type { TimelineEvent } from "@pawn-stars/shared-types"

const EVENT_STYLES: Record<TimelineEvent["type"], { dot: string; label: string }> = {
  round_start: { dot: "bg-accent-400",   label: "Round start" },
  round_end:   { dot: "bg-success-500",  label: "Round end" },
  highlight:   { dot: "bg-primary-400",  label: "Highlight" },
  milestone:   { dot: "bg-primary-900",  label: "Milestone" },
}

function formatEventDate(d: string): string {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

interface TournamentTimelineProps {
  events: TimelineEvent[]
}

export function TournamentTimeline({ events }: TournamentTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-primary-200 p-10 text-center">
        <Body className="text-primary-400">Timeline will update as rounds are played.</Body>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-primary-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-primary-100">
        <div className="flex items-center gap-3 flex-wrap">
          {Object.entries(EVENT_STYLES).map(([type, style]) => (
            <div key={type} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
              <Body size="xs" className="text-primary-500">{style.label}</Body>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-6">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3.5 top-2 bottom-2 w-px bg-primary-100" />

          <div className="space-y-6">
            {events.map((event, i) => {
              const style = EVENT_STYLES[event.type]
              return (
                <div key={i} className="relative flex gap-4">
                  {/* Dot */}
                  <div className={`w-7 h-7 rounded-full ${style.dot} flex items-center justify-center flex-shrink-0 z-10`}>
                    {event.roundNumber && (
                      <span className="text-white text-xs font-bold">{event.roundNumber}</span>
                    )}
                  </div>

                  <div className="flex-1 pt-0.5">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <Body size="sm" weight="semibold" className="text-primary-900">{event.title}</Body>
                      <Body size="xs" className="text-primary-400">{formatEventDate(event.date)}</Body>
                    </div>
                    {event.description && (
                      <Body size="sm" className="text-primary-600 mt-0.5">{event.description}</Body>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
