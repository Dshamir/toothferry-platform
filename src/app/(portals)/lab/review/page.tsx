'use client';

import { useState } from 'react';
import { PageTransition } from '@/components/animation/PageTransition';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useSimulationStore } from '@/store/simulation-store';

const VIEW_TABS = ['Buccal', 'Occlusal', 'Proximal', 'Margin'] as const;

const MARGIN_ZONES = [
  { label: 'Buccal', gap: 142, status: 'pass' as const },
  { label: 'Lingual', gap: 218, status: 'fail' as const },
  { label: 'Mesial', gap: 156, status: 'pass' as const },
  { label: 'Distal', gap: 163, status: 'pass' as const },
];

export default function LabSTLReview() {
  const [activeView, setActiveView] = useState<typeof VIEW_TABS[number]>('Buccal');
  const labOrders = useSimulationStore((s) => s.labOrders);
  const reviewOrder = labOrders.find((o) => o.status === 'review-required') || labOrders[3];

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page heading */}
        <div>
          <h1 className="text-[22px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            STL Review
          </h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
            Quality control &mdash; {reviewOrder?.id || 'LO-045'} &middot; {reviewOrder?.dentistName || 'Dr. Roy'} &middot; Tooth {reviewOrder?.toothNumber || '#8'}
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Left: STL Preview */}
          <div className="xl:col-span-3 space-y-4">
            {/* 3D Preview Area */}
            <Card padding={false}>
              <div
                className="relative w-full rounded-t-[var(--radius-card)] overflow-hidden"
                style={{
                  background: 'var(--color-3d-bg, #1a1a2e)',
                  minHeight: '380px',
                }}
              >
                {/* Dark SVG tooth preview placeholder */}
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full"
                  style={{ minHeight: '380px' }}
                >
                  {/* Background grid */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="400" height="300" fill="url(#grid)" />

                  {/* Simplified tooth outline */}
                  <g transform="translate(200, 150)" opacity="0.9">
                    {/* Crown body */}
                    <path
                      d="M-40,-60 C-40,-80 -20,-90 0,-90 C20,-90 40,-80 40,-60 L45,-10 C45,20 30,50 20,60 L-20,60 C-30,50 -45,20 -45,-10 Z"
                      fill="none"
                      stroke="var(--p-teal-400, #2dd4bf)"
                      strokeWidth="1.5"
                      opacity="0.8"
                    />
                    {/* Crown surface mesh lines */}
                    <path d="M-30,-50 Q0,-65 30,-50" fill="none" stroke="var(--p-teal-500, #14b8a6)" strokeWidth="0.5" opacity="0.5" />
                    <path d="M-35,-30 Q0,-40 35,-30" fill="none" stroke="var(--p-teal-500, #14b8a6)" strokeWidth="0.5" opacity="0.5" />
                    <path d="M-40,-10 Q0,-18 40,-10" fill="none" stroke="var(--p-teal-500, #14b8a6)" strokeWidth="0.5" opacity="0.5" />
                    <path d="M-42,10 Q0,5 42,10" fill="none" stroke="var(--p-teal-500, #14b8a6)" strokeWidth="0.5" opacity="0.4" />
                    <path d="M-40,30 Q0,25 40,30" fill="none" stroke="var(--p-teal-500, #14b8a6)" strokeWidth="0.5" opacity="0.3" />

                    {/* Margin line */}
                    <path
                      d="M-20,60 C-10,62 10,62 20,60"
                      fill="none"
                      stroke="var(--p-amber-400, #fbbf24)"
                      strokeWidth="2"
                      strokeDasharray="4,3"
                    />

                    {/* Flagged zone highlight */}
                    <circle cx="-5" cy="55" r="12" fill="rgba(239,68,68,0.15)" stroke="var(--p-red-400, #f87171)" strokeWidth="1" strokeDasharray="3,2" />
                    <text x="-5" y="58" textAnchor="middle" fill="var(--p-red-400, #f87171)" fontSize="7" fontWeight="bold">218</text>
                  </g>

                  {/* Axis indicator */}
                  <g transform="translate(40, 260)">
                    <line x1="0" y1="0" x2="25" y2="0" stroke="var(--p-red-400, #f87171)" strokeWidth="1.5" />
                    <text x="28" y="4" fill="var(--p-red-400, #f87171)" fontSize="9" fontWeight="bold">X</text>
                    <line x1="0" y1="0" x2="0" y2="-25" stroke="var(--p-green-400, #4ade80)" strokeWidth="1.5" />
                    <text x="-3" y="-28" fill="var(--p-green-400, #4ade80)" fontSize="9" fontWeight="bold">Y</text>
                  </g>

                  {/* View label */}
                  <text x="360" y="25" textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize="11" fontWeight="600">{activeView} View</text>
                </svg>

                {/* Overlay badge */}
                <div className="absolute top-4 left-4">
                  <Badge variant="review">Review Required</Badge>
                </div>
              </div>

              {/* View tabs */}
              <div className="flex border-t border-[var(--color-border-subtle)]">
                {VIEW_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveView(tab)}
                    className={`flex-1 px-4 py-3 text-[12px] font-semibold text-center transition-colors border-b-2 ${
                      activeView === tab
                        ? 'border-[var(--brand-500,var(--p-cobalt-500))] text-[var(--brand-600,var(--p-cobalt-600))] bg-[var(--brand-25,var(--p-cobalt-25))]'
                        : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-sunken)]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </Card>

            {/* Margin Cross Section */}
            <Card>
              <CardHeader>
                <CardTitle>Margin Cross-Section</CardTitle>
              </CardHeader>
              <div className="relative h-[120px] bg-[var(--color-bg-sunken)] rounded-lg overflow-hidden">
                <svg viewBox="0 0 500 100" className="w-full h-full">
                  {/* Prep surface (tooth) */}
                  <path
                    d="M50,70 C100,68 150,60 200,55 C250,50 300,48 350,50 C400,53 450,58 480,65"
                    fill="none"
                    stroke="var(--p-slate-400, #94a3b8)"
                    strokeWidth="2.5"
                  />
                  <text x="485" y="68" fill="var(--p-slate-400, #94a3b8)" fontSize="8" fontWeight="600">Prep</text>

                  {/* Crown surface */}
                  <path
                    d="M50,60 C100,57 150,48 200,42 C250,37 300,36 350,38 C400,41 450,47 480,54"
                    fill="none"
                    stroke="var(--p-teal-500, #14b8a6)"
                    strokeWidth="2.5"
                  />
                  <text x="485" y="57" fill="var(--p-teal-500, #14b8a6)" fontSize="8" fontWeight="600">Crown</text>

                  {/* Gap measurement callouts */}
                  {/* Buccal - ok */}
                  <line x1="120" y1="54" x2="120" y2="66" stroke="var(--p-green-500, #10b981)" strokeWidth="1" strokeDasharray="2,2" />
                  <text x="120" y="80" textAnchor="middle" fill="var(--p-green-500, #10b981)" fontSize="8" fontWeight="bold">142</text>

                  {/* Lingual - flagged */}
                  <line x1="300" y1="37" x2="300" y2="49" stroke="var(--p-red-500, #ef4444)" strokeWidth="1.5" strokeDasharray="2,2" />
                  <rect x="282" y="16" width="36" height="16" rx="3" fill="var(--p-red-500, #ef4444)" />
                  <text x="300" y="28" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">218</text>

                  {/* Mesial */}
                  <line x1="190" y1="44" x2="190" y2="57" stroke="var(--p-green-500, #10b981)" strokeWidth="1" strokeDasharray="2,2" />
                  <text x="190" y="80" textAnchor="middle" fill="var(--p-green-500, #10b981)" fontSize="8" fontWeight="bold">156</text>

                  {/* Zone labels */}
                  <text x="80" y="95" fill="var(--p-slate-400, #94a3b8)" fontSize="7" textAnchor="middle">BUCCAL</text>
                  <text x="200" y="95" fill="var(--p-slate-400, #94a3b8)" fontSize="7" textAnchor="middle">MESIAL</text>
                  <text x="310" y="95" fill="var(--p-slate-400, #94a3b8)" fontSize="7" textAnchor="middle">LINGUAL</text>
                  <text x="420" y="95" fill="var(--p-slate-400, #94a3b8)" fontSize="7" textAnchor="middle">DISTAL</text>
                </svg>
              </div>
            </Card>
          </div>

          {/* Right: Measurements & Actions */}
          <div className="xl:col-span-2 space-y-4">
            {/* Margin Gap Measurements */}
            <Card>
              <CardHeader>
                <CardTitle>Margin Gap Analysis</CardTitle>
              </CardHeader>
              <div className="space-y-3">
                {MARGIN_ZONES.map((zone) => (
                  <div key={zone.label} className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-bg-sunken)]">
                    <div>
                      <div className="text-[12px] font-semibold text-[var(--color-text-primary)]">{zone.label}</div>
                      <div className="text-[20px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                        {zone.gap}<span className="text-[12px] font-normal text-[var(--color-text-secondary)]">&mu;m</span>
                      </div>
                    </div>
                    <Badge variant={zone.status === 'pass' ? 'success' : 'error'}>
                      {zone.status === 'pass' ? 'PASS' : 'FAIL'}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-3 px-3 py-2 rounded-md bg-[var(--p-red-50,#fef2f2)] border border-[var(--p-red-200,#fecaca)]">
                <p className="text-[12px] text-[var(--p-red-700,#b91c1c)]">
                  <strong>Lingual zone:</strong> 218&mu;m exceeds the 200&mu;m human-verifiable threshold. Manual review recommended.
                </p>
              </div>
            </Card>

            {/* Confidence */}
            <Card>
              <CardHeader>
                <CardTitle>AI Confidence</CardTitle>
              </CardHeader>
              <div className="text-center mb-3">
                <span className="text-[42px] font-bold text-[var(--p-amber-600,#d97706)]" style={{ fontFamily: 'var(--font-display)' }}>
                  72<span className="text-[20px]">%</span>
                </span>
              </div>
              <ProgressBar value={72} color="var(--p-amber-500, #f59e0b)" height={8} />
              <div className="flex items-start gap-2 mt-3 px-3 py-2 rounded-md bg-[var(--p-amber-50,#fffbeb)] border border-[var(--p-amber-200,#fde68a)]">
                <span className="text-[14px]">&#x26A0;&#xFE0F;</span>
                <p className="text-[12px] text-[var(--p-amber-700,#b45309)]">
                  Below 80% confidence threshold. The lingual margin gap is reducing model certainty. Consider margin adjustment before milling.
                </p>
              </div>
            </Card>

            {/* QC Summary */}
            <Card>
              <CardHeader>
                <CardTitle>QC Summary</CardTitle>
              </CardHeader>
              <div className="space-y-2">
                {[
                  { label: 'Occlusion clearance', value: '1.2 mm', pass: true },
                  { label: 'Mesial contact', value: 'Present', pass: true },
                  { label: 'Distal contact', value: 'Present', pass: true },
                  { label: 'Margin fit', value: '3/4 zones pass', pass: false },
                  { label: 'Material: E-max', value: 'Compatible', pass: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-[var(--color-border-subtle)] last:border-b-0">
                    <span className="text-[12px] text-[var(--color-text-secondary)]">{item.label}</span>
                    <span className={`text-[12px] font-semibold ${item.pass ? 'text-[var(--p-green-600)]' : 'text-[var(--p-amber-600,#d97706)]'}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Action Buttons */}
            <StaggerChildren className="space-y-2">
              <StaggerItem>
                <Button variant="primary" size="lg" className="w-full">
                  Approve &amp; Mill
                </Button>
              </StaggerItem>
              <StaggerItem>
                <Button variant="secondary" size="lg" className="w-full">
                  Adjust Margin
                </Button>
              </StaggerItem>
              <StaggerItem>
                <Button variant="danger" size="lg" className="w-full">
                  Regenerate
                </Button>
              </StaggerItem>
            </StaggerChildren>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
