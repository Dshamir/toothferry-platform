'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Submission } from '@/types/academic';

interface SubmissionQueueProps {
  submissions: Submission[];
  selectedId?: string;
  onSelect: (submission: Submission) => void;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const statusBadge: Record<string, { variant: 'pending' | 'progress' | 'reviewed'; label: string }> = {
  pending: { variant: 'pending', label: 'Pending' },
  'in-review': { variant: 'progress', label: 'In Review' },
  evaluated: { variant: 'reviewed', label: 'Evaluated' },
};

export function SubmissionQueue({ submissions, selectedId, onSelect }: SubmissionQueueProps) {
  return (
    <Card padding={false}>
      <div
        className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.05em]"
        style={{
          borderBottom: '1px solid var(--color-border-subtle)',
          color: 'var(--color-text-secondary)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        Submission Queue ({submissions.length})
      </div>
      <div className="divide-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
        {submissions.map((sub) => (
          <button
            key={sub.id}
            onClick={() => onSelect(sub)}
            className="flex items-center gap-3 w-full px-4 py-3 text-left cursor-pointer border-none transition-all"
            style={{
              background: sub.id === selectedId ? 'var(--sidebar-active-bg, rgba(37,99,235,0.07))' : 'transparent',
            }}
          >
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>
                {sub.studentName}
              </div>
              <div className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                Tooth {sub.toothNumber} · {sub.courseName}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge variant={statusBadge[sub.status].variant}>
                {statusBadge[sub.status].label}
              </Badge>
              <span className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>
                {timeAgo(sub.submittedAt)}
              </span>
            </div>
          </button>
        ))}
        {submissions.length === 0 && (
          <div className="px-4 py-8 text-center text-[12px]" style={{ color: 'var(--color-text-secondary)' }}>
            No submissions in queue
          </div>
        )}
      </div>
    </Card>
  );
}
