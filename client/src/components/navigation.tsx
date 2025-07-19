import { useState, useEffect } from 'react';
import { useLanguage } from './language-provider';
import { FagriLogo } from '@/assets/fagri-logo';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { MembershipModal } from './membership-modal';

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <FagriLogo className="w-20 h-12" />
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
                onClick={() => scrollToSection('home')}
                className="text-slate-800 hover:text-emerald-700 transition-colors duration-200 font-medium text-base"
              >
                {t('nav-home')}
              </button>
              <button
                onClick={() => scrollToSection('standard')}
                className="text-slate-800 hover:text-emerald-700 transition-colors duration-200 font-medium text-base"
              >
                {t('nav-standard')}
              </button>
              <button
                onClick={() => scrollToSection('partnerships')}
                className="text-slate-800 hover:text-emerald-700 transition-colors duration-200 font-medium text-base"
              >
                {t('nav-partnerships')}
              </button>
              <button
                onClick={() => scrollToSection('platform')}
                className="text-slate-800 hover:text-emerald-700 transition-colors duration-200 font-medium text-base"
              >
                {t('nav-platform')}
              </button>
              <button
                onClick={() => scrollToSection('security')}
                className="text-slate-800 hover:text-emerald-700 transition-colors duration-200 font-medium text-base"
              >
                {t('nav-security')}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
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
                  onClick={() => scrollToSection('home')}
                  className="text-white hover:text-fagri-accent transition-colors duration-300 text-left"
                >
                  {t('nav-home')}
                </button>
                <button
                  onClick={() => scrollToSection('standard')}
                  className="text-white hover:text-fagri-accent transition-colors duration-300 text-left"
                >
                  {t('nav-standard')}
                </button>
                <button
                  onClick={() => scrollToSection('partnerships')}
                  className="text-white hover:text-fagri-accent transition-colors duration-300 text-left"
                >
                  {t('nav-partnerships')}
                </button>
                <button
                  onClick={() => scrollToSection('platform')}
                  className="text-white hover:text-fagri-accent transition-colors duration-300 text-left"
                >
                  {t('nav-platform')}
                </button>
                <button
                  onClick={() => scrollToSection('security')}
                  className="text-white hover:text-fagri-accent transition-colors duration-300 text-left"
                >
                  {t('nav-security')}
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
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
