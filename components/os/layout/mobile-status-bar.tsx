'use client';

import { useState, useEffect } from 'react';

export function MobileStatusBar() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
      );
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mobile-status-bar">
      <span className="font-bold">{time}</span>
      <div className="flex items-center gap-1">
        <span>💻</span>
        <span className="text-[10px]">▂▄▆█</span>
        <span className="text-[10px]">🔋</span>
      </div>
    </div>
  );
}
