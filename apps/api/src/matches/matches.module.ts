import { Module } from '@nestjs/common'
import { MatchesService } from './matches.service'
import { MatchesController } from './matches.controller'
import { AuditModule } from '../audit/audit.module'

@Module({
  imports: [AuditModule],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService],
})
export class MatchesModule {}
