'use client';

import { Window } from '../window/window';
import { useTheme } from 'lib/theme';

interface SettingsProps {
  onClose?: () => void;
  onFocus?: () => void;
  zIndex?: number;
}

export function Settings({ onClose, onFocus, zIndex }: SettingsProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Window
      title="⚙️ Settings"
      icon="⚙️"
      defaultPosition={{ x: 260, y: 120 }}
      defaultSize={{ width: 360, height: 'auto' }}
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
        <h3
          className="mb-4 font-bold"
          style={{ fontFamily: 'var(--font-terminal)', fontSize: '1.2rem' }}
        >
          Preferences
        </h3>

        <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-3">
          <span>Theme</span>
          <div className="flex gap-2">
            <button
              className={`retro-btn text-xs ${theme === 'retro' ? 'retro-btn-primary' : ''}`}
              onClick={() => setTheme('retro')}
            >
              Retro
            </button>
            <button
              className={`retro-btn text-xs ${theme === 'modern' ? 'retro-btn-primary' : ''}`}
              onClick={() => setTheme('modern')}
            >
              Modern
            </button>
            <button
              className={`retro-btn text-xs ${theme === 'fallout' ? 'retro-btn-primary' : ''}`}
              onClick={() => setTheme('fallout')}
              style={theme !== 'fallout' ? { border: '1px solid #30ff50', color: '#30ff50', background: 'rgba(0,20,0,0.6)' } : { background: '#30ff50', color: '#0a0a0a', border: '1px solid #30ff50', fontWeight: 'bold' }}
            >
              Fallout
            </button>
          </div>
        </div>

        <div className="text-xs opacity-50">
          More settings coming soon...
        </div>
      </div>
    </Window>
  );
}
