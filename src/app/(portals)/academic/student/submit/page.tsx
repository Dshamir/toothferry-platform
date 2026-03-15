'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/animation/PageTransition';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAcademicStore } from '@/store/academic-store';
import { useNotificationStore } from '@/store/notification-store';

const TOOTH_OPTIONS = [
  '#11', '#12', '#13', '#14', '#15', '#16',
  '#21', '#22', '#23', '#24', '#25', '#26',
  '#31', '#32', '#33', '#34', '#35', '#36',
  '#41', '#42', '#43', '#44', '#45', '#46',
];

export default function StudentSubmitPage() {
  const router = useRouter();
  const { submitScan } = useAcademicStore();
  const { add: addNotification } = useNotificationStore();
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [toothNumber, setToothNumber] = useState('#14');
  const [courseId, setCourseId] = useState('CRS-001');

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  }

  function handleFileSelect() {
    setFileName(`scan_${toothNumber.replace('#', '')}_${Date.now()}.stl`);
  }

  function handleSubmit() {
    if (!fileName) return;
    submitScan({
      studentId: 'STU-001',
      studentName: 'Alice Martin',
      toothNumber,
      courseId,
      courseName: courseId === 'CRS-001' ? 'Crown Design I' : 'Prosthodontics II',
      fileName,
    });
    addNotification({
      type: 'success',
      title: 'Scan submitted',
      message: `Your scan for Tooth ${toothNumber} has been submitted for evaluation`,
      portal: 'academic',
    });
    router.push('/academic/student');
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg-page)] p-8">
        <h1
          className="text-[30px] font-bold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Submit Scan
        </h1>
        <p className="text-[13px] mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          Upload your prep scan for evaluation
        </p>

        <StaggerChildren className="space-y-6 max-w-[700px]">
          {/* Step 1: Upload */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle>Step 1 — Upload Scan</CardTitle>
              </CardHeader>
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                  isDragging ? 'border-[var(--p-violet-400)] bg-[var(--p-violet-50)]' : 'border-[var(--color-border-default)]'
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                {fileName ? (
                  <div>
                    <div className="text-[28px] mb-2">✅</div>
                    <div className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {fileName}
                    </div>
                    <button
                      onClick={() => setFileName('')}
                      className="text-[11px] mt-2 cursor-pointer border-none bg-transparent"
                      style={{ color: 'var(--color-action-bg)' }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="text-[28px] mb-2">📤</div>
                    <p className="text-[13px] mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                      Drop STL / OBJ / PLY file here
                    </p>
                    <Button variant="primary" size="sm" onClick={handleFileSelect}>
                      Select File
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </StaggerItem>

          {/* Step 2: Select tooth & course */}
          <StaggerItem>
            <Card>
              <CardHeader>
                <CardTitle>Step 2 — Select Details</CardTitle>
              </CardHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase block mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    Tooth Number
                  </label>
                  <select
                    value={toothNumber}
                    onChange={(e) => setToothNumber(e.target.value)}
                    className="w-full px-4 py-[10px] rounded-lg text-[13px]"
                    style={{
                      background: 'var(--color-bg-sunken)',
                      border: '1px solid var(--color-border-subtle)',
                      color: 'var(--color-text-primary)',
                      outline: 'none',
                    }}
                  >
                    {TOOTH_OPTIONS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase block mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    Course
                  </label>
                  <select
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="w-full px-4 py-[10px] rounded-lg text-[13px]"
                    style={{
                      background: 'var(--color-bg-sunken)',
                      border: '1px solid var(--color-border-subtle)',
                      color: 'var(--color-text-primary)',
                      outline: 'none',
                    }}
                  >
                    <option value="CRS-001">Crown Design I</option>
                    <option value="CRS-002">Prosthodontics II</option>
                  </select>
                </div>
              </div>
            </Card>
          </StaggerItem>

          {/* Submit */}
          <StaggerItem>
            <div className="flex gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={handleSubmit}
                disabled={!fileName}
                className={!fileName ? 'opacity-50 cursor-not-allowed' : ''}
              >
                Submit for Evaluation
              </Button>
              <Button variant="ghost" size="md" onClick={() => router.push('/academic/student')}>
                Cancel
              </Button>
            </div>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
