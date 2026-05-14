import { Injectable, Logger, ConflictException, NotFoundException } from '@nestjs/common';
import { EmailService } from '../notifications/email.service';
import type {
  NewsletterSubscriber,
  NewsletterSendRequest,
  NewsletterSendResult,
} from '@pawn-stars/shared-types';
import { NewsletterPreference } from '@pawn-stars/shared-types';

// ─── Mock seed data (50 subscribers) ─────────────────────────────────────────

const FIRST_NAMES = ['Alice', 'Bruno', 'Chiara', 'Dmitri', 'Elena', 'Faisal', 'Greta', 'Hiro', 'Ines', 'Jonas',
  'Kira', 'Luca', 'Maya', 'Nadia', 'Omar', 'Priya', 'Quinn', 'Ravi', 'Sofia', 'Tariq'];
const LAST_NAMES = ['Smith', 'Müller', 'Rossi', 'Petrov', 'García', 'Al-Farsi', 'Hansen', 'Yamamoto', 'Silva', 'Kim',
  'Novak', 'Osei', 'Patel', 'Reyes', 'Svensson', 'Torres', 'Ueda', 'Vasquez', 'Wong', 'Yılmaz'];
const DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'proton.me', 'chess.club', 'icloud.com'];

const ALL_PREFS = Object.values(NewsletterPreference);

function seedSubscribers(): NewsletterSubscriber[] {
  const subs: NewsletterSubscriber[] = [];
  let idx = 0;
  for (let i = 0; i < 50; i++) {
    const first = FIRST_NAMES[i % FIRST_NAMES.length]!;
    const last  = LAST_NAMES[Math.floor(i / FIRST_NAMES.length) % LAST_NAMES.length]!;
    const domain = DOMAINS[i % DOMAINS.length]!;
    const email = `${first.toLowerCase()}.${last.toLowerCase()}${i > 19 ? i : ''}@${domain}`;

    // Varied preference combinations
    const prefCount = 1 + (i % 4);
    const prefs: NewsletterPreference[] = [];
    for (let p = 0; p < prefCount; p++) {
      const pref = ALL_PREFS[(idx + p) % ALL_PREFS.length]!;
      if (!prefs.includes(pref)) prefs.push(pref);
    }
    idx += 2;

    const daysAgo = 10 + (i * 3);
    const subscribedAt = new Date(Date.now() - daysAgo * 86_400_000).toISOString();

    subs.push({
      id: `sub-${String(i + 1).padStart(3, '0')}`,
      email,
      preferences: prefs,
      confirmed:    i % 7 !== 0,     // ~6 unconfirmed (1 in 7)
      unsubscribed: i === 3 || i === 17 || i === 31,  // 3 unsubscribed
      subscribedAt,
      unsubscribedAt: (i === 3 || i === 17 || i === 31)
        ? new Date(Date.now() - 2 * 86_400_000).toISOString()
        : undefined,
    });
  }
  return subs;
}

