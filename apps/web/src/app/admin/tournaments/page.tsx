import type { Metadata } from 'next';
import TournamentsTable from '@/components/admin/TournamentsTable';
import { mockAdminTournaments } from '@/lib/mock/admin';

export const metadata: Metadata = { title: 'Tournaments' };

export default function AdminTournamentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold text-primary-900 mb-6">Tournaments</h1>
      <TournamentsTable tournaments={mockAdminTournaments} />
    </div>
  );
}
