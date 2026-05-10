import { Controller, Get, Param, Query } from '@nestjs/common'
import {
  RankingsService,
  TeamRanking,
  PlayerRanking,
  PlayerEloHistory,
} from './rankings.service'

@Controller('rankings')
export class RankingsController {
  constructor(private readonly rankingsService: RankingsService) {}

  @Get('team')
  findTeamRankings(): TeamRanking[] {
    return this.rankingsService.findTeamRankings()
  }

  @Get('players')
  findPlayerRankings(@Query('modality') modality?: string): PlayerRanking[] {
    return this.rankingsService.findPlayerRankings(modality)
  }

  @Get('elo')
  findAllEloHistories(): PlayerEloHistory[] {
    return this.rankingsService.findEloHistories()
  }

  @Get('player/:id/elo')
  findPlayerEloHistory(@Param('id') id: string): PlayerEloHistory | null {
    return this.rankingsService.findPlayerEloHistory(id)
  }
}
