import { IsString, IsOptional, IsEnum, IsDate, IsInt, IsBoolean, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum TournamentFormat {
  SWISS = 'Swiss',
  ROUND_ROBIN = 'Round-Robin',
  KNOCKOUT = 'Knockout',
  LEAGUE = 'League'
}

export enum TournamentStatus {
  UPCOMING = 'UPCOMING',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export class CreateTournamentDto {
  @ApiProperty({ description: 'Tournament name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Tournament description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Tournament format' })
  @IsEnum(TournamentFormat)
  format: TournamentFormat;

  @ApiProperty({ description: 'Tournament start date' })
  @IsDate()
  startDate: Date;

  @ApiPropertyOptional({ description: 'Tournament end date' })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiPropertyOptional({ description: 'Tournament location' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ description: 'Season ID' })
  @IsOptional()
  @IsString()
  seasonId?: string;
}

export class UpdateTournamentDto {
  @ApiPropertyOptional({ description: 'Tournament name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Tournament description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Tournament format' })
  @IsOptional()
  @IsEnum(TournamentFormat)
  format?: TournamentFormat;

  @ApiPropertyOptional({ description: 'Tournament status' })
  @IsOptional()
  @IsEnum(TournamentStatus)
  status?: TournamentStatus;

  @ApiPropertyOptional({ description: 'Tournament start date' })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiPropertyOptional({ description: 'Tournament end date' })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiPropertyOptional({ description: 'Tournament location' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ description: 'Season ID' })
  @IsOptional()
  @IsString()
  seasonId?: string;
}

export class TournamentQueryDto {
  @ApiPropertyOptional({ description: 'Filter by tournament status' })
  @IsOptional()
  @IsEnum(TournamentStatus)
  status?: TournamentStatus;

  @ApiPropertyOptional({ description: 'Filter by tournament format' })
  @IsOptional()
  @IsEnum(TournamentFormat)
  format?: TournamentFormat;

  @ApiPropertyOptional({ description: 'Filter by season ID' })
  @IsOptional()
  @IsString()
  seasonId?: string;

  @ApiPropertyOptional({ description: 'Filter by location' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ description: 'Page number', minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Number of items per page', minimum: 1, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({ description: 'Sort by field' })
  @IsOptional()
  @IsString()
  sortBy?: string = 'startDate';

  @ApiPropertyOptional({ description: 'Sort order' })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';
}
