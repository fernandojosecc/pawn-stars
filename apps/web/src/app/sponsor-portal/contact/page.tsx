import type { Metadata } from 'next';
import ContactFormClient from '@/components/sponsor-portal/ContactFormClient';
import { mockPortalSponsor } from '@/lib/mock/sponsor-portal';

export const metadata: Metadata = { title: 'Contact' };

export default function SponsorContactPage() {
  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-lg font-semibold text-primary-900">Contact Partnerships</h1>
        <p className="text-sm text-primary-500 mt-0.5">
          Send a message directly to our partnerships team. We typically respond within 1 business day.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ContactFormClient sponsor={mockPortalSponsor} />
        </div>

        {/* Sidebar info */}
        <aside className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-primary-200 p-5">
            <h2 className="text-sm font-semibold text-primary-800 mb-3">Your Account Manager</h2>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-accent-100 flex items-center justify-center text-accent-700 font-bold text-sm shrink-0">
                SR
              </div>
              <div>
                <p className="text-sm font-medium text-primary-900">Sofia Ramos</p>
                <p className="text-xs text-primary-400">Head of Partnerships</p>
              </div>
            </div>
            <p className="text-xs text-primary-600 leading-relaxed">
              Sofia manages all Title and Gold tier sponsorship relationships. She&apos;s your primary contact for campaign renewals, new placements, and reporting questions.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-primary-200 p-5">
            <h2 className="text-sm font-semibold text-primary-800 mb-3">Direct Contact</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-primary-400 text-xs block">Email</span>
                <span className="text-primary-800 font-medium">partnerships@pawnstars.chess</span>
              </li>
              <li>
                <span className="text-primary-400 text-xs block">Response time</span>
                <span className="text-primary-800 font-medium">Within 1 business day</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
