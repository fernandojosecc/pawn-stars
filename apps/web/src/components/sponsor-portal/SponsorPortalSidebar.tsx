'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { Sponsor } from '@pawn-stars/shared-types';

const TIER_LABEL: Record<string, string> = {
  title: 'Title Sponsor',
  gold: 'Gold Sponsor',
  silver: 'Silver Sponsor',
  partner: 'Partner',
};

const TIER_COLOR: Record<string, string> = {
  title: 'bg-accent-500 text-white',
  gold: 'bg-yellow-400 text-yellow-900',
  silver: 'bg-primary-300 text-primary-800',
  partner: 'bg-primary-100 text-primary-700',
};

const NAV = [
  { href: '/sponsor-portal/dashboard', label: 'Dashboard', icon: '◈' },
  { href: '/sponsor-portal/reports', label: 'Campaign Reports', icon: '◎' },
  { href: '/sponsor-portal/reach', label: 'Reach Metrics', icon: '◉' },
  { href: '/sponsor-portal/assets', label: 'Brand Assets', icon: '◫' },
  { href: '/sponsor-portal/contact', label: 'Contact', icon: '◌' },
];

interface Props {
  sponsor: Sponsor;
}

export default function SponsorPortalSidebar({ sponsor }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navContent = (
    <nav className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-primary-200">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-accent-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {sponsor.logoText ?? sponsor.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-primary-900 text-sm truncate">{sponsor.name}</p>
            <span className={`inline-block mt-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${TIER_COLOR[sponsor.tier] ?? TIER_COLOR['partner']}`}>
              {TIER_LABEL[sponsor.tier] ?? sponsor.tier}
            </span>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <ul className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-accent-50 text-accent-700 border border-accent-200'
                    : 'text-primary-600 hover:bg-primary-50 hover:text-primary-900'
                }`}
              >
                <span className="text-base leading-none">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-primary-200">
        <p className="text-xs text-primary-400">Partner since {sponsor.since ?? '—'}</p>
        <Link href="/" className="mt-1 block text-xs text-primary-400 hover:text-primary-700">
          ← Public site
        </Link>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between bg-white border-b border-primary-200 px-4 h-14 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-accent-500 flex items-center justify-center text-white font-bold text-xs">
            {sponsor.logoText ?? sponsor.name.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-sm font-semibold text-primary-900 truncate max-w-[160px]">{sponsor.name}</span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-md hover:bg-primary-100 text-primary-600"
          aria-label="Open menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-30 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative w-72 bg-white h-full overflow-y-auto shadow-xl">
            <div className="flex items-center justify-end px-4 pt-4 pb-2">
              <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-primary-100 text-primary-500" aria-label="Close menu">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {navContent}
          </div>
        </div>
      )}

      {/* Desktop fixed sidebar */}
      <div className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-64 bg-white border-r border-primary-200 z-10">
        {navContent}
      </div>
    </>
  );
}
