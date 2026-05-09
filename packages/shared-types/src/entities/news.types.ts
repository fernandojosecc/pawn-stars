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
  summary?: string;
  coverUrl?: string;
  tags: string[];
  publishedAt?: Date;
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
