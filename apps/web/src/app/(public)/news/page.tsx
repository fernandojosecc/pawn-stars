"use client"

import React, { useState, useEffect } from "react"
import { NewsCardComponent } from "@/components/news/NewsCard"
import { CategoryFilterBar } from "@/components/news/CategoryFilterBar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { NewsCard, NewsCategory } from "@pawn-stars/shared-types"
import NewsletterSignupForm from "@/components/newsletter/NewsletterSignupForm"

// Mock data for development - this would come from API in production
const mockNews: NewsCard[] = [
  {
    id: "1",
    slug: "magnus-carlsen-wins-world-championship-2023",
    title: "Magnus Carlsen Retains World Championship Title in Dramatic Final",
    excerpt: "In a stunning display of chess mastery, Magnus Carlsen successfully defended his World Championship title against Ian Nepomniachtchi in a thrilling 14-game match that concluded today in Dubai.",
    category: "MATCH_REPORTS",
    author: "Chess Analyst",
    publishedAt: new Date("2023-12-15"),
    coverImage: "/news/magnus-championship-2023.jpg",
    readTime: 8,
    featured: true,
    tags: "world championship, magnus carlsen, ian nepomniachtchi"
  },
  {
    id: "2",
    slug: "pawn-stars-signs-new-prodigy",
    title: "Pawn Stars Announces Signing of 16-Year-Old Chess Prodigy",
    excerpt: "The organization is proud to welcome a new young talent to our roster. This rising star has already made waves in the international chess circuit with impressive performances in major tournaments.",
    category: "TRANSFERS",
    author: "Team Management",
    publishedAt: new Date("2024-01-10"),
    coverImage: "/news/new-prodigy-signing.jpg",
    readTime: 5,
    featured: true,
    tags: "transfers, new signing, prodigy"
  },
  {
    id: "3",
    slug: "exclusive-interview-fabiano-caruana",
    title: "Exclusive Interview: Fabiano Caruana on His World Championship Journey",
    excerpt: "American grandmaster Fabiano Caruana shares his thoughts on preparation, strategy, and the future of chess in this exclusive interview with Pawn Stars media.",
    category: "INTERVIEWS",
    author: "Sports Journalist",
    publishedAt: new Date("2024-01-08"),
    coverImage: "/news/caruana-interview.jpg",
    readTime: 12,
    featured: false,
    tags: "interview, fabiano caruana, world championship"
  },
  {
    id: "4",
    slug: "tata-steel-tournament-preview",
    title: "Tata Steel Masters 2024: Complete Tournament Preview",
    excerpt: "The prestigious Tata Steel Masters tournament kicks off next week with a stellar field of top grandmasters. Here's everything you need to know about this year's competition.",
    category: "EDITORIAL",
    author: "Chess Correspondent",
    publishedAt: new Date("2024-01-05"),
    coverImage: "/news/tata-steel-preview.jpg",
    readTime: 6,
    featured: false,
    tags: "tata steel, tournament preview, grandmasters"
  },
  {
    id: "5",
    slug: "new-training-facility-announcement",
    title: "Pawn Stars Opens State-of-the-Art Training Facility in New York",
    excerpt: "We are excited to announce the opening of our new headquarters and training facility in Manhattan, featuring world-class amenities for our players and staff.",
    category: "ANNOUNCEMENTS",
    author: "Organization Leadership",
    publishedAt: new Date("2024-01-03"),
    coverImage: "/news/new-facility.jpg",
    readTime: 4,
    featured: true,
    tags: "announcement, new facility, headquarters"
  },
  {
    id: "6",
    slug: "candidates-tournament-analysis",
    title: "Candidates Tournament 2024: Key Players and Predictions",
    excerpt: "With the Candidates Tournament just around the corner, our chess experts analyze the field and make their predictions for who will challenge for the World Championship.",
    category: "EDITORIAL",
    author: "Chess Analyst",
    publishedAt: new Date("2024-03-15"),
    coverImage: "/news/candidates-analysis.jpg",
    readTime: 10,
    featured: false,
    tags: "candidates tournament, analysis, predictions"
  },
  {
    id: "7",
    slug: "ding-liren-interview",
    title: "Interview with World Champion Ding Liren: The Road to Victory",
    excerpt: "Fresh from his World Championship triumph, Ding Liren discusses his journey, his playing style, and his plans for the future in this exclusive interview.",
    category: "INTERVIEWS",
    author: "Senior Journalist",
    publishedAt: new Date("2023-12-20"),
    coverImage: "/news/ding-interview.jpg",
    readTime: 15,
    featured: true,
    tags: "interview, ding liren, world champion"
  },
  {
    id: "8",
    slug: "sinquefield-cup-report",
    title: "Sinquefield Cup 2024: Round 5 Thrills and Surprises",
    excerpt: "The fifth round of the Sinquefield Cup delivered spectacular games and unexpected results, shaking up the tournament standings in dramatic fashion.",
    category: "MATCH_REPORTS",
    author: "Tournament Reporter",
    publishedAt: new Date("2024-08-25"),
    coverImage: "/news/sinquefield-round5.jpg",
    readTime: 7,
    featured: false,
    tags: "sinquefield cup, match report, tournament"
  },
  {
    id: "9",
    slug: "junior-program-launch",
    title: "Pawn Stars Launches Elite Junior Development Program",
    excerpt: "Our organization is proud to introduce a comprehensive development program designed to nurture young chess talent and provide them with world-class training resources.",
    category: "ANNOUNCEMENTS",
    author: "Program Director",
    publishedAt: new Date("2024-02-01"),
    coverImage: "/news/junior-program.jpg",
    readTime: 5,
    featured: false,
    tags: "announcement, junior program, development"
  },
  {
    id: "10",
    slug: "alireza-firouzja-profile",
    title: "Rising Star: The Alireza Firouzja Story",
    excerpt: "From teenage prodigy to top-10 grandmaster, we trace the remarkable journey of Alireza Firouzja and analyze what makes him one of the most exciting players in modern chess.",
    category: "EDITORIAL",
    author: "Chess Historian",
    publishedAt: new Date("2024-01-20"),
    coverImage: "/news/firouzja-profile.jpg",
    readTime: 9,
    featured: false,
    tags: "profile, alireza firouzja, rising star"
  },
  {
    id: "11",
    slug: "world-rapid-championship-report",
    title: "World Rapid Championship 2024: Historic Upsets and Brilliant Games",
    excerpt: "The World Rapid Championship delivered unprecedented excitement with multiple upsets and brilliant attacking games that will be remembered for years to come.",
    category: "MATCH_REPORTS",
    author: "Tournament Analyst",
    publishedAt: new Date("2024-12-30"),
    coverImage: "/news/rapid-championship.jpg",
    readTime: 11,
    featured: true,
    tags: "world rapid, championship, upsets"
  },
  {
    id: "12",
    slug: "transfer-window-analysis",
    title: "Winter Transfer Window: Major Moves and Market Analysis",
    excerpt: "The winter transfer window has seen significant movement in the chess world. We analyze the major transfers and their potential impact on team dynamics.",
    category: "TRANSFERS",
    author: "Transfer Expert",
    publishedAt: new Date("2024-01-15"),
    coverImage: "/news/transfer-analysis.jpg",
    readTime: 8,
    featured: false,
    tags: "transfers, market analysis, winter window"
  }
]

