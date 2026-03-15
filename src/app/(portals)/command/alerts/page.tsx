'use client';

import { useState } from 'react';
import { PageTransition } from '@/components/animation/PageTransition';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';

type Severity = 'critical' | 'warning' | 'info';

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  source: string;
  time: string;
  acknowledged: boolean;
}

const initialAlerts: Alert[] = [
  {
    id: 'A-001', title: 'Margin gap exceeds threshold',
    description: 'TF-045 lingual zone margin gap 218um exceeds 200um limit. Case flagged for manual review.',
    severity: 'critical', source: 'QC Engine', time: '3 min ago', acknowledged: false,
  },
  {
    id: 'A-002', title: 'GPU memory pressure',
    description: 'A100-0 memory at 60GB/80GB (75%). Consider redistributing inference workload.',
    severity: 'warning', source: 'Infrastructure', time: '12 min ago', acknowledged: false,
  },
  {
    id: 'A-003', title: 'Student low score alert',
    description: 'Student A. Roy prep score 1.8/4.0 — below 2.0 intervention threshold.',
    severity: 'warning', source: 'Academic Portal', time: '32 min ago', acknowledged: false,
  },
  {
    id: 'A-004', title: 'New scanner adapter available',
    description: 'Planmeca Emerald S adapter v0.9.2 released in beta. Review and enable in scanner config.',
    severity: 'info', source: 'Release Pipeline', time: '1 hr ago', acknowledged: true,
  },
  {
    id: 'A-005', title: 'HIPAA audit log rotation',
    description: 'Monthly audit log rotation completed. 12GB of 50GB used. Retention policy: 7 years.',
    severity: 'info', source: 'Compliance', time: '2 hrs ago', acknowledged: true,
  },
  {
    id: 'A-006', title: 'API latency spike',
    description: 'p99 latency briefly exceeded 200ms at 09:45 UTC. Auto-resolved. Root cause: cold start.',
    severity: 'warning', source: 'API Gateway', time: '3 hrs ago', acknowledged: true,
  },
];

const severityStyles: Record<Severity, { badge: 'error' | 'pending' | 'info'; border: string; dot: string }> = {
  critical: { badge: 'error', border: 'border-l-4 border-l-[var(--p-red-400)]', dot: 'bg-[#F85149]' },
  warning: { badge: 'pending', border: 'border-l-4 border-l-[var(--p-amber-400)]', dot: 'bg-[#E3B341]' },
  info: { badge: 'info', border: 'border-l-4 border-l-[rgba(93,202,165,0.4)]', dot: 'bg-[#5DCAA5]' },
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState<'all' | Severity>('all');

  const acknowledge = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));
  };

  const filtered = alerts.filter((a) => filter === 'all' || a.severity === filter);
  const criticalCount = alerts.filter((a) => a.severity === 'critical' && !a.acknowledged).length;
  const warningCount = alerts.filter((a) => a.severity === 'warning' && !a.acknowledged).length;

  return (
    <PageTransition>
      <div data-portal="command" className="min-h-screen bg-[var(--color-bg-page)] p-8" style={{ fontFamily: 'var(--font-mono)' }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
              Alert Management
            </h1>
            <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
              {criticalCount} critical &middot; {warningCount} warning &middot; {alerts.length} total
            </p>
          </div>
          <div className="flex gap-2">
            {(['all', 'critical', 'warning', 'info'] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <StaggerChildren className="space-y-3">
          {filtered.map((alert) => (
            <StaggerItem key={alert.id}>
              <Card className={`bg-[var(--card-bg,rgba(0,0,0,0.3))] ${severityStyles[alert.severity].border} ${alert.acknowledged ? 'opacity-50' : ''}`}>
                <div className="flex items-start gap-4">
                  <span className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${severityStyles[alert.severity].dot} ${!alert.acknowledged ? 'animate-pulse' : ''}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] font-semibold text-[var(--color-text-primary)]">
                        {alert.title}
                      </span>
                      <Badge variant={severityStyles[alert.severity].badge}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-[var(--color-text-secondary)] mb-2 leading-relaxed">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-4 text-[11px] text-[var(--color-text-tertiary)]">
                      <span>{alert.source}</span>
                      <span>&middot;</span>
                      <span>{alert.time}</span>
                      {alert.acknowledged && <span>&middot; Acknowledged</span>}
                    </div>
                  </div>
                  {!alert.acknowledged && (
                    <Button variant="ghost" size="sm" onClick={() => acknowledge(alert.id)}>
                      ACK
                    </Button>
                  )}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
