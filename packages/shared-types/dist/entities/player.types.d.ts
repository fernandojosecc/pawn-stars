export interface Player {
    id: string;
    slug: string;
    firstName: string;
    lastName: string;
    nationality: string;
    dateOfBirth?: Date;
    bio?: string;
    photoUrl?: string;
    title?: PlayerTitle;
    lichessHandle?: string;
    fideId?: string;
    currentRating?: number;
    active: boolean;
    teamId?: string;
    createdAt: Date;
    updatedAt: Date;
}
export type PlayerTitle = 'GM' | 'IM' | 'FM' | 'CM' | 'WGM' | 'WIM' | 'WFM' | 'WCM' | null;
export interface PlayerCard {
    id: string;
    slug: string;
    firstName: string;
    lastName: string;
    nationality: string;
    photoUrl?: string;
    title?: PlayerTitle;
    currentRating?: number;
    active: boolean;
    rosterPosition?: number;
    badge?: string | null;
}
export interface PlayerFilter {
    title?: PlayerTitle;
    nationality?: string;
    active?: boolean;
    minRating?: number;
    maxRating?: number;
}
//# sourceMappingURL=player.types.d.ts.map