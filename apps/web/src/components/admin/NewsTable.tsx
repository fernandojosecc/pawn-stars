'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import type { NewsPost } from '@pawn-stars/shared-types';

type PublishFilter = 'all' | 'published' | 'draft';

function formatDate(d?: Date) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

interface NewsTableProps {
  posts: NewsPost[];
}

export default function NewsTable({ posts }: NewsTableProps) {
  const [filter, setFilter] = useState<PublishFilter>('all');
  const [rows, setRows] = useState<NewsPost[]>(posts);

  const filtered = rows.filter((p) => {
    if (filter === 'published') return !!p.publishedAt;
    if (filter === 'draft') return !p.publishedAt;
    return true;
  });

  function handleDelete(id: string) {
    if (!confirm('Delete this news post?')) return;
    setRows((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {(['all', 'published', 'draft'] as PublishFilter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors
              ${filter === f
                ? 'bg-primary-800 text-white'
                : 'bg-white border border-primary-200 text-primary-600 hover:bg-primary-50'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-primary-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-primary-200 bg-primary-50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Title</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Tags</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Published At</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-primary-400 text-sm">
                  No posts found.
                </td>
              </tr>
            )}
            {filtered.map((post) => {
              const isPublished = !!post.publishedAt;
              return (
                <tr key={post.id} className="hover:bg-primary-50">
                  <td className="px-4 py-3 font-medium text-primary-900 max-w-xs truncate">{post.title}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-primary-100 text-primary-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-primary-600 whitespace-nowrap">{formatDate(post.publishedAt)}</td>
                  <td className="px-4 py-3">
                    {isPublished ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-700">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-600">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-1.5 rounded text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-xs text-primary-400">{filtered.length} of {rows.length} posts</p>
    </div>
  );
}
