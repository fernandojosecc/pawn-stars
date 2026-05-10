import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { NewsModule } from './news/news.module';
import { ContactModule } from './contact/contact.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchesModule } from './matches/matches.module';
import { RankingsModule } from './rankings/rankings.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [PlayersModule, TournamentsModule, NewsModule, ContactModule, MatchesModule, RankingsModule, ScheduleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
