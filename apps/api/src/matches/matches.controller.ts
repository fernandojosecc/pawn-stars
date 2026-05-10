import { Controller, Get, Param, Query } from '@nestjs/common'
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
}
