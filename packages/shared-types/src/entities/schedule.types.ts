export type EventType = 'match' | 'tournament' | 'training' | 'media'

export type EventStatus = 'upcoming' | 'live' | 'completed' | 'cancelled'

export interface ScheduleEvent {
  id: string
  type: EventType
  title: string
  subtitle?: string
  date: string        // "YYYY-MM-DD"
  startTime?: string  // "HH:MM" 24h
  endTime?: string
  location?: string
  url?: string        // deep link to match/tournament detail
  status: EventStatus
}

export interface DayEvents {
  date: string        // "YYYY-MM-DD"
  events: ScheduleEvent[]
}

export interface CalendarMonth {
  year: number
  month: number       // 1–12
  days: DayEvents[]
}
