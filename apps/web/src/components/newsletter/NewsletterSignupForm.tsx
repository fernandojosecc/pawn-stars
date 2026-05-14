'use client';

import { useState } from 'react';
import { NewsletterPreference } from '@pawn-stars/shared-types';

const PREF_OPTIONS: { value: NewsletterPreference; label: string; description: string }[] = [
  { value: NewsletterPreference.MATCH_RESULTS,      label: 'Match results',       description: 'Scores and reports after every round' },
  { value: NewsletterPreference.TOURNAMENT_UPDATES, label: 'Tournament updates',  description: 'Draw announcements, pairings, standings' },
  { value: NewsletterPreference.TEAM_NEWS,          label: 'Team news',           description: 'Signings, departures, org announcements' },
  { value: NewsletterPreference.BLOG_POSTS,         label: 'Blog & analysis',     description: 'Opening theory, player profiles, editorials' },
];

interface Props {
  compact?: boolean;   // compact=true → single-row email+button, no preference checkboxes
  heading?: string;
  subheading?: string;
  className?: string;
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function NewsletterSignupForm({
  compact = false,
  heading = 'Stay in the loop',
  subheading = 'Get chess news, match results and tournament updates delivered to your inbox.',
  className = '',
}: Props) {
  const [email, setEmail] = useState('');
  const [prefs, setPrefs] = useState<NewsletterPreference[]>([
    NewsletterPreference.MATCH_RESULTS,
    NewsletterPreference.TOURNAMENT_UPDATES,
  ]);
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function togglePref(p: NewsletterPreference) {
    setPrefs((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, preferences: compact ? [] : prefs }),
      });

      const data = (await res.json()) as { message?: string; error?: string };

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Subscription failed. Please try again.');
        setState('error');
        return;
      }

      setState('success');
    } catch {
      setErrorMsg('Network error — please try again.');
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div className={`rounded-xl bg-green-50 border border-green-200 px-5 py-6 text-center ${className}`}>
        <p className="text-2xl mb-2">✓</p>
        <p className="font-semibold text-green-900">You&apos;re subscribed!</p>
        <p className="text-green-700 text-sm mt-1">Check your inbox to confirm your email address.</p>
      </div>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${className}`}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="flex-1 rounded-lg border border-primary-300 px-4 py-2.5 text-sm text-primary-900 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="rounded-lg bg-accent-500 hover:bg-accent-600 disabled:opacity-60 text-white font-semibold px-5 py-2.5 text-sm transition-colors whitespace-nowrap"
        >
          {state === 'submitting' ? 'Subscribing…' : 'Subscribe'}
        </button>
        {state === 'error' && (
          <p className="text-xs text-red-600 mt-1 sm:col-span-2">{errorMsg}</p>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`}>
      <div>
        <label htmlFor="nl-email" className="block text-sm font-medium text-primary-800 mb-1.5">
          Email address
        </label>
        <input
          id="nl-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-sm text-primary-900 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-400"
        />
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-primary-800 mb-2">I want to receive</legend>
        <div className="space-y-2">
          {PREF_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={prefs.includes(opt.value)}
                onChange={() => togglePref(opt.value)}
                className="mt-0.5 h-4 w-4 rounded border-primary-300 text-accent-500 focus:ring-accent-400"
              />
              <span>
                <span className="text-sm font-medium text-primary-900 group-hover:text-primary-700">
                  {opt.label}
                </span>
                <span className="block text-xs text-primary-500">{opt.description}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {state === 'error' && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'submitting' || prefs.length === 0}
        className="w-full rounded-lg bg-accent-500 hover:bg-accent-600 disabled:opacity-60 text-white font-semibold px-5 py-3 text-sm transition-colors"
      >
        {state === 'submitting' ? 'Subscribing…' : 'Subscribe'}
      </button>

      <p className="text-xs text-primary-400 text-center">
        No spam. Unsubscribe at any time.
      </p>
    </form>
  );
}
