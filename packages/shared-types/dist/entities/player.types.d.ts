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
}
export interface PlayerFilter {
    title?: PlayerTitle;
    nationality?: string;
    active?: boolean;
    minRating?: number;
    maxRating?: number;
}
