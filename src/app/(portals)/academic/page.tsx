'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { KpiCard } from '@/components/ui/KpiCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { EditablePortalPage } from '@/components/shared/EditablePortalPage';

const kpis = [
  { label: 'Active Students', value: 124, delta: '+18 this semester', deltaDirection: 'up' as const },
  { label: 'Professors', value: 4, delta: 'McGill · UdeM', deltaDirection: 'neutral' as const },
  { label: 'Avg Prep Score', value: '2.8', suffix: ' / 4', delta: '+0.3 vs last term', deltaDirection: 'up' as const },
  { label: 'Total Evaluations', value: 1204, delta: '312 this month', deltaDirection: 'up' as const },
];

const modules = [
  { name: 'Margin Line Detection', progress: 78, students: 96, color: 'var(--p-violet-500)' },
  { name: 'Crown Anatomy Basics', progress: 62, students: 88, color: 'var(--p-violet-400)' },
  { name: 'Prep Evaluation', progress: 45, students: 74, color: 'var(--p-violet-300)' },
];

const recentActivity = [
  { time: '2 min ago', text: 'Student M. Tremblay completed Margin Module 4', type: 'success' },
  { time: '8 min ago', text: 'Prof. Keren graded 12 submissions in Crown Anatomy', type: 'info' },
  { time: '15 min ago', text: 'New evaluation batch uploaded — 18 scans from DMD-3 lab', type: 'info' },
  { time: '32 min ago', text: 'Student A. Roy flagged for low prep score (1.8/4)', type: 'warning' },
  { time: '1 hr ago', text: 'Module "Implant Foundations" scheduled for Q1 2027', type: 'info' },
];

const activityColors: Record<string, string> = {
  success: 'bg-[var(--p-green-400)]',
  info: 'bg-[var(--p-violet-400)]',
  warning: 'bg-[var(--p-amber-400)]',
};

export default function AcademicOverview() {
  return (
    <EditablePortalPage slug="academic">
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg-page)] p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
            Academic Portal
          </h1>
          <p className="text-[15px] text-[var(--color-text-secondary)] mt-1">
            Training, evaluation, and curriculum management for dental education
          </p>
        </div>

        {/* KPI Row */}
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {kpis.map((kpi) => (
            <StaggerItem key={kpi.label}>
              <KpiCard {...kpi} />
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Training Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          {modules.map((mod) => (
            <Card key={mod.name}>
              <CardHeader>
                <CardTitle>{mod.name}</CardTitle>
                <span className="text-[11px] font-semibold text-[var(--color-text-secondary)]">
                  {mod.students} students
                </span>
              </CardHeader>
              <div className="space-y-3">
                <div className="flex justify-between text-[13px]">
                  <span className="text-[var(--color-text-secondary)]">Avg. completion</span>
                  <span className="font-semibold text-[var(--color-text-primary)]">{mod.progress}%</span>
                </div>
                <ProgressBar value={mod.progress} color={mod.color} />
                <div className="flex justify-between text-[11px] text-[var(--color-text-secondary)]">
                  <span>{Math.round(mod.students * mod.progress / 100)} completed</span>
                  <span>{mod.students - Math.round(mod.students * mod.progress / 100)} in progress</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Recent Activity Feed */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${activityColors[item.type]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-[var(--color-text-primary)]">{item.text}</p>
                    <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Info Alert */}
          <Card className="bg-[var(--color-info-bg)] border-[var(--p-cobalt-200)]">
            <div className="flex items-start gap-3">
              <span className="text-[20px] mt-0.5">&#9432;</span>
              <div>
                <h4 className="text-[15px] font-semibold text-[var(--color-info-text)] mb-2">
                  Why Academic Matters
                </h4>
                <p className="text-[13px] text-[var(--color-info-text)] leading-relaxed">
                  The Academic Portal is the foundation of ToothFerry AI. By training the next
                  generation of dental professionals with AI-assisted evaluation, we build the
                  evidence base and trust that drives clinical adoption. Every student trained
                  today is a future user of the platform.
                </p>
                <div className="mt-4 pt-3 border-t border-[var(--p-cobalt-200)]">
                  <p className="text-[11px] font-semibold text-[var(--color-info-text)] uppercase tracking-wider">
                    2 published papers &middot; 3 partner universities
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
    </EditablePortalPage>
  );
}
