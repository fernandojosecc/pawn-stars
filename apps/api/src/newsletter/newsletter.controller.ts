import {
  Controller, Get, Post, Body, Query,
  UseGuards, BadRequestException,
  ParseIntPipe, DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { NewsletterService } from './newsletter.service';
import { NewsletterPreference } from '@pawn-stars/shared-types';
import type { NewsletterSubscribeRequest, NewsletterUnsubscribeRequest, NewsletterSendRequest } from '@pawn-stars/shared-types';

@ApiTags('newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly service: NewsletterService) {}

  @Post('subscribe')
  @ApiOperation({ summary: 'Subscribe an email to the newsletter' })
  @ApiResponse({ status: 201, description: 'Subscription created (confirmation email pending)' })
  subscribe(@Body() body: NewsletterSubscribeRequest) {
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      throw new BadRequestException('A valid email address is required');
    }
    const prefs = Array.isArray(body.preferences) ? body.preferences : [];
    return this.service.subscribe(body.email.toLowerCase().trim(), prefs);
  }

  @Post('unsubscribe')
  @ApiOperation({ summary: 'Unsubscribe an email from the newsletter' })
  unsubscribe(@Body() body: NewsletterUnsubscribeRequest) {
    if (!body.email) throw new BadRequestException('email is required');
    this.service.unsubscribe(body.email.toLowerCase().trim());
    return { message: 'Unsubscribed successfully' };
  }

  @Get('subscribers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'List all subscribers (admin only)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: ['confirmed', 'unconfirmed', 'unsubscribed'] })
  @ApiQuery({ name: 'preference', required: false, enum: NewsletterPreference })
  getSubscribers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('status') status?: 'confirmed' | 'unconfirmed' | 'unsubscribed',
    @Query('preference') preference?: NewsletterPreference,
  ) {
    return this.service.getSubscribers(page, Math.min(limit, 100), status, preference);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'content_manager')
  @ApiOperation({ summary: 'Get subscriber stats (admin/content_manager only)' })
  getStats() {
    return this.service.getStats();
  }

  @Post('send')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'content_manager')
  @ApiOperation({ summary: 'Send a newsletter to confirmed subscribers' })
  async send(@Body() body: NewsletterSendRequest) {
    if (!body.subject?.trim()) throw new BadRequestException('subject is required');
    if (!body.body?.trim())    throw new BadRequestException('body is required');
    return this.service.send(body);
  }

  @Get('send-history')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'content_manager')
  @ApiOperation({ summary: 'Get history of all newsletter sends' })
  getSendHistory() {
    return this.service.getSendHistory();
  }
}
