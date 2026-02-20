'use client';

import { useState, useCallback, type ReactNode } from 'react';
import { MobileStatusBar } from './mobile-status-bar';
import { ThemeToggle } from '../theme-toggle';

type WindowId = 'welcome' | 'about' | 'contact' | 'settings';

interface MobileShellProps {
  children: (openWindow: (id: string) => void, closeWindow: () => void) => Record<WindowId, ReactNode>;
}

const homeApps: { id: WindowId; icon: string; label: string }[] = [
  { id: 'welcome', icon: '🏠', label: 'Welcome' },
  { id: 'about', icon: '📜', label: 'About' },
  { id: 'contact', icon: '📧', label: 'Contact' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
];

export function MobileShell({ children }: MobileShellProps) {
  const [activeApp, setActiveApp] = useState<WindowId | null>(null);

  const openApp = useCallback((id: WindowId | string) => {
    if (homeApps.some((a) => a.id === id)) {
      setActiveApp(id as WindowId);
    }
  }, []);
  const closeApp = () => setActiveApp(null);

  const windows = children(openApp, closeApp);

  return (
    <div className="mobile-os">
      <MobileStatusBar />

      {/* Full-screen app view */}
      {activeApp && windows[activeApp] && (
        <div className="mobile-app-fullscreen">
          <div className="mobile-app-header">
            <div className="mobile-traffic-light">
              <button
                className="mobile-close-btn"
                onClick={closeApp}
                aria-label="Close"
              />
            </div>
            <span className="mobile-app-title">
              {homeApps.find((a) => a.id === activeApp)?.label}
            </span>
            <span className="w-8" />
          </div>
          <div className="mobile-app-content">
            {windows[activeApp]}
          </div>
        </div>
      )}

      {/* Home screen */}
      {!activeApp && (
        <div className="mobile-homescreen">
          <div className="mobile-lockscreen-header">
            <div className="text-5xl">💻</div>
            <h1 className="mobile-lockscreen-title">My OS</h1>
            <p className="mobile-lockscreen-subtitle">A retro desktop experience</p>
          </div>

          <div className="mobile-app-grid">
            {homeApps.map((app) => (
              <button
                key={app.id}
                className="mobile-app-icon"
                onClick={() => openApp(app.id)}
              >
                <div className="mobile-app-icon-img">{app.icon}</div>
                <span className="mobile-app-label">{app.label}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-center py-4">
            <ThemeToggle />
          </div>
        </div>
      )}

      {/* Home indicator */}
      {!activeApp && (
        <div className="mobile-home-indicator">
          <div className="mobile-home-bar" />
        </div>
      )}
    </div>
  );
}
