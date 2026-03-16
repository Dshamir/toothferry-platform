'use client';

import { Render } from '@puckeditor/core';
import { puckConfig } from '@/lib/puck-config';
import { useEditorStore } from '@/store/editor-store';

interface EditablePortalPageProps {
  slug: string;
  children: React.ReactNode;
}

export function EditablePortalPage({ slug, children }: EditablePortalPageProps) {
  const { pages, deletePage } = useEditorStore();
  const puckData = pages[slug] ?? null;

  if (!puckData) return <>{children}</>;

  return (
    <div style={{ position: 'relative', minHeight: '100dvh' }}>
      {/* Floating indicator */}
      <div
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'rgba(0,0,0,0.85)',
          color: '#fff',
          fontSize: 12,
          fontWeight: 600,
          padding: '8px 16px',
          borderRadius: 8,
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
        Edited via Puck
        <button
          onClick={() => deletePage(slug)}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            color: '#fff',
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 10px',
            borderRadius: 4,
            cursor: 'pointer',
            marginLeft: 4,
          }}
        >
          Reset
        </button>
      </div>

      {/* Puck-rendered content */}
      <div style={{ padding: 32 }}>
        <Render config={puckConfig} data={puckData} />
      </div>
    </div>
  );
}
