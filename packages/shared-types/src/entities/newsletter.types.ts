export enum NewsletterPreference {
  MATCH_RESULTS      = 'match_results',
  TOURNAMENT_UPDATES = 'tournament_updates',
  TEAM_NEWS          = 'team_news',
  BLOG_POSTS         = 'blog_posts',
}

export interface NewsletterSubscriber {
  id: string
  email: string
  preferences: NewsletterPreference[]
  confirmed: boolean
  unsubscribed: boolean
  subscribedAt: string   // ISO
  unsubscribedAt?: string
}

export interface NewsletterSubscribeRequest {
  email: string
  preferences: NewsletterPreference[]
}

export interface NewsletterUnsubscribeRequest {
  email: string
}

export interface NewsletterSendRequest {
  subject: string
  body: string            // plain text / paragraphs; rendered into template HTML
  segment?: NewsletterPreference
}

export interface NewsletterSendResult {
  id: string
  subject: string
  sentAt: string          // ISO
  recipientCount: number
  segment?: NewsletterPreference
  success: boolean
  error?: string
}
