'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export interface SidebarItem {
  label: string;
  icon: string;
  path: string;
  badge?: string | number;
  badgeColor?: 'default' | 'red' | 'green' | 'amber';
}

interface SidebarProps {
  sections: SidebarSection[];
}

const badgeColors: Record<string, string> = {
  default: 'bg-[var(--color-border-default)] text-[var(--color-text-secondary)]',
  red: 'bg-[rgba(226,75,74,0.1)] text-[#E24B4A]',
  green: 'bg-[rgba(29,158,117,0.1)] text-[#0F6E56]',
  amber: 'bg-[#FAEEDA] text-[#854F0B]',
};

export function Sidebar({ sections }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="w-[210px] min-w-[210px] py-4 hidden lg:block overflow-y-auto h-[calc(100vh-38px-54px)]"
      style={{
        background: 'var(--sidebar-bg, var(--color-bg-surface, white))',
        borderRight: '1px solid var(--color-border-subtle)',
      }}
    >
      {sections.map((section, si) => (
        <div key={si}>
          {si > 0 && <div className="h-px my-2" style={{ background: 'var(--color-border-subtle)' }} />}
          <div
            className="text-[9px] tracking-[0.1em] uppercase px-[14px] pb-[6px] mt-[14px] first:mt-0"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--sidebar-label, var(--color-text-secondary))' }}
          >
            {section.title}
          </div>
          {section.items.map((item) => {
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center gap-[9px] py-[9px] px-[14px] text-[12px] border-l-2 transition-all duration-100 no-underline"
                style={{
                  background: active ? 'var(--sidebar-active-bg, var(--brand-50, rgba(37,99,235,0.07)))' : 'transparent',
                  color: active
                    ? 'var(--sidebar-active-text, var(--color-action-bg))'
                    : 'var(--sidebar-text, var(--color-text-secondary))',
                  fontWeight: active ? 500 : 400,
                  borderLeftColor: active ? 'var(--sidebar-active-text, var(--color-action-bg))' : 'transparent',
                }}
              >
                <span className="w-[16px] text-center text-[13px] flex-shrink-0">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge !== undefined && (
                  <span className={`ml-auto rounded-lg px-[6px] py-[1px] text-[9px] ${badgeColors[item.badgeColor || 'default']}`} style={{ fontFamily: 'var(--font-mono)' }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
