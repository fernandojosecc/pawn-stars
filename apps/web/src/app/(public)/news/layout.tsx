import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chess News & Updates - Pawn Stars Chess Organization",
  description: "Stay up to date with the latest chess news, tournament reports, player interviews, and organizational announcements from Pawn Stars.",
  keywords: ["chess news", "tournament reports", "player interviews", "chess announcements", "pawn stars", "chess updates"],
  openGraph: {
    title: "Chess News & Updates - Pawn Stars Chess Organization",
    description: "Stay up to date with the latest chess news, tournament reports, player interviews, and organizational announcements from Pawn Stars.",
    type: "website",
    locale: "en_US",
    url: "https://pawnstars.com/news",
    siteName: "Pawn Stars",
    images: [
      {
        url: "https://pawnstars.com/og-image-news.jpg",
        width: 1200,
        height: 630,
        alt: "Pawn Stars Chess News",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pawnstars",
    creator: "@pawnstars",
  },
  alternates: {
    canonical: "https://pawnstars.com/news",
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

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
