export interface ArticleGenerationRequest {
  tournamentId: string
  extraContext?: string   // optional freeform hint for the journalist prompt
}

export type GeneratedArticleCategory =
  | 'MATCH_REPORTS'
  | 'ANNOUNCEMENTS'
  | 'EDITORIAL'

export interface GeneratedArticle {
  tournamentId: string
  headline: string
  body: string          // full article text, ~400–600 words
  suggestedTags: string[]
  category: GeneratedArticleCategory
  generatedAt: string   // ISO timestamp
  tokenUsage?: {
    inputTokens: number
    outputTokens: number
  }
}

export interface GenerationLog {
  id: string
  tournamentId: string
  tournamentName: string
  generatedAt: string   // ISO timestamp
  durationMs: number
  success: boolean
  tokenUsage?: {
    inputTokens: number
    outputTokens: number
  }
  error?: string
}

export interface PublishDraftRequest {
  article: GeneratedArticle
  authorName?: string
}

export interface PublishDraftResponse {
  newsPostId: string
  slug: string
  status: 'draft'
  createdAt: string
}
