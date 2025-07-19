import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { IntroductionSection } from '@/components/introduction-section';
import { StandardSection } from '@/components/standard-section';
import { PartnershipsSection } from '@/components/partnerships-section';
import { PlatformSection } from '@/components/platform-section';
import { MissionSection } from '@/components/mission-section';
import { RenewableEnergySection } from '@/components/renewable-energy-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-fagri-bg">
      <Navigation />
      <HeroSection />
      <IntroductionSection />
      <StandardSection />
      <PartnershipsSection />
      <PlatformSection />
      <RenewableEnergySection />
      <ContactSection />
      <Footer />
    </div>
  );
}
