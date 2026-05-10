import { Controller, Get, Post, Patch, Delete, Query, Param, Body, NotFoundException, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PlayersService } from './players.service';
import { PlayerQueryDto } from './dto/player.dto';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all players with filtering and pagination' })
  @ApiResponse({ status: 200, description: 'Players retrieved successfully' })
  async findAll(@Query() query: PlayerQueryDto): Promise<{
  players: any[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
    return this.playersService.findAll(query);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get player statistics' })
  @ApiResponse({ status: 200, description: 'Player statistics retrieved successfully' })
  async getStats() {
    return this.playersService.getStats();
  }

  @Get('nationalities')
  @ApiOperation({ summary: 'Get all player nationalities' })
  @ApiResponse({ status: 200, description: 'Nationalities retrieved successfully' })
  async getNationalities() {
    return this.playersService.getNationalities();
  }

  @Get('titles')
  @ApiOperation({ summary: 'Get all player titles' })
  @ApiResponse({ status: 200, description: 'Titles retrieved successfully' })
  async getTitles() {
    return this.playersService.getTitles();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get player by ID' })
  @ApiParam({ name: 'id', description: 'Player ID' })
  @ApiResponse({ status: 200, description: 'Player found successfully' })
  @ApiResponse({ status: 404, description: 'Player not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    const player = await this.playersService.findOne(id);
    if (!player) {
      throw new NotFoundException('Player not found');
    }
    return player;
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get player by slug' })
  @ApiParam({ name: 'slug', description: 'Player slug' })
  @ApiResponse({ status: 200, description: 'Player found successfully' })
  @ApiResponse({ status: 404, description: 'Player not found' })
  async findBySlug(@Param('slug') slug: string): Promise<any> {
    const player = await this.playersService.findBySlug(slug);
    if (!player) {
      throw new NotFoundException('Player not found');
    }
    return player;
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'content_manager', 'coach')
  @ApiOperation({ summary: 'Create a new player' })
  @ApiResponse({ status: 201, description: 'Player created successfully' })
  async create(@Body() _body: Record<string, unknown>) {
    return { message: 'Not implemented' };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'content_manager', 'coach')
  @ApiOperation({ summary: 'Update a player' })
  @ApiParam({ name: 'id', description: 'Player ID' })
  @ApiResponse({ status: 200, description: 'Player updated successfully' })
  async update(@Param('id', ParseUUIDPipe) _id: string, @Body() _body: Record<string, unknown>) {
    return { message: 'Not implemented' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a player' })
  @ApiParam({ name: 'id', description: 'Player ID' })
  @ApiResponse({ status: 200, description: 'Player deleted successfully' })
  async remove(@Param('id', ParseUUIDPipe) _id: string) {
    return { message: 'Not implemented' };
  }
}
