import { useLanguage } from './language-provider';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf } from 'lucide-react';
import { MembershipModal } from './membership-modal';
import { useState } from 'react';
import heroImage from '@assets/image_1752936487549.png';

export function HeroSection() {
  const { t } = useLanguage();
  const [showMembershipModal, setShowMembershipModal] = useState(false);

  const scrollToStandard = () => {
    const element = document.getElementById('standard');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section
        id="home"
        className="min-h-screen relative overflow-hidden"
      >
        {/* Professional Background with Subtle Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Agricultural field"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/85 via-orange-50/80 to-amber-100/85"></div>
        </div>

        {/* Clean, Professional Content */}
        <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Clean Typography Hierarchy */}
            <div className="mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-6">
                <span className="text-amber-800 font-normal">Digitalizzazione.</span><br />
                <span className="text-orange-800 font-normal">Responsabilità.</span><br />
                <span className="text-slate-900 font-semibold">Clima.</span>
              </h1>
              <p className="text-xl md:text-2xl text-amber-700 font-light tracking-wide">
                Piattaforma di Trasformazione Agricola - Connetti produttori, PMI, cooperative e comunità attraverso la sostenibilità
              </p>
            </div>
            
            {/* Professional Content Box */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-10 mb-10 shadow-lg border border-amber-200/50 max-w-3xl mx-auto text-left">
              <p className="text-lg text-slate-700 leading-relaxed font-light">
                FAGRI.Digital è la piattaforma digitale del movimento agricolo italiano FAGRI – fondata su oltre 30 anni 
                di esperienza e sostenuta da una solida rete internazionale. Con più di 110.000 membri e quasi 80.000 
                imprese solo in Italia, collaboriamo con partner in Europa, America Latina, Africa e altri continenti per 
                costruire un'agricoltura sostenibile e digitalmente integrata.
              </p>
            </div>
            
            {/* Clean Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToStandard}
                className="bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 rounded-lg text-base font-medium shadow-sm hover:shadow-md transition-all duration-200 border-0"
              >
                Scopri EUP02025-001 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() => setShowMembershipModal(true)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-700 px-10 py-4 rounded-lg text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Leaf className="mr-2 h-4 w-4" />
                Unisciti alla Rete
              </Button>
            </div>
          </div>
        </div>
      </section>

      <MembershipModal open={showMembershipModal} onOpenChange={setShowMembershipModal} />
    </>
  );
}