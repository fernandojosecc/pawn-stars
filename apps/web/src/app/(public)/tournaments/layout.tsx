import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tournaments",
  description: "Explore upcoming, ongoing, and completed chess tournaments from around the world. Filter by status and find your next chess event.",
  keywords: ["chess tournaments", "upcoming tournaments", "live chess", "chess events", "pawn stars"],
  alternates: { canonical: "https://pawnstars.com/tournaments" },
  openGraph: {
    title: "Chess Tournaments — Pawn Stars",
    description: "Upcoming, ongoing, and completed chess tournaments — filter by status and find your next chess event.",
    type: "website",
    url: "https://pawnstars.com/tournaments",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pawn Stars Chess Tournaments" }],
  },
}

export default function TournamentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
