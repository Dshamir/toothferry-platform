'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore, THEMES, ThemeId } from '@/store/theme-store';

/**
 * Floating pill in the bottom-left corner that lets users
 * switch between CSS themes dynamically.
 */
export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const activeTheme = useThemeStore((s) => s.activeTheme);
  const setTheme = useThemeStore((s) => s.setTheme);

  const current = THEMES.find((t) => t.id === activeTheme) ?? THEMES[0];

  return (
    <div className="fixed bottom-4 left-4 z-[2001]">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-full text-[11px] font-semibold cursor-pointer border-none transition-all shadow-lg"
        style={{
          background: 'rgba(10, 15, 13, 0.92)',
          backdropFilter: 'blur(12px)',
          color: '#5DCAA5',
          border: '1px solid rgba(29, 158, 117, 0.3)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{
            background: activeTheme === 'v2-cobalt' ? '#2563EB' : '#1D9E75',
          }}
        />
        {current.label}
        <span style={{ opacity: 0.4, fontSize: 9 }}>{open ? '▼' : '▲'}</span>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 mb-2 w-[280px] rounded-[12px] overflow-hidden shadow-xl"
            style={{
              background: 'rgba(10, 15, 13, 0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(29, 158, 117, 0.2)',
            }}
          >
            <div className="px-3 py-2 border-b" style={{ borderColor: 'rgba(29, 158, 117, 0.15)' }}>
              <div
                className="text-[9px] uppercase tracking-[0.1em]"
                style={{ color: 'rgba(93, 202, 165, 0.4)', fontFamily: 'var(--font-mono)' }}
              >
                CSS Theme
              </div>
            </div>
            <div className="p-2">
              {THEMES.map((theme) => {
                const isActive = activeTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setTheme(theme.id as ThemeId);
                      setOpen(false);
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-[8px] cursor-pointer border-none transition-all flex items-start gap-3"
                    style={{
                      background: isActive
                        ? 'rgba(29, 158, 117, 0.12)'
                        : 'transparent',
                    }}
                  >
                    <span
                      className="w-3 h-3 rounded-full mt-0.5 flex-shrink-0 border-2"
                      style={{
                        background: isActive
                          ? theme.id === 'v2-cobalt'
                            ? '#2563EB'
                            : '#1D9E75'
                          : 'transparent',
                        borderColor: isActive
                          ? 'transparent'
                          : 'rgba(93, 202, 165, 0.3)',
                      }}
                    />
                    <div>
                      <div
                        className="text-[12px] font-semibold"
                        style={{
                          color: isActive ? '#5DCAA5' : 'rgba(255, 255, 255, 0.7)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {theme.label}
                      </div>
                      <div
                        className="text-[10px] mt-0.5 leading-[1.4]"
                        style={{ color: 'rgba(93, 202, 165, 0.4)' }}
                      >
                        {theme.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div
              className="px-3 py-2 border-t text-[9px]"
              style={{
                borderColor: 'rgba(29, 158, 117, 0.15)',
                color: 'rgba(93, 202, 165, 0.3)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Theme persisted to localStorage
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
