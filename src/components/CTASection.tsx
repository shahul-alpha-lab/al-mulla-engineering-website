import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding bg-foreground relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1920 600" preserveAspectRatio="xMidYMid slice">
          {/* Grid */}
          <g stroke="white" strokeWidth="0.5">
            {[...Array(15)].map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 40} x2="1920" y2={i * 40} />
            ))}
            {[...Array(48)].map((_, i) => (
              <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="600" />
            ))}
          </g>
          {/* Gears */}
          <motion.g
            fill="white"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 300px" }}
          >
            <circle cx="200" cy="300" r="80" fillOpacity="0.3" />
            {[...Array(12)].map((_, i) => (
              <rect key={i} x="192" y="200" width="16" height="24" transform={`rotate(${i * 30} 200 300)`} />
            ))}
          </motion.g>
          <motion.g
            fill="white"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "1700px 150px" }}
          >
            <circle cx="1700" cy="150" r="60" fillOpacity="0.3" />
            {[...Array(10)].map((_, i) => (
              <rect key={i} x="1694" y="80" width="12" height="18" transform={`rotate(${i * 36} 1700 150)`} />
            ))}
          </motion.g>
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-8"
            >
              <svg viewBox="0 0 80 80" className="w-full h-full text-primary">
                <motion.circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5 }}
                />
                <motion.path
                  d="M25 40 L35 50 L55 30"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1 }}
                />
              </svg>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-background/70 mb-10 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>

            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-7 text-lg group shadow-glow"
            >
              {t('cta.button')}
              <ArrowIcon className={`w-5 h-5 ${isRTL ? 'mr-3' : 'ml-3'} group-hover:translate-x-1 transition-transform ${isRTL ? 'group-hover:-translate-x-1' : ''}`} />
            </Button>
          </motion.div>

          {/* Technical Decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mt-16"
          >
            <svg className="w-full h-12 text-background/10" viewBox="0 0 800 48">
              <motion.path
                d="M0 24 L150 24 L170 10 L230 10 L250 24 L400 24 L420 38 L480 38 L500 24 L650 24 L670 10 L730 10 L750 24 L800 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: 0.5 }}
              />
              {[170, 250, 420, 500, 670, 750].map((x, i) => (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={i % 2 === 0 ? 10 : 38}
                  r="4"
                  fill="currentColor"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 1.5 + i * 0.1 }}
                />
              ))}
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
