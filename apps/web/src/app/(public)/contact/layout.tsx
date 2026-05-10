import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Pawn Stars - Chess Organization",
  description: "Get in touch with Pawn Stars chess organization. Contact us for general inquiries, media requests, sponsorship opportunities, or player trials.",
  keywords: ["chess", "pawn stars", "contact", "chess organization", "chess club", "chess team", "chess academy", "chess lessons"],
  openGraph: {
    title: "Contact Pawn Stars - Chess Organization",
    description: "Get in touch with Pawn Stars chess organization. Contact us for general inquiries, media requests, sponsorship opportunities, or player trials.",
    type: "website",
    locale: "en_US",
    url: "https://pawnstars.com/contact",
    siteName: "Pawn Stars",
    images: [
      {
        url: "https://pawnstars.com/og-image-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Pawn Stars Chess Organization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pawnstars",
    creator: "@pawnstars",
  },
  alternates: {
    canonical: "https://pawnstars.com/contact",
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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
