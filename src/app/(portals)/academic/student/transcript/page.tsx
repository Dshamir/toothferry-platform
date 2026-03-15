'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { FiveAxisChart } from '@/components/academic/FiveAxisChart';
import { useAcademicStore } from '@/store/academic-store';

const MODULE_GRADES = [
  { name: 'Prep Evaluation', grade: 'B+', score: 3.2, color: '#6750D6' },
  { name: 'Margin Detection', grade: 'B', score: 2.9, color: '#8B79E5' },
  { name: 'Crown Anatomy', grade: 'A-', score: 3.6, color: '#5240C0' },
];

const MONTHLY_AVG = [
  { month: 'Oct', score: 2.4 },
  { month: 'Nov', score: 2.7 },
  { month: 'Dec', score: 2.9 },
  { month: 'Jan', score: 3.0 },
  { month: 'Feb', score: 3.1 },
  { month: 'Mar', score: 3.2 },
];

export default function StudentTranscriptPage() {
  const { evaluations } = useAcademicStore();
  const studentEvals = evaluations
    .filter((e) => e.studentId === 'STU-001' && e.finalized)
    .sort((a, b) => new Date(b.evaluatedAt).getTime() - new Date(a.evaluatedAt).getTime());

  const gpa = (MODULE_GRADES.reduce((sum, m) => sum + m.score, 0) / MODULE_GRADES.length).toFixed(2);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg-page)] p-8">
        <h1
          className="text-[30px] font-bold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Transcript
        </h1>
        <p className="text-[13px] mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          Alice Martin · DMD-3 · McGill University
        </p>

        <StaggerChildren className="space-y-6">
          {/* Module Grades + GPA */}
          <StaggerItem>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {MODULE_GRADES.map((m) => (
                <Card key={m.name}>
                  <div className="text-[10px] font-semibold uppercase mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    {m.name}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[28px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
                      {m.grade}
                    </span>
                    <span className="text-[13px]" style={{ color: 'var(--color-text-secondary)' }}>
                      {m.score.toFixed(1)}/4.0
                    </span>
                  </div>
                  <ProgressBar value={(m.score / 4) * 100} color={m.color} height={4} className="mt-3" />
                </Card>
              ))}
              <Card>
                <div className="text-[10px] font-semibold uppercase mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                  Overall GPA
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[28px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    {gpa}
                  </span>
                  <span className="text-[13px]" style={{ color: 'var(--color-text-secondary)' }}>
                    /4.0
                  </span>
                </div>
                <Badge variant="success" className="mt-3">Good Standing</Badge>
              </Card>
            </div>
          </StaggerItem>

          {/* Semester Trend */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle>Semester Trend</CardTitle>
                <Badge variant="info">Monthly Averages</Badge>
              </CardHeader>
              <div className="flex items-end gap-3 h-[120px]">
                {MONTHLY_AVG.map((m) => (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
                      {m.score.toFixed(1)}
                    </span>
                    <div
                      className="w-full rounded-t transition-all"
                      style={{
                        height: `${(m.score / 4) * 100}%`,
                        background: `var(--p-violet-${m.score >= 3.0 ? '500' : '300'})`,
                        minHeight: 8,
                      }}
                    />
                    <span className="text-[9px]" style={{ color: 'var(--color-text-secondary)' }}>
                      {m.month}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </StaggerItem>

          {/* Evaluation History Table */}
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
                      <th className="text-left px-4 py-3 text-[11px] font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Evaluator</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Axes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentEvals.map((ev) => (
                      <tr key={ev.id} style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                        <td className="px-4 py-3 text-[12px]" style={{ color: 'var(--color-text-primary)' }}>
                          {new Date(ev.evaluatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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
                        <td className="px-4 py-3 text-[12px]" style={{ color: 'var(--color-text-secondary)' }}>
                          {ev.evaluatorName}
                        </td>
                        <td className="px-4 py-3">
                          <FiveAxisChart axes={ev.axes} compact />
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
              <div className="px-4 py-3 text-[11px]" style={{ borderTop: '1px solid var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}>
                Showing {studentEvals.length} evaluation{studentEvals.length !== 1 ? 's' : ''}
              </div>
            </Card>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
