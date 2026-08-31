import React from 'react';

interface SectionDividerProps {
  variant?: 'gold' | 'blue' | 'subtle' | 'gradient';
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ 
  variant = 'gold',
  className = ''
}) => {
  return (
    <div className={`w-full relative flex items-center justify-center py-2 overflow-hidden ${className}`}>
      {/* Background Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent relative">
        {variant === 'gold' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        )}
        {variant === 'blue' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-royal-blue/40 to-transparent" />
        )}
        {variant === 'gradient' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold via-royal-blue to-transparent opacity-60" />
        )}
      </div>

      {/* Center Decorative Emblem */}
      <div className="absolute flex items-center justify-center gap-2 px-4 bg-white">
        <span className="w-1.5 h-1.5 rotate-45 bg-gold/60 rounded-[0.5px]"></span>
        <span className="w-2.5 h-2.5 rotate-45 bg-royal-blue rounded-sm shadow-sm flex items-center justify-center">
          <span className="w-1 h-1 bg-gold rounded-full"></span>
        </span>
        <span className="w-1.5 h-1.5 rotate-45 bg-gold/60 rounded-[0.5px]"></span>
      </div>
    </div>
  );
};

export default SectionDivider;
