export interface Team {
    id: string;
    slug: string;
    name: string;
    shortName?: string;
    logo?: string;
    description?: string;
    foundedYear?: number;
    history?: TeamHistory[];
    philosophy?: string;
    values?: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface TeamHistory {
    year: number;
    title: string;
    description: string;
    achievements?: string[];
}
export interface Staff {
    id: string;
    slug: string;
    firstName: string;
    lastName: string;
    role: StaffRole;
    bio?: string;
    photoUrl?: string;
    email?: string;
    phone?: string;
    teamId?: string;
    specialization?: string[];
    joinedAt: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export type StaffRole = 'head_coach' | 'assistant_coach' | 'manager' | 'director' | 'analyst' | 'trainer' | 'psychologist' | 'nutritionist' | 'admin';
export interface StaffCard {
    id: string;
    slug: string;
    firstName: string;
    lastName: string;
    role: StaffRole;
    photoUrl?: string;
    specialization?: string[];
    teamId?: string;
}
export interface TeamPage {
    team: Team;
    staff: Staff[];
}
