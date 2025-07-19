import { useLanguage } from './language-provider';
import { FagriLogo } from '@/assets/fagri-logo';
import { Button } from '@/components/ui/button';
import { Linkedin, Twitter, Facebook } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <FagriLogo className="w-12 h-12" />
              <div>
                <h3 className="text-xl font-bold font-sans">FAGRI</h3>
                <p className="text-xs text-gray-400 font-medium">DIGITAL</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer-description')}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer-platform')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => scrollToSection('standard')}
                  className="hover:text-fagri-accent transition-colors text-left"
                >
                  {t('footer-standard')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('platform')}
                  className="hover:text-fagri-accent transition-colors text-left"
                >
                  {t('footer-certification')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('security')}
                  className="hover:text-fagri-accent transition-colors text-left"
                >
                  {t('footer-security')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('partnerships')}
                  className="hover:text-fagri-accent transition-colors text-left"
                >
                  {t('footer-partnerships')}
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer-company')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-fagri-accent transition-colors">{t('footer-about')}</a></li>
              <li><a href="#" className="hover:text-fagri-accent transition-colors">{t('footer-mission')}</a></li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-fagri-accent transition-colors text-left"
                >
                  {t('footer-contact')}
                </button>
              </li>
              <li><a href="#" className="hover:text-fagri-accent transition-colors">{t('footer-news')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer-legal')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-fagri-accent transition-colors">{t('footer-privacy')}</a></li>
              <li><a href="#" className="hover:text-fagri-accent transition-colors">{t('footer-terms')}</a></li>
              <li><a href="#" className="hover:text-fagri-accent transition-colors">{t('footer-gdpr')}</a></li>
              <li><a href="#" className="hover:text-fagri-accent transition-colors">{t('footer-cookies')}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {t('footer-copyright')}
            </p>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 bg-fagri-green border-fagri-green text-white hover:bg-fagri-light"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 bg-fagri-green border-fagri-green text-white hover:bg-fagri-light"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 bg-fagri-green border-fagri-green text-white hover:bg-fagri-light"
              >
                <Facebook className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
