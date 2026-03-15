'use client';
import { useEffect, useRef } from 'react';
import { useSimulationStore } from '@/store/simulation-store';
import { useNotificationStore } from '@/store/notification-store';
import { eventBus } from '@/simulation/event-bus';
import { createSimulationEngine } from '@/simulation/engine';

export function useSimulation() {
  const store = useSimulationStore();
  const notifs = useNotificationStore();
  const engineRef = useRef(createSimulationEngine());

  useEffect(() => {
    const unsub1 = eventBus.on('CASE_SUBMITTED', (payload) => {
      const c = payload.case as any;
      if (c) {
        store.addCase(c);
        notifs.add({
          type: 'info',
          title: `New case ${c.shortId}`,
          message: `${c.dentistName} submitted ${c.toothName} (${c.material})`,
          portal: 'dentist',
        });
      }
    });

    const unsub2 = eventBus.on('METRIC_UPDATE', (payload) => {
      store.updateMetrics({
        gpuUtilization: payload.gpuUtilization as number,
        apiLatency: payload.apiLatency as number,
      });
      if (payload.machine1 !== undefined) {
        store.updateMachine('M-001', { utilization: payload.machine1 as number });
      }
    });

    return () => { unsub1(); unsub2(); };
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const toggleSimulation = () => {
    if (store.running) {
      engineRef.current.stop();
      store.setRunning(false);
    } else {
      engineRef.current.start();
      store.setRunning(true);
    }
  };

  const changeSpeed = (speed: 1 | 2 | 4) => {
    engineRef.current.setSpeed(speed);
    store.setSpeed(speed);
  };

  return {
    running: store.running,
    speed: store.speed,
    toggleSimulation,
    changeSpeed,
  };
}
