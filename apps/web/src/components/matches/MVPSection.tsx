import React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import type { MatchDetail } from "@pawn-stars/shared-types"

interface MVPSectionProps {
  mvp: NonNullable<MatchDetail["mvp"]>
}

export const MVPSection: React.FC<MVPSectionProps> = ({ mvp }) => {
  return (
    <section className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl border border-accent-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-accent-200 flex items-center gap-2">
        <span className="text-accent-500 text-lg">★</span>
        <Heading level="h3" className="text-accent-900 text-base font-semibold">
          Match MVP
        </Heading>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-accent-200 border-2 border-accent-300 flex-shrink-0">
            {mvp.playerPhotoUrl ? (
              <Image src={mvp.playerPhotoUrl} alt={mvp.playerName} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl font-bold text-accent-600">
                {mvp.playerName[0]}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Heading level="h3" className="text-primary-900 text-lg">
                {mvp.playerName}
              </Heading>
              {mvp.playerTitle && (
                <Badge className="bg-accent-500 text-white text-xs">{mvp.playerTitle}</Badge>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              {mvp.playerNationality && (
                <Body size="sm" className="text-primary-500">{mvp.playerNationality}</Body>
              )}
              {mvp.playerRating && (
                <Body size="sm" className="text-primary-500 font-mono">
                  Rating: {mvp.playerRating}
                </Body>
              )}
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-bold text-accent-600">{mvp.score}</div>
            <Body size="xs" className="text-primary-400">points</Body>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-white/60 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-primary-900 font-mono">{mvp.score}/{mvp.score * 1}</div>
            <Body size="xs" className="text-primary-500">Score</Body>
          </div>
          <div className="bg-white/60 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-accent-600 font-mono">{mvp.performance}</div>
            <Body size="xs" className="text-primary-500">Performance</Body>
          </div>
        </div>

        {mvp.reason && (
          <div className="mt-3 text-sm text-primary-600 italic border-l-2 border-accent-400 pl-3">
            {mvp.reason}
          </div>
        )}
      </div>
    </section>
  )
}
