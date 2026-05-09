import { Injectable } from '@nestjs/common';
import { PlayerQueryDto } from './dto/player.dto';
import { MeilisearchService } from '../search/meilisearch.service';

interface PlayerCard {
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

interface PlayerFilter {
  title?: string;
  nationality?: string;
  active?: boolean;
  minRating?: number;
  maxRating?: number;
}

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

type PlayerTitle = 'GM' | 'IM' | 'FM' | 'CM' | 'WGM' | 'WIM' | 'WFM' | 'WCM';

@Injectable()
export class PlayersService {
  constructor(private readonly meilisearchService: MeilisearchService) {}
  // Mock data for development - this would come from database in production
  private readonly mockPlayers: PlayerCard[] = [
    {
      id: "1",
      slug: "magnus-carlsen",
      firstName: "Magnus",
      lastName: "Carlsen",
      nationality: "NOR",
      photoUrl: "/players/magnus.jpg",
      title: "GM",
      currentRating: 2830,
      active: true
    },
    {
      id: "2", 
      slug: "hou-yifan",
      firstName: "Hou",
      lastName: "Yifan",
      nationality: "CHN",
      photoUrl: "/players/hou.jpg",
      title: "GM",
      currentRating: 2758,
      active: true
    },
    {
      id: "3",
      slug: "fabiano-caruana", 
      firstName: "Fabiano",
      lastName: "Caruana",
      nationality: "USA",
      photoUrl: "/players/fabiano.jpg",
      title: "GM",
      currentRating: 2820,
      active: true
    },
    {
      id: "4",
      slug: "ding-liren",
      firstName: "Ding", 
      lastName: "Liren",
      nationality: "CHN",
      photoUrl: "/players/ding.jpg",
      title: "GM",
      currentRating: 2791,
      active: true
    },
    {
      id: "5",
      slug: "ian-nepomniachtchi",
      firstName: "Ian",
      lastName: "Nepomniachtchi",
      nationality: "RUS",
      photoUrl: "/players/ian.jpg", 
      title: "GM",
      currentRating: 2793,
      active: true
    },
    {
      id: "6",
      slug: "levon-aronian",
      firstName: "Levon",
      lastName: "Aronian",
      nationality: "USA", 
      photoUrl: "/players/levon.jpg",
      title: "GM",
      currentRating: 2785,
      active: true
    },
    {
      id: "7",
      slug: "wesley-so",
      firstName: "Wesley",
      lastName: "So",
      nationality: "USA",
      photoUrl: "/players/wesley.jpg",
      title: "GM",
      currentRating: 2767,
      active: true
    },
    {
      id: "8",
      slug: "anish-giri",
      firstName: "Anish",
      lastName: "Giri",
      nationality: "NED",
      photoUrl: "/players/anish.jpg",
      title: "GM",
      currentRating: 2780,
      active: true
    },
    {
      id: "9",
      slug: "shakhriyar-mamedyarov",
      firstName: "Shakhriyar",
      lastName: "Mamedyarov",
      nationality: "AZE",
      photoUrl: "/players/shakhriyar.jpg",
      title: "GM",
      currentRating: 2762,
      active: true
    },
    {
      id: "10",
      slug: "hikaru-nakamura",
      firstName: "Hikaru",
      lastName: "Nakamura",
      nationality: "USA",
      photoUrl: "/players/hikaru.jpg",
      title: "GM",
      currentRating: 2778,
      active: true
    },
    {
      id: "11",
      slug: "richard-rapport",
      firstName: "Richard",
      lastName: "Rapport",
      nationality: "ROU",
      photoUrl: "/players/richard.jpg",
      title: "GM",
      currentRating: 2732,
      active: true
    },
    {
      id: "12",
      slug: "alireza-firouzja",
      firstName: "Alireza",
      lastName: "Firouzja",
      nationality: "FRA",
      photoUrl: "/players/alireza.jpg",
      title: "GM",
      currentRating: 2793,
      active: true
    },
    {
      id: "13",
      slug: "viswanathan-anand",
      firstName: "Viswanathan",
      lastName: "Anand",
      nationality: "IND",
      photoUrl: "/players/anand.jpg",
      title: "GM",
      currentRating: 2754,
      active: false
    },
    {
      id: "14",
      slug: "vladimir-kramnik",
      firstName: "Vladimir",
      lastName: "Kramnik",
      nationality: "RUS",
      photoUrl: "/players/kramnik.jpg",
      title: "GM",
      currentRating: 2747,
      active: false
    },
    {
      id: "15",
      slug: "judit-polgar",
      firstName: "Judit",
      lastName: "Polgar",
      nationality: "HUN",
      photoUrl: "/players/judit.jpg",
      title: "GM",
      currentRating: 2735,
      active: false
    }
  ];

