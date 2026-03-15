'use client';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  height?: number;
  animated?: boolean;
  className?: string;
}

export function ProgressBar({ value, color, height = 6, animated = true, className = '' }: ProgressBarProps) {
  return (
    <div
      className={`w-full rounded-full overflow-hidden ${className}`}
      style={{ height, background: 'var(--progress-track-bg, var(--p-cobalt-100))' }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ background: color || 'var(--progress-fill-color, var(--p-cobalt-500))' }}
        initial={animated ? { width: 0 } : { width: `${value}%` }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
