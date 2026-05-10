"use client"

import React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import type { MatchPreview, MatchStatus } from "@pawn-stars/shared-types"

interface MatchHeaderProps {
  match: MatchPreview & {
    homeScore?: number
    awayScore?: number
  }
}

function StatusBadge({ status }: { status: MatchStatus }) {
  const config = {
    LIVE:      { label: "● LIVE",     className: "bg-red-500 text-white animate-pulse" },
    UPCOMING:  { label: "UPCOMING",   className: "bg-primary-200 text-primary-800" },
    COMPLETED: { label: "FINAL",      className: "bg-success-100 text-success-800" },
    POSTPONED: { label: "POSTPONED",  className: "bg-accent-100 text-accent-800" },
    CANCELLED: { label: "CANCELLED",  className: "bg-primary-100 text-primary-500" },
  }
  const { label, className } = config[status] ?? config.UPCOMING
  return <Badge className={className}>{label}</Badge>
}

function TeamBlock({
  team,
  score,
  align,
}: {
  team: MatchPreview["homeTeam"]
  score?: number
  align: "left" | "right"
}) {
  return (
    <div className={`flex flex-col items-center gap-2 flex-1 ${align === "right" ? "items-end" : "items-start"} md:items-center`}>
      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-primary-100 border-2 border-primary-200 flex-shrink-0">
        {team.logoUrl ? (
          <Image src={team.logoUrl} alt={team.name} fill className="object-contain p-2" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-primary-400">
            {team.shortName?.[0] ?? team.name[0]}
          </div>
        )}
      </div>
      <div className={`text-center ${align === "right" ? "text-right" : "text-left"} md:text-center`}>
        <Heading level="h3" className="text-white text-sm md:text-base leading-tight">
          {team.name}
        </Heading>
        {team.shortName && (
          <Body size="xs" className="text-primary-400">{team.shortName}</Body>
        )}
      </div>
      {score !== undefined && (
        <span className="text-4xl md:text-5xl font-bold text-accent-400">{score}</span>
      )}
    </div>
  )
}

export const MatchHeader: React.FC<MatchHeaderProps> = ({ match }) => {
  const dateStr = new Date(match.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const timeStr = new Date(match.date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <section className="bg-primary-900 text-white py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-4">
          <StatusBadge status={match.status} />
        </div>

        <div className="flex items-center justify-between gap-4 md:gap-8">
          <TeamBlock team={match.homeTeam} score={match.homeScore} align="left" />

          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            {match.status === "UPCOMING" && (
              <span className="text-primary-400 text-xl font-semibold">VS</span>
            )}
            {(match.status === "LIVE" || match.status === "COMPLETED") &&
              match.homeScore === undefined && (
                <span className="text-primary-400 text-2xl font-bold">–</span>
              )}
          </div>

          <TeamBlock team={match.awayTeam} score={match.awayScore} align="right" />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <Body size="sm" className="text-primary-300">{dateStr}</Body>
          <span className="hidden sm:block text-primary-600">·</span>
          <Body size="sm" className="text-primary-300">{timeStr}</Body>
          {match.venue && (
            <>
              <span className="hidden sm:block text-primary-600">·</span>
              <Body size="sm" className="text-primary-400">{match.venue}</Body>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
