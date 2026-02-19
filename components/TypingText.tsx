
import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 30, delay = 500, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

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
    <span className={className}>
      {displayedText}
      {displayedText.length < text.length && (
        <span className="animate-pulse border-r-2 border-royal-blue ml-1"></span>
      )}
    </span>
  );
};

export default TypingText;
