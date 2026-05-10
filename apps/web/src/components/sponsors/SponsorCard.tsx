import React from "react"
import { Body } from "@/components/typography/Body"
import type { Sponsor, SponsorTier } from "@pawn-stars/shared-types"

const TIER_CONFIG: Record<SponsorTier, {
  badge: string
  logoBg: string
  logoText: string
  border: string
}> = {
  title:   { badge: "bg-accent-500 text-white",            logoBg: "from-accent-600 to-primary-900",  logoText: "text-white",          border: "border-accent-300" },
  gold:    { badge: "bg-yellow-500 text-white",            logoBg: "from-yellow-600 to-amber-800",    logoText: "text-white",          border: "border-yellow-300" },
  silver:  { badge: "bg-primary-400 text-white",           logoBg: "from-primary-500 to-primary-700", logoText: "text-white",          border: "border-primary-300" },
  partner: { badge: "bg-primary-200 text-primary-700",     logoBg: "from-primary-200 to-primary-400", logoText: "text-primary-700",    border: "border-primary-200" },
}

interface SponsorCardProps {
  sponsor:  Sponsor
  featured?: boolean   // true for title sponsor
}

export function SponsorCard({ sponsor, featured = false }: SponsorCardProps) {
  const cfg = TIER_CONFIG[sponsor.tier]

  const card = (
    <div className={`bg-white rounded-2xl border-2 ${cfg.border} p-6 flex flex-col h-full transition-shadow hover:shadow-lg ${featured ? "sm:flex-row sm:items-start sm:gap-8" : ""}`}>
      {/* Logo placeholder */}
      <div className={`bg-gradient-to-br ${cfg.logoBg} rounded-xl flex items-center justify-center flex-shrink-0 ${
        featured ? "w-24 h-24 sm:w-32 sm:h-32 mx-auto sm:mx-0 mb-4 sm:mb-0" : "w-16 h-16 mb-4"
      }`}>
        <span className={`font-black ${featured ? "text-3xl sm:text-4xl" : "text-xl"} ${cfg.logoText} select-none`}>
          {sponsor.logoText ?? sponsor.name.slice(0, 2).toUpperCase()}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.badge}`}>
            {sponsor.tier.charAt(0).toUpperCase() + sponsor.tier.slice(1)} Sponsor
          </span>
          {sponsor.since && (
            <Body size="xs" className="text-primary-400">Since {sponsor.since}</Body>
          )}
        </div>

        <h3 className={`font-bold text-primary-900 leading-tight mb-2 ${featured ? "text-2xl" : "text-lg"}`}>
          {sponsor.name}
        </h3>

        {sponsor.industry && (
          <Body size="xs" className="text-primary-400 mb-2">{sponsor.industry}</Body>
        )}

        {sponsor.description && (
          <Body size="sm" className={`text-primary-600 leading-relaxed ${featured ? "" : "line-clamp-3"}`}>
            {sponsor.description}
          </Body>
        )}

        {sponsor.websiteUrl && (
          <a
            href={sponsor.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-accent-600 hover:text-accent-700 transition-colors"
          >
            Visit website
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )

  return card
}
