import React from "react"
import Link from "next/link"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"

const BENEFITS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Global visibility",
    description: "Logo placement on match broadcasts, tournament coverage and digital channels reaching 500k+ monthly views.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Elite audience",
    description: "Connect with a highly educated, high-income audience of chess enthusiasts, professionals and strategic thinkers.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Brand association",
    description: "Align your brand with excellence, strategy and precision — the core values that define championship chess.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Year-round exposure",
    description: "Multi-tournament calendar across 12+ months ensures sustained brand presence throughout the competitive season.",
  },
]

export function SponsorshipCTA() {
  return (
    <section className="bg-primary-900 text-white py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heading level="h2" className="text-white text-2xl md:text-3xl font-bold mb-3">
            Partner with Pawn Stars
          </Heading>
          <Body className="text-primary-300 max-w-2xl mx-auto">
            Join our growing roster of forward-thinking organisations backing the next era of competitive chess.
            Tailored packages available for every ambition.
          </Body>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {BENEFITS.map((b, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-800 flex items-center justify-center flex-shrink-0 text-accent-400">
                {b.icon}
              </div>
              <div>
                <p className="font-semibold text-white mb-1">{b.title}</p>
                <Body size="sm" className="text-primary-400 leading-relaxed">{b.description}</Body>
              </div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Get in touch
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <a
            href="/media/dc-005"
            className="inline-flex items-center gap-2 bg-primary-800 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Download prospectus
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
