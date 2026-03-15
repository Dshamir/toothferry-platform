import { AcademicPersona, Submission, AcademicEvaluation, FeedbackItem, StudentEnrollment, AxisScore } from '@/types/academic';

const AXIS_COLORS = ['#6750D6', '#8B79E5', '#5240C0', '#B5A9EF', '#3F30A0'];

function makeAxes(scores: number[]): AxisScore[] {
  const names = ['Taper', 'Margin', 'Occlusal Clearance', 'Wall Height', 'Smoothness'];
  return names.map((name, i) => ({ name, score: scores[i], max: 4, color: AXIS_COLORS[i] }));
}

// ─── Hierarchy ─────────────────────────────────────────────
//
// university.toothferryai.com  →  McGill Admin (INST-001)
//   └── Has professors: PROF-001, PROF-002
//   └── Has 124 students across all programs
//
// professor.toothferryai.com   →  Prof. Keren (PROF-001)
//   └── Institution: McGill University
//   └── Courses: Crown Design I (CRS-001)
//   └── Assistants: Dr. Lasry (PROF-002)
//   └── Students: STU-001, STU-002, STU-004, STU-005 (76 total in course)
//
// assistant.toothferryai.com   →  Dr. Lasry (PROF-002)
//   └── Institution: McGill University
//   └── Reports to: Prof. Keren (PROF-001)
//   └── Assigned course: Crown Design I (CRS-001)
//   └── Assigned students: STU-003, STU-006 (subset, Prosthodontics II grading)
//
// student.toothferryai.com     →  Alice Martin (STU-001)
//   └── Institution: McGill University
//   └── Course: Crown Design I → Professor: Prof. Keren, Assistant: Dr. Lasry
//   └── Can only see own submissions, evaluations, feedback
//

export const ACADEMIC_PERSONAS: AcademicPersona[] = [
  {
    id: 'INST-001',
    name: 'McGill Admin',
    role: 'institution',
    initials: 'MA',
    avatarColor: '#185FA5',
    label: 'University Admin',
    domain: 'university.toothferryai.com',
    institution: 'McGill University',
    department: 'Faculty of Dentistry',
    courseIds: ['CRS-001', 'CRS-002', 'CRS-003'],
  },
  {
    id: 'PROF-001',
    name: 'Prof. Keren',
    role: 'professor',
    initials: 'HK',
    avatarColor: '#6750D6',
    label: 'Professor',
    domain: 'professor.toothferryai.com',
    institution: 'McGill University',
    department: 'Faculty of Dentistry',
    assistantIds: ['PROF-002'],
    courseIds: ['CRS-001'],
    studentIds: ['STU-001', 'STU-002', 'STU-004', 'STU-005'],
  },
  {
    id: 'PROF-002',
    name: 'Dr. Lasry',
    role: 'assistant',
    initials: 'NL',
    avatarColor: '#0F6E56',
    label: 'Asst. Professor',
    domain: 'assistant.toothferryai.com',
    institution: 'McGill University',
    department: 'Prosthodontics',
    reportsTo: 'PROF-001',
    reportsToName: 'Prof. Keren',
    courseIds: ['CRS-001'],
    studentIds: ['STU-003', 'STU-006'],
  },
  {
    id: 'STU-001',
    name: 'Alice Martin',
    role: 'student',
    initials: 'AM',
    avatarColor: '#C2185B',
    label: 'Student',
    domain: 'student.toothferryai.com',
    institution: 'McGill University',
    department: 'DMD Year 3',
    courseIds: ['CRS-001'],
  },
];

