'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type PortalEntry =
  | { type: 'link'; id: string; label: string; path: string; color: string; indent?: boolean }
  | { type: 'separator' };

const PORTALS: PortalEntry[] = [
  { type: 'link', id: 'landing', label: 'www', path: '/', color: '#5DCAA5' },
  { type: 'link', id: 'operator', label: 'platform', path: '/operator', color: '#534AB7' },
  { type: 'link', id: 'admin', label: 'admin', path: '/admin', color: '#58A6FF' },
  { type: 'link', id: 'command', label: 'command', path: '/command', color: '#3FB950' },
  { type: 'separator' },
  { type: 'link', id: 'academic', label: 'academic', path: '/academic', color: '#185FA5' },
  { type: 'link', id: 'professor', label: 'professor', path: '/academic/professor', color: '#6750D6', indent: true },
  { type: 'link', id: 'assistant', label: 'assistant', path: '/academic/assistant', color: '#0F6E56', indent: true },
  { type: 'link', id: 'student', label: 'student', path: '/academic/student', color: '#C2185B', indent: true },
  { type: 'separator' },
  { type: 'link', id: 'dentist', label: 'dentist', path: '/dentist', color: '#1D9E75' },
  { type: 'link', id: 'lab', label: 'lab', path: '/lab', color: '#EF9F27' },
  { type: 'separator' },
  { type: 'link', id: 'editor', label: 'Edit Mode', path: '/editor', color: '#F59E0B' },
];

export function PortalBar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    // For academic sub-routes, match exact prefix
    if (path === '/academic') return pathname === '/academic' || (pathname.startsWith('/academic/') && !pathname.startsWith('/academic/professor') && !pathname.startsWith('/academic/assistant') && !pathname.startsWith('/academic/student'));
    return pathname.startsWith(path);
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[2000] flex items-center px-[14px] h-[38px] overflow-x-auto gap-[1px]"
      style={{
        background: 'var(--portal-bar-bg, #0A0F0D)',
        borderBottom: '1px solid var(--portal-bar-border, rgba(29,158,117,0.2))',
        scrollbarWidth: 'none',
      }}
    >
      {/* Logo — hexagonal TF mark */}
      <Link
        href="/"
        className="flex items-center gap-[6px] mr-[10px] whitespace-nowrap flex-shrink-0 no-underline"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
          <path d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z" fill="var(--portal-bar-accent, #1D9E75)" opacity="0.9"/>
          <path d="M12 7C10.2 7 9 8.4 9 10.25C9 12 9.9 12.85 10.15 14H13.85C14.1 12.85 15 12 15 10.25C15 8.4 13.8 7 12 7Z" fill="white" opacity=".95"/>
          <path d="M10.15 14H13.85V15.4C13.85 15.55 13.75 15.65 13.6 15.65H10.4C10.25 15.65 10.15 15.55 10.15 15.4V14Z" fill="white" opacity=".6"/>
        </svg>
        <span
          className="text-[13px] font-bold tracking-[0.04em]"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--portal-bar-accent, #5DCAA5)',
          }}
        >
          TF
        </span>
      </Link>

      {PORTALS.map((entry, i) => {
        if (entry.type === 'separator') {
          return (
            <div
              key={`sep-${i}`}
              className="h-[16px] w-[1px] mx-[6px] flex-shrink-0"
              style={{ background: 'var(--portal-bar-border, rgba(29,158,117,0.2))' }}
            />
          );
        }

        const portal = entry;
        const active = isActive(portal.path);
        const isEditor = portal.id === 'editor';

        return (
          <Link
            key={portal.id}
            href={portal.path}
            className="flex items-center gap-[5px] px-[11px] h-[38px] text-[11px] border-b-2 whitespace-nowrap flex-shrink-0 transition-all duration-150 no-underline"
            style={{
              fontFamily: 'var(--font-mono)',
              color: active
                ? 'var(--portal-bar-active, #5DCAA5)'
                : isEditor
                  ? '#F59E0B'
                  : 'var(--portal-bar-text, rgba(255,255,255,0.4))',
              borderBottomColor: active
                ? 'var(--portal-bar-active, #5DCAA5)'
                : 'transparent',
              paddingLeft: portal.indent ? '6px' : undefined,
              fontSize: portal.indent ? '10px' : undefined,
              opacity: portal.indent && !active ? 0.6 : undefined,
              ...(isEditor && !active ? { background: 'rgba(245,158,11,0.08)', borderRadius: '4px 4px 0 0' } : {}),
              marginLeft: isEditor ? 'auto' : undefined,
            }}
          >
            <span
              className="rounded-full flex-shrink-0"
              style={{
                background: portal.color,
                width: portal.indent ? '4px' : '5px',
                height: portal.indent ? '4px' : '5px',
              }}
            />
            {portal.label}
          </Link>
        );
      })}
    </div>
  );
}
