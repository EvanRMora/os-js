'use client';

import Link from 'next/link';
import Image from 'next/image';
import { type MouseEvent } from 'react';

interface DesktopIconProps {
  icon: string;
  label: string;
  href: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export function DesktopIcon({ icon, label, href, onClick }: DesktopIconProps) {
  return (
    <Link
      href={href}
      className="retro-icon"
      onClick={onClick}
      prefetch={true}
    >
      <div className="retro-icon-img">
        {icon.startsWith('/') ? (
          <Image src={icon} alt={label} width={32} height={32} style={{ imageRendering: 'pixelated' }} />
        ) : icon}
      </div>
      <span className="retro-icon-label">{label}</span>
    </Link>
  );
}
