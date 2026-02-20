'use client';

import { type ReactNode, useState, useCallback, useRef } from 'react';
import { Window } from './window';

interface BrowserPage {
  url: string;
  content: ReactNode;
}

interface BrowserWindowProps {
  title: string;
  url: string;
  children: ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number | string; height: number | string };
  onClose?: () => void;
  onFocus?: () => void;
  zIndex?: number;
  id?: string;
  /** Additional pages the browser can navigate to */
  pages?: Record<string, ReactNode>;
}

export function BrowserWindow({
  title,
  url,
  children,
  defaultPosition,
  defaultSize,
  onClose,
  onFocus,
  zIndex,
  id,
  pages,
}: BrowserWindowProps) {
  const homeUrl = url;
  const [currentUrl, setCurrentUrl] = useState(url);
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [forwardStack, setForwardStack] = useState<string[]>([]);
  const viewportRef = useRef<HTMLDivElement>(null);

  const navigateTo = useCallback(
    (newUrl: string) => {
      setHistoryStack((prev) => [...prev, currentUrl]);
      setForwardStack([]);
      setCurrentUrl(newUrl);
      viewportRef.current?.scrollTo(0, 0);
    },
    [currentUrl],
  );

  const goBack = useCallback(() => {
    if (historyStack.length === 0) return;
    const prev = historyStack[historyStack.length - 1]!;
    setHistoryStack((s) => s.slice(0, -1));
    setForwardStack((s) => [...s, currentUrl]);
    setCurrentUrl(prev);
    viewportRef.current?.scrollTo(0, 0);
  }, [historyStack, currentUrl]);

  const goForward = useCallback(() => {
    if (forwardStack.length === 0) return;
    const next = forwardStack[forwardStack.length - 1]!;
    setForwardStack((s) => s.slice(0, -1));
    setHistoryStack((s) => [...s, currentUrl]);
    setCurrentUrl(next);
    viewportRef.current?.scrollTo(0, 0);
  }, [forwardStack, currentUrl]);

  const goHome = useCallback(() => {
    if (currentUrl === homeUrl) return;
    navigateTo(homeUrl);
  }, [currentUrl, homeUrl, navigateTo]);

  const refresh = useCallback(() => {
    viewportRef.current?.scrollTo(0, 0);
  }, []);

  // Determine what to render
  const currentContent =
    currentUrl === homeUrl
      ? children
      : pages?.[currentUrl] ?? children;

  return (
    <Window
      title={title}
      icon="🌐"
      defaultPosition={defaultPosition}
      defaultSize={defaultSize}
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      bodyClassName="!p-0 !m-0 flex flex-col"
      id={id}
    >
      {/* Browser toolbar */}
      <div className="retro-browser-bar">
        <button
          className="retro-browser-nav-btn"
          aria-label="Back"
          onClick={goBack}
          disabled={historyStack.length === 0}
          style={{ opacity: historyStack.length === 0 ? 0.35 : 1 }}
        >
          ◀
        </button>
        <button
          className="retro-browser-nav-btn"
          aria-label="Forward"
          onClick={goForward}
          disabled={forwardStack.length === 0}
          style={{ opacity: forwardStack.length === 0 ? 0.35 : 1 }}
        >
          ▶
        </button>
        <button className="retro-browser-nav-btn" aria-label="Refresh" onClick={refresh}>
          ⟳
        </button>
        <button className="retro-browser-nav-btn" aria-label="Home" onClick={goHome}>
          🏠
        </button>
        <div className="retro-address-bar">{currentUrl}</div>
      </div>
      {/* Browser viewport */}
      <div ref={viewportRef} className="flex-1 overflow-auto bg-white p-3">
        <BrowserContext.Provider value={{ navigateTo, currentUrl }}>
          {currentContent}
        </BrowserContext.Provider>
      </div>
    </Window>
  );
}

// Context so child components can trigger in-browser navigation
import { createContext, useContext } from 'react';

interface BrowserContextValue {
  navigateTo: (url: string) => void;
  currentUrl: string;
}

const BrowserContext = createContext<BrowserContextValue>({
  navigateTo: () => {},
  currentUrl: '',
});

export function useBrowserNav() {
  return useContext(BrowserContext);
}
