import React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/typography/Heading"
import { Body } from "@/components/typography/Body"
import { articleSchema } from "@/lib/structured-data"
import { NewsCard, NewsCategory } from "@pawn-stars/shared-types"
import type { Metadata } from "next"

// Mock data for development - this would come from API in production
const mockNewsArticles: (NewsCard & { content: string; updatedAt: Date })[] = [
  {
    id: "1",
    slug: "magnus-carlsen-wins-world-championship-2023",
    title: "Magnus Carlsen Retains World Championship Title in Dramatic Final",
    excerpt: "In a stunning display of chess mastery, Magnus Carlsen successfully defended his World Championship title against Ian Nepomniachtchi in a thrilling 14-game match that concluded today in Dubai.",
    category: "MATCH_REPORTS",
    author: "Chess Analyst",
    publishedAt: new Date("2023-12-15"),
    coverImage: "/news/magnus-championship-2023.jpg",
    readTime: 8,
    featured: true,
    tags: "world championship, magnus carlsen, ian nepomniachtchi",
    content: `
      <h2>A Historic Defense</h2>
      <p>In what will be remembered as one of the most dramatic World Chess Championship matches in history, Magnus Carlsen has successfully defended his title against the formidable Ian Nepomniachtchi. The 14-game classical match, held in the stunning Dubai Opera House, concluded today with Carlsen emerging victorious by a narrow margin.</p>
      
      <h2>The Final Game</h2>
      <p>The decisive final game was a masterpiece of strategic depth and tactical precision. Carlsen, playing with the white pieces, opted for a quiet opening that gradually built pressure on Nepomniachtchi's position. The Russian grandmaster, known for his aggressive style, found himself in a difficult position as Carlsen's pieces began to coordinate beautifully.</p>
      
      <p>The critical moment came in the middlegame when Carlsen sacrificed a pawn to open lines against Nepomniachtchi's king. The sacrifice proved to be the turning point, as Carlsen's rooks and bishops created an unstoppable attacking formation. Nepomniachtchi's defense crumbled under the pressure, and Carlsen delivered the final blow on move 42.</p>
      
      <h2>Match Statistics</h2>
      <p>Throughout the match, both players demonstrated exceptional preparation and fighting spirit. The final score was 7.5-6.5 in favor of Carlsen, with three decisive games and eleven draws. Carlsen won games 3, 8, and 14, while Nepomniachtchi secured victories in games 6 and 11.</p>
      
      <p>The match featured some remarkable statistics:</p>
      <ul>
        <li>Total games played: 14</li>
        <li>Decisive games: 5</li>
        <li>Average game length: 47 moves</li>
        <li>Longest game: 78 moves (Game 8)</li>
        <li>Shortest decisive game: 31 moves (Game 3)</li>
      </ul>
      
      <h2>Key Moments</h2>
      <p>Several games stood out during this championship:</p>
      
      <p><strong>Game 3:</strong> Carlsen's first victory came after Nepomniachtchi blundered in a seemingly equal position. Carlsen's precise calculation allowed him to convert the advantage into a full point.</p>
      
      <p><strong>Game 6:</strong> Nepomniachtchi struck back with an impressive attacking game. His pieces coordinated beautifully against Carlsen's king, forcing the Norwegian grandmaster to resign on move 35.</p>
      
      <p><strong>Game 8:</strong> The longest game of the match saw Carlsen demonstrate his legendary endgame technique. In a complex rook ending, Carlsen's precise technique allowed him to grind out a win after 78 moves.</p>
      
      <p><strong>Game 11:</strong> Nepomniachtchi's second victory came in a tactical battle where he outplayed Carlsen in the middlegame. The Russian's aggressive approach paid dividends as he secured a crucial point.</p>
      
      <p><strong>Game 14:</strong> The final game was a masterpiece of positional chess. Carlsen's patient approach and deep understanding of the position allowed him to create winning chances that Nepomniachtchi couldn't defend against.</p>
      
      <h2>Post-Match Reactions</h2>
      <p>After the game, both players showed great sportsmanship. Carlsen praised Nepomniachtchi's performance, calling him "a worthy opponent who pushed me to my limits." Nepomniachtchi congratulated Carlsen on his victory and expressed his determination to challenge for the title again.</p>
      
      <p>"This was one of the toughest matches of my career," Carlsen said in the post-game press conference. "Ian played exceptionally well, and I had to be at my best to secure the victory. I'm proud of how I performed under pressure."</p>
      
      <h2>Looking Ahead</h2>
      <p>With this victory, Carlsen extends his reign as World Chess Champion. The chess world now looks forward to the next Candidates Tournament, which will determine who will challenge Carlsen for the title in 2025.</p>
      
      <p>Nepomniachtchi, despite the loss, has proven himself as one of the world's elite players. His performance in this match will undoubtedly earn him another opportunity to compete for the World Championship.</p>
      
      <p>As the chess community reflects on this historic match, one thing is certain: the level of play demonstrated by both Carlsen and Nepomniachtchi has set a new standard for World Championship matches.</p>
    `,
    updatedAt: new Date("2023-12-15")
  },
  {
    id: "2",
    slug: "pawn-stars-signs-new-prodigy",
    title: "Pawn Stars Announces Signing of 16-Year-Old Chess Prodigy",
    excerpt: "The organization is proud to welcome a new young talent to our roster. This rising star has already made waves in the international chess circuit with impressive performances in major tournaments.",
    category: "TRANSFERS",
    author: "Team Management",
    publishedAt: new Date("2024-01-10"),
    coverImage: "/news/new-prodigy-signing.jpg",
    readTime: 5,
    featured: true,
    tags: "transfers, new signing, prodigy",
    content: `
      <h2>A New Star Joins the Roster</h2>
      <p>Pawn Stars Chess Organization is thrilled to announce the signing of 16-year-old chess prodigy Alexander Petrov to our growing roster of elite players. The young grandmaster, who achieved his title at the age of 14, has been making headlines in the international chess circuit with his aggressive playing style and remarkable tactical vision.</p>
      
      <h2>Early Achievements</h2>
      <p>Alexander's chess journey began at the age of 6, and his talent was immediately apparent. By age 10, he was already competing in national tournaments, and at 14, he became one of the youngest grandmasters in history.</p>
      
      <p>His recent achievements include:</p>
      <ul>
        <li>Winner of the 2023 European Youth Championship</li>
        <li>Gold medal at the 2023 World Junior Championship</li>
        <li>Shared first place in the 2023 Tata Steel Masters Challengers</li>
        <li>Current FIDE rating of 2721</li>
      </ul>
      
      <h2>Why Pawn Stars?</h2>
      <p>"I chose Pawn Stars because of their commitment to developing young talent," Alexander said in a statement. "The organization has a proven track record of nurturing players to reach their full potential, and I'm excited to be part of such a supportive environment."</p>
      
      <h2>Team Integration</h2>
      <p>Alexander will join our team immediately and will participate in upcoming tournaments including the Candidates Tournament qualifiers and the European Club Championship. He will also work closely with our coaching staff to further develop his skills.</p>
      
      <p>Team Director Maria Chen expressed her excitement about the signing: "Alexander represents the future of chess, and we're honored to have him join our organization. His talent, combined with our resources and expertise, creates a perfect formula for success."</p>
      
      <h2>Future Prospects</h2>
      <p>With this signing, Pawn Stars strengthens its position as one of the leading chess organizations in the world. Alexander's addition to the team brings fresh energy and exceptional talent that will benefit the entire organization.</p>
      
      <p>Fans can look forward to seeing Alexander in action at our upcoming events, where he will undoubtedly showcase the skills that have made him one of the most exciting young players in chess today.</p>
    `,
    updatedAt: new Date("2024-01-10")
  },
  {
    id: "3",
    slug: "exclusive-interview-fabiano-caruana",
    title: "Exclusive Interview: Fabiano Caruana on His World Championship Journey",
    excerpt: "American grandmaster Fabiano Caruana shares his thoughts on preparation, strategy, and the future of chess in this exclusive interview with Pawn Stars media.",
    category: "INTERVIEWS",
    author: "Sports Journalist",
    publishedAt: new Date("2024-01-08"),
    coverImage: "/news/caruana-interview.jpg",
    readTime: 12,
    featured: false,
    tags: "interview, fabiano caruana, world championship",
    content: `
      <h2>A Champion's Mindset</h2>
      <p>In an exclusive interview with Pawn Stars, American grandmaster Fabiano Caruana opens up about his journey to the World Championship, his preparation methods, and his vision for the future of chess. The 31-year-old grandmaster, who challenged Magnus Carlsen for the World Championship in 2018, shares insights that only someone who has reached the pinnacle of chess can provide.</p>
      
      <h2>The Road to the Top</h2>
      <p>"The journey to becoming a World Championship contender is not a straight line," Caruana reflects, sipping his coffee in a quiet New York café. "There are countless setbacks, moments of doubt, and periods where you question everything. But what separates the contenders from the rest is the ability to push through those moments."</p>
      
      <p>Caruana's own journey began in Brooklyn, where he discovered chess at age 5. By 14, he had become the youngest grandmaster in American history at the time. But the path wasn't always smooth.</p>
      
      <h2>Preparation Philosophy</h2>
      <p>When asked about his preparation for the 2018 World Championship, Caruana's eyes light up. "Preparation is both an art and a science," he explains. "You need to study countless games, analyze positions with engines, and work with seconds. But you also need to understand yourself as a player – your strengths, your weaknesses, your emotional triggers."</p>
      
      <p>His preparation involved working with a team of seconds, including top grandmasters and computer experts. "We analyzed everything – Magnus's playing style, his openings, his tendencies in certain positions. But the most important thing was preparing myself mentally for the pressure."</p>
      
      <h2>The 2018 Championship Experience</h2>
      <p>Caruana's 2018 match against Carlsen ended in a 6-6 draw in classical games, with Carlsen winning the rapid tiebreak. Despite the loss, Caruana views the experience positively.</p>
      <p>"That match taught me more about myself than any tournament I've ever played," he says. "The pressure, the scrutiny, the mental fortitude required – it's a different world. I wouldn't trade that experience for anything."</p>
      
      <h2>Life Beyond Chess</h2>
      <p>When not traveling to tournaments, Caruana enjoys a relatively normal life. "I love reading, especially history and philosophy. I also enjoy hiking and spending time with family and friends. These activities help me maintain balance."</p>
      
      <p>He's also passionate about promoting chess in the United States. "Chess has so much to offer – it teaches critical thinking, patience, and sportsmanship. I want to see more young people in America discover the beauty of the game."</p>
      
      <h2>The Future of Chess</h2>
      <p>As we discuss the rapid evolution of chess, particularly with the rise of AI and online platforms, Caruana offers thoughtful insights. "Technology has changed chess dramatically," he acknowledges. "Players have access to more information than ever before. But the human element – creativity, intuition, the ability to handle pressure – remains crucial."</p>
      
      <p>He's particularly excited about the growing popularity of chess. "It's wonderful to see so many young people getting interested in chess. The future is bright, and I'm excited to be part of it."</p>
      
      <h2>Looking Ahead</h2>
      <p>With several major tournaments on the horizon, including the Candidates Tournament, Caruana remains focused on his goals. "I still believe I can become World Champion," he says with determination. "I'm working hard, staying focused, and preparing for every opportunity."</p>
      
      <p>As our interview concludes, Caruana reflects on what chess means to him. "Chess is more than a game to me. It's a passion, a discipline, a way of life. Every day, I'm grateful to be able to do what I love."</p>
      
      <h2>Advice for Aspiring Players</h2>
      <p>For young players looking to follow in his footsteps, Caruana offers simple but profound advice: "Love the game. Study hard. But most importantly, don't forget to enjoy the journey. Chess is a beautiful game, and the joy of playing should always be your primary motivation."</p>
      
      <p>With that, Fabiano Caruana heads off to his next training session, leaving us with a deeper understanding of what it takes to compete at the highest level of chess.</p>
    `,
    updatedAt: new Date("2024-01-08")
  }
]

