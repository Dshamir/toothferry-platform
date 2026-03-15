'use client';

import { PageTransition } from '@/components/animation/PageTransition';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { SEED_ROLES } from '@/data/roles';

const allPermissions = [
  'lab.*', 'lab.orders', 'lab.review', 'lab.milling',
  'dentist.*', 'cases.own',
  'billing.*', 'orders.*',
  'academic.*', 'academic.modules', 'academic.self-eval', 'students.*',
  '*.read', '*',
];

function hasPermission(rolePermissions: string[], permission: string): boolean {
  if (rolePermissions.includes('*')) return true;
  if (rolePermissions.includes(permission)) return true;
  const domain = permission.split('.')[0];
  if (rolePermissions.includes(`${domain}.*`)) return true;
  return false;
}

export default function RolesPage() {
  return (
    <PageTransition>
      <div data-portal="admin" className="min-h-screen bg-[var(--color-bg-page)] p-8">
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
            Roles & Permissions
          </h1>
          <p className="text-[15px] text-[var(--color-text-secondary)] mt-1">
            Permission matrix for all platform roles
          </p>
        </div>

        <StaggerChildren>
          {/* Role Summary Cards */}
          <StaggerItem>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {SEED_ROLES.map((role) => (
                <Card key={role.id} className="text-center">
                  <div className="text-[24px] font-bold text-[var(--color-heading-brand)]" style={{ fontFamily: 'var(--font-display)' }}>
                    {role.userCount}
                  </div>
                  <div className="text-[13px] font-semibold text-[var(--color-text-primary)] mt-1">{role.name}</div>
                  <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">{role.description}</div>
                </Card>
              ))}
            </div>
          </StaggerItem>

          {/* Permission Matrix */}
          <StaggerItem>
            <Card padding={false}>
              <div className="p-5 pb-0">
                <CardHeader>
                  <CardTitle>Permission Matrix</CardTitle>
                  <Badge variant="info">{SEED_ROLES.length} roles &middot; {allPermissions.length} permissions</Badge>
                </CardHeader>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[var(--color-bg-sunken)]">
                      <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider sticky left-0 bg-[var(--color-bg-sunken)] z-10 min-w-[180px]">
                        Permission
                      </th>
                      {SEED_ROLES.map((role) => (
                        <th key={role.id} className="text-center px-3 py-2.5 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider min-w-[100px]">
                          {role.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {allPermissions.map((perm) => (
                      <tr key={perm} className="border-t border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-sunken)] transition-colors">
                        <td className="px-4 py-2.5 text-[12px] text-[var(--color-text-primary)] sticky left-0 bg-[var(--card-bg,var(--p-white))] z-10" style={{ fontFamily: 'var(--font-mono)' }}>
                          {perm}
                        </td>
                        {SEED_ROLES.map((role) => (
                          <td key={role.id} className="text-center px-3 py-2.5">
                            {hasPermission(role.permissions, perm) ? (
                              <span className="inline-block w-5 h-5 rounded-full bg-[var(--p-green-400)] text-white text-[11px] leading-5">
                                &#10003;
                              </span>
                            ) : (
                              <span className="inline-block w-5 h-5 rounded-full bg-[var(--color-border-subtle)] text-[11px] leading-5 text-[var(--color-text-tertiary)]">
                                &mdash;
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
