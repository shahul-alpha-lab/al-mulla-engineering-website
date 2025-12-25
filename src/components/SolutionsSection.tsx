import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EngineeringSVGBackground from './EngineeringBackground';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    titleEn: 'Oil & Gas Engineering',
    titleAr: 'هندسة النفط والغاز',
    descriptionEn: 'Comprehensive engineering solutions for upstream, midstream, and downstream operations. From exploration support to refinery optimization.',
    descriptionAr: 'حلول هندسية شاملة لعمليات المنبع والوسط والمصب. من دعم الاستكشاف إلى تحسين المصافي.',
    featuresEn: ['Pipeline Design', 'Refinery Engineering', 'Offshore Platforms', 'Gas Processing'],
    featuresAr: ['تصميم خطوط الأنابيب', 'هندسة المصافي', 'المنصات البحرية', 'معالجة الغاز'],
    color: '#00b049',
  },
  {
    id: 2,
    titleEn: 'Power Generation',
    titleAr: 'توليد الطاقة',
    descriptionEn: 'Design and engineering of power plants, substations, and transmission networks that power nations.',
    descriptionAr: 'تصميم وهندسة محطات الطاقة والمحطات الفرعية وشبكات النقل التي تمد الدول بالطاقة.',
    featuresEn: ['Power Plants', 'Substations', 'Transmission Lines', 'Renewable Energy'],
    featuresAr: ['محطات الطاقة', 'المحطات الفرعية', 'خطوط النقل', 'الطاقة المتجددة'],
    color: '#00b049',
  },
  {
    id: 3,
    titleEn: 'Infrastructure Development',
    titleAr: 'تطوير البنية التحتية',
    descriptionEn: 'Large-scale infrastructure projects including roads, bridges, airports, and urban development.',
    descriptionAr: 'مشاريع البنية التحتية الكبرى بما في ذلك الطرق والجسور والمطارات والتطوير الحضري.',
    featuresEn: ['Highway Systems', 'Bridge Engineering', 'Airports', 'Urban Planning'],
    featuresAr: ['أنظمة الطرق السريعة', 'هندسة الجسور', 'المطارات', 'التخطيط الحضري'],
    color: '#00b049',
  },
  {
    id: 4,
    titleEn: 'Water & Environment',
    titleAr: 'المياه والبيئة',
    descriptionEn: 'Sustainable water management solutions including treatment plants, desalination, and environmental engineering.',
    descriptionAr: 'حلول إدارة المياه المستدامة بما في ذلك محطات المعالجة وتحلية المياه والهندسة البيئية.',
    featuresEn: ['Desalination Plants', 'Wastewater Treatment', 'Water Networks', 'Environmental Impact'],
    featuresAr: ['محطات التحلية', 'معالجة مياه الصرف', 'شبكات المياه', 'الأثر البيئي'],
    color: '#00b049',
  },
  {
    id: 5,
    titleEn: 'Industrial Facilities',
    titleAr: 'المنشآت الصناعية',
    descriptionEn: 'Engineering and construction of manufacturing plants, warehouses, and industrial complexes.',
    descriptionAr: 'هندسة وبناء مصانع التصنيع والمستودعات والمجمعات الصناعية.',
    featuresEn: ['Factory Design', 'Warehouse Systems', 'Industrial Parks', 'Automation'],
    featuresAr: ['تصميم المصانع', 'أنظمة المستودعات', 'المناطق الصناعية', 'الأتمتة'],
    color: '#00b049',
  },
  {
    id: 6,
    titleEn: 'Project Management',
    titleAr: 'إدارة المشاريع',
    descriptionEn: 'End-to-end project management services ensuring timely delivery within budget and quality standards.',
    descriptionAr: 'خدمات إدارة المشاريع الشاملة لضمان التسليم في الوقت المحدد ضمن الميزانية ومعايير الجودة.',
    featuresEn: ['Planning & Scheduling', 'Cost Control', 'Quality Assurance', 'Risk Management'],
    featuresAr: ['التخطيط والجدولة', 'التحكم في التكاليف', 'ضمان الجودة', 'إدارة المخاطر'],
    color: '#00b049',
  },
];