export function generateStaticParams() {
  return mockNewsArticles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const article = mockNewsArticles.find(a => a.slug === slug)

  if (!article) {
    return { title: "Article Not Found", description: "The requested article could not be found." }
  }

  return {
    title: article.title,
    description: article.excerpt,
    keywords: ["chess", "pawn stars", article.category.toLowerCase(), article.author, ...(article.tags?.split(", ") ?? [])].filter(Boolean),
    alternates: { canonical: `https://pawnstars.com/news/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `https://pawnstars.com/news/${article.slug}`,
      images: [{ url: article.coverImage || "/og-image.jpg", width: 1200, height: 630, alt: article.title }],
      publishedTime: article.publishedAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: [article.author],
      section: article.category,
      tags: article.tags?.split(", ") ?? [],
    },
  }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = mockNewsArticles.find(a => a.slug === slug)

  if (!article) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary-900 mb-4">Article Not Found</h1>
          <p className="text-primary-600 mb-4">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/news"
            className="text-accent-600 hover:text-accent-700 underline"
          >
            Back to News
          </Link>
        </div>
      </div>
    )
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ANNOUNCEMENTS":
        return "bg-primary-100 text-primary-800"
      case "MATCH_REPORTS":
        return "bg-success-100 text-success-800"
      case "TRANSFERS":
        return "bg-accent-100 text-accent-800"
      case "INTERVIEWS":
        return "bg-warning-100 text-warning-800"
      case "EDITORIAL":
        return "bg-danger-100 text-danger-800"
      default:
        return "bg-primary-100 text-primary-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ANNOUNCEMENTS":
        return "📢"
      case "MATCH_REPORTS":
        return "♟️"
      case "TRANSFERS":
        return "🔄"
      case "INTERVIEWS":
        return "🎤"
      case "EDITORIAL":
        return "📝"
      default:
        return "📰"
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const ldJson = articleSchema(article)

  return (
    <div className="min-h-screen bg-primary-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
      {/* Article Header */}
      <header className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/news"
              className="text-accent-600 hover:text-accent-700 font-medium"
            >
              ← Back to News
            </Link>
          </div>

          <div className="space-y-6">
            {/* Category Badge */}
            <div className="flex items-center gap-3">
              <Badge className={getCategoryColor(article.category)}>
                <span className="mr-1">{getCategoryIcon(article.category)}</span>
                {article.category.replace('_', ' ')}
              </Badge>
              {article.featured && (
                <Badge className="bg-accent-500 text-white">
                  ⭐ Featured
                </Badge>
              )}
            </div>

            {/* Title */}
            <Heading level="h1" className="text-3xl sm:text-4xl font-bold text-primary-900">
              {article.title}
            </Heading>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-primary-600">
              <div className="flex items-center gap-1">
                <span className="text-base">✍️</span>
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-base">📅</span>
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              {article.readTime && (
                <div className="flex items-center gap-1">
                  <span className="text-base">⏱️</span>
                  <span>{article.readTime} min read</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {article.coverImage && (
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-64 sm:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div 
              dangerouslySetInnerHTML={{ __html: article.content }}
              className="text-primary-800 leading-relaxed"
            />
          </div>

          {/* Tags */}
          {article.tags && (
            <div className="mt-12 pt-8 border-t border-primary-200">
              <div className="flex flex-wrap gap-2">
                {article.tags.split(', ').map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs"
                  >
                    #{tag.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heading level="h2" className="mb-8">
            Related Articles
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockNewsArticles
              .filter(a => a.id !== article.id && a.category === article.category)
              .slice(0, 2)
              .map((relatedArticle) => (
                <div key={relatedArticle.id} className="border border-primary-200 rounded-lg p-6 hover:shadow-trophy transition-all duration-300">
                  <Badge className={`${getCategoryColor(relatedArticle.category)} mb-3`}>
                    <span className="mr-1">{getCategoryIcon(relatedArticle.category)}</span>
                    {relatedArticle.category.replace('_', ' ')}
                  </Badge>
                  <h3 className="text-lg font-semibold text-primary-900 mb-2 line-clamp-2">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-primary-600 text-sm mb-3 line-clamp-2">
                    {relatedArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary-500">
                      {formatDate(relatedArticle.publishedAt)}
                    </span>
                    <a 
                      href={`/news/${relatedArticle.slug}`}
                      className="text-accent-600 hover:text-accent-700 text-sm font-medium"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heading level="h2" className="mb-4">
            Stay Updated
          </Heading>
          <Body size="base" className="text-primary-600 mb-6">
            Get more articles like this delivered directly to your inbox.
          </Body>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Button className="w-full sm:w-auto">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
