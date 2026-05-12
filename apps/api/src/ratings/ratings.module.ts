import { Module } from '@nestjs/common';
import { LichessRatingsService } from './providers/lichess-ratings.service';
import { FideRatingsService } from './providers/fide-ratings.service';
import { RatingsImportService } from './ratings-import.service';
import { RatingsImportScheduler } from './ratings-import.scheduler';
import { RatingsController } from './ratings.controller';

@Module({
  controllers: [RatingsController],
  providers: [
    LichessRatingsService,
    FideRatingsService,
    RatingsImportService,
    RatingsImportScheduler,
  ],
  exports: [RatingsImportService],
})
export class RatingsModule {}