// ─── Service ─────────────────────────────────────────────────────────────────

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);
  private readonly subscribers: NewsletterSubscriber[] = seedSubscribers();
  private readonly sendHistory: NewsletterSendResult[] = [];

  constructor(private readonly emailService: EmailService) {}

  subscribe(email: string, preferences: NewsletterPreference[]): NewsletterSubscriber {
    const existing = this.subscribers.find((s) => s.email === email);
    if (existing) {
      if (existing.unsubscribed) {
        existing.unsubscribed = false;
        existing.unsubscribedAt = undefined;
        existing.preferences = preferences.length ? preferences : existing.preferences;
        this.logger.log(`Re-subscribed: ${email}`);
        return existing;
      }
      throw new ConflictException(`${email} is already subscribed`);
    }

    const sub: NewsletterSubscriber = {
      id: `sub-${Date.now()}`,
      email,
      preferences: preferences.length ? preferences : [NewsletterPreference.MATCH_RESULTS],
      confirmed: false,
      unsubscribed: false,
      subscribedAt: new Date().toISOString(),
    };
    this.subscribers.push(sub);
    this.logger.log(`New subscriber: ${email} (unconfirmed)`);
    return sub;
  }

  unsubscribe(email: string): void {
    const sub = this.subscribers.find((s) => s.email === email);
    if (!sub) throw new NotFoundException(`Subscriber not found: ${email}`);
    sub.unsubscribed = true;
    sub.unsubscribedAt = new Date().toISOString();
    this.logger.log(`Unsubscribed: ${email}`);
  }

  getSubscribers(
    page = 1,
    limit = 20,
    status?: 'confirmed' | 'unconfirmed' | 'unsubscribed',
    preference?: NewsletterPreference,
  ): { subscribers: NewsletterSubscriber[]; total: number; page: number; totalPages: number } {
    let list = [...this.subscribers];

    if (status === 'confirmed')    list = list.filter((s) => s.confirmed && !s.unsubscribed);
    if (status === 'unconfirmed')  list = list.filter((s) => !s.confirmed && !s.unsubscribed);
    if (status === 'unsubscribed') list = list.filter((s) => s.unsubscribed);
    if (preference)                list = list.filter((s) => s.preferences.includes(preference));

    list.sort((a, b) => b.subscribedAt.localeCompare(a.subscribedAt));

    const total = list.length;
    const start = (page - 1) * limit;
    return {
      subscribers: list.slice(start, start + limit),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  getStats(): { total: number; confirmed: number; unconfirmed: number; unsubscribed: number; byPreference: Record<NewsletterPreference, number> } {
    const active = this.subscribers.filter((s) => s.confirmed && !s.unsubscribed);
    const byPreference = Object.fromEntries(
      ALL_PREFS.map((p) => [p, active.filter((s) => s.preferences.includes(p)).length]),
    ) as Record<NewsletterPreference, number>;

    return {
      total:        this.subscribers.length,
      confirmed:    this.subscribers.filter((s) => s.confirmed && !s.unsubscribed).length,
      unconfirmed:  this.subscribers.filter((s) => !s.confirmed && !s.unsubscribed).length,
      unsubscribed: this.subscribers.filter((s) => s.unsubscribed).length,
      byPreference,
    };
  }

  async send(request: NewsletterSendRequest): Promise<NewsletterSendResult> {
    const recipients = this.subscribers.filter((s) => {
      if (!s.confirmed || s.unsubscribed) return false;
      if (request.segment && !s.preferences.includes(request.segment)) return false;
      return true;
    });

    const result: NewsletterSendResult = {
      id: `send-${Date.now()}`,
      subject: request.subject,
      sentAt: new Date().toISOString(),
      recipientCount: recipients.length,
      segment: request.segment,
      success: true,
    };

    if (recipients.length === 0) {
      result.success = false;
      result.error = 'No eligible recipients for this segment';
      this.sendHistory.unshift(result);
      return result;
    }

    try {
      const { renderNewsletterEmail } = await import('@pawn-stars/email-templates');

      const paragraphs = request.body.split('\n\n').filter(Boolean);
      const html = await renderNewsletterEmail({
        subject: request.subject,
        previewText: paragraphs[0]?.slice(0, 140),
        bodyParagraphs: paragraphs,
        unsubscribeUrl: `${process.env['FRONTEND_URL'] ?? 'http://localhost:3000'}/newsletter/unsubscribe`,
        issueLabel: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
      });

      // Dispatch in batches of 50 to avoid Resend rate limits
      const BATCH = 50;
      for (let i = 0; i < recipients.length; i += BATCH) {
        const batch = recipients.slice(i, i + BATCH).map((s) => s.email);
        await this.emailService.sendHtml(batch, request.subject, html);
      }

      this.logger.log(`Newsletter sent — subject: "${request.subject}", recipients: ${recipients.length}`);
    } catch (err) {
      result.success = false;
      result.error = err instanceof Error ? err.message : String(err);
      this.logger.error(`Newsletter send failed: ${result.error}`);
    }

    this.sendHistory.unshift(result);
    return result;
  }

  getSendHistory(): NewsletterSendResult[] {
    return this.sendHistory;
  }
}
