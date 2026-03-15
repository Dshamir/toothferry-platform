export interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  category: string;
}

export const SEED_FEATURE_FLAGS: FeatureFlag[] = [
  { id: 'FF-001', key: 'ar_prep_guide', name: 'AR Prep Guide', description: 'Real-time augmented reality overlay for prep evaluation', enabled: true, category: 'dentist' },
  { id: 'FF-002', key: 'batch_processing', name: 'Batch Processing', description: 'Process multiple cases simultaneously in the AI pipeline', enabled: true, category: 'lab' },
  { id: 'FF-003', key: 'margin_ensemble', name: '5-Fold Margin Ensemble', description: 'Use ensemble method for margin detection (higher accuracy, slower)', enabled: true, category: 'ai' },
  { id: 'FF-004', key: 'auto_qc', name: 'Automatic QC Pass', description: 'Auto-approve cases with confidence > 95% and margin gap < 150μm', enabled: false, category: 'lab' },
  { id: 'FF-005', key: 'student_self_eval', name: 'Student Self-Evaluation', description: 'Allow students to run prep evaluation without professor approval', enabled: true, category: 'academic' },
  { id: 'FF-006', key: 'drop_ship', name: 'Drop-Ship Mode', description: 'Direct-to-dentist crown delivery bypassing lab pickup', enabled: false, category: 'dentist' },
  { id: 'FF-007', key: 'gpu_auto_scale', name: 'GPU Auto-Scaling', description: 'Automatically scale A100 instances based on queue depth', enabled: true, category: 'infra' },
  { id: 'FF-008', key: 'implant_module', name: 'Implant Crown Module', description: 'AI generation for implant-supported crowns', enabled: false, category: 'ai' },
  { id: 'FF-009', key: 'hipaa_audit_log', name: 'HIPAA Audit Logging', description: 'Enhanced audit trail for all PHI access events', enabled: true, category: 'compliance' },
  { id: 'FF-010', key: 'multi_tooth', name: 'Multi-Tooth Bridge', description: 'Generate 2-3 unit bridges from single scan', enabled: false, category: 'ai' },
];
