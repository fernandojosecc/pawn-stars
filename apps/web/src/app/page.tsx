import { HeroSection } from "@/components/home/HeroSection"
import { MatchBar } from "@/components/home/MatchBar"
import { FeaturedPlayers } from "@/components/home/FeaturedPlayers"
import { RecentNews } from "@/components/home/RecentNews"
import { TeamRankings } from "@/components/home/TeamRankings"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { organizationSchema } from "@/lib/structured-data"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    absolute: "Pawn Stars — Chess Excellence",
  },
  description: "Building champions through strategic excellence, dedicated training, and competitive spirit. Join us on the journey to chess mastery.",
  alternates: { canonical: "https://pawnstars.com" },
  openGraph: {
    title: "Pawn Stars — Chess Excellence",
    description: "Building champions through strategic excellence, dedicated training, and competitive spirit.",
    type: "website",
    url: "https://pawnstars.com",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pawn Stars Chess Organization" }],
  },
}

const orgLd = organizationSchema()

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <SiteHeader />

      <main className="flex-1">
        <HeroSection variant="home" />
        <MatchBar showLive={true} maxMatches={1} />
        <FeaturedPlayers count={4} showRatings={true} />

        {/* Rankings + News side-by-side */}
        <section className="py-14 bg-carbon border-t border-carbon-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              <div className="lg:col-span-3">
                <TeamRankings />
              </div>
              <div className="lg:col-span-2">
                <RecentNews limit={4} showCategory={true} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
