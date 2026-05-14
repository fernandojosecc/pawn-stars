import type { PlayerCard, TournamentCard, NewsPost, Application } from '@pawn-stars/shared-types';

export const mockAdminPlayers: PlayerCard[] = [
  { id: '1', slug: 'magnus-carlsen', firstName: 'Magnus', lastName: 'Carlsen', nationality: 'NOR', title: 'GM', currentRating: 2830, active: true },
  { id: '2', slug: 'hou-yifan', firstName: 'Hou', lastName: 'Yifan', nationality: 'CHN', title: 'GM', currentRating: 2758, active: true },
  { id: '3', slug: 'fabiano-caruana', firstName: 'Fabiano', lastName: 'Caruana', nationality: 'USA', title: 'GM', currentRating: 2820, active: true },
  { id: '4', slug: 'ding-liren', firstName: 'Ding', lastName: 'Liren', nationality: 'CHN', title: 'GM', currentRating: 2791, active: true },
  { id: '5', slug: 'ian-nepomniachtchi', firstName: 'Ian', lastName: 'Nepomniachtchi', nationality: 'RUS', title: 'GM', currentRating: 2793, active: true },
  { id: '6', slug: 'alireza-firouzja', firstName: 'Alireza', lastName: 'Firouzja', nationality: 'FRA', title: 'GM', currentRating: 2793, active: true },
  { id: '7', slug: 'hikaru-nakamura', firstName: 'Hikaru', lastName: 'Nakamura', nationality: 'USA', title: 'GM', currentRating: 2778, active: true },
  { id: '8', slug: 'anish-giri', firstName: 'Anish', lastName: 'Giri', nationality: 'NED', title: 'GM', currentRating: 2780, active: true },
  { id: '9', slug: 'viswanathan-anand', firstName: 'Viswanathan', lastName: 'Anand', nationality: 'IND', title: 'GM', currentRating: 2754, active: false },
  { id: '10', slug: 'judit-polgar', firstName: 'Judit', lastName: 'Polgar', nationality: 'HUN', title: 'GM', currentRating: 2735, active: false },
];

export const mockAdminTournaments: TournamentCard[] = [
  { id: '1', slug: 'spring-open-2026', name: 'Spring Open 2026', format: 'Swiss', status: 'ONGOING', startDate: new Date('2026-05-01'), endDate: new Date('2026-05-20'), location: 'Madrid' },
  { id: '2', slug: 'club-championship-2026', name: 'Club Championship 2026', format: 'Round-Robin', status: 'ONGOING', startDate: new Date('2026-04-15'), endDate: new Date('2026-06-01'), location: 'Online' },
  { id: '3', slug: 'summer-rapid-2026', name: 'Summer Rapid 2026', format: 'Swiss', status: 'UPCOMING', startDate: new Date('2026-07-10'), location: 'Barcelona' },
  { id: '4', slug: 'autumn-blitz-2025', name: 'Autumn Blitz 2025', format: 'Knockout', status: 'COMPLETED', startDate: new Date('2025-10-05'), endDate: new Date('2025-10-07'), location: 'Valencia' },
  { id: '5', slug: 'winter-classic-2025', name: 'Winter Classic 2025', format: 'Swiss', status: 'COMPLETED', startDate: new Date('2025-12-01'), endDate: new Date('2025-12-15'), location: 'Madrid' },
];

export const mockAdminNews: NewsPost[] = [
  { id: '1', slug: 'spring-open-kicks-off', title: 'Spring Open 2026 Kicks Off with Record Entry', tags: ['ANNOUNCEMENTS', 'TOURNAMENTS'], publishedAt: new Date('2026-05-01'), createdAt: new Date('2026-04-30'), updatedAt: new Date('2026-05-01') },
  { id: '2', slug: 'carlsen-leads-round-3', title: 'Carlsen Leads After Round 3', tags: ['MATCH_REPORTS'], publishedAt: new Date('2026-05-05'), createdAt: new Date('2026-05-05'), updatedAt: new Date('2026-05-05') },
  { id: '3', slug: 'firouzja-interview', title: 'Firouzja Talks Preparation and Goals for 2026', tags: ['INTERVIEWS'], publishedAt: new Date('2026-04-20'), createdAt: new Date('2026-04-19'), updatedAt: new Date('2026-04-20') },
  { id: '4', slug: 'new-sponsor-announcement', title: 'Pawn Stars Welcome New Title Sponsor', tags: ['ANNOUNCEMENTS'], publishedAt: new Date('2026-03-15'), createdAt: new Date('2026-03-14'), updatedAt: new Date('2026-03-15') },
  { id: '5', slug: 'season-review-2025', title: '2025 Season in Review', tags: ['EDITORIAL'], publishedAt: new Date('2026-01-10'), createdAt: new Date('2026-01-09'), updatedAt: new Date('2026-01-10') },
  { id: '6', slug: 'summer-rapid-preview', title: 'Summer Rapid 2026 — What to Expect', tags: ['ANNOUNCEMENTS', 'TOURNAMENTS'], createdAt: new Date('2026-05-12'), updatedAt: new Date('2026-05-12') },
  { id: '7', slug: 'tactical-column-may', title: 'Tactical Column: May Highlights', tags: ['EDITORIAL'], createdAt: new Date('2026-05-10'), updatedAt: new Date('2026-05-10') },
];

export const mockAdminApplications: Application[] = [
  { id: '1', firstName: 'Carlos', lastName: 'Mendoza', email: 'carlos@example.com', fideId: '3400012', lichessHandle: 'cmendoza_chess', rating: 2210, message: 'I have been competing in national tournaments for 5 years.', status: 'pending', createdAt: new Date('2026-05-10') },
  { id: '2', firstName: 'Sophie', lastName: 'Laurent', email: 'sophie@example.com', lichessHandle: 'slaurent', rating: 1980, message: 'Looking to take my game to the next level.', status: 'pending', createdAt: new Date('2026-05-08') },
  { id: '3', firstName: 'Yuki', lastName: 'Tanaka', email: 'yuki@example.com', fideId: '7654321', lichessHandle: 'ytanaka99', rating: 2350, status: 'reviewing', reviewedBy: 'admin@pawnstars.com', createdAt: new Date('2026-05-02') },
  { id: '4', firstName: 'Arjun', lastName: 'Sharma', email: 'arjun@example.com', fideId: '5001234', rating: 2180, status: 'accepted', reviewedBy: 'admin@pawnstars.com', reviewedAt: new Date('2026-04-28'), createdAt: new Date('2026-04-20') },
  { id: '5', firstName: 'Lena', lastName: 'Müller', email: 'lena@example.com', lichessHandle: 'lenamueller', rating: 1750, message: 'Enthusiastic club player hoping to join a competitive team.', status: 'rejected', reviewedBy: 'admin@pawnstars.com', reviewedAt: new Date('2026-04-15'), createdAt: new Date('2026-04-10') },
];

export const mockKpis = {
  totalPlayers: 10,
  activeTournaments: 2,
  newsPublished: 5,
  pendingApplications: 2,
  lastRatingsImport: '2026-05-13T02:30:00Z',
};
