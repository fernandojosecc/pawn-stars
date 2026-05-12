import React from "react"
import type { Metadata } from "next"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { RankingsContent } from "@/components/rankings/RankingsContent"
import type { TeamRanking, PlayerRanking, PlayerEloHistory } from "@pawn-stars/shared-types"

export const metadata: Metadata = {
  title: "Rankings",
  description:
    "Pawn Stars team standings, individual player ratings by modality, and ELO evolution charts for the 2024–25 season.",
  alternates: { canonical: "https://pawnstars.com/rankings" },
  openGraph: {
    title: "Rankings — Pawn Stars",
    description: "Team standings, player ratings (classical/rapid/blitz), and ELO evolution for the 2024–25 season.",
    type: "website",
    url: "https://pawnstars.com/rankings",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pawn Stars Rankings" }],
  },
}

const teamRankings: TeamRanking[] = [
  { rank: 1, teamId: "team-001", teamName: "Pawn Stars", teamShortName: "PST", season: "2024-25", played: 12, won: 9, drawn: 2, lost: 1, points: 29, matchPoints: 68.5, form: ["W", "W", "D", "W", "W"] },
  { rank: 2, teamId: "team-002", teamName: "Rook Warriors", teamShortName: "RWR", season: "2024-25", played: 12, won: 8, drawn: 2, lost: 2, points: 26, matchPoints: 63.0, form: ["W", "L", "W", "W", "D"] },
  { rank: 3, teamId: "team-003", teamName: "Bishop Brigade", teamShortName: "BBR", season: "2024-25", played: 12, won: 7, drawn: 3, lost: 2, points: 24, matchPoints: 58.5, form: ["D", "W", "W", "L", "W"] },
  { rank: 4, teamId: "team-004", teamName: "Knight Riders", teamShortName: "KNR", season: "2024-25", played: 12, won: 6, drawn: 2, lost: 4, points: 20, matchPoints: 54.0, form: ["L", "D", "W", "L", "W"] },
  { rank: 5, teamId: "team-005", teamName: "Queen's Gambit FC", teamShortName: "QGF", season: "2024-25", played: 12, won: 5, drawn: 3, lost: 4, points: 18, matchPoints: 51.5, form: ["W", "D", "L", "D", "L"] },
  { rank: 6, teamId: "team-006", teamName: "Endgame Elite", teamShortName: "EGE", season: "2024-25", played: 12, won: 4, drawn: 2, lost: 6, points: 14, matchPoints: 46.0, form: ["L", "L", "W", "D", "L"] },
]

