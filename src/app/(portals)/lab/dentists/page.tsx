'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { KpiCard } from '@/components/ui/KpiCard';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';

const PARTNER_DENTISTS = [
  { name: 'Dr. Sarah Chen', clinic: 'Midtown Dental', cases: 48, avgPrepScore: 3.4, lastActive: '2026-03-15', status: 'active' as const },
  { name: 'Dr. Arun Patel', clinic: 'Patel Family Dentistry', cases: 42, avgPrepScore: 3.1, lastActive: '2026-03-15', status: 'active' as const },
  { name: 'Dr. Min-Jun Kim', clinic: 'Pacific Smiles', cases: 39, avgPrepScore: 3.6, lastActive: '2026-03-14', status: 'active' as const },
  { name: 'Dr. Lisa Roy', clinic: 'Uptown Prosthodontics', cases: 36, avgPrepScore: 2.8, lastActive: '2026-03-14', status: 'active' as const },
  { name: 'Dr. Marc Tremblay', clinic: 'Centre Dentaire MTL', cases: 34, avgPrepScore: 3.5, lastActive: '2026-03-13', status: 'active' as const },
  { name: 'Dr. Mei Wang', clinic: 'Golden Gate Dental', cases: 31, avgPrepScore: 3.7, lastActive: '2026-03-15', status: 'active' as const },
  { name: 'Dr. Huy Nguyen', clinic: 'Smile Experts', cases: 28, avgPrepScore: 3.3, lastActive: '2026-03-12', status: 'active' as const },
  { name: 'Dr. Emily Foster', clinic: 'Lakeview Dental', cases: 25, avgPrepScore: 2.6, lastActive: '2026-03-11', status: 'active' as const },
  { name: 'Dr. James Okafor', clinic: 'Prestige Dental Group', cases: 22, avgPrepScore: 3.2, lastActive: '2026-03-10', status: 'active' as const },
  { name: 'Dr. Anna Volkov', clinic: 'Northern Dental Care', cases: 19, avgPrepScore: 3.0, lastActive: '2026-03-09', status: 'inactive' as const },
  { name: 'Dr. Carlos Rivera', clinic: 'Sunrise Dental', cases: 17, avgPrepScore: 3.4, lastActive: '2026-03-08', status: 'active' as const },
  { name: 'Dr. Fatima Al-Hassan', clinic: 'Premier Smiles', cases: 15, avgPrepScore: 2.9, lastActive: '2026-03-07', status: 'active' as const },
  { name: 'Dr. Thomas Bergman', clinic: 'Scandinavian Dental', cases: 14, avgPrepScore: 3.8, lastActive: '2026-03-13', status: 'active' as const },
  { name: 'Dr. Priya Sharma', clinic: 'Harmony Dental', cases: 12, avgPrepScore: 3.1, lastActive: '2026-03-06', status: 'inactive' as const },
  { name: 'Dr. David Park', clinic: 'Seoul Dental Lab', cases: 11, avgPrepScore: 3.5, lastActive: '2026-03-05', status: 'active' as const },
  { name: 'Dr. Rachel Green', clinic: 'Westside Dental', cases: 10, avgPrepScore: 2.7, lastActive: '2026-03-04', status: 'inactive' as const },
  { name: 'Dr. Omar Khalil', clinic: 'Crown Dental Clinic', cases: 9, avgPrepScore: 3.3, lastActive: '2026-03-03', status: 'active' as const },
  { name: 'Dr. Sophie Laurent', clinic: 'Maison Dentaire', cases: 8, avgPrepScore: 3.6, lastActive: '2026-03-02', status: 'active' as const },
  { name: 'Dr. Kenji Tanaka', clinic: 'Tokyo Dental Arts', cases: 7, avgPrepScore: 3.9, lastActive: '2026-03-01', status: 'active' as const },
  { name: 'Dr. Isabella Costa', clinic: 'Mediterranean Dental', cases: 6, avgPrepScore: 3.0, lastActive: '2026-02-28', status: 'inactive' as const },
  { name: 'Dr. Liam O\'Brien', clinic: 'Emerald Dental', cases: 5, avgPrepScore: 2.5, lastActive: '2026-02-27', status: 'inactive' as const },
  { name: 'Dr. Yuki Sato', clinic: 'Sakura Dental', cases: 4, avgPrepScore: 3.2, lastActive: '2026-02-25', status: 'inactive' as const },
  { name: 'Dr. Hans Mueller', clinic: 'Alpine Dental Zurich', cases: 3, avgPrepScore: 3.7, lastActive: '2026-02-20', status: 'inactive' as const },
];

