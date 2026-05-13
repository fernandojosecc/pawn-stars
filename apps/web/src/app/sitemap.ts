import type { MetadataRoute } from "next"

const BASE_URL = "https://pawnstars.com"

// In production these come from the API/DB
const PLAYER_SLUGS = [
  "magnus-carlsen", "fabiano-caruana", "ding-liren", "ian-nepomniachtchi",
  "alireza-firouzja", "hou-yifan", "levon-aronian", "wesley-so", "anish-giri",
  "shakhriyar-mamedyarov", "hikaru-nakamura", "richard-rapport",
  "viswanathan-anand", "vladimir-kramnik", "judit-polgar",
]

const TOURNAMENT_SLUGS = [
  "tata-steel-masters-2024", "world-chess-championship-2023", "sinquefield-cup-2023",
  "candidates-tournament-2023", "norway-chess-2023", "world-rapid-championship-2022",
  "fide-grand-prix-berlin-2022", "olympiad-2022", "tata-steel-masters-2025",
  "candidates-tournament-2024", "world-chess-championship-2024", "sinquefield-cup-2024",
]

const NEWS_SLUGS = [
  "magnus-carlsen-wins-world-championship-2023", "pawn-stars-signs-new-prodigy",
  "exclusive-interview-fabiano-caruana", "tata-steel-tournament-preview",
  "new-training-facility-announcement", "candidates-tournament-analysis",
  "ding-liren-interview", "sinquefield-cup-report", "junior-program-launch",
  "alireza-firouzja-profile", "world-rapid-championship-report", "transfer-window-analysis",
]

const MATCH_IDS = ["match-001", "match-002", "match-003"]

const BLOG_SLUGS = [
  "opening-theory-ruy-lopez",
  "sinquefield-cup-2024-report",
  "carlsen-interview-chess-ai",
  "road-to-2800-elite-analysis",
  "pawn-stars-season-2023-24-review",
]

const SEASON_SLUGS = ["2024-25", "2023-24", "2022-23"]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                       lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE_URL}/team`,             lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/players`,          lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/tournaments`,      lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/rankings`,         lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE_URL}/news`,             lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE_URL}/matches`,          lastModified: now, changeFrequency: "daily",   priority: 0.7 },
    { url: `${BASE_URL}/blog`,             lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/seasons`,          lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/media`,            lastModified: now, changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE_URL}/sponsors`,         lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/schedule`,         lastModified: now, changeFrequency: "daily",   priority: 0.7 },
    { url: `${BASE_URL}/contact`,          lastModified: now, changeFrequency: "yearly",  priority: 0.4 },
  ]

  const playerRoutes: MetadataRoute.Sitemap = PLAYER_SLUGS.map((slug) => ({
    url: `${BASE_URL}/players/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const tournamentRoutes: MetadataRoute.Sitemap = TOURNAMENT_SLUGS.map((slug) => ({
    url: `${BASE_URL}/tournaments/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const newsRoutes: MetadataRoute.Sitemap = NEWS_SLUGS.map((slug) => ({
    url: `${BASE_URL}/news/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const matchRoutes: MetadataRoute.Sitemap = MATCH_IDS.map((id) => ({
    url: `${BASE_URL}/matches/${id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }))

  const blogRoutes: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const seasonRoutes: MetadataRoute.Sitemap = SEASON_SLUGS.map((slug) => ({
    url: `${BASE_URL}/seasons/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...playerRoutes, ...tournamentRoutes, ...newsRoutes, ...matchRoutes, ...blogRoutes, ...seasonRoutes]
}
