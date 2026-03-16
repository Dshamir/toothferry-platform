'use client';

import { useRouter } from 'next/navigation';
import { useEditorStore } from '@/store/editor-store';
import { PORTAL_PAGES } from '@/lib/portal-pages';
import { PortalBar } from '@/components/layout/PortalBar';

export default function EditorDashboard() {
  const router = useRouter();
  const { pages, pageMeta, deletePage } = useEditorStore();

  return (
    <>
      <PortalBar />
      <div style={{ paddingTop: 'var(--portal-bar-height, 38px)', minHeight: '100dvh', background: 'var(--color-bg-base, #f8f9fa)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', marginBottom: 6 }}>
            Page Editor
          </h1>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 36 }}>
            Select a portal page to edit with the visual drag-and-drop editor.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PORTAL_PAGES.map((portal) => {
              const hasEdits = !!pages[portal.slug];
              const meta = pageMeta[portal.slug];

              return (
                <div
                  key={portal.slug}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    background: 'var(--card-bg, white)',
                    border: '1px solid var(--color-border-subtle)',
                    borderLeft: `4px solid ${portal.color}`,
                    borderRadius: 10, padding: '16px 20px',
                  }}
                >
                  {/* Color dot + info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        {portal.title}
                      </span>
                      <span style={{
                        fontSize: 11, fontFamily: 'var(--font-mono)',
                        color: 'var(--color-text-secondary)', background: 'var(--p-slate-100, #f1f5f9)',
                        padding: '2px 8px', borderRadius: 4,
                      }}>
                        {portal.path}
                      </span>
                      {hasEdits && (
                        <span style={{
                          fontSize: 10, fontWeight: 600, color: '#16a34a',
                          background: '#dcfce7', padding: '2px 8px', borderRadius: 4,
                        }}>
                          edited
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                      {portal.description}
                    </div>
                    {meta && (
                      <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 4 }}>
                        Last saved: {new Date(meta.updatedAt).toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {hasEdits && (
                    <>
                    <button
                      onClick={() => {
                        if (confirm(`Reset "${portal.title}" to its default layout?`)) {
                          deletePage(portal.slug);
                        }
                      }}
                      style={{
                        height: 36, padding: '0 16px', fontSize: 12, fontWeight: 600,
                        background: 'transparent', color: 'var(--p-slate-500, #64748b)',
                        border: '1px solid var(--color-border-subtle)', borderRadius: 6, cursor: 'pointer',
                      }}
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => router.push(`/editor/preview/${portal.slug}`)}
                      style={{
                        height: 36, padding: '0 16px', fontSize: 12, fontWeight: 600,
                        background: 'var(--p-slate-100, #f1f5f9)', color: 'var(--p-slate-600, #475569)',
                        border: 'none', borderRadius: 6, cursor: 'pointer',
                      }}
                    >
                      Preview
                    </button>
                    </>
                  )}
                  <button
                    onClick={() => router.push(`/editor/${portal.slug}`)}
                    style={{
                      height: 36, padding: '0 20px', fontSize: 12, fontWeight: 600,
                      background: portal.color, color: '#fff',
                      border: 'none', borderRadius: 6, cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {hasEdits ? 'Edit' : 'Start Editing'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
