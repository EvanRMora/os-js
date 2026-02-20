'use client';

import { useTheme } from 'lib/theme';

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setTheme('retro')}
        className={`rounded px-2 py-0.5 text-[11px] transition-colors ${
          theme === 'retro'
            ? 'bg-[var(--color-retro-accent)] text-white'
            : 'text-gray-400 hover:text-white'
        }`}
        aria-pressed={theme === 'retro'}
      >
        Retro
      </button>
      <button
        onClick={() => setTheme('modern')}
        className={`rounded px-2 py-0.5 text-[11px] transition-colors ${
          theme === 'modern'
            ? 'bg-[var(--color-retro-accent)] text-white'
            : 'text-gray-400 hover:text-white'
        }`}
        aria-pressed={theme === 'modern'}
      >
        Modern
      </button>
    </div>
  );
}
