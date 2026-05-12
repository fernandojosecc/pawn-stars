import { Injectable, Logger } from '@nestjs/common';
import { RatingSnapshot, RatingProvider, RatingImportResult, BatchImportResult } from '@pawn-stars/shared-types';
import { LichessRatingsService } from './providers/lichess-ratings.service';
import { FideRatingsService } from './providers/fide-ratings.service';
import { PlayerIdentifier } from './providers/ratings-provider.interface';

interface PlayerEntry extends PlayerIdentifier {
  name: string;
}

/**
 * In-memory snapshot store.
 * In production, each snapshot is persisted to the `ratings` table via Prisma
 * immediately after a successful provider fetch.
 */
@Injectable()
export class RatingsImportService {
  private readonly logger = new Logger(RatingsImportService.name);

  // snapshots keyed by playerId → provider → ordered list
  private readonly store = new Map<string, Map<RatingProvider, RatingSnapshot[]>>();

  // Demo roster — in production this comes from PlayersService / Prisma
  private readonly roster: PlayerEntry[] = [
    { playerId: '1',  name: 'Magnus Carlsen',       lichessHandle: 'DrNykterstein', fideId: '1503014'  },
    { playerId: '2',  name: 'Hou Yifan',             lichessHandle: 'HouYifan',      fideId: undefined   },
    { playerId: '3',  name: 'Fabiano Caruana',       lichessHandle: 'FabianoCaruana',fideId: '2020009'  },
    { playerId: '4',  name: 'Ding Liren',            lichessHandle: 'dingliren',     fideId: '8603677'  },
    { playerId: '5',  name: 'Ian Nepomniachtchi',    lichessHandle: 'Nepomniachtchi',fideId: '4178533'  },
    { playerId: '12', name: 'Alireza Firouzja',      lichessHandle: 'alireza2003',   fideId: '12514474' },
  ];

  constructor(
    private readonly lichess: LichessRatingsService,
    private readonly fide:    FideRatingsService,
  ) {}

  /** Run a full import for all rostered players. Errors per player are caught
   *  and recorded without aborting the rest of the batch. */
  async runImport(): Promise<BatchImportResult> {
    const startedAt = new Date();
    this.logger.log(`Ratings import started at ${startedAt.toISOString()}`);

    const results: RatingImportResult[] = await Promise.all(
      this.roster.map((player) => this.importPlayer(player)),
    );

    const finishedAt = new Date();
    const succeeded = results.filter((r) => r.success).length;
    const failed    = results.length - succeeded;

    this.logger.log(
      `Ratings import finished — ${succeeded} succeeded, ${failed} failed — ` +
      `duration ${finishedAt.getTime() - startedAt.getTime()}ms`,
    );

    return {
      startedAt,
      finishedAt,
      totalPlayers: results.length,
      succeeded,
      failed,
      results,
    };
  }

  private async importPlayer(player: PlayerEntry): Promise<RatingImportResult> {
    const result: RatingImportResult = {
      playerId: player.playerId,
      playerHandle: player.name,
      snapshots: [],
      success: false,
      errors: [],
    };

    // Fetch from Lichess (all modalities in one call)
    if (player.lichessHandle) {
      try {
        const snaps = await this.lichess.fetchByUsername(player);
        result.snapshots.push(...snaps);
      } catch (err) {
        const msg = `Lichess fetch failed for ${player.name}: ${(err as Error).message}`;
        this.logger.warn(msg);
        result.errors.push(msg);
      }
    }

    // Fetch from FIDE
    if (player.fideId) {
      try {
        const snaps = await this.fide.fetchByFideId(player);
        result.snapshots.push(...snaps);
      } catch (err) {
        const msg = `FIDE fetch failed for ${player.name}: ${(err as Error).message}`;
        this.logger.warn(msg);
        result.errors.push(msg);
      }
    }

    if (result.snapshots.length > 0) {
      this.persist(player.playerId, result.snapshots);
      result.success = true;
    }

    return result;
  }

  private persist(playerId: string, snapshots: RatingSnapshot[]): void {
    if (!this.store.has(playerId)) {
      this.store.set(playerId, new Map());
    }
    const byProvider = this.store.get(playerId)!;

    for (const snap of snapshots) {
      if (!byProvider.has(snap.provider)) {
        byProvider.set(snap.provider, []);
      }
      byProvider.get(snap.provider)!.push(snap);
    }
  }

  getHistory(playerId: string): RatingSnapshot[] {
    const byProvider = this.store.get(playerId);
    if (!byProvider) return [];

    return Array.from(byProvider.values())
      .flat()
      .sort((a, b) => a.capturedAt.getTime() - b.capturedAt.getTime());
  }

  getCurrent(playerId: string): RatingSnapshot[] {
    const byProvider = this.store.get(playerId);
    if (!byProvider) return [];

    // Return the latest snapshot for each provider
    return Array.from(byProvider.entries()).map(([, snaps]) => {
      return snaps.reduce((latest, s) =>
        s.capturedAt > latest.capturedAt ? s : latest,
      );
    });
  }

  getLastImportTime(): Date | null {
    let latest: Date | null = null;
    for (const byProvider of this.store.values()) {
      for (const snaps of byProvider.values()) {
        for (const s of snaps) {
          if (!latest || s.capturedAt > latest) latest = s.capturedAt;
        }
      }
    }
    return latest;
  }
}
