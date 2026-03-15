export interface Student {
  id: string;
  name: string;
  institution: string;
  year: number;
  avgPrepScore: number;
  evaluationsCompleted: number;
  moduleProgress: Record<string, number>;
  needsAttention: boolean;
}

export interface Professor {
  id: string;
  name: string;
  institution: string;
  department: string;
  studentsCount: number;
  coursesCount: number;
  initials: string;
}

export interface Institution {
  id: string;
  name: string;
  shortName: string;
  professors: string[];
  studentCount: number;
}
