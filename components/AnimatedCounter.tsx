
import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  target: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  
  // Parse target string
  const match = target.match(/(\d+\.?\d*)/);
  const numericValue = match ? parseFloat(match[0]) : 0;
  const prefix = target.split(match ? match[0] : '')[0] || '';
  const suffix = target.split(match ? match[0] : '')[1] || '';
  const decimalPlaces = match && match[0].includes('.') ? match[0].split('.')[1].length : 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Run once
        }
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Ease out quart function for smooth deceleration
      const ease = 1 - Math.pow(1 - percentage, 4);
      
      setCount(numericValue * ease);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, numericValue, duration]);

  return (
    <span ref={elementRef} className="tabular-nums inline-block">
      {prefix}
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces
      })}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
