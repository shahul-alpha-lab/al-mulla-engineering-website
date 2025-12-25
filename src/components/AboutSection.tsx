import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Target, Lightbulb } from 'lucide-react';

// Floating engineering icons for background
const floatingIcons = [
  { type: 'gear', x: '5%', y: '15%', size: 50, duration: 22 },
  { type: 'gear', x: '92%', y: '25%', size: 40, duration: 18 },
  { type: 'circuit', x: '88%', y: '70%', size: 60, duration: 25 },
  { type: 'blueprint', x: '8%', y: '75%', size: 55, duration: 20 },
];

const FloatingGear = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="50" r="8" stroke="currentColor" strokeWidth="1.5" />
    {[...Array(6)].map((_, i) => (
      <rect
        key={i}
        x="47"
        y="20"
        width="6"
        height="12"
        rx="1"
        fill="currentColor"
        transform={`rotate(${i * 60} 50 50)`}
      />
    ))}
  </svg>
);

const FloatingCircuit = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M20 50 H40 L50 30 H70 L80 50" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="6" fill="currentColor" />
    <circle cx="80" cy="50" r="4" fill="currentColor" />
  </svg>
);

const FloatingBlueprint = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
    <line x1="25" y1="50" x2="75" y2="50" stroke="currentColor" strokeWidth="0.5" />
    <line x1="50" y1="25" x2="50" y2="75" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

const AboutSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Scroll-based timeline animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Slow the timeline draw so it animates gradually while the section is in view
  const timelineProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding bg-secondary relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 blueprint-grid opacity-40" />
      
      {/* Floating Engineering Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((icon, index) => (
          <motion.div
            key={index}
            className="absolute text-primary/[0.05]"
            style={{ left: icon.x, top: icon.y }}
            animate={{
              y: [0, -20, 0],
              x: [0, 8, 0],
              rotate: icon.type === 'gear' ? [0, 360] : 0,
            }}
            transition={{
              y: { duration: icon.duration, repeat: Infinity, ease: "easeInOut" },
              x: { duration: icon.duration * 1.3, repeat: Infinity, ease: "easeInOut" },
              rotate: icon.type === 'gear' ? { duration: icon.duration * 2, repeat: Infinity, ease: "linear" } : {},
            }}
          >
            {icon.type === 'gear' && <FloatingGear size={icon.size} />}
            {icon.type === 'circuit' && <FloatingCircuit size={icon.size} />}
            {icon.type === 'blueprint' && <FloatingBlueprint size={icon.size} />}
          </motion.div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-wider text-sm uppercase mb-4 block">
            {isRTL ? 'من نحن' : 'WHO WE ARE'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('about.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Main Content - Alignment Animation */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content - Animates from left to center */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 80 : -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.description')}
            </p>
            
            {/* Scroll-Triggered SVG Timeline */}
            <div className="relative py-8">
              <svg className="w-full h-24" viewBox="0 0 400 80">
                {/* Background path (dashed) */}
                <path
                  d="M0 40 L50 40 L70 20 L130 20 L150 40 L250 40 L270 60 L330 60 L350 40 L400 40"
                  stroke="hsl(var(--primary) / 0.2)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="8 4"
                />
                {/* Animated path (draws on scroll) */}
                <motion.path
                  d="M0 40 L50 40 L70 20 L130 20 L150 40 L250 40 L270 60 L330 60 L350 40 L400 40"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  fill="none"
                  style={{ pathLength: timelineProgress }}
                />
                
                {/* Milestone points with labels */}
                {[
                  { x: 100, y: 25, label: '1980', delay: 0.10 },
                  { x: 200, y: 40, label: '2000', delay: 0.6 },
                  { x: 300, y: 60, label: '2024', delay: 0.2 },
                ].map((point, i) => (
                  <motion.g key={i}>
                    <motion.circle
                      cx={point.x}
                      cy={point.y}
                      r="8"
                      fill="hsl(var(--background))"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 1 + point.delay, duration: 0.4, type: "spring" }}
                    />
                    <motion.circle
                      cx={point.x}
                      cy={point.y}
                      r="3"
                      fill="hsl(var(--primary))"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 1.2 + point.delay, duration: 0.3 }}
                    />
                    <motion.text
                      x={point.x}
                      y={point.y - 15}
                      textAnchor="middle"
                      fill="hsl(var(--primary))"
                      fontSize="10"
                      fontWeight="600"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.4 + point.delay, duration: 0.4 }}
                    >
                      {point.label}
                    </motion.text>
                  </motion.g>
                ))}
              </svg>
            </div>
          </motion.div>

          {/* Right Content - Animates from right to center */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -80 : 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid gap-6"
          >
            {/* Vision Card */}
            <motion.div 
              className="card-engineering p-8 group hover:border-primary/30"
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Target className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t('about.vision')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.visionText')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div 
              className="card-engineering p-8 group hover:border-primary/30"
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <Lightbulb className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t('about.mission')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.missionText')}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Engineering Illustration - Horizontal SVG Divider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative"
        >
          <svg className="w-full h-24 text-primary/10" viewBox="0 0 1200 80">
            {/* Main continuous line */}
            <motion.path
              d="M0 40 Q150 20 300 40 T600 40 T900 40 T1200 40"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 2.5, delay: 0.8, ease: "easeOut" }}
            />
            
            {/* Connection points with pulse effect */}
            {[200, 400, 600, 800, 1000].map((x, i) => (
              <motion.g key={i}>
                <motion.circle
                  cx={x}
                  cy="40"
                  r="10"
                  fill="hsl(var(--background))"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 1.2 + i * 0.15, type: "spring", stiffness: 300 }}
                />
                <motion.circle
                  cx={x}
                  cy="40"
                  r="4"
                  fill="hsl(var(--primary))"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: [0, 1.2, 1] } : {}}
                  transition={{ delay: 1.4 + i * 0.15, duration: 0.4 }}
                />
              </motion.g>
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
