import type { PlayerTitle } from './player.types.js';
export type TitleFilter = Exclude<PlayerTitle, null>;
export type ScoutingRatingModality = 'classical' | 'rapid' | 'blitz';
export interface ScoutingPlayerRatings {
    classical: number;
    rapid: number;
    blitz: number;
}
export interface ScoutingPlayerSeasonStats {
    gamesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
    winRate: number;
    performanceRating: number;
}
export interface ScoutingPlayerOpenings {
    asWhite: string;
    asBlack: string;
}
export interface ScoutingPlayer {
    id: string;
    slug: string;
    firstName: string;
    lastName: string;
    nationality: string;
    title?: PlayerTitle;
    age: number;
    active: boolean;
    photoUrl?: string;
    ratings: ScoutingPlayerRatings;
    seasonStats: ScoutingPlayerSeasonStats;
    topOpenings: ScoutingPlayerOpenings;
}
export interface ScoutingFilter {
    query: string;
    minRating: number;
    maxRating: number;
    modality: ScoutingRatingModality;
    titles: TitleFilter[];
    nationality: string;
    minAge: number;
    maxAge: number;
    activeOnly: boolean;
}
export declare const DEFAULT_SCOUTING_FILTER: ScoutingFilter;
export interface ShortlistPlayer {
    id: string;
    playerId: string;
    player: ScoutingPlayer;
    notes: string;
    addedAt: Date;
}
export interface Shortlist {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    players: ShortlistPlayer[];
}
export interface ComparisonResult {
    players: ScoutingPlayer[];
    radarData: Array<{
        axis: string;
        [playerId: string]: string | number;
    }>;
}
//# sourceMappingURL=scouting.types.d.ts.map