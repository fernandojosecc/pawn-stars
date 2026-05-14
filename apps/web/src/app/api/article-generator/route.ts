import { NextRequest, NextResponse } from 'next/server';
import type { ArticleGenerationRequest, GeneratedArticle } from '@pawn-stars/shared-types';

interface TournamentData {
  id: string;
  name: string;
  format: string;
  location: string;
  startDate: string;
  endDate: string;
  standings: Array<{ rank: number; playerName: string; title: string; points: number; wins: number; draws: number; losses: number }>;
  roundResults: Array<{ round: number; white: string; black: string; result: string; moves?: number; opening?: string }>;
  mvp: string;
  notableMoments: string[];
}

const TOURNAMENTS: Record<string, TournamentData> = {
  'autumn-blitz-2025': {
    id: 'autumn-blitz-2025',
    name: 'Autumn Blitz 2025',
    format: 'Swiss (9 rounds)',
    location: 'Valencia, Spain',
    startDate: '2025-10-05',
    endDate: '2025-10-07',
    standings: [
      { rank: 1, playerName: 'Magnus Carlsen', title: 'GM', points: 8.0, wins: 8, draws: 0, losses: 1 },
      { rank: 2, playerName: 'Alireza Firouzja', title: 'GM', points: 7.5, wins: 7, draws: 1, losses: 1 },
      { rank: 3, playerName: 'Hikaru Nakamura', title: 'GM', points: 7.0, wins: 7, draws: 0, losses: 2 },
      { rank: 4, playerName: 'Fabiano Caruana', title: 'GM', points: 6.5, wins: 6, draws: 1, losses: 2 },
      { rank: 5, playerName: 'Ian Nepomniachtchi', title: 'GM', points: 6.0, wins: 5, draws: 2, losses: 2 },
    ],
    roundResults: [
      { round: 8, white: 'Magnus Carlsen', black: 'Alireza Firouzja', result: '1-0', moves: 31, opening: 'Ruy Lopez' },
      { round: 9, white: 'Hikaru Nakamura', black: 'Magnus Carlsen', result: '0-1', moves: 44, opening: 'Sicilian Najdorf' },
      { round: 7, white: 'Fabiano Caruana', black: 'Ian Nepomniachtchi', result: '1/2-1/2', moves: 62, opening: "Queen's Gambit Declined" },
    ],
    mvp: 'Magnus Carlsen',
    notableMoments: [
      "Carlsen delivered a flawless endgame conversion against Firouzja in the decisive round 8 encounter",
      "Firouzja's tactical exchange sacrifice in round 5 was a highlight, outplaying three higher-rated opponents consecutively",
      "Nakamura's blitz speed proved critical in several time scrambles, earning five wins in the final two seconds",
      'The event attracted a record 312 spectators for a Pawn Stars blitz event',
    ],
  },
  'winter-classic-2025': {
    id: 'winter-classic-2025',
    name: 'Winter Classic 2025',
    format: 'Swiss (7 rounds)',
    location: 'Madrid, Spain',
    startDate: '2025-12-01',
    endDate: '2025-12-15',
    standings: [
      { rank: 1, playerName: 'Fabiano Caruana', title: 'GM', points: 6.0, wins: 6, draws: 0, losses: 1 },
      { rank: 2, playerName: 'Ding Liren', title: 'GM', points: 5.5, wins: 5, draws: 1, losses: 1 },
      { rank: 3, playerName: 'Ian Nepomniachtchi', title: 'GM', points: 5.0, wins: 5, draws: 0, losses: 2 },
      { rank: 4, playerName: 'Magnus Carlsen', title: 'GM', points: 4.5, wins: 4, draws: 1, losses: 2 },
      { rank: 5, playerName: 'Anish Giri', title: 'GM', points: 4.0, wins: 4, draws: 0, losses: 3 },
    ],
    roundResults: [
      { round: 7, white: 'Fabiano Caruana', black: 'Ding Liren', result: '1-0', moves: 58, opening: 'Nimzo-Indian Defence' },
      { round: 6, white: 'Ding Liren', black: 'Ian Nepomniachtchi', result: '1-0', moves: 41, opening: 'English Opening' },
      { round: 5, white: 'Magnus Carlsen', black: 'Fabiano Caruana', result: '0-1', moves: 72, opening: 'Berlin Defence' },
    ],
    mvp: 'Fabiano Caruana',
    notableMoments: [
      "Caruana's technical precision in the Nimzo-Indian endgame against Ding secured first place in a long 58-move grind",
      "Ding Liren's sharp preparation in the English Opening left Nepomniachtchi stranded with a passive position from move 12",
      "Carlsen's surprising Berlin Defence choice against Caruana backfired in a complex pawn endgame",
      'The event raised €8,400 for the Pawn Stars Junior Development Fund through spectator entry fees',
    ],
  },
};

