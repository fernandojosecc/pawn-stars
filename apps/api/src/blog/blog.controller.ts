import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { BlogQueryDto } from './dto/blog.dto';
import { BlogCategory } from '@pawn-stars/shared-types';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @ApiOperation({ summary: 'Paginated blog post list, optionally filtered by category' })
  @ApiQuery({ name: 'page',     required: false, type: Number })
  @ApiQuery({ name: 'limit',    required: false, type: Number })
  @ApiQuery({ name: 'category', required: false, enum: BlogCategory })
  @ApiResponse({ status: 200, description: 'Paginated list of blog post cards' })
  findAll(@Query() query: BlogQueryDto) {
    return this.blogService.findAll(query);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get full blog post by slug including blocks array' })
  @ApiParam({ name: 'slug', description: 'Blog post slug' })
  @ApiResponse({ status: 200, description: 'Full blog post with content blocks' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  findOne(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }
}
