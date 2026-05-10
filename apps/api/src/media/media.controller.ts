import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { MediaService, MediaGallery } from './media.service';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  @ApiOperation({ summary: 'Get media assets grouped by type with optional filters' })
  @ApiResponse({ status: 200, description: 'Media gallery retrieved successfully' })
  @ApiQuery({ name: 'type',           required: false, enum: ['photo', 'video', 'document'] })
  @ApiQuery({ name: 'tournamentSlug', required: false, description: 'Filter by tournament slug' })
  @ApiQuery({ name: 'page',           required: false, type: Number })
  @ApiQuery({ name: 'limit',          required: false, type: Number })
  async findAll(
    @Query('type')           type?: string,
    @Query('tournamentSlug') tournamentSlug?: string,
    @Query('page')           page?: string,
    @Query('limit')          limit?: string,
  ): Promise<MediaGallery & { page: number; limit: number }> {
    return this.mediaService.findAll(type, tournamentSlug, page ? Number(page) : 1, limit ? Number(limit) : 50);
  }

  @Get('tournaments')
  @ApiOperation({ summary: 'Get tournaments that have media assets' })
  @ApiResponse({ status: 200, description: 'Tournament list retrieved successfully' })
  async getTournaments(): Promise<{ slug: string; name: string }[]> {
    return this.mediaService.getTournaments();
  }
}
