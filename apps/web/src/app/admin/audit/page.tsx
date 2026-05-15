import { mockAuditLogs, mockAuditStats } from '@/lib/mock/audit';
import AuditClient from '@/components/admin/AuditClient';

export const metadata = { title: 'Audit Logs | Pawn Stars Admin' };

export default function AuditPage() {
  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-primary-900">Audit Logs</h1>
        <p className="text-sm text-primary-400 mt-0.5">Track every create, update and delete across all entities</p>
      </div>
      <AuditClient logs={mockAuditLogs} stats={mockAuditStats} />
    </div>
  );
}
