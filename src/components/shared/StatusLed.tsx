interface StatusLedProps {
  status: 'ok' | 'warning' | 'error' | 'unknown';
  size?: number;
  pulse?: boolean;
}

const statusColors = {
  ok: '#3FB950',
  warning: '#E3B341',
  error: '#F85149',
  unknown: '#8B949E',
};

export function StatusLed({ status, size = 8, pulse = false }: StatusLedProps) {
  return (
    <span
      className={`inline-block rounded-full flex-shrink-0 ${pulse ? 'animate-pulse' : ''}`}
      style={{ width: size, height: size, background: statusColors[status] }}
    />
  );
}
