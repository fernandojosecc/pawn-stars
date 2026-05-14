import type { Metadata } from 'next';
import NewsTable from '@/components/admin/NewsTable';
import { mockAdminNews } from '@/lib/mock/admin';

export const metadata: Metadata = { title: 'News' };

export default function AdminNewsPage() {
  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold text-primary-900 mb-6">News</h1>
      <NewsTable posts={mockAdminNews} />
    </div>
  );
}
