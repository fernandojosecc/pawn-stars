import { Injectable } from '@nestjs/common';
import { TournamentQueryDto } from './dto/tournament.dto';
import { TournamentFormat, TournamentStatus } from './dto/tournament.dto';

interface TournamentParticipant {
  playerId: string;
  playerName: string;
  playerTitle?: string;
  playerNationality?: string;
  rating?: number;
}

interface TournamentPairingDetail {
  board: number;
  white: TournamentParticipant;
  black: TournamentParticipant;
  result?: string;
}

interface TournamentRoundDetail {
  roundNumber: number;
  status: string;
  date?: string;
  pairings: TournamentPairingDetail[];
}

interface TournamentStandingEntry {
  rank: number;
  player: TournamentParticipant;
  score: number;
  tiebreak?: number;
  wins: number;
  draws: number;
  losses: number;
  gamesPlayed: number;
}

interface TimelineEvent {
  roundNumber?: number;
  date: string;
  title: string;
  description?: string;
  type: 'round_start' | 'round_end' | 'highlight' | 'milestone';
}

export interface TournamentDetail extends TournamentCard {
  description?: string;
  playerCount: number;
  rounds: TournamentRoundDetail[];
  standings: TournamentStandingEntry[];
  timeline: TimelineEvent[];
}

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

  async findBySlugWithDetail(slug: string): Promise<TournamentDetail | null> {
    const card = this.mockTournaments.find(t => t.slug === slug);
    if (!card) return null;

    const carlsen:  TournamentParticipant = { playerId: '1',  playerName: 'Magnus Carlsen',     playerTitle: 'GM', playerNationality: 'NOR', rating: 2830 };
    const caruana:  TournamentParticipant = { playerId: '3',  playerName: 'Fabiano Caruana',    playerTitle: 'GM', playerNationality: 'USA', rating: 2820 };
    const nakamura: TournamentParticipant = { playerId: '10', playerName: 'Hikaru Nakamura',    playerTitle: 'GM', playerNationality: 'USA', rating: 2778 };
    const giri:     TournamentParticipant = { playerId: '8',  playerName: 'Anish Giri',         playerTitle: 'GM', playerNationality: 'NED', rating: 2780 };
    const nepo:     TournamentParticipant = { playerId: '5',  playerName: 'Ian Nepomniachtchi', playerTitle: 'GM', playerNationality: 'RUS', rating: 2793 };
    const firouzja: TournamentParticipant = { playerId: '12', playerName: 'Alireza Firouzja',   playerTitle: 'GM', playerNationality: 'FRA', rating: 2793 };
    const pragg:    TournamentParticipant = { playerId: '15', playerName: 'R. Praggnanandhaa',  playerTitle: 'GM', playerNationality: 'IND', rating: 2747 };
    const nodi:     TournamentParticipant = { playerId: '16', playerName: 'N. Abdusattorov',    playerTitle: 'GM', playerNationality: 'UZB', rating: 2766 };

    const detailMap: Record<string, Partial<TournamentDetail>> = {
      'tata-steel-masters-2024': {
        description: 'The 86th Tata Steel Chess Tournament, one of the strongest round-robin events of the year.',
        playerCount: 14,
        rounds: [
          {
            roundNumber: 1, status: 'COMPLETED', date: '2024-01-12',
            pairings: [
              { board: 1, white: carlsen,  black: caruana,  result: '1/2-1/2' },
              { board: 2, white: nakamura, black: nepo,     result: '1-0' },
              { board: 3, white: giri,     black: firouzja, result: '0-1' },
              { board: 4, white: pragg,    black: nodi,     result: '1/2-1/2' },
            ],
          },
          {
            roundNumber: 2, status: 'COMPLETED', date: '2024-01-13',
            pairings: [
              { board: 1, white: caruana,  black: firouzja, result: '1-0' },
              { board: 2, white: nepo,     black: carlsen,  result: '1/2-1/2' },
              { board: 3, white: nodi,     black: nakamura, result: '0-1' },
              { board: 4, white: firouzja, black: pragg,    result: '1-0' },
            ],
          },
          {
            roundNumber: 3, status: 'COMPLETED', date: '2024-01-14',
            pairings: [
              { board: 1, white: carlsen,  black: giri,     result: '1-0' },
              { board: 2, white: firouzja, black: nakamura, result: '0-1' },
              { board: 3, white: caruana,  black: nepo,     result: '1/2-1/2' },
              { board: 4, white: pragg,    black: nodi,     result: '1/2-1/2' },
            ],
          },
        ],
        standings: [
          { rank: 1, player: carlsen,  score: 2.5, tiebreak: 8.50, wins: 2, draws: 1, losses: 0, gamesPlayed: 3 },
          { rank: 2, player: nakamura, score: 2.5, tiebreak: 8.25, wins: 2, draws: 1, losses: 0, gamesPlayed: 3 },
          { rank: 3, player: caruana,  score: 2.0, tiebreak: 7.75, wins: 1, draws: 2, losses: 0, gamesPlayed: 3 },
          { rank: 4, player: firouzja, score: 1.5, tiebreak: 6.50, wins: 1, draws: 1, losses: 1, gamesPlayed: 3 },
          { rank: 5, player: nepo,     score: 1.0, tiebreak: 5.50, wins: 0, draws: 2, losses: 1, gamesPlayed: 3 },
          { rank: 6, player: pragg,    score: 1.0, tiebreak: 5.25, wins: 0, draws: 2, losses: 1, gamesPlayed: 3 },
          { rank: 7, player: giri,     score: 0.5, tiebreak: 4.75, wins: 0, draws: 1, losses: 2, gamesPlayed: 3 },
          { rank: 8, player: nodi,     score: 0.5, tiebreak: 4.25, wins: 0, draws: 1, losses: 2, gamesPlayed: 3 },
        ],
        timeline: [
          { date: '2024-01-12', title: 'Round 1', description: 'Opening round — four decisive boards', type: 'round_end', roundNumber: 1 },
          { date: '2024-01-13', title: 'Round 2', description: 'Caruana scores his first win', type: 'round_end', roundNumber: 2 },
          { date: '2024-01-14', title: 'Round 3', description: 'Carlsen leads with 2.5/3', type: 'round_end', roundNumber: 3 },
          { date: '2024-01-28', title: 'Final Round', description: 'Tournament concludes — Carlsen takes the title', type: 'milestone' },
        ],
      },
      'sinquefield-cup-2024': {
        description: 'The Sinquefield Cup 2024, part of the Grand Chess Tour.',
        playerCount: 10,
        rounds: [
          {
            roundNumber: 1, status: 'COMPLETED', date: '2024-08-20',
            pairings: [
              { board: 1, white: carlsen,  black: nakamura, result: '1/2-1/2' },
              { board: 2, white: caruana,  black: firouzja, result: '1-0' },
              { board: 3, white: nepo,     black: giri,     result: '1/2-1/2' },
              { board: 4, white: pragg,    black: nodi,     result: '1-0' },
            ],
          },
          {
            roundNumber: 2, status: 'COMPLETED', date: '2024-08-21',
            pairings: [
              { board: 1, white: nakamura, black: caruana,  result: '1/2-1/2' },
              { board: 2, white: firouzja, black: carlsen,  result: '0-1' },
              { board: 3, white: giri,     black: pragg,    result: '1/2-1/2' },
              { board: 4, white: nodi,     black: nepo,     result: '1/2-1/2' },
            ],
          },
          {
            roundNumber: 3, status: 'ONGOING', date: '2024-08-22',
            pairings: [
              { board: 1, white: carlsen,  black: giri,     result: '*' },
              { board: 2, white: caruana,  black: nodi,     result: '*' },
              { board: 3, white: nakamura, black: pragg,    result: '*' },
              { board: 4, white: firouzja, black: nepo,     result: '*' },
            ],
          },
        ],
        standings: [
          { rank: 1, player: carlsen,  score: 2.0, wins: 2, draws: 0, losses: 0, gamesPlayed: 2 },
          { rank: 2, player: caruana,  score: 1.5, wins: 1, draws: 1, losses: 0, gamesPlayed: 2 },
          { rank: 3, player: pragg,    score: 1.5, wins: 1, draws: 1, losses: 0, gamesPlayed: 2 },
          { rank: 4, player: nakamura, score: 1.0, wins: 0, draws: 2, losses: 0, gamesPlayed: 2 },
          { rank: 5, player: nepo,     score: 1.0, wins: 0, draws: 2, losses: 0, gamesPlayed: 2 },
          { rank: 6, player: giri,     score: 1.0, wins: 0, draws: 2, losses: 0, gamesPlayed: 2 },
          { rank: 7, player: nodi,     score: 0.5, wins: 0, draws: 1, losses: 1, gamesPlayed: 2 },
          { rank: 8, player: firouzja, score: 0.5, wins: 0, draws: 1, losses: 1, gamesPlayed: 2 },
        ],
        timeline: [
          { date: '2024-08-20', title: 'Round 1', description: 'Caruana and Pragg score early wins', type: 'round_end', roundNumber: 1 },
          { date: '2024-08-21', title: 'Round 2', description: 'Carlsen defeats Firouzja to lead', type: 'round_end', roundNumber: 2 },
          { date: '2024-08-22', title: 'Round 3 In Progress', description: 'All four games currently being played', type: 'round_start', roundNumber: 3 },
        ],
      },
    };

    const detail = detailMap[slug];
    return {
      ...card,
      description: detail?.description,
      playerCount: detail?.playerCount ?? 10,
      rounds: detail?.rounds ?? [],
      standings: detail?.standings ?? [],
      timeline: detail?.timeline ?? [],
    };
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
