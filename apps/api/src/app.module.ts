import { Module } from '@nestjs/common';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
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
import { SeasonsModule } from './seasons/seasons.module';
import { BlogModule } from './blog/blog.module';
import { NotificationsModule } from './notifications/notifications.module';
import { LiveCoverageModule } from './live-coverage/live-coverage.module';
import { ArticleGenerationModule } from './article-generation/article-generation.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    NestScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
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
    SeasonsModule,
    BlogModule,
    NotificationsModule,
    LiveCoverageModule,
    ArticleGenerationModule,
    NewsletterModule,
    AuditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
