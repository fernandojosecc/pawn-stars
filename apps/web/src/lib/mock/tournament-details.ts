import type { TournamentDetail, TournamentParticipant } from "@pawn-stars/shared-types"

const PLAYERS: Record<string, TournamentParticipant> = {
  carlsen:  { playerId: "1",  playerName: "Magnus Carlsen",       playerTitle: "GM", playerNationality: "NOR", rating: 2830 },
  caruana:  { playerId: "3",  playerName: "Fabiano Caruana",      playerTitle: "GM", playerNationality: "USA", rating: 2820 },
  nakamura: { playerId: "10", playerName: "Hikaru Nakamura",      playerTitle: "GM", playerNationality: "USA", rating: 2778 },
  giri:     { playerId: "8",  playerName: "Anish Giri",           playerTitle: "GM", playerNationality: "NED", rating: 2780 },
  nepo:     { playerId: "5",  playerName: "Ian Nepomniachtchi",   playerTitle: "GM", playerNationality: "RUS", rating: 2793 },
  firouzja: { playerId: "12", playerName: "Alireza Firouzja",     playerTitle: "GM", playerNationality: "FRA", rating: 2793 },
  pragg:    { playerId: "15", playerName: "R. Praggnanandhaa",    playerTitle: "GM", playerNationality: "IND", rating: 2747 },
  nodi:     { playerId: "16", playerName: "N. Abdusattorov",      playerTitle: "GM", playerNationality: "UZB", rating: 2766 },
}

const { carlsen, caruana, nakamura, giri, nepo, firouzja, pragg, nodi } = PLAYERS

