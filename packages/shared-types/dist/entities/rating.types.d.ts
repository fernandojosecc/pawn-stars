export declare enum RatingProvider {
    LICHESS_CLASSICAL = "lichess_classical",
    LICHESS_RAPID = "lichess_rapid",
    LICHESS_BLITZ = "lichess_blitz",
    LICHESS_BULLET = "lichess_bullet",
    FIDE = "fide"
}
export interface RatingSnapshot {
    id: string;
    playerId: string;
    provider: RatingProvider;
    rating: number;
    /** Number of rated games in this modality (not available for FIDE) */
    games?: number;
    capturedAt: Date;
}
export interface RatingImportResult {
    playerId: string;
    playerHandle: string;
    snapshots: RatingSnapshot[];
    /** True when at least one provider returned a rating */
    success: boolean;
    errors: string[];
}
export interface BatchImportResult {
    startedAt: Date;
    finishedAt: Date;
    totalPlayers: number;
    succeeded: number;
    failed: number;
    results: RatingImportResult[];
}
//# sourceMappingURL=rating.types.d.ts.map