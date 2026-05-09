import { PlayerBioSection } from "@/components/player-detail/PlayerBio"
import { RatingsHistorySection } from "@/components/player-detail/RatingsHistory"
import { RecentFormSection } from "@/components/player-detail/RecentForm"
import { TournamentResultsSection } from "@/components/player-detail/TournamentResults"
import { Player } from "@pawn-stars/shared-types"

// Mock data for development - this would come from API in production
const mockPlayers: Player[] = [
  {
    id: "1",
    slug: "magnus-carlsen",
    firstName: "Magnus",
    lastName: "Carlsen",
    nationality: "NOR",
    dateOfBirth: new Date("1990-11-30"),
    bio: "Magnus Carlsen is a Norwegian chess grandmaster who is the former five-time World Chess Champion. He achieved the title of Grandmaster in 2004 at the age of 13, making him one of the youngest grandmasters in history. Carlsen is widely regarded as one of the greatest chess players of all time, known for his intuitive style, deep understanding of the game, and exceptional endgame technique. He has dominated world chess for over a decade, holding the number one ranking position for a record-breaking period. Beyond classical chess, Carlsen is also a strong player in rapid and blitz chess formats, having won multiple world championships in both time controls.",
    photoUrl: "/players/magnus.jpg",
    title: "GM",
    lichessHandle: "DrNykterstein",
    fideId: "1503014",
    currentRating: 2830,
    active: true,
    createdAt: new Date("2020-01-01"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: "2",
    slug: "fabiano-caruana",
    firstName: "Fabiano",
    lastName: "Caruana",
    nationality: "USA",
    dateOfBirth: new Date("1992-07-30"),
    bio: "Fabiano Caruana is an American chess grandmaster who is widely considered one of the top players in the world. He became a grandmaster at the age of 14, making him the youngest grandmaster in both the United States and Italy at the time. Caruana challenged Magnus Carlsen for the World Chess Championship in 2018, drawing the classical match 6-6 before losing in rapid tiebreaks. Known for his deep opening preparation and analytical approach to the game, Caruana has been a consistent top-10 player for over a decade and has represented the United States in multiple Chess Olympiads.",
    photoUrl: "/players/fabiano.jpg",
    title: "GM",
    lichessHandle: "FabianoCaruana",
    fideId: "2020009",
    currentRating: 2820,
    active: true,
    createdAt: new Date("2020-01-01"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: "3",
    slug: "ding-liren",
    firstName: "Ding",
    lastName: "Liren",
    nationality: "CHN",
    dateOfBirth: new Date("1992-10-24"),
    bio: "Ding Liren is a Chinese chess grandmaster who became the World Chess Champion in 2023, defeating Ian Nepomniachtchi in the championship match. He was the first Chinese player to achieve this feat, marking a historic moment for Chinese chess. Ding has been a consistent top player for many years, known for his solid, classical style and excellent endgame technique. He has won multiple Chinese Chess Championships and has been a key member of the Chinese Olympiad team, helping China win multiple gold medals.",
    photoUrl: "/players/ding.jpg",
    title: "GM",
    lichessHandle: "dingliren",
    fideId: "8603677",
    currentRating: 2791,
    active: true,
    createdAt: new Date("2020-01-01"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: "4",
    slug: "ian-nepomniachtchi",
    firstName: "Ian",
    lastName: "Nepomniachtchi",
    nationality: "RUS",
    dateOfBirth: new Date("1990-07-14"),
    bio: "Ian Nepomniachtchi is a Russian chess grandmaster known for his dynamic and aggressive playing style. He has been a consistent top-10 player and has challenged for the World Chess Championship on multiple occasions, most recently in 2023. Nepomniachtchi is particularly strong in rapid and blitz chess, having won the World Rapid Chess Championship in 2019. He is known for his creative opening repertoire and willingness to take risks in complex positions.",
    photoUrl: "/players/ian.jpg",
    title: "GM",
    lichessHandle: "Nepomniachtchi",
    fideId: "4178533",
    currentRating: 2793,
    active: true,
    createdAt: new Date("2020-01-01"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: "5",
    slug: "alireza-firouzja",
    firstName: "Alireza",
    lastName: "Firouzja",
    nationality: "FRA",
    dateOfBirth: new Date("2003-06-18"),
    bio: "Alireza Firouzja is a French chess grandmaster of Iranian origin who is considered one of the most talented young players in chess history. He achieved the grandmaster title at the age of 14 and has been a top-10 player since his teenage years. Firouzja is known for his aggressive, dynamic style and exceptional calculation abilities. He represents France internationally and has won multiple major tournaments, establishing himself as a future World Championship contender.",
    photoUrl: "/players/alireza.jpg",
    title: "GM",
    lichessHandle: "alireza2003",
    fideId: "12514474",
    currentRating: 2793,
    active: true,
    createdAt: new Date("2020-01-01"),
    updatedAt: new Date("2024-01-20")
  }
]

// Generate static params for all player slugs
export async function generateStaticParams() {
  const players = mockPlayers.map((player) => ({
    slug: player.slug,
  }))
  
  return players
}

// Generate metadata for each player page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const player = mockPlayers.find(p => p.slug === params.slug)
  
  if (!player) {
    return {
      title: "Player Not Found - Pawn Stars",
      description: "The requested player could not be found.",
    }
  }

  return {
    title: `${player.firstName} ${player.lastName} - Pawn Stars Chess Organization`,
    description: `Profile of ${player.firstName} ${player.lastName}, ${player.title} from ${player.nationality} with FIDE rating ${player.currentRating}. ${player.bio?.slice(0, 150)}...`,
    keywords: [
      `${player.firstName} ${player.lastName}`,
      "chess",
      "grandmaster",
      player.nationality,
      "FIDE",
      "rating",
      "pawn stars",
      player.title || ""
    ].filter(Boolean),
    openGraph: {
      title: `${player.firstName} ${player.lastName} (${player.currentRating}) - Pawn Stars`,
      description: `${player.title} from ${player.nationality} with FIDE rating ${player.currentRating}. ${player.bio?.slice(0, 150)}...`,
      type: "profile",
      locale: "en_US",
      url: `https://pawnstars.com/players/${player.slug}`,
      siteName: "Pawn Stars",
      images: [
        {
          url: player.photoUrl || "/default-player.jpg",
          width: 800,
          height: 800,
          alt: `${player.firstName} ${player.lastName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@pawnstars",
      creator: "@pawnstars",
    },
    alternates: {
      canonical: `https://pawnstars.com/players/${player.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default function PlayerDetailPage({ params }: { params: { slug: string } }) {
  const player = mockPlayers.find(p => p.slug === params.slug)

  if (!player) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary-900 mb-4">Player Not Found</h1>
          <p className="text-primary-600 mb-4">The player you're looking for doesn't exist.</p>
          <a 
            href="/players" 
            className="text-accent-600 hover:text-accent-700 underline"
          >
            Back to Players
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Player Bio Section */}
      <PlayerBioSection player={player} showFullBio={true} />
      
      {/* Ratings History Section */}
      <RatingsHistorySection playerId={player.id} showFullHistory={false} />
      
      {/* Recent Form Section */}
      <RecentFormSection playerId={player.id} showFullHistory={false} />
      
      {/* Tournament Results Section */}
      <TournamentResultsSection playerId={player.id} showFullHistory={false} />
      
      {/* Back to Players Link */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a 
            href="/players" 
            className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium"
          >
            ← Back to All Players
          </a>
        </div>
      </section>
    </div>
  )
}
