import { Metadata } from "next"

export const metadata: Metadata = {
  title: "News",
  description: "Stay up to date with the latest chess news, tournament reports, player interviews, and organizational announcements from Pawn Stars.",
  keywords: ["chess news", "tournament reports", "player interviews", "pawn stars", "chess updates"],
  alternates: { canonical: "https://pawnstars.com/news" },
  openGraph: {
    title: "Chess News & Updates — Pawn Stars",
    description: "The latest chess news, tournament reports, player interviews, and announcements from Pawn Stars.",
    type: "website",
    url: "https://pawnstars.com/news",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pawn Stars Chess News" }],
  },
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
