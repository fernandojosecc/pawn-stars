import { Injectable } from '@nestjs/common';
import { TournamentQueryDto } from './dto/tournament.dto';
import { TournamentFormat, TournamentStatus } from './dto/tournament.dto';

export interface TournamentCard {
  id: string;
  slug: string;
  name: string;
  format: TournamentFormat;
  status: TournamentStatus;
  startDate: Date;
  endDate?: Date;
  location?: string;
}

@Injectable()
export class TournamentsService {
  // Mock data for development - this would come from database in production
  private readonly mockTournaments: TournamentCard[] = [
    {
      id: "1",
      slug: "tata-steel-masters-2024",
      name: "Tata Steel Masters 2024",
      format: TournamentFormat.ROUND_ROBIN,
      status: TournamentStatus.COMPLETED,
      startDate: new Date("2024-01-12"),
      endDate: new Date("2024-01-28"),
      location: "Wijk aan Zee, Netherlands"
    },
    {
      id: "2",
      slug: "world-chess-championship-2023",
      name: "World Chess Championship 2023",
      format: TournamentFormat.KNOCKOUT,
      status: TournamentStatus.COMPLETED,
      startDate: new Date("2023-11-20"),
      endDate: new Date("2023-12-15"),
      location: "Dubai, UAE"
    },
    {
      id: "3",
      slug: "sinquefield-cup-2023",
      name: "Sinquefield Cup 2023",
      format: TournamentFormat.ROUND_ROBIN,
      status: TournamentStatus.COMPLETED,
      startDate: new Date("2023-09-01"),
      endDate: new Date("2023-09-15"),
      location: "St. Louis, USA"
    },
    {
      id: "4",
      slug: "candidates-tournament-2023",
      name: "Candidates Tournament 2023",
      format: TournamentFormat.ROUND_ROBIN,
      status: TournamentStatus.COMPLETED,
      startDate: new Date("2023-04-15"),
      endDate: new Date("2023-05-05"),
      location: "Toronto, Canada"
    },
    {
      id: "5",
      slug: "norway-chess-2023",
      name: "Norway Chess 2023",
      format: TournamentFormat.ROUND_ROBIN,
      status: TournamentStatus.COMPLETED,
      startDate: new Date("2023-05-30"),
      endDate: new Date("2023-06-10"),
      location: "Stavanger, Norway"
    },
    {
      id: "6",
      slug: "world-rapid-championship-2022",
      name: "World Rapid Championship 2022",
      format: TournamentFormat.SWISS,
      status: TournamentStatus.COMPLETED,
      startDate: new Date("2022-12-25"),
      endDate: new Date("2022-12-30"),
      location: "Samarkand, Uzbekistan"
    },
    {
      id: "7",
      slug: "fide-grand-prix-berlin-2022",
      name: "FIDE Grand Prix Berlin 2022",
      format: TournamentFormat.KNOCKOUT,
      status: TournamentStatus.COMPLETED,
      startDate: new Date("2022-10-15"),
      endDate: new Date("2022-10-25"),
      location: "Berlin, Germany"
    },
    {
      id: "8",
      slug: "olympiad-2022",
      name: "Chess Olympiad 2022",
      format: TournamentFormat.SWISS,
      status: TournamentStatus.COMPLETED,
      startDate: new Date("2022-07-28"),
      endDate: new Date("2022-08-10"),
      location: "Chennai, India"
    },
    {
      id: "9",
      slug: "tata-steel-masters-2025",
      name: "Tata Steel Masters 2025",
      format: TournamentFormat.ROUND_ROBIN,
      status: TournamentStatus.UPCOMING,
      startDate: new Date("2025-01-10"),
      endDate: new Date("2025-01-26"),
      location: "Wijk aan Zee, Netherlands"
    },
    {
      id: "10",
      slug: "candidates-tournament-2024",
      name: "Candidates Tournament 2024",
      format: TournamentFormat.ROUND_ROBIN,
      status: TournamentStatus.UPCOMING,
      startDate: new Date("2024-04-03"),
      endDate: new Date("2024-04-22"),
      location: "Toronto, Canada"
    },
    {
      id: "11",
      slug: "world-chess-championship-2024",
      name: "World Chess Championship 2024",
      format: TournamentFormat.KNOCKOUT,
      status: TournamentStatus.UPCOMING,
      startDate: new Date("2024-11-20"),
      endDate: new Date("2024-12-15"),
      location: "New York, USA"
    },
    {
      id: "12",
      slug: "sinquefield-cup-2024",
      name: "Sinquefield Cup 2024",
      format: TournamentFormat.ROUND_ROBIN,
      status: TournamentStatus.ONGOING,
      startDate: new Date("2024-08-20"),
      endDate: new Date("2024-09-05"),
      location: "St. Louis, USA"
    }
  ];

