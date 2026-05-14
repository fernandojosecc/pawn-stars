import type { Metadata } from 'next';
import SponsorPortalSidebar from '@/components/sponsor-portal/SponsorPortalSidebar';
import { mockPortalSponsor } from '@/lib/mock/sponsor-portal';

export const metadata: Metadata = {
  title: { default: 'Sponsor Portal | Pawn Stars', template: '%s | Sponsor Portal' },
  robots: { index: false, follow: false },
};

export default function SponsorPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-primary-50">
      <SponsorPortalSidebar sponsor={mockPortalSponsor} />
      <div className="lg:pl-64">
        <main className="pt-14 lg:pt-0">{children}</main>
      </div>
    </div>
  );
}
