import { HeroSection } from "@/components/home/HeroSection"
import { MatchBar } from "@/components/home/MatchBar"
import { FeaturedPlayers } from "@/components/home/FeaturedPlayers"
import { RecentNews } from "@/components/home/RecentNews"
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
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      {/* Hero Section */}
      <HeroSection variant="home" />

      {/* Match Bar */}
      <MatchBar showLive={true} maxMatches={3} />

      {/* Featured Players */}
      <FeaturedPlayers count={6} showRatings={true} />

      {/* Recent News */}
      <RecentNews limit={3} showCategory={true} />
    </div>
  );
}
