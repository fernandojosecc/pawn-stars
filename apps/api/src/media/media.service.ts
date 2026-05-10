import { Injectable } from '@nestjs/common';

type MediaType = 'photo' | 'video' | 'document';

export interface MediaAsset {
  id: string;
  type: MediaType;
  title: string;
  description?: string;
  tournamentSlug?: string;
  tournamentName?: string;
  uploadedAt: string;
  tags?: string[];
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  duration?: string;
  fileType?: 'PDF' | 'DOCX' | 'XLSX';
  fileSize?: string;
}

export interface MediaGallery {
  photos: MediaAsset[];
  videos: MediaAsset[];
  documents: MediaAsset[];
  total: number;
}

@Injectable()
export class MediaService {
  private readonly mockAssets: MediaAsset[] = [
    // ── Photos ──────────────────────────────────────────────────
    { id: 'ph-001', type: 'photo', title: 'Carlsen in concentration', description: 'Magnus studies the position in round 3', tournamentSlug: 'tata-steel-masters-2024', tournamentName: 'Tata Steel 2024', aspectRatio: 'landscape', uploadedAt: '2024-01-14', tags: ['carlsen', 'classical'] },
    { id: 'ph-002', type: 'photo', title: 'Team celebration', description: 'Pawn Stars celebrate after the 5.5–2.5 win over Rook Warriors', aspectRatio: 'landscape', uploadedAt: '2024-08-20', tags: ['team', 'match', 'celebration'] },
    { id: 'ph-003', type: 'photo', title: 'Caruana vs Firouzja — Board 1', description: 'The critical moment in round 2 of Tata Steel', tournamentSlug: 'tata-steel-masters-2024', tournamentName: 'Tata Steel 2024', aspectRatio: 'square', uploadedAt: '2024-01-13', tags: ['caruana', 'firouzja'] },
    { id: 'ph-004', type: 'photo', title: 'Nakamura portrait', description: 'Hikaru Nakamura ahead of the Sinquefield Cup', tournamentSlug: 'sinquefield-cup-2024', tournamentName: 'Sinquefield Cup 2024', aspectRatio: 'portrait', uploadedAt: '2024-08-19', tags: ['nakamura', 'portrait'] },
    { id: 'ph-005', type: 'photo', title: 'Opening ceremony', description: 'Tata Steel opening ceremony at De Moriaan cultural centre', tournamentSlug: 'tata-steel-masters-2024', tournamentName: 'Tata Steel 2024', aspectRatio: 'landscape', uploadedAt: '2024-01-12', tags: ['ceremony', 'tata-steel'] },
    { id: 'ph-006', type: 'photo', title: 'Firouzja mid-game', description: 'Alireza Firouzja deep in thought at board 1', tournamentSlug: 'sinquefield-cup-2024', tournamentName: 'Sinquefield Cup 2024', aspectRatio: 'portrait', uploadedAt: '2024-08-20', tags: ['firouzja', 'concentration'] },
    { id: 'ph-007', type: 'photo', title: 'Giri handshake', description: 'Post-game handshake after the round 3 draw', tournamentSlug: 'tata-steel-masters-2024', tournamentName: 'Tata Steel 2024', aspectRatio: 'landscape', uploadedAt: '2024-01-14', tags: ['giri', 'sportsmanship'] },
    { id: 'ph-008', type: 'photo', title: 'Team training session', description: 'Squad preparation session at the training centre', aspectRatio: 'landscape', uploadedAt: '2024-08-07', tags: ['training', 'team'] },
    { id: 'ph-009', type: 'photo', title: 'Pragg — youngest starter', description: 'R. Praggnanandhaa makes his debut for Pawn Stars', aspectRatio: 'portrait', uploadedAt: '2024-08-20', tags: ['pragg', 'debut'] },
    { id: 'ph-010', type: 'photo', title: 'Wijk aan Zee seafront', description: 'The iconic Dutch coastal town hosting Tata Steel', tournamentSlug: 'tata-steel-masters-2024', tournamentName: 'Tata Steel 2024', aspectRatio: 'landscape', uploadedAt: '2024-01-12', tags: ['venue', 'wijk-aan-zee'] },
    { id: 'ph-011', type: 'photo', title: 'Nepo analysis', description: 'Ian Nepomniachtchi analyses with the team after round 2', tournamentSlug: 'sinquefield-cup-2024', tournamentName: 'Sinquefield Cup 2024', aspectRatio: 'square', uploadedAt: '2024-08-21', tags: ['nepo', 'analysis'] },
    { id: 'ph-012', type: 'photo', title: 'Trophy presentation', description: 'Carlsen receives the Tata Steel trophy for the 10th time', tournamentSlug: 'tata-steel-masters-2024', tournamentName: 'Tata Steel 2024', aspectRatio: 'landscape', uploadedAt: '2024-01-28', tags: ['carlsen', 'trophy', 'winner'] },

    // ── Videos ──────────────────────────────────────────────────
    { id: 'vd-001', type: 'video', title: 'Match Highlights — vs Rook Warriors', description: 'Best moments from the 5.5–2.5 win', duration: '4:32', uploadedAt: '2024-08-20', tags: ['match', 'highlights'] },
    { id: 'vd-002', type: 'video', title: 'Carlsen Interview — Tata Steel R3', description: 'Post-round interview after the key win with black', tournamentSlug: 'tata-steel-masters-2024', tournamentName: 'Tata Steel 2024', duration: '7:15', uploadedAt: '2024-01-14', tags: ['carlsen', 'interview'] },
    { id: 'vd-003', type: 'video', title: 'Opening Ceremony Recap', description: 'Full highlight reel from the Tata Steel opening', tournamentSlug: 'tata-steel-masters-2024', tournamentName: 'Tata Steel 2024', duration: '2:48', uploadedAt: '2024-01-12', tags: ['ceremony'] },
    { id: 'vd-004', type: 'video', title: 'Training Ground Tour', description: 'Inside look at the Pawn Stars training facility', duration: '5:20', uploadedAt: '2024-08-07', tags: ['training', 'behind-the-scenes'] },
    { id: 'vd-005', type: 'video', title: 'Sinquefield R2 — Carlsen vs Firouzja', description: 'Full game replay with computer evaluation', tournamentSlug: 'sinquefield-cup-2024', tournamentName: 'Sinquefield Cup 2024', duration: '18:44', uploadedAt: '2024-08-21', tags: ['carlsen', 'firouzja', 'game-replay'] },
    { id: 'vd-006', type: 'video', title: 'Press Conference — Season Preview', description: 'Head coach and captain on the 2024-25 season goals', duration: '12:03', uploadedAt: '2024-08-01', tags: ['press', 'season-preview'] },
    { id: 'vd-007', type: 'video', title: 'Nakamura Rapid Masterclass', description: 'Hikaru breaks down his favourite rapid openings', duration: '22:10', uploadedAt: '2024-09-18', tags: ['nakamura', 'masterclass', 'rapid'] },

    // ── Documents ───────────────────────────────────────────────
    { id: 'dc-001', type: 'document', title: 'Pawn Stars Press Kit 2024–25', description: 'Official press kit with logos, bios and club history', fileType: 'PDF', fileSize: '8.4 MB', uploadedAt: '2024-08-01', tags: ['press-kit', 'branding'] },
    { id: 'dc-002', type: 'document', title: 'Team Sheet — vs Rook Warriors', description: 'Official lineup and board assignments for the match', fileType: 'PDF', fileSize: '340 KB', uploadedAt: '2024-08-20', tags: ['team-sheet', 'match'] },
    { id: 'dc-003', type: 'document', title: 'Tata Steel 2024 — Tournament Program', description: 'Full programme booklet including player bios and schedule', tournamentSlug: 'tata-steel-masters-2024', tournamentName: 'Tata Steel 2024', fileType: 'PDF', fileSize: '5.1 MB', uploadedAt: '2024-01-12', tags: ['program', 'tata-steel'] },
    { id: 'dc-004', type: 'document', title: 'Season Statistics 2023–24', description: 'Full statistical breakdown of the previous season', fileType: 'XLSX', fileSize: '1.2 MB', uploadedAt: '2024-07-15', tags: ['statistics', 'season'] },
    { id: 'dc-005', type: 'document', title: 'Sponsorship Prospectus 2024–25', description: 'Partnership opportunities and commercial packages', fileType: 'PDF', fileSize: '3.7 MB', uploadedAt: '2024-08-01', tags: ['sponsorship', 'commercial'] },
    { id: 'dc-006', type: 'document', title: 'Match Report — vs Rook Warriors', description: 'Official post-match report and analysis', fileType: 'PDF', fileSize: '890 KB', uploadedAt: '2024-08-21', tags: ['match-report'] },
  ];

  async findAll(type?: string, tournamentSlug?: string, page = 1, limit = 50): Promise<MediaGallery & { page: number; limit: number }> {
    let filtered = [...this.mockAssets];
    if (type) filtered = filtered.filter(a => a.type === type);
    if (tournamentSlug) filtered = filtered.filter(a => a.tournamentSlug === tournamentSlug);

    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return {
      photos:    paginated.filter(a => a.type === 'photo'),
      videos:    paginated.filter(a => a.type === 'video'),
      documents: paginated.filter(a => a.type === 'document'),
      total:     filtered.length,
      page,
      limit,
    };
  }

  getTournaments(): { slug: string; name: string }[] {
    const seen = new Map<string, string>();
    for (const a of this.mockAssets) {
      if (a.tournamentSlug && a.tournamentName) seen.set(a.tournamentSlug, a.tournamentName);
    }
    return Array.from(seen.entries()).map(([slug, name]) => ({ slug, name }));
  }
}
