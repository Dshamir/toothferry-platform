'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const TEAM_MEMBERS = [
  { name: 'Dr. Sarah Chen', role: 'Lead Dentist', email: 's.chen@toothferryai.com', casesThisMonth: 12, status: 'active' as const },
  { name: 'Dr. Raj Patel', role: 'Associate Dentist', email: 'r.patel@toothferryai.com', casesThisMonth: 9, status: 'active' as const },
  { name: 'Dr. James Kim', role: 'Associate Dentist', email: 'j.kim@toothferryai.com', casesThisMonth: 7, status: 'active' as const },
  { name: 'Michelle Tran', role: 'Dental Hygienist', email: 'm.tran@toothferryai.com', casesThisMonth: 0, status: 'active' as const },
  { name: 'Alex Rodriguez', role: 'Practice Manager', email: 'a.rodriguez@toothferryai.com', casesThisMonth: 0, status: 'active' as const },
  { name: 'Dr. Emily Thompson', role: 'Part-Time Dentist', email: 'e.thompson@toothferryai.com', casesThisMonth: 3, status: 'active' as const },
];

const PRACTICE_INFO = {
  name: 'ToothFerry Dental Clinic',
  address: '4200 St-Laurent Blvd, Suite 300, Montreal, QC H2W 2R2',
  phone: '(514) 555-0142',
  email: 'clinic@toothferryai.com',
  plan: 'Professional',
  seatsUsed: 6,
  seatsTotal: 10,
  apiCalls: 847,
  apiLimit: 1000,
};

export default function TeamPage() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-[22px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            Team &amp; Practice
          </h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
            Manage team members and practice settings
          </p>
        </div>

        <StaggerChildren className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Team Members Table - spans 2 cols */}
          <StaggerItem className="lg:col-span-2">
            <Card padding={false}>
              <div className="p-6 pb-0">
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <span className="text-[12px] text-[var(--color-text-secondary)]">{TEAM_MEMBERS.length} members</span>
                </CardHeader>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr>
                      {['Member', 'Role', 'Cases This Month', 'Status'].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold tracking-[0.04em] uppercase text-[var(--color-text-secondary)] bg-[var(--color-bg-sunken)] border-b border-[var(--color-border-subtle)]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TEAM_MEMBERS.map((m) => (
                      <tr key={m.email} className="border-b border-[var(--color-border-subtle)] last:border-b-0 hover:bg-[var(--brand-25,var(--p-cobalt-25))] transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[var(--brand-100,var(--p-cobalt-100))] flex items-center justify-center text-[12px] font-bold text-[var(--brand-700,var(--p-cobalt-700))]">
                              {m.name.split(' ').filter((_, i, arr) => i === 0 || i === arr.length - 1).map((n) => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-semibold text-[var(--color-text-primary)]">{m.name}</div>
                              <div className="text-[11px] text-[var(--color-text-tertiary)]">{m.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[var(--color-text-secondary)]">{m.role}</td>
                        <td className="px-4 py-3 text-[var(--color-text-primary)] font-semibold">{m.casesThisMonth}</td>
                        <td className="px-4 py-3">
                          <Badge variant="success">Active</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </StaggerItem>

          {/* Practice Info Card */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle>Practice Info</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-text-secondary)]">Practice Name</div>
                  <div className="text-[14px] font-semibold text-[var(--color-text-primary)] mt-0.5">{PRACTICE_INFO.name}</div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-text-secondary)]">Address</div>
                  <div className="text-[13px] text-[var(--color-text-primary)] mt-0.5">{PRACTICE_INFO.address}</div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-text-secondary)]">Phone</div>
                  <div className="text-[13px] text-[var(--color-text-primary)] mt-0.5">{PRACTICE_INFO.phone}</div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-text-secondary)]">Email</div>
                  <div className="text-[13px] text-[var(--color-text-primary)] mt-0.5">{PRACTICE_INFO.email}</div>
                </div>

                <div className="border-t border-[var(--color-border-subtle)] pt-4 mt-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-text-secondary)] mb-2">Plan</div>
                  <Badge variant="info">{PRACTICE_INFO.plan}</Badge>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-text-secondary)]">Seats Used</span>
                    <span className="text-[13px] font-semibold text-[var(--color-text-primary)]">{PRACTICE_INFO.seatsUsed}/{PRACTICE_INFO.seatsTotal}</span>
                  </div>
                  <div className="w-full h-[6px] rounded-full overflow-hidden" style={{ background: 'var(--progress-track-bg, var(--p-cobalt-100))' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(PRACTICE_INFO.seatsUsed / PRACTICE_INFO.seatsTotal) * 100}%`,
                        background: 'var(--brand-500, var(--p-cobalt-500))',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-text-secondary)]">API Calls (MTD)</span>
                    <span className="text-[13px] font-semibold text-[var(--color-text-primary)]">{PRACTICE_INFO.apiCalls}/{PRACTICE_INFO.apiLimit}</span>
                  </div>
                  <div className="w-full h-[6px] rounded-full overflow-hidden" style={{ background: 'var(--progress-track-bg, var(--p-cobalt-100))' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(PRACTICE_INFO.apiCalls / PRACTICE_INFO.apiLimit) * 100}%`,
                        background: PRACTICE_INFO.apiCalls / PRACTICE_INFO.apiLimit > 0.9 ? 'var(--p-red-500)' : 'var(--brand-500, var(--p-cobalt-500))',
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
