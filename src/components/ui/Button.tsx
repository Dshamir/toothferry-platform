'use client';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--color-action-bg)] text-[var(--color-action-text)] rounded-full hover:bg-[var(--color-action-bg-hover)] hover:-translate-y-[1px] active:scale-[0.98]',
  secondary: 'bg-white text-[var(--color-action-ghost-text)] border border-[var(--color-action-ghost-border)] rounded-[var(--radius-lg)] hover:bg-[var(--brand-25)]',
  ghost: 'bg-[var(--p-slate-100)] text-[var(--p-slate-500)] rounded-[var(--radius-lg)] hover:bg-[var(--p-slate-200)]',
  danger: 'bg-[var(--p-red-50)] text-[var(--p-red-600)] border border-[var(--p-red-400)] rounded-[var(--radius-lg)] hover:bg-[var(--p-red-400)] hover:text-white',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-[34px] px-4 text-[11px]',
  md: 'h-[44px] px-6 text-[13px]',
  lg: 'h-[52px] px-8 text-[17px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 cursor-pointer border-none whitespace-nowrap font-semibold transition-all duration-[120ms] ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
