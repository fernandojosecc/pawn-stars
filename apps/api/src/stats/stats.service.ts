import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import type { StatsSnapshot, SeasonStats, OpeningStats, CaptureSnapshotDto } from '@pawn-stars/shared-types';

const SEASON_NAMES: Record<string, string> = {
  'season-2023': '2023',
  'season-2024': '2024-25',
};

const ruyLopez   = (c: number, w: number, d: number, l: number): OpeningStats => ({ name: 'Ruy Lopez',              count: c, wins: w, draws: d, losses: l, winRate: +(w / c).toFixed(2) });
const queens     = (c: number, w: number, d: number, l: number): OpeningStats => ({ name: "Queen's Gambit Declined", count: c, wins: w, draws: d, losses: l, winRate: +(w / c).toFixed(2) });
const catalan    = (c: number, w: number, d: number, l: number): OpeningStats => ({ name: 'Catalan',                 count: c, wins: w, draws: d, losses: l, winRate: +(w / c).toFixed(2) });
const sicilian   = (c: number, w: number, d: number, l: number): OpeningStats => ({ name: 'Sicilian Defense',        count: c, wins: w, draws: d, losses: l, winRate: +(w / c).toFixed(2) });
const kingsIndian = (c: number, w: number, d: number, l: number): OpeningStats => ({ name: "King's Indian",          count: c, wins: w, draws: d, losses: l, winRate: +(w / c).toFixed(2) });
const nimzo      = (c: number, w: number, d: number, l: number): OpeningStats => ({ name: 'Nimzo-Indian',            count: c, wins: w, draws: d, losses: l, winRate: +(w / c).toFixed(2) });
const caro       = (c: number, w: number, d: number, l: number): OpeningStats => ({ name: 'Caro-Kann',               count: c, wins: w, draws: d, losses: l, winRate: +(w / c).toFixed(2) });
const english    = (c: number, w: number, d: number, l: number): OpeningStats => ({ name: 'English Opening',         count: c, wins: w, draws: d, losses: l, winRate: +(w / c).toFixed(2) });
const grunfeld   = (c: number, w: number, d: number, l: number): OpeningStats => ({ name: 'Grünfeld Defense',        count: c, wins: w, draws: d, losses: l, winRate: +(w / c).toFixed(2) });

