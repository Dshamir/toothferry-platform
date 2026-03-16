'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { KpiCard } from '@/components/ui/KpiCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StatusLed } from '@/components/shared/StatusLed';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { EditablePortalPage } from '@/components/shared/EditablePortalPage';

const healthCards = [
  { label: 'API Health', value: '100%', delta: 'All endpoints operational', deltaDirection: 'up' as const },
  { label: 'AI Inference', value: '100%', delta: 'MeshSegNet v2.3.1 online', deltaDirection: 'up' as const },
  { label: 'Avg Latency', value: '94ms', delta: '-12ms from yesterday', deltaDirection: 'up' as const },
  { label: 'Uptime (30d)', value: '99.97%', delta: '8.6 min downtime', deltaDirection: 'neutral' as const },
];

const services = [
  { name: 'API Gateway', status: 'ok' as const, latency: '12ms', uptime: '100%', version: 'v3.2.1' },
  { name: 'MeshSegNet Inference', status: 'ok' as const, latency: '340ms', uptime: '99.99%', version: 'v2.3.1' },
  { name: 'Margin Detection', status: 'ok' as const, latency: '220ms', uptime: '99.97%', version: 'v1.8.0' },
  { name: 'Crown Generation', status: 'ok' as const, latency: '1.2s', uptime: '99.95%', version: 'v2.1.0' },
  { name: 'STL Export', status: 'ok' as const, latency: '85ms', uptime: '100%', version: 'v1.4.2' },
  { name: 'Auth Service', status: 'ok' as const, latency: '28ms', uptime: '100%', version: 'v2.0.3' },
  { name: 'Notification Hub', status: 'ok' as const, latency: '45ms', uptime: '99.98%', version: 'v1.2.1' },
];

const gpus = [
  { name: 'A100-0', utilization: 62, memory: '48/80 GB', temp: '67C' },
  { name: 'A100-1', utilization: 58, memory: '44/80 GB', temp: '64C' },
  { name: 'A100-2', utilization: 51, memory: '38/80 GB', temp: '61C' },
  { name: 'A100-3', utilization: 45, memory: '32/80 GB', temp: '58C' },
];

const storage = [
  { name: 'Scan Storage', used: 1.8, total: 5, unit: 'TB' },
  { name: 'Model Artifacts', used: 340, total: 500, unit: 'GB' },
  { name: 'Audit Logs', used: 12, total: 50, unit: 'GB' },
];

export default function AdminOverview() {
  return (
    <EditablePortalPage slug="admin">
    <PageTransition>
      <div data-portal="admin" className="min-h-screen bg-[var(--color-bg-page)] p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
            System Health
          </h1>
          <p className="text-[15px] text-[var(--color-text-secondary)] mt-1">
            Infrastructure monitoring, service status, and resource utilization
          </p>
        </div>

        {/* Health KPI Cards */}
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {healthCards.map((kpi) => (
            <StaggerItem key={kpi.label}>
              <KpiCard {...kpi} />
            </StaggerItem>
          ))}
        </StaggerChildren>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Service Status Table */}
          <Card padding={false} className="lg:col-span-2">
            <div className="p-5 pb-0">
              <CardHeader>
                <CardTitle>Service Status</CardTitle>
                <span className="text-[11px] font-semibold text-[var(--p-green-600)] bg-[var(--p-green-50)] px-3 py-1 rounded-full">
                  All Operational
                </span>
              </CardHeader>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[var(--color-bg-sunken)]">
                    <th className="text-left px-5 py-2.5 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Service</th>
                    <th className="text-center px-5 py-2.5 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Status</th>
                    <th className="text-center px-5 py-2.5 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Latency</th>
                    <th className="text-center px-5 py-2.5 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Uptime</th>
                    <th className="text-right px-5 py-2.5 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Version</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((svc) => (
                    <tr key={svc.name} className="border-t border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-sunken)] transition-colors">
                      <td className="px-5 py-3 text-[13px] font-semibold text-[var(--color-text-primary)]">{svc.name}</td>
                      <td className="px-5 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <StatusLed status={svc.status} pulse />
                          <span className="text-[11px] font-semibold text-[var(--p-green-600)]">OK</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-[13px] text-center text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-mono)' }}>{svc.latency}</td>
                      <td className="px-5 py-3 text-[13px] text-center text-[var(--color-text-primary)]">{svc.uptime}</td>
                      <td className="px-5 py-3 text-[11px] text-right text-[var(--color-text-tertiary)]" style={{ fontFamily: 'var(--font-mono)' }}>{svc.version}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* GPU Utilization */}
          <div className="space-y-5">
            <Card>
              <CardHeader>
                <CardTitle>GPU Utilization</CardTitle>
                <span className="text-[13px] font-semibold text-[var(--color-text-primary)]">4x A100 &middot; 54% avg</span>
              </CardHeader>
              <div className="space-y-4">
                {gpus.map((gpu) => (
                  <div key={gpu.name}>
                    <div className="flex justify-between text-[13px] mb-1.5">
                      <span className="font-semibold text-[var(--color-text-primary)]">{gpu.name}</span>
                      <span className="text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-mono)' }}>
                        {gpu.utilization}% &middot; {gpu.temp}
                      </span>
                    </div>
                    <ProgressBar
                      value={gpu.utilization}
                      color={gpu.utilization > 80 ? 'var(--p-red-400)' : gpu.utilization > 60 ? 'var(--p-amber-400)' : '#58A6FF'}
                      height={6}
                    />
                    <p className="text-[11px] text-[var(--color-text-tertiary)] mt-1">{gpu.memory}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Storage */}
            <Card>
              <CardHeader>
                <CardTitle>Storage Usage</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                {storage.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-[13px] mb-1.5">
                      <span className="text-[var(--color-text-primary)]">{s.name}</span>
                      <span className="text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-mono)' }}>
                        {s.used} / {s.total} {s.unit}
                      </span>
                    </div>
                    <ProgressBar value={(s.used / s.total) * 100} color="#58A6FF" height={5} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
    </EditablePortalPage>
  );
}
