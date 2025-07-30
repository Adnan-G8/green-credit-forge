import { useState, useEffect } from 'react';
import { useLanguage } from './language-provider';
import { FagriLogo } from '@/assets/fagri-logo';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import { useLocation } from 'wouter';

export function SimpleNavigation() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

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
      // Navigate to home page first, then scroll to section
      window.location.href = `/#${sectionId}`;
    }
    setIsOpen(false);
  };

  const handleLanguageToggle = () => {
    setLanguage(language === 'it' ? 'en' : 'it');
  };

  const navigationItems = [
    { key: 'home', label: t('nav-home'), href: '/' },
    { key: 'standard', label: t('nav-standard'), section: 'standard' },
    { key: 'platform', label: t('nav-platform'), section: 'platform' },
    { key: 'security', label: t('nav-security'), section: 'security' },
    { key: 'contact', label: t('nav-contact'), section: 'contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg border-b border-slate-200' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <FagriLogo className="h-12 w-12" />
              <span className={`text-2xl font-light transition-colors duration-300 ${
                isScrolled ? 'text-slate-800' : 'text-white'
              }`}>
                FAGRI.Digital
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    if (item.href) {
                      window.location.href = item.href;
                    } else if (item.section) {
                      navigateToSection(item.section);
                    }
                  }}
                  className={`text-sm font-light transition-colors duration-300 hover:text-emerald-400 ${
                    isScrolled ? 'text-slate-700' : 'text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Language Toggle */}
              <button
                onClick={handleLanguageToggle}
                className={`px-3 py-1 text-sm font-medium rounded-full border transition-all duration-300 ${
                  isScrolled 
                    ? 'text-slate-700 border-slate-300 hover:bg-slate-100' 
                    : 'text-white border-white/50 hover:bg-white/10'
                }`}
              >
                {language === 'it' ? 'EN' : 'IT'}
              </button>

              {/* Authentication Buttons */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-emerald-700 border-emerald-700 hover:bg-emerald-50 transition-colors duration-200"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  {t('sign-in') || (language === 'it' ? 'Accedi' : 'Sign In')}
                </Button>
                
                <Button
                  size="sm"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white transition-colors duration-200"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  {language === 'it' ? 'Crea Account' : 'Create Account'}
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Mobile Language Toggle */}
              <button
                onClick={handleLanguageToggle}
                className={`px-2 py-1 text-xs font-medium rounded border transition-all duration-300 ${
                  isScrolled 
                    ? 'text-slate-700 border-slate-300' 
                    : 'text-white border-white/50'
                }`}
              >
                {language === 'it' ? 'EN' : 'IT'}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-slate-700 hover:bg-slate-100' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-slate-200">
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-4">
                {/* Mobile Navigation Links */}
                {navigationItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      if (item.href) {
                        window.location.href = item.href;
                      } else if (item.section) {
                        navigateToSection(item.section);
                      }
                    }}
                    className="block w-full text-left text-slate-700 hover:text-emerald-600 transition-colors duration-300 py-2"
                  >
                    {item.label}
                  </button>
                ))}

                {/* Mobile Authentication Buttons */}
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full text-emerald-700 border-emerald-700 hover:bg-emerald-50"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    {t('sign-in') || (language === 'it' ? 'Accedi' : 'Sign In')}
                  </Button>
                  
                  <Button
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    {language === 'it' ? 'Crea Account' : 'Create Account'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}