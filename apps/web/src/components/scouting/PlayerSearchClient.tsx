'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, UserPlus, Check, X } from 'lucide-react';
import type { ScoutingPlayer, ScoutingFilter, Shortlist, TitleFilter } from '@pawn-stars/shared-types';
import { DEFAULT_SCOUTING_FILTER } from '@pawn-stars/shared-types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ALL_TITLES: TitleFilter[] = ['GM', 'IM', 'FM', 'CM', 'WGM', 'WIM', 'WFM', 'WCM'];
const MODALITIES = ['classical', 'rapid', 'blitz'] as const;

function applyFilter(players: ScoutingPlayer[], f: ScoutingFilter): ScoutingPlayer[] {
  return players.filter((p) => {
    const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
    if (f.query && !fullName.includes(f.query.toLowerCase())) return false;

    const rating = p.ratings[f.modality];
    if (rating < f.minRating || rating > f.maxRating) return false;

    if (f.titles.length > 0) {
      if (!p.title || !f.titles.includes(p.title as TitleFilter)) return false;
    }

    if (f.nationality && p.nationality !== f.nationality) return false;

    if (f.minAge > 0 && p.age < f.minAge) return false;
    if (f.maxAge < 99 && p.age > f.maxAge) return false;

    if (f.activeOnly && !p.active) return false;

    return true;
  });
}

interface AddToShortlistPopoverProps {
  player: ScoutingPlayer;
  shortlists: Shortlist[];
  addedIds: Set<string>;
  onAdd: (playerId: string, shortlistId: string) => void;
  onClose: () => void;
}

