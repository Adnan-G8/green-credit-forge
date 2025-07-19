import { useLanguage } from './language-provider';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Globe, Shield, TrendingUp, Users } from 'lucide-react';
import { MembershipModal } from './membership-modal';
import { useState, useEffect } from 'react';
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
        className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-slate-200/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Premium Content Container */}
        <div className="container mx-auto px-6 pt-20 pb-16 relative z-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Hero Grid Layout */}
            <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
              
              {/* Left Content */}
              <div className="space-y-8">
                {/* Status Badge */}
                <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full border border-emerald-200">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-medium">{t('hero-status-badge')}</span>
                </div>
                
                {/* Main Title with Animation */}
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[0.9]">
                    <div className="overflow-hidden">
                      <span className="block text-slate-900 font-medium transform transition-transform duration-1000 ease-out animate-slide-up">
                        {t('hero-title1')}
                      </span>
                    </div>
                    <div className="overflow-hidden">
                      <span className="block text-emerald-700 font-medium transform transition-transform duration-1000 ease-out animate-slide-up delay-200">
                        {t('hero-title2')}
                      </span>
                    </div>
                    <div className="overflow-hidden">
                      <span className="block text-blue-700 font-semibold transform transition-transform duration-1000 ease-out animate-slide-up delay-400">
                        {t('hero-title3')}
                      </span>
                    </div>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl leading-relaxed">
                    {t('hero-subtitle')}
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={scrollToStandard}
                    className="group inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {t('hero-cta-discover')}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                  
                  <button
                    onClick={() => setShowMembershipModal(true)}
                    className="group inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-700 rounded-xl border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    {t('hero-cta-join')}
                  </button>
                </div>
              </div>
              
              {/* Right Visual Content */}
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700">
                  <img
                    src={heroImage}
                    alt="Sustainable agriculture"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                  
                  {/* Floating Stats Cards */}
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl border border-slate-200 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-emerald-100 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-900">110K+</p>
                        <p className="text-sm text-slate-600">{t('hero-stat-members')}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -top-6 -right-6 bg-white rounded-xl p-6 shadow-xl border border-slate-200 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Shield className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-900">EUFD2025-001</p>
                        <p className="text-sm text-slate-600">{t('hero-stat-standard')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-1/4 -left-8">
                  <div className={`w-16 h-16 bg-emerald-500/20 rounded-full backdrop-blur-sm border border-emerald-300/30 flex items-center justify-center transform transition-all duration-2000 ${
                    animationPhase === 0 ? 'scale-110 bg-emerald-500/30' : 'scale-100'
                  }`}>
                    <Leaf className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
                
                <div className="absolute bottom-1/4 -right-8">
                  <div className={`w-16 h-16 bg-blue-500/20 rounded-full backdrop-blur-sm border border-blue-300/30 flex items-center justify-center transform transition-all duration-2000 ${
                    animationPhase === 2 ? 'scale-110 bg-blue-500/30' : 'scale-100'
                  }`}>
                    <Globe className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom Feature Pills */}
            <div className="mt-20 flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200/50 shadow-lg">
                <Shield className="h-5 w-5 text-emerald-600" />
                <span className="text-slate-700 font-medium">{t('hero-feature-blockchain')}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200/50 shadow-lg">
                <Globe className="h-5 w-5 text-blue-600" />
                <span className="text-slate-700 font-medium">{t('hero-feature-global')}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200/50 shadow-lg">
                <Leaf className="h-5 w-5 text-green-600" />
                <span className="text-slate-700 font-medium">{t('hero-feature-sustainable')}</span>
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