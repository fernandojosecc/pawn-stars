export type RatingModality = 'classical' | 'rapid' | 'blitz'

export type FormResult = 'W' | 'D' | 'L'

export interface TeamRanking {
  rank: number
  teamId: string
  teamName: string
  teamShortName?: string
  teamLogoUrl?: string
  season: string
  played: number
  won: number
  drawn: number
  lost: number
  points: number
  matchPoints: number
  form: FormResult[]
}

export interface PlayerRanking {
  rank: number
  playerId: string
  playerName: string
  playerTitle?: string
  playerNationality?: string
  playerPhotoUrl?: string
  modality: RatingModality
  rating: number
  ratingChange: number
  gamesPlayed: number
  wins: number
  draws: number
  losses: number
  winRate: number
}

export interface EloDataPoint {
  date: string
  rating: number
}

export interface PlayerEloHistory {
  playerId: string
  playerName: string
  color: string
  dataPoints: EloDataPoint[]
}
