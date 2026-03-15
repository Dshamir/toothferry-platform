'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTour } from '@/hooks/useTour';
import { motion, AnimatePresence } from 'framer-motion';

export default function DemoPage() {
  const router = useRouter();
  const tour = useTour();

  useEffect(() => {
    tour.startTour();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-[#141412] flex items-center justify-center">
      <AnimatePresence>
        {tour.active && tour.step && (
          <motion.div
            key={tour.currentStepIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[3000] w-[420px] max-w-[90vw]"
          >
            <div className="backdrop-blur-[20px] bg-[rgba(10,15,13,0.92)] border border-[rgba(29,158,117,0.25)] rounded-[16px] p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#3FB950] animate-pulse" />
                <span className="text-[10px] text-[rgba(93,202,165,0.5)] uppercase tracking-[0.1em]" style={{ fontFamily: 'var(--font-mono)' }}>
                  Step {tour.currentStepIndex + 1} of {tour.steps.length}
                </span>
              </div>
              <h3 className="text-[#5DCAA5] text-[16px] font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                {tour.step.title}
              </h3>
              <p className="text-[rgba(255,255,255,0.55)] text-[13px] leading-[1.6] mb-4">
                {tour.step.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-[4px]">
                  {tour.steps.map((_, i) => (
                    <div
                      key={i}
                      className={`w-[6px] h-[6px] rounded-full transition-all ${
                        i === tour.currentStepIndex ? 'bg-[#5DCAA5] w-[18px]' :
                        i < tour.currentStepIndex ? 'bg-[rgba(93,202,165,0.4)]' : 'bg-[rgba(93,202,165,0.15)]'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  {tour.currentStepIndex > 0 && (
                    <button
                      onClick={tour.previous}
                      className="px-3 py-1.5 text-[11px] rounded-md bg-transparent border border-[rgba(29,158,117,0.3)] text-[#5DCAA5] cursor-pointer hover:bg-[rgba(29,158,117,0.1)] transition-all"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      ← Back
                    </button>
                  )}
                  <button
                    onClick={tour.paused ? tour.resume : tour.pause}
                    className="px-3 py-1.5 text-[11px] rounded-md bg-transparent border border-[rgba(29,158,117,0.3)] text-[#5DCAA5] cursor-pointer hover:bg-[rgba(29,158,117,0.1)] transition-all"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {tour.paused ? '▶ Play' : '⏸ Pause'}
                  </button>
                  <button
                    onClick={tour.next}
                    className="px-3 py-1.5 text-[11px] rounded-md bg-[rgba(29,158,117,0.2)] border border-[rgba(29,158,117,0.4)] text-[#5DCAA5] cursor-pointer hover:bg-[rgba(29,158,117,0.3)] transition-all"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!tour.active && (
        <div className="text-center">
          <h1 className="text-white text-[30px] font-extrabold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            {tour.completed ? 'Tour Complete!' : 'Guided Demo'}
          </h1>
          <p className="text-[rgba(255,255,255,0.5)] mb-6">
            {tour.completed ? 'Explore the platform on your own.' : 'Experience the crown lifecycle across all portals.'}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={tour.startTour}
              className="px-6 py-2.5 rounded-full bg-[#1D9E75] text-white text-[13px] font-semibold cursor-pointer hover:bg-[#0F6E56] transition-all border-none"
            >
              {tour.completed ? 'Watch Again' : 'Start Tour'}
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2.5 rounded-full bg-transparent border border-[rgba(255,255,255,0.2)] text-[rgba(255,255,255,0.7)] text-[13px] font-medium cursor-pointer hover:text-white transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
