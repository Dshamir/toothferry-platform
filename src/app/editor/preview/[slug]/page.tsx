'use client';

import { Render } from '@puckeditor/core';
import { useParams } from 'next/navigation';
import { puckConfig } from '@/lib/puck-config';
import { useEditorStore } from '@/store/editor-store';
import { PortalBar } from '@/components/layout/PortalBar';

export default function EditorPreviewSlugPage() {
  const { slug } = useParams<{ slug: string }>();
  const { getPage, pageMeta } = useEditorStore();
  const data = getPage(slug);
  const meta = pageMeta[slug];

  return (
    <>
      <PortalBar />
      <div style={{ paddingTop: 'var(--portal-bar-height, 38px)', minHeight: '100dvh' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
          {data ? (
            <>
              {meta && (
                <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                    {meta.title}
                  </h1>
                  <a
                    href={`/editor/${slug}`}
                    style={{ fontSize: 13, fontWeight: 600, color: '#F59E0B', textDecoration: 'none' }}
                  >
                    Edit this page
                  </a>
                </div>
              )}
              <Render config={puckConfig} data={data} />
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--color-text-secondary)' }}>
              <p style={{ fontSize: 18, marginBottom: 8 }}>Page not found.</p>
              <p style={{ fontSize: 14 }}>
                Go to the <a href="/editor" style={{ color: 'var(--color-action-bg)', textDecoration: 'underline' }}>Editor</a> to create a page.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
