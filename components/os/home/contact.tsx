'use client';

import { useState } from 'react';
import { Window } from '../window/window';

interface ContactProps {
  onClose?: () => void;
  onFocus?: () => void;
  zIndex?: number;
}

export function Contact({ onClose, onFocus, zIndex }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Window
      title="✉️ Contact"
      icon="📧"
      defaultPosition={{ x: 220, y: 160 }}
      defaultSize={{ width: 420, height: 'auto' }}
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
        <div className="mb-4 flex gap-3">
          <span className="text-4xl">📬</span>
          <div>
            <h3
              className="mb-1 font-bold"
              style={{ fontFamily: 'var(--font-terminal)', fontSize: '1.2rem' }}
            >
              Get in Touch
            </h3>
            <p className="text-sm opacity-70">
              Send us a message and we&apos;ll get back to you.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="rounded border border-green-600 bg-green-900/30 px-3 py-2 text-sm text-green-300">
            ✅ Message sent! We&apos;ll be in touch.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="flex flex-col gap-2"
          >
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              className="retro-input w-full"
              required
            />
            <textarea
              name="message"
              placeholder="Your message..."
              className="retro-input w-full"
              rows={4}
              required
            />
            <div className="flex gap-2">
              <button type="submit" className="retro-btn retro-btn-primary flex-1">
                Send
              </button>
              <button type="button" className="retro-btn flex-1" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </Window>
  );
}
