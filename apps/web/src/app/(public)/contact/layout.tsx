import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Pawn Stars chess organization for general inquiries, media requests, sponsorship opportunities, or player trials.",
  keywords: ["chess", "pawn stars", "contact", "chess organization"],
  alternates: { canonical: "https://pawnstars.com/contact" },
  openGraph: {
    title: "Contact — Pawn Stars",
    description: "Reach out for general inquiries, media requests, sponsorship opportunities, or player trials.",
    type: "website",
    url: "https://pawnstars.com/contact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact Pawn Stars" }],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
