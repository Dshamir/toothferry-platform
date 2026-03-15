'use client';

import { useState } from 'react';
import { PageTransition } from '@/components/animation/PageTransition';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';

interface StudentGrade {
  id: string;
  name: string;
  program: string;
  course: string;
  prepScore: number;
  marginScore: number;
  anatomyScore: number;
  overall: number;
  status: 'passing' | 'at-risk' | 'failing';
  lastActivity: string;
}

const students: StudentGrade[] = [
  { id: 'S-001', name: 'M. Tremblay', program: 'DMD-3', course: 'Crown Design I', prepScore: 3.4, marginScore: 3.2, anatomyScore: 3.6, overall: 3.4, status: 'passing', lastActivity: '2 hrs ago' },
  { id: 'S-002', name: 'A. Roy', program: 'DMD-3', course: 'Crown Design I', prepScore: 1.8, marginScore: 2.0, anatomyScore: 2.2, overall: 2.0, status: 'failing', lastActivity: '1 day ago' },
  { id: 'S-003', name: 'S. Patel', program: 'DMD-3', course: 'Crown Design I', prepScore: 3.1, marginScore: 2.8, anatomyScore: 3.0, overall: 3.0, status: 'passing', lastActivity: '4 hrs ago' },
  { id: 'S-004', name: 'J. Chen', program: 'DMD-3', course: 'Crown Design I', prepScore: 2.9, marginScore: 2.6, anatomyScore: 2.8, overall: 2.8, status: 'at-risk', lastActivity: '6 hrs ago' },
  { id: 'S-005', name: 'L. Bouchard', program: 'DMD-2', course: 'Crown Design I', prepScore: 2.4, marginScore: 2.2, anatomyScore: 2.6, overall: 2.4, status: 'at-risk', lastActivity: '1 day ago' },
  { id: 'S-006', name: 'K. Nguyen', program: 'DMD-2', course: 'Crown Design I', prepScore: 3.6, marginScore: 3.4, anatomyScore: 3.8, overall: 3.6, status: 'passing', lastActivity: '30 min ago' },
  { id: 'S-007', name: 'D. Gagnon', program: 'DMD-4', course: 'Prosthodontics II', prepScore: 3.2, marginScore: 3.0, anatomyScore: 3.4, overall: 3.2, status: 'passing', lastActivity: '3 hrs ago' },
  { id: 'S-008', name: 'E. Thompson', program: 'DMD-4', course: 'Prosthodontics II', prepScore: 2.7, marginScore: 2.4, anatomyScore: 2.8, overall: 2.6, status: 'at-risk', lastActivity: '5 hrs ago' },
  { id: 'S-009', name: 'F. Kim', program: 'DMD-4', course: 'Prosthodontics II', prepScore: 3.0, marginScore: 3.2, anatomyScore: 2.8, overall: 3.0, status: 'passing', lastActivity: '1 hr ago' },
  { id: 'S-010', name: 'R. Singh', program: 'DMD-3', course: 'Prosthodontics II', prepScore: 2.5, marginScore: 2.2, anatomyScore: 2.4, overall: 2.4, status: 'at-risk', lastActivity: '8 hrs ago' },
];

const statusBadge: Record<string, { variant: 'reviewed' | 'pending' | 'error'; label: string }> = {
  passing: { variant: 'reviewed', label: 'Passing' },
  'at-risk': { variant: 'pending', label: 'At Risk' },
  failing: { variant: 'error', label: 'Failing' },
};

