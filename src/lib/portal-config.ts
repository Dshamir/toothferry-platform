import { PortalConfig, PortalId } from '@/types/portal';

export const PORTALS: Record<PortalId, PortalConfig> = {
  landing: {
    id: 'landing',
    label: 'Website',
    shortLabel: 'www',
    path: '/',
    color: '#5DCAA5',
    dotColor: '#5DCAA5',
    icon: '🌐',
    description: 'ToothFerry AI public website',
  },
  operator: {
    id: 'operator',
    label: 'Operator Console',
    shortLabel: 'platform',
    path: '/operator',
    color: '#534AB7',
    dotColor: '#534AB7',
    dataPortal: 'operator',
    icon: '⚡',
    description: 'Real-time case routing & dispatch',
  },
  dentist: {
    id: 'dentist',
    label: 'Dentist Portal',
    shortLabel: 'dentist',
    path: '/dentist',
    color: '#2563EB',
    dotColor: '#1D9E75',
    dataPortal: 'dentist',
    icon: '🦷',
    description: 'Crown generation & case management',
  },
  lab: {
    id: 'lab',
    label: 'Lab Portal',
    shortLabel: 'lab',
    path: '/lab',
    color: '#EF9F27',
    dotColor: '#EF9F27',
    dataPortal: 'lab',
    icon: '🏭',
    description: 'Order queue & milling operations',
  },
  academic: {
    id: 'academic',
    label: 'Academic Portal',
    shortLabel: 'academic',
    path: '/academic',
    color: '#185FA5',
    dotColor: '#185FA5',
    dataPortal: 'education',
    icon: '🎓',
    description: 'Training modules & student evaluation',
  },
  admin: {
    id: 'admin',
    label: 'Admin Console',
    shortLabel: 'admin',
    path: '/admin',
    color: '#58A6FF',
    dotColor: '#58A6FF',
    dataPortal: 'admin',
    icon: '⚙️',
    description: 'System health & configuration',
  },
  command: {
    id: 'command',
    label: 'Command Center',
    shortLabel: 'command',
    path: '/command',
    color: '#3FB950',
    dotColor: '#3FB950',
    dataPortal: 'command',
    icon: '📡',
    description: 'Live ops & business intelligence',
  },
};

export const PORTAL_ORDER: PortalId[] = ['landing', 'operator', 'dentist', 'lab', 'academic', 'admin', 'command'];

// Sidebar nav items per portal
export interface NavItem {
  label: string;
  icon: string;
  path: string;
  badge?: string | number;
  badgeColor?: 'default' | 'red' | 'green' | 'amber';
  section?: string;
  dividerAfter?: boolean;
}

export const PORTAL_NAV: Record<string, { sections: { title: string; items: NavItem[] }[] }> = {
  dentist: {
    sections: [
      {
        title: 'Workflow',
        items: [
          { label: 'Dashboard', icon: '🏠', path: '/dentist' },
          { label: 'New crown', icon: '✨', path: '/dentist/generate', badge: '2', badgeColor: 'red' },
          { label: 'Prep evaluation', icon: '◎', path: '/dentist/results' },
          { label: 'All cases', icon: '📋', path: '/dentist/cases', badge: '31' },
          { label: 'Patients', icon: '👤', path: '/dentist/patients' },
        ],
      },
      {
        title: 'Analytics',
        items: [
          { label: 'Reports', icon: '📊', path: '/dentist/reports' },
          { label: 'Team', icon: '👥', path: '/dentist/team' },
        ],
      },
    ],
  },
  lab: {
    sections: [
      {
        title: 'Production',
        items: [
          { label: 'Order queue', icon: '📥', path: '/lab', badge: '7', badgeColor: 'red' },
          { label: 'Batch processing', icon: '⚡', path: '/lab/batch' },
          { label: 'STL review', icon: '🔍', path: '/lab/review', badge: '2', badgeColor: 'amber' },
          { label: 'Milling queue', icon: '🖨️', path: '/lab/milling', badge: '3' },
        ],
      },
      {
        title: 'Business',
        items: [
          { label: 'Partner dentists', icon: '🦷', path: '/lab/dentists', badge: '23' },
          { label: 'Analytics', icon: '📊', path: '/lab/analytics' },
          { label: 'Billing', icon: '💰', path: '/lab/billing' },
        ],
      },
    ],
  },
  academic: {
    sections: [
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
  admin: {
    sections: [
      {
        title: 'System',
        items: [
          { label: 'Health', icon: '💚', path: '/admin', badge: 'All OK', badgeColor: 'green' },
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
    ],
  },
  command: {
    sections: [
      {
        title: 'Operations',
        items: [
          { label: 'Live ops', icon: '📡', path: '/command' },
          { label: 'GTM control', icon: '🎯', path: '/command/gtm' },
          { label: 'Alerts', icon: '🚨', path: '/command/alerts', badge: '3', badgeColor: 'red' },
        ],
      },
      {
        title: 'Business',
        items: [
          { label: 'Revenue', icon: '💰', path: '/command/revenue' },
          { label: 'R&D roadmap', icon: '🗺️', path: '/command/roadmap' },
        ],
      },
    ],
  },
};
