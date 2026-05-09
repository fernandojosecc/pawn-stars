import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { NewsCategory } from "@pawn-stars/shared-types"

interface CategoryFilterBarProps {
  selectedCategory: NewsCategory | "ALL"
  onCategoryChange: (category: NewsCategory | "ALL") => void
  categoryCounts?: Record<NewsCategory | "ALL", number>
  showCounts?: boolean
  compact?: boolean
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  selectedCategory,
  onCategoryChange,
  categoryCounts,
  showCounts = true,
  compact = false
}) => {
  const categories: (NewsCategory | "ALL")[] = [
    "ALL",
    "ANNOUNCEMENTS",
    "MATCH_REPORTS",
    "TRANSFERS",
    "INTERVIEWS",
    "EDITORIAL"
  ]

  const getCategoryColor = (category: NewsCategory | "ALL") => {
    switch (category) {
      case "ALL":
        return "bg-primary-100 text-primary-800 hover:bg-primary-200"
      case "ANNOUNCEMENTS":
        return "bg-primary-100 text-primary-800 hover:bg-primary-200"
      case "MATCH_REPORTS":
        return "bg-success-100 text-success-800 hover:bg-success-200"
      case "TRANSFERS":
        return "bg-accent-100 text-accent-800 hover:bg-accent-200"
      case "INTERVIEWS":
        return "bg-warning-100 text-warning-800 hover:bg-warning-200"
      case "EDITORIAL":
        return "bg-danger-100 text-danger-800 hover:bg-danger-200"
      default:
        return "bg-primary-100 text-primary-800 hover:bg-primary-200"
    }
  }

  const getCategoryIcon = (category: NewsCategory | "ALL") => {
    switch (category) {
      case "ALL":
        return "📰"
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

  const getCategoryLabel = (category: NewsCategory | "ALL") => {
    switch (category) {
      case "ALL":
        return "All News"
      case "ANNOUNCEMENTS":
        return "Announcements"
      case "MATCH_REPORTS":
        return "Match Reports"
      case "TRANSFERS":
        return "Transfers"
      case "INTERVIEWS":
        return "Interviews"
      case "EDITORIAL":
        return "Editorial"
      default:
        return category
    }
  }

  const getCategoryDescription = (category: NewsCategory | "ALL") => {
    switch (category) {
      case "ALL":
        return "View all news articles"
      case "ANNOUNCEMENTS":
        return "Official announcements and updates"
      case "MATCH_REPORTS":
        return "Tournament match reports and analysis"
      case "TRANSFERS":
        return "Player transfers and team changes"
      case "INTERVIEWS":
        return "Exclusive interviews with players and staff"
      case "EDITORIAL":
        return "Opinion pieces and editorial content"
      default:
        return ""
    }
  }

  const activeCount = categoryCounts ? categoryCounts[selectedCategory] : 0
  const totalCount = categoryCounts ? categoryCounts["ALL"] : 0

  return (
    <section className={`py-6 ${compact ? 'bg-primary-50' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Header */}
          <div className="flex-1">
            <Heading level="h2" className="mb-2">
              Filter by Category
            </Heading>
            {!compact && (
              <Body size="base" className="text-primary-600">
                {selectedCategory === "ALL" 
                  ? `Showing all ${totalCount} news articles`
                  : `${getCategoryLabel(selectedCategory)}: ${activeCount} articles`
                }
              </Body>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-primary-500 font-medium">Filter:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = selectedCategory === category
                const count = categoryCounts ? categoryCounts[category] : 0
                
                return (
                  <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? getCategoryColor(category)
                        : "bg-white text-primary-600 hover:bg-primary-50 border border-primary-200"
                    } ${compact ? 'px-3 py-1 text-xs' : ''}`}
                  >
                    <span className="mr-2">{getCategoryIcon(category)}</span>
                    <span>{getCategoryLabel(category)}</span>
                    {showCounts && count > 0 && (
                      <span className="ml-2 text-xs opacity-75">
                        ({count})
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Active Filter Description */}
        {selectedCategory !== "ALL" && !compact && (
          <div className="mt-4 p-4 bg-primary-50 rounded-lg border border-primary-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getCategoryIcon(selectedCategory)}</span>
                <div>
                  <div className="font-semibold text-primary-900">
                    {getCategoryLabel(selectedCategory)}
                  </div>
                  <div className="text-sm text-primary-600">
                    {getCategoryDescription(selectedCategory)}
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCategoryChange("ALL")}
              >
                Clear Filter
              </Button>
            </div>
          </div>
        )}

        {/* Category Statistics (non-compact) */}
        {!compact && categoryCounts && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category) => {
              const count = categoryCounts[category]
              const isActive = selectedCategory === category
              
              return (
                <div
                  key={category}
                  className={`text-center p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-primary-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                  onClick={() => onCategoryChange(category)}
                >
                  <div className="text-2xl mb-1">{getCategoryIcon(category)}</div>
                  <div className="text-lg font-bold text-primary-900">{count}</div>
                  <div className="text-xs text-primary-600">
                    {getCategoryLabel(category)}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
