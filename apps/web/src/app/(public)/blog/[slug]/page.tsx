import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { BlogPost } from '@pawn-stars/shared-types'
import { BlogCategory } from '@pawn-stars/shared-types'
import { BlockRenderer } from '@/components/blog/BlockRenderer'
import { Heading } from '@/components/typography/Heading'
import { blogArticleSchema } from '@/lib/structured-data'

// Mock data — replace with API call when backend is connected
const MOCK_POSTS: BlogPost[] = [
  {
    id: 'blog-001', slug: 'opening-theory-ruy-lopez',
    title: 'Opening Theory Deep Dive: The Ruy Lopez Explained',
    excerpt: 'The Ruy Lopez is one of the oldest and most deeply analysed openings in chess. We break down the key ideas, tabiya positions, and why every 1.e4 player needs to understand it.',
    category: BlogCategory.ANALYSIS, author: 'GM Analysis Team', authorTitle: 'Grandmaster Panel',
    publishedAt: new Date('2024-01-20'), updatedAt: new Date('2024-01-22'),
    coverImage: '/blog/ruy-lopez-cover.jpg', readTime: 12, tags: ['openings', 'ruy lopez', 'theory', 'e4'],
    blocks: [
      { type: 'text', html: '<p>The Ruy Lopez — also known as the Spanish Opening — begins after 1.e4 e5 2.Nf3 Nc6 3.Bb5. It is one of the most studied openings in chess history, with theory that stretches back over four hundred years. At its core, White attacks the knight that defends the e5-pawn, aiming to establish long-term central control.</p><p>Despite its age, the Ruy Lopez remains the weapon of choice for the world\'s best players. Magnus Carlsen, Fabiano Caruana, and Daniil Dubov have all used it as a primary weapon in recent World Championship cycles.</p>' },
      { type: 'embed', url: 'https://lichess.org/embed/game/q7zvsd8y?theme=auto&bg=auto', title: 'Carlsen vs Caruana — Ruy Lopez, Berlin Defence (Tata Steel 2022)', aspectRatio: '4:3', provider: 'lichess' },
      { type: 'stat', value: '67%', label: 'Score for White in the Ruy Lopez', context: 'Across 2 million+ master-level games in the Lichess database (2000+ Elo).' },
      { type: 'quote', text: 'The Ruy Lopez demands patience. You are not trying to win in twenty moves — you are building a position that will give you micro-advantages for the entire game.', author: 'Magnus Carlsen', authorTitle: 'Five-time World Chess Champion' },
      { type: 'text', html: '<h3>The Berlin Defence</h3><p>The Berlin (3...Nf6) has become the ultimate drawing weapon at the top level. After 4.0-0 Nxe4 5.d4 Nd6 6.Bxc6 dxc6 7.dxe5 Nf5 8.Qxd8+ Kxd8, Black enters a slightly worse endgame that is extraordinarily hard to lose.</p><h3>The Closed Ruy Lopez</h3><p>The main line remains the Closed Ruy Lopez: 3...a6 4.Ba4 Nf6 5.0-0 Be7 6.Re1 b5 7.Bb3 d6 8.c3 0-0. White builds slowly with d4, and the pawn structures that arise are rich with strategic depth.</p>' },
    ],
  },
  {
    id: 'blog-002', slug: 'sinquefield-cup-2024-report',
    title: 'Sinquefield Cup 2024: Round-by-Round Report',
    excerpt: 'Carlsen dominates the early rounds with a ruthless display of technique. Full report from the Saint Louis Chess Club with game annotations and standings after each round.',
    category: BlogCategory.MATCH_REPORTS, author: 'Tournament Desk',
    publishedAt: new Date('2024-08-25'), coverImage: '/blog/sinquefield-2024-cover.jpg',
    readTime: 8, tags: ['sinquefield cup', 'carlsen', '2024', 'grand chess tour'],
    blocks: [
      { type: 'text', html: '<p>The Sinquefield Cup opened its doors once again at the Saint Louis Chess Club, welcoming a field of ten of the world\'s best players. After two completed rounds, Magnus Carlsen has seized the lead with an unbeaten score of 2/2, defeating Alireza Firouzja with an instructive positional squeeze in Round 2.</p>' },
      { type: 'stat', value: '2850', label: "Carlsen's performance rating after Round 2", context: 'The highest performance rating in the event so far, against a 2785 average opponent.' },
      { type: 'embed', url: 'https://www.youtube.com/embed/PNobHlEFJDk', title: 'Sinquefield Cup 2024 — Round 2 Highlights', aspectRatio: '16:9', provider: 'youtube' },
      { type: 'text', html: '<h3>Round 1</h3><p>Carlsen and Nakamura drew a tense Ruy Lopez after 42 moves. Caruana scored the first decisive result of the tournament, defeating Firouzja with a clean knight sacrifice in the middlegame.</p><h3>Round 2</h3><p>Carlsen struck with White against Firouzja, opting for a quiet English Opening that gradually suffocated Black\'s position. By move 35, Firouzja\'s pieces were completely passive and he resigned.</p>' },
    ],
  },
  {
    id: 'blog-003', slug: 'carlsen-interview-chess-ai',
    title: 'Interview: Magnus Carlsen on the Future of Chess AI',
    excerpt: 'We sat down with Magnus Carlsen to discuss how AI engines have changed elite preparation, whether AlphaZero revealed new chess ideas, and what a world without opening theory would look like.',
    category: BlogCategory.INTERVIEWS, author: 'Pawn Stars Media', authorTitle: 'Editorial',
    publishedAt: new Date('2024-02-15'), coverImage: '/blog/carlsen-ai-interview-cover.jpg',
    readTime: 10, tags: ['magnus carlsen', 'chess ai', 'engines', 'interview'],
    blocks: [
      { type: 'text', html: '<p>Magnus Carlsen needs no introduction. We caught up with him at the Tata Steel tournament to discuss how engines have changed the game he loves.</p>' },
      { type: 'quote', text: 'AI has transformed how we prepare — and not always for the better. Opening theory has become so deep that some lines are essentially solved.', author: 'Magnus Carlsen', authorTitle: 'World No. 1' },
      { type: 'text', html: '<p><strong>Pawn Stars:</strong> How much of your preparation is engine-driven now compared to ten years ago?</p><p><strong>Carlsen:</strong> Almost all of it at the opening stage. You simply cannot compete without it. But I try to understand the positions rather than just memorise lines — that is still where human intuition has an edge.</p><p><strong>Pawn Stars:</strong> AlphaZero played some remarkable moves that engines trained on human games would never find. Did it change how you think about chess?</p><p><strong>Carlsen:</strong> Absolutely. AlphaZero showed us that many positions we considered roughly equal are actually subtly better for one side.</p>' },
      { type: 'quote', text: 'Chess is still beautiful. The engines show us what is correct, but the art is in understanding why it is correct — and that is still a human endeavour.', author: 'Magnus Carlsen', authorTitle: 'World No. 1' },
      { type: 'text', html: '<p>The conversation turned to Fischer Random chess, which Carlsen has championed as an antidote to over-preparation. "In Chess960, you cannot memorise twenty moves of theory. You have to play chess from move one. That is the purest test of skill we have."</p>' },
    ],
  },
  {
    id: 'blog-004', slug: 'road-to-2800-elite-analysis',
    title: 'The Road to 2800: What Separates Elite from Super-Elite',
    excerpt: 'Only fourteen players have ever crossed 2800 in classical chess. We analyse what separates the very best from the merely excellent.',
    category: BlogCategory.EDITORIAL, author: 'Chief Editor', authorTitle: 'Editor-in-Chief',
    publishedAt: new Date('2024-03-10'), coverImage: '/blog/road-to-2800-cover.jpg',
    readTime: 15, tags: ['ratings', 'elite chess', 'elo', 'analysis', '2800'],
    blocks: [
      { type: 'text', html: '<p>The number 2800 carries a mythical weight in chess. It marks a threshold beyond which errors become vanishingly rare, preparation is flawless, and the margin between winning and drawing shrinks to almost nothing.</p>' },
      { type: 'stat', value: '2830', label: "Carlsen's peak classical rating", context: 'Set in May 2014 — still the all-time record in classical chess.' },
      { type: 'stat', value: '14', label: 'Players who have ever crossed 2800', context: 'Since FIDE began publishing live ratings in 2012.' },
      { type: 'gallery', columns: 3, images: [
        { src: '/blog/gallery/kasparov-peak.jpg', alt: 'Garry Kasparov at peak rating', caption: 'Kasparov — peak 2851 (pre-live era)' },
        { src: '/blog/gallery/carlsen-peak.jpg',  alt: 'Magnus Carlsen 2830 chart',    caption: 'Carlsen — all-time live record 2830' },
        { src: '/blog/gallery/caruana-peak.jpg',  alt: 'Fabiano Caruana 2844',         caption: 'Caruana — peak 2844 (Sep 2014)' },
      ]},
      { type: 'quote', text: 'Beyond 2750, every rating point requires something extra — an almost irrational self-belief that you can outplay anyone, anywhere, in any position.', author: 'Garry Kasparov', authorTitle: 'Former World Champion' },
      { type: 'text', html: '<h3>What the numbers reveal</h3><p>A player rated 2800 is expected to score roughly 64% against a 2700-rated opponent in a long match. The most telling statistic is not peak rating but sustained time above 2800. Carlsen spent over a decade in that rarefied zone. No one else has come close.</p>' },
    ],
  },
  {
    id: 'blog-005', slug: 'pawn-stars-season-2023-24-review',
    title: 'Pawn Stars 2023–24 Season Review',
    excerpt: "Four tournaments. Thirty-nine games. Eighteen wins. We look back on the most successful season in the club's history.",
    category: BlogCategory.TEAM_NEWS, author: 'Team Management',
    publishedAt: new Date('2024-09-01'), coverImage: '/blog/season-review-2023-24-cover.jpg',
    readTime: 7, tags: ['season review', 'pawn stars', '2023-24', 'results'],
    blocks: [
      { type: 'text', html: '<p>When the final round of the World Chess Championship 2023 concluded in Dubai, the Pawn Stars squad had achieved something remarkable: two first-place finishes, a second, and a third across four major tournaments.</p>' },
      { type: 'stat', value: '18W 16D 5L', label: 'Season record — 4 tournaments', context: "A win rate of 46% — the best in the club's three-year competitive history." },
      { type: 'gallery', columns: 2, images: [
        { src: '/blog/gallery/candidates-trophy.jpg', alt: 'Candidates 2023 trophy ceremony', caption: 'Candidates 2023 — first major title' },
        { src: '/blog/gallery/wcc-2023-match.jpg',    alt: 'World Chess Championship 2023',   caption: 'WCC 2023 — decisive game 14' },
        { src: '/blog/gallery/sinquefield-board.jpg', alt: 'Sinquefield Cup board view',       caption: 'Sinquefield Cup — Carlsen in play' },
        { src: '/blog/gallery/squad-season-end.jpg',  alt: 'Squad photo at season close',      caption: 'Full squad — end of season gathering' },
      ]},
      { type: 'text', html: '<h3>Player Spotlights</h3><p><strong>Magnus Carlsen</strong> led all performers with an average performance rating of 2848 across 39 games. <strong>Fabiano Caruana</strong> delivered his best season in Pawn Stars colours. <strong>Hikaru Nakamura</strong> was the engine room — consistent and reliable throughout.</p>' },
      { type: 'quote', text: 'This was our most complete season. Every player contributed when it mattered. That collective consistency is what made the difference.', author: 'Head Coach', authorTitle: 'Pawn Stars Coaching Staff' },
    ],
  },
]

