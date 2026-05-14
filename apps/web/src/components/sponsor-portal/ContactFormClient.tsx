'use client';

import { useState } from 'react';
import type { Sponsor } from '@pawn-stars/shared-types';

const TIER_LABEL: Record<string, string> = {
  title: 'Title Sponsor',
  gold: 'Gold Sponsor',
  silver: 'Silver Sponsor',
  partner: 'Partner',
};

interface Props {
  sponsor: Sponsor;
}

type FormState = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactFormClient({ sponsor }: Props) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState('sending');
    // Simulate network delay — real implementation would POST to /api/sponsor/contact
    await new Promise((r) => setTimeout(r, 1200));
    setFormState('sent');
  }

  if (formState === 'sent') {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 px-6 py-10 text-center max-w-lg mx-auto">
        <p className="text-3xl mb-3">✓</p>
        <p className="font-semibold text-green-900 text-lg">Message sent!</p>
        <p className="text-green-700 text-sm mt-1">
          Our partnerships team will get back to you within 1 business day.
        </p>
        <button
          onClick={() => { setFormState('idle'); setSubject(''); setMessage(''); }}
          className="mt-5 text-sm text-green-700 underline hover:text-green-900"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      {/* Pre-filled sponsor info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-primary-500 mb-1.5">Sponsor</label>
          <input
            type="text"
            value={sponsor.name}
            readOnly
            className="w-full rounded-lg border border-primary-200 bg-primary-50 px-3 py-2.5 text-sm text-primary-600 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-primary-500 mb-1.5">Tier</label>
          <input
            type="text"
            value={TIER_LABEL[sponsor.tier] ?? sponsor.tier}
            readOnly
            className="w-full rounded-lg border border-primary-200 bg-primary-50 px-3 py-2.5 text-sm text-primary-600 cursor-not-allowed"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-semibold text-primary-500 mb-1.5">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          id="subject"
          type="text"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Campaign renewal inquiry"
          className="w-full rounded-lg border border-primary-200 px-3 py-2.5 text-sm text-primary-900 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-primary-500 mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can our partnerships team help you?"
          className="w-full rounded-lg border border-primary-200 px-3 py-2.5 text-sm text-primary-900 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent resize-none"
        />
      </div>

      {formState === 'error' && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          Something went wrong. Please try again or email us directly at partnerships@pawnstars.chess.
        </p>
      )}

      <button
        type="submit"
        disabled={formState === 'sending'}
        className="w-full sm:w-auto rounded-lg bg-accent-500 hover:bg-accent-600 disabled:opacity-60 text-white font-semibold px-6 py-2.5 text-sm transition-colors"
      >
        {formState === 'sending' ? 'Sending…' : 'Send message'}
      </button>

      <p className="text-xs text-primary-400 pt-1">
        Replies go to the email address on file for your account. Typical response time: 1 business day.
      </p>
    </form>
  );
}