export default function GradesPage() {
  const [filter, setFilter] = useState<'all' | 'passing' | 'at-risk' | 'failing'>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');

  const filtered = students.filter((s) => {
    if (filter !== 'all' && s.status !== filter) return false;
    if (courseFilter !== 'all' && s.course !== courseFilter) return false;
    return true;
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg-page)] p-8">
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
            Student Grades
          </h1>
          <p className="text-[15px] text-[var(--color-text-secondary)] mt-1">
            Comprehensive grade overview with filtering by status and course
          </p>
        </div>

        <StaggerChildren className="space-y-5">
          {/* Filters */}
          <StaggerItem>
            <div className="flex flex-wrap gap-3 mb-2">
              <div className="flex gap-2">
                {(['all', 'passing', 'at-risk', 'failing'] as const).map((f) => (
                  <Button
                    key={f}
                    variant={filter === f ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setFilter(f)}
                  >
                    {f === 'all' ? 'All' : f === 'at-risk' ? 'At Risk' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </Button>
                ))}
              </div>
              <div className="h-8 w-px bg-[var(--color-border-subtle)]" />
              <div className="flex gap-2">
                {['all', 'Crown Design I', 'Prosthodontics II'].map((c) => (
                  <Button
                    key={c}
                    variant={courseFilter === c ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setCourseFilter(c)}
                  >
                    {c === 'all' ? 'All Courses' : c}
                  </Button>
                ))}
              </div>
            </div>
          </StaggerItem>

          {/* Grades Table */}
          <StaggerItem>
            <Card padding={false}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[var(--table-th-bg)]">
                      <th className="text-left px-4 py-3 text-[var(--table-th-text)] text-[11px] font-semibold uppercase tracking-wider">Student</th>
                      <th className="text-left px-4 py-3 text-[var(--table-th-text)] text-[11px] font-semibold uppercase tracking-wider">Program</th>
                      <th className="text-left px-4 py-3 text-[var(--table-th-text)] text-[11px] font-semibold uppercase tracking-wider">Course</th>
                      <th className="text-center px-4 py-3 text-[var(--table-th-text)] text-[11px] font-semibold uppercase tracking-wider">Prep</th>
                      <th className="text-center px-4 py-3 text-[var(--table-th-text)] text-[11px] font-semibold uppercase tracking-wider">Margin</th>
                      <th className="text-center px-4 py-3 text-[var(--table-th-text)] text-[11px] font-semibold uppercase tracking-wider">Anatomy</th>
                      <th className="text-center px-4 py-3 text-[var(--table-th-text)] text-[11px] font-semibold uppercase tracking-wider">Overall</th>
                      <th className="text-center px-4 py-3 text-[var(--table-th-text)] text-[11px] font-semibold uppercase tracking-wider">Status</th>
                      <th className="text-right px-4 py-3 text-[var(--table-th-text)] text-[11px] font-semibold uppercase tracking-wider">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((s) => (
                      <tr key={s.id} className="border-t border-[var(--color-border-subtle)] hover:bg-[var(--table-row-hover)] transition-colors">
                        <td className="px-4 py-3 text-[13px] font-semibold text-[var(--color-text-primary)]">{s.name}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--color-text-secondary)]">{s.program}</td>
                        <td className="px-4 py-3 text-[13px] text-[var(--color-text-secondary)]">{s.course}</td>
                        <td className="px-4 py-3 text-[13px] text-center font-medium text-[var(--color-text-primary)]">{s.prepScore}</td>
                        <td className="px-4 py-3 text-[13px] text-center font-medium text-[var(--color-text-primary)]">{s.marginScore}</td>
                        <td className="px-4 py-3 text-[13px] text-center font-medium text-[var(--color-text-primary)]">{s.anatomyScore}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`text-[15px] font-bold ${s.overall >= 3.0 ? 'text-[var(--p-green-600)]' : s.overall >= 2.5 ? 'text-[var(--p-amber-600)]' : 'text-[var(--p-red-600)]'}`}>
                            {s.overall}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Badge variant={statusBadge[s.status].variant}>{statusBadge[s.status].label}</Badge>
                        </td>
                        <td className="px-4 py-3 text-[11px] text-[var(--color-text-tertiary)] text-right">{s.lastActivity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 border-t border-[var(--color-border-subtle)] text-[11px] text-[var(--color-text-tertiary)]">
                Showing {filtered.length} of {students.length} students
              </div>
            </Card>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
