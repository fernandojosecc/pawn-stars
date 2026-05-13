import { Module } from '@nestjs/common';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { PlayersModule } from './players/players.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { NewsModule } from './news/news.module';
import { ContactModule } from './contact/contact.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchesModule } from './matches/matches.module';
import { RankingsModule } from './rankings/rankings.module';
import { ScheduleModule } from './schedule/schedule.module';
import { MediaModule } from './media/media.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { AuthModule } from './auth/auth.module';
import { RatingsModule } from './ratings/ratings.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    NestScheduleModule.forRoot(),
    AuthModule,
    PlayersModule,
    TournamentsModule,
    NewsModule,
    ContactModule,
    MatchesModule,
    RankingsModule,
    ScheduleModule,
    MediaModule,
    SponsorsModule,
    RatingsModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
