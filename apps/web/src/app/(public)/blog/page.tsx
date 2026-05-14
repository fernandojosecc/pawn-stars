'use client'

import { useState } from 'react'
import { BlogCard } from '@/components/blog/BlogCard'
import { Heading } from '@/components/typography/Heading'
import { Body } from '@/components/typography/Body'
import type { BlogPostCard } from '@pawn-stars/shared-types'
import { BlogCategory } from '@pawn-stars/shared-types'
import NewsletterSignupForm from '@/components/newsletter/NewsletterSignupForm'

// Mock data — replace with API call when backend is connected
const MOCK_POSTS: BlogPostCard[] = [
  {
    id: 'blog-001', slug: 'opening-theory-ruy-lopez',
    title: 'Opening Theory Deep Dive: The Ruy Lopez Explained',
    excerpt: 'The Ruy Lopez is one of the oldest and most deeply analysed openings in chess. We break down the key ideas, tabiya positions, and why every 1.e4 player needs to understand it.',
    category: BlogCategory.ANALYSIS, author: 'GM Analysis Team', authorTitle: 'Grandmaster Panel',
    publishedAt: new Date('2024-01-20'), updatedAt: new Date('2024-01-22'),
    coverImage: '/blog/ruy-lopez-cover.jpg', readTime: 12, tags: ['openings', 'ruy lopez', 'theory'],
  },
  {
    id: 'blog-002', slug: 'sinquefield-cup-2024-report',
    title: 'Sinquefield Cup 2024: Round-by-Round Report',
    excerpt: 'Carlsen dominates the early rounds with a ruthless display of technique. Full report from the Saint Louis Chess Club with game annotations and standings after each round.',
    category: BlogCategory.MATCH_REPORTS, author: 'Tournament Desk',
    publishedAt: new Date('2024-08-25'), coverImage: '/blog/sinquefield-2024-cover.jpg',
    readTime: 8, tags: ['sinquefield cup', 'carlsen', '2024'],
  },
  {
    id: 'blog-003', slug: 'carlsen-interview-chess-ai',
    title: 'Interview: Magnus Carlsen on the Future of Chess AI',
    excerpt: 'We sat down with Magnus Carlsen to discuss how AI engines have changed elite preparation, whether AlphaZero revealed new chess ideas, and what a world without opening theory would look like.',
    category: BlogCategory.INTERVIEWS, author: 'Pawn Stars Media', authorTitle: 'Editorial',
    publishedAt: new Date('2024-02-15'), coverImage: '/blog/carlsen-ai-interview-cover.jpg',
    readTime: 10, tags: ['magnus carlsen', 'chess ai', 'interview'],
  },
  {
    id: 'blog-004', slug: 'road-to-2800-elite-analysis',
    title: 'The Road to 2800: What Separates Elite from Super-Elite',
    excerpt: 'Only fourteen players have ever crossed 2800 in classical chess. We analyse what separates the very best from the merely excellent — and whether the rating ceiling is a ceiling at all.',
    category: BlogCategory.EDITORIAL, author: 'Chief Editor', authorTitle: 'Editor-in-Chief',
    publishedAt: new Date('2024-03-10'), coverImage: '/blog/road-to-2800-cover.jpg',
    readTime: 15, tags: ['ratings', 'elite chess', 'elo'],
  },
  {
    id: 'blog-005', slug: 'pawn-stars-season-2023-24-review',
    title: 'Pawn Stars 2023–24 Season Review',
    excerpt: "Four tournaments. Thirty-nine games. Eighteen wins. We look back on the most successful season in the club's history — the highlights, the turning points, and what it means for 2024–25.",
    category: BlogCategory.TEAM_NEWS, author: 'Team Management',
    publishedAt: new Date('2024-09-01'), coverImage: '/blog/season-review-2023-24-cover.jpg',
    readTime: 7, tags: ['season review', 'pawn stars', '2023-24'],
  },
]

const ALL_CATEGORIES = [
  { value: 'all',                          label: 'All posts' },
  { value: BlogCategory.ANALYSIS,          label: 'Analysis' },
  { value: BlogCategory.MATCH_REPORTS,     label: 'Match Reports' },
  { value: BlogCategory.INTERVIEWS,        label: 'Interviews' },
  { value: BlogCategory.EDITORIAL,         label: 'Editorial' },
  { value: BlogCategory.TEAM_NEWS,         label: 'Team News' },
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filtered = activeCategory === 'all'
    ? MOCK_POSTS
    : MOCK_POSTS.filter(p => p.category === activeCategory)

  const sorted = [...filtered].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  )

  return (
    <div className="min-h-screen bg-primary-50">
      {/* ── hero ── */}
      <section className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heading level="h1" className="mb-3">Blog</Heading>
          <Body size="lg" className="text-primary-600 max-w-xl mx-auto">
            Analysis, match reports, interviews, and behind-the-scenes coverage from the Pawn Stars team.
          </Body>
        </div>
      </section>

      {/* ── category filter ── */}
      <section className="bg-white border-b border-primary-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.value
                    ? 'bg-primary-900 text-white'
                    : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── post grid ── */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {sorted.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-primary-500">No posts in this category yet.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-primary-400 mb-6">
                {sorted.length} {sorted.length === 1 ? 'post' : 'posts'}
                {activeCategory !== 'all' && ` in ${ALL_CATEGORIES.find(c => c.value === activeCategory)?.label}`}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sorted.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter signup */}
      <section className="py-14 bg-primary-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-accent-400 text-xs font-semibold uppercase tracking-widest mb-3">Newsletter</p>
          <h2 className="text-2xl font-bold text-white mb-2">Analysis in your inbox</h2>
          <p className="text-primary-400 text-sm mb-8 max-w-md mx-auto">
            New opening guides, player profiles and tactical puzzles — straight to your inbox every week.
          </p>
          <NewsletterSignupForm
            compact
            heading=""
            subheading=""
            className="max-w-sm mx-auto"
          />
        </div>
      </section>
    </div>
  )
}
