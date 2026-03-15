'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';

const modules = [
  { id: 1, title: 'Margin Fundamentals', description: 'Types of margin preparations: chamfer, shoulder, knife-edge', locked: false, progress: 100, status: 'completed' as const },
  { id: 2, title: 'Chamfer Technique', description: 'Creating consistent chamfer margins with proper depth', locked: false, progress: 100, status: 'completed' as const },
  { id: 3, title: 'Shoulder Preparation', description: 'Flat shoulder margins for all-ceramic restorations', locked: false, progress: 72, status: 'in-progress' as const },
  { id: 4, title: 'Deep Chamfer Mastery', description: 'Advanced chamfer with increased axial depth', locked: false, progress: 30, status: 'in-progress' as const },
  { id: 5, title: 'Subgingival Margins', description: 'Managing margin placement below the gingival crest', locked: true, progress: 0, status: 'locked' as const },
  { id: 6, title: 'Digital Margin Analysis', description: 'Using AI tools to evaluate margin quality from scans', locked: true, progress: 0, status: 'locked' as const },
  { id: 7, title: 'Clinical Cases', description: 'Real-world margin scenarios with patient scan data', locked: true, progress: 0, status: 'locked' as const },
];

const statusBadge: Record<string, { variant: 'reviewed' | 'pending' | 'progress'; label: string }> = {
  completed: { variant: 'reviewed', label: 'Completed' },
  'in-progress': { variant: 'pending', label: 'In Progress' },
  locked: { variant: 'progress', label: 'Locked' },
};

export default function MarginTrainingPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg-page)] p-8">
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
            Margin Line Training
          </h1>
          <p className="text-[15px] text-[var(--color-text-secondary)] mt-1">
            Progressive modules for mastering margin preparation techniques
          </p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <ProgressBar value={43} color="var(--p-violet-500)" height={8} />
          </div>
          <span className="text-[13px] font-semibold text-[var(--color-text-primary)]">43% Complete</span>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod) => (
            <StaggerItem key={mod.id}>
              <Card className={`relative ${mod.locked ? 'opacity-60' : ''}`}>
                {mod.locked && (
                  <div className="absolute top-4 right-4 text-[20px]">&#128274;</div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-bold text-[var(--color-text-tertiary)] tracking-wider">
                    MODULE {mod.id}
                  </span>
                  <Badge variant={statusBadge[mod.status].variant}>
                    {statusBadge[mod.status].label}
                  </Badge>
                </div>
                <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)] mb-2">
                  {mod.title}
                </h3>
                <p className="text-[13px] text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                  {mod.description}
                </p>
                {!mod.locked && (
                  <>
                    <ProgressBar value={mod.progress} color="var(--p-violet-500)" height={4} className="mb-3" />
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[var(--color-text-tertiary)]">{mod.progress}%</span>
                      <Button variant="secondary" size="sm">
                        {mod.progress === 100 ? 'Review' : 'Continue'}
                      </Button>
                    </div>
                  </>
                )}
                {mod.locked && (
                  <p className="text-[11px] text-[var(--color-text-tertiary)] italic">
                    Complete previous modules to unlock
                  </p>
                )}
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
