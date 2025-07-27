import { useEffect } from 'react';
import { useLanguage } from './language-provider';
import { X, Shield } from 'lucide-react';
import { FagriLogo } from '../assets/fagri-logo';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  const { language } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
           onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-200 px-8 py-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-8 w-10 h-10 rounded-full bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center transition-all duration-200 shadow-sm"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
          
          <div className="flex items-center justify-between pr-16">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-emerald-700 mb-1">
                  {language === 'it' ? 'Privacy Policy' : 'Privacy Policy'}
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
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Security Notice */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-emerald-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-emerald-700 mb-2">
                  {language === 'it' ? 'Sicurezza dei Dati' : 'Data Security'}
                </h3>
                <p className="text-emerald-700 text-sm">
                  {language === 'it'
                    ? 'Tutti i dati sono protetti da tecnologie di sicurezza di livello bancario svizzero, conformi ai più elevati standard internazionali di protezione dei dati.'
                    : 'All data is protected by Swiss banking-level security technologies, compliant with the highest international data protection standards.'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {language === 'it' ? (
              <>
                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">1. Introduzione</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Fagri Digital S.r.l. (di seguito "Fagri Digital" o "noi") si impegna a proteggere 
                    la privacy e i dati personali dei propri utenti. Questa Privacy Policy descrive 
                    come raccogliamo, utilizziamo e proteggiamo le informazioni personali quando 
                    utilizzi la nostra piattaforma di certificazione CO₂.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">2. Dati Raccolti</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">Raccogliamo i seguenti tipi di dati:</p>
                  <ul className="text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                    <li>Informazioni di identificazione personale (nome, cognome, email, telefono)</li>
                    <li>Dati aziendali (ragione sociale, settore di attività, ubicazione)</li>
                    <li>Informazioni tecniche (indirizzo IP, browser, dispositivo)</li>
                    <li>Dati relativi all'utilizzo della piattaforma</li>
                    <li>Certificazioni e documentazione agricola</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">3. Finalità del Trattamento</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">I dati vengono utilizzati per:</p>
                  <ul className="text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                    <li>Fornire servizi di certificazione CO₂</li>
                    <li>Gestire l'account utente e l'autenticazione</li>
                    <li>Comunicazioni relative al servizio</li>
                    <li>Miglioramento dei servizi offerti</li>
                    <li>Adempimenti legali e normativi</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">4. Base Giuridica</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Il trattamento dei dati si basa su: consenso dell'interessato, esecuzione di un contratto, 
                    adempimento di obblighi legali e legittimo interesse del titolare del trattamento.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">5. Conservazione dei Dati</h2>
                  <p className="text-gray-700 leading-relaxed">
                    I dati personali vengono conservati per il tempo necessario al raggiungimento delle finalità 
                    per cui sono stati raccolti, in conformità alle normative vigenti e ai tempi di conservazione 
                    previsti dalla legge.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">6. Diritti dell'Interessato</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">Secondo il GDPR, hai il diritto di:</p>
                  <ul className="text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                    <li>Accedere ai tuoi dati personali</li>
                    <li>Richiedere la rettifica o la cancellazione</li>
                    <li>Limitare il trattamento</li>
                    <li>Portabilità dei dati</li>
                    <li>Opporti al trattamento</li>
                    <li>Revocare il consenso in qualsiasi momento</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Per esercitare questi diritti, contatta: <a href="mailto:privacy@fagri.digital" className="text-emerald-600 hover:text-emerald-700">privacy@fagri.digital</a>
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">7. Sicurezza</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Implementiamo misure di sicurezza tecniche e organizzative appropriate per proteggere 
                    i dati personali da accessi non autorizzati, perdita, distruzione o alterazione.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">8. Trasferimenti Internazionali</h2>
                  <p className="text-gray-700 leading-relaxed">
                    I dati possono essere trasferiti in paesi terzi solo se garantiscono un livello 
                    adeguato di protezione secondo le normative europee.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">9. Modifiche</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Ci riserviamo il diritto di modificare questa Privacy Policy. 
                    Le modifiche saranno comunicate agli utenti e pubblicate sul sito web.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">10. Contatti</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Per domande su questa Privacy Policy: <a href="mailto:privacy@fagri.digital" className="text-emerald-600 hover:text-emerald-700">privacy@fagri.digital</a>
                  </p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">1. Introduction</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Fagri Digital S.r.l. (hereinafter "Fagri Digital" or "we") is committed to protecting 
                    the privacy and personal data of its users. This Privacy Policy describes 
                    how we collect, use and protect personal information when 
                    you use our CO₂ certification platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">2. Data Collected</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">We collect the following types of data:</p>
                  <ul className="text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                    <li>Personal identification information (name, surname, email, phone)</li>
                    <li>Business data (company name, business sector, location)</li>
                    <li>Technical information (IP address, browser, device)</li>
                    <li>Platform usage data</li>
                    <li>Agricultural certifications and documentation</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">3. Processing Purposes</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">Data is used for:</p>
                  <ul className="text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                    <li>Providing CO₂ certification services</li>
                    <li>Managing user accounts and authentication</li>
                    <li>Service-related communications</li>
                    <li>Improving offered services</li>
                    <li>Legal and regulatory compliance</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">4. Legal Basis</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Data processing is based on: data subject consent, contract execution, 
                    compliance with legal obligations and legitimate interest of the data controller.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">5. Data Retention</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Personal data is retained for the time necessary to achieve the purposes 
                    for which it was collected, in compliance with current regulations and retention 
                    periods required by law.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">6. Data Subject Rights</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">According to GDPR, you have the right to:</p>
                  <ul className="text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                    <li>Access your personal data</li>
                    <li>Request rectification or erasure</li>
                    <li>Restrict processing</li>
                    <li>Data portability</li>
                    <li>Object to processing</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    To exercise these rights, contact: <a href="mailto:privacy@fagri.digital" className="text-emerald-600 hover:text-emerald-700">privacy@fagri.digital</a>
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">7. Security</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We implement appropriate technical and organizational security measures to protect 
                    personal data from unauthorized access, loss, destruction or alteration.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">8. International Transfers</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Data may be transferred to third countries only if they guarantee an adequate level 
                    of protection according to European regulations.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">9. Changes</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to modify this Privacy Policy. 
                    Changes will be communicated to users and published on the website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-emerald-700 mb-4">10. Contact</h2>
                  <p className="text-gray-700 leading-relaxed">
                    For questions about this Privacy Policy: <a href="mailto:privacy@fagri.digital" className="text-emerald-600 hover:text-emerald-700">privacy@fagri.digital</a>
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