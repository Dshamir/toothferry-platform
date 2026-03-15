const DENTIST_NAMES = ['Dr. Chen', 'Dr. Patel', 'Dr. Kim', 'Dr. Roy', 'Dr. Tremblay', 'Dr. Wang', 'Dr. Nguyen', 'Dr. Thompson', 'Dr. Leblanc', 'Dr. Singh'];
const PATIENT_NAMES = ['Sarah', 'Raj', 'James', 'Marie', 'Pierre', 'Lisa', 'David', 'Emily', 'Michael', 'Sophie', 'Alex', 'Priya', 'Thomas', 'Natalie', 'Carlos'];
const TOOTH_POSITIONS = ['#3', '#4', '#5', '#8', '#9', '#12', '#14', '#18', '#19', '#20', '#29', '#30', '#31'];
const TOOTH_NAMES: Record<string, string> = {
  '#3': 'UR6', '#4': 'UR5', '#5': 'UR4', '#8': 'Central incisor', '#9': 'Lateral incisor',
  '#12': 'UL4', '#14': 'UL6', '#18': 'LL8', '#19': 'LL6', '#20': 'LL5',
  '#29': 'LR5', '#30': 'LR6', '#31': 'LR7',
};
const MATERIALS = ['zirconia', 'e-max', 'pmma'] as const;
const SCANNERS = ['3Shape TRIOS', 'iTero Element', 'Medit i700'] as const;

let caseCounter = 49;

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateCaseId(): string {
  caseCounter++;
  return `TF-20260314-${String(caseCounter).padStart(3, '0')}`;
}

export function generateRandomCase() {
  const id = generateCaseId();
  const tooth = pick(TOOTH_POSITIONS);
  const isIncisor = ['#8', '#9'].includes(tooth);
  const material = isIncisor ? 'e-max' : pick(MATERIALS);

  return {
    id,
    shortId: `TF-${String(caseCounter).padStart(3, '0')}`,
    patientId: `P-${Math.floor(100 + Math.random() * 900)}`,
    patientName: `${pick(PATIENT_NAMES)} ${pick(['Chen', 'Patel', 'Kim', 'Roy', 'Tremblay', 'Wang', 'Nguyen', 'Thompson', 'Leblanc', 'Singh'])}`,
    dentistName: pick(DENTIST_NAMES),
    toothNumber: tooth,
    toothName: TOOTH_NAMES[tooth] || tooth,
    material: material as 'zirconia' | 'e-max' | 'pmma' | 'composite',
    marginType: pick(['chamfer', 'shoulder', 'deep-chamfer', 'knife-edge'] as const),
    status: 'submitted' as const,
    priority: (Math.random() < 0.2 ? 'urgent' : 'standard') as 'urgent' | 'standard' | 'low',
    pipeline: [],
    pipelineProgress: 0,
    prepScore: +(2.0 + Math.random() * 2).toFixed(1),
    confidence: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    scanner: pick(SCANNERS) as string,
  };
}

export function generateMetricFluctuation(base: number, variance: number): number {
  return Math.max(0, Math.min(100, base + (Math.random() - 0.5) * 2 * variance));
}
