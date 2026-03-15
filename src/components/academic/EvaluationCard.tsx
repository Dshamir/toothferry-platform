'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FiveAxisChart } from './FiveAxisChart';
import { FeedbackItem } from '@/types/academic';

interface EvaluationCardProps {
  item: FeedbackItem;
  onMarkRead?: (id: string) => void;
}

function scoreVariant(score: number) {
  if (score >= 3.5) return 'success' as const;
  if (score >= 2.5) return 'pending' as const;
  return 'error' as const;
}

function scoreLabel(score: number) {
  if (score >= 3.5) return 'Excellent';
  if (score >= 3.0) return 'Good';
  if (score >= 2.5) return 'Adequate';
  return 'Needs Improvement';
}

export function EvaluationCard({ item, onMarkRead }: EvaluationCardProps) {
  return (
    <Card className="relative">
      {!item.read && (
        <span className="absolute top-4 right-4 w-[8px] h-[8px] rounded-full bg-[#E24B4A] animate-pulse" />
      )}
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {item.professorName}
            </span>
            <span className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
              Tooth {item.toothNumber}
            </span>
            <span className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
              · {item.courseName}
            </span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[22px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {item.overallScore.toFixed(1)}
            </span>
            <span className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>/4.0</span>
            <Badge variant={scoreVariant(item.overallScore)}>{scoreLabel(item.overallScore)}</Badge>
          </div>
          <div className="mb-3">
            <FiveAxisChart axes={item.axes} />
          </div>
          <p className="text-[12px] leading-[1.6] mb-2" style={{ color: 'var(--color-text-secondary)' }}>
            {item.feedback}
          </p>
          {item.improvementSuggestions.length > 0 && (
            <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
              <div className="text-[10px] font-semibold uppercase tracking-[0.05em] mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                Improvement areas
              </div>
              <ul className="space-y-1">
                {item.improvementSuggestions.map((s, i) => (
                  <li key={i} className="text-[11px] flex items-start gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-action-bg)' }}>→</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!item.read && onMarkRead && (
            <button
              onClick={() => onMarkRead(item.id)}
              className="mt-3 text-[11px] font-semibold cursor-pointer border-none bg-transparent"
              style={{ color: 'var(--color-action-bg)' }}
            >
              Mark as read
            </button>
          )}
        </div>
      </div>
      <div className="text-[10px] mt-3" style={{ color: 'var(--color-text-secondary)' }}>
        {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </div>
    </Card>
  );
}
