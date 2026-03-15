'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SidebarSection } from './Sidebar';

interface MobileNavProps {
  sections: SidebarSection[];
}

export function MobileNav({ sections }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-[1000] w-12 h-12 rounded-full bg-[var(--color-action-bg)] text-white shadow-lg flex items-center justify-center text-xl border-none cursor-pointer"
      >
        ☰
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[1001]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-white z-[1002] overflow-y-auto pt-[38px] shadow-xl"
            >
              <div className="p-4">
                {sections.map((section, si) => (
                  <div key={si}>
                    {si > 0 && <div className="h-px bg-[var(--color-border-subtle)] my-2" />}
                    <div className="text-[9px] text-[var(--color-text-secondary)] tracking-[0.1em] uppercase px-[14px] pb-[6px] mt-[14px]" style={{ fontFamily: 'var(--font-mono)' }}>
                      {section.title}
                    </div>
                    {section.items.map((item) => {
                      const active = pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => setOpen(false)}
                          className={`flex items-center gap-3 py-3 px-4 text-sm rounded-lg no-underline transition-colors ${
                            active
                              ? 'bg-[var(--brand-50)] text-[var(--color-action-bg)] font-medium'
                              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-sunken)]'
                          }`}
                        >
                          <span>{item.icon}</span>
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
