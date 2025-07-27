import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from './language-provider';
import { Shield } from 'lucide-react';
import { FagriLogo } from '../assets/fagri-logo';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  const { language } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white" style={{ zIndex: 9999 }}>
        <DialogHeader className="pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Shield className="h-8 w-8 text-emerald-700" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-light text-slate-900">
                  {language === 'it' ? 'Informativa sulla Privacy' : 'Privacy Policy'}
                </DialogTitle>
                <p className="text-slate-600 font-light">
                  {language === 'it' 
                    ? 'Come proteggiamo e gestiamo i tuoi dati personali'
                    : 'How we protect and manage your personal data'
                  }
                </p>
              </div>
            </div>
            
            {/* FAGRI Logo */}
            <div className="flex items-center">
              <FagriLogo className="w-24 h-14" />
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="space-y-6 text-slate-700 leading-relaxed">
          {language === 'it' ? (
            <>
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">1. Raccolta dei Dati</h2>
                <p>
                  FAGRI Digital S.r.l. raccoglie i dati personali necessari per fornire i servizi di certificazione CO₂ 
                  e gestione delle applicazioni di membership. I dati raccolti includono informazioni di contatto, 
                  dettagli aziendali e informazioni relative alle attività agricole.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">2. Utilizzo dei Dati</h2>
                <p>
                  I tuoi dati personali vengono utilizzati esclusivamente per:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Processare la tua richiesta di membership FAGRI</li>
                  <li>Fornire servizi di certificazione CO₂ secondo lo standard EUFD2025-001</li>
                  <li>Comunicazioni relative ai servizi e aggiornamenti della piattaforma</li>
                  <li>Adempimenti legali e normativi</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">3. Protezione dei Dati</h2>
                <p>
                  Implementiamo misure di sicurezza avanzate per proteggere i tuoi dati personali:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Crittografia AES-256 per tutti i dati sensibili</li>
                  <li>Infrastruttura sicura ospitata in data center militari svizzeri</li>
                  <li>Conformità GDPR e normative sulla protezione dei dati</li>
                  <li>Accesso limitato ai dati solo al personale autorizzato</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">4. I Tuoi Diritti</h2>
                <p>
                  In conformità al GDPR, hai diritto a:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Accedere ai tuoi dati personali</li>
                  <li>Richiedere la correzione di dati inesatti</li>
                  <li>Richiedere la cancellazione dei tuoi dati</li>
                  <li>Opporti al trattamento dei tuoi dati</li>
                  <li>Richiedere la portabilità dei dati</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">5. Contatti</h2>
                <p>
                  Per qualsiasi domanda riguardo questa informativa sulla privacy o per esercitare i tuoi diritti, 
                  contattaci a: <strong>Contact@fagri.digital</strong>
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">1. Data Collection</h2>
                <p>
                  FAGRI Digital S.r.l. collects personal data necessary to provide CO₂ certification services 
                  and manage membership applications. Data collected includes contact information, 
                  business details, and agricultural activity information.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">2. Data Usage</h2>
                <p>
                  Your personal data is used exclusively for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Processing your FAGRI membership application</li>
                  <li>Providing CO₂ certification services according to EUFD2025-001 standard</li>
                  <li>Service communications and platform updates</li>
                  <li>Legal and regulatory compliance</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">3. Data Protection</h2>
                <p>
                  We implement advanced security measures to protect your personal data:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AES-256 encryption for all sensitive data</li>
                  <li>Secure infrastructure hosted in Swiss military-grade data centers</li>
                  <li>GDPR compliance and data protection regulations</li>
                  <li>Limited data access to authorized personnel only</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">4. Your Rights</h2>
                <p>
                  In accordance with GDPR, you have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal data</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to data processing</li>
                  <li>Request data portability</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">5. Contact</h2>
                <p>
                  For any questions regarding this privacy policy or to exercise your rights, 
                  contact us at: <strong>Contact@fagri.digital</strong>
                </p>
              </section>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}