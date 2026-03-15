'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { EvaluationCard } from '@/components/academic/EvaluationCard';
import { useAcademicStore } from '@/store/academic-store';

export default function StudentFeedbackPage() {
  const { feedback, markFeedbackRead } = useAcademicStore();
  const studentFeedback = feedback.filter((f) => f.studentId === 'STU-001');
  const unreadCount = studentFeedback.filter((f) => !f.read).length;

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg-page)] p-8">
        <h1
          className="text-[30px] font-bold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Feedback Inbox
        </h1>
        <p className="text-[13px] mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          {unreadCount > 0 ? `${unreadCount} unread evaluation${unreadCount > 1 ? 's' : ''}` : 'All caught up'}
        </p>

        <StaggerChildren className="space-y-4 max-w-[800px]">
          {studentFeedback.map((item) => (
            <StaggerItem key={item.id}>
              <EvaluationCard item={item} onMarkRead={markFeedbackRead} />
            </StaggerItem>
          ))}
          {studentFeedback.length === 0 && (
            <StaggerItem>
              <div className="text-center py-16">
                <div className="text-[40px] mb-3">💬</div>
                <div className="text-[14px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  No feedback yet
                </div>
                <div className="text-[12px]" style={{ color: 'var(--color-text-secondary)' }}>
                  Submit a scan to receive professor feedback
                </div>
              </div>
            </StaggerItem>
          )}
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
