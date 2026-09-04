import React from 'react';

interface BizskoopLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'original'; // 'dark' = navy on light bg, 'light' = white on dark bg
  subtitle?: string;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BizskoopLogo: React.FC<BizskoopLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md'
}) => {
  const isLight = variant === 'light';

  // Height sizing tailored for wide landscape aspect ratio
  const sizeClasses = {
    sm: 'h-6 sm:h-7',
    md: 'h-7 sm:h-8',
    lg: 'h-8 sm:h-9 md:h-10',
    xl: 'h-10 sm:h-12',
  }[size];

  const logoSrc = isLight ? '/logo-cmyk-white.png' : '/logo-cmyk.png';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="BIZSKOOP"
        className={`${sizeClasses} w-auto max-w-[160px] sm:max-w-[200px] md:max-w-[220px] object-contain transition-transform duration-300 group-hover:scale-105`}
        loading="eager"
        onError={(e) => {
          // Fallback if needed
          const target = e.currentTarget;
          if (target.src !== '/Logo CMYK.png') {
            target.src = '/Logo CMYK.png';
          }
        }}
      />
    </div>
  );
};

export default BizskoopLogo;
