'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

function getTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { days, hours, minutes };
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => getTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 60_000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!timeLeft) {
    return <span className="text-sm text-accent-600 font-medium">Starting now</span>;
  }

  return (
    <div className="flex items-center gap-3">
      {[
        { value: timeLeft.days,    label: 'days'    },
        { value: timeLeft.hours,   label: 'hrs'     },
        { value: timeLeft.minutes, label: 'min'     },
      ].map(({ value, label }) => (
        <div key={label} className="text-center">
          <div className="bg-primary-800 text-white text-lg font-bold w-12 h-12 flex items-center justify-center rounded-md">
            {String(value).padStart(2, '0')}
          </div>
          <p className="text-xs text-primary-400 mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
}
