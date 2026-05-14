import type { Metadata } from 'next';
import ShortlistsClient from '@/components/scouting/ShortlistsClient';
import { mockShortlists } from '@/lib/mock/scouting';

export const metadata: Metadata = { title: 'Shortlists' };

export default function ScoutingShortlistsPage() {
  const totalPlayers = mockShortlists.reduce((sum, sl) => sum + sl.players.length, 0);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-primary-900">Shortlists</h1>
          <p className="text-sm text-primary-500 mt-0.5">
            {mockShortlists.length} lists · {totalPlayers} players tracked
          </p>
        </div>
      </div>
      <ShortlistsClient shortlists={mockShortlists} />
    </div>
  );
}
