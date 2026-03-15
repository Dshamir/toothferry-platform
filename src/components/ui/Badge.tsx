type BadgeVariant = 'progress' | 'ready' | 'review' | 'reviewed' | 'pending' | 'error' | 'info' | 'success';

const variantStyles: Record<BadgeVariant, string> = {
  progress: 'bg-[var(--status-progress-bg)] text-[var(--status-progress-text)]',
  ready: 'bg-[var(--status-ready-bg)] text-[var(--status-ready-text)]',
  review: 'bg-[var(--status-review-bg)] text-[var(--status-review-text)]',
  reviewed: 'bg-[var(--status-reviewed-bg)] text-[var(--status-reviewed-text)]',
  pending: 'bg-[var(--status-pending-bg)] text-[var(--status-pending-text)]',
  error: 'bg-[var(--status-error-bg)] text-[var(--status-error-text)]',
  info: 'bg-[var(--color-info-bg)] text-[var(--color-info-text)]',
  success: 'bg-[var(--p-green-50)] text-[var(--p-green-800)]',
};

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant, children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-[14px] py-[4px] rounded-full text-[11px] font-semibold ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
