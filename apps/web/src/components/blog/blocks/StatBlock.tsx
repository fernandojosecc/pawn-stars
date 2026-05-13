import type { StatBlock as StatBlockType } from '@pawn-stars/shared-types'

export function StatBlock({ block }: { block: StatBlockType }) {
  return (
    <div className="my-2 bg-primary-900 rounded-xl px-6 py-6 text-center">
      <p className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-1">
        {block.value}
      </p>
      <p className="text-sm font-semibold text-accent-400 uppercase tracking-wide mb-2">
        {block.label}
      </p>
      {block.context && (
        <p className="text-xs text-primary-400 max-w-sm mx-auto leading-relaxed">
          {block.context}
        </p>
      )}
    </div>
  )
}
