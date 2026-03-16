'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { KpiCard } from '@/components/ui/KpiCard';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { FadeSlideIn } from '@/components/animation/FadeSlideIn';
import { EditablePortalPage } from '@/components/shared/EditablePortalPage';

const phases = [
  { name: 'Submitted', count: 2, color: 'var(--p-cobalt-400)', percentage: 25 },
  { name: 'Ingesting', count: 0, color: 'var(--p-cobalt-300)', percentage: 0 },
  { name: 'Segmenting', count: 0, color: 'var(--p-teal-400)', percentage: 0 },
  { name: 'Generating', count: 1, color: 'var(--p-teal-500)', percentage: 12.5 },
  { name: 'Reviewing', count: 0, color: 'var(--p-amber-400)', percentage: 0 },
  { name: 'Approved', count: 1, color: 'var(--p-green-400)', percentage: 12.5 },
  { name: 'Milling', count: 1, color: 'var(--p-violet-400)', percentage: 12.5 },
  { name: 'Completed', count: 2, color: 'var(--p-green-600)', percentage: 25 },
  { name: 'Flagged', count: 1, color: 'var(--p-red-400)', percentage: 12.5 },
];

const cases = [
  { id: 'TF-048', patient: 'S. Chen', dentist: 'Dr. Chen', tooth: '#14 UL6', material: 'Zirconia', status: 'submitted', priority: 'urgent', time: '10:02', confidence: '--' },
  { id: 'TF-047', patient: 'R. Patel', dentist: 'Dr. Patel', tooth: '#19 LL6', material: 'E.max', status: 'submitted', priority: 'standard', time: '09:36', confidence: '--' },
  { id: 'TF-046', patient: 'J. Kim', dentist: 'Dr. Kim', tooth: '#3 UR6', material: 'Zirconia', status: 'generating', priority: 'standard', time: '09:20', confidence: '96%' },
  { id: 'TF-045', patient: 'M. Roy', dentist: 'Dr. Roy', tooth: '#8 Central', material: 'E.max', status: 'flagged', priority: 'standard', time: '08:45', confidence: '72%' },
  { id: 'TF-044', patient: 'P. Tremblay', dentist: 'Dr. Tremblay', tooth: '#30 LR6', material: 'Zirconia', status: 'approved', priority: 'standard', time: '08:10', confidence: '94%' },
  { id: 'TF-043', patient: 'L. Wang', dentist: 'Dr. Wang', tooth: '#12 UL4', material: 'E.max', status: 'milling', priority: 'standard', time: '07:30', confidence: '97%' },
  { id: 'TF-042', patient: 'D. Nguyen', dentist: 'Dr. Nguyen', tooth: '#19 LL6', material: 'Zirconia', status: 'completed', priority: 'standard', time: 'Yesterday', confidence: '95%' },
  { id: 'TF-041', patient: 'E. Thompson', dentist: 'Dr. Thompson', tooth: '#5 UR5', material: 'Zirconia', status: 'completed', priority: 'standard', time: 'Yesterday', confidence: '98%' },
];

const statusBadge: Record<string, { variant: 'ready' | 'pending' | 'reviewed' | 'error' | 'progress' | 'info'; label: string }> = {
  submitted: { variant: 'ready', label: 'Submitted' },
  ingesting: { variant: 'info', label: 'Ingesting' },
  segmenting: { variant: 'info', label: 'Segmenting' },
  generating: { variant: 'pending', label: 'Generating' },
  reviewing: { variant: 'pending', label: 'Reviewing' },
  approved: { variant: 'reviewed', label: 'Approved' },
  milling: { variant: 'info', label: 'Milling' },
  completed: { variant: 'reviewed', label: 'Completed' },
  flagged: { variant: 'error', label: 'Flagged' },
};

