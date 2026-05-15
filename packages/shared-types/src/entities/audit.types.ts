export enum AuditAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface AuditLog {
  id: string
  entity: string                      // e.g. 'Player', 'Tournament', 'News'
  entityId: string
  action: AuditAction
  userId: string
  userEmail: string
  ipAddress: string
  timestamp: string                   // ISO
  summary: string                     // human-readable one-liner
  before?: Record<string, unknown>    // snapshot before mutation
  after?: Record<string, unknown>     // snapshot after mutation
}

export interface AuditDayCount {
  date: string                        // YYYY-MM-DD
  creates: number
  updates: number
  deletes: number
}

export interface AuditEntityBreakdown {
  entity: string
  creates: number
  updates: number
  deletes: number
  total: number
}

export interface AuditStats {
  totalLogs: number
  last30Days: AuditDayCount[]
  byEntity: AuditEntityBreakdown[]
  byAction: Record<AuditAction, number>
}
