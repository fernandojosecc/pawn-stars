import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { mockLiveMatches } from '@/lib/mock/live-coverage';
import MatchCoverageClient from '@/components/live/MatchCoverageClient';

interface Props {
  params: Promise<{ matchId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { matchId } = await params;
  const match = mockLiveMatches.find((m) => m.matchId === matchId);
  if (!match) return { title: 'Match Not Found' };
  return {
    title: `Live: ${match.tournamentName} | Pawn Stars`,
    description: `Follow ${match.tournamentName} live with real-time standings and commentary.`,
  };
}

export default async function LiveMatchPage({ params }: Props) {
  const { matchId } = await params;
  const match = mockLiveMatches.find((m) => m.matchId === matchId);
  if (!match) notFound();

  return (
    <>
      <div className="bg-white border-b border-primary-200 px-4 py-2 sm:px-6">
        <Link href="/live" className="text-xs text-primary-500 hover:text-primary-800">
          ← All live matches
        </Link>
      </div>
      <MatchCoverageClient matchId={matchId} fallback={match} />
    </>
  );
}
