import type { Metadata } from 'next';
import CountdownTimer from '@/components/portal/CountdownTimer';
import { mockPortalSchedule, mockNextMatch } from '@/lib/mock/portal';
import type { ScheduleEvent } from '@pawn-stars/shared-types';

export const metadata: Metadata = { title: 'My Schedule' };

const typeStyle: Record<string, { dot: string; label: string }> = {
  match:      { dot: 'bg-primary-700',  label: 'Match'         },
  tournament: { dot: 'bg-accent-500',   label: 'Tournament'    },
  training:   { dot: 'bg-success-500',  label: 'Training'      },
  media:      { dot: 'bg-primary-400',  label: 'Media'         },
};

function formatEventDate(date: string, startTime?: string) {
  const d = new Date(date);
  const dateStr = d.toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  });
  return startTime ? `${dateStr} · ${startTime}` : dateStr;
}

function daysUntil(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function EventCard({ event }: { event: ScheduleEvent }) {
  const style = typeStyle[event.type] ?? typeStyle.match;
  const days  = daysUntil(event.date);

  return (
    <div className="bg-white border border-primary-200 rounded-lg p-4 flex gap-4">
      <div className="flex flex-col items-center pt-1">
        <div className={`w-2.5 h-2.5 rounded-full mt-1 ${style.dot}`} />
        <div className="w-px flex-1 bg-primary-100 mt-2" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className={`inline-block text-xs font-medium px-1.5 py-0.5 rounded mb-1 ${style.dot.replace('bg-', 'bg-').replace('-700', '-100').replace('-500', '-100').replace('-400', '-100')} text-primary-700`}>
              {style.label}
            </span>
            <p className="font-medium text-primary-900 text-sm">{event.title}</p>
            {event.subtitle && (
              <p className="text-xs text-primary-500 mt-0.5">{event.subtitle}</p>
            )}
          </div>
          {days <= 7 && days > 0 && (
            <span className="text-xs font-semibold text-accent-600 bg-accent-50 px-2 py-0.5 rounded-full whitespace-nowrap">
              In {days}d
            </span>
          )}
          {days === 0 && (
            <span className="text-xs font-semibold text-success-600 bg-success-50 px-2 py-0.5 rounded-full whitespace-nowrap">
              Today
            </span>
          )}
        </div>
        <p className="text-xs text-primary-400 mt-2">
          {formatEventDate(event.date, event.startTime)}
          {event.location && ` · ${event.location}`}
        </p>
      </div>
    </div>
  );
}

export default function PortalSchedulePage() {
  const sorted = [...mockPortalSchedule].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-lg font-semibold text-primary-900">My Schedule</h1>

      {/* Next event countdown */}
      <div className="bg-primary-800 text-white rounded-lg p-5">
        <p className="text-xs text-primary-300 uppercase tracking-wide font-medium mb-1">Next Match</p>
        <p className="font-semibold text-lg mb-1">{mockNextMatch.event}</p>
        <p className="text-sm text-primary-300 mb-4">
          vs. {mockNextMatch.opponentTitle} {mockNextMatch.opponent} ·{' '}
          Board {mockNextMatch.board} · {mockNextMatch.side} · {mockNextMatch.venue}
        </p>
        <CountdownTimer targetDate={mockNextMatch.date} />
      </div>

      {/* Event list */}
      <div>
        <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-3">
          Upcoming Events ({sorted.length})
        </h2>
        <div className="space-y-3">
          {sorted.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
