import { Injectable } from '@nestjs/common';

type SponsorTier = 'title' | 'gold' | 'silver' | 'partner';

export interface Sponsor {
  id: string;
  name: string;
  tier: SponsorTier;
  description?: string;
  websiteUrl?: string;
  industry?: string;
  logoText?: string;
  since?: number;
}

export interface SponsorsPage {
  title:   Sponsor[];
  gold:    Sponsor[];
  silver:  Sponsor[];
  partner: Sponsor[];
  total:   number;
}

@Injectable()
export class SponsorsService {
  private readonly mockSponsors: Sponsor[] = [
    // Title
    {
      id: 'sp-001',
      name: 'Grandmaster Capital',
      tier: 'title',
      description: 'A leading European investment firm backing elite chess talent and club infrastructure since 2020. Grandmaster Capital believes strategic thinking at the board mirrors strategic thinking in finance.',
      websiteUrl: 'https://grandmastercapital.example',
      industry: 'Financial Services',
      logoText: 'GC',
      since: 2020,
    },
    // Gold
    {
      id: 'sp-002',
      name: 'KnightMoves Energy',
      tier: 'gold',
      description: 'Renewable energy provider powering the next generation of chess champions and sustainable sports infrastructure.',
      websiteUrl: 'https://knightmovesenergy.example',
      industry: 'Clean Energy',
      logoText: 'KM',
      since: 2022,
    },
    {
      id: 'sp-003',
      name: 'RookTech Systems',
      tier: 'gold',
      description: 'Enterprise software solutions provider and proud supporter of the Pawn Stars digital training programme.',
      websiteUrl: 'https://rooktech.example',
      industry: 'Technology',
      logoText: 'RT',
      since: 2021,
    },
    // Silver
    {
      id: 'sp-004',
      name: 'Pawnbrokers Insurance',
      tier: 'silver',
      description: 'Specialist sports insurance covering professional chess players and club operations worldwide.',
      websiteUrl: 'https://pawnbrokers.example',
      industry: 'Insurance',
      logoText: 'PI',
      since: 2023,
    },
    {
      id: 'sp-005',
      name: 'BoardRoom Analytics',
      tier: 'silver',
      description: 'Data analytics platform delivering real-time insights for clubs, coaches and competitive players.',
      websiteUrl: 'https://boardroomanalytics.example',
      industry: 'Data & Analytics',
      logoText: 'BA',
      since: 2022,
    },
    {
      id: 'sp-006',
      name: 'Checkmate Coffee',
      tier: 'silver',
      description: 'Specialty coffee roasters fuelling long training sessions and post-match analysis. Official coffee of Pawn Stars.',
      websiteUrl: 'https://checkmatecoffee.example',
      industry: 'Food & Beverage',
      logoText: 'CC',
      since: 2023,
    },
    // Partner
    {
      id: 'sp-007',
      name: 'Chess.com',
      tier: 'partner',
      description: 'The world\'s largest chess platform and official online training partner of Pawn Stars.',
      websiteUrl: 'https://chess.com',
      industry: 'Chess Platform',
      logoText: 'Ch',
      since: 2021,
    },
    {
      id: 'sp-008',
      name: 'ChessBase',
      tier: 'partner',
      description: 'Professional chess database and analysis software used by every Pawn Stars player in their preparation.',
      websiteUrl: 'https://chessbase.com',
      industry: 'Chess Software',
      logoText: 'CB',
      since: 2020,
    },
  ];

  async findAll(): Promise<SponsorsPage> {
    const byTier = (tier: SponsorTier) => this.mockSponsors.filter(s => s.tier === tier);
    return {
      title:   byTier('title'),
      gold:    byTier('gold'),
      silver:  byTier('silver'),
      partner: byTier('partner'),
      total:   this.mockSponsors.length,
    };
  }
}
