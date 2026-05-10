import { Controller, Get, Post, Query, HttpStatus, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Get contact submission by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Contact submission retrieved successfully' })
  async findOne(@Param('id') id: string): Promise<ContactSubmission | null> {
    return this.contactService.findById(id);
  }
}
