import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Case } from '@/types/case';
import { LabOrder, Machine, MaterialInventory } from '@/types/order';
import { SEED_CASES } from '@/data/cases';
import { SEED_LAB_ORDERS, SEED_MACHINES, SEED_MATERIALS } from '@/data/lab-orders';

interface SimulationStore {
  // Simulation state
  running: boolean;
  speed: 1 | 2 | 4;

  // Cases
  cases: Case[];

  // Lab
  labOrders: LabOrder[];
  machines: Machine[];
  materials: MaterialInventory[];

  // Metrics
  metrics: {
    gpuUtilization: number;
    apiLatency: number;
    totalCrowns: number;
    mrr: number;
    acceptanceRate: number;
    activeAlerts: number;
  };

  // Actions
  setRunning: (running: boolean) => void;
  setSpeed: (speed: 1 | 2 | 4) => void;
  addCase: (c: Case) => void;
  updateCase: (id: string, updates: Partial<Case>) => void;
  updateMetrics: (updates: Partial<SimulationStore['metrics']>) => void;
  updateMachine: (id: string, updates: Partial<Machine>) => void;
  updateMaterial: (id: string, updates: Partial<MaterialInventory>) => void;
}

export const useSimulationStore = create<SimulationStore>()(
  immer((set) => ({
    running: false,
    speed: 1,

    cases: SEED_CASES,
    labOrders: SEED_LAB_ORDERS,
    machines: SEED_MACHINES,
    materials: SEED_MATERIALS,

    metrics: {
      gpuUtilization: 54,
      apiLatency: 94,
      totalCrowns: 1847,
      mrr: 61200,
      acceptanceRate: 93.8,
      activeAlerts: 3,
    },

    setRunning: (running) => set((state) => { state.running = running; }),
    setSpeed: (speed) => set((state) => { state.speed = speed; }),

    addCase: (c) => set((state) => { state.cases.unshift(c); }),

    updateCase: (id, updates) => set((state) => {
      const idx = state.cases.findIndex((c) => c.id === id);
      if (idx !== -1) Object.assign(state.cases[idx], updates);
    }),

    updateMetrics: (updates) => set((state) => {
      Object.assign(state.metrics, updates);
    }),

    updateMachine: (id, updates) => set((state) => {
      const idx = state.machines.findIndex((m) => m.id === id);
      if (idx !== -1) Object.assign(state.machines[idx], updates);
    }),

    updateMaterial: (id, updates) => set((state) => {
      const idx = state.materials.findIndex((m) => m.id === id);
      if (idx !== -1) Object.assign(state.materials[idx], updates);
    }),
  }))
);
