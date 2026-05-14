import type { Metadata } from 'next';
import CompareClient from '@/components/scouting/CompareClient';
import { mockScoutingPlayers } from '@/lib/mock/scouting';

export const metadata: Metadata = { title: 'Compare Players' };

export default function ScoutingComparePage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-primary-900">Player Comparison</h1>
        <p className="text-sm text-primary-500 mt-0.5">
          Select up to 3 players for a side-by-side analysis.
        </p>
      </div>
      <CompareClient players={mockScoutingPlayers} />
    </div>
  );
}
