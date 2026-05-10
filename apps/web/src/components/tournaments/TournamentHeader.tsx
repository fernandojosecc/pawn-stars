import React from "react"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { Badge } from "@/components/ui/badge"
import type { TournamentDetail } from "@pawn-stars/shared-types"

const STATUS_STYLES: Record<string, string> = {
  COMPLETED: "bg-primary-700 text-primary-200",
  ONGOING:   "bg-success-600 text-white",
  UPCOMING:  "bg-accent-500 text-white",
  CANCELLED: "bg-red-600 text-white",
}

const STATUS_LABELS: Record<string, string> = {
  COMPLETED: "Completed",
  ONGOING:   "Live",
  UPCOMING:  "Upcoming",
  CANCELLED: "Cancelled",
}

function formatDate(d: Date | string): string {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

interface TournamentHeaderProps {
  tournament: TournamentDetail
}

export function TournamentHeader({ tournament }: TournamentHeaderProps) {
  const statusStyle = STATUS_STYLES[tournament.status] ?? "bg-primary-700 text-primary-200"
  const statusLabel = STATUS_LABELS[tournament.status] ?? tournament.status

  return (
    <div className="bg-primary-900 text-white py-10 md:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle}`}>
            {statusLabel}
          </span>
          <Badge className="bg-primary-700 text-primary-300 text-xs">{tournament.format}</Badge>
        </div>

        <Heading level="h1" className="text-white text-3xl md:text-4xl font-bold mb-2">
          {tournament.name}
        </Heading>

        {tournament.description && (
          <Body className="text-primary-300 mt-1 max-w-2xl">{tournament.description}</Body>
        )}

        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-sm text-primary-300">
          {tournament.location && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {tournament.location}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(tournament.startDate)}
            {tournament.endDate && <> – {formatDate(tournament.endDate)}</>}
          </span>
          {tournament.playerCount > 0 && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {tournament.playerCount} players
            </span>
          )}
          {tournament.rounds.length > 0 && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {tournament.rounds.filter(r => r.status === "COMPLETED").length} / {tournament.rounds.length} rounds
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
