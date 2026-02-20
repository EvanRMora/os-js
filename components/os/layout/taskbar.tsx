'use client';

import { useState, useEffect } from 'react';
import { MenuBar } from './start-menu';

type WindowId = 'welcome' | 'about' | 'contact' | 'settings';

const dockItems: { id: WindowId; icon: string; label: string }[] = [
  { id: 'welcome', icon: '🏠', label: 'Welcome' },
  { id: 'about', icon: '📜', label: 'About' },
  { id: 'contact', icon: '📧', label: 'Contact' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
];

export function Taskbar({
  dockOnClick,
}: {
  dockOnClick?: (id: WindowId) => void;
}) {
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
    <>
      {/* Menu Bar (top) */}
      <div className="mac-menubar">
        <div className="flex items-center">
          <MenuBar openWindow={dockOnClick} />
        </div>
        <div className="mac-menubar-right">
          <span className="mac-menubar-clock">{time}</span>
        </div>
      </div>

      {/* Dock (bottom) */}
      <div className="mac-dock-container">
        <div className="mac-dock">
          {dockItems.map((item) => (
            <button
              key={item.id}
              className="mac-dock-item"
              title={item.label}
              onClick={() => dockOnClick?.(item.id)}
            >
              <span className="mac-dock-icon">{item.icon}</span>
              <span className="mac-dock-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