function buildMockArticle(td: TournamentData): GeneratedArticle {
  const winner = td.standings[0]!;
  const runnerUp = td.standings[1]!;
  const third = td.standings[2]!;
  const keyGame = td.roundResults[0]!;
  const rounds = td.format.match(/\d+/)?.[0] ?? '9';

  const body = `${winner.title} ${winner.playerName} claimed the ${td.name} title with a commanding performance at ${td.location}, finishing on ${winner.points} points from ${rounds} rounds to take clear first place.

The tournament reached its decisive moment in round ${keyGame.round}, when ${keyGame.white} faced ${keyGame.black} in what proved to be the day's most significant encounter. After ${keyGame.moves} moves of ${keyGame.opening ?? 'complex play'}, the game concluded ${keyGame.result}, effectively settling the standings heading into the final round.

${td.notableMoments[0] ?? ''}. ${td.notableMoments[1] ?? ''}.

In the final standings, ${runnerUp.title} ${runnerUp.playerName} secured second on ${runnerUp.points} points, while ${third.title} ${third.playerName} rounded out the podium with ${third.points}. The depth of the field — with all top finishers separated by half a point — underscored the competitive quality that has become a hallmark of Pawn Stars events.

${td.notableMoments[2] ?? ''}. ${td.notableMoments[3] ?? ''}.

With the ${td.name} in the books, attention turns to the next fixture on the Pawn Stars calendar. ${winner.title} ${winner.playerName} will enter that event as the form player to beat, though a tightly contested field guarantees nothing. One certainty: the organisation continues to raise the standard of competitive chess in Spain and beyond.`;

  return {
    tournamentId: td.id,
    headline: `${winner.title} ${winner.playerName} Captures ${td.name} Title in ${td.location}`,
    body,
    suggestedTags: [td.name, winner.playerName, runnerUp.playerName, 'Match Reports', td.location.split(',')[0] ?? td.location],
    category: 'MATCH_REPORTS',
    generatedAt: new Date().toISOString(),
  };
}

const SYSTEM_PROMPT = `You are a professional chess journalist writing for Pawn Stars, a competitive chess organisation.
Write post-tournament articles in a clear, authoritative, and engaging style — similar to high-quality sports journalism.

Structure every article as follows:
1. A compelling headline (title case, 8–14 words)
2. A strong lead paragraph (2–3 sentences covering who, what, where, result)
3. Body paragraphs covering: the decisive moment/key game, top performers, notable tactical or strategic highlights, atmosphere or crowd notes if available
4. A closing outlook paragraph looking ahead to the next event

Length: 400–600 words for the body text (excluding headline).
Tone: professional, knowledgeable, enthusiastic but not hyperbolic.
Assume the reader is a chess enthusiast who understands basic terminology.

Return your response as a single JSON object with exactly these fields:
{
  "headline": "string",
  "body": "string (the full article body, paragraphs separated by \\n\\n)",
  "suggestedTags": ["string", ...],
  "category": "MATCH_REPORTS"
}`;

export async function POST(req: NextRequest) {
  let body: ArticleGenerationRequest;
  try {
    body = (await req.json()) as ArticleGenerationRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const td = TOURNAMENTS[body.tournamentId];
  if (!td) {
    return NextResponse.json({ error: `Tournament not found: ${body.tournamentId}` }, { status: 400 });
  }

  const apiKey = process.env['ANTHROPIC_API_KEY'];
  if (!apiKey) {
    const article = buildMockArticle(td);
    return NextResponse.json({ ...article, _source: 'mock' });
  }

  const standingsText = td.standings
    .map((s) => `${s.rank}. ${s.title} ${s.playerName} — ${s.points} pts (${s.wins}W/${s.draws}D/${s.losses}L)`)
    .join('\n');
  const resultsText = td.roundResults
    .map((r) => `Round ${r.round}: ${r.white} vs ${r.black} — ${r.result}${r.moves ? ` (${r.moves} moves)` : ''}${r.opening ? `, ${r.opening}` : ''}`)
    .join('\n');

  const userContent = `Tournament: ${td.name}
Format: ${td.format}
Location: ${td.location}
Dates: ${td.startDate} to ${td.endDate}

FINAL STANDINGS (top 5):
${standingsText}

NOTABLE GAMES:
${resultsText}

TOURNAMENT MVP: ${td.mvp}

NOTABLE MOMENTS:
${td.notableMoments.map((m, i) => `${i + 1}. ${m}`).join('\n')}
${body.extraContext ? `\nADDITIONAL CONTEXT FROM EDITOR:\n${body.extraContext}` : ''}

Please generate the post-tournament article now. Return ONLY valid JSON, no markdown fences.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userContent }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: `Claude API error: ${err}` }, { status: 502 });
    }

    const data = (await response.json()) as {
      content: Array<{ type: string; text: string }>;
      usage: { input_tokens: number; output_tokens: number };
    };

    const rawText = data.content[0]?.type === 'text' ? data.content[0].text : '';
    let parsed: { headline: string; body: string; suggestedTags: string[]; category: string };

    try {
      parsed = JSON.parse(rawText) as typeof parsed;
    } catch {
      const match = rawText.match(/```(?:json)?\s*([\s\S]+?)\s*```/);
      if (match?.[1]) {
        parsed = JSON.parse(match[1]) as typeof parsed;
      } else {
        return NextResponse.json({ error: 'Could not parse Claude response as JSON' }, { status: 502 });
      }
    }

    const article: GeneratedArticle = {
      tournamentId: td.id,
      headline: parsed.headline,
      body: parsed.body,
      suggestedTags: parsed.suggestedTags,
      category: 'MATCH_REPORTS',
      generatedAt: new Date().toISOString(),
      tokenUsage: { inputTokens: data.usage.input_tokens, outputTokens: data.usage.output_tokens },
    };

    return NextResponse.json(article);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
