export interface TourScenario {
  id: string;
  name: string;
  steps: ScenarioStep[];
}

export interface ScenarioStep {
  type: 'navigate' | 'event' | 'wait' | 'highlight';
  payload: Record<string, unknown>;
  delay?: number; // ms before executing
}

export const CROWN_LIFECYCLE_TOUR: TourScenario = {
  id: 'crown-lifecycle',
  name: 'Crown Lifecycle Demo',
  steps: [
    { type: 'navigate', payload: { path: '/' }, delay: 0 },
    { type: 'navigate', payload: { path: '/dentist' }, delay: 2000 },
    { type: 'navigate', payload: { path: '/dentist/generate' }, delay: 3000 },
    { type: 'event', payload: { type: 'CASE_SUBMITTED', data: { shortId: 'TF-DEMO' } }, delay: 2000 },
    { type: 'navigate', payload: { path: '/dentist' }, delay: 4000 },
    { type: 'navigate', payload: { path: '/lab' }, delay: 3000 },
    { type: 'navigate', payload: { path: '/lab/review' }, delay: 3000 },
    { type: 'event', payload: { type: 'CASE_APPROVED', data: {} }, delay: 2000 },
    { type: 'navigate', payload: { path: '/lab/milling' }, delay: 2000 },
    { type: 'navigate', payload: { path: '/admin' }, delay: 3000 },
    { type: 'navigate', payload: { path: '/command' }, delay: 3000 },
    { type: 'navigate', payload: { path: '/' }, delay: 3000 },
  ],
};
