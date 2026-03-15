'use client';

import { useState } from 'react';
import { PageTransition } from '@/components/animation/PageTransition';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';

interface TreeNode {
  id: string;
  name: string;
  role: 'institution' | 'department' | 'professor' | 'student';
  meta?: string;
  children?: TreeNode[];
}

const institutionTree: TreeNode[] = [
  {
    id: 'mcgill', name: 'McGill University', role: 'institution', meta: 'Montreal, QC',
    children: [
      {
        id: 'dept-prostho', name: 'Prosthodontics', role: 'department', meta: '2 professors, 76 students',
        children: [
          {
            id: 'prof-keren', name: 'Prof. Keren', role: 'professor', meta: 'Crown Design I · 76 students',
            children: [
              { id: 's-001', name: 'M. Tremblay', role: 'student', meta: 'DMD-3 · Prep Score: 3.4/4' },
              { id: 's-002', name: 'A. Roy', role: 'student', meta: 'DMD-3 · Prep Score: 1.8/4' },
              { id: 's-003', name: 'S. Patel', role: 'student', meta: 'DMD-3 · Prep Score: 3.1/4' },
              { id: 's-004', name: 'J. Chen', role: 'student', meta: 'DMD-3 · Prep Score: 2.9/4' },
              { id: 's-005', name: 'L. Bouchard', role: 'student', meta: 'DMD-2 · Prep Score: 2.4/4' },
              { id: 's-006', name: 'K. Nguyen', role: 'student', meta: 'DMD-2 · Prep Score: 3.6/4' },
            ],
          },
          {
            id: 'prof-lasry', name: 'Prof. Lasry', role: 'professor', meta: 'Prosthodontics II · 48 students',
            children: [
              { id: 's-007', name: 'D. Gagnon', role: 'student', meta: 'DMD-4 · Prep Score: 3.2/4' },
              { id: 's-008', name: 'E. Thompson', role: 'student', meta: 'DMD-4 · Prep Score: 2.7/4' },
              { id: 's-009', name: 'F. Kim', role: 'student', meta: 'DMD-4 · Prep Score: 3.0/4' },
              { id: 's-010', name: 'R. Singh', role: 'student', meta: 'DMD-3 · Prep Score: 2.5/4' },
            ],
          },
        ],
      },
    ],
  },
];

const roleIcons: Record<string, string> = {
  institution: '\u{1F3EB}',
  department: '\u{1F3E2}',
  professor: '\u{1F468}\u200D\u{1F3EB}',
  student: '\u{1F393}',
};

const roleBadge: Record<string, 'info' | 'ready' | 'reviewed' | 'progress'> = {
  institution: 'info',
  department: 'ready',
  professor: 'reviewed',
  student: 'progress',
};

function TreeNodeRow({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div
        className="flex items-center gap-3 py-2.5 px-3 rounded-[var(--radius-md)] hover:bg-[var(--brand-25)] cursor-pointer transition-colors"
        style={{ paddingLeft: `${depth * 24 + 12}px` }}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {hasChildren ? (
          <span className="text-[11px] text-[var(--color-text-secondary)] w-4 text-center select-none">
            {expanded ? '\u25BC' : '\u25B6'}
          </span>
        ) : (
          <span className="w-4" />
        )}
        <span className="text-[16px]">{roleIcons[node.role]}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-[var(--color-text-primary)]">{node.name}</span>
            <Badge variant={roleBadge[node.role]}>{node.role}</Badge>
          </div>
          {node.meta && (
            <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">{node.meta}</p>
          )}
        </div>
      </div>
      {expanded && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeNodeRow key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AcademicUsersPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg-page)] p-8">
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
            Institution Hierarchy
          </h1>
          <p className="text-[15px] text-[var(--color-text-secondary)] mt-1">
            University, department, professor, and student organization
          </p>
        </div>

        <StaggerChildren className="space-y-4">
          <StaggerItem>
            <div className="flex gap-3 mb-6">
              {(['institution', 'department', 'professor', 'student'] as const).map((role) => (
                <div key={role} className="flex items-center gap-1.5">
                  <span className="text-[14px]">{roleIcons[role]}</span>
                  <span className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                    {role}
                  </span>
                </div>
              ))}
            </div>
          </StaggerItem>

          <StaggerItem>
            <Card padding={false}>
              <div className="p-2">
                {institutionTree.map((node) => (
                  <TreeNodeRow key={node.id} node={node} />
                ))}
              </div>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <Card>
                <div className="text-center">
                  <div className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>124</div>
                  <div className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Total Students</div>
                </div>
              </Card>
              <Card>
                <div className="text-center">
                  <div className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>4</div>
                  <div className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Professors</div>
                </div>
              </Card>
              <Card>
                <div className="text-center">
                  <div className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>1</div>
                  <div className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Institution</div>
                </div>
              </Card>
            </div>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
