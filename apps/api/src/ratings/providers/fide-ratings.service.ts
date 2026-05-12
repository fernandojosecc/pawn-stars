import { Injectable, Logger } from '@nestjs/common';
import { RatingProvider, RatingSnapshot } from '@pawn-stars/shared-types';
import { RatingsProviderInterface, PlayerIdentifier } from './ratings-provider.interface';

/**
 * FIDE has no public API. This service reads from a manually maintained
 * in-memory dataset that mirrors a CSV import. In production this would
 * be replaced by a scheduled CSV/XML download from the FIDE ratings list
 * (published monthly at https://ratings.fide.com/download_lists.phtml).
 *
 * CSV columns expected: fideId, rating, capturedAt (ISO date)
 */
interface FideRecord {
  fideId: string;
  rating: number;
  capturedAt: Date;
}

const FIDE_SEED_DATA: FideRecord[] = [
  { fideId: '1503014',  rating: 2830, capturedAt: new Date('2025-05-01') }, // Carlsen
  { fideId: '2020009',  rating: 2820, capturedAt: new Date('2025-05-01') }, // Caruana
  { fideId: '8603677',  rating: 2791, capturedAt: new Date('2025-05-01') }, // Ding Liren
  { fideId: '4178533',  rating: 2793, capturedAt: new Date('2025-05-01') }, // Nepomniachtchi
  { fideId: '12514474', rating: 2793, capturedAt: new Date('2025-05-01') }, // Firouzja
];

@Injectable()
export class FideRatingsService implements RatingsProviderInterface {
  private readonly logger = new Logger(FideRatingsService.name);
  readonly provider = RatingProvider.FIDE;

  private readonly records: Map<string, FideRecord> = new Map(
    FIDE_SEED_DATA.map((r) => [r.fideId, r]),
  );

  /** Lichess lookup not applicable for FIDE. */
  async fetchByUsername(_identifier: PlayerIdentifier): Promise<RatingSnapshot[]> {
    return [];
  }

  async fetchByFideId(identifier: PlayerIdentifier): Promise<RatingSnapshot[]> {
    const { fideId, playerId } = identifier;
    if (!fideId) return [];

    const record = this.records.get(fideId);
    if (!record) {
      this.logger.warn(`No FIDE record found for FIDE ID ${fideId}`);
      return [];
    }

    return [
      {
        id: `${playerId}-${RatingProvider.FIDE}-${Date.now()}`,
        playerId,
        provider: RatingProvider.FIDE,
        rating: record.rating,
        capturedAt: record.capturedAt,
      },
    ];
  }

  /**
   * Replaces the in-memory dataset with parsed CSV rows.
   * Called by an admin endpoint or a file-watch hook when a new
   * FIDE export is dropped into the import directory.
   */
  loadFromCsv(csv: string): { loaded: number; errors: number } {
    const lines = csv.split('\n').filter((l) => l.trim() && !l.startsWith('#'));
    let loaded = 0;
    let errors = 0;

    for (const line of lines) {
      const parts = line.split(',').map((s) => s.trim());
      const fideId    = parts[0];
      const ratingStr = parts[1] ?? '';
      const dateStr   = parts[2] ?? '';
      const rating = parseInt(ratingStr, 10);
      const capturedAt = new Date(dateStr);

      if (!fideId || isNaN(rating) || isNaN(capturedAt.getTime())) {
        this.logger.warn(`Skipping malformed FIDE CSV row: "${line}"`);
        errors++;
        continue;
      }

      this.records.set(fideId, { fideId, rating, capturedAt });
      loaded++;
    }

    this.logger.log(`FIDE CSV loaded: ${loaded} records, ${errors} errors`);
    return { loaded, errors };
  }
}
