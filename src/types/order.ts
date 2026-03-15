export interface LabOrder {
  id: string;
  caseId: string;
  dentistName: string;
  toothNumber: string;
  toothName: string;
  material: string;
  priority: 'urgent' | 'standard';
  status: 'pending' | 'generating' | 'review-required' | 'ready-to-mill' | 'milling' | 'sintering' | 'completed';
  receivedAt: Date;
  prepScore: number;
  confidence: number;
  marginGap?: number;
  flagReason?: string;
}

export interface Machine {
  id: string;
  name: string;
  type: 'zirconia-mill' | 'emax-mill' | 'sintering-oven';
  utilization: number; // 0-100
  currentJob?: string;
  status: 'idle' | 'running' | 'maintenance';
}

export interface MaterialInventory {
  id: string;
  name: string;
  type: string;
  quantity: number;
  maxQuantity: number;
  unit: string;
  criticalThreshold: number;
  reorderLeadDays: number;
}