type NewsCategoryFilter = NewsCategory | "ALL"

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategoryFilter>("ALL")
  const [filteredNews, setFilteredNews] = useState<NewsCard[]>(mockNews)
  const [isLoading, setIsLoading] = useState(false)

  // Filter news based on selected category
  useEffect(() => {
    setIsLoading(true)
    // Simulate API call delay
    const timeout = setTimeout(() => {
      if (selectedCategory === "ALL") {
        setFilteredNews(mockNews)
      } else {
        setFilteredNews(mockNews.filter(news => news.category === selectedCategory))
      }
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timeout)
  }, [selectedCategory])

  // Calculate category counts
  const categoryCounts = mockNews.reduce((acc, news) => {
    acc["ALL"] = (acc["ALL"] || 0) + 1
    acc[news.category] = (acc[news.category] || 0) + 1
    return acc
  }, {} as Record<NewsCategoryFilter, number>)

  const handleNewsClick = (news: NewsCard) => {
    // In a real app, this would navigate to news detail page
    console.log(`Navigate to news: ${news.slug}`)
  }

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heading level="h1" className="mb-4">
              Chess News & Updates
            </Heading>
            <Body size="lg" className="text-primary-600 max-w-2xl mx-auto">
              Stay up to date with the latest chess news, tournament reports, player interviews, and organizational announcements.
            </Body>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <CategoryFilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categoryCounts={categoryCounts}
        showCounts={true}
        compact={false}
      />

      {/* Featured News Section */}
      {selectedCategory === "ALL" && (
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Heading level="h2" className="mb-6">
              Featured Articles
            </Heading>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {mockNews
                .filter(news => news.featured)
                .slice(0, 3)
                .map((news) => (
                  <NewsCardComponent
                    key={news.id}
                    news={news}
                    onClick={() => handleNewsClick(news)}
                  />
                ))}
            </div>
          </div>
        </section>
      )}

      {/* All News Grid */}
      <section className="py-8 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Heading level="h2" className="mb-2">
                {selectedCategory === "ALL" ? "All News" : `${selectedCategory.replace('_', ' ')}`}
              </Heading>
              <Body size="base" className="text-primary-600">
                {filteredNews.length} article{filteredNews.length !== 1 ? 's' : ''} found
              </Body>
            </div>
            
            {/* Active Filter Display */}
            {selectedCategory !== "ALL" && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-primary-500">Filter:</span>
                <Badge className="bg-primary-100 text-primary-800">
                  {selectedCategory.replace('_', ' ')}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory("ALL")}
                >
                  Clear
                </Button>
              </div>
            )}
          </div>

          {/* News Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📰</div>
              <Heading level="h3" className="mb-2">
                No articles found
              </Heading>
              <Body size="base" className="text-primary-600">
                Try selecting a different category or check back later for new articles.
              </Body>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((news) => (
                <NewsCardComponent
                  key={news.id}
                  news={news}
                  onClick={() => handleNewsClick(news)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <Heading level="h2" className="mb-3">
              Stay Updated
            </Heading>
            <Body size="base" className="text-primary-600 mb-6">
              Get the latest chess news delivered directly to your inbox.
            </Body>
            <NewsletterSignupForm compact className="max-w-md mx-auto" />
          </div>
        </div>
      </section>
    </div>
  )
}
