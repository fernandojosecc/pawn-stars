import { Controller, Get, Param, Post, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RatingsImportService } from './ratings-import.service';
import { FideRatingsService } from './providers/fide-ratings.service';

@ApiTags('ratings')
@Controller('ratings')
export class RatingsController {
  constructor(
    private readonly importService: RatingsImportService,
    private readonly fideService: FideRatingsService,
  ) {}

  @Get(':playerId/history')
  @ApiOperation({ summary: 'Get full rating history for a player across all modalities' })
  @ApiParam({ name: 'playerId', description: 'Internal player ID' })
  @ApiResponse({ status: 200, description: 'Rating history returned' })
  @ApiResponse({ status: 404, description: 'No ratings found for this player' })
  getHistory(@Param('playerId') playerId: string) {
    const history = this.importService.getHistory(playerId);
    if (history.length === 0) {
      throw new NotFoundException(`No rating history found for player ${playerId}`);
    }
    return { playerId, history };
  }

  @Get(':playerId/current')
  @ApiOperation({ summary: 'Get the latest rating snapshot per modality for a player' })
  @ApiParam({ name: 'playerId', description: 'Internal player ID' })
  @ApiResponse({ status: 200, description: 'Current ratings returned' })
  @ApiResponse({ status: 404, description: 'No ratings found for this player' })
  getCurrent(@Param('playerId') playerId: string) {
    const current = this.importService.getCurrent(playerId);
    if (current.length === 0) {
      throw new NotFoundException(`No current ratings found for player ${playerId}`);
    }
    return { playerId, ratings: current };
  }

  @Post('import')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Manually trigger a ratings import for all players (admin only)' })
  @ApiResponse({ status: 201, description: 'Import result summary returned' })
  async triggerImport() {
    return this.importService.runImport();
  }

  @Get('status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'content_manager')
  @ApiOperation({ summary: 'Get the timestamp of the last completed import (admin/content_manager)' })
  @ApiResponse({ status: 200, description: 'Last import time returned' })
  getStatus() {
    const lastRun = this.importService.getLastImportTime();
    return { lastImportAt: lastRun ?? null };
  }
}
