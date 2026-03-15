'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';

const revenueStreams = [
  { name: 'Crown Generation (per-case)', amount: 38200, percentage: 62.4, color: '#3FB950' },
  { name: 'Academic Licenses', amount: 9800, percentage: 16.0, color: '#5DCAA5' },
  { name: 'Lab Subscriptions', amount: 8400, percentage: 13.7, color: 'rgba(93,202,165,0.6)' },
  { name: 'Scanner Integration Fees', amount: 4800, percentage: 7.9, color: 'rgba(93,202,165,0.3)' },
];

const monthlyTrend = [
  { month: 'Oct 2025', revenue: 28400, growth: null },
  { month: 'Nov 2025', revenue: 34100, growth: '+20.1%' },
  { month: 'Dec 2025', revenue: 39800, growth: '+16.7%' },
  { month: 'Jan 2026', revenue: 48200, growth: '+21.1%' },
  { month: 'Feb 2026', revenue: 55600, growth: '+15.4%' },
  { month: 'Mar 2026', revenue: 61200, growth: '+10.1%' },
];

const maxRevenue = Math.max(...monthlyTrend.map((m) => m.revenue));

export default function RevenuePage() {
  return (
    <PageTransition>
      <div data-portal="command" className="min-h-screen bg-[var(--color-bg-page)] p-8" style={{ fontFamily: 'var(--font-mono)' }}>
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
            Revenue
          </h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
            Revenue streams, MRR growth, and financial metrics
          </p>
        </div>

        {/* KPI Row */}
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StaggerItem>
            <KpiCard label="MRR" value="$61.2K" delta="+10.1% MoM" deltaDirection="up" />
          </StaggerItem>
          <StaggerItem>
            <KpiCard label="ARR Run Rate" value="$734K" delta="Target: $1.2M" deltaDirection="neutral" />
          </StaggerItem>
          <StaggerItem>
            <KpiCard label="Avg Revenue/Case" value="$33.20" delta="+$1.80 vs last month" deltaDirection="up" />
          </StaggerItem>
          <StaggerItem>
            <KpiCard label="Active Accounts" value={23} suffix=" clinics" delta="+5 this quarter" deltaDirection="up" />
          </StaggerItem>
        </StaggerChildren>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue by Stream */}
          <Card className="bg-[var(--card-bg,rgba(0,0,0,0.3))]">
            <CardHeader>
              <CardTitle>Revenue by Stream</CardTitle>
              <span className="text-[13px] font-bold text-[var(--color-text-primary)]">$61,200</span>
            </CardHeader>
            <div className="space-y-4">
              {revenueStreams.map((stream) => (
                <div key={stream.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] text-[var(--color-text-primary)]">{stream.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-[var(--color-text-tertiary)]">{stream.percentage}%</span>
                      <span className="text-[13px] font-bold text-[var(--color-text-primary)]">
                        ${(stream.amount / 1000).toFixed(1)}K
                      </span>
                    </div>
                  </div>
                  <ProgressBar value={stream.percentage} color={stream.color} height={6} />
                </div>
              ))}
            </div>
          </Card>

          {/* Monthly Trend */}
          <Card className="bg-[var(--card-bg,rgba(0,0,0,0.3))]">
            <CardHeader>
              <CardTitle>Monthly Trend</CardTitle>
              <Badge variant="reviewed">Growing</Badge>
            </CardHeader>
            <div className="space-y-3">
              {monthlyTrend.map((m) => (
                <div key={m.month} className="flex items-center gap-4">
                  <span className="text-[11px] text-[var(--color-text-tertiary)] w-[80px] flex-shrink-0">
                    {m.month}
                  </span>
                  <div className="flex-1">
                    <div className="h-6 rounded-[var(--radius-sm)] overflow-hidden" style={{ background: 'rgba(93,202,165,0.1)' }}>
                      <div
                        className="h-full rounded-[var(--radius-sm)] transition-all duration-500"
                        style={{
                          width: `${(m.revenue / maxRevenue) * 100}%`,
                          background: 'linear-gradient(90deg, #3FB950, #5DCAA5)',
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-[var(--color-text-primary)] w-[60px] text-right">
                    ${(m.revenue / 1000).toFixed(1)}K
                  </span>
                  <span className={`text-[11px] w-[50px] text-right font-semibold ${m.growth ? 'text-[#3FB950]' : 'text-[var(--color-text-tertiary)]'}`}>
                    {m.growth || '--'}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
