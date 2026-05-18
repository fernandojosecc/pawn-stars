import React from "react"
import Link from "next/link"
import { PlayerCard, PlayerTitle } from "@pawn-stars/shared-types"

interface FeaturedPlayersProps {
  players?: PlayerCard[]
  count?: number
  showRatings?: boolean
}

const MOCK_PLAYERS: PlayerCard[] = [
  {
    id: "1",
    slug: "andres-sanchez",
    firstName: "Andrés",
    lastName: "Sánchez",
    nationality: "ESP",
    title: "GM",
    currentRating: 2541,
    active: true,
    rosterPosition: 1,
    badge: "CAPTAIN",
  },
  {
    id: "2",
    slug: "nikolai-petrov",
    firstName: "Nikolai",
    lastName: "Petrov",
    nationality: "RUS",
    title: "GM",
    currentRating: 2487,
    active: true,
    rosterPosition: 2,
    badge: "TOP BOARD",
  },
  {
    id: "3",
    slug: "laila-fathi",
    firstName: "Laila",
    lastName: "Fathi",
    nationality: "MAR",
    title: "IM",
    currentRating: 2312,
    active: true,
    rosterPosition: 3,
    badge: null,
  },
  {
    id: "4",
    slug: "carlos-medina",
    firstName: "Carlos",
    lastName: "Medina",
    nationality: "MEX",
    title: "FM",
    currentRating: 2278,
    active: true,
    rosterPosition: 4,
    badge: null,
  },
]

const FLAG_EMOJI: Record<string, string> = {
  ESP: "🇪🇸", RUS: "🇷🇺", MAR: "🇲🇦", MEX: "🇲🇽",
  NOR: "🇳🇴", CHN: "🇨🇳", USA: "🇺🇸", IND: "🇮🇳",
  GER: "🇩🇪", FRA: "🇫🇷", ENG: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", ITA: "🇮🇹",
}

const COUNTRY_NAME: Record<string, string> = {
  ESP: "Spain", RUS: "Russia", MAR: "Morocco", MEX: "Mexico",
  NOR: "Norway", CHN: "China", USA: "United States", IND: "India",
}

const TITLE_LABEL: Partial<Record<NonNullable<PlayerTitle>, string>> = {
  GM: "GRANDMASTER", IM: "INTL MASTER", FM: "FIDE MASTER",
  CM: "CANDIDATE MASTER", WGM: "WOMAN GM", WIM: "WOMAN IM",
  WFM: "WOMAN FM", WCM: "WOMAN CM",
}

const RATING_TYPE_LABEL: Partial<Record<NonNullable<PlayerTitle>, string>> & { default: string } = {
  GM: "CLASSICAL ELO", IM: "RAPID ELO", FM: "BLITZ ELO", default: "CLASSICAL ELO",
}

const FORM_DOTS = ["bg-success-500", "bg-success-500", "bg-success-500", "bg-danger-500", "bg-carbon-400"]

export const FeaturedPlayers: React.FC<FeaturedPlayersProps> = ({
  players = [],
  count = 4,
  showRatings = true,
}) => {
  const displayPlayers = players.length > 0 ? players : MOCK_PLAYERS
  const featured = displayPlayers.slice(0, count)

  return (
    <section className="py-14 bg-carbon">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl sm:text-4xl tracking-wide">
            <span className="text-white">FEATURED </span>
            <span className="text-gold">PLAYERS</span>
          </h2>
          <Link
            href="/players"
            className="font-mono text-xs tracking-widest text-carbon-800 hover:text-white transition-colors"
          >
            View all →
          </Link>
        </div>

        {/* Player cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((player) => {
            const initials = `${player.firstName[0]}${player.lastName[0]}`
            const flag = FLAG_EMOJI[player.nationality] ?? "🏳️"
            const country = COUNTRY_NAME[player.nationality] ?? player.nationality
            const ratingLabel = (player.title ? (RATING_TYPE_LABEL[player.title] ?? RATING_TYPE_LABEL.default) : RATING_TYPE_LABEL.default)

            return (
              <Link
                key={player.id}
                href={`/players/${player.slug}`}
                className="block bg-carbon-100 border border-carbon-300 hover:border-gold/50 transition-colors p-5"
              >
                {/* Top row: roster position + badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-widest text-carbon-700">
                    #{player.rosterPosition} ROSTER
                  </span>
                  {player.badge && (
                    <span className="border border-gold font-mono text-[9px] tracking-widest text-gold px-2 py-0.5">
                      {player.badge}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-carbon-300 border border-carbon-400 flex items-center justify-center mb-4">
                  {player.photoUrl ? (
                    <img
                      src={player.photoUrl}
                      alt={`${player.firstName} ${player.lastName}`}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="font-display text-xl text-carbon-900">{initials}</span>
                  )}
                </div>

                {/* Name */}
                <div className="font-sans font-semibold text-white text-sm mb-1">
                  {player.firstName} {player.lastName}
                </div>

                {/* Country */}
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="text-xs">{flag}</span>
                  <span className="font-mono text-[10px] tracking-wide text-carbon-800">{country}</span>
                </div>

                {/* Rating */}
                {showRatings && player.currentRating && (
                  <div className="mb-3">
                    <div className="font-display text-3xl text-gold leading-none">{player.currentRating}</div>
                    <div className="font-mono text-[10px] tracking-widest text-carbon-700 mt-0.5">{ratingLabel}</div>
                  </div>
                )}

                {/* Form dots */}
                <div className="flex items-center gap-1">
                  {FORM_DOTS.map((color, i) => (
                    <span key={i} className={`inline-block w-3 h-1.5 ${color}`} />
                  ))}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
