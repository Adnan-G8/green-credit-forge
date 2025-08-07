
import { useLanguage } from './language-provider';
import { FagriLogo } from '@/assets/fagri-logo';
import { Link } from 'wouter';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <FagriLogo className="w-20 h-12 mb-4" />
            <p className="text-slate-400 leading-relaxed">
              {t('footer-description') || 'Leading the digital transformation with sustainable solutions.'}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer-company') || 'Company'}</h3>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer-legal') || 'Legal'}</h3>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/gdpr" className="hover:text-white transition-colors">GDPR</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer-connect') || 'Connect'}</h3>
            <p className="text-slate-400">contact@fagri.digital</p>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
          <p>&copy; 2024 FAGRI Digital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
