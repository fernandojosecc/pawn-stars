import type { Metadata } from 'next';
import ApplicationsTable from '@/components/admin/ApplicationsTable';
import { mockAdminApplications } from '@/lib/mock/admin';

export const metadata: Metadata = { title: 'Applications' };

export default function AdminApplicationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold text-primary-900 mb-6">Trial Applications</h1>
      <ApplicationsTable applications={mockAdminApplications} />
    </div>
  );
}
