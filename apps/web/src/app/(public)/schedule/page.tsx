import React from "react"
import type { Metadata } from "next"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { ScheduleContent } from "@/components/schedule/ScheduleContent"
import type { ScheduleEvent } from "@pawn-stars/shared-types"

export const metadata: Metadata = {
  title: "Schedule | Pawn Stars",
  description:
    "Full calendar of Pawn Stars matches, tournaments, training sessions and media events for the 2024 season.",
  openGraph: {
    title: "Schedule — Pawn Stars",
    description: "Matches, tournaments, training and media events — calendar & agenda views.",
    type: "website",
  },
}

const mockEvents: ScheduleEvent[] = [
  // ── August 2024 ──────────────────────────────────────────────
  { id: "ev-001", type: "training",   title: "Team Training",          date: "2024-08-03", startTime: "10:00", endTime: "13:00", location: "Training Centre",  status: "completed" },
  { id: "ev-002", type: "training",   title: "Opening Preparation",    date: "2024-08-07", startTime: "10:00", endTime: "13:00", location: "Training Centre",  status: "completed" },
  { id: "ev-003", type: "training",   title: "Endgame Workshop",       date: "2024-08-10", startTime: "10:00", endTime: "13:00", location: "Training Centre",  status: "completed" },
  { id: "ev-004", type: "tournament", title: "Sinquefield Cup — R1",   date: "2024-08-15", startTime: "14:00", location: "St. Louis, USA",   url: "/tournaments/sinquefield-cup-2024", status: "completed" },
  { id: "ev-005", type: "training",   title: "Tactical Training",      date: "2024-08-16", startTime: "10:00", endTime: "13:00", location: "Training Centre",  status: "completed" },
  { id: "ev-006", type: "tournament", title: "Sinquefield Cup — R2",   date: "2024-08-17", startTime: "14:00", location: "St. Louis, USA",   url: "/tournaments/sinquefield-cup-2024", status: "completed" },
  { id: "ev-007", type: "media",      title: "Pre-tournament Press",   date: "2024-08-18", startTime: "11:00", endTime: "12:00", location: "Media Room",       status: "completed" },
  { id: "ev-008", type: "match",      title: "vs Rook Warriors",       subtitle: "Pawn Stars 5.5–2.5", date: "2024-08-20", startTime: "16:00", location: "Home Arena", url: "/matches/match-001", status: "completed" },
  { id: "ev-009", type: "tournament", title: "Sinquefield Cup — R3",   date: "2024-08-21", startTime: "14:00", location: "St. Louis, USA",   url: "/tournaments/sinquefield-cup-2024", status: "live" },
  { id: "ev-010", type: "training",   title: "Team Training",          date: "2024-08-24", startTime: "10:00", endTime: "13:00", location: "Training Centre",  status: "upcoming" },
  { id: "ev-011", type: "media",      title: "Chess.com Interview",    date: "2024-08-27", startTime: "15:00", endTime: "16:00", location: "Online",           status: "upcoming" },
  { id: "ev-012", type: "tournament", title: "Sinquefield Cup — R4",   date: "2024-08-28", startTime: "14:00", location: "St. Louis, USA",   url: "/tournaments/sinquefield-cup-2024", status: "upcoming" },

  // ── September 2024 ───────────────────────────────────────────
  { id: "ev-013", type: "training",   title: "Team Training",          date: "2024-09-01", startTime: "10:00", endTime: "13:00", location: "Training Centre",  status: "upcoming" },
  { id: "ev-014", type: "tournament", title: "Sinquefield Cup — Final", date: "2024-09-04", startTime: "14:00", location: "St. Louis, USA",   url: "/tournaments/sinquefield-cup-2024", status: "upcoming" },
  { id: "ev-015", type: "media",      title: "Post-tournament Press",  date: "2024-09-05", startTime: "11:00", endTime: "12:00", location: "Media Room",       status: "upcoming" },
  { id: "ev-016", type: "training",   title: "Rapid Chess Drills",     date: "2024-09-08", startTime: "10:00", endTime: "13:00", location: "Training Centre",  status: "upcoming" },
  { id: "ev-017", type: "match",      title: "vs Bishop Brigade",      date: "2024-09-12", startTime: "16:00", location: "Away",              url: "/matches/match-002", status: "upcoming" },
  { id: "ev-018", type: "training",   title: "Team Training",          date: "2024-09-14", startTime: "10:00", endTime: "13:00", location: "Training Centre",  status: "upcoming" },
  { id: "ev-019", type: "media",      title: "Squad Announcement",     date: "2024-09-18", startTime: "14:00", endTime: "15:00", location: "Club HQ",          status: "upcoming" },
  { id: "ev-020", type: "training",   title: "Positional Play",        date: "2024-09-21", startTime: "10:00", endTime: "13:00", location: "Training Centre",  status: "upcoming" },
  { id: "ev-021", type: "match",      title: "vs Knight Riders",       date: "2024-09-25", startTime: "16:00", location: "Home Arena",        url: "/matches/match-003", status: "upcoming" },
  { id: "ev-022", type: "training",   title: "Blitz Practice",         date: "2024-09-28", startTime: "10:00", endTime: "13:00", location: "Training Centre",  status: "upcoming" },

  // ── October 2024 ─────────────────────────────────────────────
  { id: "ev-023", type: "media",      title: "Monthly Press Briefing", date: "2024-10-01", startTime: "11:00", endTime: "12:00", location: "Media Room",       status: "upcoming" },
  { id: "ev-024", type: "training",   title: "Team Training",          date: "2024-10-05", startTime: "10:00", endTime: "13:00", location: "Training Centre",  status: "upcoming" },
  { id: "ev-025", type: "match",      title: "vs Queen's Gambit FC",   date: "2024-10-09", startTime: "16:00", location: "Away",              status: "upcoming" },
  { id: "ev-026", type: "training",   title: "Opening Lab",            date: "2024-10-12", startTime: "10:00", endTime: "13:00", location: "Training Centre",  status: "upcoming" },
  { id: "ev-027", type: "tournament", title: "FIDE GP — Draw Ceremony", date: "2024-10-15", startTime: "14:00", location: "Berlin, Germany",  status: "upcoming" },
  { id: "ev-028", type: "tournament", title: "FIDE Grand Prix — R1",   date: "2024-10-17", startTime: "14:00", location: "Berlin, Germany",  status: "upcoming" },
  { id: "ev-029", type: "training",   title: "Team Training",          date: "2024-10-19", startTime: "10:00", endTime: "13:00", location: "Training Centre",  status: "upcoming" },
  { id: "ev-030", type: "tournament", title: "FIDE Grand Prix — R2",   date: "2024-10-20", startTime: "14:00", location: "Berlin, Germany",  status: "upcoming" },
  { id: "ev-031", type: "media",      title: "Sponsor Visit",          date: "2024-10-22", startTime: "13:00", endTime: "15:00", location: "Club HQ",          status: "upcoming" },
  { id: "ev-032", type: "tournament", title: "FIDE Grand Prix — R3",   date: "2024-10-23", startTime: "14:00", location: "Berlin, Germany",  status: "upcoming" },
  { id: "ev-033", type: "match",      title: "vs Endgame Elite",       date: "2024-10-24", startTime: "16:00", location: "Home Arena",        status: "upcoming" },
  { id: "ev-034", type: "training",   title: "Pre-match Prep",         date: "2024-10-26", startTime: "10:00", endTime: "13:00", location: "Training Centre",  status: "upcoming" },
  { id: "ev-035", type: "tournament", title: "FIDE Grand Prix — Final", date: "2024-10-28", startTime: "14:00", location: "Berlin, Germany",  status: "upcoming" },
]

