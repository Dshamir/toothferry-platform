'use client';

import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/animation/PageTransition';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StudentProfileCard } from '@/components/academic/StudentProfileCard';
import { FiveAxisChart } from '@/components/academic/FiveAxisChart';
import { useAcademicStore } from '@/store/academic-store';

export default function StudentDashboardPage() {
  const router = useRouter();
  const { feedback, enrollments, evaluations, currentPersona } = useAcademicStore();

  // Scope: ONLY my own data
  const studentId = 'STU-001';
  const myFeedback = feedback.filter((f) => f.studentId === studentId);
  const unreadCount = myFeedback.filter((f) => !f.read).length;
  const myEnrollments = enrollments.filter((e) => e.studentId === studentId);
  const myEvals = evaluations
    .filter((e) => e.studentId === studentId && e.finalized)
    .slice(0, 3);
  const myPendingSubs = enrollments.length; // dummy for pending subs count

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg-page)] p-8">
        <StaggerChildren className="space-y-6">
          {/* Domain context header */}
          <StaggerItem>
            <div className="flex items-center gap-2 mb-[-8px]">
              <span
                className="text-[10px] px-[8px] py-[2px] rounded"
                style={{
                  background: `${currentPersona.avatarColor}18`,
                  color: currentPersona.avatarColor,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                student.toothferryai.com
              </span>
              <span className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>
                McGill University · DMD Year 3
              </span>
            </div>
          </StaggerItem>

          {/* Profile */}
          <StaggerItem>
            <StudentProfileCard
              name="Alice Martin"
              year={3}
              institution="McGill University"
              avgScore={3.2}
              evaluationsCompleted={12}
              rank={8}
              totalStudents={76}
              initials="AM"
              avatarColor="#C2185B"
              trend="up"
              streak={5}
            />
          </StaggerItem>

          {/* Quick Actions */}
          <StaggerItem>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="md" onClick={() => router.push('/academic/student/submit')}>
                Submit New Scan
              </Button>
              <Button variant="secondary" size="md" onClick={() => router.push('/academic/student/transcript')}>
                View Transcript
              </Button>
              {unreadCount > 0 && (
                <Button variant="ghost" size="md" onClick={() => router.push('/academic/student/feedback')}>
                  Feedback Inbox ({unreadCount} new)
                </Button>
              )}
            </div>
          </StaggerItem>

          {/* My Professors & Courses */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle>My Courses & Instructors</CardTitle>
                <Badge variant="info">{myEnrollments.length} course{myEnrollments.length !== 1 ? 's' : ''}</Badge>
              </CardHeader>
              <div className="text-[11px] mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                Your professors and teaching assistants for each enrolled course
              </div>
              <div className="space-y-3">
                {myEnrollments.map((enr) => (
                  <div
                    key={enr.courseId}
                    className="p-4 rounded-lg"
                    style={{ border: '1px solid var(--color-border-subtle)', background: 'var(--color-bg-page)' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[14px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        {enr.courseName}
                      </div>
                      <Badge variant="success">{enr.letterGrade} ({enr.currentGrade.toFixed(1)}/4)</Badge>
                    </div>
                    <div className="flex gap-4">
                      {/* Professor */}
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white flex-shrink-0"
                          style={{ background: '#6750D6', fontFamily: 'var(--font-display)' }}
                        >
                          HK
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                            {enr.professorName}
                          </div>
                          <div className="text-[9px]" style={{ color: 'var(--color-text-secondary)' }}>Professor</div>
                        </div>
                      </div>
                      {/* Assistant */}
                      {enr.assistantName && (
                        <div className="flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white flex-shrink-0"
                            style={{ background: '#0F6E56', fontFamily: 'var(--font-display)' }}
                          >
                            NL
                          </div>
                          <div>
                            <div className="text-[11px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                              {enr.assistantName}
                            </div>
                            <div className="text-[9px]" style={{ color: 'var(--color-text-secondary)' }}>Teaching Assistant</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </StaggerItem>

          {/* My Modules (scoped to my enrollment) */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle>My Modules</CardTitle>
                <Badge variant="info">{myEnrollments[0]?.courseName || 'Crown Design I'}</Badge>
              </CardHeader>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Prep Evaluation', key: 'prep-eval', icon: '◎', progress: myEnrollments[0]?.moduleProgress['prep-eval'] || 72 },
                  { name: 'Margin Detection', key: 'margin-detection', icon: '〜', progress: myEnrollments[0]?.moduleProgress['margin-detection'] || 58 },
                  { name: 'Crown Anatomy', key: 'crown-anatomy', icon: '🦷', progress: myEnrollments[0]?.moduleProgress['crown-anatomy'] || 45 },
                ].map((mod) => (
                  <div
                    key={mod.key}
                    className="p-4 rounded-lg"
                    style={{ border: '1px solid var(--color-border-subtle)', background: 'var(--color-bg-page)' }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[16px]">{mod.icon}</span>
                      <span className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        {mod.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>My progress</span>
                      <span className="text-[12px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
                        {Math.round(mod.progress)}%
                      </span>
                    </div>
                    <ProgressBar value={mod.progress} height={6} />
                    <div className="text-[10px] mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                      Next: Lesson {Math.ceil(mod.progress / 10)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </StaggerItem>

          {/* Recent Scores (MY evaluations only) */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle>My Recent Scores</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => router.push('/academic/student/feedback')}>
                  View All
                </Button>
              </CardHeader>
              <div className="space-y-4">
                {myEvals.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-4 rounded-lg"
                    style={{ border: '1px solid var(--color-border-subtle)', background: 'var(--color-bg-page)' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                          Tooth {ev.toothNumber}
                        </span>
                        <span className="text-[11px] ml-2" style={{ color: 'var(--color-text-secondary)' }}>
                          by {ev.evaluatorName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[18px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
                          {ev.overallScore.toFixed(1)}
                        </span>
                        <span className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>/4.0</span>
                      </div>
                    </div>
                    <FiveAxisChart axes={ev.axes} />
                  </div>
                ))}
                {myEvals.length === 0 && (
                  <div className="text-center py-6 text-[12px]" style={{ color: 'var(--color-text-secondary)' }}>
                    No evaluations yet — submit a scan to get started
                  </div>
                )}
              </div>
            </Card>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
