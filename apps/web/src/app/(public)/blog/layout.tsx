import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Analysis, match reports, interviews, and behind-the-scenes coverage from the Pawn Stars coaching and editorial team.',
  keywords: ['chess blog', 'chess analysis', 'opening theory', 'chess interviews', 'pawn stars'],
  alternates: { canonical: 'https://pawnstars.com/blog' },
  openGraph: {
    title: 'Blog — Pawn Stars',
    description:
      'Deep dives into opening theory, match reports, grandmaster interviews, and editorial from Pawn Stars.',
    type: 'website',
    url: 'https://pawnstars.com/blog',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Pawn Stars Blog' }],
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
