'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';

const complianceFrameworks = [
  {
    id: 'fda',
    title: 'FDA QSR 820',
    subtitle: 'Quality System Regulation',
    status: 'compliant' as const,
    icon: '\u{1F3E5}',
    description: 'Design controls, document controls, CAPA, production controls, and management responsibility per 21 CFR Part 820.',
    items: [
      { name: 'Design Controls (820.30)', status: 'pass', detail: 'Design history file complete for MeshSegNet v2.3.1' },
      { name: 'Document Controls (820.40)', status: 'pass', detail: 'All SOPs versioned and approved in DMS' },
      { name: 'CAPA (820.90)', status: 'pass', detail: '0 open CAPAs, 3 closed in last 90 days' },
      { name: 'Production Controls (820.70)', status: 'pass', detail: 'Automated validation on every build' },
      { name: 'Management Review (820.20)', status: 'pass', detail: 'Q4 2025 review completed 2026-01-15' },
    ],
  },
  {
    id: 'hipaa',
    title: 'HIPAA',
    subtitle: 'Health Insurance Portability & Accountability',
    status: 'compliant' as const,
    icon: '\u{1F512}',
    description: 'Privacy Rule, Security Rule, and Breach Notification Rule compliance for all protected health information (PHI).',
    items: [
      { name: 'Privacy Rule', status: 'pass', detail: 'PHI access restricted to authorized roles only' },
      { name: 'Security Rule — Administrative', status: 'pass', detail: 'Risk assessment completed 2026-02-01' },
      { name: 'Security Rule — Technical', status: 'pass', detail: 'AES-256 encryption at rest, TLS 1.3 in transit' },
      { name: 'Security Rule — Physical', status: 'pass', detail: 'AWS GovCloud with SOC 2 Type II' },
      { name: 'Breach Notification', status: 'pass', detail: '0 breaches, notification plan tested quarterly' },
      { name: 'Audit Logging', status: 'pass', detail: 'All PHI access logged, 7-year retention' },
    ],
  },
  {
    id: 'device',
    title: 'Device Classification',
    subtitle: 'FDA Medical Device Regulation',
    status: 'in-progress' as const,
    icon: '\u{2699}\u{FE0F}',
    description: 'ToothFerry AI crown generation classified as Class II medical device software. 510(k) submission in preparation.',
    items: [
      { name: 'Product Code', status: 'info', detail: 'EBG — Dental CAD/CAM Software' },
      { name: 'Classification', status: 'info', detail: 'Class II — 510(k) pathway' },
      { name: 'Predicate Device', status: 'pass', detail: 'Identified: 3Shape TRIOS Design Studio' },
      { name: '510(k) Submission', status: 'pending', detail: 'Draft in review, target Q3 2026 filing' },
      { name: 'Clinical Evidence', status: 'pass', detail: '2 published validation studies, N=124 students' },
      { name: 'Software Validation (IEC 62304)', status: 'pass', detail: 'Class B software, full lifecycle documentation' },
    ],
  },
];

const statusIcon: Record<string, string> = {
  pass: '\u2705',
  pending: '\u{1F7E1}',
  info: '\u{2139}\u{FE0F}',
};

export default function CompliancePage() {
  return (
    <PageTransition>
      <div data-portal="admin" className="min-h-screen bg-[var(--color-bg-page)] p-8">
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
            Compliance
          </h1>
          <p className="text-[15px] text-[var(--color-text-secondary)] mt-1">
            Regulatory compliance status for FDA, HIPAA, and device classification
          </p>
        </div>

        <StaggerChildren className="space-y-6">
          {complianceFrameworks.map((framework) => (
            <StaggerItem key={framework.id}>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-[24px]">{framework.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>{framework.title}</CardTitle>
                        <Badge variant={framework.status === 'compliant' ? 'reviewed' : 'pending'}>
                          {framework.status === 'compliant' ? 'Compliant' : 'In Progress'}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-[var(--color-text-tertiary)]">{framework.subtitle}</p>
                    </div>
                  </div>
                </CardHeader>

                <p className="text-[13px] text-[var(--color-text-secondary)] mb-5 leading-relaxed">
                  {framework.description}
                </p>

                <div className="space-y-3">
                  {framework.items.map((item) => (
                    <div key={item.name} className="flex items-start gap-3 py-2 border-b border-[var(--color-border-subtle)] last:border-0">
                      <span className="text-[14px] mt-0.5">{statusIcon[item.status]}</span>
                      <div className="flex-1">
                        <span className="text-[13px] font-semibold text-[var(--color-text-primary)]">{item.name}</span>
                        <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
