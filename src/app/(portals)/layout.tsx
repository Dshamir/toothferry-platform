'use client';

import { PortalBar } from '@/components/layout/PortalBar';

export default function PortalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PortalBar />
      <div style={{ paddingTop: 'var(--portal-bar-height, 38px)' }}>
        {children}
      </div>
    </>
  );
}
