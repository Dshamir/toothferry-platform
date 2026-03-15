'use client';
import { motion } from 'framer-motion';

interface NotificationToastProps {
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  portal?: string;
  onClose?: () => void;
}

const typeStyles = {
  info: 'border-l-[var(--p-cobalt-500)] bg-[var(--p-cobalt-50)]',
  success: 'border-l-[var(--p-green-400)] bg-[var(--p-green-50)]',
  warning: 'border-l-[var(--p-amber-400)] bg-[var(--p-amber-50)]',
  error: 'border-l-[var(--p-red-400)] bg-[var(--p-red-50)]',
};

export function NotificationToast({ title, message, type = 'info', portal, onClose }: NotificationToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.95 }}
      className={`w-[340px] rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] border-l-4 p-4 shadow-lg ${typeStyles[type]}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-[13px] font-semibold text-[var(--color-text-primary)]">{title}</div>
          <div className="text-[11px] text-[var(--color-text-secondary)] mt-1">{message}</div>
          {portal && (
            <div className="text-[10px] mt-2 text-[var(--color-text-tertiary)]" style={{ fontFamily: 'var(--font-mono)' }}>
              via {portal}
            </div>
          )}
        </div>
        {onClose && (
          <button onClick={onClose} className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] text-sm border-none bg-transparent cursor-pointer">
            ×
          </button>
        )}
      </div>
    </motion.div>
  );
}
