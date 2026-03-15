'use client';

import { useState } from 'react';
import { PageTransition } from '@/components/animation/PageTransition';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Toggle } from '@/components/ui/Toggle';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { SEED_FEATURE_FLAGS, FeatureFlag } from '@/data/feature-flags';

const categoryColors: Record<string, string> = {
  dentist: 'bg-[var(--p-cobalt-100)] text-[var(--p-cobalt-700)]',
  lab: 'bg-[var(--p-teal-100)] text-[var(--p-teal-700)]',
  ai: 'bg-[var(--p-violet-100)] text-[var(--p-violet-700)]',
  academic: 'bg-[var(--p-amber-50)] text-[var(--p-amber-800)]',
  infra: 'bg-[var(--p-slate-100)] text-[var(--p-slate-700)]',
  compliance: 'bg-[var(--p-green-50)] text-[var(--p-green-800)]',
};

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState<FeatureFlag[]>(SEED_FEATURE_FLAGS);

  const toggleFlag = (id: string) => {
    setFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const enabledCount = flags.filter((f) => f.enabled).length;

  return (
    <PageTransition>
      <div data-portal="admin" className="min-h-screen bg-[var(--color-bg-page)] p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
              Feature Flags
            </h1>
            <p className="text-[15px] text-[var(--color-text-secondary)] mt-1">
              Toggle features across the platform. {enabledCount} of {flags.length} enabled.
            </p>
          </div>
          <Badge variant="info">{enabledCount} / {flags.length} active</Badge>
        </div>

        <StaggerChildren>
          <StaggerItem>
            <Card padding={false}>
              <div className="divide-y divide-[var(--color-border-subtle)]">
                {flags.map((flag) => (
                  <div key={flag.id} className="flex items-center gap-5 px-6 py-4 hover:bg-[var(--color-bg-sunken)] transition-colors">
                    <Toggle checked={flag.enabled} onChange={() => toggleFlag(flag.id)} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[13px] font-semibold text-[var(--color-text-primary)]">
                          {flag.name}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${categoryColors[flag.category] || 'bg-[var(--p-slate-100)] text-[var(--p-slate-600)]'}`}>
                          {flag.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--color-text-tertiary)]">{flag.description}</p>
                    </div>
                    <span className="text-[11px] text-[var(--color-text-tertiary)] whitespace-nowrap" style={{ fontFamily: 'var(--font-mono)' }}>
                      {flag.key}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
