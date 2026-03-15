'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeSlideInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function FadeSlideIn({ children, delay = 0, direction = 'up', className = '' }: FadeSlideInProps) {
  const offsets = { up: { y: 12 }, down: { y: -12 }, left: { x: 12 }, right: { x: -12 } };
  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
