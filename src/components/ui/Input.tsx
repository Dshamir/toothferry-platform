import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="mb-3">
        {label && (
          <label htmlFor={inputId} className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--color-text-secondary)] mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full h-[42px] px-4 bg-[var(--input-bg)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] text-[13px] text-[var(--color-text-primary)] outline-none transition-all duration-[120ms] focus:border-[var(--p-cobalt-500)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.15)] placeholder:text-[var(--color-text-tertiary)] ${className}`}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';