export default function LabPartnerDentists() {
  const totalCases = PARTNER_DENTISTS.reduce((sum, d) => sum + d.cases, 0);
  const avgScore = (PARTNER_DENTISTS.reduce((sum, d) => sum + d.avgPrepScore, 0) / PARTNER_DENTISTS.length).toFixed(1);
  const activeDentists = PARTNER_DENTISTS.filter((d) => d.status === 'active').length;

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page heading */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-[22px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              Partner Dentists
            </h1>
            <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
              {PARTNER_DENTISTS.length} registered partners &middot; {activeDentists} active
            </p>
          </div>
          <Button variant="primary" size="md">+ Invite Dentist</Button>
        </div>

        {/* KPIs */}
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StaggerItem>
            <KpiCard label="Total Partners" value={PARTNER_DENTISTS.length} delta={`${activeDentists} active`} deltaDirection="neutral" />
          </StaggerItem>
          <StaggerItem>
            <KpiCard label="Total Cases" value={totalCases} delta="+12% this quarter" deltaDirection="up" />
          </StaggerItem>
          <StaggerItem>
            <KpiCard label="Avg Prep Score" value={avgScore} suffix="/4" delta="Good" deltaDirection="neutral" />
          </StaggerItem>
        </StaggerChildren>

        {/* Table */}
        <Card padding={false}>
          <div className="p-6 pb-0">
            <CardHeader>
              <CardTitle>All Partners</CardTitle>
              <span className="text-[11px] text-[var(--color-text-secondary)]">{PARTNER_DENTISTS.length} dentists</span>
            </CardHeader>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  {['Name', 'Clinic', 'Cases', 'Avg Prep Score', 'Last Active', 'Status', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold tracking-[0.04em] uppercase text-[var(--color-text-secondary)] bg-[var(--color-bg-sunken)] border-b border-[var(--color-border-subtle)]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PARTNER_DENTISTS.map((dentist) => {
                  const scoreColor =
                    dentist.avgPrepScore >= 3.5
                      ? 'text-[var(--p-green-600)]'
                      : dentist.avgPrepScore >= 2.8
                        ? 'text-[var(--color-text-primary)]'
                        : 'text-[var(--p-amber-600,#d97706)]';
                  return (
                    <tr key={dentist.name} className="border-b border-[var(--color-border-subtle)] last:border-b-0 hover:bg-[var(--brand-25,var(--p-cobalt-25))] transition-colors">
                      <td className="px-4 py-3 font-semibold text-[var(--color-text-primary)]">{dentist.name}</td>
                      <td className="px-4 py-3 text-[var(--color-text-secondary)]">{dentist.clinic}</td>
                      <td className="px-4 py-3 font-semibold text-[var(--color-text-primary)]">{dentist.cases}</td>
                      <td className={`px-4 py-3 font-semibold ${scoreColor}`}>{dentist.avgPrepScore.toFixed(1)}</td>
                      <td className="px-4 py-3 text-[12px] text-[var(--color-text-secondary)]">{dentist.lastActive}</td>
                      <td className="px-4 py-3">
                        <Badge variant={dentist.status === 'active' ? 'success' : 'pending'}>
                          {dentist.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
