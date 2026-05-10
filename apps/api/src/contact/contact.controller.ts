import { Controller, Get, Post, Delete, Query, HttpStatus, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ContactService } from './contact.service';
import { CreateContactDto, ContactQueryDto } from './dto/contact.dto';
import { ContactSubmission } from './contact.service';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Submit contact form' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Contact submission created successfully' })
  async create(@Body() createContactDto: CreateContactDto): Promise<ContactSubmission> {
    try {
      return await this.contactService.createSubmission(createContactDto);
    } catch (error) {
      throw new Error(`Failed to create contact submission: ${(error as Error).message}`);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'content_manager')
  @ApiOperation({ summary: 'Get all contact submissions' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Contact submissions retrieved successfully' })
  async findAll(@Query() query: ContactQueryDto): Promise<{
    submissions: ContactSubmission[];
    total: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  }> {
    return this.contactService.findAll(query);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'content_manager')
  @ApiOperation({ summary: 'Get contact statistics' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Contact statistics retrieved successfully' })
  async getStats(): Promise<{
    total: number;
    bySubject: Record<string, number>;
    recentSubmissions: ContactSubmission[];
  }> {
    return this.contactService.getStats();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'content_manager')
  @ApiOperation({ summary: 'Get contact submission by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Contact submission retrieved successfully' })
  async findOne(@Param('id') id: string): Promise<ContactSubmission | null> {
    return this.contactService.findById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a contact submission' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Contact submission deleted successfully' })
  async remove(@Param('id') _id: string) {
    return { message: 'Not implemented' };
  }
}
