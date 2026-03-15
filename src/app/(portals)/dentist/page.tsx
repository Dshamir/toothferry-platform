'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { KpiCard } from '@/components/ui/KpiCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useSimulationStore } from '@/store/simulation-store';

const PIPELINE_STAGES = [
  { label: 'Submitted', key: 'submitted' },
  { label: 'Ingesting', key: 'ingesting' },
  { label: 'Segmenting', key: 'segmenting' },
  { label: 'Generating', key: 'generating' },
  { label: 'Reviewing', key: 'reviewing' },
  { label: 'Approved', key: 'approved' },
];

const statusToBadge: Record<string, 'progress' | 'ready' | 'review' | 'reviewed' | 'pending' | 'error' | 'success' | 'info'> = {
  submitted: 'pending',
  ingesting: 'progress',
  segmenting: 'progress',
  'detecting-margin': 'progress',
  generating: 'progress',
  reviewing: 'review',
  approved: 'success',
  milling: 'info',
  sintering: 'info',
  completed: 'ready',
  flagged: 'error',
};

export default function DentistDashboard() {
  const cases = useSimulationStore((s) => s.cases);

  const countByStatus = (statuses: string[]) =>
    cases.filter((c) => statuses.includes(c.status)).length;

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page heading */}
        <div>
          <h1 className="text-[22px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            Dentist Dashboard
          </h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
            Crown generation overview and recent activity
          </p>
        </div>

        {/* KPI Cards */}
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StaggerItem>
            <KpiCard label="Crowns / Month" value={31} delta="+12% vs last month" deltaDirection="up" />
          </StaggerItem>
          <StaggerItem>
            <KpiCard label="Avg Design Time" value="1:47" delta="-18s vs last week" deltaDirection="down" />
          </StaggerItem>
          <StaggerItem>
            <KpiCard label="First-Pass Acceptance" value={97} suffix="%" delta="+2.1% vs avg" deltaDirection="up" />
          </StaggerItem>
          <StaggerItem>
            <KpiCard label="Prep Quality Score" value="3.1" suffix="/4" delta="Good" deltaDirection="neutral" />
          </StaggerItem>
        </StaggerChildren>

        {/* Pipeline Status */}
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Status</CardTitle>
          </CardHeader>
          <div className="flex items-center justify-between gap-2 px-2">
            {PIPELINE_STAGES.map((stage, i) => {
              const count = countByStatus(
                stage.key === 'submitted' ? ['submitted'] :
                stage.key === 'ingesting' ? ['ingesting'] :
                stage.key === 'segmenting' ? ['segmenting', 'detecting-margin'] :
                stage.key === 'generating' ? ['generating'] :
                stage.key === 'reviewing' ? ['reviewing'] :
                ['approved', 'milling', 'sintering', 'completed']
              );
              return (
                <div key={stage.key} className="flex flex-col items-center flex-1">
                  <div className="flex items-center w-full">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold border-2 mx-auto transition-colors ${
                        count > 0
                          ? 'bg-[var(--brand-50,var(--p-cobalt-50))] border-[var(--brand-500,var(--p-cobalt-500))] text-[var(--brand-700,var(--p-cobalt-700))]'
                          : 'bg-[var(--color-bg-sunken)] border-[var(--color-border-subtle)] text-[var(--color-text-tertiary)]'
                      }`}
                    >
                      {count}
                    </div>
                    {i < PIPELINE_STAGES.length - 1 && (
                      <div className="flex-1 h-[2px] bg-[var(--color-border-subtle)]" />
                    )}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mt-2">
                    {stage.label}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Cases Table */}
        <Card padding={false}>
          <div className="p-6 pb-0">
            <CardHeader>
              <CardTitle>Recent Cases</CardTitle>
              <span className="text-[11px] text-[var(--color-text-secondary)]">{cases.length} total</span>
            </CardHeader>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  {['Case ID', 'Patient', 'Tooth', 'Material', 'Status', 'Prep Score', 'Confidence', 'Date'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold tracking-[0.04em] uppercase text-[var(--color-text-secondary)] bg-[var(--color-bg-sunken)] border-b border-[var(--color-border-subtle)]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cases.slice(0, 8).map((c) => (
                  <tr key={c.id} className="border-b border-[var(--color-border-subtle)] last:border-b-0 hover:bg-[var(--brand-25,var(--p-cobalt-25))] transition-colors">
                    <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-text-primary)]">{c.shortId}</td>
                    <td className="px-4 py-3 text-[var(--color-text-primary)]">{c.patientName}</td>
                    <td className="px-4 py-3 text-[var(--color-text-primary)]">{c.toothNumber}</td>
                    <td className="px-4 py-3 capitalize text-[var(--color-text-primary)]">{c.material}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusToBadge[c.status] || 'pending'}>{c.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-[var(--color-text-primary)]">{c.prepScore.toFixed(1)}</td>
                    <td className="px-4 py-3 text-[var(--color-text-primary)]">
                      {c.confidence > 0 ? `${c.confidence}%` : '\u2014'}
                    </td>
                    <td className="px-4 py-3 text-[var(--color-text-secondary)] text-[12px]">
                      {c.createdAt.toLocaleDateString('en-CA')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
