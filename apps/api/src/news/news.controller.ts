import { Controller, Get, Query, Param, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { NewsService, NewsCard, NewsDetail } from './news.service';
import { NewsQueryDto } from './dto/news.dto';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all news articles with filtering and pagination' })
  @ApiResponse({ status: 200, description: 'News articles retrieved successfully' })
  @ApiQuery({ name: 'category', required: false, enum: ['ANNOUNCEMENTS', 'MATCH_REPORTS', 'TRANSFERS', 'INTERVIEWS', 'EDITORIAL'] })
  @ApiQuery({ name: 'author', required: false, description: 'Filter by author' })
  @ApiQuery({ name: 'featured', required: false, type: Boolean, description: 'Filter featured articles' })
  @ApiQuery({ name: 'search', required: false, description: 'Search in title and excerpt' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Sort field' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: 'Sort order' })
  async findAll(@Query() query: NewsQueryDto) {
    return this.newsService.findAll(query);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get news statistics' })
  @ApiResponse({ status: 200, description: 'News statistics retrieved successfully' })
  async getStats() {
    return this.newsService.getStats();
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get available news categories' })
  @ApiResponse({ status: 200, description: 'News categories retrieved successfully' })
  async getCategories() {
    return this.newsService.getCategories();
  }

  @Get('authors')
  @ApiOperation({ summary: 'Get available authors' })
  @ApiResponse({ status: 200, description: 'Authors retrieved successfully' })
  async getAuthors() {
    return this.newsService.getAuthors();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured news articles' })
  @ApiResponse({ status: 200, description: 'Featured news retrieved successfully' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of articles to return' })
  async getFeatured(@Query('limit') limit: number = 3) {
    return this.newsService.getFeaturedNews(limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get news article by ID' })
  @ApiResponse({ status: 200, description: 'News article retrieved successfully' })
  @ApiResponse({ status: 404, description: 'News article not found' })
  @ApiParam({ name: 'id', description: 'News article ID' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<NewsDetail> {
    const news = await this.newsService.findOne(id);
    if (!news) {
      throw new NotFoundException('News article not found');
    }
    return news;
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get news article by slug' })
  @ApiResponse({ status: 200, description: 'News article retrieved successfully' })
  @ApiResponse({ status: 404, description: 'News article not found' })
  @ApiParam({ name: 'slug', description: 'News article slug' })
  async findBySlug(@Param('slug') slug: string): Promise<NewsDetail> {
    const news = await this.newsService.findBySlug(slug);
    if (!news) {
      throw new NotFoundException('News article not found');
    }
    return news;
  }
}
