import { Injectable, NotFoundException } from '@nestjs/common';
import type { BlogPost, BlogListResponse } from '@pawn-stars/shared-types';
import { BlogCategory } from '@pawn-stars/shared-types';
import type { BlogQueryDto } from './dto/blog.dto';

const MOCK_POSTS: BlogPost[] = [
  // ── Post 1 ───────────────────────────────────────────────────────────────
  {
    id: 'blog-001',
    slug: 'opening-theory-ruy-lopez',
    title: 'Opening Theory Deep Dive: The Ruy Lopez Explained',
    excerpt:
      'The Ruy Lopez is one of the oldest and most deeply analysed openings in chess. We break down the key ideas, tabiya positions, and why every 1.e4 player needs to understand it.',
    category: BlogCategory.ANALYSIS,
    author: 'GM Analysis Team',
    authorTitle: 'Grandmaster Panel',
    publishedAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-22'),
    coverImage: '/blog/ruy-lopez-cover.jpg',
    readTime: 12,
    tags: ['openings', 'ruy lopez', 'theory', 'e4'],
    blocks: [
      {
        type: 'text',
        html: '<p>The Ruy Lopez — also known as the Spanish Opening — begins after 1.e4 e5 2.Nf3 Nc6 3.Bb5. It is one of the most studied openings in chess history, with theory that stretches back over four hundred years. At its core, White attacks the knight that defends the e5-pawn, aiming to establish long-term central control.</p><p>Despite its age, the Ruy Lopez remains the weapon of choice for the world\'s best players. Magnus Carlsen, Fabiano Caruana, and Daniil Dubov have all used it as a primary weapon in recent World Championship cycles.</p>',
      },
      {
        type: 'embed',
        url: 'https://lichess.org/embed/game/q7zvsd8y?theme=auto&bg=auto',
        title: 'Carlsen vs Caruana — Ruy Lopez, Berlin Defence (Tata Steel 2022)',
        aspectRatio: '4:3',
        provider: 'lichess',
      },
      {
        type: 'stat',
        value: '67%',
        label: 'Score for White in the Ruy Lopez',
        context: 'Across 2 million+ master-level games in the Lichess database (2000+ Elo).',
      },
      {
        type: 'quote',
        text: 'The Ruy Lopez demands patience. You are not trying to win in twenty moves — you are building a position that will give you micro-advantages for the entire game.',
        author: 'Magnus Carlsen',
        authorTitle: 'Five-time World Chess Champion',
      },
      {
        type: 'text',
        html: '<h3>The Berlin Defence</h3><p>The Berlin (3...Nf6) has become the ultimate drawing weapon at the top level. After 4.0-0 Nxe4 5.d4 Nd6 6.Bxc6 dxc6 7.dxe5 Nf5 8.Qxd8+ Kxd8, Black enters a slightly worse endgame that is extraordinarily hard to lose.</p><h3>The Closed Ruy Lopez</h3><p>The main line remains the Closed Ruy Lopez: 3...a6 4.Ba4 Nf6 5.0-0 Be7 6.Re1 b5 7.Bb3 d6 8.c3 0-0. White builds slowly with d4, and the pawn structures that arise are rich with strategic depth. This is where the real battles happen.</p>',
      },
    ],
  },

  // ── Post 2 ───────────────────────────────────────────────────────────────
  {
    id: 'blog-002',
    slug: 'sinquefield-cup-2024-report',
    title: 'Sinquefield Cup 2024: Round-by-Round Report',
    excerpt:
      'Carlsen dominates the early rounds with a ruthless display of technique. Full report from the Saint Louis Chess Club with game annotations and standings after each round.',
    category: BlogCategory.MATCH_REPORTS,
    author: 'Tournament Desk',
    publishedAt: new Date('2024-08-25'),
    coverImage: '/blog/sinquefield-2024-cover.jpg',
    readTime: 8,
    tags: ['sinquefield cup', 'carlsen', '2024', 'grand chess tour'],
    blocks: [
      {
        type: 'text',
        html: '<p>The Sinquefield Cup opened its doors once again at the Saint Louis Chess Club, welcoming a field of ten of the world\'s best players. After two completed rounds, Magnus Carlsen has seized the lead with an unbeaten score of 2/2, defeating Alireza Firouzja with an instructive positional squeeze in Round 2.</p>',
      },
      {
        type: 'stat',
        value: '2850',
        label: "Carlsen's performance rating after Round 2",
        context: 'The highest performance rating in the event so far, against a 2785 average opponent.',
      },
      {
        type: 'embed',
        url: 'https://www.youtube.com/embed/PNobHlEFJDk',
        title: 'Sinquefield Cup 2024 — Round 2 Highlights',
        aspectRatio: '16:9',
        provider: 'youtube',
      },
      {
        type: 'text',
        html: '<h3>Round 1</h3><p>Carlsen and Nakamura drew a tense Ruy Lopez after 42 moves. The game was level throughout but both players probed for weaknesses in a complex rook endgame. Caruana scored the first decisive result of the tournament, defeating Firouzja with a clean knight sacrifice in the middlegame.</p><h3>Round 2</h3><p>Carlsen struck with White against Firouzja, opting for a quiet English Opening that gradually suffocated Black\'s position. By move 35, Firouzja\'s pieces were completely passive and he resigned rather than suffer a slow endgame defeat. Pragg continued his strong form with a win against Abdusattorov from a Nimzo-Indian.</p>',
      },
    ],
  },

  // ── Post 3 ───────────────────────────────────────────────────────────────
  {
    id: 'blog-003',
    slug: 'carlsen-interview-chess-ai',
    title: 'Interview: Magnus Carlsen on the Future of Chess AI',
    excerpt:
      'We sat down with Magnus Carlsen to discuss how AI engines have changed elite preparation, whether AlphaZero revealed new chess ideas, and what a world without opening theory would look like.',
    category: BlogCategory.INTERVIEWS,
    author: 'Pawn Stars Media',
    authorTitle: 'Editorial',
    publishedAt: new Date('2024-02-15'),
    coverImage: '/blog/carlsen-ai-interview-cover.jpg',
    readTime: 10,
    tags: ['magnus carlsen', 'chess ai', 'engines', 'interview'],
    blocks: [
      {
        type: 'text',
        html: '<p>Magnus Carlsen needs no introduction. The Norwegian superstar has dominated chess for over a decade and has watched the role of artificial intelligence shift from curiosity to indispensable tool. We caught up with him at the Tata Steel tournament to discuss how engines have changed the game he loves.</p>',
      },
      {
        type: 'quote',
        text: 'AI has transformed how we prepare — and not always for the better. Opening theory has become so deep that some lines are essentially solved. That can make the games more predictable at the top level.',
        author: 'Magnus Carlsen',
        authorTitle: 'World No. 1',
      },
      {
        type: 'text',
        html: '<p><strong>Pawn Stars:</strong> How much of your preparation is engine-driven now compared to ten years ago?</p><p><strong>Carlsen:</strong> Almost all of it at the opening stage. You simply cannot compete without it. But I try to understand the positions rather than just memorise lines — that is still where human intuition has an edge.</p><p><strong>Pawn Stars:</strong> AlphaZero played some remarkable moves that engines trained on human games would never find. Did it change how you think about chess?</p><p><strong>Carlsen:</strong> Absolutely. AlphaZero showed us that many positions we considered roughly equal are actually subtly better for one side. The rook-pawn ideas in particular — sacrificing a bishop for long-term initiative — were eye-opening.</p>',
      },
      {
        type: 'quote',
        text: 'Chess is still beautiful. The engines show us what is correct, but the art is in understanding why it is correct — and that is still a human endeavour.',
        author: 'Magnus Carlsen',
        authorTitle: 'World No. 1',
      },
      {
        type: 'text',
        html: '<p>The conversation turned to Fischer Random chess, which Carlsen has championed as an antidote to over-preparation. "In Chess960, you cannot memorise twenty moves of theory. You have to play chess from move one. That is the purest test of skill we have." Whether classical chess follows that path remains to be seen — but few are better placed to shape its future than the man sitting across from us.</p>',
      },
    ],
  },

  // ── Post 4 ───────────────────────────────────────────────────────────────
  {
    id: 'blog-004',
    slug: 'road-to-2800-elite-analysis',
    title: 'The Road to 2800: What Separates Elite from Super-Elite',
    excerpt:
      'Only fourteen players have ever crossed 2800 in classical chess. We analyse what separates the very best from the merely excellent — and whether the rating ceiling is a ceiling at all.',
    category: BlogCategory.EDITORIAL,
    author: 'Chief Editor',
    authorTitle: 'Editor-in-Chief',
    publishedAt: new Date('2024-03-10'),
    coverImage: '/blog/road-to-2800-cover.jpg',
    readTime: 15,
    tags: ['ratings', 'elite chess', 'elo', 'analysis', '2800'],
    blocks: [
      {
        type: 'text',
        html: '<p>The number 2800 carries a mythical weight in chess. It is not simply a round number — it marks a threshold beyond which errors become vanishingly rare, preparation is flawless, and the margin between winning and drawing shrinks to almost nothing. Reaching it requires not just talent but a sustained, multi-year campaign of near-perfect play.</p>',
      },
      {
        type: 'stat',
        value: '2830',
        label: "Carlsen's peak classical rating",
        context: 'Set in May 2014 — still the all-time record in classical chess.',
      },
      {
        type: 'stat',
        value: '14',
        label: 'Players who have ever crossed 2800',
        context: 'Since FIDE began publishing live ratings in 2012.',
      },
      {
        type: 'gallery',
        columns: 3,
        images: [
          { src: '/blog/gallery/kasparov-peak.jpg', alt: 'Garry Kasparov at peak rating', caption: 'Kasparov — peak 2851 (pre-live era)' },
          { src: '/blog/gallery/carlsen-peak.jpg',  alt: 'Magnus Carlsen 2830 chart',      caption: 'Carlsen — all-time live record 2830' },
          { src: '/blog/gallery/caruana-peak.jpg',  alt: 'Fabiano Caruana 2844',           caption: 'Caruana — peak 2844 (Sep 2014)' },
        ],
      },
      {
        type: 'quote',
        text: 'Beyond 2750, every rating point requires something extra — an almost irrational self-belief that you can outplay anyone, anywhere, in any position.',
        author: 'Garry Kasparov',
        authorTitle: 'Former World Champion',
      },
      {
        type: 'text',
        html: '<h3>What the numbers reveal</h3><p>A player rated 2800 is expected to score roughly 64% against a 2700-rated opponent in a long match. But that 100-point gap is asymmetrical: it is far easier to fall from 2800 to 2750 than to climb from 2750 to 2800. The mathematics of Elo mean that a single catastrophic tournament can wipe out months of incremental gains.</p><p>The most telling statistic is not peak rating but sustained time above 2800. Carlsen spent over a decade in that rarefied zone. No one else has come close.</p>',
      },
    ],
  },

  // ── Post 5 ───────────────────────────────────────────────────────────────
  {
    id: 'blog-005',
    slug: 'pawn-stars-season-2023-24-review',
    title: 'Pawn Stars 2023–24 Season Review',
    excerpt:
      'Four tournaments. Thirty-nine games. Eighteen wins. We look back on the most successful season in the club\'s history — the highlights, the turning points, and what it means for 2024–25.',
    category: BlogCategory.TEAM_NEWS,
    author: 'Team Management',
    publishedAt: new Date('2024-09-01'),
    coverImage: '/blog/season-review-2023-24-cover.jpg',
    readTime: 7,
    tags: ['season review', 'pawn stars', '2023-24', 'results'],
    blocks: [
      {
        type: 'text',
        html: '<p>When the final round of the World Chess Championship 2023 concluded in Dubai, the Pawn Stars squad had achieved something remarkable: two first-place finishes, a second, and a third across four major tournaments — our best collective season by every metric that matters.</p>',
      },
      {
        type: 'stat',
        value: '18W 16D 5L',
        label: 'Season record — 4 tournaments',
        context: 'A win rate of 46% — the best in the club\'s three-year competitive history.',
      },
      {
        type: 'gallery',
        columns: 2,
        images: [
          { src: '/blog/gallery/candidates-trophy.jpg',   alt: 'Candidates 2023 trophy ceremony',    caption: 'Candidates 2023 — first major title' },
          { src: '/blog/gallery/wcc-2023-match.jpg',      alt: 'World Chess Championship 2023',       caption: 'WCC 2023 — decisive game 14' },
          { src: '/blog/gallery/sinquefield-board.jpg',   alt: 'Sinquefield Cup board view',          caption: 'Sinquefield Cup — Carlsen in play' },
          { src: '/blog/gallery/squad-season-end.jpg',    alt: 'Squad photo at season close',         caption: 'Full squad — end of season gathering' },
        ],
      },
      {
        type: 'text',
        html: '<h3>Player Spotlights</h3><p><strong>Magnus Carlsen</strong> led all performers with an average performance rating of 2848 across 39 games. His form was most telling in the World Chess Championship, where he won three classical games without a loss — a feat that underlined why he remains the standard by which all others are measured.</p><p><strong>Fabiano Caruana</strong> delivered his best season in Pawn Stars colours, contributing two decisive victories at the Candidates that proved crucial to the final standings. His opening preparation in particular reached new heights.</p><p><strong>Hikaru Nakamura</strong> was the engine room — never flashy, always reliable. His draw rate of 49% reflects how well he neutralised the field\'s most dangerous opponents to protect the team\'s aggregate score.</p>',
      },
      {
        type: 'quote',
        text: 'This was our most complete season. Every player contributed when it mattered. That collective consistency — not any single brilliant game — is what made the difference.',
        author: 'Head Coach',
        authorTitle: 'Pawn Stars Coaching Staff',
      },
    ],
  },
];

@Injectable()
export class BlogService {
  findAll(query: BlogQueryDto): BlogListResponse {
    let posts = MOCK_POSTS.map(({ blocks, ...card }) => card);

    if (query.category) {
      posts = posts.filter(p => p.category === query.category);
    }

    posts = [...posts].sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
    );

    const page  = query.page  ?? 1;
    const limit = query.limit ?? 10;
    const total = posts.length;
    const start = (page - 1) * limit;

    return {
      posts: posts.slice(start, start + limit),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  findBySlug(slug: string): BlogPost {
    const post = MOCK_POSTS.find(p => p.slug === slug);
    if (!post) throw new NotFoundException(`Blog post '${slug}' not found`);
    return post;
  }
}
