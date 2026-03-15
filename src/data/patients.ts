import { Patient } from '@/types/patient';

export const SEED_PATIENTS: Patient[] = [
  { id: 'P-112', name: 'Sarah Chen', age: 45, lastVisit: new Date('2026-03-14'), totalCases: 3, activeCases: 1 },
  { id: 'P-098', name: 'Raj Patel', age: 38, lastVisit: new Date('2026-03-14'), totalCases: 2, activeCases: 1 },
  { id: 'P-105', name: 'James Kim', age: 52, lastVisit: new Date('2026-03-14'), totalCases: 5, activeCases: 1 },
  { id: 'P-091', name: 'Marie Roy', age: 34, lastVisit: new Date('2026-03-14'), totalCases: 1, activeCases: 1 },
  { id: 'P-087', name: 'Pierre Tremblay', age: 61, lastVisit: new Date('2026-03-14'), totalCases: 4, activeCases: 1 },
  { id: 'P-076', name: 'Lisa Wang', age: 29, lastVisit: new Date('2026-03-14'), totalCases: 2, activeCases: 1 },
  { id: 'P-064', name: 'David Nguyen', age: 48, lastVisit: new Date('2026-03-13'), totalCases: 6, activeCases: 0 },
  { id: 'P-058', name: 'Emily Thompson', age: 55, lastVisit: new Date('2026-03-13'), totalCases: 3, activeCases: 0 },
  { id: 'P-042', name: 'Michael Brown', age: 43, lastVisit: new Date('2026-03-12'), totalCases: 7, activeCases: 0 },
  { id: 'P-035', name: 'Sophie Leblanc', age: 39, lastVisit: new Date('2026-03-11'), totalCases: 2, activeCases: 0 },
];
