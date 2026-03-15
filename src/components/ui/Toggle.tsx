'use client';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, label, disabled = false }: ToggleProps) {
  return (
    <label className={`inline-flex items-center gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative w-[46px] h-[26px] rounded-full border-none transition-colors duration-[220ms] ${checked ? 'bg-[var(--toggle-bg-on,var(--p-cobalt-500))]' : 'bg-[var(--toggle-bg-off,var(--p-slate-300))]'}`}
      >
        <span
          className={`absolute top-[2px] left-[2px] w-[22px] h-[22px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-transform duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${checked ? 'translate-x-[20px]' : 'translate-x-0'}`}
        />
      </button>
      {label && <span className="text-[13px] text-[var(--color-text-primary)]">{label}</span>}
    </label>
  );
}
