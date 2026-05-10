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
