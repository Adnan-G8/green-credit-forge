import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { IntroductionSection } from '@/components/introduction-section';
import { StandardSection } from '@/components/standard-section';
import { ShowcaseSection } from '@/components/showcase-section';
import { PartnershipsSection } from '@/components/partnerships-section';
import { PlatformSection } from '@/components/platform-section';
import { SecuritySection } from '@/components/security-section';
import { MissionSection } from '@/components/mission-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-fagri-bg">
      <Navigation />
      <HeroSection />
      <IntroductionSection />
      <StandardSection />
      <ShowcaseSection />
      <PartnershipsSection />
      <PlatformSection />
      <SecuritySection />
      <MissionSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
