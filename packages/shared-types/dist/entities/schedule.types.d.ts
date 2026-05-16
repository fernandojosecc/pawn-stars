export type EventType = 'match' | 'tournament' | 'training' | 'media';
export type EventStatus = 'upcoming' | 'live' | 'completed' | 'cancelled';
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
//# sourceMappingURL=schedule.types.d.ts.map