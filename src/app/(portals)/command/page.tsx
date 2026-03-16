'use client';

import { useState, useEffect, useRef } from 'react';
import { PageTransition } from '@/components/animation/PageTransition';
import { KpiCard } from '@/components/ui/KpiCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { EditablePortalPage } from '@/components/shared/EditablePortalPage';

const kpis = [
  { label: 'Crowns Processed', value: 1847, delta: '+23 today', deltaDirection: 'up' as const },
  { label: 'MRR', value: '$61.2K', delta: '+$4.8K MoM', deltaDirection: 'up' as const },
  { label: 'Acceptance Rate', value: '93.8%', delta: '-0.2% from target', deltaDirection: 'down' as const },
  { label: 'Active Alerts', value: 3, delta: '1 critical', deltaDirection: 'down' as const },
];

interface LogEntry {
  id: number;
  time: string;
  portal: 'dentist' | 'lab' | 'academic' | 'admin';
  message: string;
}

const portalColors: Record<string, string> = {
  dentist: 'bg-[#2563EB]',
  lab: 'bg-[#179A8B]',
  academic: 'bg-[#6750D6]',
  admin: 'bg-[#64748B]',
};

const seedLogs: LogEntry[] = [
  { id: 1, time: '10:02:14', portal: 'dentist', message: 'TF-048 submitted — Dr. Chen — #14 UL6 zirconia' },
  { id: 2, time: '10:01:58', portal: 'lab', message: 'TF-043 milling started — Roland DWX-52D — e.max' },
  { id: 3, time: '10:01:42', portal: 'academic', message: 'Student M. Tremblay completed Margin Module 4' },
  { id: 4, time: '10:01:30', portal: 'admin', message: 'GPU A100-0 utilization spike: 62% -> 78%' },
  { id: 5, time: '10:01:15', portal: 'dentist', message: 'TF-046 generation at 73% — MeshSegNet v2.3.1' },
  { id: 6, time: '10:00:58', portal: 'lab', message: 'TF-044 QC passed — margin gap 87um — approved' },
  { id: 7, time: '10:00:44', portal: 'dentist', message: 'TF-047 submitted — Dr. Patel — #19 LL6 e.max' },
  { id: 8, time: '10:00:30', portal: 'academic', message: 'Prof. Keren graded 12 crown anatomy submissions' },
  { id: 9, time: '10:00:18', portal: 'admin', message: 'Auto-scale: inference pool maintained at 4 replicas' },
  { id: 10, time: '10:00:02', portal: 'lab', message: 'TF-045 flagged — margin gap 218um lingual zone' },
];

const sparklineData = [
  [12, 18, 14, 22, 19, 25, 23],
  [48, 52, 50, 55, 58, 61, 61.2],
  [92.1, 93.2, 93.0, 94.1, 93.5, 93.8, 93.8],
  [5, 4, 3, 6, 4, 3, 3],
];

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 24;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');

  return (
    <svg width={w} height={h} className="mt-1">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CommandOverview() {
  const [logs, setLogs] = useState<LogEntry[]>(seedLogs);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messages = [
      { portal: 'dentist' as const, message: 'TF-049 submitted — Dr. Wang — #12 UL4 e.max' },
      { portal: 'lab' as const, message: 'TF-046 generation complete — QC review queued' },
      { portal: 'admin' as const, message: 'API latency nominal: 94ms p99' },
      { portal: 'academic' as const, message: 'New evaluation batch: 18 scans from DMD-3 lab' },
    ];

    let idx = 0;
    const interval = setInterval(() => {
      const msg = messages[idx % messages.length];
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      setLogs((prev) => [{ id: Date.now(), time, ...msg }, ...prev].slice(0, 20));
      idx++;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <EditablePortalPage slug="command">
    <PageTransition>
      <div data-portal="command" className="min-h-screen bg-[var(--color-bg-page)] p-8" style={{ fontFamily: 'var(--font-mono)' }}>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
            Command Center
          </h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
            LIVE OPS &middot; Real-time platform monitoring &middot; All portals
          </p>
        </div>

        {/* KPI Row with Sparklines */}
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {kpis.map((kpi, i) => (
            <StaggerItem key={kpi.label}>
              <div className="bg-[var(--card-bg,rgba(0,0,0,0.3))] border border-[var(--color-border-subtle)] rounded-[var(--radius-card)] p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--color-text-secondary)] mb-2">
                      {kpi.label}
                    </div>
                    <div className="text-[30px] font-bold text-[var(--color-text-primary)] leading-none mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                      {kpi.value}
                    </div>
                    <div className={`text-[11px] font-semibold ${kpi.deltaDirection === 'up' ? 'text-[#3FB950]' : kpi.deltaDirection === 'down' ? 'text-[#F85149]' : 'text-[var(--color-text-secondary)]'}`}>
                      {kpi.delta}
                    </div>
                  </div>
                  <MiniSparkline data={sparklineData[i]} color="#3FB950" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Live Event Feed */}
        <Card className="bg-[var(--card-bg,rgba(0,0,0,0.3))]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3FB950] animate-pulse" />
              <CardTitle>Live Event Feed</CardTitle>
            </div>
            <div className="flex gap-3">
              {Object.entries(portalColors).map(([portal, color]) => (
                <div key={portal} className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${color}`} />
                  <span className="text-[9px] uppercase tracking-wider text-[var(--color-text-tertiary)]">{portal}</span>
                </div>
              ))}
            </div>
          </CardHeader>
          <div ref={feedRef} className="space-y-1 max-h-[400px] overflow-y-auto">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-center gap-3 py-1.5 px-2 rounded hover:bg-[rgba(93,202,165,0.05)] transition-colors"
              >
                <span className="text-[11px] text-[var(--color-text-tertiary)] w-[70px] flex-shrink-0">
                  {log.time}
                </span>
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${portalColors[log.portal]}`} />
                <span className="text-[11px] text-[var(--color-text-primary)]">
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageTransition>
    </EditablePortalPage>
  );
}
