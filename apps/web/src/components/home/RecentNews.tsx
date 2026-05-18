import React from "react"
import Link from "next/link"
import { NewsCard } from "@pawn-stars/shared-types"

const _now = Date.now()
const DEFAULT_NEWS: NewsCard[] = [
  {
    id: "1",
    slug: "sanchez-extension-2027",
    title: "Sánchez Signs Extension Through 2027",
    excerpt: "Star player Andrés Sánchez has committed to the organization for two more seasons.",
    category: "TRANSFERS" as const,
    author: "Team Management",
    publishedAt: new Date(_now - 15 * 24 * 60 * 60 * 1000),
    readTime: 2,
    featured: true,
    tags: "transfer, contract",
  },
  {
    id: "2",
    slug: "dominant-win-gambito-elite",
    title: "Dominant 6.5–1.5 Win Over Gambito Elite",
    excerpt: "A commanding performance across all eight boards secured a decisive victory.",
    category: "MATCH_REPORTS" as const,
    author: "Chess News Network",
    publishedAt: new Date(_now - 19 * 24 * 60 * 60 * 1000),
    readTime: 4,
    featured: false,
    tags: "match, victory",
  },
  {
    id: "3",
    slug: "wsc-open-qualifier",
    title: "Pawn Stars Confirm Entry to WSC Open Qualifier",
    excerpt: "The organization will compete in the upcoming WSC Open Qualifier.",
    category: "ANNOUNCEMENTS" as const,
    author: "Team Management",
    publishedAt: new Date(_now - 26 * 24 * 60 * 60 * 1000),
    readTime: 1,
    featured: false,
    tags: "announcement, qualifier",
  },
  {
    id: "4",
    slug: "we-prep-every-opponent",
    title: '"We prep every opponent like it\'s a final" — Coach Miraldo',
    excerpt: "Head coach Miraldo on the team's preparation philosophy and the road ahead.",
    category: "ANNOUNCEMENTS" as const,
    author: "Pawn Stars Media",
    publishedAt: new Date(_now - 33 * 24 * 60 * 60 * 1000),
    readTime: 6,
    featured: false,
    tags: "interview, coaching",
  },
]

const CATEGORY_LABELS: Record<string, string> = {
  MATCH_REPORTS: "MATCH REPORT",
  ANNOUNCEMENTS: "ANNOUNCEMENT",
  TRANSFERS: "TRANSFER",
  INTERVIEWS: "INTERVIEW",
}

interface RecentNewsProps {
  news?: NewsCard[]
  limit?: number
  showCategory?: boolean
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export const RecentNews: React.FC<RecentNewsProps> = ({
  news = [],
  limit = 4,
  showCategory = true,
}) => {
  const displayNews = news.length > 0 ? news : DEFAULT_NEWS
  const items = displayNews.slice(0, limit)

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl sm:text-4xl tracking-wide">
          <span className="text-white">LATEST </span>
          <span className="text-gold">NEWS</span>
        </h2>
        <Link
          href="/news"
          className="font-mono text-xs tracking-widest text-carbon-800 hover:text-white transition-colors"
        >
          All news →
        </Link>
      </div>

      {/* News list */}
      <div className="divide-y divide-carbon-300">
        {items.map((article) => (
          <Link
            key={article.id}
            href={`/news/${article.slug}`}
            className="flex items-start gap-3 py-4 group hover:bg-carbon-100 -mx-3 px-3 transition-colors"
          >
            <div className="flex-1 min-w-0">
              {showCategory && article.category && (
                <span className="font-mono text-[10px] tracking-widest text-gold block mb-1">
                  {CATEGORY_LABELS[article.category] ?? article.category}
                </span>
              )}
              <h3 className="font-sans font-semibold text-white text-sm leading-snug group-hover:text-gold transition-colors line-clamp-2">
                {article.title}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="font-mono text-[10px] text-carbon-700">
                  {formatDate(article.publishedAt!)}
                </span>
                {article.readTime && (
                  <span className="font-mono text-[10px] text-carbon-700">
                    {article.readTime} min
                  </span>
                )}
              </div>
            </div>
            <span className="text-carbon-600 group-hover:text-gold transition-colors text-sm mt-0.5 shrink-0">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
