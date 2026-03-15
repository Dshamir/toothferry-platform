'use client';

import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/animation/PageTransition';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { KpiCard } from '@/components/ui/KpiCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { FiveAxisChart } from '@/components/academic/FiveAxisChart';
import { useAcademicStore } from '@/store/academic-store';
import { ACADEMIC_PERSONAS } from '@/data/academic-seed';

export default function ProfessorDashboardPage() {
  const router = useRouter();
  const { submissions, evaluations, currentPersona } = useAcademicStore();

  // Scope: only MY courses (CRS-001 for Prof. Keren)
  const myCourseIds = currentPersona.courseIds || ['CRS-001'];
  const myStudentIds = currentPersona.studentIds || [];
  const myAssistantIds = currentPersona.assistantIds || [];

  const mySubmissions = submissions.filter((s) => myCourseIds.includes(s.courseId));
  const pendingCount = mySubmissions.filter((s) => s.status === 'pending').length;
  const myEvals = evaluations.filter((e) => myCourseIds.length > 0);
  const thisWeekEvals = evaluations.filter((e) => {
    const d = new Date(e.evaluatedAt);
    return Date.now() - d.getTime() < 7 * 24 * 60 * 60 * 1000;
  }).length;

  // My assistant(s)
  const myAssistants = ACADEMIC_PERSONAS.filter((p) => myAssistantIds.includes(p.id));

  // Students needing attention (scoped to MY students)
  const needsAttentionStudents = [
    { id: 'STU-003', name: 'Carlos Rivera', avgScore: 2.4, trend: 'down' as const, axes: evaluations.find((e) => e.studentId === 'STU-003')?.axes },
    { id: 'STU-005', name: 'Ethan Park', avgScore: 2.74, trend: 'down' as const, axes: evaluations.find((e) => e.studentId === 'STU-005')?.axes },
  ];

  const recentSubmissions = mySubmissions.slice(0, 5);

  // Pending approval from assistant
  const pendingApproval = evaluations.filter((e) => !e.finalized && myAssistantIds.includes(e.evaluatorId));

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg-page)] p-8">
        {/* Domain context header */}
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-[10px] px-[8px] py-[2px] rounded"
            style={{
              background: `${currentPersona.avatarColor}18`,
              color: currentPersona.avatarColor,
              fontFamily: 'var(--font-mono)',
            }}
          >
            professor.toothferryai.com
          </span>
          <span className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>
            McGill University · Faculty of Dentistry
          </span>
        </div>
        <h1
          className="text-[30px] font-bold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Prof. Keren&apos;s Dashboard
        </h1>
        <p className="text-[13px] mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          Crown Design I · 76 students · 1 assistant (Dr. Lasry)
        </p>

        <StaggerChildren className="space-y-6">
          {/* KPIs */}
          <StaggerItem>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <KpiCard label="My Students" value={76} delta="Crown Design I" deltaDirection="neutral" />
              <KpiCard label="Class Average" value="3.1" suffix="/4" delta="+0.2 from last month" deltaDirection="up" />
              <KpiCard label="Pending Reviews" value={pendingCount} delta={`${pendingCount} in my queue`} deltaDirection="neutral" />
              <KpiCard label="Evals This Week" value={thisWeekEvals} delta="+3 vs last week" deltaDirection="up" />
            </div>
          </StaggerItem>

          {/* My Assistant(s) */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle>My Assistant(s)</CardTitle>
                <Badge variant="info">{myAssistants.length} assigned</Badge>
              </CardHeader>
              <div className="space-y-3">
                {myAssistants.map((asst) => {
                  const asstPendingApproval = evaluations.filter((e) => !e.finalized && e.evaluatorId === asst.id).length;
                  const asstStudents = asst.studentIds?.length || 0;
                  return (
                    <div
                      key={asst.id}
                      className="flex items-center gap-3 p-4 rounded-lg"
                      style={{ border: '1px solid var(--color-border-subtle)', background: 'var(--color-bg-page)' }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-extrabold text-white flex-shrink-0"
                        style={{ background: asst.avatarColor, fontFamily: 'var(--font-display)' }}
                      >
                        {asst.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                          {asst.name}
                        </div>
                        <div className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                          {asst.department} · {asstStudents} assigned students
                        </div>
                      </div>
                      {asstPendingApproval > 0 && (
                        <Badge variant="pending">{asstPendingApproval} awaiting your approval</Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </StaggerItem>

          {/* Students Needing Attention (MY students only) */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle>Students Needing Attention</CardTitle>
                <Badge variant="pending">{needsAttentionStudents.length} students</Badge>
              </CardHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {needsAttentionStudents.map((student) => (
                  <div
                    key={student.id}
                    className="p-4 rounded-lg"
                    style={{ border: '1px solid var(--color-border-subtle)', background: 'var(--color-bg-page)' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                          {student.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[18px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
                            {student.avgScore.toFixed(1)}
                          </span>
                          <span className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>/4.0</span>
                          <span className="text-[12px] font-semibold" style={{ color: 'var(--p-red-600)' }}>↓</span>
                        </div>
                      </div>
                      {student.axes && <FiveAxisChart axes={student.axes} compact />}
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => router.push(`/academic/professor/student/${student.id}`)}
                    >
                      View Student
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </StaggerItem>

          {/* My Courses */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle>My Courses</CardTitle>
                <Badge variant="info">1 active</Badge>
              </CardHeader>
              <div
                className="p-4 rounded-lg"
                style={{ border: '1px solid var(--color-border-subtle)', background: 'var(--color-bg-page)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-[14px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      Crown Design I
                    </div>
                    <div className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                      76 students · Assistant: Dr. Lasry · 3 modules
                    </div>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Prep Evaluation', progress: 68 },
                    { name: 'Margin Detection', progress: 52 },
                    { name: 'Crown Anatomy', progress: 41 },
                  ].map((m) => (
                    <div key={m.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>{m.name}</span>
                        <span className="text-[11px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>{m.progress}%</span>
                      </div>
                      <ProgressBar value={m.progress} height={4} />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </StaggerItem>

          {/* Pending Approval from Assistant */}
          {pendingApproval.length > 0 && (
            <StaggerItem>
              <Card>
                <CardHeader>
                  <CardTitle>Pending Your Approval</CardTitle>
                  <Badge variant="pending">{pendingApproval.length} from Dr. Lasry</Badge>
                </CardHeader>
                <div className="divide-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  {pendingApproval.map((ev) => (
                    <div key={ev.id} className="flex items-center gap-3 py-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                          {ev.studentName} — Tooth {ev.toothNumber}
                        </div>
                        <div className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                          Evaluated by {ev.evaluatorName} · Score: {ev.overallScore.toFixed(1)}/4
                        </div>
                      </div>
                      <Badge variant="pending">Needs Approval</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </StaggerItem>
          )}

          {/* Recent Submissions (MY courses only) */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle>Recent Submissions</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => router.push('/academic/professor/evaluate')}>
                  View All
                </Button>
              </CardHeader>
              <div className="divide-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
                {recentSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center gap-3 py-3 cursor-pointer"
                    onClick={() => router.push('/academic/professor/evaluate')}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        {sub.studentName}
                      </div>
                      <div className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                        Tooth {sub.toothNumber} · {sub.courseName}
                      </div>
                    </div>
                    <Badge variant={sub.status === 'pending' ? 'pending' : 'reviewed'}>
                      {sub.status === 'pending' ? 'Pending' : 'Evaluated'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
