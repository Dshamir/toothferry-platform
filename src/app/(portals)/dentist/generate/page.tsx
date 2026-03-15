'use client';

import { useState, useCallback } from 'react';
import { PageTransition } from '@/components/animation/PageTransition';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';

const STEPS = ['Upload', 'Configure', 'Processing', 'Review', 'Approve'];

const SCANNER_OPTIONS = [
  { value: '3shape', label: '3Shape TRIOS' },
  { value: 'itero', label: 'iTero Element 5D' },
  { value: 'medit', label: 'Medit i700' },
];

const MATERIAL_OPTIONS = [
  { value: 'zirconia', label: 'Zirconia' },
  { value: 'e-max', label: 'IPS e.max' },
  { value: 'pmma', label: 'PMMA (Temp)' },
  { value: 'composite', label: 'Composite' },
];

const MARGIN_OPTIONS = [
  { value: 'chamfer', label: 'Chamfer' },
  { value: 'shoulder', label: 'Shoulder' },
  { value: 'knife-edge', label: 'Knife-Edge' },
  { value: 'deep-chamfer', label: 'Deep Chamfer' },
];

const PROCESSING_STAGES = [
  { label: 'Mesh Ingestion', progress: 100 },
  { label: 'Tooth Segmentation', progress: 100 },
  { label: 'Margin Detection', progress: 100 },
  { label: 'Crown Generation', progress: 78 },
  { label: 'QC Validation', progress: 0 },
];

const VIEW_TABS = ['Buccal', 'Occlusal', 'Proximal', 'Margin'];

const QC_CHECKLIST = [
  { label: 'Margin gap < 120\u00B5m', passed: true },
  { label: 'Occlusal clearance 1.5-2.0mm', passed: true },
  { label: 'Mesial contact point present', passed: true },
  { label: 'Distal contact point present', passed: true },
  { label: 'No undercuts detected', passed: true },
  { label: 'Material thickness adequate', passed: false },
];

