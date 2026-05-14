import type { LiveMatchState } from '@pawn-stars/shared-types';

export const mockLiveMatches: LiveMatchState[] = [
  {
    matchId: 'demo-2026-round1',
    tournamentName: 'Pawn Stars Open 2026',
    roundLabel: 'Round 1',
    currentRound: 1,
    totalRounds: 3,
    status: 'live',
    viewers: 47,
    standings: [
      { playerId: 'p1', playerName: 'Magnus Carlsen', points: 0.5, gamesPlayed: 1, wins: 0, draws: 1, losses: 0 },
      { playerId: 'p2', playerName: 'Fabiano Caruana', points: 0.5, gamesPlayed: 1, wins: 0, draws: 1, losses: 0 },
      { playerId: 'p3', playerName: 'Hikaru Nakamura', points: 0, gamesPlayed: 0, wins: 0, draws: 0, losses: 0 },
      { playerId: 'p4', playerName: 'Alireza Firouzja', points: 0, gamesPlayed: 0, wins: 0, draws: 0, losses: 0 },
    ],
    roundResults: [
      { roundNumber: 1, whitePlayerName: 'Magnus Carlsen', blackPlayerName: 'Fabiano Caruana', result: '1/2-1/2', moves: 31 },
    ],
    coverageFeed: [
      {
        id: 'msg-3',
        matchId: 'demo-2026-round1',
        text: 'Carlsen offers a draw, Caruana accepts after perpetual check. Solid half-point for both.',
        author: 'GM Commentator',
        timestamp: new Date(Date.now() - 2 * 60_000).toISOString(),
      },
      {
        id: 'msg-2',
        matchId: 'demo-2026-round1',
        text: 'Nakamura-Firouzja still ongoing. Sharp Sicilian Najdorf. Firouzja with a dangerous kingside attack.',
        author: 'GM Commentator',
        timestamp: new Date(Date.now() - 8 * 60_000).toISOString(),
      },
      {
        id: 'msg-1',
        matchId: 'demo-2026-round1',
        text: 'Welcome to live coverage of the Pawn Stars Open 2026! Round 1 is underway.',
        author: 'Chief Arbiter',
        timestamp: new Date(Date.now() - 20 * 60_000).toISOString(),
      },
    ],
    startedAt: new Date(Date.now() - 25 * 60_000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60_000).toISOString(),
  },
  {
    matchId: 'demo-2026-blitz',
    tournamentName: 'Pawn Stars Blitz Cup',
    roundLabel: 'Semi-final',
    currentRound: 4,
    totalRounds: 4,
    status: 'live',
    viewers: 23,
    standings: [
      { playerId: 'p5', playerName: 'Nodirbek Abdusattorov', points: 2.5, gamesPlayed: 3, wins: 2, draws: 1, losses: 0 },
      { playerId: 'p6', playerName: 'Gukesh D', points: 1.5, gamesPlayed: 3, wins: 1, draws: 1, losses: 1 },
    ],
    roundResults: [
      { roundNumber: 1, whitePlayerName: 'Nodirbek Abdusattorov', blackPlayerName: 'Gukesh D', result: '1-0', moves: 28 },
      { roundNumber: 2, whitePlayerName: 'Gukesh D', blackPlayerName: 'Nodirbek Abdusattorov', result: '1/2-1/2', moves: 44 },
      { roundNumber: 3, whitePlayerName: 'Nodirbek Abdusattorov', blackPlayerName: 'Gukesh D', result: '1-0', moves: 35 },
    ],
    coverageFeed: [
      {
        id: 'blitz-msg-2',
        matchId: 'demo-2026-blitz',
        text: 'Abdusattorov leads 2.5-0.5. Final game must be decisive for Gukesh.',
        author: 'GM Commentator',
        timestamp: new Date(Date.now() - 5 * 60_000).toISOString(),
      },
      {
        id: 'blitz-msg-1',
        matchId: 'demo-2026-blitz',
        text: 'Blitz semi-final underway. Fast time control, exciting chess expected.',
        author: 'Chief Arbiter',
        timestamp: new Date(Date.now() - 30 * 60_000).toISOString(),
      },
    ],
    startedAt: new Date(Date.now() - 35 * 60_000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60_000).toISOString(),
  },
];
