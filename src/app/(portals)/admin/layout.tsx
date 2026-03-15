'use client';

import { usePortalTheme } from '@/hooks/usePortalTheme';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopNav } from '@/components/layout/TopNav';
import { MobileNav } from '@/components/layout/MobileNav';

const TABS = [
  { label: 'System health', path: '/admin' },
  { label: 'AI model config', path: '/admin/model-config' },
  { label: 'Feature flags', path: '/admin/feature-flags' },
  { label: 'Scanner integrations', path: '/admin/scanners' },
  { label: 'Compliance', path: '/admin/compliance' },
  { label: 'Roles & permissions', path: '/admin/roles' },
];

const SIDEBAR_SECTIONS = [
  {
    title: 'System',
    items: [
      { label: 'Health', icon: '💚', path: '/admin', badge: 'All OK' as string, badgeColor: 'green' as const },
      { label: 'AI model config', icon: '🤖', path: '/admin/model-config' },
      { label: 'Feature flags', icon: '🚩', path: '/admin/feature-flags' },
    ],
  },
  {
    title: 'Integrations',
    items: [
      { label: 'Scanner adapters', icon: '📷', path: '/admin/scanners' },
    ],
  },
  {
    title: 'Governance',
    items: [
      { label: 'Compliance', icon: '🛡️', path: '/admin/compliance' },
      { label: 'Roles & permissions', icon: '🔐', path: '/admin/roles' },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  usePortalTheme('admin');

  return (
    <div data-portal="admin">
      <TopNav
        portalName="admin"
        portalLabel="admin"
        portalColor="#58A6FF"
        tabs={TABS}
        avatarInitials="AD"
        avatarColor="#58A6FF"
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
