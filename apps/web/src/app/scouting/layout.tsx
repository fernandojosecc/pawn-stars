import type { Metadata } from 'next';
import ScoutingSidebar from '@/components/scouting/ScoutingSidebar';

export const metadata: Metadata = {
  title: { template: '%s | Scouting', default: 'Scouting' },
  robots: { index: false, follow: false },
};

export default function ScoutingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-primary-50">
      <ScoutingSidebar role="coach" />
      <div className="lg:pl-60">
        <main className="pt-14 lg:pt-0 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
