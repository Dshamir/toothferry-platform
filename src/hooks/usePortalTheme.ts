'use client';
import { useEffect } from 'react';

export function usePortalTheme(dataPortal?: string) {
  useEffect(() => {
    if (dataPortal) {
      document.documentElement.setAttribute('data-portal', dataPortal);
    }
    return () => {
      document.documentElement.removeAttribute('data-portal');
    };
  }, [dataPortal]);
}
