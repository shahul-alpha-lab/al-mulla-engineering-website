import { useState } from 'react';
import '../lib/i18n';
import LoadingScreen from '@/components/LoadingScreen';
import EngineeringBackground from '@/components/EngineeringBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import JourneySection from '@/components/JourneySection';
import ValuesSection from '@/components/ValuesSection';
import SolutionsSection from '@/components/SolutionsSection';
import ProjectsSection from '@/components/ProjectsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import FeatureSelection from '@/components/featureSelection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      
      <div className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <EngineeringBackground />
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <JourneySection />
          <ValuesSection />
          <SolutionsSection />
          <ProjectsSection />
          <FeatureSelection />
          <CTASection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
