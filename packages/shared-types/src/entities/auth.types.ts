export type UserRole = 'admin' | 'content_manager' | 'coach' | 'analyst' | 'player'

export interface JwtPayload {
  sub:   string    // user ID
  email: string
  role:  UserRole
  iat?:  number    // issued at (Unix seconds)
  exp?:  number    // expires at (Unix seconds)
}

export interface AuthUser {
  id:    string
  email: string
  role:  UserRole
}
