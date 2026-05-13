import React from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { matchSchema } from "@/lib/structured-data"
import { MatchHeader } from "@/components/matches/MatchHeader"
import { MatchLineup } from "@/components/matches/MatchLineup"
import { RoundResults } from "@/components/matches/RoundResults"
import { MVPSection } from "@/components/matches/MVPSection"
import { PostMatchStats } from "@/components/matches/PostMatchStats"
import { Body } from "@/components/typography/Body"
import type { MatchDetail } from "@pawn-stars/shared-types"

const mockMatches: Record<string, MatchDetail> = {
  "match-001": {
    id: "match-001",
    date: new Date("2025-03-15T14:00:00Z"),
    venue: "Chess Arena Madrid",
    status: "COMPLETED",
    homeTeam: { id: "team-001", name: "Pawn Stars", shortName: "PST" },
    awayTeam: { id: "team-002", name: "Rook Warriors", shortName: "RWR" },
    homeScore: 5.5,
    awayScore: 2.5,
    lineup: {
      home: [
        { board: 1, playerId: "1", playerName: "Magnus Carlsen", playerTitle: "GM", playerNationality: "NOR", playerRating: 2830 },
        { board: 2, playerId: "3", playerName: "Fabiano Caruana", playerTitle: "GM", playerNationality: "USA", playerRating: 2820 },
        { board: 3, playerId: "5", playerName: "Ian Nepomniachtchi", playerTitle: "GM", playerNationality: "RUS", playerRating: 2793 },
        { board: 4, playerId: "12", playerName: "Alireza Firouzja", playerTitle: "GM", playerNationality: "FRA", playerRating: 2793 },
      ],
      away: [
        { board: 1, playerId: "4", playerName: "Ding Liren", playerTitle: "GM", playerNationality: "CHN", playerRating: 2791 },
        { board: 2, playerId: "6", playerName: "Levon Aronian", playerTitle: "GM", playerNationality: "USA", playerRating: 2785 },
        { board: 3, playerId: "8", playerName: "Anish Giri", playerTitle: "GM", playerNationality: "NED", playerRating: 2780 },
        { board: 4, playerId: "10", playerName: "Hikaru Nakamura", playerTitle: "GM", playerNationality: "USA", playerRating: 2778 },
      ],
    },
    rounds: [
      {
        roundNumber: 1, homeRoundScore: 2.5, awayRoundScore: 1.5,
        results: [
          { board: 1, result: "WIN", homePlayerId: "1", homePlayerName: "Magnus Carlsen", homePlayerTitle: "GM", awayPlayerId: "4", awayPlayerName: "Ding Liren", awayPlayerTitle: "GM", homeScore: 1, awayScore: 0 },
          { board: 2, result: "DRAW", homePlayerId: "3", homePlayerName: "Fabiano Caruana", homePlayerTitle: "GM", awayPlayerId: "6", awayPlayerName: "Levon Aronian", awayPlayerTitle: "GM", homeScore: 0.5, awayScore: 0.5 },
          { board: 3, result: "WIN", homePlayerId: "5", homePlayerName: "Ian Nepomniachtchi", homePlayerTitle: "GM", awayPlayerId: "8", awayPlayerName: "Anish Giri", awayPlayerTitle: "GM", homeScore: 1, awayScore: 0 },
          { board: 4, result: "LOSS", homePlayerId: "12", homePlayerName: "Alireza Firouzja", homePlayerTitle: "GM", awayPlayerId: "10", awayPlayerName: "Hikaru Nakamura", awayPlayerTitle: "GM", homeScore: 0, awayScore: 1 },
        ],
      },
      {
        roundNumber: 2, homeRoundScore: 3, awayRoundScore: 1,
        results: [
          { board: 1, result: "WIN", homePlayerId: "1", homePlayerName: "Magnus Carlsen", homePlayerTitle: "GM", awayPlayerId: "4", awayPlayerName: "Ding Liren", awayPlayerTitle: "GM", homeScore: 1, awayScore: 0 },
          { board: 2, result: "WIN", homePlayerId: "3", homePlayerName: "Fabiano Caruana", homePlayerTitle: "GM", awayPlayerId: "6", awayPlayerName: "Levon Aronian", awayPlayerTitle: "GM", homeScore: 1, awayScore: 0 },
          { board: 3, result: "DRAW", homePlayerId: "5", homePlayerName: "Ian Nepomniachtchi", homePlayerTitle: "GM", awayPlayerId: "8", awayPlayerName: "Anish Giri", awayPlayerTitle: "GM", homeScore: 0.5, awayScore: 0.5 },
          { board: 4, result: "DRAW", homePlayerId: "12", homePlayerName: "Alireza Firouzja", homePlayerTitle: "GM", awayPlayerId: "10", awayPlayerName: "Hikaru Nakamura", awayPlayerTitle: "GM", homeScore: 0.5, awayScore: 0.5 },
        ],
      },
    ],
    mvp: {
      playerId: "1", playerName: "Magnus Carlsen", playerTitle: "GM", playerNationality: "NOR", playerRating: 2830,
      reason: "Perfect score on Board 1 with two dominant victories", score: 2, performance: 2920,
    },
    postMatchStats: {
      homeTeamScore: 5.5, awayTeamScore: 2.5, totalGames: 8, homeWins: 3, awayWins: 1, draws: 4,
      highestPerformance: { playerName: "Magnus Carlsen", performance: 2920 },
      avgPerformanceHome: 2850, avgPerformanceAway: 2790,
    },
    createdAt: new Date("2025-03-10T10:00:00Z"),
    updatedAt: new Date("2025-03-15T16:00:00Z"),
  },
  "match-002": {
    id: "match-002",
    date: new Date("2025-04-05T15:00:00Z"),
    venue: "Grand Chess Club Berlin",
    status: "UPCOMING",
    homeTeam: { id: "team-003", name: "Bishop Brigade", shortName: "BBR" },
    awayTeam: { id: "team-001", name: "Pawn Stars", shortName: "PST" },
    lineup: { home: [], away: [] },
    rounds: [],
    createdAt: new Date("2025-03-20T10:00:00Z"),
    updatedAt: new Date("2025-03-20T10:00:00Z"),
  },
  "match-003": {
    id: "match-003",
    date: new Date("2025-03-28T13:00:00Z"),
    venue: "Oslo Chess Center",
    status: "COMPLETED",
    homeTeam: { id: "team-001", name: "Pawn Stars", shortName: "PST" },
    awayTeam: { id: "team-004", name: "Knight Riders", shortName: "KNR" },
    homeScore: 4,
    awayScore: 4,
    lineup: {
      home: [
        { board: 1, playerId: "2", playerName: "Hou Yifan", playerTitle: "GM", playerNationality: "CHN", playerRating: 2758 },
        { board: 2, playerId: "7", playerName: "Wesley So", playerTitle: "GM", playerNationality: "USA", playerRating: 2767 },
        { board: 3, playerId: "9", playerName: "Shakhriyar Mamedyarov", playerTitle: "GM", playerNationality: "AZE", playerRating: 2762 },
        { board: 4, playerId: "11", playerName: "Richard Rapport", playerTitle: "GM", playerNationality: "ROU", playerRating: 2732 },
      ],
      away: [
        { board: 1, playerId: "ext-1", playerName: "Teimour Radjabov", playerTitle: "GM", playerNationality: "AZE", playerRating: 2742 },
        { board: 2, playerId: "ext-2", playerName: "Peter Svidler", playerTitle: "GM", playerNationality: "RUS", playerRating: 2718 },
        { board: 3, playerId: "ext-3", playerName: "David Navara", playerTitle: "GM", playerNationality: "CZE", playerRating: 2706 },
        { board: 4, playerId: "ext-4", playerName: "Boris Gelfand", playerTitle: "GM", playerNationality: "ISR", playerRating: 2694 },
      ],
    },
    rounds: [
      {
        roundNumber: 1, homeRoundScore: 2, awayRoundScore: 2,
        results: [
          { board: 1, result: "WIN", homePlayerId: "2", homePlayerName: "Hou Yifan", homePlayerTitle: "GM", awayPlayerId: "ext-1", awayPlayerName: "Teimour Radjabov", awayPlayerTitle: "GM", homeScore: 1, awayScore: 0 },
          { board: 2, result: "LOSS", homePlayerId: "7", homePlayerName: "Wesley So", homePlayerTitle: "GM", awayPlayerId: "ext-2", awayPlayerName: "Peter Svidler", awayPlayerTitle: "GM", homeScore: 0, awayScore: 1 },
          { board: 3, result: "DRAW", homePlayerId: "9", homePlayerName: "Shakhriyar Mamedyarov", homePlayerTitle: "GM", awayPlayerId: "ext-3", awayPlayerName: "David Navara", awayPlayerTitle: "GM", homeScore: 0.5, awayScore: 0.5 },
          { board: 4, result: "DRAW", homePlayerId: "11", homePlayerName: "Richard Rapport", homePlayerTitle: "GM", awayPlayerId: "ext-4", awayPlayerName: "Boris Gelfand", awayPlayerTitle: "GM", homeScore: 0.5, awayScore: 0.5 },
        ],
      },
      {
        roundNumber: 2, homeRoundScore: 2, awayRoundScore: 2,
        results: [
          { board: 1, result: "DRAW", homePlayerId: "2", homePlayerName: "Hou Yifan", homePlayerTitle: "GM", awayPlayerId: "ext-1", awayPlayerName: "Teimour Radjabov", awayPlayerTitle: "GM", homeScore: 0.5, awayScore: 0.5 },
          { board: 2, result: "WIN", homePlayerId: "7", homePlayerName: "Wesley So", homePlayerTitle: "GM", awayPlayerId: "ext-2", awayPlayerName: "Peter Svidler", awayPlayerTitle: "GM", homeScore: 1, awayScore: 0 },
          { board: 3, result: "WIN", homePlayerId: "9", homePlayerName: "Shakhriyar Mamedyarov", homePlayerTitle: "GM", awayPlayerId: "ext-3", awayPlayerName: "David Navara", awayPlayerTitle: "GM", homeScore: 1, awayScore: 0 },
          { board: 4, result: "LOSS", homePlayerId: "11", homePlayerName: "Richard Rapport", homePlayerTitle: "GM", awayPlayerId: "ext-4", awayPlayerName: "Boris Gelfand", awayPlayerTitle: "GM", homeScore: 0, awayScore: 1 },
        ],
      },
    ],
    mvp: {
      playerId: "2", playerName: "Hou Yifan", playerTitle: "GM", playerNationality: "CHN", playerRating: 2758,
      reason: "Win in Round 1 and fighting draw in Round 2 on top board", score: 1.5, performance: 2810,
    },
    postMatchStats: {
      homeTeamScore: 4, awayTeamScore: 4, totalGames: 8, homeWins: 2, awayWins: 2, draws: 4,
      highestPerformance: { playerName: "Hou Yifan", performance: 2810 },
      avgPerformanceHome: 2770, avgPerformanceAway: 2740,
    },
    createdAt: new Date("2025-03-22T10:00:00Z"),
    updatedAt: new Date("2025-03-28T15:00:00Z"),
  },
}

