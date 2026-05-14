import type { SeasonStats, StatsSnapshot } from '@pawn-stars/shared-types';
import type { ScheduleEvent } from '@pawn-stars/shared-types';
import type { PortalNotification } from '@pawn-stars/shared-types';

// ── Logged-in player persona ─────────────────────────────────────────────────

export const mockPortalPlayer = {
  id: '6',
  slug: 'alireza-firouzja',
  firstName: 'Alireza',
  lastName: 'Firouzja',
  title: 'GM' as const,
  nationality: 'FRA',
  currentRating: 2793,
  lichessHandle: 'alireza2003',
  fideId: '12573981',
  photoUrl: '/players/alireza.jpg',
};

// ── Dashboard ────────────────────────────────────────────────────────────────

export const mockNextMatch = {
  id: 'match-club-r6',
  opponent: 'Magnus Carlsen',
  opponentTitle: 'GM' as const,
  event: 'Club Championship 2026 — Round 6',
  date: new Date('2026-05-22T15:00:00Z'),
  board: 1,
  side: 'White' as const,
  venue: 'Madrid Chess Club',
};

export const mockRecentForm: Array<{ result: 'W' | 'D' | 'L'; opponent: string; event: string; date: Date }> = [
  { result: 'W', opponent: 'Hikaru Nakamura',   event: 'Club Championship R5', date: new Date('2026-05-08') },
  { result: 'W', opponent: 'Anish Giri',         event: 'Club Championship R4', date: new Date('2026-05-01') },
  { result: 'D', opponent: 'Fabiano Caruana',    event: 'Club Championship R3', date: new Date('2026-04-24') },
  { result: 'W', opponent: 'Ding Liren',         event: 'Club Championship R2', date: new Date('2026-04-17') },
  { result: 'L', opponent: 'Ian Nepomniachtchi', event: 'Club Championship R1', date: new Date('2026-04-10') },
];

// ── Stats ────────────────────────────────────────────────────────────────────

export const mockSeasonStats: SeasonStats = {
  seasonId: 'season-2025-26',
  seasonName: '2025-26',
  playerId: '6',
  tournamentsPlayed: 2,
  totalGamesPlayed: 18,
  totalWins: 12,
  totalDraws: 4,
  totalLosses: 2,
  averageWinRate: 66.7,
  averagePerformanceRating: 2869,
  bestPerformanceRating: 2912,
  snapshots: [],
};

export const mockPerformanceHistory: Array<{ tournament: string; performance: number; rating: number }> = [
  { tournament: 'Winter Classic 2025',  performance: 2826, rating: 2780 },
  { tournament: 'Spring Open 2026',     performance: 2912, rating: 2788 },
  { tournament: 'Club Championship',    performance: 2869, rating: 2793 },
];

export const mockOpeningStats = {
  asWhite: [
    { name: 'Catalan',         count: 8, wins: 6, draws: 1, losses: 1, winRate: 75 },
    { name: "Queen's Gambit",  count: 4, wins: 2, draws: 1, losses: 1, winRate: 50 },
    { name: 'Italian Game',    count: 3, wins: 2, draws: 1, losses: 0, winRate: 67 },
  ],
  asBlack: [
    { name: 'Sicilian Defense', count: 8, wins: 5, draws: 2, losses: 1, winRate: 63 },
    { name: "King's Indian",    count: 4, wins: 2, draws: 0, losses: 2, winRate: 50 },
    { name: 'Nimzo-Indian',     count: 3, wins: 2, draws: 1, losses: 0, winRate: 67 },
  ],
};

// ── Schedule ─────────────────────────────────────────────────────────────────

export const mockPortalSchedule: ScheduleEvent[] = [
  {
    id: 'se-1',
    type: 'training',
    title: 'Team Training Session',
    subtitle: 'Opening preparation with coach',
    date: '2026-05-16',
    startTime: '10:00',
    endTime: '12:00',
    location: 'Madrid Chess Club',
    status: 'upcoming',
  },
  {
    id: 'se-2',
    type: 'match',
    title: 'Club Championship R6 — vs. M. Carlsen',
    subtitle: 'Board 1 — White pieces',
    date: '2026-05-22',
    startTime: '15:00',
    location: 'Madrid Chess Club',
    url: '/matches/club-championship-r6',
    status: 'upcoming',
  },
  {
    id: 'se-3',
    type: 'match',
    title: 'Club Championship R7',
    subtitle: 'Opponent TBD',
    date: '2026-05-29',
    startTime: '15:00',
    location: 'Madrid Chess Club',
    status: 'upcoming',
  },
  {
    id: 'se-4',
    type: 'tournament',
    title: 'Summer Rapid 2026',
    subtitle: '9-round Swiss, all-play format',
    date: '2026-07-10',
    endTime: '2026-07-14',
    location: 'Barcelona',
    url: '/tournaments/summer-rapid-2026',
    status: 'upcoming',
  },
  {
    id: 'se-5',
    type: 'training',
    title: 'Pre-Tournament Camp',
    subtitle: 'Intensive 3-day preparation',
    date: '2026-07-07',
    location: 'Madrid Chess Club',
    status: 'upcoming',
  },
];

