import React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { TournamentHeader } from "@/components/tournaments/TournamentHeader"
import { RoundsPairingsTable } from "@/components/tournaments/RoundsPairingsTable"
import { StandingsTable } from "@/components/tournaments/StandingsTable"
import { TournamentTimeline } from "@/components/tournaments/TournamentTimeline"
import { TOURNAMENT_DETAILS } from "@/lib/mock/tournament-details"

export function generateStaticParams() {
  return Object.keys(TOURNAMENT_DETAILS).map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const tournament = TOURNAMENT_DETAILS[slug]
  if (!tournament) return {}

  const dateRange = tournament.endDate
    ? `${new Date(tournament.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} – ${new Date(tournament.endDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
    : new Date(tournament.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })

  const description = `${tournament.name} · ${tournament.location ?? ""} · ${dateRange} · ${tournament.format}`

  return {
    title: `${tournament.name} | Pawn Stars`,
    description,
    openGraph: {
      title: tournament.name,
      description,
      type: "website",
    },
  }
}

const SECTION_TABS = ["rounds", "standings", "timeline"] as const
type SectionTab = typeof SECTION_TABS[number]

const TAB_LABELS: Record<SectionTab, string> = {
  rounds:    "Rounds & Pairings",
  standings: "Standings",
  timeline:  "Timeline",
}

export default async function TournamentDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const tournament = TOURNAMENT_DETAILS[slug]
  if (!tournament) notFound()

  const hasRounds    = tournament.rounds.length > 0
  const hasStandings = tournament.standings.length > 0
  const hasTimeline  = tournament.timeline.length > 0

  return (
    <main className="min-h-screen bg-primary-50">
      <TournamentHeader tournament={tournament} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Rounds & Pairings */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <Heading level="h2" className="text-primary-900 text-xl font-bold">
              Rounds &amp; Pairings
            </Heading>
            {hasRounds && (
              <Body size="sm" className="text-primary-500">
                {tournament.rounds.filter(r => r.status === "COMPLETED").length} / {tournament.rounds.length} rounds completed
              </Body>
            )}
          </div>
          <RoundsPairingsTable rounds={tournament.rounds} />
        </section>

        {/* Standings */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <Heading level="h2" className="text-primary-900 text-xl font-bold">
              Standings
            </Heading>
            {hasStandings && (
              <Body size="sm" className="text-primary-500">
                After {tournament.standings[0]?.gamesPlayed ?? 0} round{tournament.standings[0]?.gamesPlayed !== 1 ? "s" : ""}
              </Body>
            )}
          </div>
          <StandingsTable standings={tournament.standings} />
        </section>

        {/* Timeline */}
        <section>
          <Heading level="h2" className="text-primary-900 text-xl font-bold mb-4">
            Timeline
          </Heading>
          <TournamentTimeline events={tournament.timeline} />
        </section>
      </div>
    </main>
  )
}
