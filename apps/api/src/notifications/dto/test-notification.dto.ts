import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationType } from '@pawn-stars/shared-types';

export class TestNotificationDto {
  @ApiProperty({ enum: NotificationType, description: 'Notification type to test' })
  @IsEnum(NotificationType)
  type!: NotificationType;

  @ApiPropertyOptional({ description: 'Recipient email (required for TRIAL_STATUS)' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'Applicant name (used for TRIAL_STATUS)' })
  @IsString()
  @IsOptional()
  applicantName?: string;

  @ApiPropertyOptional({ description: 'Trial status (used for TRIAL_STATUS)' })
  @IsString()
  @IsOptional()
  trialStatus?: 'reviewing' | 'accepted' | 'rejected';
}
