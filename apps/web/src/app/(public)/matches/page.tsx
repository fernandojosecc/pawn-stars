"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import type { MatchPreview, MatchStatus } from "@pawn-stars/shared-types"

const mockMatches: MatchPreview[] = [
  {
    id: "match-001",
    date: new Date("2025-03-15T14:00:00Z"),
    venue: "Chess Arena Madrid",
    status: "COMPLETED",
    homeTeam: { id: "team-001", name: "Pawn Stars", shortName: "PST" },
    awayTeam: { id: "team-002", name: "Rook Warriors", shortName: "RWR" },
    homeScore: 5.5,
    awayScore: 2.5,
  },
  {
    id: "match-002",
    date: new Date("2025-04-05T15:00:00Z"),
    venue: "Grand Chess Club Berlin",
    status: "UPCOMING",
    homeTeam: { id: "team-003", name: "Bishop Brigade", shortName: "BBR" },
    awayTeam: { id: "team-001", name: "Pawn Stars", shortName: "PST" },
  },
  {
    id: "match-003",
    date: new Date("2025-03-28T13:00:00Z"),
    venue: "Oslo Chess Center",
    status: "COMPLETED",
    homeTeam: { id: "team-001", name: "Pawn Stars", shortName: "PST" },
    awayTeam: { id: "team-004", name: "Knight Riders", shortName: "KNR" },
    homeScore: 4,
    awayScore: 4,
  },
]

const STATUS_FILTERS: { label: string; value: MatchStatus | "ALL" }[] = [
  { label: "All Matches", value: "ALL" },
  { label: "Upcoming", value: "UPCOMING" },
  { label: "Live", value: "LIVE" },
  { label: "Completed", value: "COMPLETED" },
]

function StatusBadge({ status }: { status: MatchStatus }) {
  const config: Record<MatchStatus, { label: string; className: string }> = {
    LIVE:      { label: "● LIVE",    className: "bg-red-500 text-white animate-pulse" },
    UPCOMING:  { label: "UPCOMING",  className: "bg-primary-100 text-primary-700" },
    COMPLETED: { label: "FINAL",     className: "bg-success-100 text-success-800" },
    POSTPONED: { label: "POSTPONED", className: "bg-accent-100 text-accent-800" },
    CANCELLED: { label: "CANCELLED", className: "bg-primary-100 text-primary-400" },
  }
  const { label, className } = config[status]
  return <Badge className={`text-xs ${className}`}>{label}</Badge>
}

function MatchCard({ match }: { match: MatchPreview }) {
  const dateStr = new Date(match.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Link href={`/matches/${match.id}`} className="block group">
      <div className="bg-white rounded-xl border border-primary-200 overflow-hidden hover:border-primary-400 hover:shadow-chess transition-all duration-200">
        <div className="p-4 sm:p-5">
          {/* Status + Date */}
          <div className="flex items-center justify-between mb-4">
            <StatusBadge status={match.status} />
            <Body size="xs" className="text-primary-400">{dateStr}</Body>
          </div>

          {/* Teams + Score */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 text-right">
              <Body size="sm" weight="semibold" className="text-primary-900 group-hover:text-primary-700 transition-colors">
                {match.homeTeam.name}
              </Body>
              {match.homeTeam.shortName && (
                <Body size="xs" className="text-primary-400">{match.homeTeam.shortName}</Body>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {match.homeScore !== undefined ? (
                <>
                  <span className="text-2xl font-bold text-primary-900 font-mono">{match.homeScore}</span>
                  <span className="text-primary-400 font-bold">–</span>
                  <span className="text-2xl font-bold text-primary-900 font-mono">{match.awayScore}</span>
                </>
              ) : (
                <span className="text-primary-400 font-semibold text-lg">VS</span>
              )}
            </div>

            <div className="flex-1">
              <Body size="sm" weight="semibold" className="text-primary-900 group-hover:text-primary-700 transition-colors">
                {match.awayTeam.name}
              </Body>
              {match.awayTeam.shortName && (
                <Body size="xs" className="text-primary-400">{match.awayTeam.shortName}</Body>
              )}
            </div>
          </div>

          {/* Venue */}
          {match.venue && (
            <div className="mt-3 pt-3 border-t border-primary-100">
              <Body size="xs" className="text-primary-400 text-center">📍 {match.venue}</Body>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function MatchesPage() {
  const [activeFilter, setActiveFilter] = useState<MatchStatus | "ALL">("ALL")

  const filtered = activeFilter === "ALL"
    ? mockMatches
    : mockMatches.filter((m) => m.status === activeFilter)

  return (
    <main className="min-h-screen bg-primary-50">
      {/* Header */}
      <div className="bg-primary-900 text-white py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heading level="h1" className="text-white text-3xl md:text-4xl font-bold mb-2">
            Matches
          </Heading>
          <Body className="text-primary-300">
            All Pawn Stars competitive matches
          </Body>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {STATUS_FILTERS.map(({ label, value }) => (
            <Button
              key={value}
              variant={activeFilter === value ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(value)}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Match list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Body className="text-primary-400">No matches found.</Body>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
