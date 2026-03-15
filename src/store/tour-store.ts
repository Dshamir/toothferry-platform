import { create } from 'zustand';

interface TourStep {
  id: string;
  title: string;
  description: string;
  portal: string;
  path: string;
  duration?: number;
}

const TOUR_STEPS: TourStep[] = [
  { id: 'intro', title: 'Welcome to ToothFerry AI', description: 'Watch how AI generates a dental crown in under 2 minutes — from scan to STL.', portal: 'landing', path: '/', duration: 4000 },
  { id: 'dentist-dashboard', title: 'Dentist Dashboard', description: 'The dentist sees their practice KPIs, active cases, and pipeline status at a glance.', portal: 'dentist', path: '/dentist', duration: 4000 },
  { id: 'submit-case', title: 'Submit a New Crown', description: 'Upload an intraoral scan, select material and tooth — the 5-step wizard guides every case.', portal: 'dentist', path: '/dentist/generate', duration: 5000 },
  { id: 'lab-queue', title: 'Lab Receives Order', description: 'The lab instantly sees the new order in their queue with priority and prep quality score.', portal: 'lab', path: '/lab', duration: 4000 },
  { id: 'stl-review', title: 'STL Review', description: 'The AI-generated crown is reviewed with margin gap analysis. 218\u03BCm lingual zone gets flagged.', portal: 'lab', path: '/lab/review', duration: 5000 },
  { id: 'milling', title: 'Milling Queue', description: 'Approved crowns enter the milling queue. Machine utilization and material inventory tracked live.', portal: 'lab', path: '/lab/milling', duration: 4000 },
  { id: 'academic', title: 'Academic Training', description: '124 students learning prep quality across 3 universities. Better preps = better AI results.', portal: 'academic', path: '/academic', duration: 4000 },
  { id: 'admin-health', title: 'System Health', description: 'All 7 services operational. 4x A100 GPUs at 54% utilization. 99.97% uptime.', portal: 'admin', path: '/admin', duration: 4000 },
  { id: 'command-ops', title: 'Command Center', description: 'Live event feed, 1,847 crowns processed, $61.2K MRR. Full business visibility.', portal: 'command', path: '/command', duration: 5000 },
  { id: 'gtm', title: 'GTM Progress', description: 'Phase 3: Clinic Revenue — 23 active clinics, targeting $100K MRR for Series A.', portal: 'command', path: '/command/gtm', duration: 4000 },
  { id: 'cta', title: 'Ready to Get Started?', description: 'ToothFerry AI — AI-generated dental crowns in under 2 minutes. From scan to STL.', portal: 'landing', path: '/', duration: 0 },
];

interface TourStore {
  active: boolean;
  currentStepIndex: number;
  paused: boolean;
  completed: boolean;
  steps: TourStep[];

  start: () => void;
  pause: () => void;
  resume: () => void;
  next: () => void;
  previous: () => void;
  goTo: (index: number) => void;
  stop: () => void;
  getCurrentStep: () => TourStep | null;
}

export const useTourStore = create<TourStore>((set, get) => ({
  active: false,
  currentStepIndex: 0,
  paused: false,
  completed: false,
  steps: TOUR_STEPS,

  start: () => set({ active: true, currentStepIndex: 0, paused: false, completed: false }),
  pause: () => set({ paused: true }),
  resume: () => set({ paused: false }),

  next: () => {
    const { currentStepIndex, steps } = get();
    if (currentStepIndex < steps.length - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
    } else {
      set({ completed: true, active: false });
    }
  },

  previous: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1 });
    }
  },

  goTo: (index) => set({ currentStepIndex: index }),
  stop: () => set({ active: false, paused: false }),

  getCurrentStep: () => {
    const { steps, currentStepIndex } = get();
    return steps[currentStepIndex] ?? null;
  },
}));
