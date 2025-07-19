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
          backgroundImage: `linear-gradient(135deg, rgba(45, 85, 48, 0.95) 0%, rgba(74, 127, 92, 0.85) 50%, rgba(45, 85, 48, 0.9) 100%), url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-fagri-green/10 via-transparent to-fagri-light/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fagri-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-fagri-green/10 rounded-full blur-2xl"></div>
        </div>
        <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="animate-slide-up">
              <div className="mb-8">
                <h1 className="text-6xl md:text-8xl font-black text-white mb-6 font-sans tracking-tight">
                  <span className="gradient-text">{t('hero-title1')}</span><br />
                  <span className="gradient-text">{t('hero-title2')}</span><br />
                  <span className="text-white drop-shadow-2xl">{t('hero-title3')}</span>
                </h1>
                <div className="relative">
                  <p className="text-2xl md:text-3xl text-white mb-12 font-light leading-relaxed tracking-wide">
                    {t('hero-subtitle')}
                  </p>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-fagri-accent to-transparent"></div>
                </div>
              </div>
              <div className="glass-morphism rounded-3xl p-10 mb-16 animate-fade-in floating-card premium-shadow">
                <p className="text-xl text-white leading-relaxed max-w-4xl mx-auto">
                  {t('hero-description')}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  onClick={scrollToStandard}
                  className="bg-gradient-to-r from-white via-gray-50 to-white text-fagri-green px-10 py-5 rounded-full font-bold text-lg hover:from-gray-50 hover:to-gray-100 transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:scale-110 hover:-translate-y-1 border-2 border-white/20"
                >
                  {t('hero-cta1')}
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
                <Button
                  onClick={() => setShowMembershipModal(true)}
                  variant="ghost"
                  className="glass-morphism text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/25 transition-all duration-500 premium-shadow transform hover:scale-110 hover:-translate-y-1 border-2 border-white/30"
                >
                  {t('hero-cta2')}
                  <Users className="ml-3 h-5 w-5" />
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
