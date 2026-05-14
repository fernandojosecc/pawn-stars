interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  highlight?: boolean;
}

export default function KpiCard({ title, value, subtitle, highlight }: KpiCardProps) {
  return (
    <div className={`bg-white rounded-lg border p-4 ${highlight ? 'border-l-4 border-l-accent-500 border-primary-200' : 'border-primary-200'}`}>
      <p className="text-xs font-medium text-primary-500 uppercase tracking-wide">{title}</p>
      <p className="mt-1 text-2xl font-bold text-primary-900">{value}</p>
      {subtitle && <p className="mt-1 text-xs text-primary-400">{subtitle}</p>}
    </div>
  );
}