export default function OperatorPage() {
  return (
    <EditablePortalPage slug="operator">
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg-page)] p-8">
        {/* Hero Section */}
        <FadeSlideIn>
          <div className="bg-gradient-to-r from-[var(--p-cobalt-700)] to-[var(--p-cobalt-500)] rounded-[var(--radius-xl)] p-8 mb-8 text-white">
            <h1 className="text-[38px] font-extrabold leading-tight mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Case Routing
            </h1>
            <p className="text-[15px] text-white/80 mb-6 max-w-xl">
              Real-time dashboard for monitoring AI crown generation pipeline.
              Route, prioritize, and track every case from scan to delivery.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-[30px] font-bold" style={{ fontFamily: 'var(--font-display)' }}>8</div>
                <div className="text-[11px] uppercase tracking-wider text-white/60">Active Cases</div>
              </div>
              <div>
                <div className="text-[30px] font-bold" style={{ fontFamily: 'var(--font-display)' }}>2</div>
                <div className="text-[11px] uppercase tracking-wider text-white/60">Completed Today</div>
              </div>
              <div>
                <div className="text-[30px] font-bold" style={{ fontFamily: 'var(--font-display)' }}>1</div>
                <div className="text-[11px] uppercase tracking-wider text-white/60">Flagged</div>
              </div>
              <div>
                <div className="text-[30px] font-bold" style={{ fontFamily: 'var(--font-display)' }}>94%</div>
                <div className="text-[11px] uppercase tracking-wider text-white/60">Avg Confidence</div>
              </div>
            </div>
          </div>
        </FadeSlideIn>

        {/* Phase Bar */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pipeline Phase Distribution</CardTitle>
            <span className="text-[13px] text-[var(--color-text-secondary)]">8 cases across 9 phases</span>
          </CardHeader>

          {/* Visual phase bar */}
          <div className="flex gap-1 mb-4 rounded-full overflow-hidden h-8">
            {phases.filter((p) => p.count > 0).map((phase) => (
              <div
                key={phase.name}
                className="flex items-center justify-center text-[9px] font-bold text-white uppercase tracking-wider transition-all"
                style={{
                  background: phase.color,
                  flex: phase.count,
                  minWidth: phase.count > 0 ? '60px' : '0',
                }}
              >
                {phase.name} ({phase.count})
              </div>
            ))}
          </div>

          {/* Phase detail row */}
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {phases.map((phase) => (
              <div key={phase.name} className="text-center">
                <div className="text-[20px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                  {phase.count}
                </div>
                <div className="text-[9px] text-[var(--color-text-tertiary)] uppercase tracking-wider">
                  {phase.name}
                </div>
                <div className="mt-1 h-1 rounded-full" style={{ background: phase.color }} />
              </div>
            ))}
          </div>
        </Card>

        {/* Case Distribution Table */}
        <StaggerChildren>
          <StaggerItem>
            <Card padding={false}>
              <div className="p-5 pb-0">
                <CardHeader>
                  <CardTitle>Case Distribution</CardTitle>
                  <Badge variant="info">Live</Badge>
                </CardHeader>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[var(--table-th-bg)]">
                      <th className="text-left px-4 py-3 text-[var(--table-th-text)] text-[11px] font-semibold uppercase tracking-wider">Case</th>
                      <th className="text-left px-4 py-3 text-[var(--table-th-text)] text-[11px] font-semibold uppercase tracking-wider">Patient</th>
                      <th className="text-left px-4 py-3 text-[var(--table-th-text)] text-[11px] font-semibold uppercase tracking-wider">Dentist</th>
                      <th className="text-left px-4 py-3 text-[var(--table-th-text)] text-[11px] font-semibold uppercase tracking-wider">Tooth</th>
                      <th className="text-left px-4 py-3 text-[var(--table-th-text)] text-[11px] font-semibold uppercase tracking-wider">Material</th>
                      <th className="text-center px-4 py-3 text-[var(--table-th-text)] text-[11px] font-semibold uppercase tracking-wider">Status</th>
                      <th className="text-center px-4 py-3 text-[var(--table-th-text)] text-[11px] font-semibold uppercase tracking-wider">Priority</th>
                      <th className="text-center px-4 py-3 text-[var(--table-th-text)] text-[11px] font-semibold uppercase tracking-wider">Confidence</th>
                      <th className="text-right px-4 py-3 text-[var(--table-th-text)] text-[11px] font-semibold uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cases.map((c) => (
                      <tr key={c.id} className="border-t border-[var(--color-border-subtle)] hover:bg-[var(--table-row-hover)] transition-colors">
                        <td className="px-4 py-3 text-[13px] font-bold text-[var(--color-text-link)]" style={{ fontFamily: 'var(--font-mono)' }}>
                          {c.id}
                        </td>
                        <td className="px-4 py-3 text-[13px] text-[var(--color-text-primary)]">{c.patient}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--color-text-secondary)]">{c.dentist}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-mono)' }}>{c.tooth}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--color-text-secondary)]">{c.material}</td>
                        <td className="px-4 py-3 text-center">
                          <Badge variant={statusBadge[c.status]?.variant || 'progress'}>
                            {statusBadge[c.status]?.label || c.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {c.priority === 'urgent' ? (
                            <Badge variant="error">Urgent</Badge>
                          ) : (
                            <span className="text-[11px] text-[var(--color-text-tertiary)]">Standard</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`text-[13px] font-bold ${
                            c.confidence === '--' ? 'text-[var(--color-text-tertiary)]' :
                            parseInt(c.confidence) >= 90 ? 'text-[var(--p-green-600)]' :
                            parseInt(c.confidence) >= 80 ? 'text-[var(--p-amber-600)]' :
                            'text-[var(--p-red-600)]'
                          }`}>
                            {c.confidence}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[11px] text-[var(--color-text-tertiary)] text-right">{c.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </PageTransition>
    </EditablePortalPage>
  );
}
