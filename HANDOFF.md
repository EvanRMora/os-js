# OS-JS Handoff Document

## Project Overview

**OS-JS** is a reusable Next.js boilerplate that turns any website into a retro macOS-style desktop operating system. It was extracted from the Habit Coffee Roasters site and genericized for reuse.

---

## What's Included

### Core OS Shell (ready to use)
| Component | Path | Description |
|---|---|---|
| **Window** | `components/os/window/window.tsx` | Draggable, closable, minimizable, maximizable window with traffic lights |
| **BrowserWindow** | `components/os/window/browser-window.tsx` | Window with embedded browser (URL bar, back/forward/refresh, page routing) |
| **Taskbar** | `components/os/layout/taskbar.tsx` | macOS menu bar (top) + dock (bottom) with live clock |
| **Start Menu** | `components/os/layout/start-menu.tsx` | Dropdown menu system with keyboard shortcut labels |
| **Mobile Shell** | `components/os/layout/mobile-shell.tsx` | iOS-style home screen with app icons → fullscreen card views |
| **Desktop Icon** | `components/os/desktop-icon.tsx` | Clickable icon (emoji or image) with label |
| **Theme System** | `lib/theme/` | Retro/Modern toggle with localStorage persistence |
| **Theme Toggle** | `components/os/theme-toggle.tsx` | Two-button Retro/Modern switcher |
| **Theme Shell** | `components/os/theme-shell.tsx` | Conditional renderer based on active theme |
| **Theme Layout** | `components/os/theme-layout.tsx` | Hides standard navbar when in retro mode |
| **Wallpaper** | `components/os/wallpaper.tsx` | Ambient star field (replace with your own animations) |
| **useIsMobile** | `lib/hooks/use-is-mobile.ts` | Media query hook (default breakpoint: 768px) |

### Starter Content Windows
| Window | Path | Description |
|---|---|---|
| **Welcome** | `components/os/home/welcome.tsx` | Splash/landing dialog |
| **About** | `components/os/home/about.tsx` | README-style about window |
| **Contact** | `components/os/home/contact.tsx` | Contact form dialog |
| **Settings** | `components/os/home/settings.tsx` | Preferences with theme switcher |

### Window Manager
| File | Description |
|---|---|
| `components/os/home/os-home-page.tsx` | Orchestrates all windows: open/close/focus/z-order, desktop + mobile paths |

---

## Spinning Up a New Site

### 1. Clone and Install
```bash
cp -r os-js my-new-site
cd my-new-site
pnpm install
pnpm dev
```

### 2. Customize Branding
Edit these files to replace generic content:

- **`components/os/layout/taskbar.tsx`** — Dock items (icons + labels)
- **`components/os/layout/start-menu.tsx`** — Menu labels, dropdown items, logo emoji
- **`components/os/layout/mobile-shell.tsx`** — App grid, header title/subtitle
- **`components/os/home/os-home-page.tsx`** — Desktop icons list
- **`app/globals.css`** — Color variables (`--color-retro-*`)

### 3. Add Your Windows
Each "page" of your site is a Window component:

```tsx
// components/os/home/my-page.tsx
'use client';
import { Window } from '../window/window';

export function MyPage({ onClose, onFocus, zIndex }) {
  return (
    <Window title="My Page" icon="🎯"
      defaultPosition={{ x: 150, y: 100 }}
      defaultSize={{ width: 400, height: 'auto' }}
      onClose={onClose} onFocus={onFocus} zIndex={zIndex}>
      <p>Your content here</p>
    </Window>
  );
}
```

Then in `os-home-page.tsx`:
1. Add `'my-page'` to the `WindowId` type union
2. Add to `allWindows` array
3. Add to `desktopIcons` array
4. Add render block in the windows section
5. Add to dock items in `taskbar.tsx`
6. Add to menu items in `start-menu.tsx`
7. Add to mobile app grid in `mobile-shell.tsx`

