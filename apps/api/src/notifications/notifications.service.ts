import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailService } from './email.service';
import type { MatchResultEmailProps, RoundCompleteEmailProps } from '@pawn-stars/email-templates';
import {
  NotificationEvents,
  type MatchFinishedEvent,
  type RoundCompleteEvent,
  type TrialStatusChangedEvent,
} from './events/notification.events';
import type { NotificationType, SendNotificationResult } from '@pawn-stars/shared-types';

// Mock recipient resolver — replace with DB lookups when API is wired.
const MOCK_PLAYER_EMAILS = ['player1@example.com', 'player2@example.com'];
const MATCH_CENTER_BASE  = 'https://pawnstars.com/matches';

// Mock match payload for demo / test endpoint.
function mockMatchResultProps(matchId: string): MatchResultEmailProps {
  return {
    homeTeam: 'Pawn Stars',
    awayTeam: 'Rook Warriors',
    homeScore: 5.5,
    awayScore: 2.5,
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    venue: 'Chess Arena Madrid',
    mvp: { name: 'Magnus Carlsen', title: 'GM', reason: 'Perfect score on Board 1 with two dominant victories' },
    topPerformers: [
      { name: 'Magnus Carlsen', title: 'GM', performance: 2920 },
      { name: 'Fabiano Caruana', title: 'GM', performance: 2870 },
    ],
    matchUrl: `${MATCH_CENTER_BASE}/${matchId}`,
  };
}

function mockRoundCompleteProps(tournamentId: string, roundNumber: number): RoundCompleteEmailProps {
  return {
    roundNumber,
    tournamentName: 'Tata Steel Masters 2024',
    homeTeam: 'Pawn Stars',
    awayTeam: 'Rook Warriors',
    results: [
      { board: 1, homePlayer: 'Magnus Carlsen',     awayPlayer: 'Ding Liren',    result: 'WIN'  },
      { board: 2, homePlayer: 'Fabiano Caruana',    awayPlayer: 'Levon Aronian', result: 'DRAW' },
      { board: 3, homePlayer: 'Ian Nepomniachtchi', awayPlayer: 'Anish Giri',    result: 'WIN'  },
      { board: 4, homePlayer: 'Alireza Firouzja',   awayPlayer: 'H. Nakamura',   result: 'LOSS' },
    ],
    standings: [
      { team: 'Pawn Stars', points: 7 },
      { team: 'Rook Warriors', points: 5 },
      { team: 'Bishop Brigade', points: 4 },
    ],
    matchCenterUrl: `${MATCH_CENTER_BASE}/tournament/${tournamentId}`,
  };
}

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly emailService: EmailService) {}

  async sendMatchResult(matchId: string): Promise<SendNotificationResult> {
    const recipients = MOCK_PLAYER_EMAILS;
    const props = mockMatchResultProps(matchId);
    await this.emailService.sendMatchResult(recipients, props);
    return { sent: true, type: 'MATCH_RESULT' as NotificationType, recipients, devMode: process.env['NODE_ENV'] !== 'production' };
  }

  async sendRoundComplete(tournamentId: string, roundNumber: number): Promise<SendNotificationResult> {
    const recipients = MOCK_PLAYER_EMAILS;
    const props = mockRoundCompleteProps(tournamentId, roundNumber);
    await this.emailService.sendRoundComplete(recipients, props);
    return { sent: true, type: 'ROUND_COMPLETE' as NotificationType, recipients, devMode: process.env['NODE_ENV'] !== 'production' };
  }

  async sendTrialStatus(
    applicantEmail: string,
    applicantName: string,
    status: 'reviewing' | 'accepted' | 'rejected',
    ctaUrl?: string,
  ): Promise<SendNotificationResult> {
    await this.emailService.sendTrialStatus([applicantEmail], { applicantName, status, ctaUrl });
    return { sent: true, type: 'TRIAL_STATUS' as NotificationType, recipients: [applicantEmail], devMode: process.env['NODE_ENV'] !== 'production' };
  }

  @OnEvent(NotificationEvents.MATCH_FINISHED)
  async handleMatchFinished(event: MatchFinishedEvent): Promise<void> {
    this.logger.log(`Event received: ${NotificationEvents.MATCH_FINISHED} — matchId: ${event.matchId}`);
    await this.sendMatchResult(event.matchId);
  }

  @OnEvent(NotificationEvents.ROUND_COMPLETE)
  async handleRoundComplete(event: RoundCompleteEvent): Promise<void> {
    this.logger.log(`Event received: ${NotificationEvents.ROUND_COMPLETE} — tournamentId: ${event.tournamentId}, round: ${event.roundNumber}`);
    await this.sendRoundComplete(event.tournamentId, event.roundNumber);
  }

  @OnEvent(NotificationEvents.TRIAL_STATUS_CHANGED)
  async handleTrialStatusChanged(event: TrialStatusChangedEvent): Promise<void> {
    this.logger.log(`Event received: ${NotificationEvents.TRIAL_STATUS_CHANGED} — ${event.applicantEmail} → ${event.status}`);
    await this.sendTrialStatus(event.applicantEmail, event.applicantName, event.status, event.ctaUrl);
  }
}
