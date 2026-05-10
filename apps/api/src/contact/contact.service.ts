import { Injectable } from '@nestjs/common';
import { CreateContactDto, ContactSubject } from './dto/contact.dto';
import { IsEnum, IsString } from 'class-validator';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: ContactSubject;
  message?: string;
  submittedAt: Date;
  ipAddress: string;
}

@Injectable()
export class ContactService {
  private readonly submissions: ContactSubmission[] = [];

  async createSubmission(createContactDto: CreateContactDto): Promise<ContactSubmission> {
    const submission: ContactSubmission = {
      id: crypto.randomUUID(),
      name: createContactDto.name || 'Anonymous',
      email: createContactDto.email,
      subject: createContactDto.subject as ContactSubject,
      message: createContactDto.message,
      submittedAt: new Date(),
      ipAddress: '127.0.0.1' // Mock IP for development
    };

    // Store submission (in production, this would save to database)
    this.submissions.push(submission);

    // Log submission for demonstration
    console.log('Contact submission received:', submission);

    return submission;
  }

  async findAll(query?: any): Promise<{
    submissions: ContactSubmission[];
    total: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  }> {
    // Mock pagination and filtering logic
    const page = parseInt(query?.page) || 1;
    const limit = parseInt(query?.limit) || 10;
    const startIndex = (page - 1) * limit;

    let filteredSubmissions = [...this.submissions];

    // Apply filters
    if (query?.subject) {
      filteredSubmissions = filteredSubmissions.filter(
        submission => submission.subject === query.subject
      );
    }

    if (query?.dateFrom) {
      const dateFrom = new Date(query.dateFrom);
      filteredSubmissions = filteredSubmissions.filter(
        submission => submission.submittedAt >= dateFrom
      );
    }

    if (query?.dateTo) {
      const dateTo = new Date(query.dateTo);
      filteredSubmissions = filteredSubmissions.filter(
        submission => submission.submittedAt <= dateTo
      );
    }

    if (query?.search) {
      const searchTerm = query.search.toLowerCase();
      filteredSubmissions = filteredSubmissions.filter(
        submission => 
          submission.name.toLowerCase().includes(searchTerm) ||
          submission.email.toLowerCase().includes(searchTerm) ||
          (submission.message?.toLowerCase() || '').includes(searchTerm)
      );
    }

    // Sort by submission date (newest first)
    filteredSubmissions.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());

    // Paginate results
    const paginatedSubmissions = filteredSubmissions.slice(startIndex, startIndex + limit);
    const total = filteredSubmissions.length;
    const totalPages = Math.ceil(total / limit);

    return {
      submissions: paginatedSubmissions,
      total,
      page,
      limit,
      totalPages
    };
  }

  async findById(id: string): Promise<ContactSubmission | null> {
    const submission = this.submissions.find(s => s.id === id);
    return submission || null;
  }

  async getStats(): Promise<{
    total: number;
    bySubject: Record<ContactSubject, number>;
    recentSubmissions: ContactSubmission[];
  }> {
    const total = this.submissions.length;

    // Count by subject
    const bySubject = this.submissions.reduce((acc, submission) => {
      const subject = submission.subject as ContactSubject;
      acc[subject] = (acc[subject] || 0) + 1;
      return acc;
    }, {} as Record<ContactSubject, number>);

    // Get recent submissions (last 5)
    const recentSubmissions = [...this.submissions]
      .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime())
      .slice(0, 5);

    return {
      total,
      bySubject,
      recentSubmissions
    };
  }

  // Mock some initial submissions for demonstration
  constructor() {
    this.createSubmission({
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: ContactSubject.GENERAL,
      message: 'This is a great chess organization! I would like to learn more about your programs.'
    });

    this.createSubmission({
      name: 'Jane Smith',
      email: 'jane.smith@press.com',
      subject: ContactSubject.PRESS,
      message: 'I am a sports journalist interested in covering your upcoming tournaments.'
    });

    this.createSubmission({
      name: 'Mike Johnson',
      email: 'mike@sponsor.com',
      subject: ContactSubject.SPONSORSHIP,
      message: 'Our company would like to discuss sponsorship opportunities with Pawn Stars.'
    });

    this.createSubmission({
      name: 'Sarah Wilson',
      email: 'sarah@trials.com',
      subject: ContactSubject.TRIALS,
      message: 'I am a 16-year-old chess player interested in joining your academy.'
    });
  }
}
