'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { KpiCard } from '@/components/ui/KpiCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useSimulationStore } from '@/store/simulation-store';

const USAGE_TABLE = [
  { month: 'March 2026', crowns: 324, apiCalls: 1296, gpuHours: 18.4, cost: '$150.00', status: 'current' as const },
  { month: 'February 2026', crowns: 274, apiCalls: 1096, gpuHours: 15.2, cost: '$150.00', status: 'paid' as const },
  { month: 'January 2026', crowns: 298, apiCalls: 1192, gpuHours: 16.8, cost: '$150.00', status: 'paid' as const },
  { month: 'December 2025', crowns: 245, apiCalls: 980, gpuHours: 13.6, cost: '$150.00', status: 'paid' as const },
  { month: 'November 2025', crowns: 261, apiCalls: 1044, gpuHours: 14.5, cost: '$150.00', status: 'paid' as const },
  { month: 'October 2025', crowns: 218, apiCalls: 872, gpuHours: 12.1, cost: '$150.00', status: 'paid' as const },
];

const ROI_ITEMS = [
  { label: 'CAD time saved per crown', value: '28 min', subtext: 'vs. manual design' },
  { label: 'Monthly crowns', value: '324', subtext: 'current volume' },
  { label: 'Hours saved / month', value: '151 hrs', subtext: '324 x 28 min' },
  { label: 'Technician hourly rate', value: '$45/hr', subtext: 'industry average' },
  { label: 'Monthly labor savings', value: '$6,795', subtext: '151 hrs x $45' },
  { label: 'Annual labor savings', value: '$81,540', subtext: '$6,795 x 12' },
  { label: 'Annual subscription cost', value: '-$1,800', subtext: '$150/mo' },
  { label: 'Reduced remakes (1.2%)', value: '$4,200', subtext: 'vs. 3% industry avg' },
];

