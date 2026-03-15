export interface ServiceStatus {
  name: string;
  endpoint: string;
  status: 'operational' | 'degraded' | 'down';
  latency: number;
  uptime: number;
  lastChecked: Date;
}

export const SEED_SERVICES: ServiceStatus[] = [
  { name: 'API Gateway', endpoint: 'api.toothferry.ai', status: 'operational', latency: 12, uptime: 99.99, lastChecked: new Date() },
  { name: 'AI Inference', endpoint: 'inference.toothferry.ai', status: 'operational', latency: 94, uptime: 99.97, lastChecked: new Date() },
  { name: 'STL Storage', endpoint: 's3.toothferry.ai', status: 'operational', latency: 8, uptime: 99.99, lastChecked: new Date() },
  { name: 'Auth Service', endpoint: 'auth.toothferry.ai', status: 'operational', latency: 15, uptime: 99.98, lastChecked: new Date() },
  { name: 'Notification Hub', endpoint: 'notify.toothferry.ai', status: 'operational', latency: 22, uptime: 99.95, lastChecked: new Date() },
  { name: 'Webhook Relay', endpoint: 'hooks.toothferry.ai', status: 'operational', latency: 18, uptime: 99.96, lastChecked: new Date() },
  { name: 'Analytics Pipeline', endpoint: 'analytics.toothferry.ai', status: 'operational', latency: 45, uptime: 99.92, lastChecked: new Date() },
];
