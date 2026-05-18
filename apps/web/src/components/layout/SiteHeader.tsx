import React from "react"
import Link from "next/link"

const NAV_LINKS = [
  { label: "TEAM", href: "/team" },
  { label: "PLAYERS", href: "/players" },
  { label: "TOURNAMENTS", href: "/tournaments" },
  { label: "RANKINGS", href: "/rankings" },
  { label: "NEWS", href: "/news" },
  { label: "MATCH CENTER", href: "/matches" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Live match bar */}
      <div className="bg-carbon-50 border-b border-carbon-300 px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-xs text-carbon-800 tracking-wide">
              LIVE — Round 4: Pawn Stars vs Gambito Elite
            </span>
          </div>
          <span className="hidden sm:block font-mono text-xs text-carbon-700">
            Season 2025-26 · Last sync: 2h ago
          </span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-carbon border-b border-carbon-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="text-gold text-xl">♟</span>
              <span className="font-display text-lg tracking-widest text-white">PAWN STARS</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs tracking-widest text-carbon-800 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/join"
              className="hidden sm:inline-flex items-center px-4 py-1.5 border border-gold text-gold font-mono text-xs tracking-widest hover:bg-gold hover:text-carbon transition-colors"
            >
              JOIN / TRIALS
            </Link>

            {/* Mobile menu toggle placeholder */}
            <button className="md:hidden text-white p-2" aria-label="Open menu">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
