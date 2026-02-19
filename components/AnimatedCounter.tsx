
import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  target: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ target, duration = 2000 }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  
  // Parse the target string to find the numeric part and decimals
  const match = target.match(/(\d+\.?\d*)/);
  const numericValue = match ? parseFloat(match[0]) : 0;
  const prefix = target.split(match ? match[0] : '')[0] || '';
  const suffix = target.split(match ? match[0] : '')[1] || '';
  
  // Determine decimal places
  const decimalMatch = match ? match[0].split('.') : [];
  const decimalPlaces = decimalMatch.length > 1 ? decimalMatch[1].length : 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Cubic Out Easing
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = easeProgress * numericValue;
      
      setDisplayValue(currentCount.toLocaleString(undefined, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces
      }));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [numericValue, duration, isVisible, decimalPlaces]);

  return (
    <span ref={countRef}>
      {prefix}{displayValue}{suffix}
    </span>
  );
};

export default AnimatedCounter;
