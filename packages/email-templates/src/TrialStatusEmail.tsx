import {
  Html, Head, Body, Container, Section,
  Heading, Text, Link, Hr,
} from '@react-email/components';
import { render } from '@react-email/render';

export type TrialStatus = 'reviewing' | 'accepted' | 'rejected';

export interface TrialStatusEmailProps {
  applicantName: string;
  status: TrialStatus;
  ctaUrl?: string;
}

const baseText: React.CSSProperties = { fontFamily: 'Arial, sans-serif', margin: 0 };
const muted: React.CSSProperties = { ...baseText, color: '#64748b', fontSize: '13px' };

const STATUS_CONFIG: Record<TrialStatus, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  subject: string;
  body: string;
  nextSteps: string[];
  ctaLabel?: string;
}> = {
  reviewing: {
    label: 'Application Under Review',
    color: '#92400e',
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
    subject: 'We received your application',
    body: 'Thank you for applying to Pawn Stars. Our coaching staff is reviewing your submission and will be in touch within 5–7 business days.',
    nextSteps: [
      'Your profile and game history are being evaluated.',
      'You may be invited for a short online interview.',
      'We will notify you by email once a decision has been made.',
    ],
  },
  accepted: {
    label: 'Application Accepted',
    color: '#065f46',
    bgColor: '#ecfdf5',
    borderColor: '#a7f3d0',
    subject: 'Welcome to Pawn Stars!',
    body: 'Congratulations! We are delighted to invite you to join Pawn Stars. Your talent and dedication stood out and we look forward to working with you.',
    nextSteps: [
      'Complete your player profile in the player portal.',
      'Review and sign your player agreement (link below).',
      'Attend the onboarding session — details will follow by email.',
    ],
    ctaLabel: 'Set up your profile',
  },
  rejected: {
    label: 'Application Unsuccessful',
    color: '#7f1d1d',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
    subject: 'Pawn Stars — Application Update',
    body: 'Thank you for the time you put into your application. After careful review, we are unable to offer you a position at this stage. This decision was not taken lightly — the competition was strong.',
    nextSteps: [
      'Continue developing your game — ratings and tournament performance are key.',
      'We welcome you to apply again in the next selection window.',
      'Follow us for coaching resources and upcoming open events.',
    ],
  },
};

export function TrialStatusEmail({ applicantName, status, ctaUrl }: TrialStatusEmailProps) {
  const cfg = STATUS_CONFIG[status];

  return (
    <Html lang="en">
      <Head />
      <Body style={{ backgroundColor: '#f1f5f9', padding: '32px 0' }}>
        <Container style={{ maxWidth: '560px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden' }}>

          {/* header */}
          <Section style={{ backgroundColor: '#0f172a', padding: '20px 32px' }}>
            <Text style={{ ...baseText, color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Pawn Stars · Player Trial
            </Text>
          </Section>

          <Section style={{ padding: '32px' }}>
            <Heading style={{ ...baseText, fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
              Hi {applicantName},
            </Heading>
            <Text style={{ ...muted, marginBottom: '24px', lineHeight: '1.6' }}>
              {cfg.subject}
            </Text>

            {/* status badge */}
            <Section style={{ backgroundColor: cfg.bgColor, border: `1px solid ${cfg.borderColor}`, borderRadius: '6px', padding: '14px 16px', marginBottom: '24px' }}>
              <Text style={{ ...baseText, fontSize: '14px', fontWeight: '700', color: cfg.color }}>
                {cfg.label}
              </Text>
            </Section>

            {/* body */}
            <Text style={{ ...baseText, fontSize: '14px', color: '#334155', lineHeight: '1.7', marginBottom: '24px' }}>
              {cfg.body}
            </Text>

            {/* next steps */}
            <Heading as="h2" style={{ ...baseText, fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Next Steps
            </Heading>
            {cfg.nextSteps.map((step, i) => (
              <Section key={i} style={{ display: 'flex', marginBottom: '8px' }}>
                <Text style={{ ...baseText, fontSize: '13px', color: '#334155', lineHeight: '1.6' }}>
                  <span style={{ color: '#94a3b8', marginRight: '8px' }}>{i + 1}.</span>
                  {step}
                </Text>
              </Section>
            ))}

            {/* cta */}
            {status === 'accepted' && ctaUrl && (
              <>
                <Hr style={{ margin: '24px 0', borderColor: '#e2e8f0' }} />
                <Link
                  href={ctaUrl}
                  style={{ backgroundColor: '#059669', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}
                >
                  {cfg.ctaLabel ?? 'Get started'} →
                </Link>
              </>
            )}
          </Section>

          <Section style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '16px 32px' }}>
            <Text style={muted}>
              Pawn Stars Chess Organization · Questions? Reply to this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export async function renderTrialStatusEmail(props: TrialStatusEmailProps): Promise<string> {
  return render(<TrialStatusEmail {...props} />);
}
