import { useLanguage } from './language-provider';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import { ExternalLink } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();
  const [location, setLocation] = useLocation();

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
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold font-sans">FAGRI</h3>
              <p className="text-xs text-gray-400 font-medium">DIGITAL</p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer-description')}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer-platform')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/eufd-standard">
                  <span className="hover:text-fagri-accent transition-colors cursor-pointer">
                    {t('footer-standard')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/co2-certification">
                  <span className="hover:text-fagri-accent transition-colors cursor-pointer">
                    {t('footer-certification')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/security">
                  <span className="hover:text-fagri-accent transition-colors cursor-pointer text-emerald-400 font-medium">
                    🔒 {t('footer-security')}
                  </span>
                </Link>
              </li>

            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer-company')}</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div>
                <p className="font-medium text-white">Fagri Digital S.r.l.</p>
                <p>Via Isonzo 38</p>
                <p>00198 Roma (RM) – Italia</p>
              </div>
              <div>
                <p>C.F./P.IVA: 17843431002</p>
                <p>REA RM-1745329</p>
              </div>
              <div>
                <a href="mailto:info@fagri.digital" className="hover:text-fagri-accent transition-colors">
                  info@fagri.digital
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer-partners')}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a 
                  href="https://alphag8.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-fagri-accent transition-colors flex items-center"
                >
                  ALPHAG8 Digital Solutions
                  <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://g8chain.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-fagri-accent transition-colors flex items-center"
                >
                  G8Chain Blockchain
                  <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </li>
            </ul>
            
            <h4 className="font-semibold mb-4 mt-6">{t('footer-legal')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/privacy-policy">
                  <span className="hover:text-fagri-accent transition-colors cursor-pointer">
                    {t('footer-privacy')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service">
                  <span className="hover:text-fagri-accent transition-colors cursor-pointer">
                    {t('footer-terms')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/gdpr">
                  <span className="hover:text-fagri-accent transition-colors cursor-pointer">
                    {t('footer-gdpr')}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/cookies">
                  <span className="hover:text-fagri-accent transition-colors cursor-pointer">
                    {t('footer-cookies')}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-base mb-4 md:mb-0 font-medium">
              {t('footer-copyright')}
            </p>
            <div className="flex space-x-2 text-xs text-gray-500">
              <span>Concept e Design del Sito Web di</span>
              <a 
                href="https://alphag8.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                ALPHAG8 Digital Solution Switzerland Technology by ALPHAG8
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
