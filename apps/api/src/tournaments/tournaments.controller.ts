import { Controller, Get, Post, Patch, Delete, Query, Param, Body, ParseUUIDPipe, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { TournamentsService } from './tournaments.service';
import { TournamentQueryDto } from './dto/tournament.dto';
import { AuditService } from '../audit/audit.service';
import { AuditAction } from '@pawn-stars/shared-types';

@ApiTags('tournaments')
@Controller('tournaments')
export class TournamentsController {
  constructor(
    private readonly tournamentsService: TournamentsService,
    private readonly auditService: AuditService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all tournaments with filtering and pagination' })
  @ApiResponse({ status: 200, description: 'Tournaments retrieved successfully' })
  @ApiQuery({ name: 'status', required: false, enum: ['UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED'] })
  @ApiQuery({ name: 'format', required: false, enum: ['Swiss', 'Round-Robin', 'Knockout', 'League'] })
  @ApiQuery({ name: 'location', required: false, description: 'Filter by location' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Sort field' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: 'Sort order' })
  async findAll(@Query() query: TournamentQueryDto) {
    return this.tournamentsService.findAll(query);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get tournament statistics' })
  @ApiResponse({ status: 200, description: 'Tournament statistics retrieved successfully' })
  async getStats() {
    return this.tournamentsService.getStats();
  }

  @Get('formats')
  @ApiOperation({ summary: 'Get available tournament formats' })
  @ApiResponse({ status: 200, description: 'Tournament formats retrieved successfully' })
  async getFormats() {
    return this.tournamentsService.getFormats();
  }

  @Get('statuses')
  @ApiOperation({ summary: 'Get available tournament statuses' })
  @ApiResponse({ status: 200, description: 'Tournament statuses retrieved successfully' })
  async getStatuses() {
    return this.tournamentsService.getStatuses();
  }

  @Get('locations')
  @ApiOperation({ summary: 'Get available tournament locations' })
  @ApiResponse({ status: 200, description: 'Tournament locations retrieved successfully' })
  async getLocations() {
    return this.tournamentsService.getLocations();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tournament by ID' })
  @ApiResponse({ status: 200, description: 'Tournament retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Tournament not found' })
  @ApiParam({ name: 'id', description: 'Tournament ID' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const tournament = await this.tournamentsService.findOne(id);
    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }
    return tournament;
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get tournament by slug' })
  @ApiResponse({ status: 200, description: 'Tournament retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Tournament not found' })
  @ApiParam({ name: 'slug', description: 'Tournament slug' })
  async findBySlug(@Param('slug') slug: string) {
    const tournament = await this.tournamentsService.findBySlug(slug);
    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }
    return tournament;
  }

  @Get('detail/:slug')
  @ApiOperation({ summary: 'Get full tournament detail by slug (rounds, pairings, standings, timeline)' })
  @ApiResponse({ status: 200, description: 'Tournament detail retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Tournament not found' })
  @ApiParam({ name: 'slug', description: 'Tournament slug' })
  async findDetailBySlug(@Param('slug') slug: string) {
    const tournament = await this.tournamentsService.findBySlugWithDetail(slug);
    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }
    return tournament;
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'content_manager')
  @ApiOperation({ summary: 'Create a new tournament' })
  @ApiResponse({ status: 201, description: 'Tournament created successfully' })
  async create(@Body() body: Record<string, unknown>) {
    this.auditService.log({ entity: 'Tournament', entityId: String(body['id'] ?? 'new'), action: AuditAction.CREATE, summary: `Created tournament "${body['name'] ?? 'unknown'}"`, after: body });
    return { message: 'Not implemented' };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'content_manager')
  @ApiOperation({ summary: 'Update a tournament' })
  @ApiParam({ name: 'id', description: 'Tournament ID' })
  @ApiResponse({ status: 200, description: 'Tournament updated successfully' })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: Record<string, unknown>) {
    this.auditService.log({ entity: 'Tournament', entityId: id, action: AuditAction.UPDATE, summary: `Updated tournament ${id}`, after: body });
    return { message: 'Not implemented' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a tournament' })
  @ApiParam({ name: 'id', description: 'Tournament ID' })
  @ApiResponse({ status: 200, description: 'Tournament deleted successfully' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    this.auditService.log({ entity: 'Tournament', entityId: id, action: AuditAction.DELETE, summary: `Deleted tournament ${id}` });
    return { message: 'Not implemented' };
  }
}
