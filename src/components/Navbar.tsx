import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isRTL = i18n.language === 'ar';

  const navLinks = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'services', href: '#solutions' },
    { key: 'projects', href: '#projects' },
    { key: 'contact', href: '#contact' },
  ];

  // Scroll handler for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section detection
  const observeSections = useCallback(() => {
    const sectionIds = ['home', 'about', 'solutions', 'projects', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is in the middle-ish of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          // Map solutions to services for nav highlighting
          setActiveSection(sectionId === 'solutions' ? 'services' : sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cleanup = observeSections();
    return cleanup;
  }, [observeSections]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const handleNavClick = (key: string) => {
    setActiveSection(key);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-soft border-b border-border/50'
            : 'bg-transparent'
        }`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group" onClick={() => handleNavClick('home')}>
              <img src={logo} alt="Al Mulla Engineering" width={200} height={200} />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.key;
                return (
                  <a
                    key={link.key}
                    href={link.href}
                    onClick={() => handleNavClick(link.key)}
                    className="relative text-sm py-2 transition-colors group"
                  >
                    <span
                      className={`transition-all duration-300 ${
                        isActive
                          ? 'text-primary font-semibold'
                          : 'text-foreground/80 font-medium hover:text-primary'
                      }`}
                    >
                      {t(`nav.${link.key}`)}
                    </span>
                    {/* Active underline indicator */}
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      initial={false}
                      animate={{
                        scaleX: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{ originX: isRTL ? 1 : 0 }}
                    />
                    {/* Hover underline (only when not active) */}
                    {!isActive && (
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary/50 rounded-full transition-all duration-300 group-hover:w-full" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-foreground/70 hover:text-primary hover:bg-primary/5"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {i18n.language === 'en' ? 'العربية' : 'English'}
                </span>
              </Button>

              {/* CTA Button */}
              <Button
                className="hidden md:flex btn-primary rounded-full px-6"
                asChild
              >
                <a href="#contact">{t('hero.ctaSecondary')}</a>
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 bg-background/98 backdrop-blur-lg border-b border-border lg:hidden"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.key;
                  return (
                    <motion.a
                      key={link.key}
                      href={link.href}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNavClick(link.key)}
                      className={`text-lg py-2 transition-colors relative ${
                        isActive
                          ? 'text-primary font-semibold'
                          : 'text-foreground font-medium hover:text-primary'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {isActive && (
                          <motion.span
                            layoutId="mobile-active-indicator"
                            className="w-1 h-6 bg-primary rounded-full"
                          />
                        )}
                        {t(`nav.${link.key}`)}
                      </span>
                    </motion.a>
                  );
                })}
                <Button className="btn-primary rounded-full mt-4 w-full" asChild>
                  <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('hero.ctaSecondary')}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
