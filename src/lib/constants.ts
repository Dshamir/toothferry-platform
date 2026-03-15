export const PIPELINE_STAGES = [
  { id: 'ingest', label: 'Ingest scan', shortLabel: 'Ingest' },
  { id: 'segment', label: 'Segment arch', shortLabel: 'Segment' },
  { id: 'margin', label: 'Detect margin', shortLabel: 'Margin' },
  { id: 'generate', label: 'Generate crown', shortLabel: 'Generate' },
  { id: 'validate', label: 'QC validate', shortLabel: 'Validate' },
  { id: 'export', label: 'Export STL', shortLabel: 'Export' },
] as const;

export const MATERIALS = {
  zirconia: { label: 'Monolithic Zirconia', color: '#0D7E72', shortLabel: 'Zirconia' },
  'e-max': { label: 'IPS e.max', color: '#EF9F27', shortLabel: 'E-max' },
  pmma: { label: 'PMMA (Temporary)', color: '#64748B', shortLabel: 'PMMA' },
  composite: { label: 'Composite', color: '#534AB7', shortLabel: 'Composite' },
} as const;

export const MARGIN_GAP_THRESHOLD = 200; // μm — human-quality threshold
export const MEAN_MARGIN_ACCURACY = 70.7; // μm
export const DESIGN_TIME_SECONDS = 107; // ~1:47

export const PREP_AXES = [
  'Taper angle',
  'Margin depth',
  'Occlusal clearance',
  'Wall height',
  'Surface smoothness',
] as const;

export const SCANNER_TYPES = ['3Shape TRIOS', 'iTero Element', 'Medit i700', 'Carestream CS3800', 'Planmeca Emerald'] as const;

export const SIMULATION_SPEEDS = [1, 2, 4] as const;

export const STAGE_DURATIONS = {
  ingest: { min: 1000, max: 2000 },
  segment: { min: 2000, max: 4000 },
  margin: { min: 3000, max: 6000 },
  generate: { min: 4000, max: 8000 },
  validate: { min: 1000, max: 2000 },
  export: { min: 500, max: 1000 },
} as const;

export const FLAG_RATE = 0.15; // 15% of cases get flagged
export const INCISOR_FLAG_RATE = 0.35; // higher for incisors
