export type PortalId = 'landing' | 'operator' | 'dentist' | 'lab' | 'academic' | 'admin' | 'command';

export interface PortalConfig {
  id: PortalId;
  label: string;
  shortLabel: string;
  path: string;
  color: string;
  dotColor: string;
  dataPortal?: string; // for CSS data-portal attribute
  icon: string; // emoji
  description: string;
}
