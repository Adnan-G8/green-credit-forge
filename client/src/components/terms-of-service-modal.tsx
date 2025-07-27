import { useEffect } from 'react';
import { useLanguage } from './language-provider';
import { X, FileText } from 'lucide-react';
import { FagriLogo } from '../assets/fagri-logo';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsOfServiceModal({ isOpen, onClose }: TermsOfServiceModalProps) {
  const { language } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      // Add a small delay to prevent immediate event conflicts
      const timer = setTimeout(() => {
        document.body.style.overflow = 'hidden';
      }, 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={(e) => {
          e.preventDefault();
          onClose();
        }}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col animate-in fade-in-0 zoom-in-95 duration-200"
           onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-200 px-8 py-6 relative flex-shrink-0">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            type="button"
            className="absolute top-6 right-8 w-10 h-10 rounded-full bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center transition-all duration-200 shadow-sm z-20"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
          
          <div className="flex items-center justify-between pr-16">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-700 mb-1">
                  {language === 'it' ? 'Termini e Condizioni di Servizio' : 'Terms and Conditions of Service'}
                </h1>
                <p className="text-slate-600">
                  {language === 'it' 
                    ? 'Ultima modifica: 19 luglio 2025' 
                    : 'Last updated: July 19, 2025'}
                </p>
              </div>
            </div>
            
            {/* FAGRI Logo */}
            <div className="flex items-center">
              <FagriLogo className="w-20 h-12" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <FileText className="h-6 w-6 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-700 mb-2">
                  {language === 'it' ? 'Condizioni Legali' : 'Legal Conditions'}
                </h3>
                <p className="text-blue-700 text-sm">
                  {language === 'it'
                    ? 'Questi termini disciplinano l\'utilizzo della piattaforma FAGRI.Digital e dei servizi di certificazione CO₂.'
                    : 'These terms govern the use of the FAGRI.Digital platform and CO₂ certification services.'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {language === 'it' ? (
              <>
                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">1. Definizioni</h2>
                  <p className="text-gray-700 leading-relaxed">
                    La "Piattaforma" si riferisce al sito web FAGRI.Digital e a tutti i servizi correlati 
                    offerti da Fagri Digital S.r.l. per la certificazione CO₂ e la tracciabilità 
                    dei crediti di carbonio.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">2. Accettazione dei Termini</h2>
                  <p className="text-gray-700 leading-relaxed">
                    L'utilizzo della piattaforma implica la piena accettazione di questi termini. 
                    Se non accetti questi termini, non utilizzare la piattaforma.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">3. Servizi Offerti</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">FAGRI.Digital offre:</p>
                  <ul className="text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                    <li>Certificazione CO₂ secondo il protocollo EUFD2025-001</li>
                    <li>Piattaforma blockchain per la tracciabilità dei crediti di carbonio</li>
                    <li>Servizi di consulenza per la sostenibilità agricola</li>
                    <li>Accesso alla rete della Filiera Agricola Italiana</li>
                    <li>Supporto tecnico e formativo</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">4. Obblighi dell'Utente</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">L'utente si impegna a:</p>
                  <ul className="text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                    <li>Fornire informazioni accurate e veritiere</li>
                    <li>Mantenere riservate le credenziali di accesso</li>
                    <li>Utilizzare la piattaforma in conformità alle leggi applicabili</li>
                    <li>Non compromettere la sicurezza del sistema</li>
                    <li>Rispettare i diritti di proprietà intellettuale</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">5. Pagamenti e Rimborsi</h2>
                  <p className="text-gray-700 leading-relaxed">
                    I servizi di certificazione sono soggetti a tariffe specifiche. 
                    I pagamenti devono essere effettuati secondo i termini concordati. 
                    Le politiche di rimborso sono disponibili su richiesta.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">6. Proprietà Intellettuale</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Tutti i contenuti, software, design e materiali sulla piattaforma sono protetti 
                    da diritti di proprietà intellettuale e rimangono di proprietà di Fagri Digital o dei rispettivi proprietari.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">7. Limitazione di Responsabilità</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Fagri Digital si impegna a fornire servizi di qualità ma non garantisce risultati specifici. 
                    La responsabilità è limitata come previsto dalla legge applicabile.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">8. Modifiche ai Termini</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Fagri Digital si riserva il diritto di modificare questi termini in qualsiasi momento. 
                    Le modifiche saranno comunicate agli utenti e avranno effetto dalla data di pubblicazione.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">9. Legge Applicabile</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Questi termini sono disciplinati dalla legge italiana. 
                    Il Tribunale di Roma ha giurisdizione per eventuali controversie.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">10. Contatti</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Per domande su questi termini: <a href="mailto:legal@fagri.digital" className="text-blue-600 hover:text-blue-700">legal@fagri.digital</a>
                  </p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">1. Definitions</h2>
                  <p className="text-gray-700 leading-relaxed">
                    The "Platform" refers to the FAGRI.Digital website and all related services 
                    offered by Fagri Digital S.r.l. for CO₂ certification and carbon credit traceability.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">2. Acceptance of Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Use of the platform implies full acceptance of these terms. 
                    If you do not accept these terms, do not use the platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">3. Services Offered</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">FAGRI.Digital offers:</p>
                  <ul className="text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                    <li>CO₂ certification according to EUFD2025-001 protocol</li>
                    <li>Blockchain platform for carbon credit traceability</li>
                    <li>Consulting services for agricultural sustainability</li>
                    <li>Access to the Italian Agricultural Supply Chain network</li>
                    <li>Technical and educational support</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">4. User Obligations</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">The user agrees to:</p>
                  <ul className="text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                    <li>Provide accurate and truthful information</li>
                    <li>Keep access credentials confidential</li>
                    <li>Use the platform in compliance with applicable laws</li>
                    <li>Not compromise system security</li>
                    <li>Respect intellectual property rights</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">5. Payments and Refunds</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Certification services are subject to specific fees. 
                    Payments must be made according to agreed terms. 
                    Refund policies are available upon request.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">6. Intellectual Property</h2>
                  <p className="text-gray-700 leading-relaxed">
                    All content, software, design and materials on the platform are protected 
                    by intellectual property rights and remain the property of Fagri Digital or respective owners.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">7. Limitation of Liability</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Fagri Digital is committed to providing quality services but does not guarantee specific results. 
                    Liability is limited as provided by applicable law.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">8. Changes to Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Fagri Digital reserves the right to modify these terms at any time. 
                    Changes will be communicated to users and take effect from the publication date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">9. Applicable Law</h2>
                  <p className="text-gray-700 leading-relaxed">
                    These terms are governed by Italian law. 
                    The Court of Rome has jurisdiction for any disputes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">10. Contact</h2>
                  <p className="text-gray-700 leading-relaxed">
                    For questions about these terms: <a href="mailto:legal@fagri.digital" className="text-blue-600 hover:text-blue-700">legal@fagri.digital</a>
                  </p>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}