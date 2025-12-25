import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';

const values = [
  {
    key: 'integrity',
    icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.path
          d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "linear" }}
        />
        <motion.path
          d="M50 25 L70 38 L70 62 L50 75 L30 62 L30 38 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatType: "loop", ease: "linear" }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="8"
          fill="currentColor"
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    ),
  },
  {
    key: 'innovation',
    icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50px 50px" }}
        >
          <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="2" fill="none" />
          {[...Array(8)].map((_, i) => (
            <rect
              key={i}
              x="47"
              y="20"
              width="6"
              height="10"
              rx="1"
              fill="currentColor"
              transform={`rotate(${i * 45} 50 50)`}
            />
          ))}
        </motion.g>
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50px 50px" }}
        >
          <circle cx="50" cy="50" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
          {[...Array(6)].map((_, i) => (
            <rect
              key={i}
              x="48"
              y="35"
              width="4"
              height="6"
              rx="0.5"
              fill="currentColor"
              transform={`rotate(${i * 60} 50 50)`}
            />
          ))}
        </motion.g>
      </svg>
    ),
  },
  {
    key: 'quality',
    icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Ruler marks */}
        <rect x="20" y="40" width="60" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        {[...Array(11)].map((_, i) => (
          <motion.line
            key={i}
            x1={25 + i * 5}
            y1="40"
            x2={25 + i * 5}
            y2={i % 5 === 0 ? 50 : 45}
            stroke="currentColor"
            strokeWidth="1.5"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.1, repeat: Infinity, repeatDelay: 2 }}
          />
        ))}
        {/* Precision indicator */}
        <motion.circle
          cx="50"
          cy="50"
          r="4"
          fill="currentColor"
          animate={{ x: [-15, 15, -15] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Crosshairs */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <line x1="50" y1="25" x2="50" y2="35" stroke="currentColor" strokeWidth="1" />
          <line x1="50" y1="65" x2="50" y2="75" stroke="currentColor" strokeWidth="1" />
        </motion.g>
      </svg>
    ),
  },
  {
    key: 'safety',
    icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.path
          d="M50 15 L75 25 L75 50 C75 70 50 85 50 85 C50 85 25 70 25 50 L25 25 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        />
        <motion.path
          d="M40 50 L47 57 L62 42"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1, repeat: Infinity, repeatDelay: 1.5 }}
        />
        {/* Pulse effect */}
        <motion.circle
          cx="50"
          cy="50"
          r="35"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    ),
  },
];

const ValuesSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-secondary relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background */}
      <div className="absolute inset-0 blueprint-grid opacity-30" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-wider text-sm uppercase mb-4 block">
            {isRTL ? 'ما نؤمن به' : 'WHAT WE BELIEVE'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('values.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('values.subtitle')}
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.key}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="card-engineering p-8 h-full text-center hover:border-primary/40 transition-all duration-500">
                {/* Animated Icon */}
                <div className="w-24 h-24 mx-auto mb-6 text-primary group-hover:scale-110 transition-transform duration-500">
                  {value.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {t(`values.${value.key}`)}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`values.${value.key}Desc`)}
                </p>

                {/* Technical line decoration */}
                <div className="mt-6 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-8 h-px bg-primary/40" />
                  <div className="w-2 h-2 rounded-full bg-primary/40" />
                  <div className="w-8 h-px bg-primary/40" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
