'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';

const MONTHLY_DATA = [
  { month: 'Oct', crowns: 18 },
  { month: 'Nov', crowns: 22 },
  { month: 'Dec', crowns: 19 },
  { month: 'Jan', crowns: 26 },
  { month: 'Feb', crowns: 28 },
  { month: 'Mar', crowns: 31 },
];

const CONFIDENCE_TREND = [
  { month: 'Oct', value: 89 },
  { month: 'Nov', value: 91 },
  { month: 'Dec', value: 90 },
  { month: 'Jan', value: 93 },
  { month: 'Feb', value: 95 },
  { month: 'Mar', value: 97 },
];

const MATERIAL_DIST = [
  { material: 'Zirconia', pct: 52, color: 'var(--brand-500, var(--p-cobalt-500))' },
  { material: 'IPS e.max', pct: 31, color: 'var(--p-green-500)' },
  { material: 'PMMA', pct: 11, color: 'var(--p-slate-400)' },
  { material: 'Composite', pct: 6, color: 'var(--p-slate-300)' },
];

const maxCrowns = Math.max(...MONTHLY_DATA.map((d) => d.crowns));

export default function ReportsPage() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-[22px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            Reports &amp; Analytics
          </h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
            Performance metrics and trend analysis
          </p>
        </div>

        <StaggerChildren className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Crowns Bar Chart */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle>Monthly Crowns Generated</CardTitle>
              </CardHeader>
              <div className="flex items-end gap-3 h-[200px] pt-4">
                {MONTHLY_DATA.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center justify-end h-full">
                    <div className="text-[11px] font-bold text-[var(--color-text-primary)] mb-1">{d.crowns}</div>
                    <div
                      className="w-full rounded-t-[var(--radius-md)] transition-all duration-500"
                      style={{
                        height: `${(d.crowns / maxCrowns) * 160}px`,
                        background: 'var(--brand-500, var(--p-cobalt-500))',
                        opacity: d.month === 'Mar' ? 1 : 0.6,
                      }}
                    />
                    <div className="text-[11px] text-[var(--color-text-secondary)] mt-2 font-medium">{d.month}</div>
                  </div>
                ))}
              </div>
            </Card>
          </StaggerItem>

          {/* Average Confidence Trend */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle>Average Confidence Trend</CardTitle>
              </CardHeader>
              <div className="flex items-end gap-3 h-[200px] pt-4">
                {CONFIDENCE_TREND.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center justify-end h-full">
                    <div className="text-[11px] font-bold text-[var(--p-green-600)] mb-1">{d.value}%</div>
                    <div
                      className="w-full rounded-t-[var(--radius-md)] transition-all duration-500"
                      style={{
                        height: `${((d.value - 80) / 20) * 160}px`,
                        background: 'var(--p-green-500)',
                        opacity: d.month === 'Mar' ? 1 : 0.6,
                      }}
                    />
                    <div className="text-[11px] text-[var(--color-text-secondary)] mt-2 font-medium">{d.month}</div>
                  </div>
                ))}
              </div>
            </Card>
          </StaggerItem>

          {/* Material Distribution */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle>Material Distribution</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                {MATERIAL_DIST.map((d) => (
                  <div key={d.material}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[13px] font-medium text-[var(--color-text-primary)]">{d.material}</span>
                      <span className="text-[13px] font-bold text-[var(--color-text-primary)]">{d.pct}%</span>
                    </div>
                    <div className="w-full h-[8px] rounded-full overflow-hidden" style={{ background: 'var(--progress-track-bg, var(--p-cobalt-100))' }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${d.pct}%`, background: d.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Stacked bar */}
              <div className="mt-6 flex h-[28px] rounded-[var(--radius-lg)] overflow-hidden">
                {MATERIAL_DIST.map((d) => (
                  <div
                    key={d.material}
                    style={{ width: `${d.pct}%`, background: d.color }}
                    className="h-full transition-all duration-500"
                    title={`${d.material}: ${d.pct}%`}
                  />
                ))}
              </div>
            </Card>
          </StaggerItem>

          {/* Performance Summary */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                {[
                  { label: 'First-Pass Acceptance Rate', value: '97%', trend: '+2.1%', up: true },
                  { label: 'Average Design Time', value: '1:47', trend: '-18s', up: true },
                  { label: 'Average Margin Gap', value: '82\u00B5m', trend: '-8\u00B5m', up: true },
                  { label: 'Prep Quality Score', value: '3.1/4', trend: '+0.2', up: true },
                  { label: 'Flagged Rate', value: '3.2%', trend: '-1.1%', up: true },
                  { label: 'Lab Turnaround', value: '2.4 days', trend: '-0.3d', up: true },
                ].map((m) => (
                  <div key={m.label} className="flex items-center justify-between py-2 border-b border-[var(--color-border-subtle)] last:border-b-0">
                    <span className="text-[13px] text-[var(--color-text-secondary)]">{m.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-bold text-[var(--color-text-primary)]">{m.value}</span>
                      <span className="text-[11px] font-semibold text-[var(--p-green-600)]">{m.trend}</span>
                    </div>
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
