import { useLanguage } from './language-provider';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowRight, Users } from 'lucide-react';
import { MembershipModal } from './membership-modal';
import { useState } from 'react';

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
        className="min-h-screen parallax-bg relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(45, 85, 48, 0.8) 0%, rgba(74, 127, 92, 0.6) 100%), url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-fagri-green/20 to-fagri-light/30"></div>
        <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-slide-up">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-sans">
                <span>{t('hero-title1')}</span><br />
                <span>{t('hero-title2')}</span><br />
                <span className="text-fagri-accent">{t('hero-title3')}</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 mb-8 font-light leading-relaxed">
                {t('hero-subtitle')}
              </p>
              <div className="glass-morphism rounded-2xl p-8 mb-12 animate-fade-in">
                <p className="text-lg text-white leading-relaxed">
                  {t('hero-description')}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={scrollToStandard}
                  className="bg-white text-fagri-green px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  {t('hero-cta1')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setShowMembershipModal(true)}
                  variant="ghost"
                  className="glass-morphism text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
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
