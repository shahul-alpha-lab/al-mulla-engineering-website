import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    id: 1,
    titleEn: 'Kuwait International Airport',
    titleAr: 'مطار الكويت الدولي',
    categoryEn: 'Aviation',
    categoryAr: 'الطيران',
    descEn: 'Complete MEP systems for the new terminal building',
    descAr: 'أنظمة MEP كاملة لمبنى المطار الجديد',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    titleEn: 'Al Hamra Tower',
    titleAr: 'برج الحمراء',
    categoryEn: 'Commercial',
    categoryAr: 'تجاري',
    descEn: 'High-rise HVAC and electrical installations',
    descAr: 'تركيبات التكييف والكهرباء للمباني الشاهقة',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    titleEn: 'Kuwait University Campus',
    titleAr: 'حرم جامعة الكويت',
    categoryEn: 'Education',
    categoryAr: 'تعليم',
    descEn: 'Sustainable engineering for the new campus',
    descAr: 'هندسة مستدامة للحرم الجامعي الجديد',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    titleEn: 'Sheikh Jaber Causeway',
    titleAr: 'جسر الشيخ جابر',
    categoryEn: 'Infrastructure',
    categoryAr: 'البنية التحتية',
    descEn: 'Lighting and electrical systems for the causeway',
    descAr: 'أنظمة الإضاءة والكهرباء للجسر',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
  },
];

const ProjectsSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      ref={sectionRef}
      id="projects"
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
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <span className="text-primary font-medium tracking-wider text-sm uppercase mb-4 block">
              {isRTL ? 'أعمالنا' : 'OUR WORK'}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('projects.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl">
              {t('projects.subtitle')}
            </p>
          </div>
          
          <Button
            variant="outline"
            className="btn-outline-primary rounded-full mt-6 md:mt-0 group"
          >
            {t('projects.viewAll')}
            <ArrowIcon className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'} group-hover:translate-x-1 transition-transform ${isRTL ? 'group-hover:-translate-x-1' : ''}`} />
          </Button>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="card-engineering overflow-hidden">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  {/* Project Number */}
                  <motion.div
                    className="absolute top-4 left-4 z-20 text-6xl font-bold text-primary-foreground/20 select-none"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {String(project.id).padStart(2, '0')}
                  </motion.div>

                  {/* Image */}
                  <motion.img
                    src={project.image}
                    alt={isRTL ? project.titleAr : project.titleEn}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Blueprint Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-primary/80 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center p-6">
                      <svg className="w-16 h-16 mx-auto mb-4 text-primary-foreground" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                        {/* Blueprint grid */}
                        <rect x="10" y="10" width="80" height="80" rx="2" />
                        <line x1="10" y1="30" x2="90" y2="30" strokeDasharray="4 2" />
                        <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="4 2" />
                        <line x1="10" y1="70" x2="90" y2="70" strokeDasharray="4 2" />
                        <line x1="30" y1="10" x2="30" y2="90" strokeDasharray="4 2" />
                        <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="4 2" />
                        <line x1="70" y1="10" x2="70" y2="90" strokeDasharray="4 2" />
                        {/* Building shape */}
                        <rect x="35" y="35" width="30" height="45" strokeWidth="2" />
                        <rect x="40" y="40" width="8" height="8" fill="currentColor" />
                        <rect x="52" y="40" width="8" height="8" fill="currentColor" />
                        <rect x="40" y="52" width="8" height="8" fill="currentColor" />
                        <rect x="52" y="52" width="8" height="8" fill="currentColor" />
                      </svg>
                      <span className="text-primary-foreground font-medium">
                        {isRTL ? 'عرض المشروع' : 'View Project'}
                      </span>
                    </div>
                  </motion.div>

                  {/* Category Tag */}
                  <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10`}>
                    <span className="px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium text-foreground">
                      {isRTL ? project.categoryAr : project.categoryEn}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {isRTL ? project.titleAr : project.titleEn}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {isRTL ? project.descAr : project.descEn}
                  </p>

                  {/* Technical line */}
                  <div className="mt-4 flex items-center gap-2 text-primary/50">
                    <div className="w-6 h-px bg-current" />
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
                      <circle cx="6" cy="6" r="2" />
                    </svg>
                    <div className="flex-1 h-px bg-current opacity-0 group-hover:opacity-100 transition-opacity" />
                    <ArrowIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Engineering Grid Lines */}
        <motion.svg
          className="absolute bottom-0 left-0 w-full h-20 text-primary/5"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <motion.path
            d="M0 40 L200 40 L220 20 L280 20 L300 40 L500 40 L520 60 L580 60 L600 40 L800 40 L820 20 L880 20 L900 40 L1200 40"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2 }}
          />
        </motion.svg>
      </div>
    </section>
  );
};

export default ProjectsSection;