const CATEGORY_LABELS: Record<BlogCategory, string> = {
  [BlogCategory.ANALYSIS]:      'Analysis',
  [BlogCategory.MATCH_REPORTS]: 'Match Reports',
  [BlogCategory.INTERVIEWS]:    'Interviews',
  [BlogCategory.EDITORIAL]:     'Editorial',
  [BlogCategory.TEAM_NEWS]:     'Team News',
}

export function generateStaticParams() {
  return MOCK_POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const post = MOCK_POSTS.find(p => p.slug === slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `https://pawnstars.com/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} — Pawn Stars Blog`,
      description: post.excerpt,
      type: 'article',
      url: `https://pawnstars.com/blog/${post.slug}`,
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: [post.author],
      tags: post.tags,
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
        : [{ url: '/og-image.jpg', width: 1200, height: 630, alt: post.title }],
    },
  }
}

function fmt(d: Date) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogDetailPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const post = MOCK_POSTS.find(p => p.slug === slug)
  if (!post) notFound()

  const ldJson = blogArticleSchema(post)

  return (
    <div className="min-h-screen bg-primary-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />

      {/* ── cover ── */}
      {post.coverImage && (
        <div className="relative h-56 sm:h-72 bg-primary-900 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover opacity-60"
          />
        </div>
      )}

      {/* ── article ── */}
      <article className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-primary-400 hover:text-primary-700 text-sm mb-8 transition-colors"
        >
          ← Back to blog
        </Link>

        {/* category */}
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-600 mb-3">
          {CATEGORY_LABELS[post.category]}
        </p>

        {/* title */}
        <Heading level="h1" className="mb-4 leading-tight">
          {post.title}
        </Heading>

        {/* meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-primary-500 mb-8 pb-6 border-b border-primary-200">
          <span>
            <span className="font-medium text-primary-700">{post.author}</span>
            {post.authorTitle && <span className="text-primary-400 ml-1">— {post.authorTitle}</span>}
          </span>
          <time dateTime={post.publishedAt.toISOString()}>{fmt(post.publishedAt)}</time>
          <span>{post.readTime} min read</span>
        </div>

        {/* blocks */}
        <BlockRenderer blocks={post.blocks} />

        {/* tags */}
        {post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-primary-200">
            <p className="text-xs text-primary-400 mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 bg-primary-100 text-primary-600 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* back */}
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium"
          >
            ← Back to all posts
          </Link>
        </div>
      </article>
    </div>
  )
}
