import { IsString, IsOptional, IsEnum, IsDate, IsInt, Min, Max, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum NewsCategory {
  ANNOUNCEMENTS = 'ANNOUNCEMENTS',
  MATCH_REPORTS = 'MATCH_REPORTS',
  TRANSFERS = 'TRANSFERS',
  INTERVIEWS = 'INTERVIEWS',
  EDITORIAL = 'EDITORIAL'
}

export class CreateNewsDto {
  @ApiProperty({ description: 'News title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'News content/excerpt' })
  @IsString()
  excerpt: string;

  @ApiProperty({ description: 'Full news content' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'News category' })
  @IsEnum(NewsCategory)
  category: NewsCategory;

  @ApiProperty({ description: 'Author name' })
  @IsString()
  author: string;

  @ApiPropertyOptional({ description: 'Cover image URL' })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiPropertyOptional({ description: 'Estimated read time in minutes' })
  @IsOptional()
  @IsInt()
  @Min(1)
  readTime?: number;

  @ApiPropertyOptional({ description: 'Is featured article' })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ description: 'Tags for the article' })
  @IsOptional()
  @IsString()
  tags?: string;
}

export class UpdateNewsDto {
  @ApiPropertyOptional({ description: 'News title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'News content/excerpt' })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiPropertyOptional({ description: 'Full news content' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ description: 'News category' })
  @IsOptional()
  @IsEnum(NewsCategory)
  category?: NewsCategory;

  @ApiPropertyOptional({ description: 'Author name' })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiPropertyOptional({ description: 'Cover image URL' })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiPropertyOptional({ description: 'Estimated read time in minutes' })
  @IsOptional()
  @IsInt()
  @Min(1)
  readTime?: number;

  @ApiPropertyOptional({ description: 'Is featured article' })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ description: 'Tags for the article' })
  @IsOptional()
  @IsString()
  tags?: string;
}

export class NewsQueryDto {
  @ApiPropertyOptional({ description: 'Filter by news category' })
  @IsOptional()
  @IsEnum(NewsCategory)
  category?: NewsCategory;

  @ApiPropertyOptional({ description: 'Filter by author' })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiPropertyOptional({ description: 'Filter featured articles' })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ description: 'Search in title and excerpt' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Page number', minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Number of items per page', minimum: 1, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({ description: 'Sort by field' })
  @IsOptional()
  @IsString()
  sortBy?: string = 'publishedAt';

  @ApiPropertyOptional({ description: 'Sort order' })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';
}