  async findAll(query: TournamentQueryDto): Promise<{
    tournaments: TournamentCard[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    let filteredTournaments = [...this.mockTournaments];

    // Apply filters
    if (query.status) {
      filteredTournaments = filteredTournaments.filter(tournament => 
        tournament.status === query.status
      );
    }

    if (query.format) {
      filteredTournaments = filteredTournaments.filter(tournament => 
        tournament.format === query.format
      );
    }

    if (query.location) {
      filteredTournaments = filteredTournaments.filter(tournament => 
        tournament.location?.toLowerCase().includes(query.location!.toLowerCase())
      );
    }

    // Sort
    const sortBy = query.sortBy || 'startDate';
    const sortOrder = query.sortOrder || 'desc';
    
    filteredTournaments.sort((a, b) => {
      let aValue: any = a[sortBy as keyof TournamentCard];
      let bValue: any = b[sortBy as keyof TournamentCard];
      
      if (aValue instanceof Date) aValue = aValue.getTime();
      if (bValue instanceof Date) bValue = bValue.getTime();
      
      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });

    // Pagination
    const page = query.page || 1;
    const limit = query.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTournaments = filteredTournaments.slice(startIndex, endIndex);

    return {
      tournaments: paginatedTournaments,
      total: filteredTournaments.length,
      page,
      limit,
      totalPages: Math.ceil(filteredTournaments.length / limit)
    };
  }

  async findOne(id: string): Promise<TournamentCard | null> {
    return this.mockTournaments.find(tournament => tournament.id === id) || null;
  }

  async findBySlug(slug: string): Promise<TournamentCard | null> {
    return this.mockTournaments.find(tournament => tournament.slug === slug) || null;
  }

  async getFormats(): Promise<TournamentFormat[]> {
    return Object.values(TournamentFormat);
  }

  async getStatuses(): Promise<TournamentStatus[]> {
    return Object.values(TournamentStatus);
  }

  async getLocations(): Promise<string[]> {
    const locations = [...new Set(this.mockTournaments
      .filter(tournament => tournament.location)
      .map(tournament => tournament.location!))];
    return locations.sort();
  }

  async getStats(): Promise<{
    total: number;
    upcoming: number;
    ongoing: number;
    completed: number;
    cancelled: number;
    formatDistribution: Record<TournamentFormat, number>;
    locationDistribution: Record<string, number>;
  }> {
    const total = this.mockTournaments.length;
    const upcoming = this.mockTournaments.filter(t => t.status === TournamentStatus.UPCOMING).length;
    const ongoing = this.mockTournaments.filter(t => t.status === TournamentStatus.ONGOING).length;
    const completed = this.mockTournaments.filter(t => t.status === TournamentStatus.COMPLETED).length;
    const cancelled = this.mockTournaments.filter(t => t.status === TournamentStatus.CANCELLED).length;

    // Format distribution
    const formatDistribution = Object.values(TournamentFormat).reduce((acc, format) => {
      acc[format] = this.mockTournaments.filter(t => t.format === format).length;
      return acc;
    }, {} as Record<TournamentFormat, number>);

    // Location distribution
    const locationDistribution = this.mockTournaments.reduce((acc, tournament) => {
      if (tournament.location) {
        acc[tournament.location] = (acc[tournament.location] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      upcoming,
      ongoing,
      completed,
      cancelled,
      formatDistribution,
      locationDistribution
    };
  }
}
