import { Module } from '@nestjs/common';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [AuditModule],
  controllers: [TournamentsController],
  providers: [TournamentsService],
  exports: [TournamentsService],
})
export class TournamentsModule {}
