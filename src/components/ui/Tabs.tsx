'use client';
import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className = '' }: TabsProps) {
  const [active, setActive] = useState(activeTab || tabs[0]?.id);
  const currentActive = activeTab ?? active;

  const handleClick = (tabId: string) => {
    setActive(tabId);
    onChange?.(tabId);
  };

  return (
    <div className={`flex gap-1 border-b border-[var(--color-border-subtle)] ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleClick(tab.id)}
          className={`px-4 py-2 text-[13px] border-none bg-transparent cursor-pointer transition-all rounded-t-[var(--radius-md)] ${
            currentActive === tab.id
              ? 'bg-[var(--brand-50,var(--p-cobalt-50))] text-[var(--brand-700,var(--p-cobalt-700))] font-semibold'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
