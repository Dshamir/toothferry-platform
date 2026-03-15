'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { KpiCard } from '@/components/ui/KpiCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useSimulationStore } from '@/store/simulation-store';

const THROUGHPUT_WEEKLY = [
  { week: 'W6', crowns: 68 },
  { week: 'W7', crowns: 74 },
  { week: 'W8', crowns: 82 },
  { week: 'W9', crowns: 77 },
  { week: 'W10', crowns: 91 },
  { week: 'W11', crowns: 85 },
];

const MATERIAL_USAGE = [
  { material: 'Zirconia', units: 186, percentage: 57, color: 'var(--brand-500, var(--p-cobalt-500))' },
  { material: 'E-max', units: 98, percentage: 30, color: 'var(--p-teal-500, #14b8a6)' },
  { material: 'PMMA (Temp)', units: 32, percentage: 10, color: 'var(--p-amber-500, #f59e0b)' },
  { material: 'Composite', units: 8, percentage: 3, color: 'var(--p-slate-400, #94a3b8)' },
];

const PROCESSING_TIMES = [
  { stage: 'Ingestion & Segmentation', avg: '1:12', target: '1:30', pass: true },
  { stage: 'Margin Detection', avg: '0:34', target: '0:45', pass: true },
  { stage: 'Crown Generation', avg: '2:47', target: '3:00', pass: true },
  { stage: 'QC Review', avg: '4:15', target: '3:00', pass: false },
  { stage: 'Milling', avg: '22:00', target: '25:00', pass: true },
  { stage: 'Sintering', avg: '45:00', target: '45:00', pass: true },
];

const ACCEPTANCE_RATES = [
  { month: 'Oct', rate: 88 },
  { month: 'Nov', rate: 91 },
  { month: 'Dec', rate: 90 },
  { month: 'Jan', rate: 93 },
  { month: 'Feb', rate: 94 },
  { month: 'Mar', rate: 96 },
];

export default function LabAnalytics() {
  const metrics = useSimulationStore((s) => s.metrics);
  const maxThroughput = Math.max(...THROUGHPUT_WEEKLY.map((w) => w.crowns));
  const maxAcceptance = 100;

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page heading */}
        <div>
          <h1 className="text-[22px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            Lab Analytics
          </h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
            Performance metrics, throughput trends, and material analysis
          </p>
        </div>

        {/* KPI Row */}
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StaggerItem>
            <KpiCard label="Crowns / Month" value={324} delta="+18% vs last month" deltaDirection="up" />
          </StaggerItem>
          <StaggerItem>
            <KpiCard label="Acceptance Rate" value={metrics.acceptanceRate} suffix="%" delta="+2.1% trend" deltaDirection="up" />
          </StaggerItem>
          <StaggerItem>
            <KpiCard label="Avg Processing" value="4:33" delta="-22% vs Q3" deltaDirection="down" />
          </StaggerItem>
          <StaggerItem>
            <KpiCard label="Remake Rate" value="1.8" suffix="%" delta="-0.4% vs avg" deltaDirection="down" />
          </StaggerItem>
        </StaggerChildren>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Throughput Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Throughput</CardTitle>
              <span className="text-[11px] text-[var(--color-text-secondary)]">Crowns produced per week</span>
            </CardHeader>
            <div className="flex items-end justify-between gap-2 h-[200px] pt-4">
              {THROUGHPUT_WEEKLY.map((week) => (
                <div key={week.week} className="flex flex-col items-center flex-1 h-full justify-end">
                  <span className="text-[11px] font-semibold text-[var(--color-text-primary)] mb-1">{week.crowns}</span>
                  <div
                    className="w-full rounded-t-md transition-all duration-500"
                    style={{
                      height: `${(week.crowns / maxThroughput) * 75}%`,
                      minHeight: '8px',
                      background: 'var(--brand-500, var(--p-cobalt-500))',
                    }}
                  />
                  <span className="text-[10px] text-[var(--color-text-secondary)] mt-2">{week.week}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Acceptance Rate Chart */}
          <Card>
            <CardHeader>
              <CardTitle>First-Pass Acceptance Rate</CardTitle>
              <span className="text-[11px] text-[var(--color-text-secondary)]">Monthly trend</span>
            </CardHeader>
            <div className="flex items-end justify-between gap-2 h-[200px] pt-4">
              {ACCEPTANCE_RATES.map((month) => (
                <div key={month.month} className="flex flex-col items-center flex-1 h-full justify-end">
                  <span className="text-[11px] font-semibold text-[var(--color-text-primary)] mb-1">{month.rate}%</span>
                  <div
                    className="w-full rounded-t-md transition-all duration-500"
                    style={{
                      height: `${((month.rate - 80) / 20) * 75}%`,
                      minHeight: '8px',
                      background: month.rate >= 95 ? 'var(--p-green-500, #10b981)' : 'var(--p-teal-500, #14b8a6)',
                    }}
                  />
                  <span className="text-[10px] text-[var(--color-text-secondary)] mt-2">{month.month}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Processing Times */}
          <Card>
            <CardHeader>
              <CardTitle>Avg Processing Time by Stage</CardTitle>
            </CardHeader>
            <div className="space-y-3">
              {PROCESSING_TIMES.map((stage) => (
                <div key={stage.stage} className="flex items-center justify-between py-2.5 border-b border-[var(--color-border-subtle)] last:border-b-0">
                  <div className="flex-1 min-w-0">
                    <span className="text-[12px] font-semibold text-[var(--color-text-primary)] block truncate">{stage.stage}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[14px] font-bold text-[var(--color-text-primary)]">{stage.avg}</span>
                      <span className="text-[11px] text-[var(--color-text-secondary)] ml-1">/ {stage.target}</span>
                    </div>
                    <span className={`text-[10px] font-bold w-10 text-center ${stage.pass ? 'text-[var(--p-green-600)]' : 'text-[var(--p-red-600)]'}`}>
                      {stage.pass ? 'PASS' : 'OVER'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 px-3 py-2 rounded-md bg-[var(--p-amber-50,#fffbeb)] border border-[var(--p-amber-200,#fde68a)]">
              <p className="text-[12px] text-[var(--p-amber-700,#b45309)]">
                <strong>QC Review</strong> exceeds target by 1:15. Consider adding a second reviewer or adjusting the confidence threshold.
              </p>
            </div>
          </Card>

          {/* Material Usage Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Material Usage Breakdown</CardTitle>
              <span className="text-[11px] text-[var(--color-text-secondary)]">Last 30 days</span>
            </CardHeader>

            {/* Stacked bar */}
            <div className="flex w-full h-8 rounded-full overflow-hidden mb-4">
              {MATERIAL_USAGE.map((mat) => (
                <div
                  key={mat.material}
                  style={{
                    width: `${mat.percentage}%`,
                    background: mat.color,
                    transition: 'width 0.6s ease',
                  }}
                  className="h-full"
                  title={`${mat.material}: ${mat.percentage}%`}
                />
              ))}
            </div>

            {/* Legend + details */}
            <div className="space-y-3">
              {MATERIAL_USAGE.map((mat) => (
                <div key={mat.material} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm" style={{ background: mat.color }} />
                    <span className="text-[12px] font-semibold text-[var(--color-text-primary)]">{mat.material}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] text-[var(--color-text-secondary)]">{mat.units} units</span>
                    <span className="text-[12px] font-bold text-[var(--color-text-primary)] w-10 text-right">{mat.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)]">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[var(--color-text-primary)]">Total units</span>
                <span className="text-[16px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                  {MATERIAL_USAGE.reduce((sum, m) => sum + m.units, 0)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
