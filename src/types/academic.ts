export type AcademicRoleType = 'institution' | 'professor' | 'assistant' | 'student';

export interface AcademicPersona {
  id: string;
  name: string;
  role: AcademicRoleType;
  initials: string;
  avatarColor: string;
  label: string;
  domain: string;
  institution: string;
  department: string;
  // Hierarchy
  reportsTo?: string;       // persona ID this role reports to
  reportsToName?: string;   // display name
  assistantIds?: string[];   // for professors: their assistant(s)
  courseIds?: string[];       // courses this persona is associated with
  studentIds?: string[];     // for professor/assistant: their students
}

export interface AxisScore {
  name: string;
  score: number;
  max: number;
  color: string;
}

export interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  toothNumber: string;
  courseId: string;
  courseName: string;
  fileName: string;
  submittedAt: string;
  status: 'pending' | 'in-review' | 'evaluated';
}

export interface AcademicEvaluation {
  id: string;
  submissionId: string;
  studentId: string;
  studentName: string;
  evaluatorId: string;
  evaluatorName: string;
  toothNumber: string;
  axes: AxisScore[];
  overallScore: number;
  feedback: string;
  finalized: boolean;
  evaluatedAt: string;
}

export interface FeedbackItem {
  id: string;
  evaluationId: string;
  studentId: string;
  professorName: string;
  toothNumber: string;
  courseName: string;
  overallScore: number;
  axes: AxisScore[];
  feedback: string;
  improvementSuggestions: string[];
  createdAt: string;
  read: boolean;
}

export interface StudentEnrollment {
  studentId: string;
  courseId: string;
  courseName: string;
  professorId: string;
  professorName: string;
  assistantId?: string;
  assistantName?: string;
  moduleProgress: Record<string, number>;
  currentGrade: number;
  letterGrade: string;
}
