import React from "react"
import type { Metadata } from "next"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { SponsorCard } from "@/components/sponsors/SponsorCard"
import { SponsorshipCTA } from "@/components/sponsors/SponsorshipCTA"
import type { Sponsor } from "@pawn-stars/shared-types"

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Meet the organisations backing Pawn Stars — our title, gold, silver and partner sponsors who make elite chess possible.",
  alternates: { canonical: "https://pawnstars.com/sponsors" },
  openGraph: {
    title: "Sponsors — Pawn Stars",
    description: "The organisations behind Pawn Stars — title, gold, silver and partner sponsors.",
    type: "website",
    url: "https://pawnstars.com/sponsors",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pawn Stars Sponsors" }],
  },
}

const sponsors: Sponsor[] = [
  // Title
  {
    id: "sp-001", name: "Grandmaster Capital", tier: "title",
    description: "A leading European investment firm backing elite chess talent and club infrastructure since 2020. Grandmaster Capital believes strategic thinking at the board mirrors strategic thinking in finance.",
    websiteUrl: "https://grandmastercapital.example", industry: "Financial Services", logoText: "GC", since: 2020,
  },
  // Gold
  {
    id: "sp-002", name: "KnightMoves Energy", tier: "gold",
    description: "Renewable energy provider powering the next generation of chess champions and sustainable sports infrastructure.",
    websiteUrl: "https://knightmovesenergy.example", industry: "Clean Energy", logoText: "KM", since: 2022,
  },
  {
    id: "sp-003", name: "RookTech Systems", tier: "gold",
    description: "Enterprise software solutions provider and proud supporter of the Pawn Stars digital training programme.",
    websiteUrl: "https://rooktech.example", industry: "Technology", logoText: "RT", since: 2021,
  },
  // Silver
  {
    id: "sp-004", name: "Pawnbrokers Insurance", tier: "silver",
    description: "Specialist sports insurance covering professional chess players and club operations worldwide.",
    websiteUrl: "https://pawnbrokers.example", industry: "Insurance", logoText: "PI", since: 2023,
  },
  {
    id: "sp-005", name: "BoardRoom Analytics", tier: "silver",
    description: "Data analytics platform delivering real-time insights for clubs, coaches and competitive players.",
    websiteUrl: "https://boardroomanalytics.example", industry: "Data & Analytics", logoText: "BA", since: 2022,
  },
  {
    id: "sp-006", name: "Checkmate Coffee", tier: "silver",
    description: "Specialty coffee roasters fuelling long training sessions and post-match analysis. Official coffee of Pawn Stars.",
    websiteUrl: "https://checkmatecoffee.example", industry: "Food & Beverage", logoText: "CC", since: 2023,
  },
  // Partner
  {
    id: "sp-007", name: "Chess.com", tier: "partner",
    description: "The world's largest chess platform and official online training partner of Pawn Stars.",
    websiteUrl: "https://chess.com", industry: "Chess Platform", logoText: "Ch", since: 2021,
  },
  {
    id: "sp-008", name: "ChessBase", tier: "partner",
    description: "Professional chess database and analysis software used by every Pawn Stars player in their preparation.",
    websiteUrl: "https://chessbase.com", industry: "Chess Software", logoText: "CB", since: 2020,
  },
]

function byTier(tier: Sponsor["tier"]) {
  return sponsors.filter(s => s.tier === tier)
}

const titleSponsors   = byTier("title")
const goldSponsors    = byTier("gold")
const silverSponsors  = byTier("silver")
const partnerSponsors = byTier("partner")

export default function SponsorsPage() {
  return (
    <main className="min-h-screen bg-primary-50">
      {/* Hero */}
      <div className="bg-primary-900 text-white py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heading level="h1" className="text-white text-3xl md:text-4xl font-bold mb-2">
            Our Sponsors
          </Heading>
          <Body className="text-primary-300 max-w-xl">
            The organisations whose support makes Pawn Stars possible — from training facilities to tournament travel.
          </Body>

          {/* Summary chips */}
          <div className="flex flex-wrap gap-3 mt-5">
            <div className="bg-primary-800 rounded-lg px-4 py-2">
              <div className="text-accent-400 font-bold text-lg">{titleSponsors.length}</div>
              <Body size="xs" className="text-primary-400">Title</Body>
            </div>
            <div className="bg-primary-800 rounded-lg px-4 py-2">
              <div className="text-yellow-400 font-bold text-lg">{goldSponsors.length}</div>
              <Body size="xs" className="text-primary-400">Gold</Body>
            </div>
            <div className="bg-primary-800 rounded-lg px-4 py-2">
              <div className="text-primary-300 font-bold text-lg">{silverSponsors.length}</div>
              <Body size="xs" className="text-primary-400">Silver</Body>
            </div>
            <div className="bg-primary-800 rounded-lg px-4 py-2">
              <div className="text-white font-bold text-lg">{partnerSponsors.length}</div>
              <Body size="xs" className="text-primary-400">Partners</Body>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* Title sponsor — full-width featured */}
        {titleSponsors.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Heading level="h2" className="text-primary-900 text-xl font-bold">Title Sponsor</Heading>
              <div className="flex-1 h-px bg-accent-200" />
              <span className="text-xs font-semibold bg-accent-100 text-accent-700 px-2.5 py-1 rounded-full">
                Presenting partner
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {titleSponsors.map(s => (
                <SponsorCard key={s.id} sponsor={s} featured />
              ))}
            </div>
          </section>
        )}

        {/* Gold sponsors — 2-column */}
        {goldSponsors.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Heading level="h2" className="text-primary-900 text-xl font-bold">Gold Sponsors</Heading>
              <div className="flex-1 h-px bg-yellow-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {goldSponsors.map(s => (
                <SponsorCard key={s.id} sponsor={s} />
              ))}
            </div>
          </section>
        )}

        {/* Silver sponsors — 3-column */}
        {silverSponsors.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Heading level="h2" className="text-primary-900 text-xl font-bold">Silver Sponsors</Heading>
              <div className="flex-1 h-px bg-primary-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {silverSponsors.map(s => (
                <SponsorCard key={s.id} sponsor={s} />
              ))}
            </div>
          </section>
        )}

        {/* Partner sponsors — 2-column compact */}
        {partnerSponsors.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Heading level="h2" className="text-primary-900 text-xl font-bold">Partners</Heading>
              <div className="flex-1 h-px bg-primary-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {partnerSponsors.map(s => (
                <SponsorCard key={s.id} sponsor={s} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sponsorship CTA */}
      <SponsorshipCTA />
    </main>
  )
}
