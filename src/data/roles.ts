export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

export const SEED_ROLES: Role[] = [
  { id: 'R-001', name: 'Super Admin', description: 'Full system access', permissions: ['*'], userCount: 2 },
  { id: 'R-002', name: 'Lab Manager', description: 'Lab portal + billing', permissions: ['lab.*', 'billing.*', 'orders.*'], userCount: 3 },
  { id: 'R-003', name: 'Lab Technician', description: 'Lab production only', permissions: ['lab.orders', 'lab.review', 'lab.milling'], userCount: 8 },
  { id: 'R-004', name: 'Dentist', description: 'Dentist portal access', permissions: ['dentist.*', 'cases.own'], userCount: 23 },
  { id: 'R-005', name: 'Professor', description: 'Academic portal admin', permissions: ['academic.*', 'students.*'], userCount: 4 },
  { id: 'R-006', name: 'Student', description: 'Academic portal student', permissions: ['academic.modules', 'academic.self-eval'], userCount: 124 },
  { id: 'R-007', name: 'Viewer', description: 'Read-only access', permissions: ['*.read'], userCount: 5 },
];
