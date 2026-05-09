import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { NewsCard as NewsCardType } from "@pawn-stars/shared-types"

interface NewsCardProps {
  news: NewsCardType
  showCategory?: boolean
  showAuthor?: boolean
  showReadTime?: boolean
  compact?: boolean
  onClick?: () => void
}

export const NewsCardComponent: React.FC<NewsCardProps> = ({ 
  news, 
  showCategory = true, 
  showAuthor = true,
  showReadTime = true,
  compact = false,
  onClick 
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ANNOUNCEMENTS":
        return "bg-primary-100 text-primary-800"
      case "MATCH_REPORTS":
        return "bg-success-100 text-success-800"
      case "TRANSFERS":
        return "bg-accent-100 text-accent-800"
      case "INTERVIEWS":
        return "bg-warning-100 text-warning-800"
      case "EDITORIAL":
        return "bg-danger-100 text-danger-800"
      default:
        return "bg-primary-100 text-primary-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ANNOUNCEMENTS":
        return "📢"
      case "MATCH_REPORTS":
        return "♟️"
      case "TRANSFERS":
        return "🔄"
      case "INTERVIEWS":
        return "🎤"
      case "EDITORIAL":
        return "📝"
      default:
        return "📰"
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const getRelativeTime = (date: Date) => {
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    return `${Math.floor(diffInDays / 30)} months ago`
  }

  const isFeatured = news.featured
  const cardSize = compact ? "p-4" : "p-6"
  const titleSize = compact ? "text-lg" : "text-xl"

  return (
    <Card 
      className={`group hover:shadow-trophy transition-all duration-300 hover:-translate-y-1 cursor-pointer ${compact ? 'h-full' : ''}`}
      onClick={onClick}
    >
      <CardContent className={`${cardSize}`}>
        <div className="space-y-4">
          {/* Featured Badge */}
          {isFeatured && (
            <div className="flex items-center gap-2">
              <Badge className="bg-accent-500 text-white">
                ⭐ Featured
              </Badge>
            </div>
          )}

          {/* Cover Image */}
          {news.coverImage && (
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={news.coverImage}
                alt={news.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          )}

          {/* Header with Category and Date */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              {showCategory && (
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getCategoryColor(news.category)}>
                    <span className="mr-1">{getCategoryIcon(news.category)}</span>
                    {news.category.replace('_', ' ')}
                  </Badge>
                </div>
              )}
              
              <Heading level="h3" className={`${titleSize} font-bold text-primary-900 group-hover:text-accent-600 transition-colors line-clamp-2`}>
                {news.title}
              </Heading>
            </div>
          </div>

          {/* Excerpt */}
          <Body size="base" className="text-primary-600 line-clamp-3">
            {news.excerpt}
          </Body>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-primary-500">
            {/* Date */}
            <div className="flex items-center gap-1">
              <span className="text-base">📅</span>
              <span>{getRelativeTime(news.publishedAt)}</span>
            </div>

            {/* Author */}
            {showAuthor && (
              <div className="flex items-center gap-1">
                <span className="text-base">✍️</span>
                <span>{news.author}</span>
              </div>
            )}

            {/* Read Time */}
            {showReadTime && news.readTime && (
              <div className="flex items-center gap-1">
                <span className="text-base">⏱️</span>
                <span>{news.readTime} min read</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-primary-200">
            <div className="text-xs text-primary-400">
              {formatDate(news.publishedAt)}
            </div>
            <Button variant="outline" size="sm">
              Read More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
