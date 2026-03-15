'use client';

import { useState } from 'react';
import { PageTransition } from '@/components/animation/PageTransition';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SubmissionQueue } from '@/components/academic/SubmissionQueue';
import { useAcademicStore } from '@/store/academic-store';
import { useNotificationStore } from '@/store/notification-store';
import { Submission, AxisScore } from '@/types/academic';

const AXIS_COLORS = ['#6750D6', '#8B79E5', '#5240C0', '#B5A9EF', '#3F30A0'];
const AXIS_NAMES = ['Taper', 'Margin', 'Occlusal Clearance', 'Wall Height', 'Smoothness'];

export default function ProfessorEvaluatePage() {
  const { submissions, evaluateSubmission } = useAcademicStore();
  const { add: addNotification } = useNotificationStore();
  const pendingSubmissions = submissions.filter((s) => s.status === 'pending');
  const [selected, setSelected] = useState<Submission | null>(pendingSubmissions[0] || null);
  const [scores, setScores] = useState<number[]>([3.0, 3.0, 3.0, 3.0, 3.0]);
  const [feedback, setFeedback] = useState('');

  function handleScoreChange(index: number, value: number) {
    setScores((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function handleFinalize() {
    if (!selected) return;
    const axes: AxisScore[] = AXIS_NAMES.map((name, i) => ({
      name,
      score: scores[i],
      max: 4,
      color: AXIS_COLORS[i],
    }));
    evaluateSubmission(selected.id, axes, feedback, true, 'PROF-001', 'Prof. Keren');
    addNotification({
      type: 'success',
      title: 'Evaluation finalized',
      message: `Grade submitted for ${selected.studentName} — Tooth ${selected.toothNumber}`,
      portal: 'academic',
    });
    setSelected(null);
    setScores([3.0, 3.0, 3.0, 3.0, 3.0]);
    setFeedback('');
  }

  function handleSaveDraft() {
    if (!selected) return;
    addNotification({
      type: 'info',
      title: 'Draft saved',
      message: `Evaluation draft for ${selected.studentName} saved`,
      portal: 'academic',
    });
  }

  const overallScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg-page)] p-8">
        <h1
          className="text-[30px] font-bold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Evaluate Submissions
        </h1>
        <p className="text-[13px] mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          {pendingSubmissions.length} pending · Select a submission to evaluate
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left panel: queue */}
          <div>
            <SubmissionQueue
              submissions={pendingSubmissions}
              selectedId={selected?.id}
              onSelect={(sub) => {
                setSelected(sub);
                setScores([3.0, 3.0, 3.0, 3.0, 3.0]);
                setFeedback('');
              }}
            />
          </div>

          {/* Right panel: evaluation */}
          <div className="lg:col-span-2">
            {selected ? (
              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>{selected.studentName} — Tooth {selected.toothNumber}</CardTitle>
                    <div className="text-[11px] mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                      {selected.courseName} · {selected.fileName}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[24px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
                      {overallScore}
                    </span>
                    <span className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>/4.0</span>
                  </div>
                </CardHeader>

                {/* Tooth diagram placeholder */}
                <div
                  className="rounded-lg mb-6 flex items-center justify-center h-[120px]"
                  style={{ background: 'var(--color-bg-sunken)', border: '1px dashed var(--color-border-subtle)' }}
                >
                  <div className="text-center">
                    <div className="text-[28px] mb-1">🦷</div>
                    <div className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                      3D Scan Preview — Tooth {selected.toothNumber}
                    </div>
                  </div>
                </div>

                {/* 5 scoring sliders */}
                <div className="space-y-5 mb-6">
                  {AXIS_NAMES.map((name, i) => (
                    <div key={name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[12px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                          {name}
                        </span>
                        <span className="text-[13px] font-bold" style={{ color: AXIS_COLORS[i] }}>
                          {scores[i].toFixed(1)} / 4.0
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="4"
                        step="0.1"
                        value={scores[i]}
                        onChange={(e) => handleScoreChange(i, parseFloat(e.target.value))}
                        className="w-full h-[6px] rounded-full appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, ${AXIS_COLORS[i]} ${(scores[i] / 4) * 100}%, var(--color-border-subtle) ${(scores[i] / 4) * 100}%)`,
                          accentColor: AXIS_COLORS[i],
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Feedback textarea */}
                <div className="mb-6">
                  <label className="text-[11px] font-semibold uppercase block mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    Feedback
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Write feedback for the student..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg text-[13px] resize-none"
                    style={{
                      background: 'var(--color-bg-sunken)',
                      border: '1px solid var(--color-border-subtle)',
                      color: 'var(--color-text-primary)',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3">
                  <Button variant="primary" size="md" onClick={handleFinalize}>
                    Finalize Grade
                  </Button>
                  <Button variant="secondary" size="md" onClick={handleSaveDraft}>
                    Save Draft
                  </Button>
                </div>
              </Card>
            ) : (
              <Card>
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="text-[40px] mb-3">📋</div>
                  <div className="text-[14px] font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                    No submission selected
                  </div>
                  <div className="text-[12px]" style={{ color: 'var(--color-text-secondary)' }}>
                    {pendingSubmissions.length > 0
                      ? 'Select a submission from the queue to start evaluating'
                      : 'All submissions have been evaluated'}
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
