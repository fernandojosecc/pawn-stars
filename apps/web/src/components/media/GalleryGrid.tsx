import React from "react"
import { Body } from "@/components/typography/Body"
import type { MediaAsset } from "@pawn-stars/shared-types"
import { PhotoPlaceholder } from "./PhotoPlaceholder"

const ASPECT_CLASSES: Record<string, string> = {
  landscape: "aspect-[4/3]",
  portrait:  "aspect-[3/4]",
  square:    "aspect-square",
}

interface GalleryGridProps {
  photos: MediaAsset[]
  onPhotoClick: (photo: MediaAsset) => void
}

export function GalleryGrid({ photos, onPhotoClick }: GalleryGridProps) {
  if (photos.length === 0) {
    return (
      <div className="py-16 text-center">
        <Body className="text-primary-400">No photos found.</Body>
      </div>
    )
  }

  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
      {photos.map((photo) => {
        const aspectClass = ASPECT_CLASSES[photo.aspectRatio ?? "landscape"] ?? ASPECT_CLASSES.landscape
        return (
          <button
            key={photo.id}
            onClick={() => onPhotoClick(photo)}
            className="break-inside-avoid mb-3 block w-full group relative overflow-hidden rounded-xl cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
          >
            {/* Placeholder image */}
            <PhotoPlaceholder
              id={photo.id}
              title={photo.title}
              className={`w-full ${aspectClass} transition-transform duration-300 group-hover:scale-105`}
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 rounded-xl flex flex-col justify-end p-3">
              <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-xs font-medium bg-accent-500 text-white px-2 py-0.5 rounded-full">
                    Photo
                  </span>
                  {photo.tournamentName && (
                    <span className="text-xs text-white/70 truncate">{photo.tournamentName}</span>
                  )}
                </div>
                <p className="text-white text-sm font-semibold leading-snug text-left line-clamp-2">
                  {photo.title}
                </p>
              </div>
            </div>

            {/* Always-visible expand icon */}
            <div className="absolute top-2 right-2 w-7 h-7 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
          </button>
        )
      })}
    </div>
  )
}
