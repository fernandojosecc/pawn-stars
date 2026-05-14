'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Bookmark,
  GitCompare,
  FileText,
  Menu,
  X,
  Crosshair,
} from 'lucide-react';

const navItems = [
  { href: '/scouting/players',    label: 'Player Search', icon: Search     },
  { href: '/scouting/shortlists', label: 'Shortlists',    icon: Bookmark   },
  { href: '/scouting/compare',    label: 'Compare',       icon: GitCompare },
  { href: '/scouting/reports',    label: 'Reports',       icon: FileText, disabled: true },
];

interface ScoutingSidebarProps {
  role: 'coach' | 'analyst';
}

export default function ScoutingSidebar({ role }: ScoutingSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 h-14 bg-white border-b border-primary-200">
        <div className="flex items-center gap-2">
          <Crosshair size={16} className="text-primary-600" />
          <span className="font-semibold text-sm text-primary-900">Scouting</span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-md text-primary-600 hover:bg-primary-100"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </header>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-60 bg-white border-r border-primary-200 z-50 flex flex-col
          transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-primary-200">
          <div className="flex items-center gap-2">
            <Crosshair size={16} className="text-primary-600" />
            <span className="font-semibold text-sm text-primary-900">Scouting</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-md text-primary-400 hover:bg-primary-100 lg:hidden"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-primary-100">
          <p className="text-xs text-primary-400">Signed in as</p>
          <p className="text-sm font-medium text-primary-700 capitalize">{role}</p>
        </div>

        <nav className="flex-1 p-2">
          {navItems.map(({ href, label, icon: Icon, disabled }) =>
            disabled ? (
              <span
                key={href}
                className="flex items-center justify-between px-3 py-2 rounded-md text-sm mb-0.5 text-primary-300 cursor-not-allowed select-none"
              >
                <span className="flex items-center gap-3">
                  <Icon size={16} />
                  {label}
                </span>
                <span className="text-xs bg-primary-100 text-primary-400 px-1.5 py-0.5 rounded">Soon</span>
              </span>
            ) : (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-md text-sm mb-0.5 transition-colors
                  ${pathname === href || pathname.startsWith(href + '/')
                    ? 'bg-primary-800 text-white font-medium'
                    : 'text-primary-600 hover:bg-primary-100 hover:text-primary-900'}
                `}
              >
                <Icon size={16} />
                {label}
              </Link>
            ),
          )}
        </nav>

        <div className="p-4 border-t border-primary-200">
          <Link href="/" className="block text-xs text-primary-400 hover:text-primary-700 transition-colors">
            ← Public site
          </Link>
        </div>
      </aside>
    </>
  );
}
