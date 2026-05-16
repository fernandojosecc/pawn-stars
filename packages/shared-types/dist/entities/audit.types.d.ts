export declare enum AuditAction {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE"
}
export interface AuditLog {
    id: string;
    entity: string;
    entityId: string;
    action: AuditAction;
    userId: string;
    userEmail: string;
    ipAddress: string;
    timestamp: string;
    summary: string;
    before?: Record<string, unknown>;
    after?: Record<string, unknown>;
}
export interface AuditDayCount {
    date: string;
    creates: number;
    updates: number;
    deletes: number;
}
export interface AuditEntityBreakdown {
    entity: string;
    creates: number;
    updates: number;
    deletes: number;
    total: number;
}
export interface AuditStats {
    totalLogs: number;
    last30Days: AuditDayCount[];
    byEntity: AuditEntityBreakdown[];
    byAction: Record<AuditAction, number>;
}
//# sourceMappingURL=audit.types.d.ts.map