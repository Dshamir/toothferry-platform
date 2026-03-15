'use client';

import { usePortalTheme } from '@/hooks/usePortalTheme';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopNav } from '@/components/layout/TopNav';
import { MobileNav } from '@/components/layout/MobileNav';

const TABS = [
  { label: 'Live ops', path: '/command' },
  { label: 'GTM control', path: '/command/gtm' },
  { label: 'Alerts', path: '/command/alerts' },
  { label: 'Revenue', path: '/command/revenue' },
  { label: 'R&D roadmap', path: '/command/roadmap' },
];

const SIDEBAR_SECTIONS = [
  {
    title: 'Operations',
    items: [
      { label: 'Live ops', icon: '📡', path: '/command' },
      { label: 'GTM control', icon: '🎯', path: '/command/gtm' },
      { label: 'Alerts', icon: '🚨', path: '/command/alerts', badge: '3' as string, badgeColor: 'red' as const },
    ],
  },
  {
    title: 'Business',
    items: [
      { label: 'Revenue', icon: '💰', path: '/command/revenue' },
      { label: 'R&D roadmap', icon: '🗺️', path: '/command/roadmap' },
    ],
  },
];

export default function CommandLayout({ children }: { children: React.ReactNode }) {
  usePortalTheme('command');

  return (
    <div data-portal="command">
      <TopNav
        portalName="command"
        portalLabel="command"
        portalColor="#3FB950"
        tabs={TABS}
        avatarInitials="HK"
        avatarColor="#3FB950"
      />
      <div className="flex min-h-[calc(100vh-38px-54px)]">
        <Sidebar sections={SIDEBAR_SECTIONS} />
        <main className="flex-1 p-6 overflow-y-auto bg-[var(--color-bg-page)]">
          {children}
        </main>
        <MobileNav sections={SIDEBAR_SECTIONS} />
      </div>
    </div>
  );
}
