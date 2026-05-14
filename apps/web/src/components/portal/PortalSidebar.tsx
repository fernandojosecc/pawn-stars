'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ChartBar,
  Calendar,
  BookOpen,
  Bell,
  Menu,
  X,
  User,
} from 'lucide-react';

const navItems = [
  { href: '/portal/dashboard', label: 'Dashboard',        icon: LayoutDashboard },
  { href: '/portal/stats',     label: 'My Stats',         icon: ChartBar },
  { href: '/portal/schedule',  label: 'My Schedule',      icon: Calendar },
  { href: '/portal/study',     label: 'Study Material',   icon: BookOpen },
  { href: '/portal/notifications', label: 'Notifications', icon: Bell },
];

interface PortalSidebarProps {
  playerName: string;
  playerTitle?: string;
  unreadCount?: number;
}

export default function PortalSidebar({ playerName, playerTitle, unreadCount = 0 }: PortalSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 h-14 bg-primary-800 text-white">
        <span className="font-semibold text-sm">Player Portal</span>
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-md hover:bg-primary-700"
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
          fixed top-0 left-0 h-full w-60 bg-primary-800 text-white z-50
          flex flex-col
          transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-primary-700">
          <span className="font-semibold text-sm">Player Portal</span>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-md hover:bg-primary-700 lg:hidden"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        {/* Player identity */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-primary-700">
          <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
            <User size={14} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">
              {playerTitle && <span className="text-accent-400 mr-1">{playerTitle}</span>}
              {playerName}
            </p>
            <p className="text-xs text-primary-400">Player</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            const isNotifications = href === '/portal/notifications';
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center justify-between px-3 py-2 rounded-md text-sm mb-0.5 transition-colors
                  ${active
                    ? 'bg-primary-700 text-white font-medium'
                    : 'text-primary-300 hover:bg-primary-700 hover:text-white'}
                `}
              >
                <span className="flex items-center gap-3">
                  <Icon size={16} />
                  {label}
                </span>
                {isNotifications && unreadCount > 0 && (
                  <span className="bg-accent-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Back to site */}
        <div className="p-4 border-t border-primary-700">
          <Link
            href="/"
            className="block text-xs text-primary-400 hover:text-primary-200 transition-colors"
          >
            ← Back to public site
          </Link>
        </div>
      </aside>
    </>
  );
}
