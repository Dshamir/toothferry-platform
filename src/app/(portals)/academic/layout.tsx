'use client';

import { usePortalTheme } from '@/hooks/usePortalTheme';
import { Sidebar, SidebarSection } from '@/components/layout/Sidebar';
import { TopNav } from '@/components/layout/TopNav';
import { MobileNav } from '@/components/layout/MobileNav';
import { RoleSwitcher } from '@/components/academic/RoleSwitcher';
import { useAcademicStore } from '@/store/academic-store';
import { AcademicRoleType } from '@/types/academic';

// ─── Each role is a separate portal with its own identity ──────────────────

interface PortalIdentity {
  portalName: string;
  portalLabel: string;
  portalColor: string;
  accountName: string;
  accountDomain: string;
  tabs: { label: string; path: string }[];
  sidebar: SidebarSection[];
}

const PORTAL_BY_ROLE: Record<AcademicRoleType, PortalIdentity> = {

  // ── UNIVERSITY ADMIN ─────────────────────────────────────
  // university.toothferryai.com — sees everything
  institution: {
    portalName: 'academic',
    portalLabel: 'university',
    portalColor: '#185FA5',
    accountName: 'McGill University',
    accountDomain: 'university.toothferryai.com',
    tabs: [
      { label: 'Overview', path: '/academic' },
      { label: 'Users', path: '/academic/users' },
      { label: 'Prep evaluation', path: '/academic/prep-eval' },
      { label: 'Margin training', path: '/academic/margin-training' },
      { label: 'Crown anatomy', path: '/academic/crown-anatomy' },
      { label: 'Grades', path: '/academic/grades' },
      { label: 'Courses', path: '/academic/courses' },
    ],
    sidebar: [
      {
        title: 'Institution',
        items: [
          { label: 'Overview', icon: '🏫', path: '/academic' },
          { label: 'Users', icon: '👥', path: '/academic/users', badge: '148' },
          { label: 'Courses', icon: '📚', path: '/academic/courses', badge: '3' },
        ],
      },
      {
        title: 'Training Modules',
        items: [
          { label: 'Prep evaluation', icon: '◎', path: '/academic/prep-eval' },
          { label: 'Margin detection', icon: '〜', path: '/academic/margin-training' },
          { label: 'Crown anatomy', icon: '🦷', path: '/academic/crown-anatomy' },
        ],
      },
      {
        title: 'Assessment',
        items: [
          { label: 'Grades & progress', icon: '📊', path: '/academic/grades' },
        ],
      },
    ],
  },

  // ── PROFESSOR ────────────────────────────────────────────
  // professor.toothferryai.com — their courses, their students, their assistant(s)
  professor: {
    portalName: 'professor',
    portalLabel: 'professor',
    portalColor: '#6750D6',
    accountName: 'Prof. Haim Keren',
    accountDomain: 'professor.toothferryai.com',
    tabs: [
      { label: 'Dashboard', path: '/academic/professor' },
      { label: 'Evaluate', path: '/academic/professor/evaluate' },
      { label: 'My Grades', path: '/academic/grades' },
      { label: 'My Courses', path: '/academic/courses' },
    ],
    sidebar: [
      {
        title: 'Prof. Keren',
        items: [
          { label: 'Dashboard', icon: '📋', path: '/academic/professor' },
          { label: 'My Courses', icon: '📚', path: '/academic/courses', badge: '1' },
        ],
      },
      {
        title: 'Evaluation',
        items: [
          { label: 'Review Queue', icon: '✏️', path: '/academic/professor/evaluate', badge: '6', badgeColor: 'red' as const },
          { label: 'My Grades', icon: '📊', path: '/academic/grades' },
        ],
      },
      {
        title: 'My Students',
        items: [
          { label: 'All Students', icon: '👥', path: '/academic/users' },
          { label: 'Needs Attention', icon: '⚠️', path: '/academic/professor', badge: '2', badgeColor: 'amber' as const },
        ],
      },
      {
        title: 'Course Modules',
        items: [
          { label: 'Prep evaluation', icon: '◎', path: '/academic/prep-eval' },
          { label: 'Margin detection', icon: '〜', path: '/academic/margin-training' },
          { label: 'Crown anatomy', icon: '🦷', path: '/academic/crown-anatomy' },
        ],
      },
    ],
  },

  // ── ASSISTANT PROFESSOR ──────────────────────────────────
  // assistant.toothferryai.com — reports to professor, assigned students only
  assistant: {
    portalName: 'assistant',
    portalLabel: 'assistant',
    portalColor: '#0F6E56',
    accountName: 'Dr. Nathaniel Lasry',
    accountDomain: 'assistant.toothferryai.com',
    tabs: [
      { label: 'Dashboard', path: '/academic/assistant' },
      { label: 'Evaluate', path: '/academic/assistant/evaluate' },
    ],
    sidebar: [
      {
        title: 'Dr. Lasry',
        items: [
          { label: 'Dashboard', icon: '📋', path: '/academic/assistant' },
        ],
      },
      {
        title: 'Evaluation',
        items: [
          { label: 'Review Queue', icon: '✏️', path: '/academic/assistant/evaluate', badge: '3' },
          { label: 'Pending Approval', icon: '⏳', path: '/academic/assistant' },
        ],
      },
      {
        title: 'Assigned Students',
        items: [
          { label: 'My Students', icon: '👥', path: '/academic/assistant', badge: '2' },
        ],
      },
      {
        title: 'Modules',
        items: [
          { label: 'Prep evaluation', icon: '◎', path: '/academic/prep-eval' },
          { label: 'Margin detection', icon: '〜', path: '/academic/margin-training' },
        ],
      },
    ],
  },

  // ── STUDENT ──────────────────────────────────────────────
  // student.toothferryai.com — own account only
  student: {
    portalName: 'student',
    portalLabel: 'student',
    portalColor: '#C2185B',
    accountName: 'Alice Martin',
    accountDomain: 'student.toothferryai.com',
    tabs: [
      { label: 'My Dashboard', path: '/academic/student' },
      { label: 'Submit Scan', path: '/academic/student/submit' },
      { label: 'Feedback', path: '/academic/student/feedback' },
      { label: 'Transcript', path: '/academic/student/transcript' },
    ],
    sidebar: [
      {
        title: 'Alice Martin',
        items: [
          { label: 'My Dashboard', icon: '🏠', path: '/academic/student' },
          { label: 'My Progress', icon: '📈', path: '/academic/student/transcript' },
        ],
      },
      {
        title: 'Learning',
        items: [
          { label: 'Submit Scan', icon: '📤', path: '/academic/student/submit' },
          { label: 'My Modules', icon: '📖', path: '/academic/student' },
        ],
      },
      {
        title: 'Feedback',
        items: [
          { label: 'Inbox', icon: '💬', path: '/academic/student/feedback', badge: '3', badgeColor: 'red' as const },
          { label: 'Transcript', icon: '📄', path: '/academic/student/transcript' },
        ],
      },
    ],
  },
};

export default function AcademicLayout({ children }: { children: React.ReactNode }) {
  usePortalTheme('education');
  const { currentRole, currentPersona } = useAcademicStore();

  const portal = PORTAL_BY_ROLE[currentRole];

  return (
    <div data-portal="education">
      <TopNav
        portalName={portal.portalName}
        portalLabel={portal.portalLabel}
        portalColor={portal.portalColor}
        tabs={portal.tabs}
        avatarInitials={currentPersona.initials}
        avatarColor={currentPersona.avatarColor}
        rightSlot={<RoleSwitcher />}
        accountName={portal.accountName}
        accountDomain={portal.accountDomain}
      />
      <div className="flex min-h-[calc(100vh-38px-54px)]">
        <Sidebar sections={portal.sidebar} />
        <main className="flex-1 p-6 overflow-y-auto bg-[var(--color-bg-page)]">
          {children}
        </main>
        <MobileNav sections={portal.sidebar} />
      </div>
    </div>
  );
}
