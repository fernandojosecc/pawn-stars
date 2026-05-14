import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ArticleGenerationService } from './article-generation.service';
import type { ArticleGenerationRequest, PublishDraftRequest } from '@pawn-stars/shared-types';

@ApiTags('article-generation')
@Controller('articles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'content_manager')
export class ArticleGenerationController {
  constructor(private readonly service: ArticleGenerationService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate a post-tournament article via Claude AI' })
  @ApiResponse({ status: 201, description: 'Article generated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request or tournament not found' })
  async generate(@Body() body: ArticleGenerationRequest) {
    if (!body.tournamentId) {
      throw new BadRequestException('tournamentId is required');
    }
    try {
      return await this.service.generateArticle(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes('not found')) throw new BadRequestException(message);
      throw new InternalServerErrorException(`Generation failed: ${message}`);
    }
  }

  @Post('publish')
  @ApiOperation({ summary: 'Save generated article as a draft news post' })
  @ApiResponse({ status: 201, description: 'Draft created successfully' })
  publish(@Body() body: PublishDraftRequest) {
    if (!body.article?.headline || !body.article?.body) {
      throw new BadRequestException('article.headline and article.body are required');
    }
    return this.service.publishDraft(body.article, body.authorName);
  }

  @Get('generations')
  @ApiOperation({ summary: 'Get log of all article generation runs' })
  @ApiResponse({ status: 200, description: 'Generation log returned' })
  getGenerations() {
    return this.service.getGenerationLog();
  }

  @Get('tournaments')
  @ApiOperation({ summary: 'Get completed tournaments available for article generation' })
  getTournaments() {
    return this.service.getAvailableTournaments();
  }
}
