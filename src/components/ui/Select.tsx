import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, className = '', id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="mb-3">
        {label && (
          <label htmlFor={selectId} className="block text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--color-text-secondary)] mb-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full h-[42px] px-4 bg-[var(--input-bg)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] text-[13px] text-[var(--color-text-primary)] outline-none appearance-none cursor-pointer focus:border-[var(--p-cobalt-500)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.15)] ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  }
);
Select.displayName = 'Select';
