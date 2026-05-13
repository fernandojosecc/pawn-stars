import type { Metadata } from 'next'
import { SeasonSummary, SeasonStatus } from '@pawn-stars/shared-types'
import { SeasonCard } from '@/components/seasons/SeasonCard'
import { Heading } from '@/components/typography/Heading'
import { Body } from '@/components/typography/Body'

export const metadata: Metadata = {
  title: 'Season Archive',
  description:
    'Browse every Pawn Stars competitive season — active campaigns, completed seasons with final standings, and historical player performance stats.',
  alternates: { canonical: 'https://pawnstars.com/seasons' },
  openGraph: {
    title: 'Season Archive — Pawn Stars',
    description: 'Complete history of Pawn Stars competitive seasons, records, and top performers.',
    type: 'website',
    url: 'https://pawnstars.com/seasons',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Pawn Stars Season Archive' }],
  },
}

// Mock data — replace with API call when backend is connected
const mockSeasons: SeasonSummary[] = [
  {
    id: 'season-2024',
    slug: '2024-25',
    name: '2024–25 Season',
    status: SeasonStatus.ACTIVE,
    startDate: new Date('2024-09-01'),
    tournamentCount: 4,
    completedTournamentCount: 1,
    totalGames: 17,
    wins: 8,
    draws: 8,
    losses: 1,
    winRate: 0.47,
    topPlayer: {
      playerId: '1', playerName: 'Magnus Carlsen', playerTitle: 'GM',
      playerNationality: 'NOR', averagePerformanceRating: 2861, gamesPlayed: 17, winRate: 0.47,
    },
    teamRatingAverage: 2818,
  },
  {
    id: 'season-2023',
    slug: '2023-24',
    name: '2023–24 Season',
    status: SeasonStatus.COMPLETED,
    startDate: new Date('2023-09-01'),
    endDate: new Date('2024-08-31'),
    tournamentCount: 4,
    completedTournamentCount: 4,
    totalGames: 39,
    wins: 18,
    draws: 16,
    losses: 5,
    winRate: 0.46,
    topPlayer: {
      playerId: '1', playerName: 'Magnus Carlsen', playerTitle: 'GM',
      playerNationality: 'NOR', averagePerformanceRating: 2848, gamesPlayed: 39, winRate: 0.46,
    },
    teamRatingAverage: 2806,
  },
  {
    id: 'season-2022',
    slug: '2022-23',
    name: '2022–23 Season',
    status: SeasonStatus.COMPLETED,
    startDate: new Date('2022-09-01'),
    endDate: new Date('2023-08-31'),
    tournamentCount: 3,
    completedTournamentCount: 3,
    totalGames: 31,
    wins: 13,
    draws: 12,
    losses: 6,
    winRate: 0.42,
    topPlayer: {
      playerId: '3', playerName: 'Fabiano Caruana', playerTitle: 'GM',
      playerNationality: 'USA', averagePerformanceRating: 2822, gamesPlayed: 31, winRate: 0.39,
    },
    teamRatingAverage: 2790,
  },
]

export default function SeasonsPage() {
  const active    = mockSeasons.filter(s => s.status === SeasonStatus.ACTIVE)
  const completed = mockSeasons.filter(s => s.status === SeasonStatus.COMPLETED)

  const totalGames  = mockSeasons.reduce((n, s) => n + s.totalGames, 0)
  const totalWins   = mockSeasons.reduce((n, s) => n + s.wins, 0)
  const totalDraws  = mockSeasons.reduce((n, s) => n + s.draws, 0)
  const totalLosses = mockSeasons.reduce((n, s) => n + s.losses, 0)

  return (
    <div className="min-h-screen bg-primary-50">
      {/* ── hero ── */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heading level="h1" className="mb-3">Season Archive</Heading>
          <Body size="lg" className="text-primary-600 max-w-2xl mx-auto">
            Every Pawn Stars season — results, records, and the players who defined each campaign.
          </Body>
        </div>
      </section>

      {/* ── all-time summary ── */}
      <section className="bg-primary-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { label: 'Seasons',    value: mockSeasons.length },
              { label: 'Games',      value: totalGames },
              { label: 'Wins',       value: totalWins },
              { label: 'All-time W%', value: `${Math.round((totalWins / totalGames) * 100)}%` },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-primary-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── active season ── */}
      {active.length > 0 && (
        <section className="py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Heading level="h2" className="mb-5">Current Season</Heading>
            <div className="grid gap-5 sm:grid-cols-1">
              {active.map(s => <SeasonCard key={s.id} season={s} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── completed seasons ── */}
      {completed.length > 0 && (
        <section className="py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Heading level="h2" className="mb-5">Past Seasons</Heading>
            <div className="grid gap-5 sm:grid-cols-2">
              {completed.map(s => <SeasonCard key={s.id} season={s} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
