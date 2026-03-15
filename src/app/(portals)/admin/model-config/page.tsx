'use client';

import { useState } from 'react';
import { PageTransition } from '@/components/animation/PageTransition';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';

interface ModelParam {
  key: string;
  label: string;
  value: string;
  type: 'text' | 'number' | 'select';
  options?: string[];
  unit?: string;
  description: string;
}

const initialParams: ModelParam[] = [
  { key: 'model_version', label: 'Model Version', value: '2.3.1', type: 'text', description: 'Current MeshSegNet checkpoint version' },
  { key: 'inference_batch', label: 'Inference Batch Size', value: '8', type: 'number', description: 'Number of meshes processed per GPU batch' },
  { key: 'confidence_threshold', label: 'Confidence Threshold', value: '0.85', type: 'number', description: 'Minimum confidence for auto-approval', unit: '' },
  { key: 'margin_gap_limit', label: 'Margin Gap Limit', value: '200', type: 'number', unit: 'um', description: 'Maximum acceptable margin gap before flagging' },
  { key: 'mesh_resolution', label: 'Mesh Resolution', value: '10000', type: 'number', unit: 'triangles', description: 'Target triangle count for output mesh' },
  { key: 'occlusal_clearance_min', label: 'Min Occlusal Clearance', value: '1.5', type: 'number', unit: 'mm', description: 'Minimum clearance for occlusal surface' },
  { key: 'ensemble_mode', label: 'Ensemble Mode', value: '5-fold', type: 'select', options: ['single', '3-fold', '5-fold'], description: 'Margin detection ensemble strategy' },
  { key: 'gpu_memory_limit', label: 'GPU Memory Limit', value: '70', type: 'number', unit: 'GB', description: 'Max GPU memory allocation per job' },
  { key: 'timeout', label: 'Inference Timeout', value: '120', type: 'number', unit: 'seconds', description: 'Max time before inference job is killed' },
  { key: 'output_format', label: 'Output Format', value: 'STL', type: 'select', options: ['STL', 'OBJ', 'PLY', 'STEP'], description: 'Default export mesh format' },
];

export default function ModelConfigPage() {
  const [params, setParams] = useState(initialParams);
  const [hasChanges, setHasChanges] = useState(false);

  const updateParam = (key: string, value: string) => {
    setParams((prev) => prev.map((p) => (p.key === key ? { ...p, value } : p)));
    setHasChanges(true);
  };

  return (
    <PageTransition>
      <div data-portal="admin" className="min-h-screen bg-[var(--color-bg-page)] p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
                Model Configuration
              </h1>
              <Badge variant="info">MeshSegNet v2.3.1</Badge>
            </div>
            <p className="text-[15px] text-[var(--color-text-secondary)] mt-1">
              AI model parameters and inference settings
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" disabled={!hasChanges} onClick={() => { setParams(initialParams); setHasChanges(false); }}>
              Reset
            </Button>
            <Button variant="primary" size="sm" disabled={!hasChanges} onClick={() => setHasChanges(false)}>
              Save Changes
            </Button>
          </div>
        </div>

        {hasChanges && (
          <div className="bg-[var(--p-amber-50)] border border-[var(--p-amber-400)] rounded-[var(--radius-md)] px-4 py-3 mb-6 text-[13px] text-[var(--p-amber-800)]">
            You have unsaved changes. Click &quot;Save Changes&quot; to apply.
          </div>
        )}

        <StaggerChildren>
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle>Inference Parameters</CardTitle>
                <span className="text-[11px] text-[var(--color-text-tertiary)]" style={{ fontFamily: 'var(--font-mono)' }}>
                  Last updated: 2026-03-12 14:30 UTC
                </span>
              </CardHeader>
              <div className="space-y-5">
                {params.map((param) => (
                  <div key={param.key} className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start py-3 border-b border-[var(--color-border-subtle)] last:border-0">
                    <div>
                      <label className="text-[13px] font-semibold text-[var(--color-text-primary)] block mb-0.5">
                        {param.label}
                      </label>
                      <p className="text-[11px] text-[var(--color-text-tertiary)]">{param.description}</p>
                    </div>
                    <div className="lg:col-span-2 flex items-center gap-3">
                      {param.type === 'select' ? (
                        <select
                          value={param.value}
                          onChange={(e) => updateParam(param.key, e.target.value)}
                          className="h-[42px] px-4 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] text-[13px] outline-none focus:border-[#58A6FF] transition-colors"
                        >
                          {param.options!.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={param.type}
                          value={param.value}
                          onChange={(e) => updateParam(param.key, e.target.value)}
                          className="h-[42px] px-4 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] text-[13px] outline-none focus:border-[#58A6FF] transition-colors w-full max-w-[280px]"
                          style={{ fontFamily: param.type === 'number' ? 'var(--font-mono)' : undefined }}
                        />
                      )}
                      {param.unit && (
                        <span className="text-[11px] text-[var(--color-text-tertiary)] whitespace-nowrap">
                          {param.unit}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