const playerRankings: PlayerRanking[] = [
  // Classical
  { rank: 1, playerId: "1",  playerName: "Magnus Carlsen",       playerTitle: "GM", playerNationality: "NOR", modality: "classical", rating: 2830, ratingChange: 5,   gamesPlayed: 48, wins: 22, draws: 20, losses: 6,  winRate: 45.8 },
  { rank: 2, playerId: "3",  playerName: "Fabiano Caruana",       playerTitle: "GM", playerNationality: "USA", modality: "classical", rating: 2820, ratingChange: 12,  gamesPlayed: 44, wins: 20, draws: 18, losses: 6,  winRate: 45.5 },
  { rank: 3, playerId: "12", playerName: "Alireza Firouzja",      playerTitle: "GM", playerNationality: "FRA", modality: "classical", rating: 2793, ratingChange: -3,  gamesPlayed: 42, wins: 18, draws: 17, losses: 7,  winRate: 42.9 },
  { rank: 4, playerId: "5",  playerName: "Ian Nepomniachtchi",    playerTitle: "GM", playerNationality: "RUS", modality: "classical", rating: 2793, ratingChange: 0,   gamesPlayed: 40, wins: 17, draws: 16, losses: 7,  winRate: 42.5 },
  { rank: 5, playerId: "4",  playerName: "Ding Liren",            playerTitle: "GM", playerNationality: "CHN", modality: "classical", rating: 2791, ratingChange: -8,  gamesPlayed: 38, wins: 16, draws: 15, losses: 7,  winRate: 42.1 },
  { rank: 6, playerId: "6",  playerName: "Levon Aronian",         playerTitle: "GM", playerNationality: "USA", modality: "classical", rating: 2785, ratingChange: 3,   gamesPlayed: 36, wins: 15, draws: 15, losses: 6,  winRate: 41.7 },
  { rank: 7, playerId: "8",  playerName: "Anish Giri",            playerTitle: "GM", playerNationality: "NED", modality: "classical", rating: 2780, ratingChange: 1,   gamesPlayed: 40, wins: 14, draws: 18, losses: 8,  winRate: 35.0 },
  { rank: 8, playerId: "10", playerName: "Hikaru Nakamura",       playerTitle: "GM", playerNationality: "USA", modality: "classical", rating: 2778, ratingChange: 7,   gamesPlayed: 42, wins: 18, draws: 16, losses: 8,  winRate: 42.9 },
  // Rapid
  { rank: 1, playerId: "1",  playerName: "Magnus Carlsen",       playerTitle: "GM", playerNationality: "NOR", modality: "rapid",     rating: 2880, ratingChange: 15,  gamesPlayed: 32, wins: 21, draws: 8,  losses: 3,  winRate: 65.6 },
  { rank: 2, playerId: "10", playerName: "Hikaru Nakamura",       playerTitle: "GM", playerNationality: "USA", modality: "rapid",     rating: 2860, ratingChange: 20,  gamesPlayed: 30, wins: 20, draws: 7,  losses: 3,  winRate: 66.7 },
  { rank: 3, playerId: "12", playerName: "Alireza Firouzja",      playerTitle: "GM", playerNationality: "FRA", modality: "rapid",     rating: 2835, ratingChange: 10,  gamesPlayed: 28, wins: 18, draws: 6,  losses: 4,  winRate: 64.3 },
  { rank: 4, playerId: "3",  playerName: "Fabiano Caruana",       playerTitle: "GM", playerNationality: "USA", modality: "rapid",     rating: 2810, ratingChange: 5,   gamesPlayed: 26, wins: 16, draws: 7,  losses: 3,  winRate: 61.5 },
  { rank: 5, playerId: "5",  playerName: "Ian Nepomniachtchi",    playerTitle: "GM", playerNationality: "RUS", modality: "rapid",     rating: 2800, ratingChange: -5,  gamesPlayed: 24, wins: 15, draws: 5,  losses: 4,  winRate: 62.5 },
  // Blitz
  { rank: 1, playerId: "1",  playerName: "Magnus Carlsen",       playerTitle: "GM", playerNationality: "NOR", modality: "blitz",     rating: 2886, ratingChange: 8,   gamesPlayed: 60, wins: 40, draws: 12, losses: 8,  winRate: 66.7 },
  { rank: 2, playerId: "10", playerName: "Hikaru Nakamura",       playerTitle: "GM", playerNationality: "USA", modality: "blitz",     rating: 2868, ratingChange: 18,  gamesPlayed: 65, wins: 43, draws: 10, losses: 12, winRate: 66.2 },
  { rank: 3, playerId: "7",  playerName: "Wesley So",             playerTitle: "GM", playerNationality: "USA", modality: "blitz",     rating: 2830, ratingChange: 4,   gamesPlayed: 55, wins: 35, draws: 12, losses: 8,  winRate: 63.6 },
  { rank: 4, playerId: "12", playerName: "Alireza Firouzja",      playerTitle: "GM", playerNationality: "FRA", modality: "blitz",     rating: 2825, ratingChange: -2,  gamesPlayed: 58, wins: 36, draws: 11, losses: 11, winRate: 62.1 },
  { rank: 5, playerId: "9",  playerName: "Shakhriyar Mamedyarov", playerTitle: "GM", playerNationality: "AZE", modality: "blitz",     rating: 2820, ratingChange: 12,  gamesPlayed: 52, wins: 34, draws: 10, losses: 8,  winRate: 65.4 },
]

