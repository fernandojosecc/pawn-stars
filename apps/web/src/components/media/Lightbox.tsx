"use client"

import React, { useEffect, useCallback } from "react"
import { Body } from "@/components/typography/Body"
import type { MediaAsset } from "@pawn-stars/shared-types"
import { PhotoPlaceholder } from "./PhotoPlaceholder"

interface LightboxProps {
  photos:   MediaAsset[]
  current:  MediaAsset
  onClose:  () => void
  onNext:   () => void
  onPrev:   () => void
}

export function Lightbox({ photos, current, onClose, onNext, onPrev }: LightboxProps) {
  const idx     = photos.findIndex(p => p.id === current.id)
  const hasPrev = idx > 0
  const hasNext = idx < photos.length - 1

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape")      onClose()
    if (e.key === "ArrowRight" && hasNext) onNext()
    if (e.key === "ArrowLeft"  && hasPrev) onPrev()
  }, [onClose, onNext, onPrev, hasPrev, hasNext])

  useEffect(() => {
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [handleKey])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex flex-col"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium bg-accent-500 text-white px-2.5 py-1 rounded-full">
            Photo
          </span>
          {current.tournamentName && (
            <Body size="xs" className="text-white/60">{current.tournamentName}</Body>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Body size="xs" className="text-white/50">{idx + 1} / {photos.length}</Body>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close lightbox"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Image area */}
      <div className="flex-1 flex items-center justify-center relative px-16 min-h-0">
        {/* Prev */}
        <button
          onClick={e => { e.stopPropagation(); onPrev() }}
          disabled={!hasPrev}
          className="absolute left-2 sm:left-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center transition-colors z-10"
          aria-label="Previous photo"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Photo */}
        <div
          className="max-w-3xl w-full max-h-full rounded-xl overflow-hidden shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <PhotoPlaceholder
            id={current.id}
            title={current.title}
            className={`w-full ${
              current.aspectRatio === "portrait"
                ? "aspect-[3/4]"
                : current.aspectRatio === "square"
                ? "aspect-square"
                : "aspect-[4/3]"
            }`}
          />
        </div>

        {/* Next */}
        <button
          onClick={e => { e.stopPropagation(); onNext() }}
          disabled={!hasNext}
          className="absolute right-2 sm:right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center transition-colors z-10"
          aria-label="Next photo"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Caption bar */}
      <div
        className="px-4 py-4 flex-shrink-0 text-center"
        onClick={e => e.stopPropagation()}
      >
        <p className="text-white font-semibold text-base leading-snug">{current.title}</p>
        {current.description && (
          <Body size="sm" className="text-white/60 mt-1">{current.description}</Body>
        )}
        {current.tags && current.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mt-2">
            {current.tags.map(tag => (
              <span key={tag} className="text-xs text-white/40 bg-white/10 px-2 py-0.5 rounded-full">#{tag}</span>
            ))}
          </div>
        )}
        <Body size="xs" className="text-white/30 mt-2">← → to navigate · Esc to close</Body>
      </div>
    </div>
  )
}
