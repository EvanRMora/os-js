'use client';

import { useRef, useState, useCallback, type ReactNode, type MouseEvent } from 'react';

interface WindowProps {
  title: string;
  icon?: string;
  children: ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number | string; height: number | string };
  centered?: boolean;
  onClose?: () => void;
  onFocus?: () => void;
  zIndex?: number;
  className?: string;
  bodyClassName?: string;
  id?: string;
}

export function Window({
  title,
  icon,
  children,
  defaultPosition = { x: 60, y: 40 },
  defaultSize = { width: 600, height: 400 },
  centered = false,
  onClose,
  onFocus,
  zIndex = 10,
  className = '',
  bodyClassName = '',
  id,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(defaultPosition);
  const [isCentered, setIsCentered] = useState(centered);
  const [dragging, setDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const preMaxPos = useRef(defaultPosition);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      // Don't start drag if clicking a traffic light button
      if ((e.target as HTMLElement).closest('.retro-traffic-lights')) return;
      if (isMaximized) return;
      onFocus?.();

      // If centered, compute actual position from DOM before starting drag
      if (isCentered && windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect();
        const parentRect = windowRef.current.offsetParent?.getBoundingClientRect() ?? { left: 0, top: 0 };
        const actualPos = { x: rect.left - parentRect.left, y: rect.top - parentRect.top };
        setPos(actualPos);
        setIsCentered(false);
        dragOffset.current = {
          x: e.clientX - actualPos.x,
          y: e.clientY - actualPos.y,
        };
      } else {
        dragOffset.current = {
          x: e.clientX - pos.x,
          y: e.clientY - pos.y,
        };
      }
      setDragging(true);

      const handleMouseMove = (ev: globalThis.MouseEvent) => {
        setPos({
          x: Math.max(0, ev.clientX - dragOffset.current.x),
          y: Math.max(28, ev.clientY - dragOffset.current.y),
        });
      };

      const handleMouseUp = () => {
        setDragging(false);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [pos, onFocus, isMaximized, isCentered],
  );

  const handleClose = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    onClose?.();
  }, [onClose]);

  const handleMinimize = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  }, [isMinimized]);

  const handleMaximize = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    if (!isMaximized) {
      preMaxPos.current = pos;
    } else {
      setPos(preMaxPos.current);
    }
    setIsMaximized(!isMaximized);
    setIsMinimized(false);
  }, [isMaximized, pos]);

  const handleTitlebarDoubleClick = useCallback(() => {
    if (!isMaximized) {
      preMaxPos.current = pos;
    } else {
      setPos(preMaxPos.current);
    }
    setIsMaximized(!isMaximized);
    setIsMinimized(false);
  }, [isMaximized, pos]);

  const style = isMaximized
    ? {
        position: 'fixed' as const,
        top: 28,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: zIndex + 100,
        width: 'auto' as const,
        height: 'auto' as const,
      }
    : isCentered
      ? {
          position: 'absolute' as const,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: defaultSize.width,
          maxHeight: isMinimized ? undefined : 'calc(100vh - 100px)',
          height: isMinimized ? 'auto' : defaultSize.height,
          zIndex,
        }
      : {
          position: 'absolute' as const,
          left: pos.x,
          top: pos.y,
          width: defaultSize.width,
          maxHeight: isMinimized ? undefined : 'calc(100vh - 100px)',
          height: isMinimized ? 'auto' : defaultSize.height,
          zIndex,
        };

  return (
    <div
      ref={windowRef}
      className={`retro-window ${className}`}
      style={style}
      onMouseDown={() => onFocus?.()}
      id={id}
    >
      <div
        className="retro-titlebar"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleTitlebarDoubleClick}
      >
        <div className="retro-traffic-lights">
          <button
            className="retro-traffic-light retro-tl-close"
            onClick={handleClose}
            aria-label="Close"
          />
          <button
            className="retro-traffic-light retro-tl-minimize"
            onClick={handleMinimize}
            aria-label="Minimize"
          />
          <button
            className="retro-traffic-light retro-tl-maximize"
            onClick={handleMaximize}
            aria-label="Maximize"
          />
        </div>
        {icon && <span>{icon}</span>}
        <span className="flex-1 truncate">{title}</span>
      </div>
      {!isMinimized && (
        <div className={`retro-window-body ${bodyClassName}`}>{children}</div>
      )}
    </div>
  );
}
