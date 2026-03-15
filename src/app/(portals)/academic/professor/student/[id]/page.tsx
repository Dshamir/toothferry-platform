'use client';

import { use } from 'react';
import { PageTransition } from '@/components/animation/PageTransition';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StudentProfileCard } from '@/components/academic/StudentProfileCard';
import { FiveAxisChart } from '@/components/academic/FiveAxisChart';
import { useAcademicStore } from '@/store/academic-store';
import { SEED_STUDENTS } from '@/data/students';

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { evaluations, enrollments } = useAcademicStore();

  const student = SEED_STUDENTS.find((s) => s.id === id);
  const studentEvals = evaluations.filter((e) => e.studentId === id && e.finalized);
  const enrollment = enrollments.find((e) => e.studentId === id);

  if (!student) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-[var(--color-bg-page)] p-8">
          <h1 className="text-[30px] font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
            Student not found
          </h1>
        </div>
      </PageTransition>
    );
  }

  const avgAxes = studentEvals.length > 0
    ? studentEvals[0].axes.map((_, ai) => ({
        name: studentEvals[0].axes[ai].name,
        score: +(studentEvals.reduce((sum, e) => sum + e.axes[ai].score, 0) / studentEvals.length).toFixed(1),
        max: 4,
        color: studentEvals[0].axes[ai].color,
      }))
    : [];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg-page)] p-8">
        <StaggerChildren className="space-y-6">
          {/* Profile Card */}
          <StaggerItem>
            <StudentProfileCard
              name={student.name}
              year={student.year}
              institution={student.institution}
              avgScore={student.avgPrepScore}
              evaluationsCompleted={student.evaluationsCompleted}
              initials={student.name.split(' ').map((n) => n[0]).join('')}
              avatarColor="#6750D6"
              trend={student.avgPrepScore >= 3.0 ? 'up' : 'down'}
            />
          </StaggerItem>

          {/* Average 5-Axis Chart */}
          {avgAxes.length > 0 && (
            <StaggerItem>
              <Card>
                <CardHeader>
                  <CardTitle>Average Axis Scores</CardTitle>
                  <Badge variant="info">{studentEvals.length} evaluations</Badge>
                </CardHeader>
                <FiveAxisChart axes={avgAxes} />
              </Card>
            </StaggerItem>
          )}

          {/* Evaluation History */}
          <StaggerItem>
            <Card padding={false}>
              <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <CardTitle>Evaluation History</CardTitle>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: 'var(--table-th-bg, var(--color-bg-sunken))' }}>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Date</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Tooth</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Score</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Axes</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentEvals.map((ev) => (
                      <tr key={ev.id} style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                        <td className="px-4 py-3 text-[12px]" style={{ color: 'var(--color-text-primary)' }}>
                          {new Date(ev.evaluatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </td>
                        <td className="px-4 py-3 text-[12px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                          {ev.toothNumber}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[14px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
                            {ev.overallScore.toFixed(1)}
                          </span>
                          <span className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>/4</span>
                        </td>
                        <td className="px-4 py-3">
                          <FiveAxisChart axes={ev.axes} compact />
                        </td>
                        <td className="px-4 py-3 text-[11px] max-w-[300px] truncate" style={{ color: 'var(--color-text-secondary)' }}>
                          {ev.feedback}
                        </td>
                      </tr>
                    ))}
                    {studentEvals.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-[12px]" style={{ color: 'var(--color-text-secondary)' }}>
                          No evaluations yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </StaggerItem>

          {/* Module Progress */}
          {enrollment && (
            <StaggerItem>
              <Card>
                <CardHeader>
                  <CardTitle>Module Progress</CardTitle>
                  <Badge variant="info">{enrollment.courseName}</Badge>
                </CardHeader>
                <div className="space-y-4">
                  {Object.entries(enrollment.moduleProgress).map(([mod, progress]) => {
                    const label = mod.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
                    return (
                      <div key={mod}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[12px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>{label}</span>
                          <span className="text-[12px] font-bold" style={{ color: 'var(--color-text-primary)' }}>{Math.round(progress)}%</span>
                        </div>
                        <ProgressBar value={progress} height={6} />
                      </div>
                    );
                  })}
                </div>
              </Card>
            </StaggerItem>
          )}
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
