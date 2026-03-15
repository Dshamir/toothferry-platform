'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useSimulationStore } from '@/store/simulation-store';

const QUEUED_JOBS = [
  { id: 'BJ-012', material: 'Zirconia', cases: 4, estimatedTime: '18 min', status: 'queued' as const },
  { id: 'BJ-013', material: 'E-max', cases: 2, estimatedTime: '12 min', status: 'queued' as const },
  { id: 'BJ-014', material: 'Zirconia', cases: 3, estimatedTime: '14 min', status: 'queued' as const },
  { id: 'BJ-015', material: 'PMMA', cases: 5, estimatedTime: '8 min', status: 'queued' as const },
];

export default function LabBatchProcessing() {
  const labOrders = useSimulationStore((s) => s.labOrders);
  const generatingOrders = labOrders.filter((o) => o.status === 'generating');

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page heading */}
        <div>
          <h1 className="text-[22px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            Batch Processing
          </h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
            GPU-accelerated crown generation pipeline
          </p>
        </div>

        {/* Info alert */}
        <div className="flex items-start gap-3 px-4 py-3 rounded-[var(--radius-card)] bg-[var(--color-info-bg,#eff6ff)] border border-[var(--color-info-border,#bfdbfe)]">
          <span className="text-[16px] mt-0.5">&#x26A1;</span>
          <p className="text-[13px] text-[var(--color-info-text,#1e40af)] leading-relaxed">
            <strong>Batch mode active.</strong> Orders of the same material are grouped for optimized GPU throughput.
            Current batch uses <strong>NVIDIA A100 &middot; 73% VRAM</strong>. Estimated completion in 4 min 12 s.
          </p>
        </div>

        {/* Current Job */}
        <Card>
          <CardHeader>
            <CardTitle>Current Batch &mdash; BJ-011</CardTitle>
            <Badge variant="progress">Processing</Badge>
          </CardHeader>

          <div className="space-y-4">
            {/* Summary row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--color-text-secondary)] mb-1">Material</div>
                <div className="text-[14px] font-semibold text-[var(--color-text-primary)]">Monolithic Zirconia</div>
              </div>
              <div>
                <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--color-text-secondary)] mb-1">Cases</div>
                <div className="text-[14px] font-semibold text-[var(--color-text-primary)]">3 crowns</div>
              </div>
              <div>
                <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--color-text-secondary)] mb-1">GPU</div>
                <div className="text-[14px] font-semibold text-[var(--color-text-primary)]">NVIDIA A100</div>
              </div>
              <div>
                <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--color-text-secondary)] mb-1">ETA</div>
                <div className="text-[14px] font-semibold text-[var(--color-text-primary)]">4 min 12 s</div>
              </div>
            </div>

            {/* Main progress bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-semibold text-[var(--color-text-primary)]">Overall Progress</span>
                <span className="text-[13px] font-bold text-[var(--brand-600,var(--p-cobalt-600))]">73%</span>
              </div>
              <ProgressBar value={73} color="var(--brand-500, var(--p-cobalt-500))" height={10} />
            </div>

            {/* Sub-stages */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Mesh segmentation', progress: 100, status: 'Complete' },
                { label: 'Margin detection', progress: 100, status: 'Complete' },
                { label: 'Crown generation', progress: 73, status: 'Running...' },
              ].map((stage) => (
                <div key={stage.label} className="bg-[var(--color-bg-sunken)] rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-[var(--color-text-secondary)]">{stage.label}</span>
                    <span className={`text-[10px] font-semibold ${stage.progress === 100 ? 'text-[var(--p-green-600)]' : 'text-[var(--brand-600,var(--p-cobalt-600))]'}`}>
                      {stage.status}
                    </span>
                  </div>
                  <ProgressBar
                    value={stage.progress}
                    color={stage.progress === 100 ? 'var(--p-green-500, #10b981)' : 'var(--brand-500, var(--p-cobalt-500))'}
                    height={4}
                  />
                </div>
              ))}
            </div>

            {/* Included orders */}
            <div className="border-t border-[var(--color-border-subtle)] pt-3">
              <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--color-text-secondary)] mb-2">Included Orders</div>
              <div className="flex flex-wrap gap-2">
                {generatingOrders.length > 0
                  ? generatingOrders.map((o) => (
                      <span key={o.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--brand-50,var(--p-cobalt-50))] text-[12px] font-mono font-semibold text-[var(--brand-700,var(--p-cobalt-700))]">
                        {o.id} &middot; {o.toothNumber}
                      </span>
                    ))
                  : ['LO-046 · #3', 'LO-048 · #14', 'LO-044 · #30'].map((label) => (
                      <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--brand-50,var(--p-cobalt-50))] text-[12px] font-mono font-semibold text-[var(--brand-700,var(--p-cobalt-700))]">
                        {label}
                      </span>
                    ))
                }
              </div>
            </div>
          </div>
        </Card>

        {/* Queued Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Queued Batches</CardTitle>
            <span className="text-[12px] text-[var(--color-text-secondary)]">{QUEUED_JOBS.length} pending</span>
          </CardHeader>
          <StaggerChildren className="space-y-3">
            {QUEUED_JOBS.map((job, i) => (
              <StaggerItem key={job.id}>
                <div
                  className="flex items-center justify-between p-4 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-sunken)] transition-opacity"
                  style={{ opacity: 1 - i * 0.15 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[var(--brand-100,var(--p-cobalt-100))] flex items-center justify-center text-[12px] font-bold text-[var(--brand-600,var(--p-cobalt-600))]">
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-[var(--color-text-primary)]">
                        {job.id} &middot; {job.material}
                      </div>
                      <div className="text-[11px] text-[var(--color-text-secondary)]">
                        {job.cases} cases &middot; Est. {job.estimatedTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="pending">Queued</Badge>
                    <Button variant="ghost" size="sm">Prioritize</Button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Card>
      </div>
    </PageTransition>
  );
}
