import {
  Html, Head, Body, Container, Section,
  Heading, Text, Link, Hr,
} from '@react-email/components';
import { render } from '@react-email/render';

export interface MatchResultEmailProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  venue?: string;
  mvp?: { name: string; title: string; reason: string };
  topPerformers?: { name: string; title: string; performance: number }[];
  matchUrl: string;
}

const baseText: React.CSSProperties = { fontFamily: 'Arial, sans-serif', margin: 0 };
const muted: React.CSSProperties = { ...baseText, color: '#64748b', fontSize: '13px' };

export function MatchResultEmail({
  homeTeam, awayTeam, homeScore, awayScore,
  date, venue, mvp, topPerformers = [], matchUrl,
}: MatchResultEmailProps) {
  const winner =
    homeScore > awayScore ? homeTeam
    : awayScore > homeScore ? awayTeam
    : null;

  return (
    <Html lang="en">
      <Head />
      <Body style={{ backgroundColor: '#f1f5f9', padding: '32px 0' }}>
        <Container style={{ maxWidth: '560px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden' }}>

          {/* header bar */}
          <Section style={{ backgroundColor: '#0f172a', padding: '20px 32px' }}>
            <Text style={{ ...baseText, color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Pawn Stars · Match Result
            </Text>
          </Section>

          <Section style={{ padding: '32px' }}>
            {/* scoreline */}
            <Section style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px', textAlign: 'center', marginBottom: '24px' }}>
              <Text style={{ ...baseText, color: '#64748b', fontSize: '12px', marginBottom: '8px' }}>
                {date}{venue ? ` · ${venue}` : ''}
              </Text>
              <Heading style={{ ...baseText, fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px' }}>
                {homeTeam} {homeScore} – {awayScore} {awayTeam}
              </Heading>
              <Text style={{ ...baseText, fontSize: '13px', fontWeight: '600', color: winner ? '#059669' : '#6366f1' }}>
                {winner ? `${winner} wins` : 'Draw'}
              </Text>
            </Section>

            {/* mvp */}
            {mvp && (
              <>
                <Heading as="h2" style={{ ...baseText, fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Player of the Match
                </Heading>
                <Section style={{ border: '1px solid #fde68a', backgroundColor: '#fffbeb', borderRadius: '6px', padding: '14px 16px', marginBottom: '24px' }}>
                  <Text style={{ ...baseText, fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                    {mvp.title} {mvp.name}
                  </Text>
                  <Text style={muted}>{mvp.reason}</Text>
                </Section>
              </>
            )}

            {/* top performers */}
            {topPerformers.length > 0 && (
              <>
                <Heading as="h2" style={{ ...baseText, fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Top Performances
                </Heading>
                {topPerformers.map((p, i) => (
                  <Section key={i} style={{ borderBottom: '1px solid #f1f5f9', padding: '8px 0' }}>
                    <Text style={{ ...baseText, fontSize: '13px', color: '#334155' }}>
                      <strong>{p.title} {p.name}</strong>
                      <span style={{ color: '#64748b' }}> — {p.performance} performance</span>
                    </Text>
                  </Section>
                ))}
              </>
            )}

            <Hr style={{ margin: '24px 0', borderColor: '#e2e8f0' }} />

            <Link
              href={matchUrl}
              style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}
            >
              View full match report →
            </Link>
          </Section>

          {/* footer */}
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

export async function renderMatchResultEmail(props: MatchResultEmailProps): Promise<string> {
  return render(<MatchResultEmail {...props} />);
}
