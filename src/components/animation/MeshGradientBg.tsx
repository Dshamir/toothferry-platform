'use client';
import { motion } from 'framer-motion';

interface MeshGradientBgProps {
  colors?: string[];
  className?: string;
}

export function MeshGradientBg({ colors = ['rgba(29,158,117,0.13)', 'transparent'], className = '' }: MeshGradientBgProps) {
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      animate={{
        background: [
          `radial-gradient(ellipse 900px 500px at 30% 20%, ${colors[0]} 0%, ${colors[1]} 70%)`,
          `radial-gradient(ellipse 900px 500px at 70% 80%, ${colors[0]} 0%, ${colors[1]} 70%)`,
          `radial-gradient(ellipse 900px 500px at 30% 20%, ${colors[0]} 0%, ${colors[1]} 70%)`,
        ],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
    />
  );
}
