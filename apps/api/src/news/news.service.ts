import { Injectable } from '@nestjs/common';
import { NewsQueryDto } from './dto/news.dto';
import { NewsCategory } from './dto/news.dto';

export interface NewsCard {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  author: string;
  publishedAt: Date;
  coverImage?: string;
  readTime?: number;
  featured?: boolean;
  tags?: string;
}

export interface NewsDetail extends NewsCard {
  content: string;
  updatedAt: Date;
}

@Injectable()
export class NewsService {
  // Mock data for development - this would come from database in production
  private readonly mockNews: NewsCard[] = [
    {
      id: "1",
      slug: "magnus-carlsen-wins-world-championship-2023",
      title: "Magnus Carlsen Retains World Championship Title in Dramatic Final",
      excerpt: "In a stunning display of chess mastery, Magnus Carlsen successfully defended his World Championship title against Ian Nepomniachtchi in a thrilling 14-game match that concluded today in Dubai.",
      category: NewsCategory.MATCH_REPORTS,
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
      category: NewsCategory.TRANSFERS,
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
      category: NewsCategory.INTERVIEWS,
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
      category: NewsCategory.EDITORIAL,
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
      category: NewsCategory.ANNOUNCEMENTS,
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
      category: NewsCategory.EDITORIAL,
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
      category: NewsCategory.INTERVIEWS,
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
      category: NewsCategory.MATCH_REPORTS,
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
      category: NewsCategory.ANNOUNCEMENTS,
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
      category: NewsCategory.EDITORIAL,
      author: "Chess Historian",
      publishedAt: new Date("2024-01-20"),
      coverImage: "/news/firouzja-profile.jpg",
      readTime: 9,
      featured: false,
      tags: "profile, alireza firouzja, rising star"
    }
  ];

  async findAll(query: NewsQueryDto): Promise<{
    news: NewsCard[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    let filteredNews = [...this.mockNews];

    // Apply filters
    if (query.category) {
      filteredNews = filteredNews.filter(news => news.category === query.category);
    }

    if (query.author) {
      filteredNews = filteredNews.filter(news => 
        news.author.toLowerCase().includes(query.author!.toLowerCase())
      );
    }

    if (query.featured !== undefined) {
      filteredNews = filteredNews.filter(news => news.featured === query.featured);
    }

    if (query.search) {
      const searchTerm = query.search.toLowerCase();
      filteredNews = filteredNews.filter(news => 
        news.title.toLowerCase().includes(searchTerm) ||
        news.excerpt.toLowerCase().includes(searchTerm)
      );
    }

    // Sort
    const sortBy = query.sortBy || 'publishedAt';
    const sortOrder = query.sortOrder || 'desc';
    
    filteredNews.sort((a, b) => {
      let aValue: any = a[sortBy as keyof NewsCard];
      let bValue: any = b[sortBy as keyof NewsCard];
      
      if (aValue instanceof Date) aValue = aValue.getTime();
      if (bValue instanceof Date) bValue = bValue.getTime();
      
      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });

    // Pagination
    const page = query.page || 1;
    const limit = query.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedNews = filteredNews.slice(startIndex, endIndex);

    return {
      news: paginatedNews,
      total: filteredNews.length,
      page,
      limit,
      totalPages: Math.ceil(filteredNews.length / limit)
    };
  }

  async findOne(id: string): Promise<NewsDetail | null> {
    const newsCard = this.mockNews.find(news => news.id === id);
    if (!newsCard) return null;

    // Mock full content for development
    const fullContent = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      
      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
    `;

    return {
      ...newsCard,
      content: fullContent.trim(),
      updatedAt: new Date()
    };
  }

  async findBySlug(slug: string): Promise<NewsDetail | null> {
    const newsCard = this.mockNews.find(news => news.slug === slug);
    if (!newsCard) return null;

    const fullContent = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      
      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
    `;

    return {
      ...newsCard,
      content: fullContent.trim(),
      updatedAt: new Date()
    };
  }

  async getCategories(): Promise<NewsCategory[]> {
    return Object.values(NewsCategory);
  }

  async getAuthors(): Promise<string[]> {
    const authors = [...new Set(this.mockNews.map(news => news.author))];
    return authors.sort();
  }

  async getFeaturedNews(limit: number = 3): Promise<NewsCard[]> {
    return this.mockNews
      .filter(news => news.featured)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, limit);
  }

  async getStats(): Promise<{
    total: number;
    featured: number;
    categoryDistribution: Record<NewsCategory, number>;
    authorDistribution: Record<string, number>;
  }> {
    const total = this.mockNews.length;
    const featured = this.mockNews.filter(news => news.featured).length;

    // Category distribution
    const categoryDistribution = Object.values(NewsCategory).reduce((acc, category) => {
      acc[category] = this.mockNews.filter(news => news.category === category).length;
      return acc;
    }, {} as Record<NewsCategory, number>);

    // Author distribution
    const authorDistribution = this.mockNews.reduce((acc, news) => {
      acc[news.author] = (acc[news.author] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      featured,
      categoryDistribution,
      authorDistribution
    };
  }
}
