const BASE_URL = "https://pawnstars.com"

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    "@id": `${BASE_URL}/#organization`,
    name: "Pawn Stars",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    sameAs: ["https://twitter.com/pawnstars"],
    sport: "Chess",
    foundingDate: "2021",
  }
}

export function personSchema(player: {
  slug: string
  firstName: string
  lastName: string
  nationality: string
  dateOfBirth?: Date | null
  bio?: string | null
  photoUrl?: string | null
  title?: string | null
  fideId?: string | null
  currentRating?: number
}) {
  const imageUrl = player.photoUrl
    ? player.photoUrl.startsWith("http")
      ? player.photoUrl
      : `${BASE_URL}${player.photoUrl}`
    : undefined

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/players/${player.slug}#person`,
    name: `${player.firstName} ${player.lastName}`,
    url: `${BASE_URL}/players/${player.slug}`,
    nationality: player.nationality,
    ...(player.dateOfBirth
      ? { birthDate: player.dateOfBirth.toISOString().split("T")[0] }
      : {}),
    ...(player.bio ? { description: player.bio } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(player.fideId
      ? {
          identifier: {
            "@type": "PropertyValue",
            name: "FIDE ID",
            value: player.fideId,
          },
        }
      : {}),
    ...(player.title ? { honorificPrefix: player.title } : {}),
    memberOf: {
      "@type": "SportsOrganization",
      "@id": `${BASE_URL}/#organization`,
      name: "Pawn Stars",
    },
  }
}

export function eventSchema(tournament: {
  slug: string
  name: string
  format: string
  status: string
  startDate: Date
  endDate?: Date | null
  location?: string | null
  description?: string | null
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "@id": `${BASE_URL}/tournaments/${tournament.slug}#event`,
    name: tournament.name,
    url: `${BASE_URL}/tournaments/${tournament.slug}`,
    startDate: tournament.startDate.toISOString(),
    ...(tournament.endDate
      ? { endDate: tournament.endDate.toISOString() }
      : {}),
    eventStatus: "https://schema.org/EventScheduled",
    ...(tournament.location
      ? { location: { "@type": "Place", name: tournament.location } }
      : {}),
    ...(tournament.description ? { description: tournament.description } : {}),
    organizer: {
      "@type": "SportsOrganization",
      "@id": `${BASE_URL}/#organization`,
      name: "Pawn Stars",
    },
    sport: "Chess",
  }
}

export function matchSchema(match: {
  id: string
  homeTeam: { name: string }
  awayTeam: { name: string }
  date: Date
  venue?: string | null
  status: string
  homeScore?: number | null
  awayScore?: number | null
}) {
  const eventStatusMap: Record<string, string> = {
    COMPLETED: 'https://schema.org/EventScheduled',
    UPCOMING:  'https://schema.org/EventScheduled',
    LIVE:      'https://schema.org/EventScheduled',
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    '@id': `${BASE_URL}/matches/${match.id}#event`,
    name: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
    url: `${BASE_URL}/matches/${match.id}`,
    startDate: match.date.toISOString(),
    eventStatus: eventStatusMap[match.status] ?? 'https://schema.org/EventScheduled',
    sport: 'Chess',
    ...(match.venue ? { location: { '@type': 'Place', name: match.venue } } : {}),
    homeTeam: { '@type': 'SportsTeam', name: match.homeTeam.name },
    awayTeam: { '@type': 'SportsTeam', name: match.awayTeam.name },
    organizer: {
      '@type': 'SportsOrganization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Pawn Stars',
    },
  }
}

export function blogArticleSchema(post: {
  slug: string
  title: string
  excerpt?: string | null
  coverImage?: string | null
  author: string
  publishedAt: Date
  updatedAt?: Date
  tags?: string[]
  category: string
}) {
  const imageUrl = post.coverImage
    ? post.coverImage.startsWith("http")
      ? post.coverImage
      : `${BASE_URL}${post.coverImage}`
    : undefined

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${BASE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    url: `${BASE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt.toISOString(),
    ...(post.updatedAt ? { dateModified: post.updatedAt.toISOString() } : {}),
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Pawn Stars",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
    ...(post.excerpt ? { description: post.excerpt } : {}),
    ...(imageUrl ? { image: { "@type": "ImageObject", url: imageUrl } } : {}),
    articleSection: post.category,
    keywords: (post.tags ?? []).join(", "),
  }
}

export function articleSchema(article: {
  slug: string
  title: string
  excerpt?: string | null
  coverImage?: string | null
  author: string
  publishedAt: Date
  updatedAt?: Date
  tags?: string
  category: string
}) {
  const imageUrl = article.coverImage
    ? article.coverImage.startsWith("http")
      ? article.coverImage
      : `${BASE_URL}${article.coverImage}`
    : undefined

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${BASE_URL}/news/${article.slug}#article`,
    headline: article.title,
    url: `${BASE_URL}/news/${article.slug}`,
    datePublished: article.publishedAt.toISOString(),
    ...(article.updatedAt
      ? { dateModified: article.updatedAt.toISOString() }
      : {}),
    author: { "@type": "Person", name: article.author },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Pawn Stars",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
    ...(article.excerpt ? { description: article.excerpt } : {}),
    ...(imageUrl
      ? { image: { "@type": "ImageObject", url: imageUrl } }
      : {}),
    articleSection: article.category,
    keywords: article.tags ?? "",
  }
}
