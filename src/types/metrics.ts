export interface SystemMetric {
  label: string;
  value: string | number;
  unit?: string;
  status: 'ok' | 'warning' | 'error';
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
}

export interface ServiceHealth {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  latency?: number;
  uptime: number;
  lastChecked: Date;
}

export interface GpuUtilization {
  id: string;
  name: string;
  utilization: number;
  memory: number;
  temperature: number;
}

export interface RevenueMetric {
  label: string;
  value: number;
  currency: string;
  period: string;
  trend: number; // percentage change
}