export function generateStaticParams() {
  return Object.keys(mockMatches).map((id) => ({ id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const match = mockMatches[id]
  if (!match) return { title: "Match Not Found" }
  const title = `${match.homeTeam.name} vs ${match.awayTeam.name}`
  const description = `${title}${match.venue ? ` at ${match.venue}` : ""} — ${new Date(match.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`
  return {
    title,
    description,
    alternates: { canonical: `https://pawnstars.com/matches/${id}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://pawnstars.com/matches/${id}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
    },
  }
}

export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const match = mockMatches[id]
  if (!match) notFound()

  const isCompleted = match.status === "COMPLETED"
  const hasLineup = match.lineup.home.length > 0 || match.lineup.away.length > 0
  const ldJson = matchSchema(match)

  return (
    <main className="min-h-screen bg-primary-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
      <MatchHeader match={match} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {match.status === "UPCOMING" && (
          <div className="bg-accent-50 border border-accent-200 rounded-xl p-5 text-center">
            <Body className="text-accent-700 font-medium">
              Lineup and results will be available once the match begins.
            </Body>
          </div>
        )}

        {hasLineup && (
          <MatchLineup
            lineup={match.lineup}
            homeTeamName={match.homeTeam.name}
            awayTeamName={match.awayTeam.name}
          />
        )}

        {isCompleted && match.rounds.length > 0 && (
          <RoundResults
            rounds={match.rounds}
            homeTeamName={match.homeTeam.name}
            awayTeamName={match.awayTeam.name}
          />
        )}

        {isCompleted && match.mvp && <MVPSection mvp={match.mvp} />}

        {isCompleted && match.postMatchStats && (
          <PostMatchStats
            stats={match.postMatchStats}
            homeTeamName={match.homeTeam.name}
            awayTeamName={match.awayTeam.name}
          />
        )}
      </div>
    </main>
  )
}
