// ─── Value exports (components + render functions) ───────────────────────────
export { MatchResultEmail, renderMatchResultEmail } from './MatchResultEmail.js';
export { RoundCompleteEmail, renderRoundCompleteEmail } from './RoundCompleteEmail.js';
export { TrialStatusEmail, renderTrialStatusEmail } from './TrialStatusEmail.js';
export { NewsletterEmail, renderNewsletterEmail } from './NewsletterEmail.js';

// ─── Type alias exports ───────────────────────────────────────────────────────
// Exported as named type aliases rather than re-exports so TypeScript can
// resolve them directly from this index without following the .js hop —
// this is reliable even when nodenext module resolution is used by the importer.

import type { MatchResultEmailProps as _MatchResult } from './MatchResultEmail.js';
import type {
  RoundCompleteEmailProps as _RoundComplete,
  RoundResult as _RoundResult,
  StandingRow as _StandingRow,
} from './RoundCompleteEmail.js';
import type {
  TrialStatusEmailProps as _TrialStatus,
  TrialStatus as _TrialStatusValue,
} from './TrialStatusEmail.js';
import type { NewsletterEmailProps as _Newsletter } from './NewsletterEmail.js';

export type MatchResultEmailProps   = _MatchResult;
export type RoundCompleteEmailProps = _RoundComplete;
export type RoundResult             = _RoundResult;
export type StandingRow             = _StandingRow;
export type TrialStatusEmailProps   = _TrialStatus;
export type TrialStatus             = _TrialStatusValue;
export type NewsletterEmailProps    = _Newsletter;
