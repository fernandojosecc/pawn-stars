'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  tournament: string;
  performance: number;
  rating: number;
}

interface PerformanceChartProps {
  data: DataPoint[];
  currentRating: number;
}

export default function PerformanceChart({ data, currentRating }: PerformanceChartProps) {
  const min = Math.min(...data.map((d) => Math.min(d.performance, d.rating))) - 40;
  const max = Math.max(...data.map((d) => Math.max(d.performance, d.rating))) + 40;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="tournament"
          tick={{ fontSize: 11, fill: '#64748b' }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          domain={[min, max]}
          tick={{ fontSize: 11, fill: '#64748b' }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{ fontSize: 12, borderColor: '#e2e8f0', borderRadius: 6 }}
          formatter={(value, name) => [
            value,
            name === 'performance' ? 'Performance Rtg' : 'FIDE Rating',
          ]}
        />
        <ReferenceLine y={currentRating} stroke="#f59e0b" strokeDasharray="4 2" strokeWidth={1.5} label={{ value: 'Rating', fill: '#f59e0b', fontSize: 10 }} />
        <Bar dataKey="performance" name="performance" fill="#475569" radius={[3, 3, 0, 0]} />
        <Bar dataKey="rating"      name="rating"      fill="#cbd5e1" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
