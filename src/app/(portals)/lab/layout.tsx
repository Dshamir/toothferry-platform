'use client';

import { usePortalTheme } from '@/hooks/usePortalTheme';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopNav } from '@/components/layout/TopNav';
import { MobileNav } from '@/components/layout/MobileNav';

const TABS = [
  { label: 'Order queue', path: '/lab' },
  { label: 'Batch processing', path: '/lab/batch' },
  { label: 'STL review', path: '/lab/review' },
  { label: 'Milling queue', path: '/lab/milling' },
  { label: 'Partner dentists', path: '/lab/dentists' },
  { label: 'Analytics', path: '/lab/analytics' },
  { label: 'Billing', path: '/lab/billing' },
];

const SIDEBAR_SECTIONS = [
  {
    title: 'Production',
    items: [
      { label: 'Order queue', icon: '📥', path: '/lab', badge: '7' as string, badgeColor: 'red' as const },
      { label: 'Batch processing', icon: '⚡', path: '/lab/batch' },
      { label: 'STL review', icon: '🔍', path: '/lab/review', badge: '2' as string, badgeColor: 'amber' as const },
      { label: 'Milling queue', icon: '🖨️', path: '/lab/milling', badge: '3' as string },
    ],
  },
  {
    title: 'Business',
    items: [
      { label: 'Partner dentists', icon: '🦷', path: '/lab/dentists', badge: '23' as string },
      { label: 'Analytics', icon: '📊', path: '/lab/analytics' },
      { label: 'Billing', icon: '💰', path: '/lab/billing' },
    ],
  },
];

export default function LabLayout({ children }: { children: React.ReactNode }) {
  usePortalTheme('lab');

  return (
    <div data-portal="lab">
      <TopNav
        portalName="lab"
        portalLabel="lab"
        portalColor="#EF9F27"
        tabs={TABS}
        avatarInitials="KO"
        avatarColor="#EF9F27"
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
