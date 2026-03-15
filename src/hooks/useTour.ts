'use client';
import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTourStore } from '@/store/tour-store';

export function useTour() {
  const router = useRouter();
  const tour = useTourStore();

  const step = tour.getCurrentStep();

  // Navigate when step changes
  useEffect(() => {
    if (!tour.active || tour.paused || !step) return;
    router.push(step.path);
  }, [tour.active, tour.paused, tour.currentStepIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-advance
  useEffect(() => {
    if (!tour.active || tour.paused || !step?.duration) return;
    const timer = setTimeout(() => tour.next(), step.duration);
    return () => clearTimeout(timer);
  }, [tour.active, tour.paused, tour.currentStepIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const startTour = useCallback(() => tour.start(), [tour]);
  const stopTour = useCallback(() => tour.stop(), [tour]);

  return { ...tour, step, startTour, stopTour };
}