export const TOURNAMENT_DETAILS: Record<string, TournamentDetail> = {
  "tata-steel-masters-2024": {
    id: "1", slug: "tata-steel-masters-2024",
    name: "Tata Steel Masters 2024",
    format: "Round-Robin", status: "COMPLETED",
    startDate: new Date("2024-01-12"), endDate: new Date("2024-01-28"),
    location: "Wijk aan Zee, Netherlands",
    description: "The 86th Tata Steel Chess Tournament — one of the strongest round-robin events of the year.",
    playerCount: 14,
    rounds: [
      {
        roundNumber: 1, status: "COMPLETED", date: "2024-01-12",
        pairings: [
          { board: 1, white: carlsen,  black: caruana,  result: "1/2-1/2" },
          { board: 2, white: nakamura, black: nepo,     result: "1-0" },
          { board: 3, white: giri,     black: firouzja, result: "0-1" },
          { board: 4, white: pragg,    black: nodi,     result: "1/2-1/2" },
        ],
      },
      {
        roundNumber: 2, status: "COMPLETED", date: "2024-01-13",
        pairings: [
          { board: 1, white: caruana,  black: firouzja, result: "1-0" },
          { board: 2, white: nepo,     black: carlsen,  result: "1/2-1/2" },
          { board: 3, white: nodi,     black: nakamura, result: "0-1" },
          { board: 4, white: firouzja, black: pragg,    result: "1-0" },
        ],
      },
      {
        roundNumber: 3, status: "COMPLETED", date: "2024-01-14",
        pairings: [
          { board: 1, white: carlsen,  black: giri,     result: "1-0" },
          { board: 2, white: firouzja, black: nakamura, result: "0-1" },
          { board: 3, white: caruana,  black: nepo,     result: "1/2-1/2" },
          { board: 4, white: pragg,    black: nodi,     result: "1/2-1/2" },
        ],
      },
    ],
    standings: [
      { rank: 1, player: carlsen,  score: 2.5, tiebreak: 8.50, wins: 2, draws: 1, losses: 0, gamesPlayed: 3 },
      { rank: 2, player: nakamura, score: 2.5, tiebreak: 8.25, wins: 2, draws: 1, losses: 0, gamesPlayed: 3 },
      { rank: 3, player: caruana,  score: 2.0, tiebreak: 7.75, wins: 1, draws: 2, losses: 0, gamesPlayed: 3 },
      { rank: 4, player: firouzja, score: 1.5, tiebreak: 6.50, wins: 1, draws: 1, losses: 1, gamesPlayed: 3 },
      { rank: 5, player: nepo,     score: 1.0, tiebreak: 5.50, wins: 0, draws: 2, losses: 1, gamesPlayed: 3 },
      { rank: 6, player: pragg,    score: 1.0, tiebreak: 5.25, wins: 0, draws: 2, losses: 1, gamesPlayed: 3 },
      { rank: 7, player: giri,     score: 0.5, tiebreak: 4.75, wins: 0, draws: 1, losses: 2, gamesPlayed: 3 },
      { rank: 8, player: nodi,     score: 0.5, tiebreak: 4.25, wins: 0, draws: 1, losses: 2, gamesPlayed: 3 },
    ],
    timeline: [
      { roundNumber: 1, date: "2024-01-12", title: "Round 1", description: "Nakamura beats Nepo; Firouzja defeats Giri", type: "round_end" },
      { roundNumber: 2, date: "2024-01-13", title: "Round 2", description: "Caruana and Nakamura extend their lead", type: "round_end" },
      { roundNumber: 3, date: "2024-01-14", title: "Round 3", description: "Carlsen wins with black to join Nakamura at the top", type: "round_end" },
      { date: "2024-01-28", title: "Final Round", description: "Carlsen claims the title on the final day", type: "milestone" },
    ],
  },

  "sinquefield-cup-2024": {
    id: "12", slug: "sinquefield-cup-2024",
    name: "Sinquefield Cup 2024",
    format: "Round-Robin", status: "ONGOING",
    startDate: new Date("2024-08-20"), endDate: new Date("2024-09-05"),
    location: "St. Louis, USA",
    description: "Part of the Grand Chess Tour 2024 — nine rounds of top-level classical chess.",
    playerCount: 10,
    rounds: [
      {
        roundNumber: 1, status: "COMPLETED", date: "2024-08-20",
        pairings: [
          { board: 1, white: carlsen,  black: nakamura, result: "1/2-1/2" },
          { board: 2, white: caruana,  black: firouzja, result: "1-0" },
          { board: 3, white: nepo,     black: giri,     result: "1/2-1/2" },
          { board: 4, white: pragg,    black: nodi,     result: "1-0" },
        ],
      },
      {
        roundNumber: 2, status: "COMPLETED", date: "2024-08-21",
        pairings: [
          { board: 1, white: nakamura, black: caruana,  result: "1/2-1/2" },
          { board: 2, white: firouzja, black: carlsen,  result: "0-1" },
          { board: 3, white: giri,     black: pragg,    result: "1/2-1/2" },
          { board: 4, white: nodi,     black: nepo,     result: "1/2-1/2" },
        ],
      },
      {
        roundNumber: 3, status: "ONGOING", date: "2024-08-22",
        pairings: [
          { board: 1, white: carlsen,  black: giri,     result: "*" },
          { board: 2, white: caruana,  black: nodi,     result: "*" },
          { board: 3, white: nakamura, black: pragg,    result: "*" },
          { board: 4, white: firouzja, black: nepo,     result: "*" },
        ],
      },
    ],
    standings: [
      { rank: 1, player: carlsen,  score: 2.0, wins: 2, draws: 0, losses: 0, gamesPlayed: 2 },
      { rank: 2, player: caruana,  score: 1.5, wins: 1, draws: 1, losses: 0, gamesPlayed: 2 },
      { rank: 3, player: pragg,    score: 1.5, wins: 1, draws: 1, losses: 0, gamesPlayed: 2 },
      { rank: 4, player: nakamura, score: 1.0, wins: 0, draws: 2, losses: 0, gamesPlayed: 2 },
      { rank: 5, player: nepo,     score: 1.0, wins: 0, draws: 2, losses: 0, gamesPlayed: 2 },
      { rank: 6, player: giri,     score: 1.0, wins: 0, draws: 2, losses: 0, gamesPlayed: 2 },
      { rank: 7, player: nodi,     score: 0.5, wins: 0, draws: 1, losses: 1, gamesPlayed: 2 },
      { rank: 8, player: firouzja, score: 0.5, wins: 0, draws: 1, losses: 1, gamesPlayed: 2 },
    ],
    timeline: [
      { roundNumber: 1, date: "2024-08-20", title: "Round 1", description: "Caruana and Pragg score early wins", type: "round_end" },
      { roundNumber: 2, date: "2024-08-21", title: "Round 2", description: "Carlsen defeats Firouzja to lead alone", type: "round_end" },
      { roundNumber: 3, date: "2024-08-22", title: "Round 3 In Progress", description: "All four games currently being played", type: "round_start" },
    ],
  },

  "world-chess-championship-2023": {
    id: "2", slug: "world-chess-championship-2023",
    name: "World Chess Championship 2023",
    format: "Knockout", status: "COMPLETED",
    startDate: new Date("2023-11-20"), endDate: new Date("2023-12-15"),
    location: "Dubai, UAE",
    description: "The FIDE World Chess Championship 2023 match between Ding Liren and Ian Nepomniachtchi.",
    playerCount: 2,
    rounds: [],
    standings: [
      { rank: 1, player: { playerId: "4", playerName: "Ding Liren", playerTitle: "GM", playerNationality: "CHN", rating: 2788 }, score: 7.5, wins: 4, draws: 7, losses: 3, gamesPlayed: 14 },
      { rank: 2, player: nepo, score: 6.5, wins: 3, draws: 7, losses: 4, gamesPlayed: 14 },
    ],
    timeline: [
      { date: "2023-11-20", title: "Match begins", description: "Ding Liren and Nepomniachtchi face off in Dubai", type: "milestone" },
      { date: "2023-12-15", title: "Ding Liren wins!", description: "Ding wins in tiebreak to become World Champion", type: "milestone" },
    ],
  },

  "sinquefield-cup-2023": {
    id: "3", slug: "sinquefield-cup-2023",
    name: "Sinquefield Cup 2023",
    format: "Round-Robin", status: "COMPLETED",
    startDate: new Date("2023-09-01"), endDate: new Date("2023-09-15"),
    location: "St. Louis, USA",
    playerCount: 10, rounds: [], standings: [], timeline: [],
  },

  "candidates-tournament-2023": {
    id: "4", slug: "candidates-tournament-2023",
    name: "Candidates Tournament 2023",
    format: "Round-Robin", status: "COMPLETED",
    startDate: new Date("2023-04-15"), endDate: new Date("2023-05-05"),
    location: "Toronto, Canada",
    playerCount: 8, rounds: [], standings: [], timeline: [],
  },

  "norway-chess-2023": {
    id: "5", slug: "norway-chess-2023",
    name: "Norway Chess 2023",
    format: "Round-Robin", status: "COMPLETED",
    startDate: new Date("2023-05-30"), endDate: new Date("2023-06-10"),
    location: "Stavanger, Norway",
    playerCount: 10, rounds: [], standings: [], timeline: [],
  },

  "world-rapid-championship-2022": {
    id: "6", slug: "world-rapid-championship-2022",
    name: "World Rapid Championship 2022",
    format: "Swiss", status: "COMPLETED",
    startDate: new Date("2022-12-25"), endDate: new Date("2022-12-30"),
    location: "Samarkand, Uzbekistan",
    playerCount: 200, rounds: [], standings: [], timeline: [],
  },

  "fide-grand-prix-berlin-2022": {
    id: "7", slug: "fide-grand-prix-berlin-2022",
    name: "FIDE Grand Prix Berlin 2022",
    format: "Knockout", status: "COMPLETED",
    startDate: new Date("2022-10-15"), endDate: new Date("2022-10-25"),
    location: "Berlin, Germany",
    playerCount: 16, rounds: [], standings: [], timeline: [],
  },

  "olympiad-2022": {
    id: "8", slug: "olympiad-2022",
    name: "Chess Olympiad 2022",
    format: "Swiss", status: "COMPLETED",
    startDate: new Date("2022-07-28"), endDate: new Date("2022-08-10"),
    location: "Chennai, India",
    playerCount: 180, rounds: [], standings: [], timeline: [],
  },

  "tata-steel-masters-2025": {
    id: "9", slug: "tata-steel-masters-2025",
    name: "Tata Steel Masters 2025",
    format: "Round-Robin", status: "UPCOMING",
    startDate: new Date("2025-01-10"), endDate: new Date("2025-01-26"),
    location: "Wijk aan Zee, Netherlands",
    description: "The 87th edition of the prestigious Tata Steel tournament.",
    playerCount: 14, rounds: [], standings: [], timeline: [],
  },

  "candidates-tournament-2024": {
    id: "10", slug: "candidates-tournament-2024",
    name: "Candidates Tournament 2024",
    format: "Round-Robin", status: "UPCOMING",
    startDate: new Date("2024-04-03"), endDate: new Date("2024-04-22"),
    location: "Toronto, Canada",
    playerCount: 8, rounds: [], standings: [], timeline: [],
  },

  "world-chess-championship-2024": {
    id: "11", slug: "world-chess-championship-2024",
    name: "World Chess Championship 2024",
    format: "Knockout", status: "UPCOMING",
    startDate: new Date("2024-11-20"), endDate: new Date("2024-12-15"),
    location: "New York, USA",
    playerCount: 2, rounds: [], standings: [], timeline: [],
  },
}
