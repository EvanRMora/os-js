# OS-JS: Retro Desktop OS Website Boilerplate

A Next.js boilerplate for building websites themed as a retro macOS-style desktop operating system. Features draggable windows, a dock, menu bar, mobile shell, and theme switching.


---

## Quick Start

```bash
cd os-js
pnpm install
pnpm dev
```

Visit `http://localhost:3000`

---

## Architecture

```
os-js/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout with ThemeProvider
│   ├── page.tsx              # Homepage with theme switching
│   └── globals.css           # All retro OS styles
├── components/os/
│   ├── window/
│   │   ├── window.tsx        # Draggable, resizable window primitive
│   │   └── browser-window.tsx # Window with built-in browser (URL bar, nav)
│   ├── layout/
│   │   ├── taskbar.tsx       # Menu bar (top) + Dock (bottom)
│   │   ├── start-menu.tsx    # Dropdown menu system (☰ File View Help)
│   │   ├── mobile-shell.tsx  # iOS-style mobile app grid + fullscreen views
│   │   └── desktop.tsx       # Desktop wrapper (icons grid + wallpaper)
│   ├── home/
│   │   ├── os-home-page.tsx  # Window manager (open/close/focus ordering)
│   │   ├── welcome.tsx       # Welcome dialog window
│   │   ├── about.tsx         # About/README window
│   │   ├── contact.tsx       # Contact form window
│   │   └── settings.tsx      # Settings/preferences window
│   ├── desktop-icon.tsx      # Clickable desktop icon (emoji or image)
│   ├── theme-toggle.tsx      # Retro/Modern toggle button
│   ├── theme-shell.tsx       # Conditionally renders retro or modern
│   ├── theme-layout.tsx      # Hides navbar in retro mode
│   └── wallpaper.tsx         # Ambient background animations (optional)
├── lib/
│   ├── theme/
│   │   ├── constants.ts      # Theme types + defaults
│   │   ├── context.tsx       # ThemeProvider (localStorage + data-theme)
│   │   ├── use-theme.ts      # useTheme() hook
│   │   └── index.ts          # Barrel export
│   └── hooks/
│       └── use-is-mobile.ts  # useIsMobile() media query hook
├── public/images/icons/      # Desktop + dock icon assets
├── package.json
├── next.config.ts
└── tsconfig.json
```

---

## Core Concepts

### 1. Window System (`components/os/window/`)

Every content area is a **Window** — a draggable, closable, minimizable, maximizable container with macOS-style traffic light buttons.

```tsx
import { Window } from 'components/os/window/window';

<Window
  title="My Window"
  icon="📄"
  defaultPosition={{ x: 100, y: 80 }}
  defaultSize={{ width: 480, height: 'auto' }}
  onClose={() => closeWindow('my-window')}
  onFocus={() => focusWindow('my-window')}
  zIndex={getZ('my-window')}
>
  <p>Your content here</p>
</Window>
```

**BrowserWindow** wraps Window and adds a fake browser chrome with back/forward/refresh, a URL bar, and page routing:

```tsx
import { BrowserWindow } from 'components/os/window/browser-window';

<BrowserWindow
  title="Gallery"
  url="http://mysite.com/gallery"
  pages={{
    'http://mysite.com/gallery/photo-1': <PhotoDetail id="1" />,
    'http://mysite.com/gallery/photo-2': <PhotoDetail id="2" />,
  }}
>
  <GalleryGrid /> {/* Default/home content */}
</BrowserWindow>
```

### 2. Window Manager (`components/os/home/os-home-page.tsx`)

Manages which windows are open, their focus/z-order, and wiring close/focus callbacks. This is the main orchestrator.

```tsx
type WindowId = 'welcome' | 'about' | 'contact' | 'settings';

// State
const [openWindows, setOpenWindows] = useState<Set<WindowId>>(new Set(['welcome']));
const [focusOrder, setFocusOrder] = useState<WindowId[]>([...allWindows]);

// Operations
const openWindow = (id) => setOpenWindows(prev => new Set(prev).add(id));
const closeWindow = (id) => { /* remove from set */ };
const focusWindow = (id) => { /* move to end of focusOrder */ };
const getZ = (id) => focusOrder.indexOf(id) + 10;
```

### 3. Desktop Shell (`components/os/layout/`)

