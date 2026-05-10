import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
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

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'content_manager')
  @ApiOperation({ summary: 'Create a sponsor' })
  @ApiResponse({ status: 201, description: 'Sponsor created successfully' })
  async create(@Body() _body: Record<string, unknown>) {
    return { message: 'Not implemented' };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'content_manager')
  @ApiOperation({ summary: 'Update a sponsor' })
  @ApiParam({ name: 'id', description: 'Sponsor ID' })
  @ApiResponse({ status: 200, description: 'Sponsor updated successfully' })
  async update(@Param('id') _id: string, @Body() _body: Record<string, unknown>) {
    return { message: 'Not implemented' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a sponsor' })
  @ApiParam({ name: 'id', description: 'Sponsor ID' })
  @ApiResponse({ status: 200, description: 'Sponsor deleted successfully' })
  async remove(@Param('id') _id: string) {
    return { message: 'Not implemented' };
  }
}
