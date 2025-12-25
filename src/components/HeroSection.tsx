import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Floating engineering icons data
const floatingIcons = [
  { type: 'gear', x: '10%', y: '20%', size: 60, duration: 20, delay: 0 },
  { type: 'gear', x: '85%', y: '30%', size: 80, duration: 25, delay: 2 },
  { type: 'gear', x: '75%', y: '70%', size: 50, duration: 18, delay: 4 },
  { type: 'circuit', x: '15%', y: '65%', size: 100, duration: 22, delay: 1 },
  { type: 'circuit', x: '60%', y: '15%', size: 80, duration: 24, delay: 3 },
  { type: 'blueprint', x: '90%', y: '55%', size: 70, duration: 20, delay: 2 },
  { type: 'blueprint', x: '5%', y: '45%', size: 90, duration: 26, delay: 5 },
];

const FloatingGear = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2" />
    {[...Array(8)].map((_, i) => (
      <rect
        key={i}
        x="46"
        y="15"
        width="8"
        height="15"
        rx="2"
        fill="currentColor"
        transform={`rotate(${i * 45} 50 50)`}
      />
    ))}
  </svg>
);

const FloatingCircuit = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M10 50 H30 L40 30 H60 L70 50 H90" stroke="currentColor" strokeWidth="1.5" />
    <path d="M50 10 V30 L30 50 V70 L50 90" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="30" cy="50" r="4" fill="currentColor" />
    <circle cx="70" cy="50" r="4" fill="currentColor" />
    <circle cx="50" cy="30" r="3" fill="currentColor" />
    <circle cx="50" cy="70" r="3" fill="currentColor" />
  </svg>
);

const FloatingBlueprint = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
    <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="0.5" />
    <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" />
    <path d="M35 35 L65 65 M35 65 L65 35" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Text animation variants
  const headlineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, delay: 1.2, ease: "easeOut" as const },
    },
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 engineering-bg" />
      
      {/* Floating Engineering Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((icon, index) => (
          <motion.div
            key={index}
            className="absolute text-primary/[0.04]"
            style={{ left: icon.x, top: icon.y }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: [0, -30, 0],
              x: [0, 10, 0],
            }}
            transition={{
              opacity: { duration: 1, delay: icon.delay },
              y: { duration: icon.duration, repeat: Infinity, ease: "easeInOut" },
              x: { duration: icon.duration * 1.2, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            {icon.type === 'gear' && <FloatingGear size={icon.size} />}
            {icon.type === 'circuit' && <FloatingCircuit size={icon.size} />}
            {icon.type === 'blueprint' && <FloatingBlueprint size={icon.size} />}
          </motion.div>
        ))}
      </div>

      {/* Blueprint Line-Draw Animation Behind Text */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          {/* Blueprint Technical Drawing Animation */}
          <motion.g className="text-primary/[0.08]" stroke="currentColor" fill="none">
            {/* Main horizontal blueprint line */}
            <motion.path
              d="M0 540 Q480 480 960 540 T1920 540"
              strokeWidth="2"
              strokeDasharray="12 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
            />
            
            {/* Technical measurement lines */}
            <motion.path
              d="M200 400 L200 600 M300 420 L300 580"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
            />
            <motion.path
              d="M1620 380 L1620 620 M1720 400 L1720 600"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1.8 }}
            />
            
            {/* Connection points */}
            {[400, 800, 1200, 1600].map((x, i) => (
              <motion.g key={i}>
                <motion.circle
                  cx={x}
                  cy={540}
                  r="8"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2 + i * 0.2, duration: 0.4 }}
                />
                <motion.circle
                  cx={x}
                  cy={540}
                  r="3"
                  fill="hsl(var(--primary))"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.2 + i * 0.2, duration: 0.3 }}
                />
              </motion.g>
            ))}
          </motion.g>

          {/* Grid Lines - Subtle */}
          <g className="text-engineering-grid" stroke="currentColor" strokeWidth="0.5" opacity="0.4">
            {[...Array(12)].map((_, i) => (
              <motion.line
                key={`h-${i}`}
                x1="0"
                y1={i * 90}
                x2="1920"
                y2={i * 90}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.03 }}
              />
            ))}
            {[...Array(24)].map((_, i) => (
              <motion.line
                key={`v-${i}`}
                x1={i * 80}
                y1="0"
                x2={i * 80}
                y2="1080"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.02 }}
              />
            ))}
          </g>
        </svg>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-20">
      <div className="flex items-center gap-2 mb-6 hero-line">
            <div className="w-12 h-px bg-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Trusted Engineering Partner
            </span>
          </div>
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium tracking-wide">
              {isRTL ? 'أكثر من 40 عاماً من التميز' : '40+ Years of Excellence'}
            </span>
          </motion.div>

          {/* Main Heading with Line-by-Line Animation */}
          <motion.h1
            variants={headlineVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
          >
            <motion.span variants={lineVariants} className="block">
              {t('hero.title')}
            </motion.span>
            <motion.span variants={lineVariants} className="block mt-2 relative inline-block">
              <span className="text-primary">{t('hero.subtitle')}</span>
            </motion.span>
          </motion.h1>

          {/* Description with Stagger */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="btn-primary rounded-full px-8 py-6 text-base group"
              asChild
            >
              <a href="#projects">
                {t('hero.cta')}
                <ArrowIcon className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'} group-hover:translate-x-1 transition-transform ${isRTL ? 'group-hover:-translate-x-1' : ''}`} />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="btn-outline-primary rounded-full px-8 py-6 text-base"
              asChild
            >
              <a href="#contact">{t('hero.ctaSecondary')}</a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '40+', label: isRTL ? 'سنوات الخبرة' : 'Years Experience' },
              { value: '500+', label: isRTL ? 'مشاريع مكتملة' : 'Projects Completed' },
              { value: '150+', label: isRTL ? 'مهندسون متخصصون' : 'Expert Engineers' },
              { value: '12', label: isRTL ? 'دول الخدمة' : 'Countries Served' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1, type: "spring", stiffness: 200 }}
                className="text-center group"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs tracking-wider">{isRTL ? 'اكتشف المزيد' : 'SCROLL TO EXPLORE'}</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
