import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chess Tournaments - Pawn Stars Chess Organization",
  description: "Explore upcoming, ongoing, and completed chess tournaments from around the world. Filter by status and find your next chess event.",
  keywords: ["chess tournaments", "upcoming tournaments", "live chess", "chess events", "pawn stars", "chess competitions"],
  openGraph: {
    title: "Chess Tournaments - Pawn Stars Chess Organization",
    description: "Explore upcoming, ongoing, and completed chess tournaments from around the world. Filter by status and find your next chess event.",
    type: "website",
    locale: "en_US",
    url: "https://pawnstars.com/tournaments",
    siteName: "Pawn Stars",
    images: [
      {
        url: "https://pawnstars.com/og-image-tournaments.jpg",
        width: 1200,
        height: 630,
        alt: "Pawn Stars Chess Tournaments",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pawnstars",
    creator: "@pawnstars",
  },
  alternates: {
    canonical: "https://pawnstars.com/tournaments",
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

export default function TournamentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