const MOCK_SNAPSHOTS: StatsSnapshot[] = [
  // ── Carlsen (player 1) ──────────────────────────────────────────
  {
    id: 'snap-001',
    playerId: '1',
    tournamentId: '1',
    seasonId: 'season-2024',
    gamesPlayed: 13,
    wins: 6,
    draws: 6,
    losses: 1,
    winRate: 0.46,
    performanceRating: 2872,
    averageOpponentRating: 2759,
    openingsPlayed: {
      asWhite: [ruyLopez(3, 2, 1, 0), catalan(2, 1, 1, 0), english(1, 1, 0, 0)],
      asBlack: [sicilian(3, 1, 2, 0), kingsIndian(2, 1, 1, 0), nimzo(2, 0, 2, 0)],
    },
    capturedAt: new Date('2024-01-28T22:00:00Z'),
  },
  {
    id: 'snap-002',
    playerId: '1',
    tournamentId: '2',
    seasonId: 'season-2023',
    gamesPlayed: 7,
    wins: 3,
    draws: 4,
    losses: 0,
    winRate: 0.43,
    performanceRating: 2811,
    averageOpponentRating: 2780,
    openingsPlayed: {
      asWhite: [ruyLopez(2, 1, 1, 0), queens(1, 1, 0, 0), catalan(1, 1, 0, 0)],
      asBlack: [sicilian(2, 1, 1, 0), nimzo(1, 0, 1, 0), caro(1, 0, 1, 0)],
    },
    capturedAt: new Date('2023-12-15T22:00:00Z'),
  },
  {
    id: 'snap-003',
    playerId: '1',
    tournamentId: '3',
    seasonId: 'season-2023',
    gamesPlayed: 9,
    wins: 5,
    draws: 3,
    losses: 1,
    winRate: 0.56,
    performanceRating: 2891,
    averageOpponentRating: 2766,
    openingsPlayed: {
      asWhite: [ruyLopez(3, 2, 1, 0), english(2, 1, 1, 0), catalan(1, 1, 0, 0)],
      asBlack: [sicilian(3, 1, 1, 1), kingsIndian(2, 1, 1, 0), grunfeld(1, 1, 0, 0)],
    },
    capturedAt: new Date('2023-09-15T22:00:00Z'),
  },
  {
    id: 'snap-004',
    playerId: '1',
    tournamentId: '4',
    seasonId: 'season-2023',
    gamesPlayed: 14,
    wins: 7,
    draws: 5,
    losses: 2,
    winRate: 0.50,
    performanceRating: 2836,
    averageOpponentRating: 2755,
    openingsPlayed: {
      asWhite: [ruyLopez(4, 2, 1, 1), catalan(2, 2, 0, 0), english(1, 1, 0, 0)],
      asBlack: [sicilian(4, 2, 1, 1), nimzo(2, 1, 1, 0), kingsIndian(1, 1, 0, 0)],
    },
    capturedAt: new Date('2023-05-05T22:00:00Z'),
  },

  // ── Caruana (player 3) ──────────────────────────────────────────
  {
    id: 'snap-005',
    playerId: '3',
    tournamentId: '1',
    seasonId: 'season-2024',
    gamesPlayed: 13,
    wins: 5,
    draws: 7,
    losses: 1,
    winRate: 0.38,
    performanceRating: 2840,
    averageOpponentRating: 2751,
    openingsPlayed: {
      asWhite: [queens(3, 2, 1, 0), catalan(2, 1, 1, 0), english(2, 1, 1, 0)],
      asBlack: [sicilian(3, 1, 2, 0), nimzo(2, 1, 1, 0), grunfeld(2, 0, 2, 0)],
    },
    capturedAt: new Date('2024-01-28T22:00:00Z'),
  },
  {
    id: 'snap-006',
    playerId: '3',
    tournamentId: '2',
    seasonId: 'season-2023',
    gamesPlayed: 7,
    wins: 2,
    draws: 4,
    losses: 1,
    winRate: 0.29,
    performanceRating: 2763,
    averageOpponentRating: 2783,
    openingsPlayed: {
      asWhite: [queens(2, 1, 1, 0), catalan(2, 1, 1, 0), english(1, 0, 0, 1)],
      asBlack: [nimzo(2, 1, 1, 0), sicilian(2, 0, 1, 1), kingsIndian(1, 0, 1, 0)],
    },
    capturedAt: new Date('2023-12-15T22:00:00Z'),
  },
  {
    id: 'snap-007',
    playerId: '3',
    tournamentId: '3',
    seasonId: 'season-2023',
    gamesPlayed: 9,
    wins: 4,
    draws: 4,
    losses: 1,
    winRate: 0.44,
    performanceRating: 2822,
    averageOpponentRating: 2762,
    openingsPlayed: {
      asWhite: [queens(3, 2, 1, 0), catalan(2, 1, 1, 0), english(1, 1, 0, 0)],
      asBlack: [sicilian(3, 1, 2, 0), nimzo(2, 1, 1, 0), grunfeld(1, 0, 1, 0)],
    },
    capturedAt: new Date('2023-09-15T22:00:00Z'),
  },
  {
    id: 'snap-008',
    playerId: '3',
    tournamentId: '4',
    seasonId: 'season-2023',
    gamesPlayed: 14,
    wins: 6,
    draws: 6,
    losses: 2,
    winRate: 0.43,
    performanceRating: 2848,
    averageOpponentRating: 2751,
    openingsPlayed: {
      asWhite: [queens(4, 2, 2, 0), catalan(3, 2, 1, 0), english(2, 1, 1, 0)],
      asBlack: [sicilian(4, 1, 2, 1), nimzo(3, 2, 1, 0), grunfeld(2, 0, 2, 0)],
    },
    capturedAt: new Date('2023-05-05T22:00:00Z'),
  },

  // ── Nakamura (player 10) ─────────────────────────────────────────
  {
    id: 'snap-009',
    playerId: '10',
    tournamentId: '1',
    seasonId: 'season-2024',
    gamesPlayed: 13,
    wins: 5,
    draws: 5,
    losses: 3,
    winRate: 0.38,
    performanceRating: 2798,
    averageOpponentRating: 2748,
    openingsPlayed: {
      asWhite: [ruyLopez(3, 1, 1, 1), english(2, 2, 0, 0), queens(2, 1, 1, 0)],
      asBlack: [kingsIndian(3, 1, 1, 1), sicilian(2, 1, 1, 0), caro(2, 1, 1, 0)],
    },
    capturedAt: new Date('2024-01-28T22:00:00Z'),
  },
  {
    id: 'snap-010',
    playerId: '10',
    tournamentId: '2',
    seasonId: 'season-2023',
    gamesPlayed: 7,
    wins: 3,
    draws: 3,
    losses: 1,
    winRate: 0.43,
    performanceRating: 2809,
    averageOpponentRating: 2774,
    openingsPlayed: {
      asWhite: [english(2, 1, 1, 0), ruyLopez(2, 1, 0, 1), queens(1, 1, 0, 0)],
      asBlack: [kingsIndian(2, 1, 1, 0), sicilian(2, 1, 1, 0), caro(1, 0, 1, 0)],
    },
    capturedAt: new Date('2023-12-15T22:00:00Z'),
  },
  {
    id: 'snap-011',
    playerId: '10',
    tournamentId: '3',
    seasonId: 'season-2023',
    gamesPlayed: 9,
    wins: 3,
    draws: 5,
    losses: 1,
    winRate: 0.33,
    performanceRating: 2779,
    averageOpponentRating: 2760,
    openingsPlayed: {
      asWhite: [english(3, 1, 2, 0), ruyLopez(2, 1, 1, 0), queens(1, 0, 1, 0)],
      asBlack: [kingsIndian(3, 1, 1, 1), sicilian(2, 1, 1, 0), caro(2, 0, 2, 0)],
    },
    capturedAt: new Date('2023-09-15T22:00:00Z'),
  },
  {
    id: 'snap-012',
    playerId: '10',
    tournamentId: '4',
    seasonId: 'season-2023',
    gamesPlayed: 14,
    wins: 5,
    draws: 7,
    losses: 2,
    winRate: 0.36,
    performanceRating: 2792,
    averageOpponentRating: 2749,
    openingsPlayed: {
      asWhite: [english(4, 2, 2, 0), ruyLopez(3, 1, 1, 1), queens(2, 1, 1, 0)],
      asBlack: [kingsIndian(4, 1, 2, 1), sicilian(3, 1, 2, 0), caro(2, 1, 1, 0)],
    },
    capturedAt: new Date('2023-05-05T22:00:00Z'),
  },
];

