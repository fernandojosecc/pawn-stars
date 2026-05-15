import { CheckCircle, XCircle, AlertCircle, Clock, Users, Package } from 'lucide-react';

export const metadata = { title: 'Observability | Pawn Stars Admin' };

const BUILD_INFO = {
  version: '1.4.0',
  deployedAt: '2026-05-14T08:00:00Z',
  environment: 'production',
  commit: 'a1b2c3d',
};

const MOCK_ERRORS = [
  { id: 'e1', level: 'warn', message: 'Meilisearch sync lagging — 3 documents pending', ts: '2026-05-14T09:42:11Z' },
  { id: 'e2', level: 'error', message: 'Newsletter batch send failed for 2 addresses — SMTP timeout', ts: '2026-05-14T07:15:00Z' },
  { id: 'e3', level: 'warn', message: 'Lichess API rate limit approached (80/100 req/min)', ts: '2026-05-13T22:05:33Z' },
  { id: 'e4', level: 'info', message: 'Ratings cron completed — 48 players updated', ts: '2026-05-13T18:00:01Z' },
  { id: 'e5', level: 'info', message: 'Tournament stats snapshot captured for Spring Classic 2026', ts: '2026-05-13T12:30:45Z' },
];

const LEVEL_STYLES: Record<string, string> = {
  error: 'text-red-600 bg-red-50 border-red-200',
  warn: 'text-amber-700 bg-amber-50 border-amber-200',
  info: 'text-blue-700 bg-blue-50 border-blue-200',
};

type StatusType = 'ok' | 'degraded' | 'error';

interface HealthCard {
  label: string;
  status: StatusType;
  detail: string;
  lastChecked: string;
}

const HEALTH_CARDS: HealthCard[] = [
  { label: 'API Server', status: 'ok', detail: 'Responding — avg 42ms p95', lastChecked: '30s ago' },
  { label: 'Database', status: 'ok', detail: 'PostgreSQL connected — pool 8/20', lastChecked: '30s ago' },
  { label: 'Ratings Import', status: 'ok', detail: 'Last run: today 18:00 — 48 updated', lastChecked: '1m ago' },
  { label: 'Article Generation', status: 'ok', detail: 'Claude API reachable — 0 queued', lastChecked: '5m ago' },
  { label: 'Newsletter Queue', status: 'degraded', detail: '2 failed addresses — retry pending', lastChecked: '2m ago' },
  { label: 'Search (Meilisearch)', status: 'degraded', detail: '3 documents pending sync', lastChecked: '1m ago' },
];

const STATUS_ICON: Record<StatusType, React.ReactNode> = {
  ok: <CheckCircle size={18} className="text-green-500" />,
  degraded: <AlertCircle size={18} className="text-amber-500" />,
  error: <XCircle size={18} className="text-red-500" />,
};

const STATUS_BORDER: Record<StatusType, string> = {
  ok: 'border-green-200',
  degraded: 'border-amber-200',
  error: 'border-red-200',
};

export default function ObservabilityPage() {
  const deployedDate = new Date(BUILD_INFO.deployedAt).toLocaleString();

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-primary-900">Observability</h1>
        <p className="text-sm text-primary-400 mt-0.5">System health, recent errors and build info</p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MiniStat icon={<Users size={16} />} label="Active Sessions" value="14" />
        <MiniStat icon={<CheckCircle size={16} className="text-green-500" />} label="Services OK" value="4 / 6" />
        <MiniStat icon={<AlertCircle size={16} className="text-amber-500" />} label="Degraded" value="2" />
        <MiniStat icon={<Clock size={16} />} label="Uptime" value="99.8%" />
      </div>

      {/* Health cards */}
      <div>
        <h2 className="text-sm font-semibold text-primary-700 mb-2">Service Health</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HEALTH_CARDS.map((card) => (
            <div
              key={card.label}
              className={`bg-white rounded-lg border p-4 ${STATUS_BORDER[card.status]}`}
            >
              <div className="flex items-center gap-2 mb-1">
                {STATUS_ICON[card.status]}
                <span className="text-sm font-semibold text-primary-900">{card.label}</span>
              </div>
              <p className="text-xs text-primary-500">{card.detail}</p>
              <p className="text-xs text-primary-300 mt-1">Checked {card.lastChecked}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent error log */}
      <div>
        <h2 className="text-sm font-semibold text-primary-700 mb-2">Recent System Events</h2>
        <div className="space-y-2">
          {MOCK_ERRORS.map((err) => (
            <div
              key={err.id}
              className={`flex items-start gap-3 rounded-lg border px-3 py-2 text-xs ${LEVEL_STYLES[err.level]}`}
            >
              <span className="font-semibold uppercase shrink-0 pt-px">{err.level}</span>
              <span className="flex-1">{err.message}</span>
              <span className="shrink-0 opacity-60">{new Date(err.ts).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Build info */}
      <div className="bg-white rounded-lg border border-primary-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Package size={16} className="text-primary-400" />
          <h2 className="text-sm font-semibold text-primary-700">Build Info</h2>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4">
          <BuildRow label="Version" value={`v${BUILD_INFO.version}`} />
          <BuildRow label="Environment" value={BUILD_INFO.environment} />
          <BuildRow label="Commit" value={BUILD_INFO.commit} />
          <BuildRow label="Deployed" value={deployedDate} />
        </dl>
      </div>
    </div>
  );
}

function MiniStat({ icon, label, value }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="bg-white rounded-lg border border-primary-200 p-3 flex items-center gap-3">
      <span className="text-primary-400">{icon}</span>
      <div>
        <p className="text-lg font-bold text-primary-900 leading-none">{value}</p>
        <p className="text-xs text-primary-400 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function BuildRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-primary-400">{label}</dt>
      <dd className="text-sm font-medium text-primary-800 mt-0.5">{value}</dd>
    </div>
  );
}
