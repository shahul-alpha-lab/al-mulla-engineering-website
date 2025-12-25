import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EngineeringSVGBackground from './EngineeringBackground';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: '1988', titleEn: 'Foundation', titleAr: 'التأسيس', descriptionEn: 'Al Mulla Engineering established in Kuwait', descriptionAr: 'تأسيس الملا للهندسة في الكويت' },
  { year: '1995', titleEn: 'Regional Expansion', titleAr: 'التوسع الإقليمي', descriptionEn: 'Expanded operations to UAE and Saudi Arabia', descriptionAr: 'توسيع العمليات إلى الإمارات والسعودية' },
  { year: '2003', titleEn: 'Oil & Gas Excellence', titleAr: 'التميز في النفط والغاز', descriptionEn: 'Major contracts with national oil companies', descriptionAr: 'عقود كبرى مع شركات النفط الوطنية' },
  { year: '2010', titleEn: 'Infrastructure Leader', titleAr: 'رائد البنية التحتية', descriptionEn: 'Completed 200+ major infrastructure projects', descriptionAr: 'إنجاز أكثر من 200 مشروع بنية تحتية' },
  { year: '2018', titleEn: 'Digital Transformation', titleAr: 'التحول الرقمي', descriptionEn: 'Adopted cutting-edge engineering technologies', descriptionAr: 'تبني أحدث التقنيات الهندسية' },
  { year: '2024', titleEn: 'Sustainable Future', titleAr: 'مستقبل مستدام', descriptionEn: 'Leading green engineering initiatives', descriptionAr: 'قيادة مبادرات الهندسة الخضراء' },
];

const JourneySectionScrollLine = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const direction = i18n.dir();
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (!path) return;

      // Get path length for drawing animation
      const pathLength = path.getTotalLength();
      
      // Set initial state
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Animate path drawing on scroll
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
        },
      });

      // Animate milestone cards
      gsap.utils.toArray<HTMLElement>('.milestone-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          scale: 0.9,
          duration: 0.6,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Animate milestone dots
      gsap.utils.toArray<HTMLElement>('.milestone-dot').forEach((dot, i) => {
        gsap.from(dot, {
          scale: 0,
          duration: 0.4,
          ease: 'back.out(2)',
          immediateRender: false,
          scrollTrigger: {
            trigger: dot,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Year number animation
      gsap.utils.toArray<HTMLElement>('.year-label').forEach((label) => {
        gsap.from(label, {
          opacity: 0,
          x: direction === 'rtl' ? 30 : -30,
          duration: 0.5,
          immediateRender: false,
          scrollTrigger: {
            trigger: label,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [direction]);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-background overflow-hidden"
      dir={direction}
    >
      <EngineeringSVGBackground intensity="light" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            {t('journey.subtitle')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            {t('journey.title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            {t('journey.description')}
          </p>
        </div>

        {/* Journey Path Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* SVG Pipeline/Engineering Path */}
          <svg
            className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-20 z-0"
            viewBox="0 0 80 1200"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Background pipeline structure */}
            <rect x="35" y="0" width="10" height="1200" fill="hsl(var(--muted))" opacity="0.3" rx="5" />
            
            {/* Animated main line */}
            <path
              ref={pathRef}
              d="M40 0 
                 L40 100 
                 C40 120 60 120 60 140 
                 L60 180 
                 C60 200 40 200 40 220 
                 L40 300 
                 C40 320 20 320 20 340 
                 L20 380 
                 C20 400 40 400 40 420 
                 L40 500 
                 C40 520 60 520 60 540 
                 L60 580 
                 C60 600 40 600 40 620 
                 L40 700 
                 C40 720 20 720 20 740 
                 L20 780 
                 C20 800 40 800 40 820 
                 L40 900 
                 C40 920 60 920 60 940 
                 L60 980 
                 C60 1000 40 1000 40 1020 
                 L40 1200"
              stroke="hsl(var(--primary))"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />

            {/* Technical markers along the path */}
            <circle cx="40" cy="50" r="3" fill="hsl(var(--primary))" opacity="0.3" />
            <circle cx="40" cy="250" r="3" fill="hsl(var(--primary))" opacity="0.3" />
            <circle cx="40" cy="450" r="3" fill="hsl(var(--primary))" opacity="0.3" />
            <circle cx="40" cy="650" r="3" fill="hsl(var(--primary))" opacity="0.3" />
            <circle cx="40" cy="850" r="3" fill="hsl(var(--primary))" opacity="0.3" />
            <circle cx="40" cy="1050" r="3" fill="hsl(var(--primary))" opacity="0.3" />
          </svg>

          {/* Milestones */}
          <div className="relative space-y-16 md:space-y-24">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              // Align cards toward the center line while respecting direction
              const textAlignClass = isEven
                ? (direction === 'rtl' ? 'text-left' : 'text-right')
                : (direction === 'rtl' ? 'text-right' : 'text-left');
              const cardOffsetClass = isEven
                ? (direction === 'rtl' ? 'mr-auto' : 'ml-auto')
                : (direction === 'rtl' ? 'ml-auto' : 'mr-auto');
              
              return (
                <div
                  key={milestone.year}
                  className={`relative flex items-center gap-8 ${
                    isEven ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${textAlignClass}`}>
                    <div
                      className={`milestone-card inline-block p-6 md:p-8 bg-card rounded-2xl shadow-lg border border-border 
                        hover:shadow-xl hover:-translate-y-1 transition-all duration-300 max-w-md
                        ${cardOffsetClass}`}
                    >
                      {/* Year Badge */}
                      <div className="year-label inline-block px-4 py-1.5 bg-primary text-primary-foreground text-lg font-bold rounded-full mb-4">
                        {milestone.year}
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                        {language === 'ar' ? milestone.titleAr : milestone.titleEn}
                      </h3>
                      <p className="text-muted-foreground">
                        {language === 'ar' ? milestone.descriptionAr : milestone.descriptionEn}
                      </p>

                      {/* Technical decoration */}
                      <div className={`mt-4 flex gap-2 ${isEven ? 'justify-end' : 'justify-start'}`}>
                        <div className="w-8 h-0.5 bg-primary/30 rounded-full" />
                        <div className="w-4 h-0.5 bg-primary/20 rounded-full" />
                        <div className="w-2 h-0.5 bg-primary/10 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="milestone-dot relative w-8 h-8 shrink-0 z-10">
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
                    <div className="absolute inset-0 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary-foreground rounded-full" />
                    </div>
                  </div>

                  {/* Empty space for opposite side */}
                  <div className="flex-1" />
                </div>
              );
            })}
          </div>

          {/* End cap - Future indicator */}
          <div className="relative mt-20 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary font-medium">
                {language === 'ar' ? 'المستقبل يبدأ هنا' : 'The Future Begins Here'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySectionScrollLine;
