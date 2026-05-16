export type LiveEventType = 'round_update' | 'move_played' | 'result_posted' | 'standings_update' | 'coverage_message' | 'viewer_count';
export interface LiveEvent {
    id: string;
    type: LiveEventType;
    matchId: string;
    timestamp: string;
    payload: Record<string, unknown>;
}
export interface CoverageMessage {
    id: string;
    matchId: string;
    text: string;
    author: string;
    timestamp: string;
}
export interface LiveStandingRow {
    playerId: string;
    playerName: string;
    points: number;
    gamesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
}
export interface LiveRoundResult {
    roundNumber: number;
    whitePlayerName: string;
    blackPlayerName: string;
    result: '1-0' | '0-1' | '1/2-1/2' | '*';
    moves?: number;
}
export interface LiveMatchState {
    matchId: string;
    tournamentName: string;
    roundLabel: string;
    currentRound: number;
    totalRounds: number;
    status: 'waiting' | 'live' | 'finished';
    viewers: number;
    standings: LiveStandingRow[];
    roundResults: LiveRoundResult[];
    coverageFeed: CoverageMessage[];
    startedAt: string;
    updatedAt: string;
}
//# sourceMappingURL=live-coverage.types.d.ts.map