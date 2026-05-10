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

    // Create players index if it doesn't exist
    try {
      await this.client.getIndex(this.playersIndex);
    } catch (error) {
      // Index doesn't exist, create it
      await this.client.createIndex(this.playersIndex, {
        uid: this.playersIndex,
        primaryKey: 'id',
      });
    }

    // Configure searchable attributes and ranking rules
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
      console.error('Error indexing player:', error);
      throw error;
    }
  }

  async indexPlayers(players: PlayerDocument[]) {
    try {
      await this.client.index(this.playersIndex).addDocuments(players, {
        primaryKey: 'id',
      });
    } catch (error) {
      console.error('Error indexing players:', error);
      throw error;
    }
  }

  async updatePlayer(player: PlayerDocument) {
    try {
      await this.client.index(this.playersIndex).updateDocuments([player], {
        primaryKey: 'id',
      });
    } catch (error) {
      console.error('Error updating player:', error);
      throw error;
    }
  }

  async deletePlayer(playerId: string) {
    try {
      await this.client.index(this.playersIndex).deleteDocument(playerId);
    } catch (error) {
      console.error('Error deleting player:', error);
      throw error;
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
    } catch (error) {
      console.error('Error searching players:', error);
      throw error;
    }
  }

  async getPlayerStats() {
    try {
      const stats = await this.client.index(this.playersIndex).getStats();
      return stats;
    } catch (error) {
      console.error('Error getting player stats:', error);
      throw error;
    }
  }

  async reindexAllPlayers(players: PlayerDocument[]) {
    try {
      // Clear existing index
      await this.client.index(this.playersIndex).deleteAllDocuments();
      
      // Reindex all players
      await this.indexPlayers(players);
    } catch (error) {
      console.error('Error reindexing all players:', error);
      throw error;
    }
  }

  // Helper methods for building filters
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
        return 'currentRating:desc'; // Default: highest rating first
    }
  }
}
