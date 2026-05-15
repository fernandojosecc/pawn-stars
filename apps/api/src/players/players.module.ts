import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { SearchModule } from '../search/search.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [SearchModule, AuditModule],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
