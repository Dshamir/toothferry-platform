interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  rounded?: boolean;
}

export function Skeleton({ width, height = 20, className = '', rounded = false }: SkeletonProps) {
  return (
    <div
      className={`bg-[var(--skeleton-bg)] animate-pulse ${rounded ? 'rounded-full' : 'rounded-[var(--radius-md)]'} ${className}`}
      style={{ width, height }}
    />
  );
}
