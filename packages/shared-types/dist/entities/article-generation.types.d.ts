export interface ArticleGenerationRequest {
    tournamentId: string;
    extraContext?: string;
}
export type GeneratedArticleCategory = 'MATCH_REPORTS' | 'ANNOUNCEMENTS' | 'EDITORIAL';
export interface GeneratedArticle {
    tournamentId: string;
    headline: string;
    body: string;
    suggestedTags: string[];
    category: GeneratedArticleCategory;
    generatedAt: string;
    tokenUsage?: {
        inputTokens: number;
        outputTokens: number;
    };
}
export interface GenerationLog {
    id: string;
    tournamentId: string;
    tournamentName: string;
    generatedAt: string;
    durationMs: number;
    success: boolean;
    tokenUsage?: {
        inputTokens: number;
        outputTokens: number;
    };
    error?: string;
}
export interface PublishDraftRequest {
    article: GeneratedArticle;
    authorName?: string;
}
export interface PublishDraftResponse {
    newsPostId: string;
    slug: string;
    status: 'draft';
    createdAt: string;
}
//# sourceMappingURL=article-generation.types.d.ts.map