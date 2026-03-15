import { eventBus } from './event-bus';
import { generateRandomCase, generateMetricFluctuation } from './generators';

type SimulationSpeed = 1 | 2 | 4;

interface SimulationEngine {
  start: () => void;
  stop: () => void;
  setSpeed: (speed: SimulationSpeed) => void;
  isRunning: () => boolean;
  getSpeed: () => SimulationSpeed;
}

let running = false;
let speed: SimulationSpeed = 1;
let timers: ReturnType<typeof setInterval>[] = [];

function interval(ms: number): number {
  return ms / speed;
}

export function createSimulationEngine(): SimulationEngine {
  return {
    start() {
      if (running) return;
      running = true;

      // Background case generation every 15s (adjusted by speed)
      timers.push(setInterval(() => {
        const newCase = generateRandomCase();
        eventBus.emit('CASE_SUBMITTED', { case: newCase });
      }, interval(15000)));

      // Metric fluctuation every 3s
      timers.push(setInterval(() => {
        eventBus.emit('METRIC_UPDATE', {
          gpuUtilization: generateMetricFluctuation(54, 8),
          apiLatency: generateMetricFluctuation(94, 15),
          machine1: generateMetricFluctuation(78, 5),
          machine2: generateMetricFluctuation(45, 8),
          sintering: generateMetricFluctuation(90, 3),
        });
      }, interval(3000)));

      // Pipeline tick every 200ms for smooth progress
      timers.push(setInterval(() => {
        eventBus.emit('PIPELINE_TICK', {});
      }, interval(200)));

      eventBus.emit('SIMULATION_STARTED', { speed });
    },

    stop() {
      running = false;
      timers.forEach(clearInterval);
      timers = [];
      eventBus.emit('SIMULATION_STOPPED', {});
    },

    setSpeed(newSpeed: SimulationSpeed) {
      speed = newSpeed;
      if (running) {
        this.stop();
        this.start();
      }
    },

    isRunning() { return running; },
    getSpeed() { return speed; },
  };
}
