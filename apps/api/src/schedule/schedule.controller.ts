import { Controller, Get, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ScheduleService, CalendarMonth, ScheduleEvent } from './schedule.service';

@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  @ApiOperation({ summary: 'Get schedule events grouped by date for a given month' })
  @ApiResponse({ status: 200, description: 'Calendar month with events per day' })
  @ApiQuery({ name: 'year',  required: false, type: Number, description: 'Year (defaults to current)' })
  @ApiQuery({ name: 'month', required: false, type: Number, description: 'Month 1–12 (defaults to current)' })
  async findByMonth(
    @Query('year',  new DefaultValuePipe(new Date().getFullYear()), ParseIntPipe) year: number,
    @Query('month', new DefaultValuePipe(new Date().getMonth() + 1), ParseIntPipe) month: number,
  ): Promise<CalendarMonth> {
    return this.scheduleService.findByMonth(year, month);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all schedule events (flat list)' })
  @ApiResponse({ status: 200, description: 'All events' })
  async findAll(): Promise<ScheduleEvent[]> {
    return this.scheduleService.findAll();
  }
}
