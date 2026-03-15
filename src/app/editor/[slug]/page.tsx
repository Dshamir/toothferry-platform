'use client';

import '@puckeditor/core/puck.css';
import { Puck } from '@puckeditor/core';
import type { Data } from '@puckeditor/core';
import { useParams } from 'next/navigation';
import { puckConfig } from '@/lib/puck-config';
import { useEditorStore } from '@/store/editor-store';
import { PORTAL_PAGES, getPortalSeed } from '@/lib/portal-pages';

export default function EditorSlugPage() {
  const { slug } = useParams<{ slug: string }>();
  const { getPage, savePage } = useEditorStore();

  const portal = PORTAL_PAGES.find((p) => p.slug === slug);
  const savedData = getPage(slug);
  const initialData = savedData ?? getPortalSeed(slug);

  const handlePublish = (data: Data) => {
    savePage(slug, data, portal?.title ?? slug);
  };

  return (
    <div style={{ height: '100dvh' }}>
      <Puck
        config={puckConfig}
        data={initialData}
        onPublish={handlePublish}
        headerPath="/editor"
      />
    </div>
  );
}
