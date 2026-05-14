import type { ScoutingPlayer, Shortlist } from '@pawn-stars/shared-types';

export const mockScoutingPlayers: ScoutingPlayer[] = [
  {
    id: 'sp-1', slug: 'arjun-erigaisi', firstName: 'Arjun', lastName: 'Erigaisi',
    nationality: 'IND', title: 'GM', age: 21, active: true,
    ratings: { classical: 2763, rapid: 2755, blitz: 2830 },
    seasonStats: { gamesPlayed: 28, wins: 20, draws: 5, losses: 3, winRate: 71.4, performanceRating: 2801 },
    topOpenings: { asWhite: 'Catalan', asBlack: "Petroff's Defense" },
  },
  {
    id: 'sp-2', slug: 'nodirbek-abdusattorov', firstName: 'Nodirbek', lastName: 'Abdusattorov',
    nationality: 'UZB', title: 'GM', age: 20, active: true,
    ratings: { classical: 2747, rapid: 2781, blitz: 2796 },
    seasonStats: { gamesPlayed: 32, wins: 22, draws: 8, losses: 2, winRate: 68.8, performanceRating: 2776 },
    topOpenings: { asWhite: 'Italian Game', asBlack: 'Sicilian Najdorf' },
  },
  {
    id: 'sp-3', slug: 'praggnanandhaa', firstName: 'Rameshbabu', lastName: 'Praggnanandhaa',
    nationality: 'IND', title: 'GM', age: 18, active: true,
    ratings: { classical: 2747, rapid: 2735, blitz: 2768 },
    seasonStats: { gamesPlayed: 30, wins: 20, draws: 7, losses: 3, winRate: 66.7, performanceRating: 2762 },
    topOpenings: { asWhite: 'Ruy Lopez', asBlack: "King's Indian" },
  },
  {
    id: 'sp-4', slug: 'vincent-keymer', firstName: 'Vincent', lastName: 'Keymer',
    nationality: 'GER', title: 'GM', age: 20, active: true,
    ratings: { classical: 2720, rapid: 2706, blitz: 2728 },
    seasonStats: { gamesPlayed: 26, wins: 17, draws: 6, losses: 3, winRate: 65.4, performanceRating: 2745 },
    topOpenings: { asWhite: 'Nimzo-Indian (reversed)', asBlack: 'Sicilian Kan' },
  },
  {
    id: 'sp-5', slug: 'javokhir-sindarov', firstName: 'Javokhir', lastName: 'Sindarov',
    nationality: 'UZB', title: 'GM', age: 17, active: true,
    ratings: { classical: 2682, rapid: 2690, blitz: 2718 },
    seasonStats: { gamesPlayed: 22, wins: 14, draws: 6, losses: 2, winRate: 63.6, performanceRating: 2705 },
    topOpenings: { asWhite: 'Vienna Game', asBlack: 'Caro-Kann' },
  },
  {
    id: 'sp-6', slug: 'nihal-sarin', firstName: 'Nihal', lastName: 'Sarin',
    nationality: 'IND', title: 'GM', age: 20, active: true,
    ratings: { classical: 2677, rapid: 2710, blitz: 2762 },
    seasonStats: { gamesPlayed: 24, wins: 15, draws: 5, losses: 4, winRate: 62.5, performanceRating: 2691 },
    topOpenings: { asWhite: 'London System', asBlack: 'Sicilian Sveshnikov' },
  },
  {
    id: 'sp-7', slug: 'andrey-esipenko', firstName: 'Andrey', lastName: 'Esipenko',
    nationality: 'RUS', title: 'GM', age: 22, active: true,
    ratings: { classical: 2662, rapid: 2643, blitz: 2685 },
    seasonStats: { gamesPlayed: 20, wins: 12, draws: 5, losses: 3, winRate: 60.0, performanceRating: 2680 },
    topOpenings: { asWhite: 'Catalan', asBlack: 'QGD Classical' },
  },
  {
    id: 'sp-8', slug: 'volodar-murzin', firstName: 'Volodar', lastName: 'Murzin',
    nationality: 'RUS', title: 'GM', age: 18, active: true,
    ratings: { classical: 2651, rapid: 2660, blitz: 2693 },
    seasonStats: { gamesPlayed: 18, wins: 10, draws: 4, losses: 4, winRate: 55.6, performanceRating: 2668 },
    topOpenings: { asWhite: "King's Indian Attack", asBlack: 'Sicilian Dragon' },
  },
  {
    id: 'sp-9', slug: 'bibisara-assaubayeva', firstName: 'Bibisara', lastName: 'Assaubayeva',
    nationality: 'KAZ', title: 'WGM', age: 22, active: true,
    ratings: { classical: 2435, rapid: 2460, blitz: 2510 },
    seasonStats: { gamesPlayed: 28, wins: 17, draws: 6, losses: 5, winRate: 60.7, performanceRating: 2448 },
    topOpenings: { asWhite: 'London System', asBlack: 'French Defense' },
  },
  {
    id: 'sp-10', slug: 'sara-khadem', firstName: 'Sara', lastName: 'Khadem',
    nationality: 'IRI', title: 'WGM', age: 25, active: false,
    ratings: { classical: 2403, rapid: 2378, blitz: 2392 },
    seasonStats: { gamesPlayed: 20, wins: 11, draws: 5, losses: 4, winRate: 55.0, performanceRating: 2419 },
    topOpenings: { asWhite: "Queen's Gambit", asBlack: 'Nimzo-Indian' },
  },
];

export const mockShortlists: Shortlist[] = [
  {
    id: 'sl-1',
    name: 'Young Prodigies',
    description: 'Under-21 players with high performance trajectory',
    createdAt: new Date('2026-04-10'),
    updatedAt: new Date('2026-05-05'),
    players: [
      { id: 'slp-1', playerId: 'sp-2', player: mockScoutingPlayers[1]!, notes: 'Exceptional rapid rating. Strong Sicilian preparation.', addedAt: new Date('2026-04-10') },
      { id: 'slp-2', playerId: 'sp-3', player: mockScoutingPlayers[2]!, notes: 'Beat several 2700+ players this season. Watch his endgame technique.', addedAt: new Date('2026-04-12') },
      { id: 'slp-3', playerId: 'sp-4', player: mockScoutingPlayers[3]!, notes: 'Solid positional player. May suit Board 3 role.', addedAt: new Date('2026-04-20') },
      { id: 'slp-4', playerId: 'sp-5', player: mockScoutingPlayers[4]!, notes: 'Youngest on the list. Needs more top-level matches.', addedAt: new Date('2026-05-05') },
    ],
  },
  {
    id: 'sl-2',
    name: 'Board 2–3 Candidates',
    description: 'Experienced players for Board 2 or 3 consideration',
    createdAt: new Date('2026-05-01'),
    updatedAt: new Date('2026-05-10'),
    players: [
      { id: 'slp-5', playerId: 'sp-1', player: mockScoutingPlayers[0]!, notes: 'Best blitz rating in this cohort. Very aggressive style.', addedAt: new Date('2026-05-01') },
      { id: 'slp-6', playerId: 'sp-7', player: mockScoutingPlayers[6]!, notes: 'Classical style, good for slow time controls.', addedAt: new Date('2026-05-08') },
      { id: 'slp-7', playerId: 'sp-8', player: mockScoutingPlayers[7]!, notes: 'Needs consistency but has shown tactical brilliance.', addedAt: new Date('2026-05-10') },
    ],
  },
];
