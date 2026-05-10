import { IsDateString, IsOptional, IsString } from 'class-validator'

export class CreateMatchDto {
  @IsDateString()
  date!: string

  @IsOptional()
  @IsString()
  venue?: string

  @IsString()
  status!: string

  @IsString()
  homeTeamId!: string

  @IsString()
  awayTeamId!: string

  @IsOptional()
  @IsString()
  seasonId?: string

  @IsOptional()
  @IsString()
  tournamentId?: string
}
