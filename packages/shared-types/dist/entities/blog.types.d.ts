export declare enum BlogCategory {
    ANALYSIS = "analysis",
    MATCH_REPORTS = "match-reports",
    INTERVIEWS = "interviews",
    EDITORIAL = "editorial",
    TEAM_NEWS = "team-news"
}
export interface TextBlock {
    type: 'text';
    /** Sanitized HTML string produced by the CMS rich-text editor */
    html: string;
}
export interface QuoteBlock {
    type: 'quote';
    text: string;
    author: string;
    authorTitle?: string;
}
export interface StatBlock {
    type: 'stat';
    /** The headline value, e.g. "2830" or "47%" */
    value: string;
    /** Short label, e.g. "Peak FIDE Rating" */
    label: string;
    /** Extra context sentence shown below the label */
    context?: string;
}
export interface GalleryImage {
    src: string;
    alt: string;
    caption?: string;
}
export interface GalleryBlock {
    type: 'gallery';
    images: GalleryImage[];
    columns?: 2 | 3;
}
export interface EmbedBlock {
    type: 'embed';
    /** Full iframe-safe URL, e.g. https://www.youtube.com/embed/… */
    url: string;
    title: string;
    aspectRatio?: '16:9' | '4:3' | '1:1';
    provider?: 'youtube' | 'lichess' | 'other';
}
export type BlogBlock = TextBlock | QuoteBlock | StatBlock | GalleryBlock | EmbedBlock;
export interface BlogPostCard {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: BlogCategory;
    author: string;
    authorTitle?: string;
    publishedAt: Date;
    updatedAt?: Date;
    coverImage?: string;
    readTime: number;
    tags: string[];
}
export interface BlogPost extends BlogPostCard {
    blocks: BlogBlock[];
}
export interface BlogListResponse {
    posts: BlogPostCard[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
//# sourceMappingURL=blog.types.d.ts.map