import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onLoadingComplete, 900);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Blueprint Grid Background */}
          <div className="absolute inset-0 blueprint-grid opacity-20" />
          
          {/* Main Animation Container */}
          <div className="relative">
            {/* Outer Gear */}
            <motion.svg
              className="w-32 h-32 text-primary"
              viewBox="0 0 100 100"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <g fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="50" cy="50" r="35" strokeDasharray="8 4" />
                {[...Array(12)].map((_, i) => (
                  <rect
                    key={i}
                    x="47"
                    y="8"
                    width="6"
                    height="10"
                    rx="1"
                    fill="currentColor"
                    transform={`rotate(${i * 30} 50 50)`}
                  />
                ))}
              </g>
            </motion.svg>

            {/* Inner Gear (Counter-rotating) */}
            <motion.svg
              className="absolute inset-0 w-32 h-32 text-primary/60"
              viewBox="0 0 100 100"
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <g fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="50" cy="50" r="20" />
                {[...Array(8)].map((_, i) => (
                  <rect
                    key={i}
                    x="48"
                    y="25"
                    width="4"
                    height="8"
                    rx="1"
                    fill="currentColor"
                    transform={`rotate(${i * 45} 50 50)`}
                  />
                ))}
              </g>
            </motion.svg>

            {/* Center Circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-8 h-8 rounded-full bg-primary"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Blueprint Line Drawing Animation */}
          <motion.svg
            className="absolute w-[80%] h-[60%] text-primary/60"
            viewBox="0 0 400 300"
          >
            <motion.path
              d="M20 150 L80 150 L100 100 L150 100 L170 150 L230 150 L250 80 L300 80 L320 150 L380 150"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M20 200 L100 200 L120 170 L180 170 L200 200 L280 200 L300 180 L380 180"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.svg>

          {/* Progress Bar */}
          <div className="mt-12 w-64 relative">
            {/* Measurement Ticks */}
            <div className="flex justify-between mb-2 px-1">
              {[0, 25, 50, 75, 100].map((tick) => (
                <div key={tick} className="flex flex-col items-center">
                  <div className="w-px h-2 bg-primary/90" />
                  <span className="text-[10px] text-muted-foreground/50 font-mono mt-1">
                    {tick}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Progress Track */}
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>

          {/* Company Name */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl font-bold text-foreground tracking-wide">
              AL MULLA
            </h1>
            <p className="text-sm text-muted-foreground tracking-[0.3em] mt-1">
              ENGINEERING
            </p>
          </motion.div>

          <>
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary opacity-20" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary opacity-20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary opacity-20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary opacity-20" />
      </>
          
        </motion.div>
      )}
     
    </AnimatePresence>

  );
};

export default LoadingScreen;
