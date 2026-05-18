'use client'

import React, { useActionState } from 'react'
import Link from 'next/link'
import { loginAction, type LoginState } from './actions'

const initialState: LoginState = { error: null }

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, initialState)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-carbon">
      {/* Card */}
      <div className="w-full max-w-sm bg-carbon-100 border border-carbon-300 p-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-gold text-2xl">♟</span>
          <span className="font-display text-xl tracking-widest text-white">PAWN STARS</span>
        </div>

        {/* Heading */}
        <h1 className="font-display text-4xl tracking-wide text-white mb-1">SIGN IN</h1>
        <p className="font-mono text-xs tracking-widest text-carbon-700 mb-8">ADMIN PORTAL</p>

        {/* Error */}
        {state.error && (
          <div className="mb-6 border border-red-500/40 bg-red-500/10 px-4 py-3">
            <p className="font-mono text-xs text-red-400">{state.error}</p>
          </div>
        )}

        {/* Form */}
        <form action={action} className="space-y-5">
          <div>
            <label htmlFor="email" className="block font-mono text-[10px] tracking-widest text-carbon-700 mb-2">
              EMAIL
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              defaultValue=""
              className="w-full bg-carbon-50 border border-carbon-300 px-3 py-2.5 font-sans text-sm text-white placeholder:text-carbon-600 focus:outline-none focus:border-gold transition-colors"
              placeholder="admin@pawnstars.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-mono text-[10px] tracking-widest text-carbon-700 mb-2">
              PASSWORD
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              defaultValue=""
              className="w-full bg-carbon-50 border border-carbon-300 px-3 py-2.5 font-sans text-sm text-white placeholder:text-carbon-600 focus:outline-none focus:border-gold transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full mt-2 border border-gold bg-gold text-carbon font-mono text-xs tracking-widest py-3 hover:bg-gold-600 hover:border-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? 'SIGNING IN…' : 'SIGN IN'}
          </button>
        </form>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link href="/" className="font-mono text-[10px] tracking-widest text-carbon-700 hover:text-white transition-colors">
            ← BACK TO SITE
          </Link>
        </div>
      </div>
    </div>
  )
}
