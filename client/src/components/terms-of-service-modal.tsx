import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from './language-provider';
import { FileText } from 'lucide-react';
import { FagriLogo } from '../assets/fagri-logo';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsOfServiceModal({ isOpen, onClose }: TermsOfServiceModalProps) {
  const { language } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white" style={{ zIndex: 9999 }}>
        <DialogHeader className="pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="h-8 w-8 text-blue-700" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-light text-slate-900">
                  {language === 'it' ? 'Termini di Servizio' : 'Terms of Service'}
                </DialogTitle>
                <p className="text-slate-600 font-light">
                  {language === 'it' 
                    ? 'Condizioni di utilizzo della piattaforma FAGRI Digital'
                    : 'FAGRI Digital platform usage conditions'
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
                <h2 className="text-xl font-semibold text-slate-900">1. Accettazione dei Termini</h2>
                <p>
                  Utilizzando la piattaforma FAGRI Digital, accetti di essere vincolato da questi termini di servizio. 
                  Se non accetti questi termini, non utilizzare i nostri servizi.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">2. Servizi Forniti</h2>
                <p>
                  FAGRI Digital fornisce servizi di certificazione CO₂ per il settore agricolo secondo lo standard 
                  europeo EUFD2025-001. I servizi includono:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Registrazione e verifica di progetti agricoli sostenibili</li>
                  <li>Certificazione delle emissioni di CO₂ e sequestro del carbonio</li>
                  <li>Gestione di crediti di carbonio su blockchain</li>
                  <li>Reportistica di conformità normativa</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">3. Responsabilità dell'Utente</h2>
                <p>
                  Come utente della piattaforma, sei responsabile per:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fornire informazioni accurate e complete</li>
                  <li>Mantenere la riservatezza delle credenziali di accesso</li>
                  <li>Utilizzare i servizi in conformità con le leggi applicabili</li>
                  <li>Rispettare i diritti di proprietà intellettuale</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">4. Limitazione di Responsabilità</h2>
                <p>
                  FAGRI Digital fornisce i servizi "così come sono" e non garantisce risultati specifici. 
                  La nostra responsabilità è limitata nei modi previsti dalla legge applicabile.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">5. Terminazione</h2>
                <p>
                  Possiamo terminare o sospendere l'accesso ai nostri servizi in caso di violazione di questi termini 
                  o per motivi legittimi secondo la normativa applicabile.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">6. Legge Applicabile</h2>
                <p>
                  Questi termini sono regolati dalla legge italiana. Qualsiasi controversia sarà soggetta 
                  alla giurisdizione esclusiva dei tribunali italiani.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">1. Acceptance of Terms</h2>
                <p>
                  By using the FAGRI Digital platform, you agree to be bound by these terms of service. 
                  If you do not accept these terms, do not use our services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">2. Services Provided</h2>
                <p>
                  FAGRI Digital provides CO₂ certification services for the agricultural sector according to 
                  European standard EUFD2025-001. Services include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Registration and verification of sustainable agricultural projects</li>
                  <li>CO₂ emissions certification and carbon sequestration</li>
                  <li>Blockchain-based carbon credit management</li>
                  <li>Regulatory compliance reporting</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">3. User Responsibilities</h2>
                <p>
                  As a platform user, you are responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Providing accurate and complete information</li>
                  <li>Maintaining confidentiality of access credentials</li>
                  <li>Using services in compliance with applicable laws</li>
                  <li>Respecting intellectual property rights</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">4. Limitation of Liability</h2>
                <p>
                  FAGRI Digital provides services "as is" and does not guarantee specific results. 
                  Our liability is limited as provided by applicable law.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">5. Termination</h2>
                <p>
                  We may terminate or suspend access to our services in case of violation of these terms 
                  or for legitimate reasons under applicable regulations.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">6. Governing Law</h2>
                <p>
                  These terms are governed by Italian law. Any disputes will be subject to the 
                  exclusive jurisdiction of Italian courts.
                </p>
              </section>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}