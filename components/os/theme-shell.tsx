'use client';

import { useTheme } from 'lib/theme';
import { type ReactNode } from 'react';

export function ThemeShell({
  modern,
  retro,
}: {
  modern: ReactNode;
  retro: ReactNode;
}) {
  const { theme } = useTheme();
  return <>{theme === 'retro' ? retro : modern}</>;
}
