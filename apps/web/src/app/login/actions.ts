'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const ADMIN_EMAIL = 'admin@pawnstars.com'
const ADMIN_PASSWORD = 'admin123'

function buildJwt(email: string, role: string): string {
  const b64url = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString('base64url')

  const header = b64url({ alg: 'HS256', typ: 'JWT' })
  const payload = b64url({
    sub: '1',
    email,
    role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  })
  const signature = Buffer.from('pawnstars-secret').toString('base64url')

  return `${header}.${payload}.${signature}`
}

export interface LoginState {
  error: string | null
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = (formData.get('email') as string | null)?.trim() ?? ''
  const password = (formData.get('password') as string | null) ?? ''

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return { error: 'Invalid email or password.' }
  }

  const token = buildJwt(email, 'admin')

  const cookieStore = await cookies()
  cookieStore.set('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  redirect('/admin')
}
