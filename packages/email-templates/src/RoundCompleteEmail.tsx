import {
  Html, Head, Body, Container, Section,
  Heading, Text, Link, Hr,
} from '@react-email/components';
import { render } from '@react-email/render';

export interface RoundResult {
  board: number;
  homePlayer: string;
  awayPlayer: string;
  result: 'WIN' | 'LOSS' | 'DRAW';
}

export interface StandingRow {
  team: string;
  points: number;
}

export interface RoundCompleteEmailProps {
  roundNumber: number;
  tournamentName: string;
  homeTeam: string;
  awayTeam: string;
  results: RoundResult[];
  standings: StandingRow[];
  nextRound?: { date: string; venue: string };
  matchCenterUrl: string;
}

const baseText: React.CSSProperties = { fontFamily: 'Arial, sans-serif', margin: 0 };
const muted: React.CSSProperties = { ...baseText, color: '#64748b', fontSize: '13px' };

const resultColor: Record<RoundResult['result'], string> = {
  WIN: '#059669',
  LOSS: '#dc2626',
  DRAW: '#6366f1',
};

export function RoundCompleteEmail({
  roundNumber, tournamentName, homeTeam, awayTeam,
  results, standings, nextRound, matchCenterUrl,
}: RoundCompleteEmailProps) {
  const homeRoundScore = results.reduce((s, r) => s + (r.result === 'WIN' ? 1 : r.result === 'DRAW' ? 0.5 : 0), 0);
  const awayRoundScore = results.reduce((s, r) => s + (r.result === 'LOSS' ? 1 : r.result === 'DRAW' ? 0.5 : 0), 0);

  return (
    <Html lang="en">
      <Head />
      <Body style={{ backgroundColor: '#f1f5f9', padding: '32px 0' }}>
        <Container style={{ maxWidth: '560px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden' }}>

          {/* header */}
          <Section style={{ backgroundColor: '#0f172a', padding: '20px 32px' }}>
            <Text style={{ ...baseText, color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Pawn Stars · Round Complete
            </Text>
            <Heading style={{ ...baseText, color: '#ffffff', fontSize: '20px', fontWeight: '700', marginTop: '6px' }}>
              {tournamentName} — Round {roundNumber}
            </Heading>
          </Section>

          <Section style={{ padding: '32px' }}>
            {/* round score */}
            <Section style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', textAlign: 'center', marginBottom: '24px' }}>
              <Text style={{ ...baseText, color: '#64748b', fontSize: '12px', marginBottom: '8px' }}>Round Score</Text>
              <Heading style={{ ...baseText, fontSize: '22px', fontWeight: '700', color: '#0f172a' }}>
                {homeTeam} {homeRoundScore} – {awayRoundScore} {awayTeam}
              </Heading>
            </Section>

            {/* results table */}
            <Heading as="h2" style={{ ...baseText, fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Board Results
            </Heading>
            {results.map((r) => (
              <Section key={r.board} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #f1f5f9', padding: '8px 0' }}>
                <Text style={{ ...baseText, fontSize: '13px', color: '#334155' }}>
                  <span style={{ color: '#94a3b8', marginRight: '8px' }}>Board {r.board}</span>
                  <strong>{r.homePlayer}</strong>
                  <span style={{ color: resultColor[r.result], margin: '0 8px', fontWeight: '700' }}>
                    {r.result === 'WIN' ? '1–0' : r.result === 'LOSS' ? '0–1' : '½–½'}
                  </span>
                  <strong>{r.awayPlayer}</strong>
                </Text>
              </Section>
            ))}

            {/* standings */}
            {standings.length > 0 && (
              <>
                <Heading as="h2" style={{ ...baseText, fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: '24px 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Standings
                </Heading>
                {standings.map((s, i) => (
                  <Section key={s.team} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', padding: '8px 0' }}>
                    <Text style={{ ...baseText, fontSize: '13px', color: '#334155' }}>
                      <span style={{ color: '#94a3b8', marginRight: '8px' }}>{i + 1}.</span>
                      {s.team}
                    </Text>
                    <Text style={{ ...baseText, fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                      {s.points} pts
                    </Text>
                  </Section>
                ))}
              </>
            )}

            {/* next round */}
            {nextRound && (
              <Section style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '14px 16px', marginTop: '24px' }}>
                <Text style={{ ...baseText, fontSize: '13px', fontWeight: '600', color: '#1e40af', marginBottom: '4px' }}>
                  Next Round
                </Text>
                <Text style={muted}>{nextRound.date} · {nextRound.venue}</Text>
              </Section>
            )}

            <Hr style={{ margin: '24px 0', borderColor: '#e2e8f0' }} />

            <Link
              href={matchCenterUrl}
              style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}
            >
              Open match centre →
            </Link>
          </Section>

          <Section style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '16px 32px' }}>
            <Text style={muted}>
              You received this because you are registered with Pawn Stars.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export async function renderRoundCompleteEmail(props: RoundCompleteEmailProps): Promise<string> {
  return render(<RoundCompleteEmail {...props} />);
}
