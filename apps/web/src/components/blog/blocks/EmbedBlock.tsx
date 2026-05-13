'use client'

import { useState } from 'react'
import type { EmbedBlock as EmbedBlockType } from '@pawn-stars/shared-types'

const ASPECT_CLASSES: Record<string, string> = {
  '16:9': 'pb-[56.25%]',
  '4:3':  'pb-[75%]',
  '1:1':  'pb-[100%]',
}

export function EmbedBlock({ block }: { block: EmbedBlockType }) {
  const [loaded, setLoaded] = useState(false)
  const paddingClass = ASPECT_CLASSES[block.aspectRatio ?? '16:9']

  return (
    <figure className="my-2">
      <div className={`relative w-full ${paddingClass} bg-primary-100 rounded-xl overflow-hidden`}>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-primary-300 border-t-accent-500 animate-spin" />
          </div>
        )}
        <iframe
          src={block.url}
          title={block.title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
      </div>
      <figcaption className="mt-2 text-xs text-primary-400 text-center">
        {block.title}
        {block.provider && block.provider !== 'other' && (
          <span className="ml-1 capitalize text-primary-300">via {block.provider}</span>
        )}
      </figcaption>
    </figure>
  )
}
