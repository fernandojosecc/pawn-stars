'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Trophy,
  Newspaper,
  ClipboardList,
  Swords,
  Star,
  ScrollText,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/players', label: 'Players', icon: Users },
  { href: '/admin/tournaments', label: 'Tournaments', icon: Trophy },
  { href: '/admin/news', label: 'News', icon: Newspaper },
  { href: '/admin/article-generator', label: 'AI Article Gen', icon: Sparkles },
  { href: '/admin/applications', label: 'Applications', icon: ClipboardList },
  { href: '/admin/matches', label: 'Matches', icon: Swords },
  { href: '/admin/sponsors', label: 'Sponsors', icon: Star },
  { href: '/admin/audit-logs', label: 'Audit Logs', icon: ScrollText },
];

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 h-14 bg-white border-b border-primary-200">
        <span className="font-semibold text-primary-900 text-sm">Pawn Stars Admin</span>
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-md text-primary-600 hover:bg-primary-100"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-60 bg-white border-r border-primary-200 z-50
          transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-primary-200">
          <span className="font-semibold text-primary-900 text-sm">Pawn Stars Admin</span>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-md text-primary-500 hover:bg-primary-100 lg:hidden"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="p-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-md text-sm mb-0.5 transition-colors
                  ${active
                    ? 'bg-primary-800 text-white font-medium'
                    : 'text-primary-600 hover:bg-primary-100 hover:text-primary-900'}
                `}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
