import { useState, useEffect } from 'react';
import { useLanguage } from './language-provider';
import { FagriLogo } from '@/assets/fagri-logo';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { MembershipModal } from './membership-modal';
import { useLocation } from 'wouter';

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (sectionId: string) => {
    // If we're on the home page, scroll to section
    if (location === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on a different page, navigate to home with hash
      setLocation(`/#${sectionId}`);
    }
    setIsOpen(false);
  };

  // Handle navigation to home page when coming from other pages
  useEffect(() => {
    if (location === '/' && window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button onClick={() => setLocation('/')} className="flex items-center">
                <FagriLogo className="w-20 h-12" />
              </button>
            </div>

            {/* Language Switcher - moved to right side of nav */}
            <div className="absolute top-4 right-6">
              <div className="bg-emerald-700 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => setLanguage('it')}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    language === 'it' 
                      ? 'bg-white text-emerald-700' 
                      : 'text-white hover:bg-emerald-600'
                  }`}
                >
                  IT
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    language === 'en' 
                      ? 'bg-white text-emerald-700' 
                      : 'text-white hover:bg-emerald-600'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 mr-24">
              <button
                onClick={() => navigateToSection('home')}
                className="text-slate-800 hover:text-emerald-700 transition-colors duration-200 font-medium text-base"
              >
                {t('nav-home')}
              </button>
              <button
                onClick={() => setLocation('/eufd-standard')}
                className="text-slate-800 hover:text-emerald-700 transition-colors duration-200 font-medium text-base"
              >
                {t('nav-standard')}
              </button>

              <button
                onClick={() => navigateToSection('platform')}
                className="text-slate-800 hover:text-emerald-700 transition-colors duration-200 font-medium text-base"
              >
                {t('nav-platform')}
              </button>
              <button
                onClick={() => setLocation('/security')}
                className="text-slate-800 hover:text-emerald-700 transition-colors duration-200 font-medium text-base"
              >
                {t('nav-security')}
              </button>
              <button
                onClick={() => navigateToSection('contact')}
                className="text-slate-800 hover:text-emerald-700 transition-colors duration-200 font-medium text-base"
              >
                {t('nav-contact')}
              </button>

            </div>

            <div className="flex items-center space-x-4 md:hidden">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-slate-800 hover:text-emerald-700 transition-colors duration-300"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4">
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => navigateToSection('home')}
                  className="text-white hover:text-fagri-accent transition-colors duration-300 text-left"
                >
                  {t('nav-home')}
                </button>
                <button
                  onClick={() => {
                    setLocation('/eufd-standard');
                    setIsOpen(false);
                  }}
                  className="text-white hover:text-fagri-accent transition-colors duration-300 text-left"
                >
                  {t('nav-standard')}
                </button>

                <button
                  onClick={() => navigateToSection('platform')}
                  className="text-white hover:text-fagri-accent transition-colors duration-300 text-left"
                >
                  {t('nav-platform')}
                </button>
                <button
                  onClick={() => {
                    setLocation('/security');
                    setIsOpen(false);
                  }}
                  className="text-white hover:text-fagri-accent transition-colors duration-300 text-left"
                >
                  {t('nav-security')}
                </button>
                <button
                  onClick={() => navigateToSection('contact')}
                  className="text-white hover:text-fagri-accent transition-colors duration-300 text-left"
                >
                  {t('nav-contact')}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <MembershipModal
        isOpen={showMembershipModal}
        onClose={() => setShowMembershipModal(false)}
      />
    </>
  );
}
