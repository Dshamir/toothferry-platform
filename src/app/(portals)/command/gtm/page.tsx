'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { SEED_GTM_PHASES } from '@/data/gtm-phases';

const statusBadge: Record<string, { variant: 'reviewed' | 'ready' | 'progress'; label: string }> = {
  completed: { variant: 'reviewed', label: 'Completed' },
  active: { variant: 'ready', label: 'Active' },
  upcoming: { variant: 'progress', label: 'Upcoming' },
};

const statusColor: Record<string, string> = {
  completed: '#3FB950',
  active: '#5DCAA5',
  upcoming: 'rgba(93,202,165,0.3)',
};

export default function GtmPage() {
  return (
    <PageTransition>
      <div data-portal="command" className="min-h-screen bg-[var(--color-bg-page)] p-8" style={{ fontFamily: 'var(--font-mono)' }}>
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
            Go-to-Market
          </h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
            GTM phases, milestones, and target tracking
          </p>
        </div>

        {/* Phase Timeline Bar */}
        <div className="flex gap-1 mb-8 rounded-full overflow-hidden h-3">
          {SEED_GTM_PHASES.map((phase) => (
            <div
              key={phase.id}
              className="flex-1 transition-all"
              style={{ background: statusColor[phase.status], opacity: phase.status === 'upcoming' ? 0.3 : 1 }}
            />
          ))}
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SEED_GTM_PHASES.map((phase) => (
            <StaggerItem key={phase.id}>
              <Card className={`bg-[var(--card-bg,rgba(0,0,0,0.3))] ${phase.status === 'upcoming' ? 'opacity-60' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold tracking-[0.1em] text-[var(--color-text-tertiary)]">
                      {phase.name}
                    </span>
                    <Badge variant={statusBadge[phase.status].variant}>
                      {statusBadge[phase.status].label}
                    </Badge>
                  </div>
                  <span className="text-[11px] text-[var(--color-text-tertiary)]">{phase.timeline}</span>
                </div>

                <h3 className="text-[17px] font-bold text-[var(--color-text-primary)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {phase.title}
                </h3>
                <p className="text-[13px] text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                  {phase.description}
                </p>

                <ProgressBar value={phase.progress} color={statusColor[phase.status]} height={5} className="mb-4" />

                <div className="space-y-3">
                  {phase.targets.map((target) => (
                    <div key={target.label} className="flex items-center justify-between py-1.5 border-b border-[var(--color-border-subtle)] last:border-0">
                      <span className="text-[11px] text-[var(--color-text-secondary)]">{target.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-[var(--color-text-tertiary)]">Target: {target.target}</span>
                        <span className="text-[13px] font-bold text-[var(--color-text-primary)]">{target.actual}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