@Injectable()
export class StatsService {
  private readonly snapshots: StatsSnapshot[] = [...MOCK_SNAPSHOTS];

  getPlayerSnapshots(playerId: string): StatsSnapshot[] {
    const result = this.snapshots.filter(s => s.playerId === playerId);
    if (result.length === 0) {
      throw new NotFoundException(`No snapshots found for player ${playerId}`);
    }
    return result.sort((a, b) => b.capturedAt.getTime() - a.capturedAt.getTime());
  }

  getPlayerSeasonStats(playerId: string, seasonId: string): SeasonStats {
    const snaps = this.snapshots.filter(
      s => s.playerId === playerId && s.seasonId === seasonId,
    );
    if (snaps.length === 0) {
      throw new NotFoundException(
        `No stats found for player ${playerId} in season ${seasonId}`,
      );
    }

    const totalGamesPlayed       = snaps.reduce((s, n) => s + n.gamesPlayed, 0);
    const totalWins               = snaps.reduce((s, n) => s + n.wins, 0);
    const totalDraws              = snaps.reduce((s, n) => s + n.draws, 0);
    const totalLosses             = snaps.reduce((s, n) => s + n.losses, 0);
    const averageWinRate          = +(snaps.reduce((s, n) => s + n.winRate, 0) / snaps.length).toFixed(2);
    const averagePerformanceRating = Math.round(snaps.reduce((s, n) => s + n.performanceRating, 0) / snaps.length);
    const bestPerformanceRating   = Math.max(...snaps.map(n => n.performanceRating));

    return {
      seasonId,
      seasonName: SEASON_NAMES[seasonId] ?? seasonId,
      playerId,
      tournamentsPlayed: snaps.length,
      totalGamesPlayed,
      totalWins,
      totalDraws,
      totalLosses,
      averageWinRate,
      averagePerformanceRating,
      bestPerformanceRating,
      snapshots: snaps.sort((a, b) => b.capturedAt.getTime() - a.capturedAt.getTime()),
    };
  }

  getTournamentSnapshots(tournamentId: string): StatsSnapshot[] {
    const result = this.snapshots.filter(s => s.tournamentId === tournamentId);
    if (result.length === 0) {
      throw new NotFoundException(`No snapshots found for tournament ${tournamentId}`);
    }
    return result.sort((a, b) => b.performanceRating - a.performanceRating);
  }

  captureSnapshot(dto: CaptureSnapshotDto): StatsSnapshot {
    const exists = this.snapshots.find(
      s => s.playerId === dto.playerId && s.tournamentId === dto.tournamentId,
    );
    if (exists) {
      throw new ConflictException(
        `Snapshot already exists for player ${dto.playerId} in tournament ${dto.tournamentId}`,
      );
    }

    const snapshot: StatsSnapshot = {
      id: `snap-manual-${Date.now()}`,
      playerId: dto.playerId,
      tournamentId: dto.tournamentId,
      seasonId: 'season-2024',
      gamesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      winRate: 0,
      performanceRating: 0,
      averageOpponentRating: 0,
      openingsPlayed: { asWhite: [], asBlack: [] },
      capturedAt: new Date(),
    };

    this.snapshots.push(snapshot);
    return snapshot;
  }

  captureForTournament(tournamentId: string): { captured: number; tournamentId: string } {
    const playerIds = ['1', '3', '10'];
    let captured = 0;

    for (const playerId of playerIds) {
      const exists = this.snapshots.find(
        s => s.playerId === playerId && s.tournamentId === tournamentId,
      );
      if (!exists) {
        this.captureSnapshot({ playerId, tournamentId });
        captured++;
      }
    }

    return { captured, tournamentId };
  }
}
