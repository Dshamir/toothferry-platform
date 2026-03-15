export interface PrepAxis {
  name: string;
  score: number; // 0-4
  maxScore: number;
  color: string;
}

export interface PrepEvaluation {
  id: string;
  studentId: string;
  toothNumber: string;
  axes: PrepAxis[];
  overallScore: number;
  feedback: string;
  evaluatedAt: Date;
  evaluatedBy: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  studentsEnrolled: number;
  completionRate: number;
  totalModules: number;
  completedModules: number;
  locked: boolean;
  lockedUntil?: string;
}