- **Taskbar**: macOS menu bar at top (logo, dropdown menus, clock) + dock at bottom (icon shortcuts)
- **Start Menu**: Dropdown menus (File, View, Help) with keyboard shortcuts displayed
- **Desktop**: Right-aligned icon grid for quick access
- **Mobile Shell**: On small screens, switches to iOS-style app grid with fullscreen window views

### 4. Theme System (`lib/theme/`)

Supports switching between `retro` (OS desktop) and `modern` (standard website). Theme is persisted in localStorage and applied via `data-theme` attribute on `<html>`.

```tsx
const { theme, setTheme, mounted } = useTheme();
```

---

## Customization Checklist

When spinning up a new site, modify these files:

### Identity & Branding
- [ ] `lib/theme/constants.ts` — Change `THEME_STORAGE_KEY` from `'os-theme'` to your brand
- [ ] `components/os/layout/taskbar.tsx` — Replace logo, dock items, brand name
- [ ] `components/os/layout/start-menu.tsx` — Replace menu labels ("About [Brand]", etc.)
- [ ] `components/os/layout/mobile-shell.tsx` — Replace app list, brand name, tagline
- [ ] `components/os/layout/desktop.tsx` — Replace desktop icon list
- [ ] `app/globals.css` — Adjust `--color-retro-*` CSS variables for your palette

### Content Windows
- [ ] `components/os/home/welcome.tsx` — Your welcome/splash screen
- [ ] `components/os/home/about.tsx` — Your about/story content
- [ ] `components/os/home/contact.tsx` — Your contact form
- [ ] `components/os/home/settings.tsx` — User preferences
- [ ] Add new windows: Create component, add WindowId, wire into os-home-page.tsx

### Ambient/Fun
- [ ] `components/os/wallpaper.tsx` — Replace or remove background animations
- [ ] `public/images/icons/` — Replace icon assets

---

## CSS Variables (Retro Theme)

```css
:root {
  --color-retro-bg: #2A623D;        /* Desktop wallpaper */
  --color-retro-window: #c0c0c0;    /* Window chrome */
  --color-retro-window-body: #ffffff;
  --color-retro-titlebar: #e8e8e8;
  --color-retro-titlebar-text: #333;
  --color-retro-accent: #D2691E;     /* Accent/highlight */
  --color-retro-border: #888;
  --color-retro-text: #1a1a1a;
  --color-retro-text-secondary: #666;
  --shadow-retro: 1px 1px 0 #888, 2px 2px 0 #666;
  --shadow-retro-inset: inset 1px 1px 3px rgba(0,0,0,0.3);
  --shadow-retro-window: 2px 2px 10px rgba(0,0,0,0.3);
}
```

Override these per-site for different color schemes.

---

## Adding a New Window

1. Create `components/os/home/my-window.tsx`:
```tsx
'use client';
import { Window } from '../window/window';

export function MyWindow({ onClose, onFocus, zIndex }) {
  return (
    <Window title="My Window" icon="🎯" onClose={onClose} onFocus={onFocus} zIndex={zIndex}
      defaultPosition={{ x: 150, y: 100 }} defaultSize={{ width: 400, height: 'auto' }}>
      <p>Hello world</p>
    </Window>
  );
}
```

2. In `os-home-page.tsx`, add `'my-window'` to the `WindowId` union and `allWindows` array.

3. Add the render block:
```tsx
{openWindows.has('my-window') && (
  <MyWindow onClose={() => closeWindow('my-window')}
    onFocus={() => focusWindow('my-window')} zIndex={getZ('my-window')} />
)}
```

4. Add a desktop icon + dock item + menu entry pointing to it.

---

## Mobile Behavior

On screens < 768px, the desktop automatically switches to a mobile shell:
- Status bar with time + brand name
- App grid (icons open fullscreen views)
- Swipe/tap home indicator to return to grid
- Windows render as fullscreen panels

This is handled automatically by `useIsMobile()` in `os-home-page.tsx`.

---

## Tech Stack

- **Next.js 15** (App Router, RSC)
- **TypeScript**
- **Tailwind CSS** + custom retro CSS
- **No external UI libraries** — all window management is vanilla React

---

## Origin

This boilerplate was developed by me as a companion library for Habit Coffee Roasters (www.habitcoffeeroasters.com), which uses a "Coffee OS" retro desktop metaphor. The generic OS shell, window system, dock, menu bar, and mobile shell are all reusable across any site. The business-specific content windows (shop, cart, newsletter) were replaced with generic starters (welcome, about, contact, settings).
