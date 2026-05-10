import React from "react"
import { Body } from "@/components/typography/Body"
import type { MediaAsset } from "@pawn-stars/shared-types"
import { PhotoPlaceholder } from "./PhotoPlaceholder"

interface VideoCardProps {
  video: MediaAsset
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="bg-white rounded-xl border border-primary-200 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <PhotoPlaceholder
          id={video.id}
          title={video.title}
          className="w-full h-full transition-transform duration-300 group-hover:scale-105"
        />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors border border-white/30">
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duration badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-mono px-2 py-0.5 rounded">
            {video.duration}
          </div>
        )}

        {/* Type badge */}
        <div className="absolute top-2 left-2">
          <span className="text-xs font-medium bg-blue-500 text-white px-2 py-0.5 rounded-full">Video</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <Body size="sm" weight="semibold" className="text-primary-900 line-clamp-2 leading-snug">
          {video.title}
        </Body>
        {video.description && (
          <Body size="xs" className="text-primary-500 mt-1 line-clamp-2">{video.description}</Body>
        )}
        <div className="flex items-center justify-between mt-3">
          {video.tournamentName ? (
            <Body size="xs" className="text-primary-400 truncate">{video.tournamentName}</Body>
          ) : (
            <span />
          )}
          <Body size="xs" className="text-primary-400 flex-shrink-0">
            {new Date(video.uploadedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </Body>
        </div>
      </div>
    </div>
  )
}
