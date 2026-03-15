export type SimulationSpeed = 1 | 2 | 4;

export type SimulationEventType =
  | 'CASE_SUBMITTED'
  | 'STAGE_COMPLETE'
  | 'CASE_READY_FOR_REVIEW'
  | 'CASE_FLAGGED'
  | 'CASE_APPROVED'
  | 'MILLING_STARTED'
  | 'MILLING_COMPLETE'
  | 'MATERIAL_DEPLETED'
  | 'STUDENT_EVAL_UPDATED'
  | 'METRIC_UPDATE'
  | 'ALERT_FIRED'
  | 'NOTIFICATION_CREATED';

export interface SimulationEvent {
  id: string;
  type: SimulationEventType;
  payload: Record<string, unknown>;
  timestamp: Date;
  portal: string;
}

export interface SimulationState {
  running: boolean;
  speed: SimulationSpeed;
  tick: number;
  startedAt: Date | null;
}
