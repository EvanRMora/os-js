'use client';

import { Window } from '../window/window';

interface AboutProps {
  onClose?: () => void;
  onFocus?: () => void;
  zIndex?: number;
}

export function About({ onClose, onFocus, zIndex }: AboutProps) {
  return (
    <Window
      title="README.txt — About"
      icon="📄"
      defaultPosition={{ x: 180, y: 200 }}
      defaultSize={{ width: 480, height: 'auto' }}
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.7 }}>
        <div className="mb-4 border-b border-gray-300 pb-2">
          <span className="text-xs opacity-50">
            Last modified: {new Date().toLocaleDateString()}
          </span>
        </div>

        <div className="mb-4">
          <h2
            className="mb-2 text-lg font-bold"
            style={{ fontFamily: 'var(--font-terminal)', fontSize: '1.5rem' }}
          >
            About This Project
          </h2>
          <p className="whitespace-pre-wrap">
            This is a retro desktop OS-themed website. Replace this text with your story, mission, or brand narrative.
          </p>
        </div>

        <div className="border-t border-gray-300 pt-2 text-xs opacity-50">
          — Your Name, Your City
        </div>
      </div>
    </Window>
  );
}
