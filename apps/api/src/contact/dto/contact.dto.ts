import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ description: 'Contact name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Contact email address' })
  @IsEmail()
  @IsString()
  email!: string;

  @ApiProperty({ description: 'Contact subject category' })
  @IsEnum(['GENERAL', 'PRESS', 'SPONSORSHIP', 'TRIALS'])
  @IsString()
  subject!: string;

  @ApiProperty({ description: 'Contact message' })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty({ description: 'Submission timestamp' })
  @IsOptional()
  submittedAt?: Date;
}

export enum ContactSubject {
  GENERAL = 'GENERAL',
  PRESS = 'PRESS',
  SPONSORSHIP = 'SPONSORSHIP',
  TRIALS = 'TRIALS'
}

export class ContactQueryDto {
  @ApiPropertyOptional({ description: 'Filter by subject' })
  @IsEnum(['GENERAL', 'PRESS', 'SPONSORSHIP', 'TRIALS'])
  @IsOptional()
  subject?: ContactSubject;

  @ApiPropertyOptional({ description: 'Filter by date range' })
  @IsOptional()
  dateFrom?: Date;

  @ApiPropertyOptional({ description: 'Filter by date range' })
  @IsOptional()
  dateTo?: Date;

  @ApiPropertyOptional({ description: 'Search in name, email, or message' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Page number' })
  @IsOptional()
  @IsString()
  page?: number;

  @ApiPropertyOptional({ description: 'Number of items per page' })
  @IsOptional()
  @IsString()
  limit?: string;

  @ApiPropertyOptional({ description: 'Sort by field' })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({ description: 'Sort order' })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}
