import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { NotificationsService } from './notifications.service';
import { TestNotificationDto } from './dto/test-notification.dto';
import { NotificationType } from '@pawn-stars/shared-types';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('test')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Send a test notification email (admin only)' })
  @ApiResponse({ status: 201, description: 'Test email dispatched (logged in dev, sent via Resend in production)' })
  async sendTest(@Body() dto: TestNotificationDto) {
    switch (dto.type) {
      case NotificationType.MATCH_RESULT:
        return this.notificationsService.sendMatchResult('match-001');

      case NotificationType.ROUND_COMPLETE:
        return this.notificationsService.sendRoundComplete('1', 1);

      case NotificationType.TRIAL_STATUS:
        return this.notificationsService.sendTrialStatus(
          dto.email ?? 'applicant@example.com',
          dto.applicantName ?? 'Test Applicant',
          dto.trialStatus ?? 'reviewing',
        );
    }
  }
}
