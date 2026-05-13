import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { StatsScheduler } from './stats.scheduler';

@Module({
  controllers: [StatsController],
  providers: [StatsService, StatsScheduler],
  exports: [StatsService],
})
export class StatsModule {}
