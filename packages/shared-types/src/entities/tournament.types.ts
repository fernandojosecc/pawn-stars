export interface Tournament {
  id: string;
  slug: string;
  name: string;
  description?: string;
  format: TournamentFormat;
  status: TournamentStatus;
  startDate: Date;
  endDate?: Date;
  location?: string;
  seasonId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TournamentFormat = 
  | 'Swiss'
  | 'Round-Robin'
  | 'Knockout'
  | 'League';

export type TournamentStatus = 
  | 'UPCOMING'
  | 'ONGOING'
  | 'COMPLETED'
  | 'CANCELLED';

export interface TournamentCard {
  id: string;
  slug: string;
  name: string;
  format: TournamentFormat;
  status: TournamentStatus;
  startDate: Date;
  endDate?: Date;
  location?: string;
}

export interface Round {
  id: string;
  number: number;
  tournamentId: string;
  status: RoundStatus;
  completedAt?: Date;
  createdAt: Date;
}

export type RoundStatus = 
  | 'PENDING'
  | 'ONGOING'
  | 'COMPLETED';

export interface Pairing {
  id: string;
  roundId: string;
  whiteId: string;
  blackId: string;
  result?: GameResult;
  board?: number;
  createdAt: Date;
}

export type GameResult =
  | '1-0'
  | '0-1'
  | '1/2-1/2'
  | '*'; // unfinished/forfeit

export interface TournamentParticipant {
  playerId: string
  playerName: string
  playerTitle?: string
  playerNationality?: string
  rating?: number
}

export interface TournamentPairingDetail {
  board: number
  white: TournamentParticipant
  black: TournamentParticipant
  result?: GameResult
}

export interface TournamentRoundDetail {
  roundNumber: number
  status: RoundStatus
  date?: string
  pairings: TournamentPairingDetail[]
}

export interface TournamentStandingEntry {
  rank: number
  player: TournamentParticipant
  score: number
  tiebreak?: number
  wins: number
  draws: number
  losses: number
  gamesPlayed: number
}

export interface TimelineEvent {
  roundNumber?: number
  date: string
  title: string
  description?: string
  type: 'round_start' | 'round_end' | 'highlight' | 'milestone'
}

export interface TournamentDetail extends TournamentCard {
  description?: string
  playerCount: number
  rounds: TournamentRoundDetail[]
  standings: TournamentStandingEntry[]
  timeline: TimelineEvent[]
}
