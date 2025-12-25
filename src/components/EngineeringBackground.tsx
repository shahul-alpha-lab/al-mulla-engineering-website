import { useEffect, useRef } from 'react';

interface EngineeringSVGBackgroundProps {
  intensity?: 'light' | 'medium' | 'hero';
  className?: string;
}

const EngineeringSVGBackground = ({ intensity = 'light', className = '' }: EngineeringSVGBackgroundProps) => {
  const opacityMap = {
    light: 0.04,
    medium: 0.06,
    hero: 0.08,
  };

  const opacity = opacityMap[intensity];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Blueprint Grid */}
      <div 
        className="absolute inset-0 blueprint-pattern"
        style={{ opacity: opacity * 2 }}
      />

      {/* Gear 1 - Large, slow rotation */}
      <svg
        className="absolute -top-20 -right-20 w-80 h-80 rotate-gear"
        style={{ opacity }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M50 10 L55 20 L60 10 L65 20 L70 10 L75 20 L80 15 L75 25 L85 30 L75 35 L85 40 L75 45 L80 50 L75 55 L85 60 L75 65 L85 70 L75 75 L80 85 L70 80 L65 90 L60 80 L55 90 L50 80 L45 90 L40 80 L35 90 L30 80 L20 85 L25 75 L15 70 L25 65 L15 60 L25 55 L20 50 L25 45 L15 40 L25 35 L15 30 L25 25 L20 15 L30 20 L35 10 L40 20 L45 10 Z"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary"
        />
        <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <circle cx="50" cy="50" r="8" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
      </svg>

      {/* Gear 2 - Medium, reverse rotation */}
      <svg
        className="absolute top-1/3 -left-10 w-48 h-48 rotate-gear-reverse"
        style={{ opacity }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M50 5 L53 15 L57 5 L61 15 L65 5 L70 15 L75 10 L73 22 L85 20 L80 30 L92 33 L82 40 L92 50 L82 55 L92 63 L82 68 L90 78 L78 78 L82 90 L70 85 L65 95 L60 85 L55 95 L50 85 L45 95 L40 85 L35 95 L30 85 L18 90 L22 78 L10 78 L18 68 L8 63 L18 55 L8 50 L18 40 L8 33 L20 30 L15 20 L27 22 L25 10 L35 15 L39 5 L43 15 L47 5 Z"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary"
        />
        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
      </svg>

      {/* Circuit Lines */}
      <svg
        className="absolute bottom-20 right-10 w-64 h-64 float-slow"
        style={{ opacity }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M10 50 L30 50 L35 40 L45 60 L55 40 L65 60 L70 50 L90 50"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary"
        />
        <circle cx="10" cy="50" r="3" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <circle cx="90" cy="50" r="3" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <path
          d="M50 10 L50 30 L40 35 L60 45 L40 55 L60 65 L50 70 L50 90"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary"
        />
      </svg>

      {/* Pipeline/Tube */}
      <svg
        className="absolute top-1/2 left-1/3 w-40 h-40 float-medium"
        style={{ opacity }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <rect x="10" y="40" width="80" height="20" rx="10" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <line x1="25" y1="40" x2="25" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <line x1="50" y1="40" x2="50" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <line x1="75" y1="40" x2="75" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <circle cx="25" cy="30" r="5" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <line x1="25" y1="35" x2="25" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
      </svg>

      {/* Measurement Tool */}
      <svg
        className="absolute bottom-1/4 left-1/4 w-32 h-32 float-fast"
        style={{ opacity }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M20 80 L80 20"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary"
        />
        <path d="M25 75 L30 70" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <path d="M35 65 L40 60" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <path d="M45 55 L50 50" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <path d="M55 45 L60 40" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <path d="M65 35 L70 30" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <circle cx="20" cy="80" r="3" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <circle cx="80" cy="20" r="3" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
      </svg>

      {/* Hexagon Pattern */}
      <svg
        className="absolute top-20 left-1/2 w-24 h-24 float-slow"
        style={{ opacity, animationDelay: '2s' }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <polygon
          points="50,5 90,25 90,75 50,95 10,75 10,25"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary"
        />
        <polygon
          points="50,20 75,35 75,65 50,80 25,65 25,35"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary"
        />
      </svg>

      {/* Small Gear */}
      <svg
        className="absolute bottom-40 right-1/3 w-20 h-20 rotate-gear"
        style={{ opacity, animationDuration: '15s' }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M50 15 L55 25 L65 20 L65 30 L75 35 L65 45 L75 50 L65 55 L75 65 L65 70 L65 80 L55 75 L50 85 L45 75 L35 80 L35 70 L25 65 L35 55 L25 50 L35 45 L25 35 L35 30 L35 20 L45 25 Z"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary"
        />
        <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
      </svg>

      {/* Technical Cross */}
      <svg
        className="absolute top-2/3 right-1/4 w-16 h-16 float-medium pulse-glow"
        style={{ opacity }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <circle cx="50" cy="50" r="8" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <circle cx="50" cy="10" r="3" fill="currentColor" className="text-primary" />
        <circle cx="50" cy="90" r="3" fill="currentColor" className="text-primary" />
        <circle cx="10" cy="50" r="3" fill="currentColor" className="text-primary" />
        <circle cx="90" cy="50" r="3" fill="currentColor" className="text-primary" />
      </svg>
    </div>
  );
};

export default EngineeringSVGBackground;
