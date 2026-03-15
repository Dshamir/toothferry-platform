import type { Data } from '@puckeditor/core';

export interface PortalPage {
  slug: string;
  title: string;
  path: string;
  color: string;
  description: string;
}

export const PORTAL_PAGES: PortalPage[] = [
  { slug: 'landing', title: 'Landing Page', path: '/', color: '#5DCAA5', description: 'Marketing landing page — hero, pipeline, portals grid, founders' },
  { slug: 'operator', title: 'Operator / Platform', path: '/operator', color: '#534AB7', description: 'Real-time case routing dashboard with pipeline phases' },
  { slug: 'admin', title: 'Admin', path: '/admin', color: '#58A6FF', description: 'System health, service status, GPU & storage monitoring' },
  { slug: 'command', title: 'Command Center', path: '/command', color: '#3FB950', description: 'Live ops, KPIs with sparklines, event feed' },
  { slug: 'academic', title: 'Academic', path: '/academic', color: '#185FA5', description: 'University admin — students, modules, activity feed' },
  { slug: 'dentist', title: 'Dentist', path: '/dentist', color: '#1D9E75', description: 'Dentist dashboard — KPIs, pipeline status, recent cases' },
  { slug: 'lab', title: 'Lab', path: '/lab', color: '#EF9F27', description: 'Lab order queue, machine utilization, material inventory' },
];

/** Seed templates that match the existing portal page layouts */
export function getPortalSeed(slug: string): Data {
  switch (slug) {
    case 'landing':
      return {
        root: {},
        content: [
          { type: 'Heading', props: { text: 'ToothFerry AI', level: 'h1', id: 'h-1' } },
          { type: 'Paragraph', props: { text: 'AI-generated dental crowns in under two minutes. From scan to STL.', id: 'p-1' } },
          { type: 'Spacer', props: { height: 24, id: 's-1' } },
          { type: 'Columns', props: { columns: '3', id: 'c-1' } },
        ],
      };
    case 'operator':
      return {
        root: {},
        content: [
          { type: 'Heading', props: { text: 'Operator Dashboard', level: 'h2', id: 'h-1' } },
          { type: 'Paragraph', props: { text: 'Real-time case routing and pipeline monitoring.', id: 'p-1' } },
          { type: 'Spacer', props: { height: 16, id: 's-1' } },
          { type: 'Columns', props: { columns: '4', id: 'c-1' } },
        ],
      };
    case 'admin':
      return {
        root: {},
        content: [
          { type: 'Heading', props: { text: 'Admin Portal', level: 'h2', id: 'h-1' } },
          { type: 'Paragraph', props: { text: 'System health and infrastructure monitoring.', id: 'p-1' } },
          { type: 'Spacer', props: { height: 16, id: 's-1' } },
          { type: 'Columns', props: { columns: '4', id: 'c-1' } },
        ],
      };
    case 'command':
      return {
        root: {},
        content: [
          { type: 'Heading', props: { text: 'Command Center', level: 'h2', id: 'h-1' } },
          { type: 'Paragraph', props: { text: 'Live ops and business intelligence.', id: 'p-1' } },
          { type: 'Spacer', props: { height: 16, id: 's-1' } },
          { type: 'Columns', props: { columns: '4', id: 'c-1' } },
        ],
      };
    case 'academic':
      return {
        root: {},
        content: [
          { type: 'Heading', props: { text: 'Academic Portal', level: 'h2', id: 'h-1' } },
          { type: 'Paragraph', props: { text: 'University training and curriculum dashboard.', id: 'p-1' } },
          { type: 'Spacer', props: { height: 16, id: 's-1' } },
          { type: 'Columns', props: { columns: '4', id: 'c-1' } },
          { type: 'Spacer', props: { height: 16, id: 's-2' } },
          { type: 'Columns', props: { columns: '3', id: 'c-2' } },
        ],
      };
    case 'dentist':
      return {
        root: {},
        content: [
          { type: 'Heading', props: { text: 'Dentist Dashboard', level: 'h2', id: 'h-1' } },
          { type: 'Paragraph', props: { text: 'Case management, pipeline status, and prep quality scoring.', id: 'p-1' } },
          { type: 'Spacer', props: { height: 16, id: 's-1' } },
          { type: 'Columns', props: { columns: '4', id: 'c-1' } },
        ],
      };
    case 'lab':
      return {
        root: {},
        content: [
          { type: 'Heading', props: { text: 'Lab Portal', level: 'h2', id: 'h-1' } },
          { type: 'Paragraph', props: { text: 'Order queue, machine utilization, and material inventory.', id: 'p-1' } },
          { type: 'Spacer', props: { height: 16, id: 's-1' } },
          { type: 'Columns', props: { columns: '4', id: 'c-1' } },
        ],
      };
    default:
      return { root: {}, content: [] };
  }
}
