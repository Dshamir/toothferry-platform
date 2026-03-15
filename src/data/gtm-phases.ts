export interface GtmPhase {
  id: string;
  name: string;
  title: string;
  timeline: string;
  status: 'completed' | 'active' | 'upcoming';
  progress: number;
  targets: { label: string; target: string | number; actual: string | number }[];
  description: string;
}

export const SEED_GTM_PHASES: GtmPhase[] = [
  {
    id: 'P1', name: 'PHASE 1', title: 'Academic Validation',
    timeline: 'Q1-Q2 2025', status: 'completed', progress: 100,
    targets: [
      { label: 'Partner universities', target: 3, actual: 3 },
      { label: 'Student users', target: 100, actual: 124 },
      { label: 'Published papers', target: 2, actual: 2 },
    ],
    description: 'Validate AI accuracy in academic setting. Build evidence base.',
  },
  {
    id: 'P2', name: 'PHASE 2', title: 'Lab Partnership',
    timeline: 'Q3-Q4 2025', status: 'completed', progress: 100,
    targets: [
      { label: 'Lab partners', target: 5, actual: 8 },
      { label: 'Crowns processed', target: 500, actual: 1847 },
      { label: 'Mean margin accuracy', target: '< 100μm', actual: '70.7μm' },
    ],
    description: 'Onboard lab partners. Prove production-grade quality.',
  },
  {
    id: 'P3', name: 'PHASE 3', title: 'Clinic Revenue',
    timeline: 'Q1-Q2 2026', status: 'active', progress: 65,
    targets: [
      { label: 'Active clinics', target: 50, actual: 23 },
      { label: 'MRR', target: '$100K', actual: '$61.2K' },
      { label: 'Acceptance rate', target: '95%', actual: '93.8%' },
    ],
    description: 'Scale dentist adoption. Hit $100K MRR milestone.',
  },
  {
    id: 'P4', name: 'PHASE 4', title: 'Series A',
    timeline: 'Q3 2026', status: 'upcoming', progress: 0,
    targets: [
      { label: 'ARR target', target: '$1.2M', actual: '$0' },
      { label: 'FDA 510(k)', target: 'Filed', actual: 'Preparing' },
      { label: 'US expansion', target: '3 states', actual: '0' },
    ],
    description: 'Series A fundraise. US market entry.',
  },
];
