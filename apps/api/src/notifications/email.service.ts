import { Injectable, Logger } from '@nestjs/common';
import type { MatchResultEmailProps, RoundCompleteEmailProps, TrialStatusEmailProps } from '@pawn-stars/email-templates';

// Templates are imported lazily to avoid ESM/CJS interop issues at module load time.
// In production, switch to top-level imports once the runtime environment is confirmed ESM-compatible.
async function loadTemplates() {
  const mod = await import('@pawn-stars/email-templates');
  return {
    renderMatchResult:   mod.renderMatchResultEmail,
    renderRoundComplete: mod.renderRoundCompleteEmail,
    renderTrialStatus:   mod.renderTrialStatusEmail,
  };
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly isDev  = process.env['NODE_ENV'] !== 'production';
  private readonly from   = process.env['EMAIL_FROM'] ?? 'noreply@pawnstars.com';

  private async getResend() {
    if (this.isDev || !process.env['RESEND_API_KEY']) return null;
    const { Resend } = await import('resend');
    return new Resend(process.env['RESEND_API_KEY']);
  }

  private async dispatch(to: string[], subject: string, html: string): Promise<void> {
    const resend = await this.getResend();
    if (!resend) {
      this.logger.log(`[DEV] Email suppressed — to: ${to.join(', ')} | subject: ${subject}`);
      return;
    }
    await resend.emails.send({ from: this.from, to, subject, html });
    this.logger.log(`Email sent — to: ${to.join(', ')} | subject: ${subject}`);
  }

  async sendMatchResult(to: string[], props: MatchResultEmailProps): Promise<void> {
    const { renderMatchResult } = await loadTemplates();
    const html = await renderMatchResult(props);
    await this.dispatch(to, `Match Result: ${props.homeTeam} vs ${props.awayTeam}`, html);
  }

  async sendRoundComplete(to: string[], props: RoundCompleteEmailProps): Promise<void> {
    const { renderRoundComplete } = await loadTemplates();
    const html = await renderRoundComplete(props);
    await this.dispatch(to, `Round ${props.roundNumber} Complete — ${props.tournamentName}`, html);
  }

  async sendTrialStatus(to: string[], props: TrialStatusEmailProps): Promise<void> {
    const { renderTrialStatus } = await loadTemplates();
    const html = await renderTrialStatus(props);
    const subjects: Record<TrialStatusEmailProps['status'], string> = {
      reviewing: 'We received your application — Pawn Stars',
      accepted:  'Welcome to Pawn Stars!',
      rejected:  'Pawn Stars — Application Update',
    };
    await this.dispatch(to, subjects[props.status], html);
  }
}
