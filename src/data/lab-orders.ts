import { LabOrder, Machine, MaterialInventory } from '@/types/order';

export const SEED_LAB_ORDERS: LabOrder[] = [
  { id: 'LO-048', caseId: 'TF-048', dentistName: 'Dr. Chen', toothNumber: '#14', toothName: 'UL6', material: 'Monolithic zirconia', priority: 'urgent', status: 'pending', receivedAt: new Date('2026-03-14T09:52:00'), prepScore: 3.2, confidence: 0 },
  { id: 'LO-047', caseId: 'TF-047', dentistName: 'Dr. Patel', toothNumber: '#19', toothName: 'LL6', material: 'E-max', priority: 'standard', status: 'pending', receivedAt: new Date('2026-03-14T09:36:00'), prepScore: 2.9, confidence: 0 },
  { id: 'LO-046', caseId: 'TF-046', dentistName: 'Dr. Kim', toothNumber: '#3', toothName: 'UR6', material: 'Zirconia', priority: 'standard', status: 'generating', receivedAt: new Date('2026-03-14T09:20:00'), prepScore: 3.4, confidence: 96 },
  { id: 'LO-045', caseId: 'TF-045', dentistName: 'Dr. Roy', toothNumber: '#8', toothName: 'Central incisor', material: 'E-max', priority: 'standard', status: 'review-required', receivedAt: new Date('2026-03-14T08:45:00'), prepScore: 2.4, confidence: 72, marginGap: 218, flagReason: 'Margin gap 218μm lingual zone — exceeds 200μm human threshold' },
  { id: 'LO-044', caseId: 'TF-044', dentistName: 'Dr. Tremblay', toothNumber: '#30', toothName: 'LR6', material: 'Zirconia', priority: 'standard', status: 'ready-to-mill', receivedAt: new Date('2026-03-14T08:10:00'), prepScore: 3.6, confidence: 94 },
  { id: 'LO-043', caseId: 'TF-043', dentistName: 'Dr. Wang', toothNumber: '#12', toothName: 'UL4', material: 'E-max', priority: 'standard', status: 'milling', receivedAt: new Date('2026-03-14T07:30:00'), prepScore: 3.8, confidence: 97 },
  { id: 'LO-042', caseId: 'TF-042', dentistName: 'Dr. Nguyen', toothNumber: '#19', toothName: 'LL6', material: 'Zirconia', priority: 'standard', status: 'completed', receivedAt: new Date('2026-03-13T14:20:00'), prepScore: 3.5, confidence: 95 },
];

export const SEED_MACHINES: Machine[] = [
  { id: 'M-001', name: 'Machine 1 — Zirconia', type: 'zirconia-mill', utilization: 78, currentJob: 'TF-043', status: 'running' },
  { id: 'M-002', name: 'Machine 2 — E-max', type: 'emax-mill', utilization: 45, status: 'idle' },
  { id: 'M-003', name: 'Sintering oven', type: 'sintering-oven', utilization: 90, currentJob: 'Batch-11', status: 'running' },
];

export const SEED_MATERIALS: MaterialInventory[] = [
  { id: 'MAT-001', name: 'Zirconia blocks', type: 'zirconia', quantity: 24, maxQuantity: 40, unit: 'blocks', criticalThreshold: 10, reorderLeadDays: 5 },
  { id: 'MAT-002', name: 'E-max blocks', type: 'e-max', quantity: 8, maxQuantity: 30, unit: 'blocks', criticalThreshold: 10, reorderLeadDays: 3 },
  { id: 'MAT-003', name: 'PMMA (temp)', type: 'pmma', quantity: 42, maxQuantity: 50, unit: 'blocks', criticalThreshold: 8, reorderLeadDays: 2 },
];
