import { useLanguage } from './language-provider';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowRight, Users } from 'lucide-react';
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
        className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100"
      >
        {/* Background Image with Creative Layout */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Agricultural field"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-orange-900/10"></div>
        </div>
        <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="animate-slide-up">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 font-sans leading-tight">
                <span className="text-amber-800">{t('hero-title1')}</span><br />
                <span className="text-orange-700">{t('hero-title2')}</span><br />
                <span className="text-fagri-green">{t('hero-title3')}</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-amber-900 mb-12 font-light max-w-3xl mx-auto">
                {t('hero-subtitle')}
              </p>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-12 animate-fade-in text-left max-w-4xl mx-auto shadow-xl border border-amber-200">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('hero-description')}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={scrollToStandard}
                  className="bg-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transition-all duration-300 shadow-lg"
                >
                  {t('hero-cta1')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setShowMembershipModal(true)}
                  className="bg-fagri-green text-white px-8 py-3 rounded-full font-semibold hover:bg-fagri-dark transition-all duration-300 shadow-lg"
                >
                  {t('hero-cta2')}
                  <Users className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
          <ChevronDown className="text-white text-2xl opacity-70" />
        </div>
      </section>

      <MembershipModal
        isOpen={showMembershipModal}
        onClose={() => setShowMembershipModal(false)}
      />
    </>
  );
}
