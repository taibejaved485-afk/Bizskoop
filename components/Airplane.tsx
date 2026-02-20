
import React from 'react';
import { Plane } from 'lucide-react';

const Airplane: React.FC<{ size?: number; color?: string }> = ({ size = 48, color = "#D4AF37" }) => {
  return (
    <div className="plane-wrapper">
      <Plane size={size} color={color} fill={color} fillOpacity={0.2} strokeWidth={1.5} />
    </div>
  );
};

export default Airplane;
