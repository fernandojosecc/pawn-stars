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

export interface LineupSlot {
  id: string;
  matchId: string;
  playerId: string;
  board: number;
  side: 'home' | 'away';
}

export interface MatchPreview {
  id: string;
  date: Date;
  venue?: string;
  status: MatchStatus;
  homeTeam: {
    id: string;
    name: string;
    shortName?: string;
    logo?: string;
  };
  awayTeam: {
    id: string;
    name: string;
    shortName?: string;
    logo?: string;
  };
  homeScore?: number;
  awayScore?: number;
}