export const SEED_SUBMISSIONS: Submission[] = [
  { id: 'SUB-001', studentId: 'STU-001', studentName: 'Alice Martin', toothNumber: '#14', courseId: 'CRS-001', courseName: 'Crown Design I', fileName: 'scan_tooth14.stl', submittedAt: '2026-03-15T09:30:00', status: 'pending' },
  { id: 'SUB-002', studentId: 'STU-002', studentName: 'Ben Zhao', toothNumber: '#21', courseId: 'CRS-001', courseName: 'Crown Design I', fileName: 'prep_21_v2.obj', submittedAt: '2026-03-15T08:15:00', status: 'pending' },
  { id: 'SUB-003', studentId: 'STU-003', studentName: 'Carlos Rivera', toothNumber: '#36', courseId: 'CRS-001', courseName: 'Crown Design I', fileName: 'molar_36.stl', submittedAt: '2026-03-14T16:45:00', status: 'pending' },
  { id: 'SUB-004', studentId: 'STU-004', studentName: 'Diana Okafor', toothNumber: '#11', courseId: 'CRS-001', courseName: 'Crown Design I', fileName: 'central_incisor.stl', submittedAt: '2026-03-14T14:20:00', status: 'pending' },
  { id: 'SUB-005', studentId: 'STU-005', studentName: 'Ethan Park', toothNumber: '#25', courseId: 'CRS-001', courseName: 'Crown Design I', fileName: 'premolar_25.obj', submittedAt: '2026-03-14T11:00:00', status: 'pending' },
  { id: 'SUB-006', studentId: 'STU-006', studentName: 'Fatima Al-Hassan', toothNumber: '#46', courseId: 'CRS-001', courseName: 'Crown Design I', fileName: 'lower_molar.stl', submittedAt: '2026-03-13T15:30:00', status: 'pending' },
  { id: 'SUB-007', studentId: 'STU-001', studentName: 'Alice Martin', toothNumber: '#21', courseId: 'CRS-001', courseName: 'Crown Design I', fileName: 'scan_21_retake.stl', submittedAt: '2026-03-12T10:00:00', status: 'evaluated' },
  { id: 'SUB-008', studentId: 'STU-002', studentName: 'Ben Zhao', toothNumber: '#36', courseId: 'CRS-001', courseName: 'Crown Design I', fileName: 'molar_scan.stl', submittedAt: '2026-03-11T14:30:00', status: 'evaluated' },
  { id: 'SUB-009', studentId: 'STU-003', studentName: 'Carlos Rivera', toothNumber: '#11', courseId: 'CRS-001', courseName: 'Crown Design I', fileName: 'incisor_prep.obj', submittedAt: '2026-03-10T09:00:00', status: 'evaluated' },
  { id: 'SUB-010', studentId: 'STU-001', studentName: 'Alice Martin', toothNumber: '#36', courseId: 'CRS-001', courseName: 'Crown Design I', fileName: 'molar_36_prep.stl', submittedAt: '2026-03-09T11:15:00', status: 'evaluated' },
  { id: 'SUB-011', studentId: 'STU-004', studentName: 'Diana Okafor', toothNumber: '#25', courseId: 'CRS-001', courseName: 'Crown Design I', fileName: 'premolar_scan.stl', submittedAt: '2026-03-08T13:45:00', status: 'evaluated' },
  { id: 'SUB-012', studentId: 'STU-005', studentName: 'Ethan Park', toothNumber: '#14', courseId: 'CRS-001', courseName: 'Crown Design I', fileName: 'tooth14_prep.stl', submittedAt: '2026-03-07T16:20:00', status: 'evaluated' },
  { id: 'SUB-013', studentId: 'STU-001', studentName: 'Alice Martin', toothNumber: '#11', courseId: 'CRS-001', courseName: 'Crown Design I', fileName: 'incisor_v1.stl', submittedAt: '2026-03-05T10:30:00', status: 'evaluated' },
  { id: 'SUB-014', studentId: 'STU-006', studentName: 'Fatima Al-Hassan', toothNumber: '#21', courseId: 'CRS-001', courseName: 'Crown Design I', fileName: 'lateral_scan.stl', submittedAt: '2026-03-04T09:00:00', status: 'evaluated' },
  { id: 'SUB-015', studentId: 'STU-002', studentName: 'Ben Zhao', toothNumber: '#11', courseId: 'CRS-001', courseName: 'Crown Design I', fileName: 'central_prep.obj', submittedAt: '2026-03-03T14:00:00', status: 'evaluated' },
];

