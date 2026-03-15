export type CaseStatus = 'submitted' | 'ingesting' | 'segmenting' | 'detecting-margin' | 'generating' | 'reviewing' | 'approved' | 'milling' | 'sintering' | 'completed' | 'flagged';

export type Material = 'zirconia' | 'e-max' | 'pmma' | 'composite';

export type MarginType = 'chamfer' | 'shoulder' | 'knife-edge' | 'deep-chamfer';

export type ToothPosition = string; // e.g. '#14', '#19', '#3', '#8', '#30'

export interface PipelineStage {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  progress: number; // 0-100
  duration?: number; // ms
}

export interface QCResult {
  marginGap: number; // μm
  occlusionClearance: number;
  contactPoints: { mesial: boolean; distal: boolean };
  confidence: number; // 0-100
  flags: string[];
}

export interface Case {
  id: string; // e.g. 'TF-20260314-048'
  shortId: string; // e.g. 'TF-048'
  patientId: string;
  patientName: string;
  dentistName: string;
  toothNumber: ToothPosition;
  toothName: string; // e.g. 'UL6', 'central incisor'
  material: Material;
  marginType: MarginType;
  status: CaseStatus;
  priority: 'urgent' | 'standard' | 'low';
  pipeline: PipelineStage[];
  pipelineProgress: number; // overall 0-100
  qc?: QCResult;
  prepScore: number; // 0-4
  confidence: number; // 0-100
  createdAt: Date;
  updatedAt: Date;
  scanner: string; // '3Shape' | 'iTero' | 'Medit'
}
