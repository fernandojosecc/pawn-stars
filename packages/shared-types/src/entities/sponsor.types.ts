export type SponsorTier = 'title' | 'gold' | 'silver' | 'partner'

export interface Sponsor {
  id: string
  name: string
  tier: SponsorTier
  description?: string
  websiteUrl?: string
  industry?: string
  logoText?: string    // initials shown in placeholder logo
  since?: number       // year sponsorship began
}

export interface SponsorsPage {
  title:   Sponsor[]
  gold:    Sponsor[]
  silver:  Sponsor[]
  partner: Sponsor[]
  total:   number
}

// --- Sponsor Portal types ---

export interface SponsorCampaign {
  id: string
  sponsorId: string
  name: string
  description: string
  startDate: string       // ISO date string
  endDate: string
  status: 'active' | 'completed' | 'paused'
  placements: string[]    // e.g. ['Homepage banner', 'Tournament page']
  budget: number          // USD
  impressions: number
  clicks: number
  conversions: number
  roi: number             // percentage, e.g. 142 = 142%
}

export interface DemographicSlice {
  label: string
  value: number           // percentage of total audience
}

export interface PageviewTrend {
  month: string           // e.g. 'Jan 2026'
  matches: number
  tournaments: number
  players: number
}

export interface SocialReach {
  platform: string
  followers: number
  impressions: number
  engagementRate: number  // percentage
}

export interface ReachMetrics {
  sponsorId: string
  reportPeriod: string    // e.g. 'Q1 2026'
  totalPageviews: number
  uniqueVisitors: number
  avgSessionSeconds: number
  geographyBreakdown: DemographicSlice[]
  ageBreakdown: DemographicSlice[]
  pageviewTrends: PageviewTrend[]
  socialReach: SocialReach[]
}

export type SponsorAssetType = 'logo' | 'banner' | 'press_mention' | 'media_kit'

export interface SponsorAsset {
  id: string
  sponsorId: string
  name: string
  type: SponsorAssetType
  format: string          // e.g. 'PNG', 'PDF', 'SVG'
  sizeKb: number
  uploadedAt: string      // ISO date string
  downloadUrl: string     // placeholder URL
  description?: string
}
