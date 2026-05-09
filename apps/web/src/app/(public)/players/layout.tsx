import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Players - Pawn Stars Chess Organization",
  description: "Explore our roster of talented chess players from around the world. Filter by title, nationality, and rating to find the perfect match for your chess club or tournament.",
  keywords: ["chess players", "grandmasters", "chess ratings", "pawn stars", "chess team"],
  openGraph: {
    title: "Players - Pawn Stars Chess Organization",
    description: "Explore our roster of talented chess players from around the world. Filter by title, nationality, and rating to find the perfect match.",
    type: "website",
    locale: "en_US",
    url: "https://pawnstars.com/players",
    siteName: "Pawn Stars",
    images: [
      {
        url: "https://pawnstars.com/og-image-players.jpg",
        width: 1200,
        height: 630,
        alt: "Pawn Stars Chess Players",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pawnstars",
    creator: "@pawnstars",
  },
  alternates: {
    canonical: "https://pawnstars.com/players",
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

export default function PlayersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
