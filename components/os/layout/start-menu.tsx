'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'lib/theme';

type WindowId = 'welcome' | 'about' | 'contact' | 'settings';

interface MenuItem {
  icon?: string;
  label: string;
  href?: string;
  shortcut?: string;
  divider?: boolean;
  onClick?: () => void;
  windowId?: WindowId;
}

interface MenuDropdown {
  label: string;
  items: MenuItem[];
}

function buildMenus(openWindow?: (id: WindowId) => void, switchToModern?: () => void): MenuDropdown[] {
  const rawMenus: { label: string; items: (MenuItem & { windowId?: WindowId })[] }[] = [
    {
      label: '💻',
      items: [
        { label: 'About This Site', windowId: 'about' },
        { divider: true, label: '' },
        { label: 'Welcome', icon: '🏠', windowId: 'welcome' },
        { label: 'Contact', icon: '📧', windowId: 'contact' },
        { label: 'Settings', icon: '⚙️', windowId: 'settings' },
      ],
    },
    {
      label: 'File',
      items: [
        { label: 'New Window', shortcut: '⌘N' },
        { divider: true, label: '' },
        { label: 'Close Window', shortcut: '⌘W' },
      ],
    },
    {
      label: 'View',
      items: [
        { label: 'Switch to Modern', shortcut: '⌘T', onClick: switchToModern },
      ],
    },
    {
      label: 'Help',
      items: [
        { label: 'About', icon: '📜', windowId: 'about' },
        { label: 'Contact', icon: '📬', windowId: 'contact' },
      ],
    },
  ];

  return rawMenus.map((menu) => ({
    label: menu.label,
    items: menu.items.map(({ windowId, ...item }): MenuItem => ({
      ...item,
      onClick: windowId ? () => openWindow?.(windowId) : item.onClick,
    })),
  }));
}

function MenuBarDropdown({
  menu,
  isOpen,
  onToggle,
  onClose,
}: {
  menu: MenuDropdown;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={ref}>
      <button
        className={`mac-menubar-item ${isOpen ? 'mac-menubar-item-active' : ''}`}
        onClick={onToggle}
        onMouseEnter={(e) => {
          const parent = (e.target as HTMLElement).closest('.mac-menubar-items');
          if (parent?.querySelector('.mac-menubar-item-active')) {
            onToggle();
          }
        }}
      >
        {menu.label}
      </button>
      {isOpen && (
        <div className="mac-dropdown">
          {menu.items.map((item, i) => {
            if (item.divider) {
              return <div key={i} className="mac-dropdown-divider" />;
            }
            if (item.href) {
              return (
                <Link key={i} href={item.href} className="mac-dropdown-item" onClick={onClose}>
                  <span className="flex items-center gap-2">
                    {item.icon && <span>{item.icon}</span>}
                    {item.label}
                  </span>
                  {item.shortcut && <span className="mac-shortcut">{item.shortcut}</span>}
                </Link>
              );
            }
            return (
              <button key={i} className="mac-dropdown-item" onClick={() => { item.onClick?.(); onClose(); }}>
                <span className="flex items-center gap-2">
                  {item.icon && <span>{item.icon}</span>}
                  {item.label}
                </span>
                {item.shortcut && <span className="mac-shortcut">{item.shortcut}</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function MenuBar({ openWindow }: { openWindow?: (id: WindowId) => void }) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const { setTheme } = useTheme();
  const menus = buildMenus(openWindow, () => setTheme('modern'));

  return (
    <div className="mac-menubar-items">
      {menus.map((menu, i) => (
        <MenuBarDropdown
          key={menu.label}
          menu={menu}
          isOpen={openMenu === i}
          onToggle={() => setOpenMenu(openMenu === i ? null : i)}
          onClose={() => setOpenMenu(null)}
        />
      ))}
    </div>
  );
}
