'use client';

import { ProgressBar } from '@/components/ui/ProgressBar';
import { AxisScore } from '@/types/academic';

interface FiveAxisChartProps {
  axes: AxisScore[];
  compact?: boolean;
}

export function FiveAxisChart({ axes, compact = false }: FiveAxisChartProps) {
  if (compact) {
    return (
      <div className="flex gap-[3px] items-end h-[20px]">
        {axes.map((axis) => (
          <div
            key={axis.name}
            className="w-[6px] rounded-t"
            style={{
              height: `${(axis.score / axis.max) * 100}%`,
              background: axis.color,
              minHeight: 2,
            }}
            title={`${axis.name}: ${axis.score}/${axis.max}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {axes.map((axis) => (
        <div key={axis.name}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[12px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {axis.name}
            </span>
            <span className="text-[12px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {axis.score} / {axis.max}
            </span>
          </div>
          <ProgressBar value={(axis.score / axis.max) * 100} color={axis.color} height={6} />
        </div>
      ))}
    </div>
  );
}
