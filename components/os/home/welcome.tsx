'use client';

import { Window } from '../window/window';

interface WelcomeProps {
  onClose?: () => void;
  onFocus?: () => void;
  zIndex?: number;
  onOpenWindow?: (id: string) => void;
}

export function Welcome({ onClose, onFocus, zIndex, onOpenWindow }: WelcomeProps) {
  return (
    <Window
      title="Welcome"
      icon="🏠"
      defaultPosition={{ x: 140, y: 40 }}
      defaultSize={{ width: 480, height: 'auto' }}
      centered
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
    >
      <div className="flex flex-col items-center gap-6 p-4 text-center">
        <div className="text-6xl">💻</div>

        <div>
          <h1
            className="mb-2 text-2xl font-bold"
            style={{ fontFamily: 'var(--font-terminal)', fontSize: '2rem', lineHeight: 1.2 }}
          >
            Welcome to My OS
          </h1>
          <p
            className="text-sm leading-relaxed opacity-70"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            A retro desktop experience for the modern web.
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={() => onOpenWindow?.('about')} className="retro-btn retro-btn-primary">
            About
          </button>
          <button onClick={() => onOpenWindow?.('contact')} className="retro-btn">
            Contact
          </button>
        </div>

        <p
          className="text-xs opacity-40"
          style={{ fontFamily: 'var(--font-pixel)', fontSize: '7px' }}
        >
          {`OS v1.0 — © ${new Date().getFullYear()}`}
        </p>
      </div>
    </Window>
  );
}