const totalMatches    = mockEvents.filter(e => e.type === "match").length
const totalTournament = mockEvents.filter(e => e.type === "tournament").length

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-primary-50">
      {/* Hero header */}
      <div className="bg-primary-900 text-white py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heading level="h1" className="text-white text-3xl md:text-4xl font-bold mb-2">
            Schedule
          </Heading>
          <Body className="text-primary-300">
            2024 season calendar — matches, tournaments, training &amp; media events
          </Body>

          {/* Summary chips */}
          <div className="flex flex-wrap gap-3 mt-5">
            <div className="bg-primary-800 rounded-lg px-4 py-2">
              <div className="text-accent-400 font-bold text-lg">{totalMatches}</div>
              <Body size="xs" className="text-primary-400">Matches</Body>
            </div>
            <div className="bg-primary-800 rounded-lg px-4 py-2">
              <div className="text-blue-400 font-bold text-lg">{totalTournament}</div>
              <Body size="xs" className="text-primary-400">Tournament rounds</Body>
            </div>
            <div className="bg-primary-800 rounded-lg px-4 py-2">
              <div className="text-white font-bold text-lg">3</div>
              <Body size="xs" className="text-primary-400">Months covered</Body>
            </div>
          </div>
        </div>
      </div>

      <ScheduleContent
        events={mockEvents}
        defaultYear={2024}
        defaultMonth={8}
      />
    </main>
  )
}
