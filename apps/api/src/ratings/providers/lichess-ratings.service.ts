import { Injectable, Logger } from '@nestjs/common';
import { RatingProvider, RatingSnapshot } from '@pawn-stars/shared-types';
import { RatingsProviderInterface, PlayerIdentifier } from './ratings-provider.interface';

interface LichessPerf {
  games: number;
  rating: number;
  rd: number;
  prog: number;
  prov?: boolean;
}

interface LichessUserResponse {
  id: string;
  username: string;
  perfs: {
    bullet?:     LichessPerf;
    blitz?:      LichessPerf;
    rapid?:      LichessPerf;
    classical?:  LichessPerf;
    correspondence?: LichessPerf;
  };
}

const MODALITY_MAP: Array<{
  perfKey: keyof LichessUserResponse['perfs'];
  provider: RatingProvider;
}> = [
  { perfKey: 'classical', provider: RatingProvider.LICHESS_CLASSICAL },
  { perfKey: 'rapid',     provider: RatingProvider.LICHESS_RAPID     },
  { perfKey: 'blitz',     provider: RatingProvider.LICHESS_BLITZ     },
  { perfKey: 'bullet',    provider: RatingProvider.LICHESS_BULLET    },
];

@Injectable()
export class LichessRatingsService implements RatingsProviderInterface {
  private readonly logger = new Logger(LichessRatingsService.name);
  readonly provider = RatingProvider.LICHESS_CLASSICAL;

  private get apiBase(): string {
    return process.env.LICHESS_API_URL ?? 'https://lichess.org/api';
  }

  async fetchByUsername(identifier: PlayerIdentifier): Promise<RatingSnapshot[]> {
    const { lichessHandle, playerId } = identifier;
    if (!lichessHandle) return [];

    const url = `${this.apiBase}/user/${encodeURIComponent(lichessHandle)}`;

    let data: LichessUserResponse;
    try {
      const res = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(10_000),
      });

      if (res.status === 404) {
        this.logger.warn(`Lichess user not found: ${lichessHandle}`);
        return [];
      }
      if (!res.ok) {
        throw new Error(`Lichess API returned ${res.status} for ${lichessHandle}`);
      }
      data = (await res.json()) as LichessUserResponse;
    } catch (err) {
      this.logger.error(`Failed to fetch Lichess ratings for ${lichessHandle}: ${(err as Error).message}`);
      throw err;
    }

    const capturedAt = new Date();
    const snapshots: RatingSnapshot[] = [];

    for (const { perfKey, provider } of MODALITY_MAP) {
      const perf = data.perfs[perfKey];
      if (!perf || perf.games === 0) continue;

      snapshots.push({
        id: `${playerId}-${provider}-${capturedAt.getTime()}`,
        playerId,
        provider,
        rating: perf.rating,
        games: perf.games,
        capturedAt,
      });
    }

    return snapshots;
  }

  /** FIDE lookup is not Lichess's responsibility — always returns empty. */
  async fetchByFideId(_identifier: PlayerIdentifier): Promise<RatingSnapshot[]> {
    return [];
  }
}
