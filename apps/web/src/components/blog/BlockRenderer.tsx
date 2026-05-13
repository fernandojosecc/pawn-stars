import type { BlogBlock } from '@pawn-stars/shared-types'
import { TextBlock }    from './blocks/TextBlock'
import { QuoteBlock }   from './blocks/QuoteBlock'
import { StatBlock }    from './blocks/StatBlock'
import { EmbedBlock }   from './blocks/EmbedBlock'
import { GalleryBlock } from './blocks/GalleryBlock'

export function BlockRenderer({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'text':    return <TextBlock    key={i} block={block} />
          case 'quote':   return <QuoteBlock   key={i} block={block} />
          case 'stat':    return <StatBlock    key={i} block={block} />
          case 'embed':   return <EmbedBlock   key={i} block={block} />
          case 'gallery': return <GalleryBlock key={i} block={block} />
          default:        return null
        }
      })}
    </div>
  )
}
