"use client"

import React, { useState, useMemo } from "react"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import type { MediaAsset, MediaType } from "@pawn-stars/shared-types"
import { MediaFilterBar } from "./MediaFilterBar"
import { GalleryGrid } from "./GalleryGrid"
import { Lightbox } from "./Lightbox"
import { VideoCard } from "./VideoCard"
import { DocumentCard } from "./DocumentCard"

type FilterTab = "all" | MediaType

interface Tournament { slug: string; name: string }

interface MediaContentProps {
  assets:      MediaAsset[]
  tournaments: Tournament[]
}

export function MediaContent({ assets, tournaments }: MediaContentProps) {
  const [activeType,        setActiveType]        = useState<FilterTab>("all")
  const [tournamentFilter,  setTournamentFilter]  = useState("")
  const [lightboxPhoto,     setLightboxPhoto]     = useState<MediaAsset | null>(null)

  const filtered = useMemo(() => {
    let list = assets
    if (activeType !== "all") list = list.filter(a => a.type === activeType)
    if (tournamentFilter) list = list.filter(a => a.tournamentSlug === tournamentFilter)
    return list
  }, [assets, activeType, tournamentFilter])

  const photos    = filtered.filter(a => a.type === "photo")
  const videos    = filtered.filter(a => a.type === "video")
  const documents = filtered.filter(a => a.type === "document")

  // For counts badge in filter bar (without type filter, but respecting tournament filter)
  const counts = useMemo<Record<FilterTab, number>>(() => {
    const base = tournamentFilter ? assets.filter(a => a.tournamentSlug === tournamentFilter) : assets
    return {
      all:      base.length,
      photo:    base.filter(a => a.type === "photo").length,
      video:    base.filter(a => a.type === "video").length,
      document: base.filter(a => a.type === "document").length,
    }
  }, [assets, tournamentFilter])

  // Lightbox navigation through filtered photos only
  const lightboxPhotos = photos
  const lightboxIdx    = lightboxPhoto ? lightboxPhotos.findIndex(p => p.id === lightboxPhoto.id) : -1

  function goPrev() {
    if (lightboxIdx > 0) setLightboxPhoto(lightboxPhotos[lightboxIdx - 1] ?? null)
  }
  function goNext() {
    if (lightboxIdx < lightboxPhotos.length - 1) setLightboxPhoto(lightboxPhotos[lightboxIdx + 1] ?? null)
  }

  const showPhotos    = activeType === "all" || activeType === "photo"
  const showVideos    = activeType === "all" || activeType === "video"
  const showDocuments = activeType === "all" || activeType === "document"

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <MediaFilterBar
        activeType={activeType}
        onTypeChange={setActiveType}
        tournamentFilter={tournamentFilter}
        onTournamentChange={setTournamentFilter}
        tournaments={tournaments}
        counts={counts}
      />

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <Body className="text-primary-400">No assets match the current filters.</Body>
        </div>
      )}

      {/* Photos section */}
      {showPhotos && photos.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Heading level="h2" className="text-primary-900 text-xl font-bold">Photos</Heading>
            <span className="text-sm text-primary-400">{photos.length}</span>
          </div>
          <GalleryGrid photos={photos} onPhotoClick={setLightboxPhoto} />
        </section>
      )}

      {/* Videos section */}
      {showVideos && videos.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Heading level="h2" className="text-primary-900 text-xl font-bold">Videos</Heading>
            <span className="text-sm text-primary-400">{videos.length}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map(v => <VideoCard key={v.id} video={v} />)}
          </div>
        </section>
      )}

      {/* Documents section */}
      {showDocuments && documents.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Heading level="h2" className="text-primary-900 text-xl font-bold">Press Kit &amp; Documents</Heading>
            <span className="text-sm text-primary-400">{documents.length}</span>
          </div>
          <div className="space-y-3">
            {documents.map(d => <DocumentCard key={d.id} doc={d} />)}
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxPhoto && (
        <Lightbox
          photos={lightboxPhotos}
          current={lightboxPhoto}
          onClose={() => setLightboxPhoto(null)}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  )
}
