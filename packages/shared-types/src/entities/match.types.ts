export interface Match {
  id: string;
  date: Date;
  venue?: string;
  status: MatchStatus;
  homeTeamId: string;
  awayTeamId: string;
  seasonId?: string;
  tournamentId?: string;
  homeScore?: number;
  awayScore?: number;
  mvpPlayerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type MatchStatus =
  | 'UPCOMING'
  | 'LIVE'
  | 'COMPLETED'
  | 'POSTPONED'
  | 'CANCELLED';

export type MatchResultOutcome = 'WIN' | 'LOSS' | 'DRAW' | 'UNFINISHED';

export interface MatchTeam {
  id: string;
  name: string;
  shortName?: string;
  logoUrl?: string;
}

export interface LineupSlot {
  id: string;
  matchId: string;
  playerId: string;
  board: number;
  side: 'home' | 'away';
}

export interface MatchLineupEntry {
  board: number;
  playerId: string;
  playerName: string;
  playerTitle?: string;
  playerNationality?: string;
  playerPhotoUrl?: string;
  playerRating?: number;
}

export interface MatchLineup {
  home: MatchLineupEntry[];
  away: MatchLineupEntry[];
}

export interface RoundResult {
  board: number;
  homePlayerId: string;
  homePlayerName: string;
  homePlayerTitle?: string;
  awayPlayerId: string;
  awayPlayerName: string;
  awayPlayerTitle?: string;
  result: MatchResultOutcome | null;
  homeScore: number;
  awayScore: number;
}

export interface MatchRound {
  roundNumber: number;
  results: RoundResult[];
  homeRoundScore: number;
  awayRoundScore: number;
}

export interface MatchMVP {
  playerId: string;
  playerName: string;
  playerTitle?: string;
  playerNationality?: string;
  playerPhotoUrl?: string;
  playerRating?: number;
  reason?: string;
  score: number;
  performance: number;
}

export interface PostMatchStats {
  homeTeamScore: number;
  awayTeamScore: number;
  totalGames: number;
  homeWins: number;
  awayWins: number;
  draws: number;
  highestPerformance?: { playerName: string; performance: number };
  avgPerformanceHome: number;
  avgPerformanceAway: number;
}

export interface MatchDetail {
  id: string;
  date: Date;
  venue?: string;
  status: MatchStatus;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  homeScore?: number;
  awayScore?: number;
  seasonId?: string;
  tournamentId?: string;
  lineup: MatchLineup;
  rounds: MatchRound[];
  mvp?: MatchMVP;
  postMatchStats?: PostMatchStats;
  createdAt: Date;
  updatedAt: Date;
}

export interface MatchPreview {
  id: string;
  date: Date;
  venue?: string;
  status: MatchStatus;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  homeScore?: number;
  awayScore?: number;
}
