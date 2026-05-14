'use client';

import { useState } from 'react';
import { Bookmark, ChevronRight, Trash2, X, Users } from 'lucide-react';
import type { Shortlist, ShortlistPlayer } from '@pawn-stars/shared-types';

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

interface ShortlistDetailProps {
  shortlist: Shortlist;
  onRemovePlayer: (shortlistId: string, slpId: string) => void;
  onUpdateNotes: (shortlistId: string, slpId: string, notes: string) => void;
}

function ShortlistDetail({ shortlist, onRemovePlayer, onUpdateNotes }: ShortlistDetailProps) {
  if (shortlist.players.length === 0) {
    return (
      <div className="px-5 py-8 text-center text-sm text-primary-400">
        No players in this shortlist yet.
      </div>
    );
  }

  return (
    <div className="divide-y divide-primary-100">
      {shortlist.players.map((slp) => (
        <div key={slp.id} className="px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                {slp.player.title && (
                  <span className="text-xs font-medium text-primary-500 border border-primary-200 px-1.5 py-0.5 rounded">
                    {slp.player.title}
                  </span>
                )}
                <span className="font-semibold text-sm text-primary-900">
                  {slp.player.firstName} {slp.player.lastName}
                </span>
                <span className="text-xs text-primary-400">{slp.player.nationality}</span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-primary-500">
                <span>Classical {slp.player.ratings.classical}</span>
                <span>·</span>
                <span>{slp.player.seasonStats.winRate}% win rate</span>
                <span>·</span>
                <span>Age {slp.player.age}</span>
              </div>
              <textarea
                value={slp.notes}
                onChange={(e) => onUpdateNotes(shortlist.id, slp.id, e.target.value)}
                placeholder="Add scouting notes…"
                rows={2}
                className="mt-2 w-full text-xs border border-primary-200 rounded-md px-2.5 py-1.5 text-primary-700 placeholder:text-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-400 resize-none"
              />
            </div>
            <button
              onClick={() => onRemovePlayer(shortlist.id, slp.id)}
              className="p-1.5 rounded text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors flex-shrink-0 mt-0.5"
              title="Remove from shortlist"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

interface ShortlistsClientProps {
  shortlists: Shortlist[];
}

export default function ShortlistsClient({ shortlists: initial }: ShortlistsClientProps) {
  const [shortlists, setShortlists] = useState<Shortlist[]>(initial);
  const [expanded, setExpanded] = useState<string | null>(initial[0]?.id ?? null);

  function toggleExpand(id: string) {
    setExpanded((prev) => (prev === id ? null : id));
  }

  function removePlayer(shortlistId: string, slpId: string) {
    setShortlists((prev) =>
      prev.map((sl) =>
        sl.id !== shortlistId
          ? sl
          : { ...sl, players: sl.players.filter((p) => p.id !== slpId), updatedAt: new Date() },
      ),
    );
  }

  function updateNotes(shortlistId: string, slpId: string, notes: string) {
    setShortlists((prev) =>
      prev.map((sl) =>
        sl.id !== shortlistId
          ? sl
          : {
              ...sl,
              players: sl.players.map((p) => (p.id === slpId ? { ...p, notes } : p)),
            },
      ),
    );
  }

  if (shortlists.length === 0) {
    return (
      <div className="bg-white border border-primary-200 rounded-lg py-16 text-center">
        <Bookmark size={32} className="mx-auto text-primary-200 mb-2" />
        <p className="text-sm text-primary-400">No shortlists yet. Add players from the Player Search page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {shortlists.map((sl) => {
        const isOpen = expanded === sl.id;
        return (
          <div key={sl.id} className="bg-white border border-primary-200 rounded-lg overflow-hidden">
            {/* Header row */}
            <button
              onClick={() => toggleExpand(sl.id)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-primary-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <Bookmark size={16} className={`flex-shrink-0 ${isOpen ? 'text-accent-500' : 'text-primary-400'}`} />
                <div>
                  <p className="font-semibold text-primary-900 text-sm">{sl.name}</p>
                  {sl.description && (
                    <p className="text-xs text-primary-400 mt-0.5">{sl.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <div className="flex items-center gap-1 text-xs text-primary-500">
                    <Users size={12} />
                    <span>{sl.players.length} players</span>
                  </div>
                  <p className="text-xs text-primary-400 mt-0.5">Updated {formatDate(sl.updatedAt)}</p>
                </div>
                <ChevronRight
                  size={16}
                  className={`text-primary-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                />
              </div>
            </button>

            {/* Detail panel */}
            {isOpen && (
              <div className="border-t border-primary-100">
                <ShortlistDetail
                  shortlist={sl}
                  onRemovePlayer={removePlayer}
                  onUpdateNotes={updateNotes}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
