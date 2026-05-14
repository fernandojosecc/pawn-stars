'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Plus } from 'lucide-react';
import type { PlayerCard } from '@pawn-stars/shared-types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type StatusFilter = 'all' | 'active' | 'inactive';

interface PlayersTableProps {
  players: PlayerCard[];
}

export default function PlayersTable({ players }: PlayersTableProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [rows, setRows] = useState<PlayerCard[]>(players);

  const filtered = rows.filter((p) => {
    if (statusFilter === 'active') return p.active;
    if (statusFilter === 'inactive') return !p.active;
    return true;
  });

  function handleDelete(id: string) {
    if (!confirm('Delete this player?')) return;
    setRows((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex gap-2">
          {(['all', 'active', 'inactive'] as StatusFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors
                ${statusFilter === f
                  ? 'bg-primary-800 text-white'
                  : 'bg-white border border-primary-200 text-primary-600 hover:bg-primary-50'}`}
            >
              {f}
            </button>
          ))}
        </div>
        <Button size="sm" className="gap-1">
          <Plus size={14} />
          Add Player
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-primary-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-primary-200 bg-primary-50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Title</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Nationality</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Rating</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-primary-400 text-sm">
                  No players found.
                </td>
              </tr>
            )}
            {filtered.map((player) => (
              <tr key={player.id} className="hover:bg-primary-50">
                <td className="px-4 py-3 font-medium text-primary-900">
                  {player.firstName} {player.lastName}
                </td>
                <td className="px-4 py-3">
                  {player.title ? (
                    <Badge variant="outline" className="text-xs">{player.title}</Badge>
                  ) : (
                    <span className="text-primary-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-primary-600">{player.nationality}</td>
                <td className="px-4 py-3 text-primary-600">{player.currentRating ?? '—'}</td>
                <td className="px-4 py-3">
                  {player.active ? (
                    <Badge variant="success" className="text-xs">Active</Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">Inactive</Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/players/${player.slug}/edit`}
                      className="p-1.5 rounded text-primary-500 hover:bg-primary-100 hover:text-primary-900 transition-colors"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button
                      onClick={() => handleDelete(player.id)}
                      className="p-1.5 rounded text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-xs text-primary-400">{filtered.length} of {rows.length} players</p>
    </div>
  );
}