// ── Study material ────────────────────────────────────────────────────────────

export type StudyFileCategory = 'openings' | 'endgames' | 'tactics' | 'tournament_prep';
export type StudyFileType = 'pdf' | 'pgn' | 'video';

export interface StudyFile {
  id: string;
  name: string;
  type: StudyFileType;
  category: StudyFileCategory;
  sizeKb: number;
  uploadedAt: Date;
  uploadedBy: string;
}

export const mockStudyFiles: StudyFile[] = [
  { id: 'sf-1', name: 'Catalan Opening Repertoire.pdf',        type: 'pdf', category: 'openings',        sizeKb: 2460, uploadedAt: new Date('2026-05-10'), uploadedBy: 'Coach Petrov' },
  { id: 'sf-2', name: 'Sicilian Dragon Lines.pgn',             type: 'pgn', category: 'openings',        sizeKb: 128,  uploadedAt: new Date('2026-05-08'), uploadedBy: 'Coach Petrov' },
  { id: 'sf-3', name: 'Nimzo-Indian Repertoire.pgn',           type: 'pgn', category: 'openings',        sizeKb: 96,   uploadedAt: new Date('2026-04-22'), uploadedBy: 'Coach Petrov' },
  { id: 'sf-4', name: 'Rook Endings Study.pdf',                type: 'pdf', category: 'endgames',        sizeKb: 3170, uploadedAt: new Date('2026-04-15'), uploadedBy: 'Coach Petrov' },
  { id: 'sf-5', name: 'King and Pawn Endings.pgn',             type: 'pgn', category: 'endgames',        sizeKb: 64,   uploadedAt: new Date('2026-04-10'), uploadedBy: 'Coach Petrov' },
  { id: 'sf-6', name: 'May Tactics Pack.pdf',                  type: 'pdf', category: 'tactics',         sizeKb: 1840, uploadedAt: new Date('2026-05-01'), uploadedBy: 'Coach Petrov' },
  { id: 'sf-7', name: 'Tactical Motifs — Pins & Skewers.pgn',  type: 'pgn', category: 'tactics',         sizeKb: 72,   uploadedAt: new Date('2026-04-28'), uploadedBy: 'Coach Petrov' },
  { id: 'sf-8', name: 'Club Championship Opponent Analysis.pdf', type: 'pdf', category: 'tournament_prep', sizeKb: 5320, uploadedAt: new Date('2026-05-12'), uploadedBy: 'Coach Petrov' },
  { id: 'sf-9', name: 'Summer Rapid Preparation Notes.pdf',    type: 'pdf', category: 'tournament_prep', sizeKb: 2100, uploadedAt: new Date('2026-05-11'), uploadedBy: 'Coach Petrov' },
];

// ── Notifications ─────────────────────────────────────────────────────────────

export const mockPortalNotifications: PortalNotification[] = [
  {
    id: 'pn-1',
    type: 'match_result',
    title: 'Match result: Pawn Stars 3.5 – 2.5 Knights FC',
    body: 'You scored 1.0/1 on Board 1. Great performance!',
    read: false,
    createdAt: new Date('2026-05-08T18:30:00Z'),
  },
  {
    id: 'pn-2',
    type: 'round_complete',
    title: 'Club Championship — Round 5 complete',
    body: 'You won against H. Nakamura with the Catalan. Round 6 is scheduled for May 22.',
    read: false,
    createdAt: new Date('2026-05-08T17:00:00Z'),
  },
  {
    id: 'pn-3',
    type: 'team_announcement',
    title: 'Summer Rapid 2026 — lineup confirmed',
    body: 'You have been confirmed for the Summer Rapid 2026. Preparation camp starts July 7.',
    read: false,
    createdAt: new Date('2026-05-06T09:00:00Z'),
  },
  {
    id: 'pn-4',
    type: 'round_complete',
    title: 'Club Championship — Round 4 complete',
    body: 'You won against A. Giri on Board 1.',
    read: true,
    createdAt: new Date('2026-05-01T17:00:00Z'),
  },
  {
    id: 'pn-5',
    type: 'round_complete',
    title: 'Club Championship — Round 3 complete',
    body: 'Draw against F. Caruana on Board 1.',
    read: true,
    createdAt: new Date('2026-04-24T17:00:00Z'),
  },
  {
    id: 'pn-6',
    type: 'match_result',
    title: 'Match result: Pawn Stars 4.0 – 2.0 Bishops United',
    body: 'You scored 1.0/1 on Board 1 against F. Caruana.',
    read: true,
    createdAt: new Date('2026-04-20T19:00:00Z'),
  },
];
