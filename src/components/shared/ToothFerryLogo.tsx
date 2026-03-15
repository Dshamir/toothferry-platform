interface LogoProps {
  size?: number;
  bgColor?: string;
  fgColor?: string;
}

/**
 * Hexagonal ToothFerry logo — tooth inside a hex shape.
 * Matches the ⬡ TF branding from the original platform.
 */
export function ToothFerryLogo({ size = 28, bgColor = '#1D9E75', fgColor = 'white' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z" fill={bgColor} opacity="0.9"/>
      <path d="M12 7C10.2 7 9 8.4 9 10.25C9 12 9.9 12.85 10.15 14H13.85C14.1 12.85 15 12 15 10.25C15 8.4 13.8 7 12 7Z" fill={fgColor} opacity=".95"/>
      <path d="M10.15 14H13.85V15.4C13.85 15.55 13.75 15.65 13.6 15.65H10.4C10.25 15.65 10.15 15.55 10.15 15.4V14Z" fill={fgColor} opacity=".6"/>
    </svg>
  );
}
