export interface OpeningStats {
  name: string;
  count: number;
  wins: number;
  draws: number;
  losses: number;
  winRate: number;
}

export interface StatsSnapshot {
  id: string;
  playerId: string;
  tournamentId: string;
  seasonId: string;
  gamesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  winRate: number;
  performanceRating: number;
  averageOpponentRating: number;
  openingsPlayed: {
    asWhite: OpeningStats[];
    asBlack: OpeningStats[];
  };
  capturedAt: Date;
}

export interface SeasonStats {
  seasonId: string;
  seasonName: string;
  playerId: string;
  tournamentsPlayed: number;
  totalGamesPlayed: number;
  totalWins: number;
  totalDraws: number;
  totalLosses: number;
  averageWinRate: number;
  averagePerformanceRating: number;
  bestPerformanceRating: number;
  snapshots: StatsSnapshot[];
}

export interface CaptureSnapshotDto {
  playerId: string;
  tournamentId: string;
}
