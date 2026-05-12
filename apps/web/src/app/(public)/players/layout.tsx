import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Players",
  description: "Explore our roster of talented chess players from around the world. Filter by title, nationality, and rating.",
  keywords: ["chess players", "grandmasters", "chess ratings", "pawn stars", "chess team"],
  alternates: { canonical: "https://pawnstars.com/players" },
  openGraph: {
    title: "Players — Pawn Stars Chess Organization",
    description: "Explore our roster of talented chess players from around the world. Filter by title, nationality, and rating.",
    type: "website",
    url: "https://pawnstars.com/players",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pawn Stars Chess Players" }],
  },
}

export default function PlayersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
