'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'lib/theme';

/* ── Pip-Boy tab definitions ── */
type PipTab = 'stat' | 'inv' | 'data' | 'map' | 'radio';

const tabs: { id: PipTab; label: string }[] = [
  { id: 'stat', label: 'STAT' },
  { id: 'inv', label: 'INV' },
  { id: 'data', label: 'DATA' },
  { id: 'map', label: 'MAP' },
  { id: 'radio', label: 'RADIO' },
];

/*
 * Template Pip-Boy Shell — customize tab content for your project.
 * Maps to: STAT=Welcome/About, INV=Skills, DATA=Projects, MAP=Links, RADIO=Settings
 */

function StatTab() {
  return (
    <div className="pipboy-tab-content">
      <div className="pipboy-section-header">// VAULT DWELLER RECORD</div>
      <div className="pipboy-name">YOUR NAME</div>
      <div className="pipboy-subtitle">Your Title</div>
      <div className="pipboy-subtitle">Location: Your City</div>

      <div className="pipboy-section-header mt-4">// S.P.E.C.I.A.L.</div>
      <div className="pipboy-special">
        {[
          { label: 'S', stat: 'Strength', value: 5 },
          { label: 'P', stat: 'Perception', value: 5 },
          { label: 'E', stat: 'Endurance', value: 5 },
          { label: 'C', stat: 'Charisma', value: 5 },
          { label: 'I', stat: 'Intelligence', value: 5 },
          { label: 'A', stat: 'Agility', value: 5 },
          { label: 'L', stat: 'Luck', value: 5 },
        ].map((s) => (
          <div key={s.label} className="pipboy-special-row">
            <span className="pipboy-special-letter">{s.label}</span>
            <span className="pipboy-special-name">{s.stat}</span>
            <div className="pipboy-bar-track">
              <div className="pipboy-bar-fill" style={{ width: `${s.value * 10}%` }} />
            </div>
            <span className="pipboy-special-val">{s.value}</span>
          </div>
        ))}
      </div>

      <div className="pipboy-section-header mt-4">// ABOUT</div>
      <p className="pipboy-text">Your about text goes here. Customize this for your portfolio.</p>
    </div>
  );
}

function InvTab() {
  return (
    <div className="pipboy-tab-content">
      <div className="pipboy-section-header">// PERKS (EXPERIENCE)</div>
      <p className="pipboy-text">Add your work experience here.</p>

      <div className="pipboy-section-header mt-4">// APPAREL (SKILLS)</div>
      <div className="pipboy-skills">
        {['Skill 1', 'Skill 2', 'Skill 3'].map((s) => (
          <span key={s} className="pipboy-skill-tag">{s}</span>
        ))}
      </div>
    </div>
  );
}

function DataTab() {
  return (
    <div className="pipboy-tab-content">
      <div className="pipboy-section-header">// COMPLETED QUESTS (PROJECTS)</div>
      <div className="pipboy-quest-list">
        <div className="pipboy-quest">
          <div className="pipboy-quest-name">[✓] Project Name</div>
          <div className="pipboy-text text-xs">Project description.</div>
        </div>
      </div>
    </div>
  );
}

function MapTab() {
  return (
    <div className="pipboy-tab-content">
      <div className="pipboy-section-header">// DISCOVERED LOCATIONS</div>
      <div className="pipboy-quest-list">
        <div className="pipboy-quest">
          <div className="pipboy-quest-name">[01] Your Link</div>
          <div className="pipboy-subtitle">https://example.com</div>
        </div>
      </div>
    </div>
  );
}

function RadioTab() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="pipboy-tab-content">
      <div className="pipboy-section-header">// SIGNAL SETTINGS</div>
      <div className="pipboy-quest-list">
        {[
          { id: 'retro' as const, label: 'Diamond City Radio', desc: 'Classic retro OS theme', freq: '97.3' },
          { id: 'modern' as const, label: 'Institute Signal', desc: 'Modern theme', freq: '104.9' },
          { id: 'fallout' as const, label: 'Pip-Boy OS', desc: 'You are here, wanderer', freq: '111.0' },
        ].map((station) => (
          <button
            key={station.id}
            className={`pipboy-radio-station ${theme === station.id ? 'pipboy-radio-active' : ''}`}
            onClick={() => setTheme(station.id)}
          >
            <span className="pipboy-radio-marker">{theme === station.id ? '►' : '○'}</span>
            <div>
              <div className="pipboy-quest-name">{station.label}</div>
              <div className="pipboy-subtitle">{station.desc}</div>
            </div>
            <span className="pipboy-radio-freq">{station.freq} MHz</span>
          </button>
        ))}
      </div>

      <div className="pipboy-section-header mt-6">// SYSTEM</div>
      <div className="pipboy-text">Pip-Boy 3000 Mark IV</div>
      <div className="pipboy-subtitle">OS-JS Template · Vault-Tec Industries</div>
    </div>
  );
}

/* ── Main Pip-Boy Shell ── */
export function PipBoyShell() {
  const [activeTab, setActiveTab] = useState<PipTab>('stat');
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const idx = parseInt(e.key) - 1;
      if (idx >= 0 && idx < tabs.length) setActiveTab(tabs[idx].id);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="pipboy-shell">
      <div className="pipboy-device">
        <div className="pipboy-bezel">
          <div className="pipboy-top-bar">
            <div className="pipboy-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`pipboy-tab ${activeTab === tab.id ? 'pipboy-tab-active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="pipboy-clock">{time}</div>
          </div>

          <div className="pipboy-hr" />

          <div className="pipboy-screen">
            {activeTab === 'stat' && <StatTab />}
            {activeTab === 'inv' && <InvTab />}
            {activeTab === 'data' && <DataTab />}
            {activeTab === 'map' && <MapTab />}
            {activeTab === 'radio' && <RadioTab />}
          </div>

          <div className="pipboy-hr" />
          <div className="pipboy-status-bar">
            <span>HP 100/100</span>
            <span>LVL 1</span>
            <span>AP ████████░░ 80/100</span>
            <span>CW 0/250</span>
          </div>
        </div>

        <div className="pipboy-knobs">
          <div className="pipboy-knob" />
          <div className="pipboy-knob" />
          <div className="pipboy-knob" />
        </div>
      </div>
    </div>
  );
}
