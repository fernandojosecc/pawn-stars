import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { StatsService } from './stats.service';
import type { CaptureSnapshotDto } from '@pawn-stars/shared-types';

@ApiTags('stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get(':playerId/snapshots')
  @ApiOperation({ summary: 'Get all stat snapshots for a player across all tournaments' })
  @ApiParam({ name: 'playerId', description: 'Internal player ID' })
  @ApiResponse({ status: 200, description: 'Snapshot list returned (newest first)' })
  @ApiResponse({ status: 404, description: 'No snapshots found for this player' })
  getPlayerSnapshots(@Param('playerId') playerId: string) {
    return this.statsService.getPlayerSnapshots(playerId);
  }

  @Get(':playerId/season/:seasonId')
  @ApiOperation({ summary: 'Get aggregated season stats for a player' })
  @ApiParam({ name: 'playerId', description: 'Internal player ID' })
  @ApiParam({ name: 'seasonId', description: 'Season ID (e.g. season-2023)' })
  @ApiResponse({ status: 200, description: 'Aggregated season stats returned' })
  @ApiResponse({ status: 404, description: 'No stats found for this player/season combination' })
  getPlayerSeasonStats(
    @Param('playerId') playerId: string,
    @Param('seasonId') seasonId: string,
  ) {
    return this.statsService.getPlayerSeasonStats(playerId, seasonId);
  }

  @Get('tournament/:tournamentId')
  @ApiOperation({ summary: 'Get stat snapshots for all players in a tournament' })
  @ApiParam({ name: 'tournamentId', description: 'Internal tournament ID' })
  @ApiResponse({ status: 200, description: 'Tournament snapshots returned (sorted by performance rating)' })
  @ApiResponse({ status: 404, description: 'No snapshots found for this tournament' })
  getTournamentSnapshots(@Param('tournamentId') tournamentId: string) {
    return this.statsService.getTournamentSnapshots(tournamentId);
  }

  @Post('snapshot')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'analyst')
  @ApiOperation({ summary: 'Manually capture a stat snapshot for a player/tournament pair (admin/analyst only)' })
  @ApiResponse({ status: 201, description: 'Snapshot captured and returned' })
  @ApiResponse({ status: 409, description: 'Snapshot already exists for this player/tournament' })
  captureSnapshot(@Body() dto: CaptureSnapshotDto) {
    return this.statsService.captureSnapshot(dto);
  }
}