export const SEED_EVALUATIONS: AcademicEvaluation[] = [
  { id: 'EVAL-001', submissionId: 'SUB-007', studentId: 'STU-001', studentName: 'Alice Martin', evaluatorId: 'PROF-001', evaluatorName: 'Prof. Keren', toothNumber: '#21', axes: makeAxes([3.2, 2.8, 3.5, 2.9, 3.1]), overallScore: 3.1, feedback: 'Good convergence angle. Margin needs more defined chamfer at the distal. Occlusal clearance is excellent.', finalized: true, evaluatedAt: '2026-03-12T14:00:00' },
  { id: 'EVAL-002', submissionId: 'SUB-008', studentId: 'STU-002', studentName: 'Ben Zhao', evaluatorId: 'PROF-001', evaluatorName: 'Prof. Keren', toothNumber: '#36', axes: makeAxes([3.6, 3.4, 3.2, 3.5, 3.3]), overallScore: 3.4, feedback: 'Strong overall prep. Minor smoothness issue near the buccal cusp. Continue refining transitions.', finalized: true, evaluatedAt: '2026-03-11T17:00:00' },
  { id: 'EVAL-003', submissionId: 'SUB-009', studentId: 'STU-003', studentName: 'Carlos Rivera', evaluatorId: 'PROF-002', evaluatorName: 'Dr. Lasry', toothNumber: '#11', axes: makeAxes([2.4, 2.1, 2.8, 2.3, 2.5]), overallScore: 2.4, feedback: 'Taper is too aggressive — aim for 4-6 degrees. Margin line is interrupted at mesial. Needs significant improvement.', finalized: true, evaluatedAt: '2026-03-10T15:30:00' },
  { id: 'EVAL-004', submissionId: 'SUB-010', studentId: 'STU-001', studentName: 'Alice Martin', evaluatorId: 'PROF-001', evaluatorName: 'Prof. Keren', toothNumber: '#36', axes: makeAxes([3.0, 2.6, 3.3, 3.1, 2.8]), overallScore: 2.96, feedback: 'Adequate prep overall. Focus on achieving a more continuous margin line. Wall height is good.', finalized: true, evaluatedAt: '2026-03-09T16:00:00' },
  { id: 'EVAL-005', submissionId: 'SUB-011', studentId: 'STU-004', studentName: 'Diana Okafor', evaluatorId: 'PROF-001', evaluatorName: 'Prof. Keren', toothNumber: '#25', axes: makeAxes([3.8, 3.6, 3.7, 3.5, 3.9]), overallScore: 3.7, feedback: 'Excellent work! Very clean margins and ideal taper. One of the best submissions this semester.', finalized: true, evaluatedAt: '2026-03-08T16:30:00' },
  { id: 'EVAL-006', submissionId: 'SUB-012', studentId: 'STU-005', studentName: 'Ethan Park', evaluatorId: 'PROF-001', evaluatorName: 'Prof. Keren', toothNumber: '#14', axes: makeAxes([2.9, 2.7, 3.0, 2.5, 2.6]), overallScore: 2.74, feedback: 'Wall height is below minimum threshold. Ensure at least 4mm axial wall before submitting. Taper is acceptable.', finalized: true, evaluatedAt: '2026-03-07T18:00:00' },
  { id: 'EVAL-007', submissionId: 'SUB-013', studentId: 'STU-001', studentName: 'Alice Martin', evaluatorId: 'PROF-001', evaluatorName: 'Prof. Keren', toothNumber: '#11', axes: makeAxes([2.8, 2.4, 3.1, 2.7, 2.9]), overallScore: 2.78, feedback: 'Initial attempt shows promise. Margin definition needs work — practice the chamfer technique demonstrated in Module 2.', finalized: true, evaluatedAt: '2026-03-05T14:30:00' },
  { id: 'EVAL-008', submissionId: 'SUB-014', studentId: 'STU-006', studentName: 'Fatima Al-Hassan', evaluatorId: 'PROF-002', evaluatorName: 'Dr. Lasry', toothNumber: '#21', axes: makeAxes([3.4, 3.2, 3.6, 3.3, 3.5]), overallScore: 3.4, feedback: 'Very clean preparation. Occlusal clearance is well above minimum. Great progress from last submission.', finalized: true, evaluatedAt: '2026-03-04T12:00:00' },
  { id: 'EVAL-009', submissionId: 'SUB-015', studentId: 'STU-002', studentName: 'Ben Zhao', evaluatorId: 'PROF-001', evaluatorName: 'Prof. Keren', toothNumber: '#11', axes: makeAxes([3.1, 2.9, 3.0, 3.2, 3.0]), overallScore: 3.04, feedback: 'Solid work. Focus on improving margin quality — the chamfer is slightly shallow on the lingual side.', finalized: true, evaluatedAt: '2026-03-03T16:00:00' },
  { id: 'EVAL-010', submissionId: 'SUB-003', studentId: 'STU-003', studentName: 'Carlos Rivera', evaluatorId: 'PROF-002', evaluatorName: 'Dr. Lasry', toothNumber: '#36', axes: makeAxes([2.6, 2.3, 2.9, 2.4, 2.7]), overallScore: 2.58, feedback: 'Below expectations. Schedule office hours to review margin technique. The taper is over-reduced.', finalized: false, evaluatedAt: '2026-03-14T17:30:00' },
  { id: 'EVAL-011', submissionId: 'SUB-006', studentId: 'STU-006', studentName: 'Fatima Al-Hassan', evaluatorId: 'PROF-002', evaluatorName: 'Dr. Lasry', toothNumber: '#46', axes: makeAxes([3.3, 3.0, 3.4, 3.1, 3.2]), overallScore: 3.2, feedback: 'Good technique on the lower molar. Watch the mesial margin — slightly overextended.', finalized: false, evaluatedAt: '2026-03-13T17:00:00' },
  { id: 'EVAL-012', submissionId: 'SUB-004', studentId: 'STU-004', studentName: 'Diana Okafor', evaluatorId: 'PROF-002', evaluatorName: 'Dr. Lasry', toothNumber: '#11', axes: makeAxes([3.5, 3.3, 3.6, 3.4, 3.7]), overallScore: 3.5, feedback: 'Excellent central incisor preparation. Continue this quality of work.', finalized: false, evaluatedAt: '2026-03-14T16:00:00' },
];

