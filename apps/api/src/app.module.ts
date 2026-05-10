import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { NewsModule } from './news/news.module';
import { ContactModule } from './contact/contact.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PlayersModule, TournamentsModule, NewsModule, ContactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
