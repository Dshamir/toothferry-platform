'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { KpiCard } from '@/components/ui/KpiCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useSimulationStore } from '@/store/simulation-store';

const statusToBadge: Record<string, 'progress' | 'ready' | 'review' | 'pending' | 'error' | 'success' | 'info'> = {
  pending: 'pending',
  generating: 'progress',
  'review-required': 'review',
  'ready-to-mill': 'ready',
  milling: 'info',
  sintering: 'info',
  completed: 'success',
};

const statusToAction: Record<string, string> = {
  pending: 'Start CAD',
  generating: 'View Progress',
  'review-required': 'Review STL',
  'ready-to-mill': 'Send to Mill',
  milling: 'Track',
  sintering: 'Track',
  completed: 'View Report',
};

const THROUGHPUT_DATA = [
  { label: 'Mon', value: 12 },
  { label: 'Tue', value: 18 },
  { label: 'Wed', value: 15 },
  { label: 'Thu', value: 22 },
  { label: 'Fri', value: 19 },
  { label: 'Sat', value: 8 },
  { label: 'Sun', value: 4 },
];

export default function LabOrderQueue() {
  const labOrders = useSimulationStore((s) => s.labOrders);
  const machines = useSimulationStore((s) => s.machines);
  const materials = useSimulationStore((s) => s.materials);

  const maxThroughput = Math.max(...THROUGHPUT_DATA.map((d) => d.value));

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page heading */}
        <div>
          <h1 className="text-[22px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            Order Queue
          </h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
            Incoming crown orders and production overview
          </p>
        </div>

        {/* KPI Cards */}
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StaggerItem>
            <KpiCard label="Orders Today" value={7} delta="3 urgent" deltaDirection="neutral" />
          </StaggerItem>
          <StaggerItem>
            <KpiCard label="Crowns / Month" value={324} delta="+18% vs last month" deltaDirection="up" />
          </StaggerItem>
          <StaggerItem>
            <KpiCard label="CAD Time Saved" value="28" suffix=" min" delta="avg per crown" deltaDirection="neutral" />
          </StaggerItem>
          <StaggerItem>
            <KpiCard label="Monthly Savings" value="15.5" prefix="$" suffix="K" delta="vs manual workflow" deltaDirection="up" />
          </StaggerItem>
        </StaggerChildren>

        {/* ROI Info Alert */}
        <div className="flex items-start gap-3 px-4 py-3 rounded-[var(--radius-card)] bg-[var(--color-info-bg,#eff6ff)] border border-[var(--color-info-border,#bfdbfe)]">
          <span className="text-[16px] mt-0.5">&#x1f4a1;</span>
          <p className="text-[13px] text-[var(--color-info-text,#1e40af)] leading-relaxed">
            <strong>ROI insight:</strong> AI-generated crowns save an average of 28 min per unit in CAD time.
            At your current volume of 324 crowns/month, that is <strong>151 hours/month</strong> reinvested in quality control and throughput.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left: Order Cards */}
          <div className="xl:col-span-2 space-y-3">
            <StaggerChildren className="space-y-3">
              {labOrders.map((order) => {
                const borderColor =
                  order.priority === 'urgent'
                    ? 'var(--p-red-500, #ef4444)'
                    : order.status === 'generating'
                      ? 'var(--p-teal-500, #14b8a6)'
                      : 'transparent';

                return (
                  <StaggerItem key={order.id}>
                    <Card
                      className={`border-l-4 hover:shadow-md transition-shadow`}
                      style={{ borderLeftColor: borderColor }}
                    >
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        {/* Left info */}
                        <div className="flex items-center gap-4 min-w-0">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-[12px] font-semibold text-[var(--color-text-primary)]">
                                {order.id}
                              </span>
                              {order.priority === 'urgent' && (
                                <Badge variant="error">URGENT</Badge>
                              )}
                            </div>
                            <div className="text-[13px] text-[var(--color-text-secondary)]">
                              {order.dentistName} &middot; Tooth {order.toothNumber} &middot; {order.material}
                            </div>
                          </div>
                        </div>

                        {/* Right: status + action */}
                        <div className="flex items-center gap-3">
                          <Badge variant={statusToBadge[order.status] || 'pending'}>
                            {order.status.replace(/-/g, ' ')}
                          </Badge>
                          <Button
                            variant={order.status === 'review-required' ? 'primary' : 'secondary'}
                            size="sm"
                          >
                            {statusToAction[order.status] || 'View'}
                          </Button>
                        </div>
                      </div>

                      {/* Progress bar for generating status */}
                      {order.status === 'generating' && (
                        <div className="mt-3">
                          <ProgressBar value={order.confidence > 0 ? order.confidence : 64} color="var(--p-teal-500, #14b8a6)" height={4} />
                        </div>
                      )}

                      {/* Flag reason */}
                      {order.flagReason && (
                        <div className="mt-2 text-[12px] text-[var(--p-red-600,#dc2626)] bg-[var(--p-red-50,#fef2f2)] px-3 py-1.5 rounded-md">
                          {order.flagReason}
                        </div>
                      )}
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* Machine Utilization */}
            <Card>
              <CardHeader>
                <CardTitle>Machine Utilization</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                {machines.map((machine) => {
                  const color =
                    machine.utilization >= 85
                      ? 'var(--p-red-500, #ef4444)'
                      : machine.utilization >= 60
                        ? 'var(--p-amber-500, #f59e0b)'
                        : 'var(--p-green-500, #10b981)';
                  return (
                    <div key={machine.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[12px] font-semibold text-[var(--color-text-primary)]">{machine.name}</span>
                        <Badge variant={machine.status === 'running' ? 'progress' : machine.status === 'idle' ? 'ready' : 'error'}>
                          {machine.status}
                        </Badge>
                      </div>
                      <ProgressBar value={machine.utilization} color={color} height={6} />
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Material Inventory */}
            <Card>
              <CardHeader>
                <CardTitle>Material Inventory</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                {materials.map((mat) => {
                  const isCritical = mat.quantity <= mat.criticalThreshold;
                  const color = isCritical
                    ? 'var(--p-red-500, #ef4444)'
                    : 'var(--p-green-500, #10b981)';
                  return (
                    <div key={mat.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[12px] font-semibold text-[var(--color-text-primary)]">{mat.name}</span>
                        <span className="text-[11px] text-[var(--color-text-secondary)]">
                          {mat.quantity}/{mat.maxQuantity} {mat.unit}
                        </span>
                      </div>
                      <ProgressBar
                        value={mat.quantity}
                        color={color}
                        height={6}
                        animated={false}
                      />
                      {isCritical && (
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="inline-block w-2 h-2 rounded-full bg-[var(--p-red-500,#ef4444)] animate-pulse" />
                          <span className="text-[11px] font-semibold text-[var(--p-red-600,#dc2626)]">
                            CRITICAL &mdash; {mat.quantity} {mat.unit} remaining. Reorder now.
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Daily Throughput */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Throughput</CardTitle>
              </CardHeader>
              <div className="flex items-end justify-between gap-1.5 h-[120px]">
                {THROUGHPUT_DATA.map((day) => (
                  <div key={day.label} className="flex flex-col items-center flex-1 h-full justify-end">
                    <span className="text-[10px] font-semibold text-[var(--color-text-primary)] mb-1">{day.value}</span>
                    <div
                      className="w-full rounded-t-md transition-all duration-300"
                      style={{
                        height: `${(day.value / maxThroughput) * 80}%`,
                        minHeight: '4px',
                        background: day.value >= 20 ? 'var(--p-green-500, #10b981)' : 'var(--brand-500, var(--p-cobalt-500))',
                      }}
                    />
                    <span className="text-[10px] text-[var(--color-text-secondary)] mt-1">{day.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