  async findAll(query: PlayerQueryDto): Promise<{
    players: PlayerCard[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    let filteredPlayers = [...this.mockPlayers];

    // Apply filters
    if (query.title) {
      filteredPlayers = filteredPlayers.filter(player => player.title === query.title);
    }

    if (query.nationality) {
      filteredPlayers = filteredPlayers.filter(player => 
        player.nationality === query.nationality
      );
    }

    if (query.active !== undefined) {
      filteredPlayers = filteredPlayers.filter(player => 
        player.active === query.active
      );
    }

    if (query.minRating !== undefined) {
      filteredPlayers = filteredPlayers.filter(player => 
        player.currentRating && player.currentRating >= query.minRating!
      );
    }

    if (query.maxRating !== undefined) {
      filteredPlayers = filteredPlayers.filter(player => 
        player.currentRating && player.currentRating <= query.maxRating!
      );
    }

    if (query.search) {
      const searchTerm = query.search.toLowerCase();
      filteredPlayers = filteredPlayers.filter(player =>
        player.firstName.toLowerCase().includes(searchTerm) ||
        player.lastName.toLowerCase().includes(searchTerm) ||
        player.nationality.toLowerCase().includes(searchTerm) ||
        (player.lichessHandle && player.lichessHandle.toLowerCase().includes(searchTerm))
      );
    }

    // Sort by rating (descending) if available, then by name
    filteredPlayers.sort((a, b) => {
      if (a.currentRating && b.currentRating) {
        return b.currentRating - a.currentRating;
      }
      if (a.currentRating && !b.currentRating) {
        return -1;
      }
      if (!a.currentRating && b.currentRating) {
        return 1;
      }
      return a.lastName.localeCompare(b.lastName);
    });

    // Apply pagination
    const total = filteredPlayers.length;
    const page = query.page || 1;
    const limit = query.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const players = filteredPlayers.slice(startIndex, endIndex);
    const totalPages = Math.ceil(total / limit);

    return {
      players,
      total,
      page,
      limit,
      totalPages
    };
  }

  async findOne(id: string): Promise<PlayerCard | null> {
    return this.mockPlayers.find(player => player.id === id) || null;
  }

  async findBySlug(slug: string): Promise<PlayerCard | null> {
    return this.mockPlayers.find(player => player.slug === slug) || null;
  }

  async getNationalities(): Promise<string[]> {
    const nationalities = [...new Set(this.mockPlayers.map(player => player.nationality))];
    return nationalities.sort();
  }

  async getTitles(): Promise<PlayerTitle[]> {
    const titles = [...new Set(this.mockPlayers
      .filter(player => player.title)
      .map(player => player.title!))] as PlayerTitle[];
    return titles;
  }

  async getStats(): Promise<{
    total: number;
    active: number;
    averageRating: number;
    titleDistribution: Record<PlayerTitle, number>;
    nationalityDistribution: Record<string, number>;
  }> {
    const total = this.mockPlayers.length;
    const active = this.mockPlayers.filter(player => player.active).length;
    
    const playersWithRating = this.mockPlayers.filter(player => player.currentRating);
    const averageRating = playersWithRating.length > 0
      ? playersWithRating.reduce((sum, player) => sum + player.currentRating!, 0) / playersWithRating.length
      : 0;

    const titleDistribution: Record<PlayerTitle, number> = {} as Record<PlayerTitle, number>;
    const nationalityDistribution: Record<string, number> = {};

    this.mockPlayers.forEach(player => {
      if (player.title) {
        titleDistribution[player.title] = (titleDistribution[player.title] || 0) + 1;
      }
      nationalityDistribution[player.nationality] = (nationalityDistribution[player.nationality] || 0) + 1;
    });

    return {
      total,
      active,
      averageRating: Math.round(averageRating),
      titleDistribution,
      nationalityDistribution
    };
  }

  // Meilisearch integration methods
  async indexPlayer(player: PlayerCard): Promise<void> {
    const playerDocument: PlayerDocument = {
      id: player.id,
      slug: player.slug,
      firstName: player.firstName,
      lastName: player.lastName,
      nationality: player.nationality,
      photoUrl: player.photoUrl,
      title: player.title,
      currentRating: player.currentRating,
      active: player.active,
      lichessHandle: player.lichessHandle,
    };
    
    await this.meilisearchService.indexPlayer(playerDocument);
  }

  async indexAllPlayers(): Promise<void> {
    const playerDocuments: PlayerDocument[] = this.mockPlayers.map(player => ({
      id: player.id,
      slug: player.slug,
      firstName: player.firstName,
      lastName: player.lastName,
      nationality: player.nationality,
      photoUrl: player.photoUrl,
      title: player.title,
      currentRating: player.currentRating,
      active: player.active,
      lichessHandle: player.lichessHandle,
    }));

    await this.meilisearchService.indexPlayers(playerDocuments);
  }

  async updatePlayerIndex(player: PlayerCard): Promise<void> {
    const playerDocument: PlayerDocument = {
      id: player.id,
      slug: player.slug,
      firstName: player.firstName,
      lastName: player.lastName,
      nationality: player.nationality,
      photoUrl: player.photoUrl,
      title: player.title,
      currentRating: player.currentRating,
      active: player.active,
      lichessHandle: player.lichessHandle,
    };
    
    await this.meilisearchService.updatePlayer(playerDocument);
  }

  async removePlayerIndex(playerId: string): Promise<void> {
    await this.meilisearchService.deletePlayer(playerId);
  }

  async searchPlayers(query: string, options?: {
    limit?: number;
    offset?: number;
    filter?: string;
    sort?: string;
  }) {
    return this.meilisearchService.searchPlayers(query, options);
  }
}
