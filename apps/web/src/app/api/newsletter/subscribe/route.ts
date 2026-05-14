import { NextRequest, NextResponse } from 'next/server';
import type { NewsletterSubscribeRequest } from '@pawn-stars/shared-types';

// In-memory store for demo — survives the server process lifetime.
// In production this forwards to the NestJS API.
const subscribers = new Map<string, { email: string; preferences: string[]; subscribedAt: string }>();

export async function POST(req: NextRequest) {
  let body: NewsletterSubscribeRequest;
  try {
    body = (await req.json()) as NewsletterSubscribeRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const email = body.email?.toLowerCase().trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 });
  }

  if (subscribers.has(email)) {
    return NextResponse.json({ error: 'This email is already subscribed' }, { status: 409 });
  }

  subscribers.set(email, {
    email,
    preferences: Array.isArray(body.preferences) ? body.preferences : [],
    subscribedAt: new Date().toISOString(),
  });

  return NextResponse.json({ message: 'Subscribed! Check your inbox to confirm.', email }, { status: 201 });
}
