import type { Metadata } from 'next';
import PlayersTable from '@/components/admin/PlayersTable';
import { mockAdminPlayers } from '@/lib/mock/admin';

export const metadata: Metadata = { title: 'Players' };

export default function AdminPlayersPage() {
  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold text-primary-900 mb-6">Players</h1>
      <PlayersTable players={mockAdminPlayers} />
    </div>
  );
}
