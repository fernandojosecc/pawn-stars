import {
  Html, Head, Body, Container, Section,
  Heading, Text, Link, Hr, Row, Column,
} from '@react-email/components';
import { render } from '@react-email/render';

export interface NewsletterEmailProps {
  subject: string;
  previewText?: string;
  bodyParagraphs: string[];  // each entry becomes one <p>
  ctaLabel?: string;
  ctaUrl?: string;
  unsubscribeUrl: string;
  issueLabel?: string;       // e.g. "May 2026 · Issue #12"
}

const base: React.CSSProperties = { fontFamily: 'Georgia, serif', margin: 0 };
const sans: React.CSSProperties = { fontFamily: 'Arial, sans-serif', margin: 0 };
const muted: React.CSSProperties = { ...sans, color: '#64748b', fontSize: '12px' };

export function NewsletterEmail({
  subject,
  previewText,
  bodyParagraphs,
  ctaLabel,
  ctaUrl,
  unsubscribeUrl,
  issueLabel,
}: NewsletterEmailProps) {
  return (
    <Html lang="en">
      <Head>
        {previewText && (
          <Text style={{ display: 'none', maxHeight: '0', overflow: 'hidden', color: 'transparent' }}>
            {previewText}
          </Text>
        )}
      </Head>
      <Body style={{ backgroundColor: '#f1f5f9', padding: '32px 0' }}>
        <Container style={{ maxWidth: '580px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden' }}>

          {/* ── Header ─────────────────────────────────────────────────── */}
          <Section style={{ backgroundColor: '#0f172a', padding: '24px 32px' }}>
            <Row>
              <Column>
                <Text style={{ ...sans, color: '#f59e0b', fontSize: '18px', fontWeight: '700', letterSpacing: '-0.3px' }}>
                  ♟ Pawn Stars
                </Text>
                {issueLabel && (
                  <Text style={{ ...sans, color: '#94a3b8', fontSize: '11px', marginTop: '2px' }}>
                    {issueLabel}
                  </Text>
                )}
              </Column>
            </Row>
          </Section>

          {/* ── Headline ───────────────────────────────────────────────── */}
          <Section style={{ padding: '32px 32px 0' }}>
            <Heading
              as="h1"
              style={{ ...base, fontSize: '24px', fontWeight: '700', color: '#0f172a', lineHeight: '1.3', marginBottom: '24px' }}
            >
              {subject}
            </Heading>
          </Section>

          {/* ── Body paragraphs ────────────────────────────────────────── */}
          <Section style={{ padding: '0 32px' }}>
            {bodyParagraphs.map((para, i) => (
              <Text
                key={i}
                style={{ ...base, fontSize: '15px', color: '#334155', lineHeight: '1.7', marginBottom: '16px' }}
              >
                {para}
              </Text>
            ))}
          </Section>

          {/* ── CTA button ─────────────────────────────────────────────── */}
          {ctaLabel && ctaUrl && (
            <Section style={{ padding: '8px 32px 32px' }}>
              <Link
                href={ctaUrl}
                style={{
                  display: 'inline-block',
                  backgroundColor: '#f59e0b',
                  color: '#0f172a',
                  padding: '12px 28px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '700',
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                {ctaLabel} →
              </Link>
            </Section>
          )}

          {/* ── Divider ────────────────────────────────────────────────── */}
          <Section style={{ padding: '0 32px' }}>
            <Hr style={{ borderColor: '#e2e8f0', margin: '8px 0' }} />
          </Section>

          {/* ── Social links ───────────────────────────────────────────── */}
          <Section style={{ padding: '16px 32px' }}>
            <Text style={{ ...sans, color: '#94a3b8', fontSize: '12px', marginBottom: '8px' }}>
              Follow us
            </Text>
            <Row>
              {(['Twitter', 'Instagram', 'YouTube'] as const).map((platform) => (
                <Column key={platform} style={{ paddingRight: '12px' }}>
                  <Text style={{ ...sans, fontSize: '12px', color: '#475569' }}>{platform}</Text>
                </Column>
              ))}
            </Row>
          </Section>

          {/* ── Footer ─────────────────────────────────────────────────── */}
          <Section style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '16px 32px' }}>
            <Text style={muted}>
              You are receiving this because you subscribed to the Pawn Stars newsletter.
            </Text>
            <Text style={{ ...muted, marginTop: '6px' }}>
              <Link href={unsubscribeUrl} style={{ color: '#94a3b8', textDecoration: 'underline' }}>
                Unsubscribe
              </Link>
              {' · '}
              <Link href="https://pawnstars.chess" style={{ color: '#94a3b8', textDecoration: 'underline' }}>
                pawnstars.chess
              </Link>
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

export async function renderNewsletterEmail(props: NewsletterEmailProps): Promise<string> {
  return render(<NewsletterEmail {...props} />);
}
