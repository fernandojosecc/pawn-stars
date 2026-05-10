import { Controller, Get, Query, ParseUUIDPipe, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
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
}
