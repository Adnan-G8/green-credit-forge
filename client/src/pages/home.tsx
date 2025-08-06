import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useSupabaseAuth } from '../hooks/use-supabase-auth';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { TransitionSection } from '@/components/transition-section';
import { IntroductionSection } from '@/components/introduction-section';
import OpportunitiesSection from '@/components/opportunities-section';
import { StandardSection } from '@/components/standard-section';
import { PlatformSection } from '@/components/platform-section';
import { SecurityMainSection } from '@/components/security-main-section';
import { RenewableEnergySection } from '@/components/renewable-energy-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  const { isAuthenticated } = useSupabaseAuth();
  const [, setLocation] = useLocation();

  // Don't redirect from home page - allow public access
  // Users can navigate to /auth if they want to sign in

  // Handle hash navigation when coming from other pages
  useEffect(() => {
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-fagri-bg">
      <Navigation />
      <HeroSection />
      <TransitionSection />
      <IntroductionSection />
      <OpportunitiesSection />
      <StandardSection />
      <PlatformSection />
      <SecurityMainSection />
      <RenewableEnergySection />
      <ContactSection />
      <Footer />
    </div>
  );
}
