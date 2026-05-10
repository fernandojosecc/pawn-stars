import { Controller, Get, Post, Patch, Delete, Param, Query, Body, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../auth/roles.guard'
import { Roles } from '../auth/roles.decorator'
import { MatchesService, MatchDetail, MatchPreview } from './matches.service'

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  async findAll(@Query('status') status?: string): Promise<MatchPreview[]> {
    if (status === 'upcoming') return this.matchesService.findUpcoming()
    if (status === 'completed') return this.matchesService.findCompleted()
    return this.matchesService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MatchDetail> {
    return this.matchesService.findOne(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'content_manager', 'analyst')
  async create(@Body() _body: Record<string, unknown>) {
    return { message: 'Not implemented' }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'content_manager', 'analyst')
  async update(@Param('id') _id: string, @Body() _body: Record<string, unknown>) {
    return { message: 'Not implemented' }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Param('id') _id: string) {
    return { message: 'Not implemented' }
  }
}
