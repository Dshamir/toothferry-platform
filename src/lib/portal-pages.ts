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
  { slug: 'professor', title: 'Professor', path: '/academic/professor', color: '#6750D6', description: '5-axis evaluation, student review queue, assistant management' },
  { slug: 'assistant', title: 'Assistant', path: '/academic/assistant', color: '#0F6E56', description: 'Grade assigned students, submit evaluations for professor review' },
  { slug: 'student', title: 'Student', path: '/academic/student', color: '#C2185B', description: 'Submit scans, view scores, feedback inbox, transcript' },
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
          { type: 'Paragraph', props: { text: 'AI-generated dental crowns in under two minutes. From scan to STL — fully autonomous.', id: 'p-1' } },
          { type: 'Spacer', props: { height: 24, id: 's-1' } },
          { type: 'KpiCard', props: { label: 'Crowns Generated', value: 12400, delta: '+340 this week', deltaDirection: 'up', prefix: '', suffix: '', id: 'k-1' } },
          { type: 'KpiCard', props: { label: 'Avg Generation Time', value: 107, delta: '-12s vs last month', deltaDirection: 'up', prefix: '', suffix: 's', id: 'k-2' } },
          { type: 'KpiCard', props: { label: 'First-Pass Acceptance', value: 97, delta: '+1.2% QoQ', deltaDirection: 'up', prefix: '', suffix: '%', id: 'k-3' } },
          { type: 'Spacer', props: { height: 24, id: 's-2' } },
          { type: 'Paragraph', props: { text: '9 specialized portals — Dentist, Lab, Academic, Command Center, Admin, Operator, Professor, Assistant, and Student.', id: 'p-2' } },
        ],
      };
    case 'dentist':
      return {
        root: {},
        content: [
          { type: 'Heading', props: { text: 'Dentist Dashboard', level: 'h2', id: 'h-1' } },
          { type: 'Paragraph', props: { text: 'Case management, pipeline status, and prep quality scoring.', id: 'p-1' } },
          { type: 'Spacer', props: { height: 16, id: 's-1' } },
          { type: 'KpiCard', props: { label: 'Crowns / Month', value: 31, delta: '+4 vs last month', deltaDirection: 'up', prefix: '', suffix: '', id: 'k-1' } },
          { type: 'KpiCard', props: { label: 'Avg Design Time', value: 107, delta: '-12s improvement', deltaDirection: 'up', prefix: '', suffix: 's', id: 'k-2' } },
          { type: 'KpiCard', props: { label: 'First-Pass Acceptance', value: 97, delta: '+1.2%', deltaDirection: 'up', prefix: '', suffix: '%', id: 'k-3' } },
          { type: 'KpiCard', props: { label: 'Prep Quality Score', value: 3.1, delta: '+0.2 vs avg', deltaDirection: 'up', prefix: '', suffix: ' / 4', id: 'k-4' } },
          { type: 'Spacer', props: { height: 16, id: 's-2' } },
          { type: 'Badge', props: { variant: 'success', text: 'Pipeline Healthy', id: 'b-1' } },
        ],
      };
    case 'admin':
      return {
        root: {},
        content: [
          { type: 'Heading', props: { text: 'System Health', level: 'h2', id: 'h-1' } },
          { type: 'Paragraph', props: { text: 'Infrastructure monitoring and service status.', id: 'p-1' } },
          { type: 'Spacer', props: { height: 16, id: 's-1' } },
          { type: 'KpiCard', props: { label: 'API Health', value: 100, delta: 'All endpoints operational', deltaDirection: 'up', prefix: '', suffix: '%', id: 'k-1' } },
          { type: 'KpiCard', props: { label: 'AI Inference', value: 100, delta: 'MeshSegNet v2.3.1 online', deltaDirection: 'up', prefix: '', suffix: '%', id: 'k-2' } },
          { type: 'KpiCard', props: { label: 'Avg Latency', value: 94, delta: '-12ms from yesterday', deltaDirection: 'up', prefix: '', suffix: 'ms', id: 'k-3' } },
          { type: 'KpiCard', props: { label: 'Uptime (30d)', value: 99.97, delta: '8.6 min downtime', deltaDirection: 'neutral', prefix: '', suffix: '%', id: 'k-4' } },
          { type: 'Spacer', props: { height: 16, id: 's-2' } },
          { type: 'Heading', props: { text: 'Resource Usage', level: 'h3', id: 'h-2' } },
          { type: 'ProgressBar', props: { value: 62, color: '#58A6FF', height: 6, id: 'pb-1' } },
          { type: 'ProgressBar', props: { value: 45, color: '#3FB950', height: 6, id: 'pb-2' } },
          { type: 'ProgressBar', props: { value: 78, color: '#EF9F27', height: 6, id: 'pb-3' } },
        ],
      };
    case 'command':
      return {
        root: {},
        content: [
          { type: 'Heading', props: { text: 'Command Center', level: 'h2', id: 'h-1' } },
          { type: 'Paragraph', props: { text: 'Live ops and business intelligence.', id: 'p-1' } },
          { type: 'Spacer', props: { height: 16, id: 's-1' } },
          { type: 'KpiCard', props: { label: 'Crowns Processed', value: 1847, delta: '+23 today', deltaDirection: 'up', prefix: '', suffix: '', id: 'k-1' } },
          { type: 'KpiCard', props: { label: 'MRR', value: 61.2, delta: '+$4.8K MoM', deltaDirection: 'up', prefix: '$', suffix: 'K', id: 'k-2' } },
          { type: 'KpiCard', props: { label: 'Acceptance Rate', value: 93.8, delta: '-0.2% from target', deltaDirection: 'down', prefix: '', suffix: '%', id: 'k-3' } },
          { type: 'KpiCard', props: { label: 'Active Alerts', value: 3, delta: '1 critical', deltaDirection: 'down', prefix: '', suffix: '', id: 'k-4' } },
        ],
      };
    case 'academic':
      return {
        root: {},
        content: [
          { type: 'Heading', props: { text: 'Academic Portal', level: 'h2', id: 'h-1' } },
          { type: 'Paragraph', props: { text: 'University training and curriculum dashboard.', id: 'p-1' } },
          { type: 'Spacer', props: { height: 16, id: 's-1' } },
          { type: 'KpiCard', props: { label: 'Active Students', value: 124, delta: '+18 this semester', deltaDirection: 'up', prefix: '', suffix: '', id: 'k-1' } },
          { type: 'KpiCard', props: { label: 'Professors', value: 4, delta: 'McGill \u00b7 UdeM', deltaDirection: 'neutral', prefix: '', suffix: '', id: 'k-2' } },
          { type: 'KpiCard', props: { label: 'Avg Prep Score', value: 2.8, delta: '+0.3 vs last term', deltaDirection: 'up', prefix: '', suffix: ' / 4', id: 'k-3' } },
          { type: 'KpiCard', props: { label: 'Total Evaluations', value: 1204, delta: '312 this month', deltaDirection: 'up', prefix: '', suffix: '', id: 'k-4' } },
          { type: 'Spacer', props: { height: 16, id: 's-2' } },
          { type: 'Heading', props: { text: 'Training Modules', level: 'h3', id: 'h-2' } },
          { type: 'ProgressBar', props: { value: 78, color: '#185FA5', height: 6, id: 'pb-1' } },
          { type: 'ProgressBar', props: { value: 62, color: '#6750D6', height: 6, id: 'pb-2' } },
          { type: 'ProgressBar', props: { value: 45, color: '#0F6E56', height: 6, id: 'pb-3' } },
        ],
      };
    case 'professor':
      return {
        root: {},
        content: [
          { type: 'Heading', props: { text: 'Professor Portal', level: 'h2', id: 'h-1' } },
          { type: 'Paragraph', props: { text: '5-axis evaluation scoring, student review queue, and assistant management.', id: 'p-1' } },
          { type: 'Spacer', props: { height: 16, id: 's-1' } },
          { type: 'KpiCard', props: { label: 'My Students', value: 76, delta: 'Across 3 courses', deltaDirection: 'neutral', prefix: '', suffix: '', id: 'k-1' } },
          { type: 'KpiCard', props: { label: 'Class Average', value: 3.1, delta: '+0.2 vs last term', deltaDirection: 'up', prefix: '', suffix: ' / 4', id: 'k-2' } },
          { type: 'KpiCard', props: { label: 'Pending Reviews', value: 8, delta: '3 urgent', deltaDirection: 'down', prefix: '', suffix: '', id: 'k-3' } },
          { type: 'KpiCard', props: { label: 'Evals This Week', value: 24, delta: '+6 vs last week', deltaDirection: 'up', prefix: '', suffix: '', id: 'k-4' } },
        ],
      };
    case 'assistant':
      return {
        root: {},
        content: [
          { type: 'Heading', props: { text: 'Assistant Portal', level: 'h2', id: 'h-1' } },
          { type: 'Paragraph', props: { text: 'Grade assigned students and submit evaluations for professor review.', id: 'p-1' } },
          { type: 'Spacer', props: { height: 16, id: 's-1' } },
          { type: 'KpiCard', props: { label: 'Assigned Students', value: 2, delta: 'Active assignments', deltaDirection: 'neutral', prefix: '', suffix: '', id: 'k-1' } },
          { type: 'KpiCard', props: { label: 'Pending Reviews', value: 5, delta: '2 due today', deltaDirection: 'down', prefix: '', suffix: '', id: 'k-2' } },
          { type: 'KpiCard', props: { label: 'Awaiting Approval', value: 3, delta: 'Sent to professor', deltaDirection: 'neutral', prefix: '', suffix: '', id: 'k-3' } },
          { type: 'KpiCard', props: { label: 'Evals This Week', value: 12, delta: '+4 vs last week', deltaDirection: 'up', prefix: '', suffix: '', id: 'k-4' } },
        ],
      };
    case 'student':
      return {
        root: {},
        content: [
          { type: 'Heading', props: { text: 'Student Portal', level: 'h2', id: 'h-1' } },
          { type: 'Paragraph', props: { text: 'Submit prep scans, view scores and feedback, track module progress.', id: 'p-1' } },
          { type: 'Spacer', props: { height: 16, id: 's-1' } },
          { type: 'KpiCard', props: { label: 'Prep Score', value: 3.2, delta: '+0.4 improvement', deltaDirection: 'up', prefix: '', suffix: ' / 4', id: 'k-1' } },
          { type: 'KpiCard', props: { label: 'Total Evaluations', value: 12, delta: '3 this week', deltaDirection: 'up', prefix: '', suffix: '', id: 'k-2' } },
          { type: 'KpiCard', props: { label: 'Class Rank', value: 8, delta: 'Top 11%', deltaDirection: 'up', prefix: '', suffix: ' / 76', id: 'k-3' } },
          { type: 'KpiCard', props: { label: 'Streak', value: 5, delta: 'Consecutive submissions', deltaDirection: 'up', prefix: '', suffix: ' days', id: 'k-4' } },
          { type: 'Spacer', props: { height: 16, id: 's-2' } },
          { type: 'Heading', props: { text: 'Module Progress', level: 'h3', id: 'h-2' } },
          { type: 'ProgressBar', props: { value: 72, color: '#C2185B', height: 6, id: 'pb-1' } },
          { type: 'ProgressBar', props: { value: 58, color: '#6750D6', height: 6, id: 'pb-2' } },
          { type: 'ProgressBar', props: { value: 45, color: '#185FA5', height: 6, id: 'pb-3' } },
        ],
      };
    case 'operator':
      return {
        root: {},
        content: [
          { type: 'Heading', props: { text: 'Operator Dashboard', level: 'h2', id: 'h-1' } },
          { type: 'Paragraph', props: { text: 'Real-time case routing and pipeline monitoring.', id: 'p-1' } },
          { type: 'Spacer', props: { height: 16, id: 's-1' } },
          { type: 'KpiCard', props: { label: 'Active Cases', value: 8, delta: '3 high priority', deltaDirection: 'neutral', prefix: '', suffix: '', id: 'k-1' } },
          { type: 'KpiCard', props: { label: 'Completed Today', value: 2, delta: 'On track', deltaDirection: 'up', prefix: '', suffix: '', id: 'k-2' } },
          { type: 'KpiCard', props: { label: 'Flagged', value: 1, delta: 'Needs attention', deltaDirection: 'down', prefix: '', suffix: '', id: 'k-3' } },
          { type: 'KpiCard', props: { label: 'Avg Confidence', value: 94, delta: '+2% this week', deltaDirection: 'up', prefix: '', suffix: '%', id: 'k-4' } },
        ],
      };
    case 'lab':
      return {
        root: {},
        content: [
          { type: 'Heading', props: { text: 'Lab Portal', level: 'h2', id: 'h-1' } },
          { type: 'Paragraph', props: { text: 'Order queue, machine utilization, and material inventory.', id: 'p-1' } },
          { type: 'Spacer', props: { height: 16, id: 's-1' } },
          { type: 'KpiCard', props: { label: 'Orders Today', value: 7, delta: '+2 vs yesterday', deltaDirection: 'up', prefix: '', suffix: '', id: 'k-1' } },
          { type: 'KpiCard', props: { label: 'Crowns / Month', value: 324, delta: '+18% MoM', deltaDirection: 'up', prefix: '', suffix: '', id: 'k-2' } },
          { type: 'KpiCard', props: { label: 'CAD Time Saved', value: 28, delta: 'Per crown avg', deltaDirection: 'up', prefix: '', suffix: 'min', id: 'k-3' } },
          { type: 'KpiCard', props: { label: 'Monthly Savings', value: 15.5, delta: '+$2.1K vs last month', deltaDirection: 'up', prefix: '$', suffix: 'K', id: 'k-4' } },
          { type: 'Spacer', props: { height: 16, id: 's-2' } },
          { type: 'Heading', props: { text: 'Machine Utilization', level: 'h3', id: 'h-2' } },
          { type: 'ProgressBar', props: { value: 85, color: '#EF9F27', height: 6, id: 'pb-1' } },
          { type: 'ProgressBar', props: { value: 72, color: '#3FB950', height: 6, id: 'pb-2' } },
          { type: 'ProgressBar', props: { value: 58, color: '#58A6FF', height: 6, id: 'pb-3' } },
        ],
      };
    default:
      return { root: {}, content: [] };
  }
}
