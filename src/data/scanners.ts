export interface ScannerAdapter {
  id: string;
  name: string;
  manufacturer: string;
  formats: string[];
  status: 'active' | 'beta' | 'planned';
  version: string;
  meshResolution: string;
}

export const SEED_SCANNERS: ScannerAdapter[] = [
  { id: 'SC-001', name: '3Shape TRIOS', manufacturer: '3Shape', formats: ['STL', 'OBJ', 'PLY'], status: 'active', version: '2.4.1', meshResolution: '10k triangles' },
  { id: 'SC-002', name: 'iTero Element 5D', manufacturer: 'Align Technology', formats: ['STL', 'OBJ'], status: 'active', version: '2.3.0', meshResolution: '12k triangles' },
  { id: 'SC-003', name: 'Medit i700', manufacturer: 'Medit', formats: ['STL', 'PLY'], status: 'active', version: '2.1.3', meshResolution: '10k triangles' },
  { id: 'SC-004', name: 'Carestream CS3800', manufacturer: 'Carestream Dental', formats: ['STL'], status: 'beta', version: '1.0.0-beta', meshResolution: '8k triangles' },
  { id: 'SC-005', name: 'Planmeca Emerald S', manufacturer: 'Planmeca', formats: ['STL', 'OBJ'], status: 'beta', version: '0.9.2', meshResolution: '9k triangles' },
];
