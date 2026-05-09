import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PlayersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
