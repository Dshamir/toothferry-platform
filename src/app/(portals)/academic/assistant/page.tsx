'use client';

import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/animation/PageTransition';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { KpiCard } from '@/components/ui/KpiCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAcademicStore } from '@/store/academic-store';

export default function AssistantDashboardPage() {
  const router = useRouter();
  const { submissions, evaluations, currentPersona } = useAcademicStore();

  // Scope: only students/courses assigned to this assistant
  const myStudentIds = currentPersona.studentIds || ['STU-003', 'STU-006'];
  const myCourseIds = currentPersona.courseIds || ['CRS-001'];

  const mySubmissions = submissions.filter(
    (s) => myStudentIds.includes(s.studentId) || myCourseIds.includes(s.courseId)
  );
  const pendingCount = mySubmissions.filter((s) => s.status === 'pending').length;
  const myEvals = evaluations.filter((e) => e.evaluatorId === 'PROF-002');
  const pendingApproval = myEvals.filter((e) => !e.finalized).length;
  const thisWeekEvals = myEvals.filter((e) => {
    const d = new Date(e.evaluatedAt);
    return Date.now() - d.getTime() < 7 * 24 * 60 * 60 * 1000;
  }).length;

  const recentSubmissions = mySubmissions.slice(0, 5);

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
            assistant.toothferryai.com
          </span>
          <span className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>
            McGill University · Prosthodontics
          </span>
        </div>
        <h1
          className="text-[30px] font-bold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Dr. Lasry&apos;s Dashboard
        </h1>
        <p className="text-[13px] mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          Reports to: <strong>Prof. Keren</strong> · Crown Design I · {myStudentIds.length} assigned students
        </p>

        <StaggerChildren className="space-y-6">
          {/* Reports-to card */}
          <StaggerItem>
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-lg"
              style={{ background: 'var(--color-bg-sunken)', border: '1px solid var(--color-border-subtle)' }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white flex-shrink-0"
                style={{ background: '#6750D6', fontFamily: 'var(--font-display)' }}
              >
                HK
              </div>
              <div className="flex-1">
                <div className="text-[12px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  Supervised by Prof. Keren
                </div>
                <div className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>
                  Your evaluations require professor approval before students see grades
                </div>
              </div>
              <Badge variant="info">Supervisor</Badge>
            </div>
          </StaggerItem>

          {/* KPIs */}
          <StaggerItem>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <KpiCard label="Assigned Students" value={myStudentIds.length} delta="Crown Design I" deltaDirection="neutral" />
              <KpiCard label="My Pending Reviews" value={pendingCount} delta="to evaluate" deltaDirection="neutral" />
              <KpiCard label="Awaiting Approval" value={pendingApproval} delta="sent to Prof. Keren" deltaDirection="neutral" />
              <KpiCard label="My Evals This Week" value={thisWeekEvals} delta="evaluated by me" deltaDirection="up" />
            </div>
          </StaggerItem>

          {/* My Assigned Students */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle>My Assigned Students</CardTitle>
                <Badge variant="info">{myStudentIds.length} students</Badge>
              </CardHeader>
              <div className="text-[11px] mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                You grade these students for Crown Design I. Prof. Keren must approve before grades are finalized.
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
                {[
                  { id: 'STU-003', name: 'Carlos Rivera', score: 2.4, status: 'at-risk' },
                  { id: 'STU-006', name: 'Fatima Al-Hassan', score: 3.4, status: 'passing' },
                ].map((stu) => (
                  <div key={stu.id} className="flex items-center gap-3 py-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        {stu.name}
                      </div>
                      <div className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                        Avg: {stu.score}/4.0
                      </div>
                    </div>
                    <Badge variant={stu.status === 'at-risk' ? 'pending' : 'reviewed'}>
                      {stu.status === 'at-risk' ? 'At Risk' : 'Passing'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </StaggerItem>

          {/* Recent submissions (scoped) */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle>Submissions to Review</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => router.push('/academic/assistant/evaluate')}>
                  Review Queue
                </Button>
              </CardHeader>
              <div className="divide-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
                {recentSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center gap-3 py-3 cursor-pointer"
                    onClick={() => router.push('/academic/assistant/evaluate')}
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
                {recentSubmissions.length === 0 && (
                  <div className="py-6 text-center text-[12px]" style={{ color: 'var(--color-text-secondary)' }}>
                    No submissions assigned to you
                  </div>
                )}
              </div>
            </Card>
          </StaggerItem>

          {/* Pending Professor Approval */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle>Sent to Prof. Keren for Approval</CardTitle>
                <Badge variant="pending">{pendingApproval} pending</Badge>
              </CardHeader>
              <div className="text-[11px] mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                These evaluations are waiting for Prof. Keren to approve and finalize the grades.
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
                {evaluations.filter((e) => !e.finalized && e.evaluatorId === 'PROF-002').map((ev) => (
                  <div key={ev.id} className="flex items-center gap-3 py-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        {ev.studentName}
                      </div>
                      <div className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                        Tooth {ev.toothNumber} · Score: {ev.overallScore.toFixed(1)}/4
                      </div>
                    </div>
                    <Badge variant="pending">Awaiting Prof. Keren</Badge>
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
