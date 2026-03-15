'use client';
import { useEffect, useRef, useState } from 'react';

interface KpiCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaDirection?: 'up' | 'down' | 'neutral';
  prefix?: string;
  suffix?: string;
}

export function KpiCard({ label, value, delta, deltaDirection = 'neutral', prefix = '', suffix = '' }: KpiCardProps) {
  const [displayValue, setDisplayValue] = useState(typeof value === 'number' ? 0 : value);
  const prevValue = useRef(typeof value === 'number' ? 0 : value);

  useEffect(() => {
    if (typeof value !== 'number') {
      setDisplayValue(value);
      return;
    }
    const start = typeof prevValue.current === 'number' ? prevValue.current : 0;
    const end = value;
    const duration = 600;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    prevValue.current = value;
  }, [value]);

  const deltaColors = {
    up: 'text-[var(--p-green-600)]',
    down: 'text-[var(--p-red-600)]',
    neutral: 'text-[var(--color-text-secondary)]',
  };

  return (
    <div className="bg-[var(--card-bg,var(--p-white))] border border-[var(--color-border-subtle)] rounded-[var(--radius-card)] p-5 shadow-[var(--card-shadow)]">
      <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--color-text-secondary)] mb-2">
        {label}
      </div>
      <div className="font-[var(--font-display)] text-[30px] font-bold text-[var(--color-text-primary)] leading-none mb-1" style={{ fontFamily: 'var(--font-display)' }}>
        {prefix}{displayValue}{suffix}
      </div>
      {delta && (
        <div className={`text-[11px] font-semibold ${deltaColors[deltaDirection]}`}>
          {deltaDirection === 'up' ? '\u2191' : deltaDirection === 'down' ? '\u2193' : ''} {delta}
        </div>
      )}
    </div>
  );
}