const eloHistories: PlayerEloHistory[] = [
  {
    playerId: "1", playerName: "Magnus Carlsen", color: "#f59e0b",
    dataPoints: [
      { date: "2024-01", rating: 2820 }, { date: "2024-02", rating: 2822 },
      { date: "2024-03", rating: 2818 }, { date: "2024-04", rating: 2825 },
      { date: "2024-05", rating: 2823 }, { date: "2024-06", rating: 2828 },
      { date: "2024-07", rating: 2826 }, { date: "2024-08", rating: 2829 },
      { date: "2024-09", rating: 2827 }, { date: "2024-10", rating: 2830 },
      { date: "2024-11", rating: 2830 }, { date: "2024-12", rating: 2830 },
    ],
  },
  {
    playerId: "3", playerName: "Fabiano Caruana", color: "#3b82f6",
    dataPoints: [
      { date: "2024-01", rating: 2804 }, { date: "2024-02", rating: 2806 },
      { date: "2024-03", rating: 2809 }, { date: "2024-04", rating: 2808 },
      { date: "2024-05", rating: 2812 }, { date: "2024-06", rating: 2810 },
      { date: "2024-07", rating: 2815 }, { date: "2024-08", rating: 2818 },
      { date: "2024-09", rating: 2816 }, { date: "2024-10", rating: 2820 },
      { date: "2024-11", rating: 2819 }, { date: "2024-12", rating: 2820 },
    ],
  },
  {
    playerId: "12", playerName: "Alireza Firouzja", color: "#22c55e",
    dataPoints: [
      { date: "2024-01", rating: 2795 }, { date: "2024-02", rating: 2798 },
      { date: "2024-03", rating: 2796 }, { date: "2024-04", rating: 2800 },
      { date: "2024-05", rating: 2798 }, { date: "2024-06", rating: 2794 },
      { date: "2024-07", rating: 2796 }, { date: "2024-08", rating: 2793 },
      { date: "2024-09", rating: 2791 }, { date: "2024-10", rating: 2793 },
      { date: "2024-11", rating: 2793 }, { date: "2024-12", rating: 2793 },
    ],
  },
  {
    playerId: "5", playerName: "Ian Nepomniachtchi", color: "#8b5cf6",
    dataPoints: [
      { date: "2024-01", rating: 2786 }, { date: "2024-02", rating: 2790 },
      { date: "2024-03", rating: 2793 }, { date: "2024-04", rating: 2791 },
      { date: "2024-05", rating: 2793 }, { date: "2024-06", rating: 2795 },
      { date: "2024-07", rating: 2793 }, { date: "2024-08", rating: 2790 },
      { date: "2024-09", rating: 2793 }, { date: "2024-10", rating: 2793 },
      { date: "2024-11", rating: 2793 }, { date: "2024-12", rating: 2793 },
    ],
  },
]

export default function RankingsPage() {
  return (
    <main className="min-h-screen bg-primary-50">
      {/* Hero header */}
      <div className="bg-primary-900 text-white py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heading level="h1" className="text-white text-3xl md:text-4xl font-bold mb-2">
            Rankings
          </Heading>
          <Body className="text-primary-300">
            2024–25 season standings, individual ratings, and ELO progression
          </Body>

          {/* Summary chips */}
          <div className="flex flex-wrap gap-3 mt-5">
            <div className="bg-primary-800 rounded-lg px-4 py-2">
              <div className="text-accent-400 font-bold text-lg">1st</div>
              <Body size="xs" className="text-primary-400">Pawn Stars</Body>
            </div>
            <div className="bg-primary-800 rounded-lg px-4 py-2">
              <div className="text-white font-bold text-lg">29 pts</div>
              <Body size="xs" className="text-primary-400">League points</Body>
            </div>
            <div className="bg-primary-800 rounded-lg px-4 py-2">
              <div className="text-white font-bold text-lg">9W–2D–1L</div>
              <Body size="xs" className="text-primary-400">Season record</Body>
            </div>
            <div className="bg-primary-800 rounded-lg px-4 py-2">
              <div className="text-accent-400 font-bold text-lg">2830</div>
              <Body size="xs" className="text-primary-400">Top rating (Carlsen)</Body>
            </div>
          </div>
        </div>
      </div>

      <RankingsContent
        teamRankings={teamRankings}
        playerRankings={playerRankings}
        eloHistories={eloHistories}
      />
    </main>
  )
}
