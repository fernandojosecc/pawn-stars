import { HeroSection } from "@/components/home/HeroSection"
import { MatchBar } from "@/components/home/MatchBar"
import { FeaturedPlayers } from "@/components/home/FeaturedPlayers"
import { RecentNews } from "@/components/home/RecentNews"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pawn Stars - Chess Excellence",
  description: "Building champions through strategic excellence, dedicated training, and competitive spirit. Join us on the journey to chess mastery.",
  openGraph: {
    title: "Pawn Stars - Chess Excellence",
    description: "Building champions through strategic excellence, dedicated training, and competitive spirit. Join us on the journey to chess mastery.",
    type: "website",
    locale: "en_US",
    url: "https://pawnstars.com",
    siteName: "Pawn Stars",
    images: [
      {
        url: "https://pawnstars.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pawn Stars Chess Organization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pawnstars",
    creator: "@pawnstars",
  },
}

export default function Home() {
  return (
    <div className="min-h-screen">
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
