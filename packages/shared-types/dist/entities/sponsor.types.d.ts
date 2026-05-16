export type SponsorTier = 'title' | 'gold' | 'silver' | 'partner';
export interface Sponsor {
    id: string;
    name: string;
    tier: SponsorTier;
    description?: string;
    websiteUrl?: string;
    industry?: string;
    logoText?: string;
    since?: number;
}
export interface SponsorsPage {
    title: Sponsor[];
    gold: Sponsor[];
    silver: Sponsor[];
    partner: Sponsor[];
    total: number;
}
export interface SponsorCampaign {
    id: string;
    sponsorId: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'completed' | 'paused';
    placements: string[];
    budget: number;
    impressions: number;
    clicks: number;
    conversions: number;
    roi: number;
}
export interface DemographicSlice {
    label: string;
    value: number;
}
export interface PageviewTrend {
    month: string;
    matches: number;
    tournaments: number;
    players: number;
}
export interface SocialReach {
    platform: string;
    followers: number;
    impressions: number;
    engagementRate: number;
}
export interface ReachMetrics {
    sponsorId: string;
    reportPeriod: string;
    totalPageviews: number;
    uniqueVisitors: number;
    avgSessionSeconds: number;
    geographyBreakdown: DemographicSlice[];
    ageBreakdown: DemographicSlice[];
    pageviewTrends: PageviewTrend[];
    socialReach: SocialReach[];
}
export type SponsorAssetType = 'logo' | 'banner' | 'press_mention' | 'media_kit';
export interface SponsorAsset {
    id: string;
    sponsorId: string;
    name: string;
    type: SponsorAssetType;
    format: string;
    sizeKb: number;
    uploadedAt: string;
    downloadUrl: string;
    description?: string;
}
//# sourceMappingURL=sponsor.types.d.ts.map