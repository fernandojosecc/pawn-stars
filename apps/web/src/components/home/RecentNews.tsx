import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { NewsCard } from "@pawn-stars/shared-types"

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
  // Mock data for development
  const mockNews: NewsCard[] = [
    {
      id: "1",
      slug: "pawn-stars-win-national-championship",
      title: "Pawn Stars A Team Claims National Championship Title",
      summary: "In a stunning display of strategic brilliance, our A team secured first place in the National Chess Championship, defeating top-ranked opponents in the final round.",
      coverUrl: "/news/championship-win.jpg",
      tags: ["tournament", "championship", "team"],
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
      id: "2", 
      slug: "magnus-carlsen-joins-training-camp",
      title: "World Champion Magnus Carlsen Joins Training Camp",
      summary: "Former World Champion Magnus Carlsen will be leading an exclusive training camp for our team members next month, sharing insights from his championship experience.",
      coverUrl: "/news/carlsen-camp.jpg",
      tags: ["training", "guest", "grandmaster"],
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
    },
    {
      id: "3",
      slug: "junior-tournament-success",
      title: "Junior Players Shine in Regional Tournament",
      summary: "Our young talents demonstrated exceptional skill at the Regional Junior Tournament, bringing home multiple medals and qualification spots for national events.",
      coverUrl: "/news/junior-success.jpg", 
      tags: ["junior", "tournament", "development"],
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
    }
  ]

  const displayNews = news.length > 0 ? news : mockNews
  const recentNews = displayNews.slice(0, limit)

  const getCategoryColor = (tags: string[]) => {
    if (tags.includes("tournament")) return "bg-accent-100 text-accent-800"
    if (tags.includes("training")) return "bg-success-100 text-success-800"
    if (tags.includes("junior")) return "bg-primary-100 text-primary-800"
    return "bg-primary-50 text-primary-700"
  }

  const getCategoryName = (tags: string[]) => {
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
                {article.coverUrl ? (
                  <img
                    src={article.coverUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                    <Badge className={getCategoryColor(article.tags)}>
                      {getCategoryName(article.tags)}
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
                {article.summary && (
                  <Body size="sm" className="text-primary-600 mb-4 line-clamp-3">
                    {article.summary}
                  </Body>
                )}

                {/* Tags */}
                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-xs text-primary-500 bg-primary-100 px-2 py-1 rounded-full"
                      >
                        #{tag}
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