### 4. Add a Wallpaper
Replace `components/os/wallpaper.tsx` with your own ambient background, or set a background image/gradient in `.retro-desktop` CSS class.

### 5. Modern Theme (Optional)
The theme system supports a "Modern" mode for a standard website layout. Wrap your page with `ThemeShell`:

```tsx
<ThemeShell
  retroContent={<OSHomePage />}
  modernContent={<StandardLayout />}
/>
```

---

## Key Patterns

### Window Z-Order
Windows use a focus order array. The last item renders on top:
```tsx
const [focusOrder, setFocusOrder] = useState<WindowId[]>([...allWindows]);
const getZ = (id: WindowId) => focusOrder.indexOf(id) + 10;
```

### Mobile Auto-Switch
The `useIsMobile()` hook automatically switches from desktop (menu bar + dock + draggable windows) to mobile (iOS-style app grid + fullscreen card windows) at 768px.

### CSS Architecture
All retro styles are in `app/globals.css` using CSS custom properties. No component-level CSS modules. Override `--color-retro-*` variables to re-skin everything at once.

### Fonts
The template references three font families:
- `--font-pixel`: "Press Start 2P" — pixel art headers
- `--font-terminal`: "VT323" — terminal/monospace headers
- `--font-mono`: "IBM Plex Mono" — body text

Import these via Google Fonts in your layout, or swap for system fonts.

---

## Reference: Habit Coffee Implementation

For a production example of this boilerplate in action, see `/Documents/Development/Coffee/habitcoffee/`. It adds:

- **E-commerce**: Shopify product grid, cart, checkout (via BrowserWindow)
- **CMS**: Sanity Studio for editorial content with revalidation webhooks
- **Animations**: Pixel-art creatures walking across the wallpaper, UFO abductions, twinkling stars, coffee steam
- **Easter eggs**: Trash can with hidden files, debug mode
- **Custom wallpaper**: SVG desert landscape with cacti and mountains

---

## Tech Stack

- Next.js 15 (App Router, React Server Components)
- TypeScript
- Tailwind CSS v4 + custom retro CSS
- Zero external UI libraries (all window management is vanilla React state)

---

## File Tree

```
os-js/
├── README.md              ← Detailed docs with code examples
├── HANDOFF.md             ← This document
├── app/
│   ├── globals.css        ← All retro OS styles (CSS variables, components)
│   ├── layout.tsx         ← Root layout with ThemeProvider
│   └── page.tsx           ← Homepage entry point
├── components/os/
│   ├── window/
│   │   ├── window.tsx     ← Core draggable window primitive
│   │   └── browser-window.tsx ← Window with browser chrome
│   ├── layout/
│   │   ├── taskbar.tsx    ← Menu bar + dock
│   │   ├── start-menu.tsx ← Dropdown menus
│   │   ├── mobile-shell.tsx ← iOS-style mobile shell
│   │   └── mobile-status-bar.tsx ← Mobile status bar
│   ├── home/
│   │   ├── os-home-page.tsx ← Window manager orchestrator
│   │   ├── welcome.tsx    ← Welcome splash window
│   │   ├── about.tsx      ← About/README window
│   │   ├── contact.tsx    ← Contact form window
│   │   └── settings.tsx   ← Settings/preferences window
│   ├── desktop-icon.tsx   ← Clickable desktop icon
│   ├── theme-toggle.tsx   ← Retro/Modern toggle
│   ├── theme-shell.tsx    ← Theme-conditional renderer
│   ├── theme-layout.tsx   ← Navbar visibility controller
│   └── wallpaper.tsx      ← Ambient background animation
├── lib/
│   ├── theme/
│   │   ├── constants.ts   ← Theme types + storage key
│   │   ├── context.tsx    ← ThemeProvider
│   │   ├── use-theme.ts   ← useTheme() hook
│   │   └── index.ts       ← Barrel export
│   └── hooks/
│       └── use-is-mobile.ts ← useIsMobile() hook
├── package.json
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```
