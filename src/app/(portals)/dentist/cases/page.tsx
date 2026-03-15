'use client';

import { useState } from 'react';
import { PageTransition } from '@/components/animation/PageTransition';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { Tabs } from '@/components/ui/Tabs';
import { useSimulationStore } from '@/store/simulation-store';
import type { Case, CaseStatus } from '@/types/case';

const STATUS_TABS = [
  { id: 'all', label: 'All Cases' },
  { id: 'active', label: 'Active' },
  { id: 'reviewing', label: 'Review' },
  { id: 'approved', label: 'Approved' },
  { id: 'completed', label: 'Completed' },
  { id: 'flagged', label: 'Flagged' },
];

const ACTIVE_STATUSES: CaseStatus[] = ['submitted', 'ingesting', 'segmenting', 'detecting-margin', 'generating'];

const statusToBadge: Record<string, 'progress' | 'ready' | 'review' | 'reviewed' | 'pending' | 'error' | 'success' | 'info'> = {
  submitted: 'pending',
  ingesting: 'progress',
  segmenting: 'progress',
  'detecting-margin': 'progress',
  generating: 'progress',
  reviewing: 'review',
  approved: 'success',
  milling: 'info',
  sintering: 'info',
  completed: 'ready',
  flagged: 'error',
};

const columns = [
  { key: 'shortId', header: 'Case ID', render: (c: Case) => <span className="font-mono text-[12px]">{c.shortId}</span> },
  { key: 'patientName', header: 'Patient' },
  { key: 'toothNumber', header: 'Tooth' },
  { key: 'material', header: 'Material', render: (c: Case) => <span className="capitalize">{c.material}</span> },
  {
    key: 'status',
    header: 'Status',
    render: (c: Case) => <Badge variant={statusToBadge[c.status] || 'pending'}>{c.status}</Badge>,
  },
  { key: 'prepScore', header: 'Prep Score', render: (c: Case) => c.prepScore.toFixed(1) },
  {
    key: 'confidence',
    header: 'Confidence',
    render: (c: Case) => (
      <span className={c.confidence >= 90 ? 'text-[var(--p-green-600)] font-semibold' : c.confidence > 0 ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-tertiary)]'}>
        {c.confidence > 0 ? `${c.confidence}%` : '\u2014'}
      </span>
    ),
  },
  {
    key: 'createdAt',
    header: 'Date',
    render: (c: Case) => <span className="text-[12px] text-[var(--color-text-secondary)]">{c.createdAt.toLocaleDateString('en-CA')}</span>,
  },
];

export default function CasesPage() {
  const cases = useSimulationStore((s) => s.cases);
  const [activeTab, setActiveTab] = useState('all');

  const filteredCases = cases.filter((c) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return ACTIVE_STATUSES.includes(c.status);
    if (activeTab === 'reviewing') return c.status === 'reviewing';
    if (activeTab === 'approved') return ['approved', 'milling', 'sintering'].includes(c.status);
    if (activeTab === 'completed') return c.status === 'completed';
    if (activeTab === 'flagged') return c.status === 'flagged';
    return true;
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-[22px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            All Cases
          </h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
            Manage and track all crown generation cases
          </p>
        </div>

        <Tabs tabs={STATUS_TABS} activeTab={activeTab} onChange={setActiveTab} />

        <div className="text-[12px] text-[var(--color-text-secondary)] mb-2">
          Showing {filteredCases.length} of {cases.length} cases
        </div>

        <DataTable<Case & Record<string, unknown>>
          columns={columns as { key: string; header: string; render?: (item: Case & Record<string, unknown>) => React.ReactNode; className?: string }[]}
          data={filteredCases as (Case & Record<string, unknown>)[]}
        />
      </div>
    </PageTransition>
  );
}
