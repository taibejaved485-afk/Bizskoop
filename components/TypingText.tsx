
import React, { useState, useEffect, useRef } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  triggerOnView?: boolean;
  start?: boolean;
}

const TypingText: React.FC<TypingTextProps> = ({ 
  text, 
  speed = 30, 
  delay = 500, 
  className = "",
  triggerOnView = true,
  start = false
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (start) {
      setIsVisible(true);
      return;
    }

    if (!triggerOnView) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [triggerOnView]);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, isVisible]);

  useEffect(() => {
    if (!started) return;

    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [displayedText, text, speed, started]);

  return (
    <span ref={elementRef} className={className}>
      {displayedText}
      {displayedText.length < text.length && (
        <span className="animate-pulse border-r-2 border-royal-blue ml-1"></span>
      )}
    </span>
  );
};

export default TypingText;
