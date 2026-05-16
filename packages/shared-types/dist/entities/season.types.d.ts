export declare enum SeasonStatus {
    UPCOMING = "upcoming",
    ACTIVE = "active",
    COMPLETED = "completed"
}
export interface SeasonTopPerformer {
    playerId: string;
    playerName: string;
    playerTitle?: string;
    playerNationality: string;
    averagePerformanceRating: number;
    gamesPlayed: number;
    winRate: number;
}
export interface SeasonTournamentRecord {
    tournamentId: string;
    tournamentName: string;
    tournamentSlug: string;
    format: string;
    status: string;
    location?: string;
    startDate: Date;
    endDate?: Date;
    teamFinish?: string;
    gamesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
}
export interface SeasonPlayerPerformance {
    playerId: string;
    playerName: string;
    playerTitle?: string;
    playerNationality: string;
    tournamentsPlayed: number;
    totalGames: number;
    wins: number;
    draws: number;
    losses: number;
    winRate: number;
    averagePerformanceRating: number;
    averageOpponentRating: number;
    bestTournamentFinish: string;
}
export interface SeasonSummary {
    id: string;
    slug: string;
    name: string;
    status: SeasonStatus;
    startDate: Date;
    endDate?: Date;
    tournamentCount: number;
    completedTournamentCount: number;
    totalGames: number;
    wins: number;
    draws: number;
    losses: number;
    winRate: number;
    topPlayer: SeasonTopPerformer;
    teamRatingAverage: number;
}
export interface SeasonDetail extends SeasonSummary {
    description: string;
    tournaments: SeasonTournamentRecord[];
    topPerformers: SeasonPlayerPerformance[];
}
//# sourceMappingURL=season.types.d.ts.map