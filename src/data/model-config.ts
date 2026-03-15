export interface ModelParameter {
  key: string;
  label: string;
  value: string | number;
  type: 'number' | 'string' | 'boolean';
  editable: boolean;
}

export const SEED_MODEL_CONFIG = {
  name: 'MeshSegNet',
  version: 'v2.3.1',
  lastTrained: '2026-02-28',
  parameters: [
    { key: 'num_channels', label: 'Input channels', value: 18, type: 'number' as const, editable: false },
    { key: 'num_classes', label: 'Output classes', value: 17, type: 'number' as const, editable: false },
    { key: 'learning_rate', label: 'Learning rate', value: 0.001, type: 'number' as const, editable: true },
    { key: 'batch_size', label: 'Batch size', value: 16, type: 'number' as const, editable: true },
    { key: 'margin_ensemble_folds', label: 'Margin ensemble folds', value: 5, type: 'number' as const, editable: true },
    { key: 'confidence_threshold', label: 'Confidence threshold', value: 0.85, type: 'number' as const, editable: true },
    { key: 'max_triangles', label: 'Max mesh triangles', value: 10000, type: 'number' as const, editable: true },
    { key: 'margin_gap_threshold', label: 'Margin gap alert (μm)', value: 200, type: 'number' as const, editable: true },
  ],
  gpu: {
    type: 'NVIDIA A100 80GB',
    count: 4,
    utilization: 54,
  },
};
