import { RatingProvider, RatingSnapshot } from '@pawn-stars/shared-types';

export interface PlayerIdentifier {
  playerId: string;
  lichessHandle?: string;
  fideId?: string;
}

export interface RatingsProviderInterface {
  readonly provider: RatingProvider;

  /**
   * Fetch ratings by Lichess username.
   * Returns an empty array if the handle is absent or the user is not found.
   */
  fetchByUsername(identifier: PlayerIdentifier): Promise<RatingSnapshot[]>;

  /**
   * Fetch ratings by FIDE ID.
   * Returns an empty array if the FIDE ID is absent or no data is available.
   */
  fetchByFideId(identifier: PlayerIdentifier): Promise<RatingSnapshot[]>;
}
