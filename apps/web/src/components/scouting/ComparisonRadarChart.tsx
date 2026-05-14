'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { ScoutingPlayer } from '@pawn-stars/shared-types';

const PLAYER_COLORS = ['#475569', '#f59e0b', '#22c55e'] as const;

function normalizeRating(r: number): number {
  return Math.round(Math.max(0, Math.min(100, ((r - 1200) / (2800 - 1200)) * 100)));
}

function buildRadarData(players: ScoutingPlayer[]) {
  const entry = (axis: string, getValue: (p: ScoutingPlayer) => number) => ({
    axis,
    ...Object.fromEntries(players.map((p) => [p.id, getValue(p)])),
  });

  return [
    entry('Classical', (p) => normalizeRating(p.ratings.classical)),
    entry('Rapid',     (p) => normalizeRating(p.ratings.rapid)),
    entry('Blitz',     (p) => normalizeRating(p.ratings.blitz)),
    entry('Win Rate',  (p) => Math.round(p.seasonStats.winRate)),
    entry('Perf Rtg',  (p) => normalizeRating(p.seasonStats.performanceRating)),
  ];
}

interface ComparisonRadarChartProps {
  players: ScoutingPlayer[];
}

export default function ComparisonRadarChart({ players }: ComparisonRadarChartProps) {
  if (players.length < 2) return null;

  const data = buildRadarData(players);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="axis" tick={{ fontSize: 12, fill: '#64748b' }} />
        <PolarRadiusAxis
          domain={[0, 100]}
          tick={false}
          axisLine={false}
          tickCount={5}
        />
        <Tooltip
          formatter={(value) => [`${value}`, 'Score (0–100)']}
          contentStyle={{ fontSize: 12, borderColor: '#e2e8f0', borderRadius: 6 }}
        />
        {players.map((player, i) => (
          <Radar
            key={player.id}
            name={`${player.firstName} ${player.lastName}`}
            dataKey={player.id}
            stroke={PLAYER_COLORS[i]}
            fill={PLAYER_COLORS[i]}
            fillOpacity={0.15}
            strokeWidth={2}
          />
        ))}
        <Legend
          formatter={(value) => <span style={{ fontSize: 12 }}>{value}</span>}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
