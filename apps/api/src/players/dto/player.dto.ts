import { IsString, IsNumber, IsOptional, IsBoolean, IsEnum, Min, Max, IsDate, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Define PlayerTitle locally to avoid import issues
export type PlayerTitle = 'GM' | 'IM' | 'FM' | 'CM' | 'WGM' | 'WIM' | 'WFM' | 'WCM' | null;

export class CreatePlayerDto {
  @ApiProperty()
  @IsString()
  firstName!: string;

  @ApiProperty()
  @IsString()
  lastName!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nationality?: string;

  @ApiPropertyOptional()
  @IsOptional()
  dateOfBirth?: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  photoUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  title?: PlayerTitle;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  lichessHandle?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  fideId?: string;
}

export class UpdatePlayerDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nationality?: string;

  @ApiPropertyOptional()
  @IsOptional()
  dateOfBirth?: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  photoUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  title?: PlayerTitle;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  lichessHandle?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  fideId?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  currentRating?: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  teamId?: string;
}


export class PlayerQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  title?: PlayerTitle;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nationality?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(0)
  @IsOptional()
  minRating?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Max(4000)
  @IsOptional()
  maxRating?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 20;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;
}
