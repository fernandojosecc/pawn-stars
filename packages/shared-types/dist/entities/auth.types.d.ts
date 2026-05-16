export type UserRole = 'admin' | 'content_manager' | 'coach' | 'analyst' | 'player';
export interface JwtPayload {
    sub: string;
    email: string;
    role: UserRole;
    iat?: number;
    exp?: number;
}
export interface AuthUser {
    id: string;
    email: string;
    role: UserRole;
}
//# sourceMappingURL=auth.types.d.ts.map