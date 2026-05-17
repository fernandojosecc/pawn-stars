import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Meilisearch } from 'meilisearch';
import { ConfigService } from '@nestjs/config';

interface PlayerDocument {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  nationality: string;
  photoUrl?: string;
  title?: string;
  currentRating?: number;
  active: boolean;
  lichessHandle?: string;
}

@Injectable()
export class MeilisearchService implements OnModuleInit, OnModuleDestroy {
  private client!: Meilisearch;
  private readonly playersIndex = 'players';

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const host = this.configService.get<string>('MEILISEARCH_HOST', 'http://localhost:7700');
    const apiKey = this.configService.get<string>('MEILISEARCH_API_KEY');

    this.client = new Meilisearch({ host, apiKey });

    try {
      try {
        await this.client.getIndex(this.playersIndex);
      } catch {
        await this.client.createIndex(this.playersIndex, {
          uid: this.playersIndex,
          primaryKey: 'id',
        });
      }

      await this.client.index(this.playersIndex).updateSettings({
        searchableAttributes: ['firstName', 'lastName', 'nationality', 'lichessHandle'],
        filterableAttributes: ['title', 'nationality', 'active', 'currentRating'],
        sortableAttributes: ['currentRating', 'lastName', 'firstName'],
        rankingRules: [
          'words',
          'typo',
          'proximity',
          'attribute',
          'sort',
          'exactness',
        ],
        pagination: {
          maxTotalHits: 1000,
        },
        displayedAttributes: [
          'id',
          'slug',
          'firstName',
          'lastName',
          'nationality',
          'photoUrl',
          'title',
          'currentRating',
          'active',
          'lichessHandle',
        ],
      });
    } catch (error) {
      console.warn('Meilisearch unavailable — search features disabled:', (error as Error).message);
    }
  }

  async onModuleDestroy() {
    // Cleanup if needed
  }

  async indexPlayer(player: PlayerDocument) {
    try {
      await this.client.index(this.playersIndex).addDocuments([player], {
        primaryKey: 'id',
      });
    } catch (error) {
      console.warn('Meilisearch: error indexing player:', (error as Error).message);
    }
  }

  async indexPlayers(players: PlayerDocument[]) {
    try {
      await this.client.index(this.playersIndex).addDocuments(players, {
        primaryKey: 'id',
      });
    } catch (error) {
      console.warn('Meilisearch: error indexing players:', (error as Error).message);
    }
  }

  async updatePlayer(player: PlayerDocument) {
    try {
      await this.client.index(this.playersIndex).updateDocuments([player], {
        primaryKey: 'id',
      });
    } catch (error) {
      console.warn('Meilisearch: error updating player:', (error as Error).message);
    }
  }

  async deletePlayer(playerId: string) {
    try {
      await this.client.index(this.playersIndex).deleteDocument(playerId);
    } catch (error) {
      console.warn('Meilisearch: error deleting player:', (error as Error).message);
    }
  }

  async searchPlayers(query: string, options?: {
    limit?: number;
    offset?: number;
    filter?: string;
    sort?: string;
  }) {
    try {
      const searchParams: any = {
        limit: options?.limit || 20,
        offset: options?.offset || 0,
        filter: options?.filter,
        sort: options?.sort ? [options.sort] : undefined,
      };

      const result = await this.client.index(this.playersIndex).search(query, searchParams);

      return {
        hits: result.hits as PlayerDocument[],
        totalHits: result.estimatedTotalHits,
        limit: searchParams.limit,
        offset: searchParams.offset,
        processingTimeMs: result.processingTimeMs,
        query: result.query,
      };
    } catch {
      return { hits: [], totalHits: 0, limit: options?.limit ?? 20, offset: options?.offset ?? 0, processingTimeMs: 0, query };
    }
  }

  async getPlayerStats() {
    try {
      return await this.client.index(this.playersIndex).getStats();
    } catch {
      return null;
    }
  }

  async reindexAllPlayers(players: PlayerDocument[]) {
    try {
      await this.client.index(this.playersIndex).deleteAllDocuments();
      await this.indexPlayers(players);
    } catch (error) {
      console.warn('Meilisearch: error reindexing players:', (error as Error).message);
    }
  }

  buildPlayerFilter(filters: {
    title?: string;
    nationality?: string;
    active?: boolean;
    minRating?: number;
    maxRating?: number;
  }): string {
    const filterConditions: string[] = [];

    if (filters.title) {
      filterConditions.push(`title = "${filters.title}"`);
    }

    if (filters.nationality) {
      filterConditions.push(`nationality = "${filters.nationality}"`);
    }

    if (filters.active !== undefined) {
      filterConditions.push(`active = ${filters.active}`);
    }

    if (filters.minRating !== undefined) {
      filterConditions.push(`currentRating >= ${filters.minRating}`);
    }

    if (filters.maxRating !== undefined) {
      filterConditions.push(`currentRating <= ${filters.maxRating}`);
    }

    return filterConditions.join(' AND ');
  }

  buildPlayerSort(sortBy?: string): string {
    switch (sortBy) {
      case 'rating-desc':
        return 'currentRating:desc';
      case 'rating-asc':
        return 'currentRating:asc';
      case 'name-asc':
        return 'lastName:asc,firstName:asc';
      case 'name-desc':
        return 'lastName:desc,firstName:desc';
      default:
        return 'currentRating:desc';
    }
  }
}
