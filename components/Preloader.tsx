import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete?: () => void;
  minDuration?: number; // duration in ms
}

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  minDuration = 1800
}) => {
  const [progress, setProgress] = useState(15);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Smooth progress increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(interval);
          return 100;
        }
        const step = prev > 70 ? 8 : Math.floor(Math.random() * 7) + 5;
        return Math.min(100, prev + step);
      });
    }, 70);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 400);
      }, 250);
    }, minDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="bizskoop-preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.02,
            filter: 'blur(4px)',
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[9999999] flex flex-col items-center justify-center bg-white overflow-hidden select-none"
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999999 }}
        >
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] bg-gradient-to-tr from-blue-50/70 via-amber-50/40 to-slate-50/60 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-royal-blue/5 rounded-full blur-[90px]" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/10 rounded-full blur-[90px]" />
          </div>

          {/* Center Content Container */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-md w-full">
            
            {/* Animated Logo Container with Glow Rings */}
            <div className="relative mb-8 flex items-center justify-center">
              {/* Outer Pulsing Aura Ring */}
              <motion.div
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.35, 0.7, 0.35]
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-gold/40 bg-gradient-to-tr from-gold/10 via-transparent to-royal-blue/10"
              />

              {/* Second Rotating Subtle Dash Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-dashed border-slate-200"
              />

              {/* Logo Card with Gloss Effect */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-white/90 backdrop-blur-md px-6 py-5 sm:px-8 sm:py-6 rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,51,102,0.12)] border border-slate-100 flex items-center justify-center overflow-hidden"
              >
                {/* Shimmer Light Sweep */}
                <motion.div
                  animate={{ x: ['-150%', '200%'] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-25deg] pointer-events-none z-20"
                />

                <img
                  src="/logo-cmyk.png"
                  alt="Bizskoop"
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain relative z-10"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== '/Logo CMYK.png') {
                      target.src = '/Logo CMYK.png';
                    }
                  }}
                />
              </motion.div>
            </div>

            {/* Subtitle / Status Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 mb-2">
                <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                <span className="text-[11px] sm:text-xs font-black tracking-wider text-royal-blue uppercase">
                  Corporate Launchpad Malaysia
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-500">
                SSM &bull; ESD Expatriate Visas &bull; LHDN Tax Compliance
              </p>
            </motion.div>

            {/* Custom Progress Bar */}
            <div className="w-56 sm:w-64">
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden relative shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-royal-blue via-gold to-royal-blue rounded-full relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/70 blur-[2px]" />
                </motion.div>
              </div>

              {/* Percentage Counter */}
              <div className="flex justify-between items-center mt-2 px-0.5 text-[10px] sm:text-xs font-bold text-slate-400">
                <span className="tracking-widest uppercase text-slate-400">Loading</span>
                <span className="text-royal-blue font-black">{progress}%</span>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
