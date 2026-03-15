'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { SEED_SCANNERS } from '@/data/scanners';

const statusBadge: Record<string, { variant: 'reviewed' | 'pending' | 'progress'; label: string }> = {
  active: { variant: 'reviewed', label: 'Active' },
  beta: { variant: 'pending', label: 'Beta' },
  planned: { variant: 'progress', label: 'Planned' },
};

export default function ScannersPage() {
  return (
    <PageTransition>
      <div data-portal="admin" className="min-h-screen bg-[var(--color-bg-page)] p-8">
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
            Scanner Adapters
          </h1>
          <p className="text-[15px] text-[var(--color-text-secondary)] mt-1">
            Intraoral scanner integrations and format compatibility
          </p>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SEED_SCANNERS.map((scanner) => (
            <StaggerItem key={scanner.id}>
              <Card className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)]">{scanner.name}</h3>
                    <p className="text-[11px] text-[var(--color-text-tertiary)]">{scanner.manufacturer}</p>
                  </div>
                  <Badge variant={statusBadge[scanner.status].variant}>
                    {statusBadge[scanner.status].label}
                  </Badge>
                </div>

                <div className="space-y-3 flex-1">
                  <div>
                    <p className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-1">Formats</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {scanner.formats.map((fmt) => (
                        <span key={fmt} className="px-2 py-0.5 bg-[var(--color-bg-sunken)] rounded text-[11px] font-semibold text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-mono)' }}>
                          {fmt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-0.5">Version</p>
                      <p className="text-[13px] text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-mono)' }}>{scanner.version}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-0.5">Resolution</p>
                      <p className="text-[13px] text-[var(--color-text-primary)]">{scanner.meshResolution}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[var(--color-border-subtle)]">
                  <Button variant="secondary" size="sm" className="w-full">
                    {scanner.status === 'active' ? 'Configure' : 'View Details'}
                  </Button>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
