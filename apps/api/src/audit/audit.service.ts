import { Injectable } from '@nestjs/common';
import { AuditAction } from '@pawn-stars/shared-types';
import type { AuditLog, AuditStats, AuditDayCount, AuditEntityBreakdown } from '@pawn-stars/shared-types';

// ─── Seed helpers ─────────────────────────────────────────────────────────────

const USERS = [
  { id: 'usr-001', email: 'admin@pawnstars.chess' },
  { id: 'usr-002', email: 'editor@pawnstars.chess' },
  { id: 'usr-003', email: 'coach@pawnstars.chess' },
];

const IPS = ['192.168.1.10', '10.0.0.42', '172.16.0.5', '192.168.1.22'];

const ENTITY_SAMPLES: Record<string, Array<{ id: string; name: string }>> = {
  Player:      [{ id: 'p-1', name: 'Magnus Carlsen' }, { id: 'p-2', name: 'Alireza Firouzja' }, { id: 'p-3', name: 'Hikaru Nakamura' }, { id: 'p-4', name: 'Fabiano Caruana' }, { id: 'p-5', name: 'Ding Liren' }],
  Tournament:  [{ id: 't-1', name: 'Spring Open 2026' }, { id: 't-2', name: 'Winter Classic 2025' }, { id: 't-3', name: 'Autumn Blitz 2025' }, { id: 't-4', name: 'Summer Rapid 2026' }],
  News:        [{ id: 'n-1', name: 'Spring Open Kicks Off' }, { id: 'n-2', name: 'Carlsen Leads Round 3' }, { id: 'n-3', name: 'Firouzja Interview' }, { id: 'n-4', name: 'New Sponsor Announcement' }],
  Match:       [{ id: 'm-1', name: 'Carlsen vs Firouzja' }, { id: 'm-2', name: 'Nakamura vs Caruana' }, { id: 'm-3', name: 'Ding vs Nepomniachtchi' }],
  Application: [{ id: 'a-1', name: 'Ana García (WGM)' }, { id: 'a-2', name: 'Kenji Watanabe (IM)' }, { id: 'a-3', name: 'Priya Nair (FM)' }],
  Sponsor:     [{ id: 's-1', name: 'Knight Capital Group' }, { id: 's-2', name: 'BoardTech GmbH' }],
};

const ENTITY_WEIGHTS = [
  { entity: 'Player',      count: 22 },
  { entity: 'Tournament',  count: 18 },
  { entity: 'News',        count: 20 },
  { entity: 'Match',       count: 16 },
  { entity: 'Application', count: 14 },
  { entity: 'Sponsor',     count: 10 },
];

const ACTION_WEIGHTS: AuditAction[] = [
  ...Array(40).fill(AuditAction.CREATE),
  ...Array(45).fill(AuditAction.UPDATE),
  ...Array(15).fill(AuditAction.DELETE),
];

function makeSummary(entity: string, name: string, action: AuditAction): string {
  if (action === AuditAction.CREATE) return `Created ${entity.toLowerCase()} "${name}"`;
  if (action === AuditAction.UPDATE) return `Updated ${entity.toLowerCase()} "${name}"`;
  return `Deleted ${entity.toLowerCase()} "${name}"`;
}

function makeDiff(action: AuditAction, entityName: string): { before?: Record<string, unknown>; after?: Record<string, unknown> } {
  if (action === AuditAction.CREATE) {
    return { after: { name: entityName, status: 'active', createdAt: new Date().toISOString() } };
  }
  if (action === AuditAction.DELETE) {
    return { before: { name: entityName, status: 'active' } };
  }
  return {
    before: { name: entityName, status: 'inactive' },
    after:  { name: entityName, status: 'active', updatedAt: new Date().toISOString() },
  };
}

