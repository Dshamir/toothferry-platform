'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAcademicStore } from '@/store/academic-store';
import { ACADEMIC_PERSONAS } from '@/data/academic-seed';
import { AcademicRoleType } from '@/types/academic';

const ROLE_ROUTES: Record<AcademicRoleType, string> = {
  institution: '/academic',
  professor: '/academic/professor',
  assistant: '/academic/assistant',
  student: '/academic/student',
};

const HIERARCHY_LABELS: Record<AcademicRoleType, string> = {
  institution: 'All professors, assistants & students',
  professor: 'My assistant(s) & my students',
  assistant: 'Reports to professor · assigned students',
  student: 'My account only',
};

export function RoleSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { currentPersona, setRole } = useAcademicStore();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(role: AcademicRoleType) {
    setRole(role);
    setOpen(false);
    router.push(ROLE_ROUTES[role]);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-[6px] rounded-lg text-[11px] font-semibold cursor-pointer border transition-all"
        style={{
          background: 'var(--color-bg-surface, white)',
          border: '1px solid var(--color-border-subtle)',
          color: 'var(--color-text-primary)',
        }}
      >
        <span
          className="w-[6px] h-[6px] rounded-full flex-shrink-0"
          style={{ background: currentPersona.avatarColor }}
        />
        <span>{currentPersona.name}</span>
        <span
          className="text-[9px] px-[6px] py-[1px] rounded"
          style={{
            background: `${currentPersona.avatarColor}18`,
            color: currentPersona.avatarColor,
            fontFamily: 'var(--font-mono)',
          }}
        >
          {currentPersona.label}
        </span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.5 }}>
          <path d="M2.5 3.5L5 6.5L7.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+6px)] w-[300px] rounded-lg py-2 z-[200]"
          style={{
            background: 'var(--color-bg-surface, white)',
            border: '1px solid var(--color-border-subtle)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div
            className="text-[9px] tracking-[0.1em] uppercase px-3 pb-2 pt-1"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}
          >
            Switch portal view
          </div>
          {ACADEMIC_PERSONAS.map((persona) => {
            const active = persona.role === currentPersona.role;
            return (
              <button
                key={persona.id}
                onClick={() => handleSelect(persona.role)}
                className="flex items-center gap-[10px] w-full px-3 py-[10px] text-left cursor-pointer border-none transition-all"
                style={{
                  background: active ? 'var(--sidebar-active-bg, rgba(37,99,235,0.07))' : 'transparent',
                  color: 'var(--color-text-primary)',
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white flex-shrink-0"
                  style={{ background: persona.avatarColor, fontFamily: 'var(--font-display)' }}
                >
                  {persona.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-semibold truncate">{persona.name}</span>
                    <span
                      className="text-[9px] px-[5px] py-[1px] rounded flex-shrink-0"
                      style={{
                        background: `${persona.avatarColor}18`,
                        color: persona.avatarColor,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {persona.label}
                    </span>
                  </div>
                  <div className="text-[9px] mt-[2px]" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
                    {persona.domain}
                  </div>
                  <div className="text-[10px] mt-[1px]" style={{ color: 'var(--color-text-secondary)' }}>
                    {HIERARCHY_LABELS[persona.role]}
                  </div>
                </div>
                {active && (
                  <span className="text-[10px] flex-shrink-0" style={{ color: 'var(--color-action-bg)' }}>
                    ●
                  </span>
                )}
              </button>
            );
          })}

          {/* Hierarchy reminder */}
          <div
            className="mx-3 mt-2 px-3 py-2 rounded text-[10px] leading-[1.5]"
            style={{ background: 'var(--color-bg-sunken)', color: 'var(--color-text-secondary)' }}
          >
            <strong style={{ color: 'var(--color-text-primary)' }}>Access hierarchy:</strong> University sees all → Professor sees their courses, assistant(s) & students → Assistant reports to professor, sees assigned students → Student sees only their own account
          </div>
        </div>
      )}
    </div>
  );
}
