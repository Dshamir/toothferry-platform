'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/theme-store';

/**
 * Dynamically injects/removes a <link> stylesheet into <head>
 * based on the active theme. The base globals.css is always loaded;
 * theme CSS files override the CSS variables on :root and [data-portal].
 */
export function ThemeLoader() {
  const activeTheme = useThemeStore((s) => s.activeTheme);
  const getThemeConfig = useThemeStore((s) => s.getThemeConfig);

  useEffect(() => {
    const LINK_ID = 'tf-dynamic-theme';
    const config = getThemeConfig();

    // Remove any previously injected theme sheet
    const existing = document.getElementById(LINK_ID);

    if (!config.cssFile) {
      // No external sheet needed — just remove any existing one
      existing?.remove();
      document.documentElement.removeAttribute('data-theme');
      return;
    }

    // Set data-theme attribute for any CSS selectors that key off it
    document.documentElement.setAttribute('data-theme', activeTheme);

    if (existing && existing instanceof HTMLLinkElement) {
      // Update href if already present
      if (existing.href !== config.cssFile) {
        existing.href = config.cssFile;
      }
    } else {
      // Create new <link>
      const link = document.createElement('link');
      link.id = LINK_ID;
      link.rel = 'stylesheet';
      link.href = config.cssFile;
      document.head.appendChild(link);
    }

    return () => {
      // Cleanup only on unmount (not on re-render)
    };
  }, [activeTheme, getThemeConfig]);

  return null; // This component renders nothing — it's a side-effect only
}
