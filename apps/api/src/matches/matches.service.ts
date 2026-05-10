import { Injectable, NotFoundException } from '@nestjs/common'

export type MatchStatus = 'UPCOMING' | 'LIVE' | 'COMPLETED' | 'POSTPONED' | 'CANCELLED'
export type MatchResultOutcome = 'WIN' | 'LOSS' | 'DRAW' | 'UNFINISHED'

export interface MatchTeam {
  id: string
  name: string
  shortName?: string
  logoUrl?: string
}

export interface MatchLineupEntry {
  board: number
  playerId: string
  playerName: string
  playerTitle?: string
  playerNationality?: string
  playerPhotoUrl?: string
  playerRating?: number
}

export interface RoundResult {
  board: number
  homePlayerId: string
  homePlayerName: string
  homePlayerTitle?: string
  awayPlayerId: string
  awayPlayerName: string
  awayPlayerTitle?: string
  result: MatchResultOutcome | null
  homeScore: number
  awayScore: number
}

export interface MatchRound {
  roundNumber: number
  results: RoundResult[]
  homeRoundScore: number
  awayRoundScore: number
}

export interface MatchMVP {
  playerId: string
  playerName: string
  playerTitle?: string
  playerNationality?: string
  playerPhotoUrl?: string
  playerRating?: number
  reason?: string
  score: number
  performance: number
}

export interface PostMatchStats {
  homeTeamScore: number
  awayTeamScore: number
  totalGames: number
  homeWins: number
  awayWins: number
  draws: number
  highestPerformance?: { playerName: string; performance: number }
  avgPerformanceHome: number
  avgPerformanceAway: number
}

export interface MatchDetail {
  id: string
  date: Date
  venue?: string
  status: MatchStatus
  homeTeam: MatchTeam
  awayTeam: MatchTeam
  homeScore?: number
  awayScore?: number
  seasonId?: string
  tournamentId?: string
  lineup: { home: MatchLineupEntry[]; away: MatchLineupEntry[] }
  rounds: MatchRound[]
  mvp?: MatchMVP
  postMatchStats?: PostMatchStats
  createdAt: Date
  updatedAt: Date
}

export interface MatchPreview {
  id: string
  date: Date
  venue?: string
  status: MatchStatus
  homeTeam: MatchTeam
  awayTeam: MatchTeam
  homeScore?: number
  awayScore?: number
}