export default function LabBilling() {
  const metrics = useSimulationStore((s) => s.metrics);

  const annualSavings = 81540 + 4200;
  const annualCost = 1800;
  const netROI = annualSavings - annualCost;
  const roiMultiple = (annualSavings / annualCost).toFixed(0);

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page heading */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[22px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              Billing
            </h1>
            <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
              Subscription, usage, and return on investment
            </p>
          </div>
          <Button variant="secondary" size="md">Download Invoice</Button>
        </div>

        {/* KPIs */}
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StaggerItem>
            <KpiCard label="Annual Subscription" value="1,800" prefix="$" suffix="/yr" delta="$150/month" deltaDirection="neutral" />
          </StaggerItem>
          <StaggerItem>
            <KpiCard label="Net Annual Savings" value="83.9" prefix="$" suffix="K" delta={`${roiMultiple}x ROI`} deltaDirection="up" />
          </StaggerItem>
          <StaggerItem>
            <KpiCard label="Cost per Crown" value="0.46" prefix="$" delta="vs $45 manual" deltaDirection="down" />
          </StaggerItem>
          <StaggerItem>
            <KpiCard label="GPU Hours (Mar)" value="18.4" suffix=" hrs" delta="within plan" deltaDirection="neutral" />
          </StaggerItem>
        </StaggerChildren>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Left: Subscription + Usage */}
          <div className="xl:col-span-3 space-y-5">
            {/* Subscription Card */}
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <Badge variant="success">Active</Badge>
              </CardHeader>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--color-text-secondary)] mb-1">Plan</div>
                  <div className="text-[14px] font-semibold text-[var(--color-text-primary)]">Lab Pro</div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--color-text-secondary)] mb-1">Billing</div>
                  <div className="text-[14px] font-semibold text-[var(--color-text-primary)]">Annual</div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--color-text-secondary)] mb-1">Next Renewal</div>
                  <div className="text-[14px] font-semibold text-[var(--color-text-primary)]">Oct 15, 2026</div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--color-text-secondary)] mb-1">Crowns Included</div>
                  <div className="text-[14px] font-semibold text-[var(--color-text-primary)]">Unlimited</div>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-[var(--color-text-secondary)]">Billing period progress</span>
                  <span className="text-[11px] text-[var(--color-text-secondary)]">5 of 12 months</span>
                </div>
                <ProgressBar value={42} color="var(--brand-500, var(--p-cobalt-500))" height={6} />
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">Manage Plan</Button>
                <Button variant="ghost" size="sm">Payment Methods</Button>
              </div>
            </Card>

            {/* Usage Table */}
            <Card padding={false}>
              <div className="p-6 pb-0">
                <CardHeader>
                  <CardTitle>Usage History</CardTitle>
                  <span className="text-[11px] text-[var(--color-text-secondary)]">Last 6 months</span>
                </CardHeader>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr>
                      {['Month', 'Crowns', 'API Calls', 'GPU Hours', 'Cost', 'Status'].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold tracking-[0.04em] uppercase text-[var(--color-text-secondary)] bg-[var(--color-bg-sunken)] border-b border-[var(--color-border-subtle)]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {USAGE_TABLE.map((row) => (
                      <tr key={row.month} className="border-b border-[var(--color-border-subtle)] last:border-b-0 hover:bg-[var(--brand-25,var(--p-cobalt-25))] transition-colors">
                        <td className="px-4 py-3 font-semibold text-[var(--color-text-primary)]">{row.month}</td>
                        <td className="px-4 py-3 text-[var(--color-text-primary)]">{row.crowns}</td>
                        <td className="px-4 py-3 text-[var(--color-text-secondary)]">{row.apiCalls.toLocaleString()}</td>
                        <td className="px-4 py-3 text-[var(--color-text-secondary)]">{row.gpuHours}</td>
                        <td className="px-4 py-3 font-semibold text-[var(--color-text-primary)]">{row.cost}</td>
                        <td className="px-4 py-3">
                          <Badge variant={row.status === 'current' ? 'progress' : 'success'}>
                            {row.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Right: ROI Card */}
          <div className="xl:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>ROI Calculation</CardTitle>
              </CardHeader>

              <div className="text-center mb-5 pb-5 border-b border-[var(--color-border-subtle)]">
                <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--color-text-secondary)] mb-2">
                  Annual Net Savings
                </div>
                <div className="text-[40px] font-bold text-[var(--p-green-600)]" style={{ fontFamily: 'var(--font-display)' }}>
                  ${(netROI / 1000).toFixed(1)}K
                </div>
                <div className="text-[13px] font-semibold text-[var(--p-green-600)]">
                  {roiMultiple}x return on investment
                </div>
              </div>

              <div className="space-y-2">
                {ROI_ITEMS.map((item, i) => {
                  const isNegative = item.value.startsWith('-');
                  const isTotal = i === ROI_ITEMS.length - 1;
                  return (
                    <div
                      key={item.label}
                      className={`flex items-center justify-between py-2 ${
                        i < ROI_ITEMS.length - 1 ? 'border-b border-[var(--color-border-subtle)]' : 'pt-3 border-t-2 border-[var(--color-border-subtle)]'
                      }`}
                    >
                      <div>
                        <span className={`text-[12px] ${isTotal ? 'font-bold' : 'font-semibold'} text-[var(--color-text-primary)]`}>{item.label}</span>
                        <span className="text-[10px] text-[var(--color-text-secondary)] ml-1.5">{item.subtext}</span>
                      </div>
                      <span className={`text-[13px] font-bold ${isNegative ? 'text-[var(--p-red-600)]' : 'text-[var(--color-text-primary)]'}`}>
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 px-3 py-2.5 rounded-md bg-[var(--p-green-50,#f0fdf4)] border border-[var(--p-green-200,#bbf7d0)]">
                <p className="text-[12px] text-[var(--p-green-700,#15803d)]">
                  Your lab recoups the annual subscription cost in <strong>8 days</strong> of production at current volume.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
