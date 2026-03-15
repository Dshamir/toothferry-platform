import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AcademicRoleType, AcademicPersona, Submission, AcademicEvaluation, FeedbackItem, StudentEnrollment, AxisScore } from '@/types/academic';
import { ACADEMIC_PERSONAS, SEED_SUBMISSIONS, SEED_EVALUATIONS, SEED_FEEDBACK, SEED_ENROLLMENTS } from '@/data/academic-seed';

interface AcademicStore {
  // Role state
  currentRole: AcademicRoleType;
  currentPersona: AcademicPersona;

  // Data
  submissions: Submission[];
  evaluations: AcademicEvaluation[];
  feedback: FeedbackItem[];
  enrollments: StudentEnrollment[];

  // Actions
  setRole: (role: AcademicRoleType) => void;
  submitScan: (data: { studentId: string; studentName: string; toothNumber: string; courseId: string; courseName: string; fileName: string }) => void;
  evaluateSubmission: (submissionId: string, axes: AxisScore[], feedbackText: string, finalize: boolean, evaluatorId: string, evaluatorName: string) => void;
  markFeedbackRead: (feedbackId: string) => void;
}

let subCounter = SEED_SUBMISSIONS.length;
let evalCounter = SEED_EVALUATIONS.length;
let fbCounter = SEED_FEEDBACK.length;

export const useAcademicStore = create<AcademicStore>()(
  immer((set) => ({
    currentRole: 'institution',
    currentPersona: ACADEMIC_PERSONAS[0],

    submissions: SEED_SUBMISSIONS,
    evaluations: SEED_EVALUATIONS,
    feedback: SEED_FEEDBACK,
    enrollments: SEED_ENROLLMENTS,

    setRole: (role) => set((state) => {
      state.currentRole = role;
      const persona = ACADEMIC_PERSONAS.find((p) => p.role === role);
      if (persona) state.currentPersona = persona;
    }),

    submitScan: (data) => set((state) => {
      subCounter++;
      state.submissions.unshift({
        id: `SUB-${String(subCounter).padStart(3, '0')}`,
        studentId: data.studentId,
        studentName: data.studentName,
        toothNumber: data.toothNumber,
        courseId: data.courseId,
        courseName: data.courseName,
        fileName: data.fileName,
        submittedAt: new Date().toISOString(),
        status: 'pending',
      });
    }),

    evaluateSubmission: (submissionId, axes, feedbackText, finalize, evaluatorId, evaluatorName) => set((state) => {
      const sub = state.submissions.find((s) => s.id === submissionId);
      if (!sub) return;

      sub.status = 'evaluated';

      const overallScore = +(axes.reduce((sum, a) => sum + a.score, 0) / axes.length).toFixed(2);

      evalCounter++;
      const evalId = `EVAL-${String(evalCounter).padStart(3, '0')}`;
      state.evaluations.unshift({
        id: evalId,
        submissionId,
        studentId: sub.studentId,
        studentName: sub.studentName,
        evaluatorId,
        evaluatorName,
        toothNumber: sub.toothNumber,
        axes,
        overallScore,
        feedback: feedbackText,
        finalized: finalize,
        evaluatedAt: new Date().toISOString(),
      });

      if (finalize) {
        fbCounter++;
        state.feedback.unshift({
          id: `FB-${String(fbCounter).padStart(3, '0')}`,
          evaluationId: evalId,
          studentId: sub.studentId,
          professorName: evaluatorName,
          toothNumber: sub.toothNumber,
          courseName: sub.courseName,
          overallScore,
          axes,
          feedback: feedbackText,
          improvementSuggestions: [],
          createdAt: new Date().toISOString(),
          read: false,
        });
      }
    }),

    markFeedbackRead: (feedbackId) => set((state) => {
      const fb = state.feedback.find((f) => f.id === feedbackId);
      if (fb) fb.read = true;
    }),
  }))
);