const ServiceIcon = ({ index, isActive }: { index: number; isActive: boolean }) => {
  const icons = [
    // Oil & Gas - Oil drop with gear
    <g key="oil">
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" fill="none" className={isActive ? 'animate-pulse' : ''} />
      <path d="M50 25 C50 25 35 45 35 55 C35 63 42 70 50 70 C58 70 65 63 65 55 C65 45 50 25 50 25" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="50" cy="55" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </g>,
    // Power - Lightning bolt
    <g key="power">
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M55 20 L40 50 L50 50 L45 80 L60 45 L50 45 L55 20" stroke="currentColor" strokeWidth="2" fill="none" className={isActive ? 'animate-pulse' : ''} />
    </g>,
    // Infrastructure - Building with lines
    <g key="infra">
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M30 75 L30 35 L50 20 L70 35 L70 75" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M40 75 L40 50 L60 50 L60 75" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="50" y1="50" x2="50" y2="75" stroke="currentColor" strokeWidth="1.5" />
    </g>,
    // Water - Water drop with waves
    <g key="water">
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M50 25 C50 25 30 50 30 60 C30 72 39 80 50 80 C61 80 70 72 70 60 C70 50 50 25 50 25" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M38 60 Q44 55 50 60 Q56 65 62 60" stroke="currentColor" strokeWidth="1.5" fill="none" className={isActive ? 'animate-pulse' : ''} />
    </g>,
    // Industrial - Factory
    <g key="industrial">
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M25 70 L25 45 L35 40 L35 70" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M35 70 L35 50 L50 40 L50 70" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M50 70 L50 45 L65 35 L65 70" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M65 70 L65 40 L75 35 L75 70" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="25" y1="70" x2="75" y2="70" stroke="currentColor" strokeWidth="2" />
    </g>,
    // Project Management - Clipboard with gear
    <g key="management">
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="32" y="28" width="36" height="48" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M42 28 L42 22 L58 22 L58 28" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="38" y1="42" x2="62" y2="42" stroke="currentColor" strokeWidth="1.5" />
      <line x1="38" y1="52" x2="55" y2="52" stroke="currentColor" strokeWidth="1.5" />
      <line x1="38" y1="62" x2="50" y2="62" stroke="currentColor" strokeWidth="1.5" />
    </g>,
  ];

  return (
    <svg className="w-full h-full text-primary" viewBox="0 0 100 100" fill="none">
      {icons[index]}
    </svg>
  );
};

const ServicesSectionPinned = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const direction = i18n.dir();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = slidesRef.current;
      const container = containerRef.current;
      
      if (!slides || !container) return;

      const totalWidth = slides.scrollWidth - container.offsetWidth;

      // Create the horizontal scroll animation
      const tween = gsap.to(slides, {
        x: direction === 'rtl' ? totalWidth : -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const newIndex = Math.floor(self.progress * services.length);
            setActiveIndex(Math.min(newIndex, services.length - 1));
          },
        },
      });

      // Animate each service card
      gsap.utils.toArray<HTMLElement>('.service-slide').forEach((slide, i) => {
        gsap.from(slide.querySelector('.service-icon'), {
          scale: 0,
          rotation: -180,
          duration: 0.5,
          immediateRender: false,
          scrollTrigger: {
            trigger: slide,
            containerAnimation: tween,
            start: 'left 80%',
            toggleActions: 'play none none reverse',
          },
        });

        gsap.from(slide.querySelector('.service-content'), {
          y: 50,
          opacity: 0,
          duration: 0.5,
          immediateRender: false,
          scrollTrigger: {
            trigger: slide,
            containerAnimation: tween,
            start: 'left 70%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [direction]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-background overflow-hidden"
      dir={direction}
    >
      <EngineeringSVGBackground intensity="light" />

      {/* Fixed Header */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-8 pb-4 bg-gradient-to-b from-background via-background to-transparent">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                {t('solutions.subtitle')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
                {t('solutions.title')}
              </h2>
            </div>
            
            {/* Progress Indicator */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {t('solutions.scrollHint')}
              </span>
              <div className="flex gap-1.5">
                {services.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'w-8 bg-primary' : 'w-1.5 bg-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="h-screen flex items-center overflow-hidden pt-24"
      >
        <div
          ref={slidesRef}
          className="flex gap-8 px-6"
          style={{ paddingLeft: '10vw', paddingRight: '10vw' }}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-slide shrink-0 w-[80vw] md:w-[60vw] lg:w-[45vw] xl:w-[35vw]"
            >
              <div className="h-[70vh] p-8 md:p-10 bg-card rounded-3xl border border-border shadow-lg flex flex-col relative overflow-hidden group">
                {/* Background Pattern */}
                <div className="absolute inset-0 blueprint-pattern opacity-5 group-hover:opacity-10 transition-opacity" />
                
                {/* Service Number */}
                <div className="absolute top-6 right-6 text-8xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className="service-icon w-24 h-24 mb-8 relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform" />
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl -rotate-6 group-hover:-rotate-12 transition-transform" />
                  <div className="relative p-4">
                    <ServiceIcon index={index} isActive={index === activeIndex} />
                  </div>
                </div>

                {/* Content */}
                <div className="service-content flex-1 flex flex-col">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {language === 'ar' ? service.titleAr : service.titleEn}
                  </h3>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {language === 'ar' ? service.descriptionAr : service.descriptionEn}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    {(language === 'ar' ? service.featuresAr : service.featuresEn).map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Line */}
                  <div className="h-1 bg-gradient-to-r from-primary to-primary/20 rounded-full mt-8 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Progress Line */}
      <div className="absolute bottom-8 left-0 right-0 px-6">
        <div className="container mx-auto">
          <div className="h-0.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((activeIndex + 1) / services.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSectionPinned;
