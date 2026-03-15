interface PulsingDotProps {
  color?: string;
  size?: number;
}

export function PulsingDot({ color = '#3FB950', size = 8 }: PulsingDotProps) {
  return (
    <span
      className="inline-block rounded-full animate-blink flex-shrink-0"
      style={{ width: size, height: size, background: color }}
    />
  );
}