export const SEED_FEEDBACK: FeedbackItem[] = [
  { id: 'FB-001', evaluationId: 'EVAL-001', studentId: 'STU-001', professorName: 'Prof. Keren', toothNumber: '#21', courseName: 'Crown Design I', overallScore: 3.1, axes: makeAxes([3.2, 2.8, 3.5, 2.9, 3.1]), feedback: 'Good convergence angle. Margin needs more defined chamfer at the distal. Occlusal clearance is excellent.', improvementSuggestions: ['Practice chamfer technique on distal surfaces', 'Review Module 2 margin exercises'], createdAt: '2026-03-12T14:00:00', read: false },
  { id: 'FB-002', evaluationId: 'EVAL-004', studentId: 'STU-001', professorName: 'Prof. Keren', toothNumber: '#36', courseName: 'Crown Design I', overallScore: 2.96, axes: makeAxes([3.0, 2.6, 3.3, 3.1, 2.8]), feedback: 'Adequate prep overall. Focus on achieving a more continuous margin line. Wall height is good.', improvementSuggestions: ['Focus on continuous margin line', 'Improve smoothness transitions'], createdAt: '2026-03-09T16:00:00', read: true },
  { id: 'FB-003', evaluationId: 'EVAL-007', studentId: 'STU-001', professorName: 'Prof. Keren', toothNumber: '#11', courseName: 'Crown Design I', overallScore: 2.78, axes: makeAxes([2.8, 2.4, 3.1, 2.7, 2.9]), feedback: 'Initial attempt shows promise. Margin definition needs work — practice the chamfer technique demonstrated in Module 2.', improvementSuggestions: ['Complete Module 2 chamfer exercises', 'Schedule practice session for margin technique'], createdAt: '2026-03-05T14:30:00', read: true },
  { id: 'FB-004', evaluationId: 'EVAL-002', studentId: 'STU-002', professorName: 'Prof. Keren', toothNumber: '#36', courseName: 'Crown Design I', overallScore: 3.4, axes: makeAxes([3.6, 3.4, 3.2, 3.5, 3.3]), feedback: 'Strong overall prep. Minor smoothness issue near the buccal cusp. Continue refining transitions.', improvementSuggestions: ['Refine buccal cusp transitions'], createdAt: '2026-03-11T17:00:00', read: false },
  { id: 'FB-005', evaluationId: 'EVAL-003', studentId: 'STU-003', professorName: 'Dr. Lasry', toothNumber: '#11', courseName: 'Crown Design I', overallScore: 2.4, axes: makeAxes([2.4, 2.1, 2.8, 2.3, 2.5]), feedback: 'Taper is too aggressive — aim for 4-6 degrees. Margin line is interrupted at mesial. Needs significant improvement.', improvementSuggestions: ['Review taper guidelines (4-6 degrees)', 'Practice continuous margin technique', 'Schedule office hours for 1:1 review'], createdAt: '2026-03-10T15:30:00', read: false },
  { id: 'FB-006', evaluationId: 'EVAL-005', studentId: 'STU-004', professorName: 'Prof. Keren', toothNumber: '#25', courseName: 'Crown Design I', overallScore: 3.7, axes: makeAxes([3.8, 3.6, 3.7, 3.5, 3.9]), feedback: 'Excellent work! Very clean margins and ideal taper. One of the best submissions this semester.', improvementSuggestions: [], createdAt: '2026-03-08T16:30:00', read: true },
  { id: 'FB-007', evaluationId: 'EVAL-006', studentId: 'STU-005', professorName: 'Prof. Keren', toothNumber: '#14', courseName: 'Crown Design I', overallScore: 2.74, axes: makeAxes([2.9, 2.7, 3.0, 2.5, 2.6]), feedback: 'Wall height is below minimum threshold. Ensure at least 4mm axial wall before submitting. Taper is acceptable.', improvementSuggestions: ['Ensure 4mm minimum axial wall height', 'Review wall height guidelines in Module 1'], createdAt: '2026-03-07T18:00:00', read: true },
  { id: 'FB-008', evaluationId: 'EVAL-008', studentId: 'STU-006', professorName: 'Dr. Lasry', toothNumber: '#21', courseName: 'Crown Design I', overallScore: 3.4, axes: makeAxes([3.4, 3.2, 3.6, 3.3, 3.5]), feedback: 'Very clean preparation. Occlusal clearance is well above minimum. Great progress from last submission.', improvementSuggestions: ['Keep up the quality'], createdAt: '2026-03-04T12:00:00', read: true },
];

