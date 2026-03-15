'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface TopNavTab {
  label: string;
  path: string;
}

interface TopNavProps {
  portalName: string;
  portalLabel: string;
  portalColor: string;
  tabs: TopNavTab[];
  avatarInitials?: string;
  avatarColor?: string;
  rightSlot?: React.ReactNode;
  accountName?: string;
  accountDomain?: string;
}

export function TopNav({ portalName, portalLabel, portalColor, tabs, avatarInitials = 'DC', avatarColor, rightSlot, accountName, accountDomain }: TopNavProps) {
  const pathname = usePathname();

  return (
    <div
      className="flex items-center px-5 h-[54px] sticky top-[38px] z-[100]"
      style={{
        background: 'var(--topnav-bg, var(--color-bg-surface, white))',
        borderBottom: '1px solid var(--color-border-subtle)',
        boxShadow: 'var(--topnav-shadow, var(--shadow-card))',
      }}
    >
      {/* Logo + portal label + account identity */}
      <div className="flex items-center gap-2 mr-5">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z" fill={portalColor} opacity="0.9"/>
          <path d="M12 7C10.2 7 9 8.4 9 10.25C9 12 9.9 12.85 10.15 14H13.85C14.1 12.85 15 12 15 10.25C15 8.4 13.8 7 12 7Z" fill="white" opacity=".95"/>
          <path d="M10.15 14H13.85V15.4C13.85 15.55 13.75 15.65 13.6 15.65H10.4C10.25 15.65 10.15 15.55 10.15 15.4V14Z" fill="white" opacity=".6"/>
        </svg>
        <div className="flex flex-col">
          <div className="flex items-center gap-[6px]">
            <span
              className="text-[15px] font-extrabold"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--topnav-title, var(--color-text-primary))',
              }}
            >
              ToothFerry
            </span>
            <span
              className="text-[10px] rounded px-[7px] py-[1px]"
              style={{
                fontFamily: 'var(--font-mono)',
                background: `${portalColor}18`,
                color: portalColor,
              }}
            >
              {portalLabel}
            </span>
          </div>
          {(accountName || accountDomain) && (
            <div className="flex items-center gap-[6px] mt-[-2px]">
              {accountName && (
                <span className="text-[10px] font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                  {accountName}
                </span>
              )}
              {accountDomain && (
                <span
                  className="text-[9px]"
                  style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)', opacity: 0.6 }}
                >
                  {accountDomain}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-1 h-full overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {tabs.map((tab) => {
          const active = pathname === tab.path;
          return (
            <Link
              key={tab.path}
              href={tab.path}
              className="flex items-center px-[14px] h-[54px] text-[12px] border-b-2 whitespace-nowrap transition-all no-underline"
              style={{
                color: active
                  ? 'var(--topnav-tab-active, var(--color-action-bg))'
                  : 'var(--topnav-tab, var(--color-text-secondary))',
                borderBottomColor: active
                  ? 'var(--topnav-tab-active, var(--color-action-bg))'
                  : 'transparent',
                fontWeight: active ? 500 : 400,
              }}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-[10px] ml-auto">
        {rightSlot}
      </div>
      <div className="flex items-center gap-[10px] ml-2">
        <div
          className="w-7 h-7 rounded-[7px] flex items-center justify-center text-[13px] cursor-pointer relative"
          style={{
            background: 'var(--topnav-icon-bg, var(--color-bg-sunken))',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          🔔
          <span className="absolute top-1 right-1 w-[5px] h-[5px] rounded-full bg-[#E24B4A]" />
        </div>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white flex-shrink-0"
          style={{ background: avatarColor || portalColor, fontFamily: 'var(--font-display)' }}
        >
          {avatarInitials}
        </div>
      </div>
    </div>
  );
}
