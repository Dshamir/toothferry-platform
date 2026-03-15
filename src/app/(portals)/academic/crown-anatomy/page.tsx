'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';

const learningModules = [
  {
    id: 1, title: 'Anterior Crown Anatomy',
    description: 'Understanding labial contours, incisal edge morphology, and lingual anatomy of anterior crowns.',
    progress: 100, locked: false, lessons: 8, completedLessons: 8,
    icon: '\u{1F9B7}',
  },
  {
    id: 2, title: 'Posterior Crown Anatomy',
    description: 'Cusp-fossa relationships, occlusal table design, and embrasure form for premolars and molars.',
    progress: 85, locked: false, lessons: 10, completedLessons: 8,
    icon: '\u{1FAE6}',
  },
  {
    id: 3, title: 'Occlusion & Contacts',
    description: 'Centric stops, working and non-working contacts, and the Curve of Spee.',
    progress: 60, locked: false, lessons: 6, completedLessons: 4,
    icon: '\u{2699}\u{FE0F}',
  },
  {
    id: 4, title: 'Material-Specific Design',
    description: 'How material choice (zirconia, e.max, PMMA) influences crown anatomy and minimum thickness.',
    progress: 30, locked: false, lessons: 7, completedLessons: 2,
    icon: '\u{1F48E}',
  },
  {
    id: 5, title: 'Digital Crown Sculpting',
    description: 'CAD-based crown design using AI-generated meshes and manual refinement tools.',
    progress: 0, locked: false, lessons: 9, completedLessons: 0,
    icon: '\u{1F5A5}\u{FE0F}',
  },
  {
    id: 6, title: 'Implant Crown Design',
    description: 'Screw-channel placement, emergence profile, and implant-specific contour requirements.',
    progress: 0, locked: true, lessons: 12, completedLessons: 0,
    icon: '\u{1F529}',
    lockReason: 'Coming Q1 2027',
  },
];

export default function CrownAnatomyPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg-page)] p-8">
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
            Crown Anatomy
          </h1>
          <p className="text-[15px] text-[var(--color-text-secondary)] mt-1">
            Learning modules for dental crown morphology and design principles
          </p>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {learningModules.map((mod) => (
            <StaggerItem key={mod.id}>
              <Card className={`relative flex flex-col h-full ${mod.locked ? 'opacity-55' : ''}`}>
                {mod.locked && (
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
                    <span className="text-[20px]">&#128274;</span>
                    <span className="text-[9px] font-bold text-[var(--p-amber-600)] bg-[var(--p-amber-50)] px-2 py-0.5 rounded-full">
                      {mod.lockReason}
                    </span>
                  </div>
                )}

                <div className="text-[28px] mb-3">{mod.icon}</div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold text-[var(--color-text-tertiary)] tracking-wider">
                    MODULE {mod.id}
                  </span>
                  {mod.progress === 100 && <Badge variant="reviewed">Complete</Badge>}
                  {mod.progress > 0 && mod.progress < 100 && <Badge variant="pending">In Progress</Badge>}
                  {mod.progress === 0 && !mod.locked && <Badge variant="progress">Not Started</Badge>}
                </div>

                <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)] mb-2">
                  {mod.title}
                </h3>
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed mb-4 flex-1">
                  {mod.description}
                </p>

                <div className="mt-auto">
                  <div className="flex justify-between text-[11px] text-[var(--color-text-tertiary)] mb-2">
                    <span>{mod.completedLessons} / {mod.lessons} lessons</span>
                    {!mod.locked && <span>{mod.progress}%</span>}
                  </div>
                  {!mod.locked && (
                    <ProgressBar value={mod.progress} color="var(--p-violet-500)" height={4} className="mb-3" />
                  )}
                  {!mod.locked && (
                    <Button variant="secondary" size="sm" className="w-full">
                      {mod.progress === 100 ? 'Review Module' : mod.progress > 0 ? 'Continue' : 'Start Module'}
                    </Button>
                  )}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
