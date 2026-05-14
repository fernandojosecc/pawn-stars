export const NotificationEvents = {
  MATCH_FINISHED:        'match.finished',
  ROUND_COMPLETE:        'round.complete',
  TRIAL_STATUS_CHANGED:  'trial.status.changed',
} as const;

export interface MatchFinishedEvent {
  matchId: string;
}

export interface RoundCompleteEvent {
  tournamentId: string;
  roundNumber: number;
}

export interface TrialStatusChangedEvent {
  applicantEmail: string;
  applicantName: string;
  status: 'reviewing' | 'accepted' | 'rejected';
  ctaUrl?: string;
}
