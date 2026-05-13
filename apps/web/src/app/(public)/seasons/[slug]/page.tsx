import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SeasonDetail, SeasonStatus } from '@pawn-stars/shared-types'
import { SeasonStatusBadge } from '@/components/seasons/SeasonStatusBadge'
import { TournamentsTable } from '@/components/seasons/TournamentsTable'
import { PlayerPerformanceTable } from '@/components/seasons/PlayerPerformanceTable'
import { TeamRecordTimeline } from '@/components/seasons/TeamRecordTimeline'
import { Heading } from '@/components/typography/Heading'
import { Body } from '@/components/typography/Body'
import Link from 'next/link'

// Mock data — replace with API call when backend is connected
const mockSeasons: SeasonDetail[] = [
  {
    id: 'season-2024',
    slug: '2024-25',
    name: '2024–25 Season',
    status: SeasonStatus.ACTIVE,
    startDate: new Date('2024-09-01'),
    description:
      'The current active season. Tata Steel Masters concluded with a dominant first-place finish. ' +
      'The Sinquefield Cup is underway, with two more marquee events still to come.',
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
    tournaments: [
      {
        tournamentId: '1', tournamentName: 'Tata Steel Masters 2024',
        tournamentSlug: 'tata-steel-masters-2024', format: 'Round-Robin',
        status: 'COMPLETED', location: 'Wijk aan Zee, Netherlands',
        startDate: new Date('2024-01-12'), endDate: new Date('2024-01-28'),
        teamFinish: '1st', gamesPlayed: 13, wins: 6, draws: 6, losses: 1,
      },
      {
        tournamentId: '12', tournamentName: 'Sinquefield Cup 2024',
        tournamentSlug: 'sinquefield-cup-2024', format: 'Round-Robin',
        status: 'ONGOING', location: 'St. Louis, USA',
        startDate: new Date('2024-08-20'), endDate: new Date('2024-09-05'),
        gamesPlayed: 4, wins: 2, draws: 2, losses: 0,
      },
      {
        tournamentId: '10', tournamentName: 'Candidates Tournament 2024',
        tournamentSlug: 'candidates-tournament-2024', format: 'Round-Robin',
        status: 'UPCOMING', location: 'Toronto, Canada',
        startDate: new Date('2024-04-03'), endDate: new Date('2024-04-22'),
        gamesPlayed: 0, wins: 0, draws: 0, losses: 0,
      },
      {
        tournamentId: '11', tournamentName: 'World Chess Championship 2024',
        tournamentSlug: 'world-chess-championship-2024', format: 'Knockout',
        status: 'UPCOMING', location: 'New York, USA',
        startDate: new Date('2024-11-20'), endDate: new Date('2024-12-15'),
        gamesPlayed: 0, wins: 0, draws: 0, losses: 0,
      },
    ],
    topPerformers: [
      {
        playerId: '1', playerName: 'Magnus Carlsen', playerTitle: 'GM', playerNationality: 'NOR',
        tournamentsPlayed: 2, totalGames: 17, wins: 8, draws: 8, losses: 1,
        winRate: 0.47, averagePerformanceRating: 2861, averageOpponentRating: 2754, bestTournamentFinish: '1st',
      },
      {
        playerId: '3', playerName: 'Fabiano Caruana', playerTitle: 'GM', playerNationality: 'USA',
        tournamentsPlayed: 2, totalGames: 17, wins: 7, draws: 8, losses: 2,
        winRate: 0.41, averagePerformanceRating: 2830, averageOpponentRating: 2748, bestTournamentFinish: '2nd',
      },
      {
        playerId: '10', playerName: 'Hikaru Nakamura', playerTitle: 'GM', playerNationality: 'USA',
        tournamentsPlayed: 2, totalGames: 17, wins: 7, draws: 7, losses: 3,
        winRate: 0.41, averagePerformanceRating: 2795, averageOpponentRating: 2744, bestTournamentFinish: '2nd',
      },
    ],
  },
  {
    id: 'season-2023',
    slug: '2023-24',
    name: '2023–24 Season',
    status: SeasonStatus.COMPLETED,
    startDate: new Date('2023-09-01'),
    endDate: new Date('2024-08-31'),
    description:
      'A landmark season with four major titles contested. The squad claimed two first-place finishes ' +
      'and produced its best collective performance rating to date.',
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
    tournaments: [
      {
        tournamentId: '4', tournamentName: 'Candidates Tournament 2023',
        tournamentSlug: 'candidates-tournament-2023', format: 'Round-Robin',
        status: 'COMPLETED', location: 'Toronto, Canada',
        startDate: new Date('2023-04-15'), endDate: new Date('2023-05-05'),
        teamFinish: '1st', gamesPlayed: 14, wins: 7, draws: 5, losses: 2,
      },
      {
        tournamentId: '5', tournamentName: 'Norway Chess 2023',
        tournamentSlug: 'norway-chess-2023', format: 'Round-Robin',
        status: 'COMPLETED', location: 'Stavanger, Norway',
        startDate: new Date('2023-05-30'), endDate: new Date('2023-06-10'),
        teamFinish: '3rd', gamesPlayed: 9, wins: 3, draws: 5, losses: 1,
      },
      {
        tournamentId: '3', tournamentName: 'Sinquefield Cup 2023',
        tournamentSlug: 'sinquefield-cup-2023', format: 'Round-Robin',
        status: 'COMPLETED', location: 'St. Louis, USA',
        startDate: new Date('2023-09-01'), endDate: new Date('2023-09-15'),
        teamFinish: '2nd', gamesPlayed: 9, wins: 4, draws: 4, losses: 1,
      },
      {
        tournamentId: '2', tournamentName: 'World Chess Championship 2023',
        tournamentSlug: 'world-chess-championship-2023', format: 'Knockout',
        status: 'COMPLETED', location: 'Dubai, UAE',
        startDate: new Date('2023-11-20'), endDate: new Date('2023-12-15'),
        teamFinish: '1st', gamesPlayed: 7, wins: 3, draws: 4, losses: 0,
      },
    ],
    topPerformers: [
      {
        playerId: '1', playerName: 'Magnus Carlsen', playerTitle: 'GM', playerNationality: 'NOR',
        tournamentsPlayed: 4, totalGames: 39, wins: 18, draws: 16, losses: 5,
        winRate: 0.46, averagePerformanceRating: 2848, averageOpponentRating: 2761, bestTournamentFinish: '1st',
      },
      {
        playerId: '3', playerName: 'Fabiano Caruana', playerTitle: 'GM', playerNationality: 'USA',
        tournamentsPlayed: 4, totalGames: 39, wins: 14, draws: 18, losses: 7,
        winRate: 0.36, averagePerformanceRating: 2808, averageOpponentRating: 2758, bestTournamentFinish: '1st',
      },
      {
        playerId: '10', playerName: 'Hikaru Nakamura', playerTitle: 'GM', playerNationality: 'USA',
        tournamentsPlayed: 4, totalGames: 39, wins: 13, draws: 19, losses: 7,
        winRate: 0.33, averagePerformanceRating: 2793, averageOpponentRating: 2755, bestTournamentFinish: '2nd',
      },
    ],
  },
  {
    id: 'season-2022',
    slug: '2022-23',
    name: '2022–23 Season',
    status: SeasonStatus.COMPLETED,
    startDate: new Date('2022-09-01'),
    endDate: new Date('2023-08-31'),
    description:
      'The founding competitive season. Back-to-back gold medals at the Olympiad and Grand Prix ' +
      'established Pawn Stars as an elite squad. Caruana led all performers.',
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
    tournaments: [
      {
        tournamentId: '8', tournamentName: 'Chess Olympiad 2022',
        tournamentSlug: 'olympiad-2022', format: 'Swiss',
        status: 'COMPLETED', location: 'Chennai, India',
        startDate: new Date('2022-07-28'), endDate: new Date('2022-08-10'),
        teamFinish: '1st', gamesPlayed: 12, wins: 7, draws: 3, losses: 2,
      },
      {
        tournamentId: '7', tournamentName: 'FIDE Grand Prix Berlin 2022',
        tournamentSlug: 'fide-grand-prix-berlin-2022', format: 'Knockout',
        status: 'COMPLETED', location: 'Berlin, Germany',
        startDate: new Date('2022-10-15'), endDate: new Date('2022-10-25'),
        teamFinish: '1st', gamesPlayed: 8, wins: 4, draws: 3, losses: 1,
      },
      {
        tournamentId: '6', tournamentName: 'World Rapid Championship 2022',
        tournamentSlug: 'world-rapid-championship-2022', format: 'Swiss',
        status: 'COMPLETED', location: 'Samarkand, Uzbekistan',
        startDate: new Date('2022-12-25'), endDate: new Date('2022-12-30'),
        teamFinish: '2nd', gamesPlayed: 11, wins: 5, draws: 4, losses: 2,
      },
    ],
    topPerformers: [
      {
        playerId: '3', playerName: 'Fabiano Caruana', playerTitle: 'GM', playerNationality: 'USA',
        tournamentsPlayed: 3, totalGames: 31, wins: 12, draws: 13, losses: 6,
        winRate: 0.39, averagePerformanceRating: 2822, averageOpponentRating: 2745, bestTournamentFinish: '1st',
      },
      {
        playerId: '1', playerName: 'Magnus Carlsen', playerTitle: 'GM', playerNationality: 'NOR',
        tournamentsPlayed: 3, totalGames: 31, wins: 11, draws: 12, losses: 8,
        winRate: 0.35, averagePerformanceRating: 2800, averageOpponentRating: 2740, bestTournamentFinish: '1st',
      },
      {
        playerId: '10', playerName: 'Hikaru Nakamura', playerTitle: 'GM', playerNationality: 'USA',
        tournamentsPlayed: 3, totalGames: 31, wins: 10, draws: 13, losses: 8,
        winRate: 0.32, averagePerformanceRating: 2771, averageOpponentRating: 2737, bestTournamentFinish: '2nd',
      },
    ],
  },
]

