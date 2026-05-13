import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { SeasonsService } from './seasons.service';

@ApiTags('seasons')
@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Get()
  @ApiOperation({ summary: 'List all seasons with summary stats' })
  @ApiResponse({ status: 200, description: 'Season summaries returned (newest first)' })
  findAll() {
    return this.seasonsService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get full season detail by slug' })
  @ApiParam({ name: 'slug', description: 'Season slug (e.g. 2024-25)' })
  @ApiResponse({ status: 200, description: 'Full season detail returned' })
  @ApiResponse({ status: 404, description: 'Season not found' })
  findOne(@Param('slug') slug: string) {
    return this.seasonsService.findBySlug(slug);
  }
}
