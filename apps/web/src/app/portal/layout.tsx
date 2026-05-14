import type { Metadata } from 'next';
import PortalSidebar from '@/components/portal/PortalSidebar';
import { mockPortalPlayer, mockPortalNotifications } from '@/lib/mock/portal';

export const metadata: Metadata = {
  title: { template: '%s | Player Portal', default: 'Player Portal' },
  robots: { index: false, follow: false },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const unreadCount = mockPortalNotifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-primary-50">
      <PortalSidebar
        playerName={`${mockPortalPlayer.firstName} ${mockPortalPlayer.lastName}`}
        playerTitle={mockPortalPlayer.title}
        unreadCount={unreadCount}
      />
      <div className="lg:pl-60">
        <main className="pt-14 lg:pt-0 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