export function generateStaticParams() {
  return mockSeasons.map(s => ({ slug: s.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const season = mockSeasons.find(s => s.slug === slug)

  if (!season) return { title: 'Season Not Found' }

  const description = `${season.name} — ${season.tournamentCount} tournaments, ${season.wins}W ${season.draws}D ${season.losses}L. Top performer: ${season.topPlayer.playerTitle} ${season.topPlayer.playerName} (${season.topPlayer.averagePerformanceRating} avg. perf.).`

  return {
    title: season.name,
    description,
    alternates: { canonical: `https://pawnstars.com/seasons/${season.slug}` },
    openGraph: {
      title: `${season.name} — Pawn Stars`,
      description,
      type: 'website',
      url: `https://pawnstars.com/seasons/${season.slug}`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: season.name }],
    },
  }
}

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-primary-800 rounded-lg px-4 py-3 text-center">
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-xs text-primary-400 mt-0.5">{label}</p>
    </div>
  )
}

export default async function SeasonDetailPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const season = mockSeasons.find(s => s.slug === slug)
  if (!season) notFound()

  const record = `${season.wins}W ${season.draws}D ${season.losses}L`
  const winPct = `${Math.round(season.winRate * 100)}%`

  return (
    <div className="min-h-screen bg-primary-50">
      {/* ── hero ── */}
      <section className="bg-primary-900 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/seasons"
            className="inline-flex items-center gap-1.5 text-primary-400 hover:text-white text-sm mb-6 transition-colors"
          >
            ← All seasons
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div>
              <Heading level="h1" className="text-white mb-2">{season.name}</Heading>
              <Body size="base" className="text-primary-400 max-w-xl">{season.description}</Body>
            </div>
            <SeasonStatusBadge status={season.status} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatPill label="Tournaments"  value={season.tournamentCount} />
            <StatPill label="Record"       value={record} />
            <StatPill label="Win rate"     value={winPct} />
            <StatPill label="Team rating"  value={season.teamRatingAverage} />
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* ── tournaments table ── */}
        <section>
          <Heading level="h2" className="mb-5">Tournaments</Heading>
          <div className="bg-white rounded-xl border border-primary-200 overflow-hidden">
            <TournamentsTable tournaments={season.tournaments} />
          </div>
        </section>

        {/* ── player performance ── */}
        <section>
          <Heading level="h2" className="mb-5">Player Performance</Heading>
          <div className="bg-white rounded-xl border border-primary-200 overflow-hidden">
            <PlayerPerformanceTable performers={season.topPerformers} />
          </div>
        </section>

        {/* ── team record timeline ── */}
        <section>
          <Heading level="h2" className="mb-6">Team Record Timeline</Heading>
          <TeamRecordTimeline tournaments={season.tournaments} />
        </section>

        {/* ── back link ── */}
        <div className="pt-4 pb-8 text-center">
          <Link
            href="/seasons"
            className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium"
          >
            ← Back to all seasons
          </Link>
        </div>
      </div>
    </div>
  )
}