@Injectable()
export class MatchesService {
  private readonly mockMatches: MatchDetail[] = [
    {
      id: 'match-001',
      date: new Date('2025-03-15T14:00:00Z'),
      venue: 'Chess Arena Madrid',
      status: 'COMPLETED',
      homeTeam: { id: 'team-001', name: 'Pawn Stars', shortName: 'PST', logoUrl: '/teams/pawn-stars.png' },
      awayTeam: { id: 'team-002', name: 'Rook Warriors', shortName: 'RWR', logoUrl: '/teams/rook-warriors.png' },
      homeScore: 5.5,
      awayScore: 2.5,
      lineup: {
        home: [
          { board: 1, playerId: '1', playerName: 'Magnus Carlsen', playerTitle: 'GM', playerNationality: 'NOR', playerRating: 2830 },
          { board: 2, playerId: '3', playerName: 'Fabiano Caruana', playerTitle: 'GM', playerNationality: 'USA', playerRating: 2820 },
          { board: 3, playerId: '5', playerName: 'Ian Nepomniachtchi', playerTitle: 'GM', playerNationality: 'RUS', playerRating: 2793 },
          { board: 4, playerId: '12', playerName: 'Alireza Firouzja', playerTitle: 'GM', playerNationality: 'FRA', playerRating: 2793 },
        ],
        away: [
          { board: 1, playerId: '4', playerName: 'Ding Liren', playerTitle: 'GM', playerNationality: 'CHN', playerRating: 2791 },
          { board: 2, playerId: '6', playerName: 'Levon Aronian', playerTitle: 'GM', playerNationality: 'USA', playerRating: 2785 },
          { board: 3, playerId: '8', playerName: 'Anish Giri', playerTitle: 'GM', playerNationality: 'NED', playerRating: 2780 },
          { board: 4, playerId: '10', playerName: 'Hikaru Nakamura', playerTitle: 'GM', playerNationality: 'USA', playerRating: 2778 },
        ],
      },
      rounds: [
        {
          roundNumber: 1,
          homeRoundScore: 2.5,
          awayRoundScore: 1.5,
          results: [
            { board: 1, result: 'WIN', homePlayerId: '1', homePlayerName: 'Magnus Carlsen', homePlayerTitle: 'GM', awayPlayerId: '4', awayPlayerName: 'Ding Liren', awayPlayerTitle: 'GM', homeScore: 1, awayScore: 0 },
            { board: 2, result: 'DRAW', homePlayerId: '3', homePlayerName: 'Fabiano Caruana', homePlayerTitle: 'GM', awayPlayerId: '6', awayPlayerName: 'Levon Aronian', awayPlayerTitle: 'GM', homeScore: 0.5, awayScore: 0.5 },
            { board: 3, result: 'WIN', homePlayerId: '5', homePlayerName: 'Ian Nepomniachtchi', homePlayerTitle: 'GM', awayPlayerId: '8', awayPlayerName: 'Anish Giri', awayPlayerTitle: 'GM', homeScore: 1, awayScore: 0 },
            { board: 4, result: 'LOSS', homePlayerId: '12', homePlayerName: 'Alireza Firouzja', homePlayerTitle: 'GM', awayPlayerId: '10', awayPlayerName: 'Hikaru Nakamura', awayPlayerTitle: 'GM', homeScore: 0, awayScore: 1 },
          ],
        },
        {
          roundNumber: 2,
          homeRoundScore: 3,
          awayRoundScore: 1,
          results: [
            { board: 1, result: 'WIN', homePlayerId: '1', homePlayerName: 'Magnus Carlsen', homePlayerTitle: 'GM', awayPlayerId: '4', awayPlayerName: 'Ding Liren', awayPlayerTitle: 'GM', homeScore: 1, awayScore: 0 },
            { board: 2, result: 'WIN', homePlayerId: '3', homePlayerName: 'Fabiano Caruana', homePlayerTitle: 'GM', awayPlayerId: '6', awayPlayerName: 'Levon Aronian', awayPlayerTitle: 'GM', homeScore: 1, awayScore: 0 },
            { board: 3, result: 'DRAW', homePlayerId: '5', homePlayerName: 'Ian Nepomniachtchi', homePlayerTitle: 'GM', awayPlayerId: '8', awayPlayerName: 'Anish Giri', awayPlayerTitle: 'GM', homeScore: 0.5, awayScore: 0.5 },
            { board: 4, result: 'DRAW', homePlayerId: '12', homePlayerName: 'Alireza Firouzja', homePlayerTitle: 'GM', awayPlayerId: '10', awayPlayerName: 'Hikaru Nakamura', awayPlayerTitle: 'GM', homeScore: 0.5, awayScore: 0.5 },
          ],
        },
      ],
      mvp: {
        playerId: '1', playerName: 'Magnus Carlsen', playerTitle: 'GM', playerNationality: 'NOR', playerRating: 2830,
        reason: 'Perfect score on Board 1 with two dominant victories', score: 2, performance: 2920,
      },
      postMatchStats: {
        homeTeamScore: 5.5, awayTeamScore: 2.5, totalGames: 8, homeWins: 3, awayWins: 1, draws: 4,
        highestPerformance: { playerName: 'Magnus Carlsen', performance: 2920 },
        avgPerformanceHome: 2850, avgPerformanceAway: 2790,
      },
      createdAt: new Date('2025-03-10T10:00:00Z'),
      updatedAt: new Date('2025-03-15T16:00:00Z'),
    },
    {
      id: 'match-002',
      date: new Date('2025-04-05T15:00:00Z'),
      venue: 'Grand Chess Club Berlin',
      status: 'UPCOMING',
      homeTeam: { id: 'team-003', name: 'Bishop Brigade', shortName: 'BBR', logoUrl: '/teams/bishop-brigade.png' },
      awayTeam: { id: 'team-001', name: 'Pawn Stars', shortName: 'PST', logoUrl: '/teams/pawn-stars.png' },
      lineup: { home: [], away: [] },
      rounds: [],
      createdAt: new Date('2025-03-20T10:00:00Z'),
      updatedAt: new Date('2025-03-20T10:00:00Z'),
    },
    {
      id: 'match-003',
      date: new Date('2025-03-28T13:00:00Z'),
      venue: 'Oslo Chess Center',
      status: 'COMPLETED',
      homeTeam: { id: 'team-001', name: 'Pawn Stars', shortName: 'PST', logoUrl: '/teams/pawn-stars.png' },
      awayTeam: { id: 'team-004', name: 'Knight Riders', shortName: 'KNR', logoUrl: '/teams/knight-riders.png' },
      homeScore: 4,
      awayScore: 4,
      lineup: {
        home: [
          { board: 1, playerId: '2', playerName: 'Hou Yifan', playerTitle: 'GM', playerNationality: 'CHN', playerRating: 2758 },
          { board: 2, playerId: '7', playerName: 'Wesley So', playerTitle: 'GM', playerNationality: 'USA', playerRating: 2767 },
          { board: 3, playerId: '9', playerName: 'Shakhriyar Mamedyarov', playerTitle: 'GM', playerNationality: 'AZE', playerRating: 2762 },
          { board: 4, playerId: '11', playerName: 'Richard Rapport', playerTitle: 'GM', playerNationality: 'ROU', playerRating: 2732 },
        ],
        away: [
          { board: 1, playerId: 'ext-1', playerName: 'Teimour Radjabov', playerTitle: 'GM', playerNationality: 'AZE', playerRating: 2742 },
          { board: 2, playerId: 'ext-2', playerName: 'Peter Svidler', playerTitle: 'GM', playerNationality: 'RUS', playerRating: 2718 },
          { board: 3, playerId: 'ext-3', playerName: 'David Navara', playerTitle: 'GM', playerNationality: 'CZE', playerRating: 2706 },
          { board: 4, playerId: 'ext-4', playerName: 'Boris Gelfand', playerTitle: 'GM', playerNationality: 'ISR', playerRating: 2694 },
        ],
      },
      rounds: [
        {
          roundNumber: 1,
          homeRoundScore: 2,
          awayRoundScore: 2,
          results: [
            { board: 1, result: 'WIN', homePlayerId: '2', homePlayerName: 'Hou Yifan', homePlayerTitle: 'GM', awayPlayerId: 'ext-1', awayPlayerName: 'Teimour Radjabov', awayPlayerTitle: 'GM', homeScore: 1, awayScore: 0 },
            { board: 2, result: 'LOSS', homePlayerId: '7', homePlayerName: 'Wesley So', homePlayerTitle: 'GM', awayPlayerId: 'ext-2', awayPlayerName: 'Peter Svidler', awayPlayerTitle: 'GM', homeScore: 0, awayScore: 1 },
            { board: 3, result: 'DRAW', homePlayerId: '9', homePlayerName: 'Shakhriyar Mamedyarov', homePlayerTitle: 'GM', awayPlayerId: 'ext-3', awayPlayerName: 'David Navara', awayPlayerTitle: 'GM', homeScore: 0.5, awayScore: 0.5 },
            { board: 4, result: 'DRAW', homePlayerId: '11', homePlayerName: 'Richard Rapport', homePlayerTitle: 'GM', awayPlayerId: 'ext-4', awayPlayerName: 'Boris Gelfand', awayPlayerTitle: 'GM', homeScore: 0.5, awayScore: 0.5 },
          ],
        },
        {
          roundNumber: 2,
          homeRoundScore: 2,
          awayRoundScore: 2,
          results: [
            { board: 1, result: 'DRAW', homePlayerId: '2', homePlayerName: 'Hou Yifan', homePlayerTitle: 'GM', awayPlayerId: 'ext-1', awayPlayerName: 'Teimour Radjabov', awayPlayerTitle: 'GM', homeScore: 0.5, awayScore: 0.5 },
            { board: 2, result: 'WIN', homePlayerId: '7', homePlayerName: 'Wesley So', homePlayerTitle: 'GM', awayPlayerId: 'ext-2', awayPlayerName: 'Peter Svidler', awayPlayerTitle: 'GM', homeScore: 1, awayScore: 0 },
            { board: 3, result: 'WIN', homePlayerId: '9', homePlayerName: 'Shakhriyar Mamedyarov', homePlayerTitle: 'GM', awayPlayerId: 'ext-3', awayPlayerName: 'David Navara', awayPlayerTitle: 'GM', homeScore: 1, awayScore: 0 },
            { board: 4, result: 'LOSS', homePlayerId: '11', homePlayerName: 'Richard Rapport', homePlayerTitle: 'GM', awayPlayerId: 'ext-4', awayPlayerName: 'Boris Gelfand', awayPlayerTitle: 'GM', homeScore: 0, awayScore: 1 },
          ],
        },
      ],
      mvp: {
        playerId: '2', playerName: 'Hou Yifan', playerTitle: 'GM', playerNationality: 'CHN', playerRating: 2758,
        reason: 'Win in Round 1 and fighting draw in Round 2 on top board', score: 1.5, performance: 2810,
      },
      postMatchStats: {
        homeTeamScore: 4, awayTeamScore: 4, totalGames: 8, homeWins: 2, awayWins: 2, draws: 4,
        highestPerformance: { playerName: 'Hou Yifan', performance: 2810 },
        avgPerformanceHome: 2770, avgPerformanceAway: 2740,
      },
      createdAt: new Date('2025-03-22T10:00:00Z'),
      updatedAt: new Date('2025-03-28T15:00:00Z'),
    },
  ]

  async findAll(): Promise<MatchPreview[]> {
    return this.mockMatches.map(({ id, date, venue, status, homeTeam, awayTeam, homeScore, awayScore }) => ({
      id, date, venue, status, homeTeam, awayTeam, homeScore, awayScore,
    }))
  }

  async findOne(id: string): Promise<MatchDetail> {
    const match = this.mockMatches.find((m) => m.id === id)
    if (!match) throw new NotFoundException(`Match ${id} not found`)
    return match
  }

  async findUpcoming(): Promise<MatchPreview[]> {
    const all = await this.findAll()
    return all.filter((m) => m.status === 'UPCOMING' || m.status === 'LIVE')
  }

  async findCompleted(): Promise<MatchPreview[]> {
    const all = await this.findAll()
    return all.filter((m) => m.status === 'COMPLETED')
  }
}
