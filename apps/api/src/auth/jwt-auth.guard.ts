import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'crypto';
import type { Request } from 'express';
import type { UserRole } from './roles.decorator';

export interface JwtPayload {
  sub:   string;
  email: string;
  role:  UserRole;
  iat?:  number;
  exp?:  number;
}

function verifyJwt(token: string, secret: string): JwtPayload {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Malformed token');
  const [header, payload, signature] = parts as [string, string, string];

  // Re-compute expected signature (HS256)
  const expected = createHmac('sha256', secret)
    .update(`${header}.${payload}`)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  // Timing-safe comparison to prevent timing attacks
  const sigBuf = Buffer.from(signature, 'base64url');
  const expBuf = Buffer.from(expected, 'base64url');
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
    throw new Error('Invalid signature');
  }

  const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8')) as Record<string, unknown>;

  if (typeof data['exp'] === 'number' && Date.now() / 1000 > data['exp']) {
    throw new Error('Token expired');
  }

  return data as unknown as JwtPayload;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request & { user?: JwtPayload }>();
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or malformed Authorization header');
    }

    const token = authHeader.slice(7);
    const secret = process.env['JWT_SECRET'];

    if (!secret) {
      // Fail secure: if no secret is configured, reject all requests
      throw new UnauthorizedException('Authentication not configured');
    }

    try {
      req.user = verifyJwt(token, secret);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
