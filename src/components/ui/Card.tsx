import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: boolean;
}

export function Card({ children, className = '', padding = true, ...props }: CardProps) {
  return (
    <div
      className={`bg-[var(--card-bg,var(--p-white))] border border-[var(--color-border-subtle)] rounded-[var(--radius-card)] shadow-[var(--card-shadow)] ${padding ? 'p-6' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center justify-between mb-5 pb-4 border-b border-[var(--color-border-subtle)] ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={`text-[15px] font-semibold text-[var(--color-text-primary)] ${className}`}>
      {children}
    </h3>
  );
}
