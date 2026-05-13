import Link from 'next/link'
import type { BlogPostCard, BlogCategory } from '@pawn-stars/shared-types'

const CATEGORY_STYLES: Record<BlogCategory, { label: string; classes: string }> = {
  analysis:      { label: 'Analysis',      classes: 'bg-primary-100 text-primary-800' },
  'match-reports': { label: 'Match Report', classes: 'bg-success-100 text-success-800' },
  interviews:    { label: 'Interview',     classes: 'bg-accent-100  text-accent-800'  },
  editorial:     { label: 'Editorial',     classes: 'bg-warning-100 text-warning-800' },
  'team-news':   { label: 'Team News',     classes: 'bg-primary-100 text-primary-800' },
}

function fmt(d: Date) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function BlogCard({ post }: { post: BlogPostCard }) {
  const cat = CATEGORY_STYLES[post.category as BlogCategory] ?? { label: post.category, classes: 'bg-primary-100 text-primary-800' }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white rounded-xl border border-primary-200 overflow-hidden hover:border-accent-400 hover:shadow-md transition-all"
    >
      {/* cover */}
      {post.coverImage && (
        <div className="relative h-44 overflow-hidden bg-primary-100 flex-shrink-0">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-5">
        {/* category + read time */}
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${cat.classes}`}>
            {cat.label}
          </span>
          <span className="text-xs text-primary-400">{post.readTime} min read</span>
        </div>

        {/* title */}
        <h2 className="text-base font-bold text-primary-900 group-hover:text-accent-700 transition-colors leading-snug mb-2 line-clamp-2">
          {post.title}
        </h2>

        {/* excerpt */}
        <p className="text-sm text-primary-600 leading-relaxed line-clamp-3 flex-1 mb-4">
          {post.excerpt}
        </p>

        {/* meta */}
        <div className="flex items-center justify-between border-t border-primary-100 pt-3 mt-auto">
          <div>
            <p className="text-xs font-medium text-primary-700">{post.author}</p>
            {post.authorTitle && (
              <p className="text-xs text-primary-400">{post.authorTitle}</p>
            )}
          </div>
          <time className="text-xs text-primary-400" dateTime={post.publishedAt.toISOString()}>
            {fmt(post.publishedAt)}
          </time>
        </div>
      </div>
    </Link>
  )
}