export const SEED_ENROLLMENTS: StudentEnrollment[] = [
  { studentId: 'STU-001', courseId: 'CRS-001', courseName: 'Crown Design I', professorId: 'PROF-001', professorName: 'Prof. Keren', assistantId: 'PROF-002', assistantName: 'Dr. Lasry', moduleProgress: { 'prep-eval': 72, 'margin-detection': 58, 'crown-anatomy': 45 }, currentGrade: 3.2, letterGrade: 'B+' },
  { studentId: 'STU-002', courseId: 'CRS-001', courseName: 'Crown Design I', professorId: 'PROF-001', professorName: 'Prof. Keren', assistantId: 'PROF-002', assistantName: 'Dr. Lasry', moduleProgress: { 'prep-eval': 85, 'margin-detection': 70, 'crown-anatomy': 60 }, currentGrade: 3.4, letterGrade: 'B+' },
  { studentId: 'STU-003', courseId: 'CRS-001', courseName: 'Crown Design I', professorId: 'PROF-001', professorName: 'Prof. Keren', assistantId: 'PROF-002', assistantName: 'Dr. Lasry', moduleProgress: { 'prep-eval': 40, 'margin-detection': 30, 'crown-anatomy': 25 }, currentGrade: 2.4, letterGrade: 'C+' },
  { studentId: 'STU-004', courseId: 'CRS-001', courseName: 'Crown Design I', professorId: 'PROF-001', professorName: 'Prof. Keren', assistantId: 'PROF-002', assistantName: 'Dr. Lasry', moduleProgress: { 'prep-eval': 90, 'margin-detection': 82, 'crown-anatomy': 75 }, currentGrade: 3.7, letterGrade: 'A-' },
  { studentId: 'STU-005', courseId: 'CRS-001', courseName: 'Crown Design I', professorId: 'PROF-001', professorName: 'Prof. Keren', assistantId: 'PROF-002', assistantName: 'Dr. Lasry', moduleProgress: { 'prep-eval': 55, 'margin-detection': 48, 'crown-anatomy': 35 }, currentGrade: 2.74, letterGrade: 'B-' },
  { studentId: 'STU-006', courseId: 'CRS-001', courseName: 'Crown Design I', professorId: 'PROF-001', professorName: 'Prof. Keren', assistantId: 'PROF-002', assistantName: 'Dr. Lasry', moduleProgress: { 'prep-eval': 78, 'margin-detection': 65, 'crown-anatomy': 55 }, currentGrade: 3.4, letterGrade: 'B+' },
];
