'use client';

import { useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import { mockPortalNotifications } from '@/lib/mock/portal';
import type { PortalNotification, PortalNotificationType } from '@pawn-stars/shared-types';

const typeLabel: Record<PortalNotificationType, string> = {
  match_result:      'Match Result',
  round_complete:    'Round',
  team_announcement: 'Announcement',
  trial_status:      'Trial',
};

const typeDot: Record<PortalNotificationType, string> = {
  match_result:      'bg-accent-500',
  round_complete:    'bg-primary-500',
  team_announcement: 'bg-success-500',
  trial_status:      'bg-primary-400',
};

function timeAgo(date: Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60_000);
  const hours   = Math.floor(diff / 3_600_000);
  const days    = Math.floor(diff / 86_400_000);
  if (days > 0)    return `${days}d ago`;
  if (hours > 0)   return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'just now';
}

export default function PortalNotificationsPage() {
  const [items, setItems] = useState<PortalNotification[]>(mockPortalNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = items.filter((n) => !n.read).length;

  const filtered = filter === 'unread' ? items.filter((n) => !n.read) : items;

  function markRead(id: string) {
    setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  }

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-primary-900">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-accent-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-xs text-primary-500 hover:text-primary-800 transition-colors"
          >
            <CheckCheck size={14} />
            Mark all read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'unread'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors
              ${filter === f
                ? 'bg-primary-800 text-white'
                : 'bg-white border border-primary-200 text-primary-600 hover:bg-primary-50'}`}
          >
            {f === 'all' ? `All (${items.length})` : `Unread (${unreadCount})`}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="bg-white border border-primary-200 rounded-lg py-12 text-center">
            <Bell size={32} className="mx-auto text-primary-200 mb-2" />
            <p className="text-sm text-primary-400">No notifications here.</p>
          </div>
        )}

        {filtered.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white border rounded-lg p-4 flex gap-4 transition-colors ${
              notification.read
                ? 'border-primary-200'
                : 'border-l-4 border-l-accent-400 border-primary-200'
            }`}
          >
            <div className="flex flex-col items-center pt-1">
              <div className={`w-2.5 h-2.5 rounded-full ${typeDot[notification.type]}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-block text-xs bg-primary-100 text-primary-600 px-1.5 py-0.5 rounded mb-1">
                    {typeLabel[notification.type]}
                  </span>
                  <p className={`text-sm ${notification.read ? 'text-primary-700' : 'font-semibold text-primary-900'}`}>
                    {notification.title}
                  </p>
                  <p className="text-xs text-primary-500 mt-1">{notification.body}</p>
                </div>
                <span className="text-xs text-primary-400 whitespace-nowrap flex-shrink-0">
                  {timeAgo(notification.createdAt)}
                </span>
              </div>
              {!notification.read && (
                <button
                  onClick={() => markRead(notification.id)}
                  className="mt-2 text-xs text-primary-400 hover:text-primary-700 transition-colors"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
