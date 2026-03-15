'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useSimulationStore } from '@/store/simulation-store';

export default function ResultsPage() {
  const cases = useSimulationStore((s) => s.cases);

  const completedCases = cases.filter(
    (c) => c.qc && ['approved', 'milling', 'sintering', 'completed', 'flagged'].includes(c.status)
  );

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-[22px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            Results &amp; QC Review
          </h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
            Crown design results with confidence breakdowns and QC outcomes
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--color-text-secondary)] mb-1">Completed Reviews</div>
            <div className="text-[28px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>{completedCases.length}</div>
          </Card>
          <Card>
            <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--color-text-secondary)] mb-1">Avg Confidence</div>
            <div className="text-[28px] font-bold text-[var(--p-green-600)]" style={{ fontFamily: 'var(--font-display)' }}>
              {completedCases.length > 0
                ? (completedCases.reduce((sum, c) => sum + c.confidence, 0) / completedCases.length).toFixed(1)
                : 0}%
            </div>
          </Card>
          <Card>
            <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--color-text-secondary)] mb-1">Flagged Cases</div>
            <div className="text-[28px] font-bold text-[var(--p-red-600)]" style={{ fontFamily: 'var(--font-display)' }}>
              {completedCases.filter((c) => c.status === 'flagged').length}
            </div>
          </Card>
        </div>

        {/* Case Results */}
        <StaggerChildren className="space-y-4">
          {completedCases.map((c) => (
            <StaggerItem key={c.id}>
              <Card>
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Case Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[13px] font-semibold text-[var(--color-text-primary)]">{c.shortId}</span>
                      <Badge variant={c.status === 'flagged' ? 'error' : 'success'}>{c.status}</Badge>
                      <span className="text-[12px] text-[var(--color-text-secondary)]">{c.patientName}</span>
                      <span className="text-[12px] text-[var(--color-text-tertiary)]">{c.toothNumber} &middot; {c.material}</span>
                    </div>

                    {/* Confidence Breakdown */}
                    {c.qc && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-text-secondary)] mb-1">Margin Gap</div>
                          <div className={`text-[15px] font-bold ${c.qc.marginGap <= 120 ? 'text-[var(--p-green-600)]' : 'text-[var(--p-red-600)]'}`}>
                            {c.qc.marginGap}\u00B5m
                          </div>
                          <ProgressBar
                            value={Math.max(0, 100 - (c.qc.marginGap / 2.5))}
                            color={c.qc.marginGap <= 120 ? 'var(--p-green-500)' : 'var(--p-red-500)'}
                            height={4}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-text-secondary)] mb-1">Occlusion</div>
                          <div className="text-[15px] font-bold text-[var(--color-text-primary)]">{c.qc.occlusionClearance}mm</div>
                          <ProgressBar value={(c.qc.occlusionClearance / 2.5) * 100} height={4} className="mt-1" />
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-text-secondary)] mb-1">Contacts</div>
                          <div className="text-[13px] text-[var(--color-text-primary)]">
                            <span className={c.qc.contactPoints.mesial ? 'text-[var(--p-green-600)]' : 'text-[var(--p-red-600)]'}>M: {c.qc.contactPoints.mesial ? 'OK' : 'Missing'}</span>
                            {' / '}
                            <span className={c.qc.contactPoints.distal ? 'text-[var(--p-green-600)]' : 'text-[var(--p-red-600)]'}>D: {c.qc.contactPoints.distal ? 'OK' : 'Missing'}</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-text-secondary)] mb-1">Confidence</div>
                          <div className={`text-[15px] font-bold ${c.qc.confidence >= 90 ? 'text-[var(--p-green-600)]' : c.qc.confidence >= 75 ? 'text-[var(--color-text-primary)]' : 'text-[var(--p-red-600)]'}`}>
                            {c.qc.confidence}%
                          </div>
                          <ProgressBar
                            value={c.qc.confidence}
                            color={c.qc.confidence >= 90 ? 'var(--p-green-500)' : c.qc.confidence >= 75 ? 'var(--p-cobalt-500)' : 'var(--p-red-500)'}
                            height={4}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    )}

                    {/* Flags */}
                    {c.qc && c.qc.flags.length > 0 && (
                      <div className="mt-3 p-3 rounded-[var(--radius-lg)] bg-[var(--p-red-50)] border border-[var(--p-red-200)]">
                        <div className="text-[11px] font-semibold uppercase text-[var(--p-red-600)] mb-1">Flags</div>
                        {c.qc.flags.map((f, i) => (
                          <div key={i} className="text-[12px] text-[var(--p-red-700)]">{f}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}

          {completedCases.length === 0 && (
            <Card>
              <div className="text-center py-10 text-[var(--color-text-tertiary)]">
                No completed cases with QC results yet.
              </div>
            </Card>
          )}
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