export default function GeneratePage() {
  const [step, setStep] = useState(0);
  const [scanner, setScanner] = useState('3shape');
  const [toothNumber, setToothNumber] = useState('#14');
  const [material, setMaterial] = useState('zirconia');
  const [marginType, setMarginType] = useState('chamfer');
  const [dragOver, setDragOver] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [activeView, setActiveView] = useState('Buccal');

  const canNext =
    (step === 0 && fileUploaded) ||
    (step === 1) ||
    (step === 2) ||
    (step === 3) ||
    (step === 4);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    setFileUploaded(true);
  }, []);

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page heading */}
        <div>
          <h1 className="text-[22px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            Generate Crown
          </h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
            AI-powered crown design workflow
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-0">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold border-2 transition-all ${
                    i < step
                      ? 'bg-[var(--brand-500,var(--p-cobalt-500))] border-[var(--brand-500,var(--p-cobalt-500))] text-white'
                      : i === step
                      ? 'bg-[var(--brand-50,var(--p-cobalt-50))] border-[var(--brand-500,var(--p-cobalt-500))] text-[var(--brand-700,var(--p-cobalt-700))]'
                      : 'bg-[var(--color-bg-sunken)] border-[var(--color-border-subtle)] text-[var(--color-text-tertiary)]'
                  }`}
                >
                  {i < step ? '\u2713' : i + 1}
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-wider mt-1.5 ${
                  i <= step ? 'text-[var(--brand-700,var(--p-cobalt-700))]' : 'text-[var(--color-text-tertiary)]'
                }`}>
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-[2px] flex-1 -mt-5 ${
                  i < step ? 'bg-[var(--brand-500,var(--p-cobalt-500))]' : 'bg-[var(--color-border-subtle)]'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {step === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Upload Intraoral Scan</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Drop zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => setFileUploaded(true)}
                className={`border-2 border-dashed rounded-[var(--radius-card)] p-10 flex flex-col items-center justify-center cursor-pointer transition-all min-h-[220px] ${
                  dragOver
                    ? 'border-[var(--brand-500,var(--p-cobalt-500))] bg-[var(--brand-25,var(--p-cobalt-25))]'
                    : fileUploaded
                    ? 'border-[var(--p-green-400)] bg-[var(--p-green-50)]'
                    : 'border-[var(--color-border-default)] hover:border-[var(--brand-400,var(--p-cobalt-400))] hover:bg-[var(--brand-25,var(--p-cobalt-25))]'
                }`}
              >
                {fileUploaded ? (
                  <>
                    <div className="text-[36px] mb-3">&#10003;</div>
                    <p className="text-[14px] font-semibold text-[var(--p-green-700)]">Scan uploaded successfully</p>
                    <p className="text-[12px] text-[var(--p-green-600)] mt-1">prep_scan_014.stl (12.4 MB)</p>
                  </>
                ) : (
                  <>
                    <div className="text-[36px] mb-3 text-[var(--color-text-tertiary)]">&#8682;</div>
                    <p className="text-[14px] font-semibold text-[var(--color-text-primary)]">Drag &amp; drop scan file</p>
                    <p className="text-[12px] text-[var(--color-text-secondary)] mt-1">STL, OBJ, PLY up to 50MB</p>
                  </>
                )}
              </div>

              {/* Scanner selector */}
              <div>
                <Select
                  label="Scanner"
                  options={SCANNER_OPTIONS}
                  value={scanner}
                  onChange={(e) => setScanner(e.target.value)}
                />
                <div className="mt-4 p-4 rounded-[var(--radius-lg)] bg-[var(--color-bg-sunken)] text-[12px] text-[var(--color-text-secondary)]">
                  <div className="font-semibold text-[var(--color-text-primary)] mb-2">Scanner Details</div>
                  <div className="space-y-1">
                    <div>Formats: STL, OBJ, PLY</div>
                    <div>Mesh resolution: 10k triangles</div>
                    <div>Adapter version: 2.4.1</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Configure Restoration</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Tooth Number"
                value={toothNumber}
                onChange={(e) => setToothNumber(e.target.value)}
                placeholder="#14"
              />
              <Select
                label="Material"
                options={MATERIAL_OPTIONS}
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              />
              <Select
                label="Margin Type"
                options={MARGIN_OPTIONS}
                value={marginType}
                onChange={(e) => setMarginType(e.target.value)}
              />
            </div>
            <div className="mt-6 p-4 rounded-[var(--radius-lg)] bg-[var(--color-bg-sunken)]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-text-secondary)] mb-3">Summary</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[13px]">
                <div>
                  <span className="text-[var(--color-text-secondary)]">Tooth:</span>{' '}
                  <span className="font-semibold text-[var(--color-text-primary)]">{toothNumber}</span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)]">Material:</span>{' '}
                  <span className="font-semibold text-[var(--color-text-primary)] capitalize">{material}</span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)]">Margin:</span>{' '}
                  <span className="font-semibold text-[var(--color-text-primary)] capitalize">{marginType}</span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)]">Scanner:</span>{' '}
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    {SCANNER_OPTIONS.find((s) => s.value === scanner)?.label}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>AI Processing Pipeline</CardTitle>
              <Badge variant="progress">Processing</Badge>
            </CardHeader>
            <div className="space-y-5">
              {PROCESSING_STAGES.map((stage, i) => (
                <div key={stage.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-medium text-[var(--color-text-primary)]">{stage.label}</span>
                    <span className={`text-[11px] font-semibold ${
                      stage.progress === 100
                        ? 'text-[var(--p-green-600)]'
                        : stage.progress > 0
                        ? 'text-[var(--brand-600,var(--p-cobalt-600))]'
                        : 'text-[var(--color-text-tertiary)]'
                    }`}>
                      {stage.progress === 100 ? 'Complete' : stage.progress > 0 ? `${stage.progress}%` : 'Waiting'}
                    </span>
                  </div>
                  <ProgressBar
                    value={stage.progress}
                    color={
                      stage.progress === 100
                        ? 'var(--p-green-500)'
                        : stage.progress > 0
                        ? 'var(--brand-500, var(--p-cobalt-500))'
                        : undefined
                    }
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-[var(--radius-lg)] bg-[var(--color-bg-sunken)] text-center">
              <div className="text-[13px] text-[var(--color-text-secondary)]">Estimated time remaining</div>
              <div className="text-[24px] font-bold text-[var(--color-text-primary)] mt-1" style={{ fontFamily: 'var(--font-display)' }}>0:23</div>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Review Crown Design</CardTitle>
              <Badge variant="success">96% confidence</Badge>
            </CardHeader>

            {/* View Tabs */}
            <div className="flex gap-1 border-b border-[var(--color-border-subtle)] mb-4">
              {VIEW_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveView(tab)}
                  className={`px-4 py-2 text-[13px] border-none bg-transparent cursor-pointer transition-all rounded-t-[var(--radius-md)] ${
                    activeView === tab
                      ? 'bg-[var(--brand-50,var(--p-cobalt-50))] text-[var(--brand-700,var(--p-cobalt-700))] font-semibold'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* 3D Preview Area */}
            <div className="bg-[#1a1a2e] rounded-[var(--radius-card)] h-[320px] flex items-center justify-center relative overflow-hidden">
              <svg viewBox="0 0 200 200" className="w-[180px] h-[180px] opacity-80">
                {activeView === 'Buccal' && (
                  <g>
                    <ellipse cx="100" cy="100" rx="60" ry="80" fill="none" stroke="#4f8ef7" strokeWidth="2" />
                    <ellipse cx="100" cy="80" rx="45" ry="55" fill="none" stroke="#4f8ef7" strokeWidth="1.5" opacity="0.6" />
                    <path d="M60 70 Q100 20 140 70" fill="none" stroke="#7ab5ff" strokeWidth="1.5" />
                    <path d="M55 110 Q100 160 145 110" fill="none" stroke="#4f8ef7" strokeWidth="1" opacity="0.4" />
                  </g>
                )}
                {activeView === 'Occlusal' && (
                  <g>
                    <ellipse cx="100" cy="100" rx="70" ry="65" fill="none" stroke="#4f8ef7" strokeWidth="2" />
                    <path d="M60 80 L90 100 L60 120" fill="none" stroke="#7ab5ff" strokeWidth="1.5" />
                    <path d="M140 80 L110 100 L140 120" fill="none" stroke="#7ab5ff" strokeWidth="1.5" />
                    <line x1="80" y1="100" x2="120" y2="100" stroke="#4f8ef7" strokeWidth="2" />
                    <circle cx="100" cy="100" r="5" fill="#4f8ef7" opacity="0.5" />
                  </g>
                )}
                {activeView === 'Proximal' && (
                  <g>
                    <path d="M70 160 L70 60 Q100 20 130 60 L130 160" fill="none" stroke="#4f8ef7" strokeWidth="2" />
                    <path d="M75 100 Q100 85 125 100" fill="none" stroke="#7ab5ff" strokeWidth="1.5" />
                    <line x1="70" y1="130" x2="130" y2="130" stroke="#4f8ef7" strokeWidth="1" strokeDasharray="4 3" />
                  </g>
                )}
                {activeView === 'Margin' && (
                  <g>
                    <ellipse cx="100" cy="100" rx="65" ry="60" fill="none" stroke="#4f8ef7" strokeWidth="2" />
                    <ellipse cx="100" cy="100" rx="65" ry="60" fill="none" stroke="#ff6b6b" strokeWidth="3" strokeDasharray="6 4" opacity="0.7" />
                    <ellipse cx="100" cy="100" rx="55" ry="50" fill="none" stroke="#7ab5ff" strokeWidth="1" opacity="0.4" />
                    <text x="100" y="175" textAnchor="middle" fill="#aaa" fontSize="10">87\u00B5m avg gap</text>
                  </g>
                )}
              </svg>
              <div className="absolute bottom-3 right-3 text-[11px] text-[#666] bg-[rgba(0,0,0,0.5)] px-2 py-1 rounded">
                {activeView} view
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {[
                { label: 'Margin Gap', value: '87\u00B5m' },
                { label: 'Occlusal Clearance', value: '1.5mm' },
                { label: 'Mesial Contact', value: 'Present' },
                { label: 'Distal Contact', value: 'Present' },
              ].map((m) => (
                <div key={m.label} className="text-center p-3 rounded-[var(--radius-lg)] bg-[var(--color-bg-sunken)]">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-text-secondary)]">{m.label}</div>
                  <div className="text-[16px] font-bold text-[var(--color-text-primary)] mt-1">{m.value}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Quality Control &amp; Approval</CardTitle>
            </CardHeader>

            {/* QC Checklist */}
            <div className="space-y-3 mb-6">
              {QC_CHECKLIST.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 p-3 rounded-[var(--radius-lg)] border ${
                    item.passed
                      ? 'border-[var(--p-green-200)] bg-[var(--p-green-50)]'
                      : 'border-[var(--p-red-200)] bg-[var(--p-red-50)]'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold ${
                    item.passed
                      ? 'bg-[var(--p-green-500)] text-white'
                      : 'bg-[var(--p-red-500)] text-white'
                  }`}>
                    {item.passed ? '\u2713' : '\u2717'}
                  </span>
                  <span className="text-[13px] text-[var(--color-text-primary)]">{item.label}</span>
                  <span className={`ml-auto text-[11px] font-semibold ${
                    item.passed ? 'text-[var(--p-green-600)]' : 'text-[var(--p-red-600)]'
                  }`}>
                    {item.passed ? 'PASS' : 'FLAG'}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-bg-sunken)] mb-6">
              <div className="text-[13px] text-[var(--color-text-secondary)]">Overall QC Result</div>
              <div className="text-[20px] font-bold text-[var(--color-text-primary)] mt-1">5 of 6 checks passed</div>
              <div className="text-[12px] text-[var(--p-red-600)] mt-1">1 flag requires attention</div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="danger" onClick={() => setStep(3)}>
                Reject &amp; Revise
              </Button>
              <Button variant="primary" onClick={() => alert('Crown approved and sent to lab!')}>
                Approve Crown
              </Button>
            </div>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            &larr; Previous
          </Button>
          <Button
            variant="primary"
            onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            disabled={step === STEPS.length - 1 || (step === 0 && !fileUploaded)}
          >
            Next Step &rarr;
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
