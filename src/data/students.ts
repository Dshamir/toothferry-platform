import { Student, Professor, Institution } from '@/types/student';

export const SEED_INSTITUTIONS: Institution[] = [
  { id: 'INST-001', name: 'McGill University', shortName: 'McGill', professors: ['PROF-001', 'PROF-002'], studentCount: 76 },
  { id: 'INST-002', name: 'Université de Montréal', shortName: 'UdM', professors: ['PROF-003'], studentCount: 48 },
  { id: 'INST-003', name: 'University of Toronto', shortName: 'UofT', professors: ['PROF-004'], studentCount: 0 },
];

export const SEED_PROFESSORS: Professor[] = [
  { id: 'PROF-001', name: 'Prof. Haim Keren', institution: 'McGill University', department: 'Faculty of Dentistry', studentsCount: 76, coursesCount: 1, initials: 'HK' },
  { id: 'PROF-002', name: 'Dr. Nathaniel Lasry', institution: 'McGill University', department: 'Prosthodontics', studentsCount: 48, coursesCount: 1, initials: 'NL' },
  { id: 'PROF-003', name: 'Prof. Marie-Claire Dubois', institution: 'Université de Montréal', department: 'Dental Sciences', studentsCount: 38, coursesCount: 1, initials: 'MD' },
  { id: 'PROF-004', name: 'Dr. Andrew Wong', institution: 'University of Toronto', department: 'Restorative Dentistry', studentsCount: 0, coursesCount: 0, initials: 'AW' },
];

export const SEED_STUDENTS: Student[] = Array.from({ length: 20 }, (_, i) => {
  const names = ['Alice Martin', 'Ben Zhao', 'Carlos Rivera', 'Diana Okafor', 'Ethan Park', 'Fatima Al-Hassan', 'Grace Liu', 'Henri Bouchard', 'Isabelle Morin', 'Jordan Smith', 'Kayla Brown', 'Liam O\'Brien', 'Mei Chen', 'Noah Davis', 'Olivia Wilson', 'Pablo Garcia', 'Quinn Taylor', 'Rachel Lee', 'Sam Johnson', 'Tanya Kumar'];
  const institutions = ['McGill University', 'McGill University', 'Université de Montréal', 'McGill University'];
  return {
    id: `STU-${String(i + 1).padStart(3, '0')}`,
    name: names[i],
    institution: institutions[i % institutions.length],
    year: (i % 4) + 1,
    avgPrepScore: +(2.0 + Math.random() * 2).toFixed(1),
    evaluationsCompleted: Math.floor(5 + Math.random() * 30),
    moduleProgress: { 'prep-eval': Math.random() * 100, 'margin-detection': Math.random() * 100, 'crown-anatomy': Math.random() * 80 },
    needsAttention: Math.random() < 0.15,
  };
});
