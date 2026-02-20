'use client';

import { useTheme } from 'lib/theme';
import { type ReactNode } from 'react';

export function ThemeLayout({
  navbar,
  children,
}: {
  navbar: ReactNode;
  children: ReactNode;
}) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <main style={{ visibility: 'hidden' }}>{children}</main>;
  }

  if (theme === 'retro') {
    return <main>{children}</main>;
  }

  return (
    <>
      {navbar}
      <main>{children}</main>
    </>
  );
}
