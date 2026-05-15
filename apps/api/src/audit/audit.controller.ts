import {
  Controller, Get, Param, Query,
  UseGuards, NotFoundException,
  DefaultValuePipe, ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AuditService } from './audit.service';
import { AuditAction } from '@pawn-stars/shared-types';

@ApiTags('audit')
@Controller('audit')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get('logs')
  @ApiOperation({ summary: 'Get paginated audit logs with optional filters' })
  @ApiQuery({ name: 'page',   required: false, type: Number })
  @ApiQuery({ name: 'limit',  required: false, type: Number })
  @ApiQuery({ name: 'entity', required: false })
  @ApiQuery({ name: 'action', required: false, enum: AuditAction })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({ name: 'from',   required: false, description: 'ISO date YYYY-MM-DD' })
  @ApiQuery({ name: 'to',     required: false, description: 'ISO date YYYY-MM-DD' })
  findAll(
    @Query('page',  new DefaultValuePipe(1),  ParseIntPipe) page:  number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('entity') entity?: string,
    @Query('action') action?: AuditAction,
    @Query('userId') userId?: string,
    @Query('from')   from?:   string,
    @Query('to')     to?:     string,
  ) {
    return this.auditService.findAll({ page, limit, entity, action, userId, from, to });
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get audit statistics — action counts by entity and by day (last 30 days)' })
  getStats() {
    return this.auditService.getStats();
  }

  @Get('logs/:id')
  @ApiOperation({ summary: 'Get a single audit log entry with full diff' })
  findOne(@Param('id') id: string) {
    const log = this.auditService.findOne(id);
    if (!log) throw new NotFoundException(`Audit log not found: ${id}`);
    return log;
  }
}