function AddToShortlistPopover({ player, shortlists, addedIds, onAdd, onClose }: AddToShortlistPopoverProps) {
  return (
    <div className="absolute right-0 top-full mt-1 z-20 w-52 bg-white border border-primary-200 rounded-lg shadow-lg py-1">
      <div className="px-3 py-2 border-b border-primary-100">
        <p className="text-xs font-medium text-primary-700 truncate">
          Add {player.firstName} to…
        </p>
      </div>
      {shortlists.map((sl) => {
        const alreadyIn = sl.players.some((sp) => sp.playerId === player.id);
        return (
          <button
            key={sl.id}
            onClick={() => { if (!alreadyIn) { onAdd(player.id, sl.id); onClose(); } }}
            disabled={alreadyIn}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors
              ${alreadyIn ? 'text-primary-300 cursor-not-allowed' : 'text-primary-700 hover:bg-primary-50'}`}
          >
            <span className="truncate">{sl.name}</span>
            {alreadyIn && <Check size={12} className="text-success-500 flex-shrink-0" />}
          </button>
        );
      })}
      <button
        onClick={onClose}
        className="w-full px-3 py-2 text-xs text-left text-primary-400 hover:bg-primary-50 border-t border-primary-100"
      >
        Cancel
      </button>
    </div>
  );
}

interface PlayerCardProps {
  player: ScoutingPlayer;
  modality: ScoutingFilter['modality'];
  shortlists: Shortlist[];
  addedToShortlistIds: Set<string>;
  onAddToShortlist: (playerId: string, shortlistId: string) => void;
}

function ScoutingPlayerCard({ player, modality, shortlists, addedToShortlistIds, onAddToShortlist }: PlayerCardProps) {
  const [showPopover, setShowPopover] = useState(false);
  const rating = player.ratings[modality];
  const isAdded = addedToShortlistIds.has(player.id);

  return (
    <div className="bg-white border border-primary-200 rounded-lg p-4 relative">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {player.title && (
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">{player.title}</Badge>
            )}
            <span className="font-semibold text-primary-900 text-sm">
              {player.firstName} {player.lastName}
            </span>
          </div>
          <p className="text-xs text-primary-500 mt-0.5">
            {player.nationality} · Age {player.age}
            {!player.active && <span className="ml-1 text-primary-300">(inactive)</span>}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-lg font-bold text-primary-900">{rating}</p>
          <p className="text-xs text-primary-400 capitalize">{modality}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3 text-center">
        <div className="bg-primary-50 rounded p-1.5">
          <p className="text-xs font-semibold text-primary-800">{player.seasonStats.winRate}%</p>
          <p className="text-xs text-primary-400">Win rate</p>
        </div>
        <div className="bg-primary-50 rounded p-1.5">
          <p className="text-xs font-semibold text-primary-800">{player.seasonStats.performanceRating}</p>
          <p className="text-xs text-primary-400">Perf rtg</p>
        </div>
        <div className="bg-primary-50 rounded p-1.5">
          <p className="text-xs font-semibold text-primary-800">{player.seasonStats.gamesPlayed}</p>
          <p className="text-xs text-primary-400">Games</p>
        </div>
      </div>

      <div className="mb-3 text-xs text-primary-500 space-y-0.5">
        <p><span className="text-primary-400">White:</span> {player.topOpenings.asWhite}</p>
        <p><span className="text-primary-400">Black:</span> {player.topOpenings.asBlack}</p>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowPopover((v) => !v)}
          className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-colors
            ${isAdded
              ? 'bg-success-50 text-success-700 border border-success-200'
              : 'bg-primary-800 text-white hover:bg-primary-700'}`}
        >
          {isAdded ? <Check size={12} /> : <UserPlus size={12} />}
          {isAdded ? 'Added to shortlist' : 'Add to shortlist'}
        </button>
        {showPopover && (
          <AddToShortlistPopover
            player={player}
            shortlists={shortlists}
            addedIds={addedToShortlistIds}
            onAdd={onAddToShortlist}
            onClose={() => setShowPopover(false)}
          />
        )}
      </div>
    </div>
  );
}

interface PlayerSearchClientProps {
  players: ScoutingPlayer[];
  shortlists: Shortlist[];
}

export default function PlayerSearchClient({ players, shortlists: initialShortlists }: PlayerSearchClientProps) {
  const [filter, setFilter] = useState<ScoutingFilter>(DEFAULT_SCOUTING_FILTER);
  const [shortlists, setShortlists] = useState<Shortlist[]>(initialShortlists);
  const [showFilters, setShowFilters] = useState(true);
  const [addedToShortlistIds, setAddedToShortlistIds] = useState<Set<string>>(
    () => new Set(initialShortlists.flatMap((sl) => sl.players.map((sp) => sp.playerId))),
  );

  const nationalities = useMemo(
    () => [...new Set(players.map((p) => p.nationality))].sort(),
    [players],
  );

  const results = useMemo(() => applyFilter(players, filter), [players, filter]);

  function set<K extends keyof ScoutingFilter>(key: K, value: ScoutingFilter[K]) {
    setFilter((f) => ({ ...f, [key]: value }));
  }

  function toggleTitle(title: TitleFilter) {
    setFilter((f) => ({
      ...f,
      titles: f.titles.includes(title)
        ? f.titles.filter((t) => t !== title)
        : [...f.titles, title],
    }));
  }

  function resetFilter() {
    setFilter(DEFAULT_SCOUTING_FILTER);
  }

  function handleAddToShortlist(playerId: string, shortlistId: string) {
    const player = players.find((p) => p.id === playerId);
    if (!player) return;

    setShortlists((prev) =>
      prev.map((sl) =>
        sl.id !== shortlistId
          ? sl
          : {
              ...sl,
              updatedAt: new Date(),
              players: [
                ...sl.players,
                {
                  id: `slp-${Date.now()}`,
                  playerId,
                  player,
                  notes: '',
                  addedAt: new Date(),
                },
              ],
            },
      ),
    );
    setAddedToShortlistIds((prev) => new Set([...prev, playerId]));
  }

  const activeFilterCount = [
    filter.query,
    filter.minRating > 1200,
    filter.maxRating < 2900,
    filter.titles.length > 0,
    filter.nationality,
    filter.minAge > 0,
    filter.maxAge < 99,
    filter.activeOnly,
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Filter panel */}
      <div className="lg:w-64 lg:flex-shrink-0">
        <div className="bg-white border border-primary-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-primary-700 hover:bg-primary-50 transition-colors lg:cursor-default"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal size={15} />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-primary-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </span>
            <span className="lg:hidden text-primary-400">{showFilters ? '−' : '+'}</span>
          </button>

          {(showFilters || typeof window !== 'undefined') && (
            <div className={`border-t border-primary-100 px-4 py-4 space-y-4 ${!showFilters ? 'hidden lg:block' : ''}`}>
              {/* Name search */}
              <div>
                <label className="block text-xs font-medium text-primary-600 mb-1">Name</label>
                <div className="relative">
                  <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-primary-400" />
                  <input
                    type="text"
                    value={filter.query}
                    onChange={(e) => set('query', e.target.value)}
                    placeholder="Search player…"
                    className="w-full pl-8 pr-3 py-1.5 text-sm border border-primary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-400"
                  />
                </div>
              </div>

              {/* Modality */}
              <div>
                <label className="block text-xs font-medium text-primary-600 mb-1">Rating modality</label>
                <div className="flex gap-1">
                  {MODALITIES.map((m) => (
                    <button
                      key={m}
                      onClick={() => set('modality', m)}
                      className={`flex-1 py-1 text-xs rounded-md capitalize font-medium transition-colors
                        ${filter.modality === m
                          ? 'bg-primary-800 text-white'
                          : 'bg-primary-50 text-primary-600 hover:bg-primary-100'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating range */}
              <div>
                <label className="block text-xs font-medium text-primary-600 mb-1">Rating range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={filter.minRating}
                    min={1200} max={filter.maxRating - 1}
                    onChange={(e) => set('minRating', Number(e.target.value))}
                    className="w-full py-1.5 px-2 text-xs border border-primary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-400"
                  />
                  <span className="text-primary-400 text-xs">–</span>
                  <input
                    type="number"
                    value={filter.maxRating}
                    min={filter.minRating + 1} max={2900}
                    onChange={(e) => set('maxRating', Number(e.target.value))}
                    className="w-full py-1.5 px-2 text-xs border border-primary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-400"
                  />
                </div>
              </div>

              {/* Title filter */}
              <div>
                <label className="block text-xs font-medium text-primary-600 mb-1">Title</label>
                <div className="flex flex-wrap gap-1">
                  {ALL_TITLES.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleTitle(t)}
                      className={`px-2 py-0.5 text-xs rounded-md border transition-colors
                        ${filter.titles.includes(t)
                          ? 'bg-primary-800 text-white border-primary-800'
                          : 'bg-white text-primary-600 border-primary-200 hover:border-primary-400'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nationality */}
              <div>
                <label className="block text-xs font-medium text-primary-600 mb-1">Nationality</label>
                <select
                  value={filter.nationality}
                  onChange={(e) => set('nationality', e.target.value)}
                  className="w-full py-1.5 px-2 text-xs border border-primary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-400 bg-white"
                >
                  <option value="">All</option>
                  {nationalities.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              {/* Age range */}
              <div>
                <label className="block text-xs font-medium text-primary-600 mb-1">Age range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={filter.minAge || ''}
                    min={0} max={99}
                    placeholder="Min"
                    onChange={(e) => set('minAge', Number(e.target.value) || 0)}
                    className="w-full py-1.5 px-2 text-xs border border-primary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-400"
                  />
                  <span className="text-primary-400 text-xs">–</span>
                  <input
                    type="number"
                    value={filter.maxAge < 99 ? filter.maxAge : ''}
                    min={0} max={99}
                    placeholder="Max"
                    onChange={(e) => set('maxAge', Number(e.target.value) || 99)}
                    className="w-full py-1.5 px-2 text-xs border border-primary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-400"
                  />
                </div>
              </div>

              {/* Active only */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filter.activeOnly}
                  onChange={(e) => set('activeOnly', e.target.checked)}
                  className="rounded border-primary-300 text-primary-700"
                />
                <span className="text-xs text-primary-600">Active players only</span>
              </label>

              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilter}
                  className="w-full text-xs text-primary-500 hover:text-primary-800 py-1.5 border border-primary-200 rounded-md hover:border-primary-400 transition-colors"
                >
                  Reset all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-primary-600">
            <span className="font-semibold text-primary-900">{results.length}</span> players found
          </p>
        </div>

        {results.length === 0 ? (
          <div className="bg-white border border-primary-200 rounded-lg py-16 text-center">
            <Search size={32} className="mx-auto text-primary-200 mb-2" />
            <p className="text-sm text-primary-400">No players match your filters.</p>
            <button onClick={resetFilter} className="mt-3 text-xs text-primary-600 underline">Reset filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {results.map((player) => (
              <ScoutingPlayerCard
                key={player.id}
                player={player}
                modality={filter.modality}
                shortlists={shortlists}
                addedToShortlistIds={addedToShortlistIds}
                onAddToShortlist={handleAddToShortlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
