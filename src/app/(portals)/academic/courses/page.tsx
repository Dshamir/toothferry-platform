'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';

const courses = [
  {
    id: 'C-001',
    code: 'DENT-401',
    title: "Crown Design I",
    professor: 'Prof. Keren',
    students: 76,
    semester: 'Winter 2026',
    status: 'active' as const,
    avgScore: 3.1,
    modules: [
      { name: 'Margin Fundamentals', completion: 92 },
      { name: 'Anterior Crown Anatomy', completion: 78 },
      { name: 'Prep Evaluation', completion: 65 },
      { name: 'Material Selection', completion: 42 },
    ],
    recentSubmissions: 34,
    passingRate: 88,
  },
  {
    id: 'C-002',
    code: 'DENT-502',
    title: 'Prosthodontics II',
    professor: 'Prof. Lasry',
    students: 48,
    semester: 'Winter 2026',
    status: 'active' as const,
    avgScore: 2.9,
    modules: [
      { name: 'Complex Preparations', completion: 85 },
      { name: 'Bridge Design', completion: 60 },
      { name: 'Implant Prosthetics', completion: 35 },
      { name: 'Digital Workflow', completion: 20 },
    ],
    recentSubmissions: 22,
    passingRate: 82,
  },
];

export default function CoursesPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg-page)] p-8">
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
            Courses
          </h1>
          <p className="text-[15px] text-[var(--color-text-secondary)] mt-1">
            Active courses with module progress and student metrics
          </p>
        </div>

        <StaggerChildren className="space-y-6">
          {courses.map((course) => (
            <StaggerItem key={course.id}>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CardTitle>{course.title}</CardTitle>
                    <Badge variant="info">{course.code}</Badge>
                    <Badge variant="reviewed">Active</Badge>
                  </div>
                  <span className="text-[13px] text-[var(--color-text-secondary)]">{course.semester}</span>
                </CardHeader>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Course Info */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-1">Professor</p>
                      <p className="text-[15px] font-semibold text-[var(--color-text-primary)]">{course.professor}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-1">Enrolled</p>
                      <p className="text-[24px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
                        {course.students} <span className="text-[13px] font-normal text-[var(--color-text-secondary)]">students</span>
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-1">Avg Score</p>
                        <p className={`text-[17px] font-bold ${course.avgScore >= 3.0 ? 'text-[var(--p-green-600)]' : 'text-[var(--p-amber-600)]'}`}>
                          {course.avgScore}/4
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-1">Pass Rate</p>
                        <p className="text-[17px] font-bold text-[var(--p-green-600)]">{course.passingRate}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Module Progress */}
                  <div className="lg:col-span-2 space-y-4">
                    <p className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider">Module Progress</p>
                    {course.modules.map((mod) => (
                      <div key={mod.name}>
                        <div className="flex justify-between text-[13px] mb-1.5">
                          <span className="text-[var(--color-text-primary)]">{mod.name}</span>
                          <span className="font-semibold text-[var(--color-text-primary)]">{mod.completion}%</span>
                        </div>
                        <ProgressBar value={mod.completion} color="var(--p-violet-500)" height={5} />
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 justify-center">
                    <Button variant="primary" size="sm" className="w-full">View Grades</Button>
                    <Button variant="secondary" size="sm" className="w-full">Manage Modules</Button>
                    <Button variant="ghost" size="sm" className="w-full">Export CSV</Button>
                    <div className="text-center mt-2">
                      <p className="text-[11px] text-[var(--color-text-tertiary)]">
                        {course.recentSubmissions} submissions this week
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
