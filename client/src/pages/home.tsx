import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { IntroductionSection } from '@/components/introduction-section';
import { MissionSection } from '@/components/mission-section';
import { RenewableEnergySection } from '@/components/renewable-energy-section';
import { StandardSection } from '@/components/standard-section';
import { TransitionSection } from '@/components/transition-section';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <IntroductionSection />
        <MissionSection />
        <RenewableEnergySection />
        <StandardSection />
        <TransitionSection />
      </main>
      <Footer />
    </div>
  );
}