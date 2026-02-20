
import React from 'react';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlowCard: React.FC<GlowCardProps> = ({ children, className = "" }) => {
  return (
    <div className={`ms-glow-card ${className}`}>
      <div className="ms-glow-content">
        {children}
      </div>
    </div>
  );
};

export default GlowCard;
