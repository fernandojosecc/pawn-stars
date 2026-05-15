import { Controller, Get, Post, Patch, Delete, Param, Query, Body, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../auth/roles.guard'
import { Roles } from '../auth/roles.decorator'
import { MatchesService, MatchDetail, MatchPreview } from './matches.service'
import { AuditService } from '../audit/audit.service'
import { AuditAction } from '@pawn-stars/shared-types'

@Controller('matches')
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService,
    private readonly auditService: AuditService,
  ) {}

  @Get()
  async findAll(@Query('status') status?: string): Promise<MatchPreview[]> {
    if (status === 'upcoming') return this.matchesService.findUpcoming()
    if (status === 'completed') return this.matchesService.findCompleted()
    return this.matchesService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MatchDetail> {
    return this.matchesService.findOne(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'content_manager', 'analyst')
  async create(@Body() body: Record<string, unknown>) {
    this.auditService.log({ entity: 'Match', entityId: String(body['id'] ?? 'new'), action: AuditAction.CREATE, summary: `Created match "${body['title'] ?? 'unknown'}"`, after: body })
    return { message: 'Not implemented' }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'content_manager', 'analyst')
  async update(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    this.auditService.log({ entity: 'Match', entityId: id, action: AuditAction.UPDATE, summary: `Updated match ${id}`, after: body })
    return { message: 'Not implemented' }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Param('id') id: string) {
    this.auditService.log({ entity: 'Match', entityId: id, action: AuditAction.DELETE, summary: `Deleted match ${id}` })
    return { message: 'Not implemented' }
  }
}
