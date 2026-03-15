'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useSimulationStore } from '@/store/simulation-store';

const TOOL_WEAR = [
  { tool: 'Diamond bur 1.0mm', wear: 62, maxHours: 120, usedHours: 74 },
  { tool: 'Diamond bur 0.5mm', wear: 34, maxHours: 80, usedHours: 27 },
  { tool: 'Polishing disc', wear: 88, maxHours: 50, usedHours: 44 },
  { tool: 'Finishing bur', wear: 15, maxHours: 100, usedHours: 15 },
];

const ACTIVE_JOBS = [
  { id: 'MJ-031', orderId: 'LO-043', tooth: '#12', material: 'E-max', machine: 'Machine 2 — E-max', progress: 67, eta: '8 min', startedAt: '07:42' },
  { id: 'MJ-030', orderId: 'LO-044', tooth: '#30', material: 'Zirconia', machine: 'Machine 1 — Zirconia', progress: 89, eta: '3 min', startedAt: '07:18' },
];

const QUEUED_MILL_JOBS = [
  { id: 'MJ-032', orderId: 'LO-046', tooth: '#3', material: 'Zirconia', priority: 'standard' as const },
  { id: 'MJ-033', orderId: 'LO-048', tooth: '#14', material: 'Zirconia', priority: 'urgent' as const },
  { id: 'MJ-034', orderId: 'LO-047', tooth: '#19', material: 'E-max', priority: 'standard' as const },
];

export default function LabMillingQueue() {
  const machines = useSimulationStore((s) => s.machines);

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page heading */}
        <div>
          <h1 className="text-[22px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            Milling Queue
          </h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
            Machine status, active jobs, and tool monitoring
          </p>
        </div>

        {/* Machine Cards */}
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {machines.map((machine) => {
            const statusColor =
              machine.status === 'running'
                ? 'var(--p-green-500, #10b981)'
                : machine.status === 'idle'
                  ? 'var(--p-slate-400, #94a3b8)'
                  : 'var(--p-red-500, #ef4444)';

            const utilizationColor =
              machine.utilization >= 85
                ? 'var(--p-red-500, #ef4444)'
                : machine.utilization >= 60
                  ? 'var(--p-amber-500, #f59e0b)'
                  : 'var(--p-green-500, #10b981)';

            return (
              <StaggerItem key={machine.id}>
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full"
                        style={{ background: statusColor }}
                      />
                      <span className="text-[14px] font-semibold text-[var(--color-text-primary)]">
                        {machine.name}
                      </span>
                    </div>
                    <Badge variant={machine.status === 'running' ? 'progress' : machine.status === 'idle' ? 'ready' : 'error'}>
                      {machine.status}
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-[var(--color-text-secondary)]">Utilization</span>
                      <span className="text-[13px] font-bold text-[var(--color-text-primary)]">{machine.utilization}%</span>
                    </div>
                    <ProgressBar value={machine.utilization} color={utilizationColor} height={8} />
                  </div>

                  {machine.currentJob && (
                    <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-subtle)]">
                      <span className="text-[11px] text-[var(--color-text-secondary)]">Current job</span>
                      <span className="text-[12px] font-mono font-semibold text-[var(--brand-600,var(--p-cobalt-600))]">{machine.currentJob}</span>
                    </div>
                  )}

                  {!machine.currentJob && machine.status === 'idle' && (
                    <div className="pt-3 border-t border-[var(--color-border-subtle)]">
                      <Button variant="primary" size="sm" className="w-full">Assign Job</Button>
                    </div>
                  )}
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerChildren>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Active Jobs */}
          <div className="xl:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Jobs</CardTitle>
                <Badge variant="progress">{ACTIVE_JOBS.length} running</Badge>
              </CardHeader>
              <div className="space-y-4">
                {ACTIVE_JOBS.map((job) => (
                  <div key={job.id} className="p-4 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-sunken)]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-mono text-[12px] font-semibold text-[var(--color-text-primary)]">{job.id}</span>
                          <span className="text-[11px] text-[var(--color-text-secondary)]">from {job.orderId}</span>
                        </div>
                        <div className="text-[12px] text-[var(--color-text-secondary)]">
                          Tooth {job.tooth} &middot; {job.material} &middot; {job.machine}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[18px] font-bold text-[var(--brand-600,var(--p-cobalt-600))]" style={{ fontFamily: 'var(--font-display)' }}>
                          {job.progress}%
                        </div>
                        <div className="text-[11px] text-[var(--color-text-secondary)]">ETA {job.eta}</div>
                      </div>
                    </div>
                    <ProgressBar
                      value={job.progress}
                      color={job.progress >= 80 ? 'var(--p-green-500, #10b981)' : 'var(--brand-500, var(--p-cobalt-500))'}
                      height={6}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-[var(--color-text-secondary)]">Started at {job.startedAt}</span>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Queued Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Queued for Milling</CardTitle>
                <span className="text-[12px] text-[var(--color-text-secondary)]">{QUEUED_MILL_JOBS.length} waiting</span>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr>
                      {['Job', 'Order', 'Tooth', 'Material', 'Priority', 'Action'].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold tracking-[0.04em] uppercase text-[var(--color-text-secondary)] bg-[var(--color-bg-sunken)] border-b border-[var(--color-border-subtle)]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {QUEUED_MILL_JOBS.map((job) => (
                      <tr key={job.id} className="border-b border-[var(--color-border-subtle)] last:border-b-0 hover:bg-[var(--brand-25,var(--p-cobalt-25))] transition-colors">
                        <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-text-primary)]">{job.id}</td>
                        <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-text-primary)]">{job.orderId}</td>
                        <td className="px-4 py-3 text-[var(--color-text-primary)]">{job.tooth}</td>
                        <td className="px-4 py-3 text-[var(--color-text-primary)]">{job.material}</td>
                        <td className="px-4 py-3">
                          <Badge variant={job.priority === 'urgent' ? 'error' : 'pending'}>{job.priority}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="secondary" size="sm">Assign</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Right: Tool Wear */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tool Wear Indicators</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                {TOOL_WEAR.map((tool) => {
                  const wearColor =
                    tool.wear >= 80
                      ? 'var(--p-red-500, #ef4444)'
                      : tool.wear >= 60
                        ? 'var(--p-amber-500, #f59e0b)'
                        : 'var(--p-green-500, #10b981)';
                  return (
                    <div key={tool.tool}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[12px] font-semibold text-[var(--color-text-primary)]">{tool.tool}</span>
                        <span className={`text-[11px] font-semibold ${tool.wear >= 80 ? 'text-[var(--p-red-600)]' : 'text-[var(--color-text-secondary)]'}`}>
                          {tool.usedHours}h / {tool.maxHours}h
                        </span>
                      </div>
                      <ProgressBar value={tool.wear} color={wearColor} height={6} />
                      {tool.wear >= 80 && (
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--p-red-500,#ef4444)] animate-pulse" />
                          <span className="text-[10px] font-semibold text-[var(--p-red-600,#dc2626)]">Replace soon</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <div className="space-y-3">
                {[
                  { label: 'Jobs completed today', value: '4' },
                  { label: 'Avg milling time', value: '22 min' },
                  { label: 'Machine uptime', value: '94.2%' },
                  { label: 'Failed cuts (week)', value: '0' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between py-2 border-b border-[var(--color-border-subtle)] last:border-b-0">
                    <span className="text-[12px] text-[var(--color-text-secondary)]">{stat.label}</span>
                    <span className="text-[13px] font-semibold text-[var(--color-text-primary)]">{stat.value}</span>
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
