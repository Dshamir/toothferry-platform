'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';

interface Milestone {
  id: string;
  quarter: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  items: { name: string; done: boolean }[];
}

const milestones: Milestone[] = [
  {
    id: 'M-01', quarter: 'Q1 2025', title: 'Foundation',
    description: 'Core AI pipeline and academic validation.',
    status: 'completed',
    items: [
      { name: 'MeshSegNet v1.0 training complete', done: true },
      { name: 'Academic portal MVP launch', done: true },
      { name: 'McGill University pilot (N=40)', done: true },
      { name: 'First validation paper submitted', done: true },
    ],
  },
  {
    id: 'M-02', quarter: 'Q2 2025', title: 'Lab Integration',
    description: 'Lab portal and scanner adapter framework.',
    status: 'completed',
    items: [
      { name: '3Shape TRIOS adapter v1.0', done: true },
      { name: 'iTero Element adapter v1.0', done: true },
      { name: 'Lab portal beta with 3 partners', done: true },
      { name: 'QC engine v1.0 (margin gap detection)', done: true },
    ],
  },
  {
    id: 'M-03', quarter: 'Q3 2025', title: 'Production Scale',
    description: 'MeshSegNet v2 and dentist portal.',
    status: 'completed',
    items: [
      { name: 'MeshSegNet v2.0 (5-fold ensemble)', done: true },
      { name: 'Dentist portal launch', done: true },
      { name: '8 lab partners onboarded', done: true },
      { name: '500th crown processed', done: true },
    ],
  },
  {
    id: 'M-04', quarter: 'Q4 2025', title: 'Command & Admin',
    description: 'Ops tooling, compliance, and admin portal.',
    status: 'completed',
    items: [
      { name: 'Admin portal with feature flags', done: true },
      { name: 'Command center live ops dashboard', done: true },
      { name: 'HIPAA compliance certification', done: true },
      { name: 'GPU auto-scaling (4x A100)', done: true },
    ],
  },
  {
    id: 'M-05', quarter: 'Q1 2026', title: 'Growth Engine',
    description: 'Revenue scale, dentist adoption, MeshSegNet v2.3.',
    status: 'in-progress',
    items: [
      { name: 'MeshSegNet v2.3.1 deployed', done: true },
      { name: '$50K MRR milestone', done: true },
      { name: '23 active clinic accounts', done: true },
      { name: 'Medit i700 adapter v2.1', done: true },
      { name: '$100K MRR target', done: false },
      { name: '50 active clinics target', done: false },
    ],
  },
  {
    id: 'M-06', quarter: 'Q2 2026', title: 'Regulatory & Expansion',
    description: 'FDA 510(k) preparation and implant module.',
    status: 'planned',
    items: [
      { name: 'FDA 510(k) submission draft', done: false },
      { name: 'Implant crown module beta', done: false },
      { name: 'Multi-tooth bridge support', done: false },
      { name: 'UdeM and Laval university pilots', done: false },
    ],
  },
  {
    id: 'M-07', quarter: 'Q3 2026', title: 'Series A',
    description: 'Fundraise, US market entry, and partnership expansion.',
    status: 'planned',
    items: [
      { name: 'Series A fundraise ($5-8M)', done: false },
      { name: '510(k) filed with FDA', done: false },
      { name: 'US market entry (3 states)', done: false },
      { name: 'ARR target: $1.2M', done: false },
    ],
  },
];

const statusColor: Record<string, { bg: string; text: string; line: string }> = {
  completed: { bg: 'rgba(63,185,80,0.15)', text: '#3FB950', line: '#3FB950' },
  'in-progress': { bg: 'rgba(93,202,165,0.15)', text: '#5DCAA5', line: '#5DCAA5' },
  planned: { bg: 'rgba(93,202,165,0.05)', text: 'rgba(93,202,165,0.5)', line: 'rgba(93,202,165,0.2)' },
};

const statusBadge: Record<string, { variant: 'reviewed' | 'ready' | 'progress' }> = {
  completed: { variant: 'reviewed' },
  'in-progress': { variant: 'ready' },
  planned: { variant: 'progress' },
};

export default function RoadmapPage() {
  return (
    <PageTransition>
      <div data-portal="command" className="min-h-screen bg-[var(--color-bg-page)] p-8" style={{ fontFamily: 'var(--font-mono)' }}>
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
            R&D Roadmap
          </h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
            Product milestones and development timeline
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-[rgba(93,202,165,0.2)]" />

          <StaggerChildren className="space-y-6">
            {milestones.map((ms) => (
              <StaggerItem key={ms.id}>
                <div className="flex gap-5">
                  {/* Timeline dot */}
                  <div className="relative flex-shrink-0 mt-5">
                    <div
                      className={`w-[10px] h-[10px] rounded-full border-2 z-10 relative ${ms.status === 'in-progress' ? 'animate-pulse' : ''}`}
                      style={{
                        background: statusColor[ms.status].line,
                        borderColor: statusColor[ms.status].text,
                      }}
                    />
                  </div>

                  {/* Card */}
                  <Card className="flex-1 bg-[var(--card-bg,rgba(0,0,0,0.3))]" style={{ borderLeft: `3px solid ${statusColor[ms.status].line}` }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold tracking-[0.1em] text-[var(--color-text-tertiary)]">
                          {ms.quarter}
                        </span>
                        <Badge variant={statusBadge[ms.status].variant}>
                          {ms.status === 'in-progress' ? 'In Progress' : ms.status.charAt(0).toUpperCase() + ms.status.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    <h3 className="text-[17px] font-bold text-[var(--color-text-primary)] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                      {ms.title}
                    </h3>
                    <p className="text-[13px] text-[var(--color-text-secondary)] mb-4">
                      {ms.description}
                    </p>

                    <div className="space-y-2">
                      {ms.items.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <span className={`text-[12px] ${item.done ? 'text-[#3FB950]' : 'text-[var(--color-text-tertiary)]'}`}>
                            {item.done ? '\u2713' : '\u25CB'}
                          </span>
                          <span className={`text-[11px] ${item.done ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-tertiary)]'}`}>
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </PageTransition>
  );
}
