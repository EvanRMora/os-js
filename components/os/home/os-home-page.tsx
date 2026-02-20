'use client';

import { useState, useCallback, useEffect, type ReactNode } from 'react';
import { Welcome } from './welcome';
import { About } from './about';
import { Contact } from './contact';
import { Settings } from './settings';
import { DesktopIcon } from '../desktop-icon';
import { Taskbar } from '../layout/taskbar';
import { MobileShell } from '../layout/mobile-shell';
import { PipBoyShell } from '../layout/pip-boy-shell';
import { useIsMobile } from 'lib/hooks/use-is-mobile';
import { useTheme } from 'lib/theme';

type WindowId = 'welcome' | 'about' | 'contact' | 'settings';

const allWindows: WindowId[] = ['welcome', 'about', 'contact', 'settings'];

const desktopIcons: { id: WindowId; icon: string; label: string }[] = [
  { id: 'welcome', icon: '🏠', label: 'Welcome' },
  { id: 'about', icon: '📜', label: 'About' },
  { id: 'contact', icon: '📧', label: 'Contact' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
];

export function OSHomePage() {
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const [openWindows, setOpenWindows] = useState<Set<WindowId>>(new Set(['welcome']));
  const [focusOrder, setFocusOrder] = useState<WindowId[]>([...allWindows]);

  const closeWindow = useCallback((id: WindowId) => {
    setOpenWindows((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const openWindow = useCallback((id: WindowId) => {
    setOpenWindows((prev) => new Set(prev).add(id));
    setFocusOrder((prev) => [...prev.filter((w) => w !== id), id]);
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    setFocusOrder((prev) => [...prev.filter((w) => w !== id), id]);
  }, []);

  const getZ = (id: WindowId) => focusOrder.indexOf(id) + 10;

  // Fallout → full Pip-Boy shell
  if (theme === 'fallout') {
    return <PipBoyShell />;
  }

  if (isMobile) {
    return (
      <MobileShell>
        {(openWindow, closeWindow) => ({
          welcome: <Welcome />,
          about: <About />,
          contact: <Contact onClose={closeWindow} />,
          settings: <Settings />,
        })}
      </MobileShell>
    );
  }

  return (
    <div className="retro-desktop">
      <Taskbar dockOnClick={openWindow} />

      {/* Desktop icons */}
      <div
        className="absolute right-4 top-[36px] z-[1] flex flex-col flex-wrap gap-2 pt-3"
        style={{ maxHeight: 'calc(100vh - 120px)' }}
      >
        {desktopIcons.map((item) => (
          <DesktopIcon
            key={item.id}
            icon={item.icon}
            label={item.label}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              openWindow(item.id);
            }}
          />
        ))}
      </div>

      {/* Windows */}
      <div className="relative min-h-screen pt-[28px] pb-[80px]">
        {openWindows.has('welcome') && (
          <Welcome
            onClose={() => closeWindow('welcome')}
            onFocus={() => focusWindow('welcome')}
            zIndex={getZ('welcome')}
            onOpenWindow={(id) => openWindow(id as WindowId)}
          />
        )}
        {openWindows.has('about') && (
          <About
            onClose={() => closeWindow('about')}
            onFocus={() => focusWindow('about')}
            zIndex={getZ('about')}
          />
        )}
        {openWindows.has('contact') && (
          <Contact
            onClose={() => closeWindow('contact')}
            onFocus={() => focusWindow('contact')}
            zIndex={getZ('contact')}
          />
        )}
        {openWindows.has('settings') && (
          <Settings
            onClose={() => closeWindow('settings')}
            onFocus={() => focusWindow('settings')}
            zIndex={getZ('settings')}
          />
        )}
      </div>
    </div>
  );
}
