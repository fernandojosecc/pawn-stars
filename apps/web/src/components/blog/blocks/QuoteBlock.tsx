import type { QuoteBlock as QuoteBlockType } from '@pawn-stars/shared-types'

export function QuoteBlock({ block }: { block: QuoteBlockType }) {
  return (
    <figure className="my-2 border-l-4 border-accent-500 bg-accent-50 rounded-r-xl px-6 py-5">
      <blockquote>
        <p className="text-lg font-medium text-primary-900 leading-relaxed italic">
          &ldquo;{block.text}&rdquo;
        </p>
      </blockquote>
      <figcaption className="mt-3 flex items-center gap-2">
        <span className="w-6 h-px bg-accent-400" aria-hidden="true" />
        <div>
          <span className="text-sm font-semibold text-accent-700">{block.author}</span>
          {block.authorTitle && (
            <span className="text-sm text-primary-500 ml-1.5">— {block.authorTitle}</span>
          )}
        </div>
      </figcaption>
    </figure>
  )
}
