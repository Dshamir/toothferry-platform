'use client';

import { usePortalTheme } from '@/hooks/usePortalTheme';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopNav } from '@/components/layout/TopNav';
import { MobileNav } from '@/components/layout/MobileNav';

const TABS = [
  { label: 'Dashboard', path: '/dentist' },
  { label: 'New crown', path: '/dentist/generate' },
  { label: 'All cases', path: '/dentist/cases' },
  { label: 'Patients', path: '/dentist/patients' },
  { label: 'Results', path: '/dentist/results' },
  { label: 'Reports', path: '/dentist/reports' },
  { label: 'Team', path: '/dentist/team' },
];

const SIDEBAR_SECTIONS = [
  {
    title: 'Workflow',
    items: [
      { label: 'Dashboard', icon: '🏠', path: '/dentist' },
      { label: 'New crown', icon: '✨', path: '/dentist/generate', badge: '2' as string, badgeColor: 'red' as const },
      { label: 'All cases', icon: '📋', path: '/dentist/cases', badge: '31' as string },
      { label: 'Patients', icon: '👤', path: '/dentist/patients' },
      { label: 'Results', icon: '◎', path: '/dentist/results' },
    ],
  },
  {
    title: 'Analytics',
    items: [
      { label: 'Reports', icon: '📊', path: '/dentist/reports' },
      { label: 'Team', icon: '👥', path: '/dentist/team' },
    ],
  },
];

export default function DentistLayout({ children }: { children: React.ReactNode }) {
  usePortalTheme('dentist');

  return (
    <div data-portal="dentist">
      <TopNav
        portalName="dentist"
        portalLabel="dentist"
        portalColor="#2563EB"
        tabs={TABS}
        avatarInitials="DC"
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
