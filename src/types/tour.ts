export type TourStepId = string;

export interface TourStep {
  id: TourStepId;
  title: string;
  description: string;
  portal: string;
  path: string;
  spotlight?: string; // CSS selector
  action?: string; // simulation action to trigger
  waitForEvent?: string;
  duration?: number; // ms to auto-advance
}

export interface TourState {
  active: boolean;
  currentStepIndex: number;
  steps: TourStep[];
  paused: boolean;
  completed: boolean;
}
