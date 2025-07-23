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
    <footer className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
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
                <a href="mailto:Contact@fagri.digital" className="hover:text-fagri-accent transition-colors">
                  Contact@fagri.digital
                </a>
              </div>
            </div>
          </div>
          
          {/* Partners Section */}
          <div>
            <h4 className="text-lg font-semibold mb-8 text-white">{t('footer-partners')}</h4>
            
            {/* Institutional Partners */}
            <div className="mb-8">
              <h5 className="text-sm font-medium text-emerald-400 mb-4 uppercase tracking-wider">Institutional Partners</h5>
              <div className="grid gap-3">
                <a 
                  href="https://commission.europa.eu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center justify-between group"
                >
                  European Commission
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a 
                  href="https://www.mase.gov.it" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center justify-between group"
                >
                  Italian Ministry of Environment
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a 
                  href="https://www.gse.it" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center justify-between group"
                >
                  GSE - Energy Services Manager
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a 
                  href="https://www.suoloesalute.it" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center justify-between group"
                >
                  SUOLO E SALUTE
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a 
                  href="https://www.iso.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center justify-between group"
                >
                  ISO / UNI Standards
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a 
                  href="https://www.unitus.it" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center justify-between group"
                >
                  Università La Tuscia
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>

            {/* Technology Partners */}
            <div>
              <h5 className="text-sm font-medium text-blue-400 mb-4 uppercase tracking-wider">Technology Partners</h5>
              <div className="grid gap-3">
                <a 
                  href="https://alphag8.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center justify-between group"
                >
                  ALPHAG8 Digital Solutions
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a 
                  href="https://g8chain.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center justify-between group"
                >
                  G8Chain Blockchain
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="text-lg font-semibold mb-8 text-white">{t('footer-legal')}</h4>
            <div className="grid gap-4">
              <Link href="/privacy-policy">
                <span className="text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer text-sm block">
                  {t('footer-privacy')}
                </span>
              </Link>
              <Link href="/terms-of-service">
                <span className="text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer text-sm block">
                  {t('footer-terms')}
                </span>
              </Link>
              <Link href="/gdpr">
                <span className="text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer text-sm block">
                  {t('footer-gdpr')}
                </span>
              </Link>
              <Link href="/cookies">
                <span className="text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer text-sm block">
                  {t('footer-cookies')}
                </span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-base mb-4 md:mb-0 font-medium">
              {t('footer-copyright')}
            </p>
            <div className="text-xs text-gray-500">
              <span>Technology by </span>
              <a 
                href="https://alphag8.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                ALPHAG8
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
