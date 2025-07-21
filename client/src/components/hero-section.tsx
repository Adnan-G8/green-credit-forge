import { useLanguage } from './language-provider';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Globe, Shield, TrendingUp, Users } from 'lucide-react';
import { MembershipModal } from './membership-modal';
import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import heroImage from '@assets/image_1752936487549.png';

export function HeroSection() {
  const { t } = useLanguage();
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

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
        className="min-h-screen relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      >
        {/* Premium Dark Background with Subtle Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-800/60 to-slate-900/80"></div>
        </div>

        {/* Professional Content Container */}
        <div className="container mx-auto px-4 sm:px-6 pt-24 pb-20 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* Professional Status Badge */}
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-8">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 font-medium text-sm tracking-wide uppercase">
                {t('hero-status-badge')}
              </span>
            </div>
            
            {/* Banking-Style Main Title */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extralight text-white leading-[0.9] mb-6">
                <span className="block mb-2 font-light">{t('hero-title1')}</span>
                <span className="block mb-2 font-light">{t('hero-title2')}</span>
                <span className="block font-normal text-emerald-400">{t('hero-title3')}</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-emerald-400 font-medium mb-4">
                {t('hero-tagline')}
              </p>
              
              <p className="text-lg sm:text-xl text-slate-300 font-light max-w-4xl mx-auto leading-relaxed px-4">
                {t('hero-subtitle')}
              </p>
            </div>
            
            {/* Trust & Value Propositions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto px-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 bg-emerald-500/20 rounded-full border border-emerald-400/30">
                    <Shield className="h-8 w-8 text-emerald-400" />
                  </div>
                </div>
                <div className="text-3xl font-light text-white mb-2">EU</div>
                <div className="text-slate-400 font-medium text-sm uppercase tracking-wider">
                  {t('hero-trust-compliance')}
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 bg-blue-500/20 rounded-full border border-blue-400/30">
                    <Globe className="h-8 w-8 text-blue-400" />
                  </div>
                </div>
                <div className="text-3xl font-light text-white mb-2">Global</div>
                <div className="text-slate-400 font-medium text-sm uppercase tracking-wider">
                  {t('hero-trust-network')}
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 bg-amber-500/20 rounded-full border border-amber-400/30">
                    <TrendingUp className="h-8 w-8 text-amber-400" />
                  </div>
                </div>
                <div className="text-3xl font-light text-white mb-2">Digital</div>
                <div className="text-slate-400 font-medium text-sm uppercase tracking-wider">
                  {t('hero-trust-innovation')}
                </div>
              </div>
            </div>
            
            {/* Premium Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/eufd-standard">
                <button className="group relative inline-flex items-center justify-center px-12 py-5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 font-medium text-lg shadow-2xl hover:shadow-emerald-500/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center">
                    {t('hero-cta-discover')}
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
              
              <button
                onClick={() => setShowMembershipModal(true)}
                className="group relative inline-flex items-center justify-center px-12 py-5 bg-transparent text-white rounded-xl border-2 border-white/30 hover:border-white/50 hover:bg-white/5 transition-all duration-300 font-medium text-lg backdrop-blur-sm"
              >
                <Users className="mr-3 h-5 w-5" />
                {t('hero-cta-join')}
              </button>
            </div>
            
            {/* Professional Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-white/10">
              <div className="flex items-center space-x-3 text-slate-400">
                <Shield className="h-6 w-6 text-emerald-400" />
                <span className="text-sm font-medium">ISO 14064 Certified</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <Globe className="h-6 w-6 text-blue-400" />
                <span className="text-sm font-medium">ALPHAG8 Partnership</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <Leaf className="h-6 w-6 text-green-400" />
                <span className="text-sm font-medium">EU Standards Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MembershipModal 
        isOpen={showMembershipModal} 
        onClose={() => setShowMembershipModal(false)} 
      />
    </>
  );
}