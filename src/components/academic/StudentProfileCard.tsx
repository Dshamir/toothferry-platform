'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface StudentProfileCardProps {
  name: string;
  year: number;
  institution: string;
  avgScore: number;
  evaluationsCompleted: number;
  rank?: number;
  totalStudents?: number;
  initials: string;
  avatarColor?: string;
  trend?: 'up' | 'down' | 'neutral';
  streak?: number;
}

export function StudentProfileCard({
  name, year, institution, avgScore, evaluationsCompleted,
  rank, totalStudents, initials, avatarColor = '#6750D6', trend, streak,
}: StudentProfileCardProps) {
  const trendArrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '';
  const trendColor = trend === 'up' ? 'var(--p-green-600)' : trend === 'down' ? 'var(--p-red-600)' : 'var(--color-text-secondary)';

  return (
    <Card>
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-[16px] font-extrabold text-white flex-shrink-0"
          style={{ background: avatarColor, fontFamily: 'var(--font-display)' }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[16px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
            {name}
          </div>
          <div className="text-[12px]" style={{ color: 'var(--color-text-secondary)' }}>
            DMD-{year} · {institution}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-5 pt-4" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
        <div>
          <div className="text-[10px] font-semibold uppercase" style={{ color: 'var(--color-text-secondary)' }}>
            Avg Score
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[20px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {avgScore.toFixed(1)}
            </span>
            <span className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>/4.0</span>
            {trendArrow && (
              <span className="text-[12px] font-semibold" style={{ color: trendColor }}>
                {trendArrow}
              </span>
            )}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase" style={{ color: 'var(--color-text-secondary)' }}>
            Evaluations
          </div>
          <div className="text-[20px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
            {evaluationsCompleted}
          </div>
        </div>
        {rank !== undefined && (
          <div>
            <div className="text-[10px] font-semibold uppercase" style={{ color: 'var(--color-text-secondary)' }}>
              Rank
            </div>
            <div className="text-[20px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
              #{rank}
              {totalStudents && (
                <span className="text-[11px] font-normal" style={{ color: 'var(--color-text-secondary)' }}>
                  /{totalStudents}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {streak !== undefined && streak > 0 && (
        <div className="mt-3">
          <Badge variant="success">{streak}-day streak</Badge>
        </div>
      )}
    </Card>
  );
}
