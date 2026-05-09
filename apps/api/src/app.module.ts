import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { NewsModule } from './news/news.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PlayersModule, TournamentsModule, NewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
