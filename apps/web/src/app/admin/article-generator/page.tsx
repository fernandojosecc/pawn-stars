import type { Metadata } from 'next';
import ArticleGeneratorClient from '@/components/admin/ArticleGeneratorClient';

export const metadata: Metadata = { title: 'Article Generator' };

const COMPLETED_TOURNAMENTS = [
  {
    id: 'autumn-blitz-2025',
    name: 'Autumn Blitz 2025',
    location: 'Valencia, Spain',
    endDate: '2025-10-07',
  },
  {
    id: 'winter-classic-2025',
    name: 'Winter Classic 2025',
    location: 'Madrid, Spain',
    endDate: '2025-12-15',
  },
];

export default function AdminArticleGeneratorPage() {
  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-lg font-semibold text-primary-900">AI Article Generator</h1>
          <span className="rounded-full bg-accent-100 text-accent-700 text-xs font-semibold px-2 py-0.5">
            Powered by Claude
          </span>
        </div>
        <p className="text-sm text-primary-500 max-w-xl">
          Select a completed tournament and Claude will write a professional post-tournament article in chess journalism style.
          Review and edit before publishing to the news drafts queue.
        </p>
      </div>

      {/* How it works */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            step: '1',
            title: 'Select tournament',
            desc: 'Pick any completed tournament — standings, results and notable moments are loaded automatically.',
          },
          {
            step: '2',
            title: 'Claude writes',
            desc: 'Claude generates a 400–600 word article with headline, lead, key moments and outlook.',
          },
          {
            step: '3',
            title: 'Edit & publish',
            desc: 'Review inline, edit the headline or body, then save as a draft for final review before publishing.',
          },
        ].map((item) => (
          <div key={item.step} className="bg-white rounded-xl border border-primary-200 px-4 py-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-6 w-6 rounded-full bg-accent-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                {item.step}
              </span>
              <span className="text-sm font-semibold text-primary-900">{item.title}</span>
            </div>
            <p className="text-xs text-primary-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-primary-200 p-6">
        <ArticleGeneratorClient tournaments={COMPLETED_TOURNAMENTS} />
      </div>

      {/* Note about API key */}
      <p className="mt-4 text-xs text-primary-400">
        <strong>Note:</strong> Set <code className="bg-primary-100 px-1 rounded">ANTHROPIC_API_KEY</code> in{' '}
        <code className="bg-primary-100 px-1 rounded">apps/api/.env</code> (and <code className="bg-primary-100 px-1 rounded">apps/web/.env.local</code>) to enable live generation.
        Without a key, a realistic mock article is returned so the UI works in all environments.
      </p>
    </div>
  );
}
