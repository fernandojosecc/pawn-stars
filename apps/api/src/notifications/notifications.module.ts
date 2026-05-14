import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';

@Module({
  providers: [EmailService, NotificationsService],
  controllers: [NotificationsController],
  exports: [NotificationsService, EmailService],
})
export class NotificationsModule {}
