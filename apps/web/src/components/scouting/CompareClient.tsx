'use client';

import { useState } from 'react';
import { X, GitCompare } from 'lucide-react';
import type { ScoutingPlayer } from '@pawn-stars/shared-types';
import ComparisonRadarChart from './ComparisonRadarChart';

const MAX_PLAYERS = 3;
const SLOT_COLORS = ['border-primary-700', 'border-accent-500', 'border-success-500'];
const VALUE_COLORS = ['text-primary-800', 'text-accent-600', 'text-success-600'];

type MetricRow = {
  label: string;
  getValue: (p: ScoutingPlayer) => string | number;
  highlight: boolean; // true = color the best value
  isNumeric: boolean;
};

const METRICS: MetricRow[] = [
  { label: 'Classical Rating',    getValue: (p) => p.ratings.classical,              highlight: true,  isNumeric: true  },
  { label: 'Rapid Rating',        getValue: (p) => p.ratings.rapid,                  highlight: true,  isNumeric: true  },
  { label: 'Blitz Rating',        getValue: (p) => p.ratings.blitz,                  highlight: true,  isNumeric: true  },
  { label: 'Win Rate',            getValue: (p) => `${p.seasonStats.winRate}%`,       highlight: true,  isNumeric: true  },
  { label: 'Performance Rating',  getValue: (p) => p.seasonStats.performanceRating,  highlight: true,  isNumeric: true  },
  { label: 'Games Played',        getValue: (p) => p.seasonStats.gamesPlayed,        highlight: false, isNumeric: true  },
  { label: 'W / D / L',          getValue: (p) => `${p.seasonStats.wins} / ${p.seasonStats.draws} / ${p.seasonStats.losses}`, highlight: false, isNumeric: false },
  { label: 'Top Opening (White)', getValue: (p) => p.topOpenings.asWhite,            highlight: false, isNumeric: false },
  { label: 'Top Opening (Black)', getValue: (p) => p.topOpenings.asBlack,            highlight: false, isNumeric: false },
  { label: 'Age',                 getValue: (p) => p.age,                            highlight: false, isNumeric: true  },
  { label: 'Nationality',         getValue: (p) => p.nationality,                    highlight: false, isNumeric: false },
];

function bestIndex(players: ScoutingPlayer[], metric: MetricRow): number {
  if (!metric.highlight || !metric.isNumeric || players.length < 2) return -1;
  const values = players.map((p) => {
    const v = metric.getValue(p);
    return typeof v === 'number' ? v : parseFloat(String(v));
  });
  const max = Math.max(...values);
  return values.indexOf(max);
}

interface PlayerSelectorProps {
  players: ScoutingPlayer[];
  selected: ScoutingPlayer | null;
  colorClass: string;
  onSelect: (p: ScoutingPlayer | null) => void;
  disabled?: boolean;
}

function PlayerSelector({ players, selected, colorClass, onSelect, disabled }: PlayerSelectorProps) {
  return (
    <div className={`flex-1 min-w-0 border-2 ${selected ? colorClass : 'border-primary-200'} rounded-lg overflow-hidden`}>
      {selected ? (
        <div className="flex items-start justify-between p-3 bg-white">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              {selected.title && (
                <span className="text-xs text-primary-500 border border-primary-200 px-1 py-0.5 rounded">{selected.title}</span>
              )}
              <span className="font-semibold text-sm text-primary-900">
                {selected.firstName} {selected.lastName}
              </span>
            </div>
            <p className="text-xs text-primary-500 mt-0.5">
              {selected.nationality} · {selected.ratings.classical} classical
            </p>
          </div>
          <button
            onClick={() => onSelect(null)}
            className="p-1 rounded text-primary-400 hover:text-primary-700 hover:bg-primary-100 transition-colors flex-shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div className="p-3">
          <p className="text-xs text-primary-400 mb-1.5">{disabled ? 'Max 3 players' : 'Select player'}</p>
          <select
            disabled={disabled}
            value=""
            onChange={(e) => {
              const p = players.find((pl) => pl.id === e.target.value);
              if (p) onSelect(p);
            }}
            className="w-full text-xs border border-primary-200 rounded-md px-2 py-1.5 bg-white text-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-400 disabled:opacity-40"
          >
            <option value="">— Choose player —</option>
            {players.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title ? `${p.title} ` : ''}{p.firstName} {p.lastName} ({p.ratings.classical})
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

interface CompareClientProps {
  players: ScoutingPlayer[];
}

export default function CompareClient({ players }: CompareClientProps) {
  const [selected, setSelected] = useState<Array<ScoutingPlayer | null>>([null, null, null]);

  function setSlot(index: number, player: ScoutingPlayer | null) {
    setSelected((prev) => {
      const next = [...prev] as Array<ScoutingPlayer | null>;
      next[index] = player;
      return next;
    });
  }

  const chosen = selected.filter((p): p is ScoutingPlayer => p !== null);
  // Filter out already-selected players from each slot's options
  const availableFor = (index: number) =>
    players.filter((p) => !selected.some((s, i) => i !== index && s?.id === p.id));

  return (
    <div className="space-y-6">
      {/* Player selectors */}
      <div className="bg-white border border-primary-200 rounded-lg p-4">
        <p className="text-xs font-medium text-primary-500 uppercase tracking-wide mb-3">
          Select up to 3 players to compare
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          {selected.map((sel, i) => (
            <PlayerSelector
              key={i}
              players={availableFor(i)}
              selected={sel}
              colorClass={SLOT_COLORS[i]!}
              onSelect={(p) => setSlot(i, p)}
            />
          ))}
        </div>
      </div>

      {chosen.length < 2 ? (
        <div className="bg-white border border-primary-200 rounded-lg py-16 text-center">
          <GitCompare size={32} className="mx-auto text-primary-200 mb-2" />
          <p className="text-sm text-primary-400">Select at least 2 players to see the comparison.</p>
        </div>
      ) : (
        <>
          {/* Comparison table */}
          <div className="bg-white border border-primary-200 rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-primary-100">
              <h2 className="text-sm font-semibold text-primary-700">Side-by-side comparison</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary-50 border-b border-primary-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-primary-500 uppercase tracking-wide w-40">Metric</th>
                    {chosen.map((p, i) => (
                      <th key={p.id} className={`text-center px-4 py-3 text-xs font-semibold uppercase tracking-wide ${VALUE_COLORS[i]}`}>
                        {p.firstName} {p.lastName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-100">
                  {METRICS.map((metric) => {
                    const best = bestIndex(chosen, metric);
                    return (
                      <tr key={metric.label} className="hover:bg-primary-50">
                        <td className="px-5 py-3 text-xs font-medium text-primary-500">{metric.label}</td>
                        {chosen.map((p, i) => (
                          <td
                            key={p.id}
                            className={`text-center px-4 py-3 text-sm ${
                              best === i ? `font-bold ${VALUE_COLORS[i]}` : 'text-primary-700'
                            }`}
                          >
                            {metric.getValue(p)}
                            {best === i && metric.highlight && (
                              <span className="ml-1 text-xs">↑</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Radar chart */}
          <div className="bg-white border border-primary-200 rounded-lg p-5">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-primary-700">Radar comparison</h2>
              <p className="text-xs text-primary-400 mt-0.5">
                All axes normalized 0–100 against the 1200–2800 rating scale. Win rate shown as percentage.
              </p>
            </div>
            <ComparisonRadarChart players={chosen} />
          </div>
        </>
      )}
    </div>
  );
}
