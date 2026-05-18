import React from "react"
import Link from "next/link"

const PARTNERS = ["CHESSCRAFT", "DEEPTACTIX", "MOVA SPORTS", "AJEDREZ.PRO", "LICHESS.ORG"]

const FOOTER_LINKS = {
  TEAM: [
    { label: "Roster", href: "/team" },
    { label: "Staff", href: "/team#staff" },
    { label: "Season Overview", href: "/seasons" },
    { label: "History", href: "/team#history" },
  ],
  COMPETE: [
    { label: "Tournaments", href: "/tournaments" },
    { label: "Rankings", href: "/rankings" },
    { label: "Match Center", href: "/matches" },
    { label: "Schedule", href: "/schedule" },
  ],
  ORGANIZATION: [
    { label: "About", href: "/about" },
    { label: "Sponsors", href: "/sponsors" },
    { label: "Join / Trials", href: "/join" },
    { label: "Contact", href: "/contact" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="bg-carbon border-t border-carbon-300">
      {/* Partners strip */}
      <div className="border-b border-carbon-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {PARTNERS.map((partner) => (
              <span key={partner} className="font-mono text-xs tracking-widest text-carbon-600 hover:text-carbon-800 transition-colors cursor-pointer">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-gold text-xl">♟</span>
              <span className="font-display text-lg tracking-widest text-white">PAWN STARS</span>
            </div>
            <p className="font-sans text-sm text-carbon-700 leading-relaxed">
              Competitive chess organization.<br />
              Built on preparation, performance, and team culture.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-mono text-xs tracking-widest text-carbon-700 mb-4">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="font-sans text-sm text-carbon-800 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-carbon-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-mono text-xs text-carbon-700">© 2026 Pawn Stars. All rights reserved.</span>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="font-mono text-xs text-carbon-700 hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
