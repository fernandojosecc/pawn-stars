import { NextRequest, NextResponse } from 'next/server';

type UserRole = 'admin' | 'content_manager' | 'coach' | 'analyst' | 'player';

interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  exp?: number;
}

function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1];
    if (!payload) return null;
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    const data = JSON.parse(decoded) as Record<string, unknown>;
    if (typeof data['exp'] === 'number' && Date.now() / 1000 > data['exp']) {
      return null;
    }
    return data as unknown as JwtPayload;
  } catch {
    return null;
  }
}

function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) return authHeader.slice(7);
  const cookie = req.cookies.get('access_token');
  return cookie?.value ?? null;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isPortalRoute = pathname.startsWith('/portal');
  const isScoutingRoute = pathname.startsWith('/scouting');

  if (!isAdminRoute && !isPortalRoute && !isScoutingRoute) {
    return NextResponse.next();
  }

  const token = getTokenFromRequest(req);

  if (!token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const payload = decodeJwtPayload(token);

  if (!payload) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && payload.role !== 'admin') {
    return NextResponse.redirect(new URL('/403', req.url));
  }

  if (isPortalRoute && payload.role !== 'player') {
    return NextResponse.redirect(new URL('/403', req.url));
  }

  if (isScoutingRoute && payload.role !== 'coach' && payload.role !== 'analyst') {
    return NextResponse.redirect(new URL('/403', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/portal/:path*', '/scouting/:path*'],
};
