export type NewsCategory = 'ANNOUNCEMENTS' | 'MATCH_REPORTS' | 'TRANSFERS' | 'INTERVIEWS' | 'EDITORIAL';
export interface NewsPost {
    id: string;
    slug: string;
    title: string;
    summary?: string;
    coverUrl?: string;
    tags: string[];
    publishedAt?: Date;
    authorId?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface NewsCard {
    id: string;
    slug: string;
    title: string;
    excerpt?: string;
    category: NewsCategory;
    author: string;
    publishedAt: Date;
    coverImage?: string;
    readTime?: number;
    featured?: boolean;
    tags?: string;
}
export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    summary?: string;
    coverUrl?: string;
    tags: string[];
    publishedAt?: Date;
    authorId?: string;
    createdAt: Date;
    updatedAt: Date;
}
