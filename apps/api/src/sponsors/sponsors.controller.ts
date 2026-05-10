import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SponsorsService, SponsorsPage } from './sponsors.service';

@ApiTags('sponsors')
@Controller('sponsors')
export class SponsorsController {
  constructor(private readonly sponsorsService: SponsorsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all sponsors grouped by tier' })
  @ApiResponse({ status: 200, description: 'Sponsors retrieved successfully' })
  async findAll(): Promise<SponsorsPage> {
    return this.sponsorsService.findAll();
  }
}
