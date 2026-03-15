'use client';

import { useState } from 'react';
import { PageTransition } from '@/components/animation/PageTransition';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';

const axes = [
  { name: 'Taper', score: 3.2, max: 4, description: 'Convergence angle 4-8 degrees', color: '#6750D6' },
  { name: 'Margin', score: 2.6, max: 4, description: 'Continuous chamfer / shoulder line', color: '#8B79E5' },
  { name: 'Occlusal Clearance', score: 3.5, max: 4, description: 'Min 1.5mm reduction', color: '#5240C0' },
  { name: 'Wall Height', score: 2.9, max: 4, description: 'Minimum 4mm axial wall', color: '#B5A9EF' },
  { name: 'Smoothness', score: 3.0, max: 4, description: 'No undercuts or sharp transitions', color: '#3F30A0' },
];

const overallScore = (axes.reduce((sum, a) => sum + a.score, 0) / axes.length).toFixed(1);

export default function PrepEvalPage() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg-page)] p-8">
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
            Prep Evaluation
          </h1>
          <p className="text-[15px] text-[var(--color-text-secondary)] mt-1">
            AI-powered 5-axis scoring of tooth preparation quality
          </p>
        </div>

        <StaggerChildren className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Circle */}
          <StaggerItem>
            <Card className="flex flex-col items-center justify-center py-10">
              <div className="relative w-40 h-40 mb-4">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="var(--p-violet-100)" strokeWidth="8" />
                  <circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke="var(--p-violet-500)" strokeWidth="8"
                    strokeDasharray={`${(parseFloat(overallScore) / 4) * 327} 327`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[38px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
                    {overallScore}
                  </span>
                  <span className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                    out of 4.0
                  </span>
                </div>
              </div>
              <Badge variant={parseFloat(overallScore) >= 3.0 ? 'success' : parseFloat(overallScore) >= 2.5 ? 'pending' : 'error'}>
                {parseFloat(overallScore) >= 3.0 ? 'Good Prep' : parseFloat(overallScore) >= 2.5 ? 'Needs Improvement' : 'Below Standard'}
              </Badge>
              <p className="text-[11px] text-[var(--color-text-tertiary)] mt-3 text-center">
                Composite score across all 5 evaluation axes
              </p>
            </Card>
          </StaggerItem>

          {/* 5-Axis Scoring Bars */}
          <StaggerItem className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>5-Axis Scoring</CardTitle>
                <Badge variant="info">Latest Evaluation</Badge>
              </CardHeader>
              <div className="space-y-5">
                {axes.map((axis) => (
                  <div key={axis.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-[13px] font-semibold text-[var(--color-text-primary)]">
                          {axis.name}
                        </span>
                        <p className="text-[11px] text-[var(--color-text-tertiary)]">{axis.description}</p>
                      </div>
                      <span className="text-[15px] font-bold text-[var(--color-text-primary)]">
                        {axis.score} <span className="text-[11px] font-normal text-[var(--color-text-tertiary)]">/ {axis.max}</span>
                      </span>
                    </div>
                    <ProgressBar value={(axis.score / axis.max) * 100} color={axis.color} height={8} />
                  </div>
                ))}
              </div>
            </Card>
          </StaggerItem>

          {/* Upload Area */}
          <StaggerItem className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Upload Scan for Evaluation</CardTitle>
              </CardHeader>
              <div
                className={`border-2 border-dashed rounded-[var(--radius-lg)] p-12 text-center transition-colors ${
                  isDragging
                    ? 'border-[var(--p-violet-400)] bg-[var(--p-violet-50)]'
                    : 'border-[var(--color-border-default)] hover:border-[var(--p-violet-300)]'
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
              >
                <div className="text-[38px] mb-3">&#128451;</div>
                <p className="text-[15px] font-semibold text-[var(--color-text-primary)] mb-1">
                  Drop STL / OBJ / PLY file here
                </p>
                <p className="text-[13px] text-[var(--color-text-secondary)] mb-4">
                  or click to browse. Max 50MB per scan.
                </p>
                <Button variant="primary" size="sm">Select File</Button>
              </div>
            </Card>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
