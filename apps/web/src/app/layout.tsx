import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pawnstars.com"),
  title: {
    default: "Pawn Stars",
    template: "%s | Pawn Stars",
  },
  description: "Pawn Stars — building chess champions through strategic excellence, dedicated training, and competitive spirit.",
  openGraph: {
    siteName: "Pawn Stars",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pawn Stars Chess Organization" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pawnstars",
    creator: "@pawnstars",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-primary-50 text-primary-900">{children}</body>
    </html>
  );
}
