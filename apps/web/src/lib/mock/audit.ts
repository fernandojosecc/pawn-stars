import { AuditLog, AuditAction, AuditStats } from '@pawn-stars/shared-types';

const ENTITIES = ['Player', 'Tournament', 'Match', 'News', 'Sponsor', 'Application'];
const USERS = [
  { id: 'u1', email: 'admin@pawnstars.com' },
  { id: 'u2', email: 'editor@pawnstars.com' },
  { id: 'u3', email: 'coach@pawnstars.com' },
];
const IPS = ['192.168.1.10', '10.0.0.5', '172.16.0.3'];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function summary(entity: string, action: AuditAction, id: string): string {
  if (action === AuditAction.CREATE) return `Created ${entity} #${id.slice(0, 6)}`;
  if (action === AuditAction.UPDATE) return `Updated ${entity} #${id.slice(0, 6)} — field changes applied`;
  return `Deleted ${entity} #${id.slice(0, 6)}`;
}

function uuid(n: number): string {
  return `mock-${n.toString().padStart(4, '0')}-0000-0000-000000000000`;
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(Math.floor(Math.random() * 23), Math.floor(Math.random() * 59));
  return d.toISOString();
}

function seedLogs(): AuditLog[] {
  const logs: AuditLog[] = [];
  const actions = [AuditAction.CREATE, AuditAction.UPDATE, AuditAction.DELETE];
  for (let i = 0; i < 100; i++) {
    const entity = randomItem(ENTITIES);
    const action = actions[i % 3] as AuditAction;
    const user = randomItem(USERS);
    const entityId = uuid(i);
    logs.push({
      id: `log-${i.toString().padStart(4, '0')}`,
      entity,
      entityId,
      action,
      userId: user.id,
      userEmail: user.email,
      ipAddress: randomItem(IPS),
      timestamp: daysAgo(Math.floor(i / 3.5)),
      summary: summary(entity, action, entityId),
      before: action !== AuditAction.CREATE ? { status: 'old', rating: 1800 + i } : undefined,
      after: action !== AuditAction.DELETE ? { status: 'new', rating: 1810 + i } : undefined,
    });
  }
  return logs.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export const mockAuditLogs: AuditLog[] = seedLogs();

function last30DaysCounts() {
  const map: Record<string, { creates: number; updates: number; deletes: number }> = {};
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    map[d.toISOString().slice(0, 10)] = { creates: 0, updates: 0, deletes: 0 };
  }
  for (const log of mockAuditLogs) {
    const day = log.timestamp.slice(0, 10);
    if (map[day]) {
      if (log.action === AuditAction.CREATE) map[day].creates++;
      else if (log.action === AuditAction.UPDATE) map[day].updates++;
      else map[day].deletes++;
    }
  }
  return Object.entries(map).map(([date, counts]) => ({ date, ...counts }));
}

function byEntity() {
  const map: Record<string, { creates: number; updates: number; deletes: number }> = {};
  for (const log of mockAuditLogs) {
    if (!map[log.entity]) map[log.entity] = { creates: 0, updates: 0, deletes: 0 };
    if (log.action === AuditAction.CREATE) map[log.entity].creates++;
    else if (log.action === AuditAction.UPDATE) map[log.entity].updates++;
    else map[log.entity].deletes++;
  }
  return Object.entries(map).map(([entity, counts]) => ({
    entity,
    ...counts,
    total: counts.creates + counts.updates + counts.deletes,
  }));
}

export const mockAuditStats: AuditStats = {
  totalLogs: mockAuditLogs.length,
  last30Days: last30DaysCounts(),
  byEntity: byEntity(),
  byAction: {
    [AuditAction.CREATE]: mockAuditLogs.filter((l) => l.action === AuditAction.CREATE).length,
    [AuditAction.UPDATE]: mockAuditLogs.filter((l) => l.action === AuditAction.UPDATE).length,
    [AuditAction.DELETE]: mockAuditLogs.filter((l) => l.action === AuditAction.DELETE).length,
  },
};
