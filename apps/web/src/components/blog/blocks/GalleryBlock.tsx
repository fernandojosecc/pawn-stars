'use client'

import { useState, useCallback, useEffect } from 'react'
import type { GalleryBlock as GalleryBlockType, GalleryImage } from '@pawn-stars/shared-types'

function Lightbox({
  image,
  onClose,
}: {
  image: GalleryImage
  onClose: () => void
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-950/90 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      <div
        className="relative max-w-4xl w-full"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm font-medium"
          aria-label="Close lightbox"
        >
          Close
        </button>
        <img
          src={image.src}
          alt={image.alt}
          className="w-full rounded-xl object-contain max-h-[80vh]"
        />
        {image.caption && (
          <p className="mt-3 text-center text-sm text-primary-300">{image.caption}</p>
        )}
      </div>
    </div>
  )
}

export function GalleryBlock({ block }: { block: GalleryBlockType }) {
  const [active, setActive] = useState<GalleryImage | null>(null)
  const close = useCallback(() => setActive(null), [])

  const colClass = block.columns === 3
    ? 'grid-cols-1 sm:grid-cols-3'
    : 'grid-cols-1 sm:grid-cols-2'

  return (
    <figure className="my-2">
      <div className={`grid ${colClass} gap-3`}>
        {block.images.map((img, i) => (
          <button
            key={i}
            className="group relative overflow-hidden rounded-xl bg-primary-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
            onClick={() => setActive(img)}
            aria-label={`Open ${img.alt} in lightbox`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/30 transition-colors duration-200" />
            {img.caption && (
              <p className="absolute bottom-0 left-0 right-0 px-3 py-2 text-xs text-white bg-primary-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-left">
                {img.caption}
              </p>
            )}
          </button>
        ))}
      </div>

      {active && <Lightbox image={active} onClose={close} />}
    </figure>
  )
}
