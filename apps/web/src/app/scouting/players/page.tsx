import type { Metadata } from 'next';
import PlayerSearchClient from '@/components/scouting/PlayerSearchClient';
import { mockScoutingPlayers, mockShortlists } from '@/lib/mock/scouting';

export const metadata: Metadata = { title: 'Player Search' };

export default function ScoutingPlayersPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-primary-900">Player Search</h1>
        <p className="text-sm text-primary-500 mt-0.5">
          Filter and evaluate players across all rating modalities.
        </p>
      </div>
      <PlayerSearchClient players={mockScoutingPlayers} shortlists={mockShortlists} />
    </div>
  );
}
