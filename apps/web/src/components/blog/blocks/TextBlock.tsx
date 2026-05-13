import type { TextBlock as TextBlockType } from '@pawn-stars/shared-types'

export function TextBlock({ block }: { block: TextBlockType }) {
  return (
    <div
      className="prose-block text-primary-800 leading-relaxed space-y-4
        [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-primary-900 [&_h2]:mt-8 [&_h2]:mb-3
        [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-primary-900 [&_h3]:mt-6 [&_h3]:mb-2
        [&_p]:text-base [&_p]:text-primary-700 [&_p]:leading-7
        [&_strong]:font-semibold [&_strong]:text-primary-900
        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:text-primary-700
        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_ol]:text-primary-700
        [&_a]:text-accent-600 [&_a]:underline [&_a]:underline-offset-2"
      dangerouslySetInnerHTML={{ __html: block.html }}
    />
  )
}
