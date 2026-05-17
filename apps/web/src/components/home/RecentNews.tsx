import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { NewsCard } from "@pawn-stars/shared-types"

const _now = Date.now()
const DEFAULT_NEWS: NewsCard[] = [
  {
    id: "1",
    slug: "pawn-stars-win-national-championship",
    title: "Pawn Stars A Team Claims National Championship Title",
    excerpt: "In a stunning display of strategic brilliance, our A team secured first place in the National Chess Championship.",
    category: "MATCH_REPORTS" as const,
    author: "Chess News Network",
    publishedAt: new Date(_now - 2 * 24 * 60 * 60 * 1000),
    coverImage: "/news/championship-win.jpg",
    readTime: 5,
    featured: true,
    tags: "tournament, championship, team",
  },
  {
    id: "2",
    slug: "magnus-carlsen-joins-training-camp",
    title: "World Champion Magnus Carlsen Joins Training Camp",
    excerpt: "Former World Champion Magnus Carlsen will be leading an exclusive training camp for our team members.",
    category: "ANNOUNCEMENTS" as const,
    author: "Team Management",
    publishedAt: new Date(_now - 5 * 24 * 60 * 60 * 1000),
    coverImage: "/news/carlsen-camp.jpg",
    readTime: 3,
    featured: false,
    tags: "training, guest, grandmaster",
  },
  {
    id: "3",
    slug: "new-sponsorship-announced",
    title: "Major Sponsorship Deal Announced",
    excerpt: "We're thrilled to announce a new partnership with a leading tech company.",
    category: "ANNOUNCEMENTS" as const,
    author: "Business Development",
    publishedAt: new Date(_now - 7 * 24 * 60 * 60 * 1000),
    coverImage: "/news/sponsorship.jpg",
    readTime: 4,
    featured: false,
    tags: "sponsorship, partnership, business",
  },
]

interface RecentNewsProps {
  news?: NewsCard[]
  limit?: number
  showCategory?: boolean
}

export const RecentNews: React.FC<RecentNewsProps> = ({ 
  news = [], 
  limit = 3, 
  showCategory = true 
}) => {
  const displayNews = news.length > 0 ? news : DEFAULT_NEWS
  const recentNews = displayNews.slice(0, limit)

  const getCategoryColor = (category: string) => {
    if (category === "MATCH_REPORTS") return "bg-accent-100 text-accent-800"
    if (category === "ANNOUNCEMENTS") return "bg-success-100 text-success-800"
    if (category === "TRANSFERS") return "bg-primary-100 text-primary-800"
    return "bg-neutral-100 text-neutral-800"
  }

  const getCategoryName = (tags?: string) => {
    if (!tags) return "News"
    if (tags.includes("tournament")) return "Tournament"
    if (tags.includes("training")) return "Training"
    if (tags.includes("junior")) return "Development"
    if (tags.includes("championship")) return "Championship"
    return "News"
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) return "Today"
    if (days === 1) return "Yesterday"
    if (days < 7) return `${days} days ago`
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }

  return (
    <section className="py-16 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <Heading level="h2" align="center" className="mb-4">
            Latest News
          </Heading>
          <Body size="lg" align="center" className="text-primary-600 max-w-2xl mx-auto">
            Stay updated with the latest achievements, events, and stories from our chess community
          </Body>
        </div>

        {/* News cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {recentNews.map((article, index) => (
            <Card 
              key={article.id}
              className="group hover:shadow-trophy transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Cover image */}
              <div className="aspect-video w-full bg-gradient-to-br from-primary-200 to-primary-300 overflow-hidden">
                {article.coverImage ? (
                  <img
                    src={article.coverImage || "/placeholder-news.jpg"}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-4xl text-primary-400">📰</div>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                {/* Category and date */}
                <div className="flex items-center justify-between mb-3">
                  {showCategory && (
                    <Badge variant="secondary" className={getCategoryColor(article.category)}>
                      {getCategoryName(article.category)}
                    </Badge>
                  )}
                  <span className="text-sm text-primary-500 font-medium">
                    {formatDate(article.publishedAt!)}
                  </span>
                </div>

                {/* Article title */}
                <h3 className="text-xl font-bold text-primary-900 mb-3 line-clamp-2 group-hover:text-accent-600 transition-colors">
                  {article.title}
                </h3>

                {/* Summary */}
                {article.excerpt && (
                  <p className="text-sm text-primary-600 line-clamp-2">
                    {article.excerpt}
                  </p>
                )}

                {/* Tags */}
                {article.tags && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.split(', ').slice(0, 3).map((tag: string, tagIndex: number) => (
                      <span 
                        key={tagIndex}
                        className="text-xs text-primary-500 bg-primary-100 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Read more link */}
                <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-accent-600 hover:text-accent-700">
                  Read More →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            View All News
          </Button>
        </div>
      </div>
    </section>
  )
}
