import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Matches",
  description: "Pawn Stars match centre — results, lineups, round scores and MVP awards for all team matches.",
  alternates: { canonical: "https://pawnstars.com/matches" },
  openGraph: {
    title: "Matches — Pawn Stars",
    description: "Results, lineups and round-by-round scores for all Pawn Stars team matches.",
    type: "website",
    url: "https://pawnstars.com/matches",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pawn Stars Matches" }],
  },
}

export default function MatchesLayout({ children }: { children: React.ReactNode }) {
  return children
}
