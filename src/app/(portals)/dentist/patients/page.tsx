'use client';

import { useState } from 'react';
import { PageTransition } from '@/components/animation/PageTransition';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { SEED_PATIENTS } from '@/data/patients';
import type { Patient } from '@/types/patient';

export default function PatientsPage() {
  const [search, setSearch] = useState('');

  const filtered = SEED_PATIENTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-[22px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            Patients
          </h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
            Patient records and case history
          </p>
        </div>

        <div className="max-w-sm">
          <Input
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Card padding={false}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  {['Name', 'Age', 'Last Visit', 'Total Cases', 'Active Cases'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold tracking-[0.04em] uppercase text-[var(--color-text-secondary)] bg-[var(--color-bg-sunken)] border-b border-[var(--color-border-subtle)]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-[var(--color-border-subtle)] last:border-b-0 hover:bg-[var(--brand-25,var(--p-cobalt-25))] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--brand-100,var(--p-cobalt-100))] flex items-center justify-center text-[12px] font-bold text-[var(--brand-700,var(--p-cobalt-700))]">
                          {p.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-[var(--color-text-primary)]">{p.name}</div>
                          <div className="text-[11px] text-[var(--color-text-tertiary)]">{p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[var(--color-text-primary)]">{p.age}</td>
                    <td className="px-4 py-3 text-[var(--color-text-secondary)] text-[12px]">{p.lastVisit.toLocaleDateString('en-CA')}</td>
                    <td className="px-4 py-3 text-[var(--color-text-primary)]">{p.totalCases}</td>
                    <td className="px-4 py-3">
                      {p.activeCases > 0 ? (
                        <Badge variant="progress">{p.activeCases} active</Badge>
                      ) : (
                        <span className="text-[var(--color-text-tertiary)]">None</span>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-[var(--color-text-tertiary)]">
                      No patients match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
