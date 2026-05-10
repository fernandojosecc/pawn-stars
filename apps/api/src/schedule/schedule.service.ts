import { Injectable } from '@nestjs/common';

type EventType = 'match' | 'tournament' | 'training' | 'media';
type EventStatus = 'upcoming' | 'live' | 'completed' | 'cancelled';

export interface ScheduleEvent {
  id: string;
  type: EventType;
  title: string;
  subtitle?: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  url?: string;
  status: EventStatus;
}

export interface DayEvents {
  date: string;
  events: ScheduleEvent[];
}

export interface CalendarMonth {
  year: number;
  month: number;
  days: DayEvents[];
}

@Injectable()
export class ScheduleService {
  private readonly mockEvents: ScheduleEvent[] = [
    // ── August 2024 ──────────────────────────────────────────────
    { id: 'ev-001', type: 'training',   title: 'Team Training',         date: '2024-08-03', startTime: '10:00', endTime: '13:00', location: 'Training Centre', status: 'completed' },
    { id: 'ev-002', type: 'training',   title: 'Opening Preparation',   date: '2024-08-07', startTime: '10:00', endTime: '13:00', location: 'Training Centre', status: 'completed' },
    { id: 'ev-003', type: 'training',   title: 'Endgame Workshop',      date: '2024-08-10', startTime: '10:00', endTime: '13:00', location: 'Training Centre', status: 'completed' },
    { id: 'ev-004', type: 'tournament', title: 'Sinquefield Cup — R1',  date: '2024-08-15', startTime: '14:00', location: 'St. Louis, USA',  url: '/tournaments/sinquefield-cup-2024', status: 'completed' },
    { id: 'ev-005', type: 'training',   title: 'Tactical Training',     date: '2024-08-16', startTime: '10:00', endTime: '13:00', location: 'Training Centre', status: 'completed' },
    { id: 'ev-006', type: 'tournament', title: 'Sinquefield Cup — R2',  date: '2024-08-17', startTime: '14:00', location: 'St. Louis, USA',  url: '/tournaments/sinquefield-cup-2024', status: 'completed' },
    { id: 'ev-007', type: 'media',      title: 'Pre-tournament Press',  date: '2024-08-18', startTime: '11:00', endTime: '12:00', location: 'Media Room', status: 'completed' },
    { id: 'ev-008', type: 'match',      title: 'vs Rook Warriors',      subtitle: 'Pawn Stars 5.5–2.5', date: '2024-08-20', startTime: '16:00', location: 'Home Arena', url: '/matches/match-001', status: 'completed' },
    { id: 'ev-009', type: 'tournament', title: 'Sinquefield Cup — R3',  date: '2024-08-21', startTime: '14:00', location: 'St. Louis, USA',  url: '/tournaments/sinquefield-cup-2024', status: 'live' },
    { id: 'ev-010', type: 'training',   title: 'Team Training',         date: '2024-08-24', startTime: '10:00', endTime: '13:00', location: 'Training Centre', status: 'upcoming' },
    { id: 'ev-011', type: 'media',      title: 'Chess.com Interview',   date: '2024-08-27', startTime: '15:00', endTime: '16:00', location: 'Online', status: 'upcoming' },
    { id: 'ev-012', type: 'tournament', title: 'Sinquefield Cup — R4',  date: '2024-08-28', startTime: '14:00', location: 'St. Louis, USA',  url: '/tournaments/sinquefield-cup-2024', status: 'upcoming' },

    // ── September 2024 ───────────────────────────────────────────
    { id: 'ev-013', type: 'training',   title: 'Team Training',         date: '2024-09-01', startTime: '10:00', endTime: '13:00', location: 'Training Centre', status: 'upcoming' },
    { id: 'ev-014', type: 'tournament', title: 'Sinquefield Cup — Final Round', date: '2024-09-04', startTime: '14:00', location: 'St. Louis, USA', url: '/tournaments/sinquefield-cup-2024', status: 'upcoming' },
    { id: 'ev-015', type: 'media',      title: 'Post-tournament Press', date: '2024-09-05', startTime: '11:00', endTime: '12:00', location: 'Media Room', status: 'upcoming' },
    { id: 'ev-016', type: 'training',   title: 'Rapid Chess Drills',    date: '2024-09-08', startTime: '10:00', endTime: '13:00', location: 'Training Centre', status: 'upcoming' },
    { id: 'ev-017', type: 'match',      title: 'vs Bishop Brigade',     date: '2024-09-12', startTime: '16:00', location: 'Away', url: '/matches/match-002', status: 'upcoming' },
    { id: 'ev-018', type: 'training',   title: 'Team Training',         date: '2024-09-14', startTime: '10:00', endTime: '13:00', location: 'Training Centre', status: 'upcoming' },
    { id: 'ev-019', type: 'media',      title: 'Squad Announcement',    date: '2024-09-18', startTime: '14:00', endTime: '15:00', location: 'Club HQ', status: 'upcoming' },
    { id: 'ev-020', type: 'training',   title: 'Positional Play',       date: '2024-09-21', startTime: '10:00', endTime: '13:00', location: 'Training Centre', status: 'upcoming' },
    { id: 'ev-021', type: 'match',      title: 'vs Knight Riders',      date: '2024-09-25', startTime: '16:00', location: 'Home Arena', url: '/matches/match-003', status: 'upcoming' },
    { id: 'ev-022', type: 'training',   title: 'Blitz Practice',        date: '2024-09-28', startTime: '10:00', endTime: '13:00', location: 'Training Centre', status: 'upcoming' },

    // ── October 2024 ─────────────────────────────────────────────
    { id: 'ev-023', type: 'media',      title: 'Monthly Press Briefing', date: '2024-10-01', startTime: '11:00', endTime: '12:00', location: 'Media Room', status: 'upcoming' },
    { id: 'ev-024', type: 'training',   title: 'Team Training',          date: '2024-10-05', startTime: '10:00', endTime: '13:00', location: 'Training Centre', status: 'upcoming' },
    { id: 'ev-025', type: 'match',      title: "vs Queen's Gambit FC",   date: '2024-10-09', startTime: '16:00', location: 'Away', status: 'upcoming' },
    { id: 'ev-026', type: 'training',   title: 'Opening Lab',            date: '2024-10-12', startTime: '10:00', endTime: '13:00', location: 'Training Centre', status: 'upcoming' },
    { id: 'ev-027', type: 'tournament', title: 'FIDE GP — Draw Ceremony', date: '2024-10-15', startTime: '14:00', location: 'Berlin, Germany', status: 'upcoming' },
    { id: 'ev-028', type: 'tournament', title: 'FIDE Grand Prix — R1',   date: '2024-10-17', startTime: '14:00', location: 'Berlin, Germany', url: '/tournaments/fide-grand-prix-berlin-2022', status: 'upcoming' },
    { id: 'ev-029', type: 'training',   title: 'Team Training',          date: '2024-10-19', startTime: '10:00', endTime: '13:00', location: 'Training Centre', status: 'upcoming' },
    { id: 'ev-030', type: 'tournament', title: 'FIDE Grand Prix — R2',   date: '2024-10-20', startTime: '14:00', location: 'Berlin, Germany', status: 'upcoming' },
    { id: 'ev-031', type: 'media',      title: 'Sponsor Visit',          date: '2024-10-22', startTime: '13:00', endTime: '15:00', location: 'Club HQ', status: 'upcoming' },
    { id: 'ev-032', type: 'tournament', title: 'FIDE Grand Prix — R3',   date: '2024-10-23', startTime: '14:00', location: 'Berlin, Germany', status: 'upcoming' },
    { id: 'ev-033', type: 'match',      title: 'vs Endgame Elite',       date: '2024-10-24', startTime: '16:00', location: 'Home Arena', status: 'upcoming' },
    { id: 'ev-034', type: 'training',   title: 'Pre-match Prep',         date: '2024-10-26', startTime: '10:00', endTime: '13:00', location: 'Training Centre', status: 'upcoming' },
    { id: 'ev-035', type: 'tournament', title: 'FIDE Grand Prix — Final', date: '2024-10-28', startTime: '14:00', location: 'Berlin, Germany', status: 'upcoming' },
  ];

  async findByMonth(year: number, month: number): Promise<CalendarMonth> {
    const prefix = `${year}-${String(month).padStart(2, '0')}`;
    const matching = this.mockEvents.filter(e => e.date.startsWith(prefix));

    const map = new Map<string, ScheduleEvent[]>();
    for (const event of matching) {
      const existing = map.get(event.date) ?? [];
      existing.push(event);
      map.set(event.date, existing);
    }

    const days: DayEvents[] = Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, events]) => ({ date, events }));

    return { year, month, days };
  }

  async findAll(): Promise<ScheduleEvent[]> {
    return this.mockEvents;
  }
}