function seedLogs(): AuditLog[] {
  const logs: AuditLog[] = [];
  let counter = 0;

  for (const { entity, count } of ENTITY_WEIGHTS) {
    const samples = ENTITY_SAMPLES[entity] ?? [];
    for (let i = 0; i < count; i++) {
      const sample = samples[i % samples.length]!;
      const action = ACTION_WEIGHTS[counter % ACTION_WEIGHTS.length]!;
      const user = USERS[counter % USERS.length]!;
      const ip = IPS[counter % IPS.length]!;
      const daysAgo = Math.floor((counter / 100) * 30) + Math.floor(Math.random() * 3);
      const ts = new Date(Date.now() - daysAgo * 86_400_000 - (counter % 24) * 3_600_000).toISOString();
      const diff = makeDiff(action, sample.name);

      logs.push({
        id: `audit-${String(counter + 1).padStart(4, '0')}`,
        entity,
        entityId: sample.id,
        action,
        userId: user.id,
        userEmail: user.email,
        ipAddress: ip,
        timestamp: ts,
        summary: makeSummary(entity, sample.name, action),
        ...diff,
      });
      counter++;
    }
  }

  return logs.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

// ─── Service ─────────────────────────────────────────────────────────────────

export interface LogWriteParams {
  entity: string;
  entityId: string;
  action: AuditAction;
  userId?: string;
  userEmail?: string;
  ipAddress?: string;
  summary: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
}

@Injectable()
export class AuditService {
  private readonly logs: AuditLog[] = seedLogs();

  log(params: LogWriteParams): AuditLog {
    const entry: AuditLog = {
      id: `audit-${Date.now()}`,
      entity:     params.entity,
      entityId:   params.entityId,
      action:     params.action,
      userId:     params.userId    ?? 'system',
      userEmail:  params.userEmail ?? 'system@pawnstars.chess',
      ipAddress:  params.ipAddress ?? '0.0.0.0',
      timestamp:  new Date().toISOString(),
      summary:    params.summary,
      before:     params.before,
      after:      params.after,
    };
    this.logs.unshift(entry);
    return entry;
  }

  findAll(opts: {
    page?: number;
    limit?: number;
    entity?: string;
    action?: AuditAction;
    userId?: string;
    from?: string;
    to?: string;
  }) {
    let list = [...this.logs];

    if (opts.entity)  list = list.filter((l) => l.entity.toLowerCase() === opts.entity!.toLowerCase());
    if (opts.action)  list = list.filter((l) => l.action === opts.action);
    if (opts.userId)  list = list.filter((l) => l.userId === opts.userId);
    if (opts.from)    list = list.filter((l) => l.timestamp >= opts.from!);
    if (opts.to)      list = list.filter((l) => l.timestamp <= opts.to! + 'T23:59:59Z');

    const total = list.length;
    const page  = opts.page  ?? 1;
    const limit = Math.min(opts.limit ?? 20, 100);
    const start = (page - 1) * limit;

    return {
      logs: list.slice(start, start + limit),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: string): AuditLog | undefined {
    return this.logs.find((l) => l.id === id);
  }

  getStats(): AuditStats {
    const now = Date.now();
    const dayMap = new Map<string, AuditDayCount>();

    for (let d = 0; d < 30; d++) {
      const date = new Date(now - d * 86_400_000).toISOString().slice(0, 10);
      dayMap.set(date, { date, creates: 0, updates: 0, deletes: 0 });
    }

    for (const log of this.logs) {
      const date = log.timestamp.slice(0, 10);
      const bucket = dayMap.get(date);
      if (!bucket) continue;
      if (log.action === AuditAction.CREATE) bucket.creates++;
      else if (log.action === AuditAction.UPDATE) bucket.updates++;
      else bucket.deletes++;
    }

    const entityMap = new Map<string, AuditEntityBreakdown>();
    for (const log of this.logs) {
      if (!entityMap.has(log.entity)) {
        entityMap.set(log.entity, { entity: log.entity, creates: 0, updates: 0, deletes: 0, total: 0 });
      }
      const eb = entityMap.get(log.entity)!;
      eb.total++;
      if (log.action === AuditAction.CREATE) eb.creates++;
      else if (log.action === AuditAction.UPDATE) eb.updates++;
      else eb.deletes++;
    }

    const byAction = {
      [AuditAction.CREATE]: this.logs.filter((l) => l.action === AuditAction.CREATE).length,
      [AuditAction.UPDATE]: this.logs.filter((l) => l.action === AuditAction.UPDATE).length,
      [AuditAction.DELETE]: this.logs.filter((l) => l.action === AuditAction.DELETE).length,
    };

    return {
      totalLogs:  this.logs.length,
      last30Days: [...dayMap.values()].sort((a, b) => a.date.localeCompare(b.date)),
      byEntity:   [...entityMap.values()].sort((a, b) => b.total - a.total),
      byAction,
    };
  }
}
