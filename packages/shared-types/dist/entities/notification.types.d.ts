export declare enum NotificationType {
    MATCH_RESULT = "MATCH_RESULT",
    ROUND_COMPLETE = "ROUND_COMPLETE",
    TRIAL_STATUS = "TRIAL_STATUS"
}
export interface MatchResultPayload {
    type: NotificationType.MATCH_RESULT;
    matchId: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    date: string;
    venue?: string;
    mvp?: {
        name: string;
        title: string;
        reason: string;
    };
    topPerformers?: {
        name: string;
        title: string;
        performance: number;
    }[];
    matchUrl: string;
}
export interface RoundCompletePayload {
    type: NotificationType.ROUND_COMPLETE;
    tournamentId: string;
    roundNumber: number;
    tournamentName: string;
    homeTeam: string;
    awayTeam: string;
    results: {
        board: number;
        homePlayer: string;
        awayPlayer: string;
        result: 'WIN' | 'LOSS' | 'DRAW';
    }[];
    standings: {
        team: string;
        points: number;
    }[];
    nextRound?: {
        date: string;
        venue: string;
    };
    matchCenterUrl: string;
}
export interface TrialStatusPayload {
    type: NotificationType.TRIAL_STATUS;
    applicantName: string;
    applicantEmail: string;
    status: 'reviewing' | 'accepted' | 'rejected';
    ctaUrl?: string;
}
export type NotificationPayload = MatchResultPayload | RoundCompletePayload | TrialStatusPayload;
export interface SendNotificationResult {
    sent: boolean;
    type: NotificationType;
    recipients: string[];
    devMode: boolean;
}
export type PortalNotificationType = 'match_result' | 'round_complete' | 'team_announcement' | 'trial_status';
export interface PortalNotification {
    id: string;
    type: PortalNotificationType;
    title: string;
    body: string;
    read: boolean;
    createdAt: Date;
}
//# sourceMappingURL=notification.types.d.ts.map