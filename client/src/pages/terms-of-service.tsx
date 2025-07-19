import { useLanguage } from '@/components/language-provider';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

function TermsOfServicePage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {language === 'it' ? 'Torna alla Home' : 'Back to Home'}
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-fagri-green mb-4">
              {language === 'it' ? 'Termini e Condizioni di Servizio' : 'Terms and Conditions of Service'}
            </h1>
            <p className="text-gray-600">
              {language === 'it' 
                ? 'Ultima modifica: 19 luglio 2025' 
                : 'Last updated: July 19, 2025'}
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            {language === 'it' ? (
              <>
                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">1. Definizioni e Oggetto</h2>
                  <p className="text-gray-700 leading-relaxed">
                    I presenti Termini e Condizioni disciplinano l'utilizzo della piattaforma digitale FAGRI.Digital, 
                    operata da <strong>Fagri Digital S.r.l.</strong> (di seguito "Fagri Digital", "noi", "nostro").
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    La piattaforma fornisce servizi di certificazione CO₂ per il settore agricolo attraverso 
                    il protocollo EUFD2025-001, sviluppato in partnership con ALPHAG8 Digital Solutions Switzerland.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">2. Accettazione dei Termini</h2>
                  <p className="text-gray-700 leading-relaxed">
                    L'utilizzo della piattaforma implica l'accettazione integrale dei presenti termini. 
                    Se non si accettano questi termini, non utilizzare la piattaforma.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">3. Servizi Offerti</h2>
                  <p className="text-gray-700 leading-relaxed">FAGRI.Digital offre:</p>
                  <ul className="text-gray-700 space-y-2 list-disc pl-6">
                    <li>Certificazione CO₂ secondo il protocollo EUFD2025-001</li>
                    <li>Piattaforma blockchain per la tracciabilità dei crediti di carbonio</li>
                    <li>Servizi di consulenza per la sostenibilità agricola</li>
                    <li>Accesso alla rete Filiera Agricola Italiana</li>
                    <li>Supporto tecnico e formativo</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">4. Registrazione e Account</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Per accedere a determinati servizi è necessario registrarsi fornendo informazioni accurate e complete. 
                    L'utente è responsabile della sicurezza delle proprie credenziali di accesso.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">5. Obblighi dell'Utente</h2>
                  <p className="text-gray-700 leading-relaxed">L'utente si impegna a:</p>
                  <ul className="text-gray-700 space-y-2 list-disc pl-6">
                    <li>Utilizzare la piattaforma in conformità alle leggi applicabili</li>
                    <li>Fornire informazioni veritiere e aggiornate</li>
                    <li>Non compromettere la sicurezza della piattaforma</li>
                    <li>Rispettare i diritti di proprietà intellettuale</li>
                    <li>Non utilizzare la piattaforma per attività illegali o fraudolente</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">6. Proprietà Intellettuale</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Tutti i contenuti, software, design e materiali presenti sulla piattaforma sono protetti 
                    da diritti di proprietà intellettuale e rimangono di proprietà di Fagri Digital o dei rispettivi titolari.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">7. Limitazione di Responsabilità</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Fagri Digital si impegna a fornire servizi di qualità ma non garantisce risultati specifici. 
                    La responsabilità è limitata nei termini previsti dalla legge applicabile.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">8. Modifiche ai Termini</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Fagri Digital si riserva il diritto di modificare questi termini in qualsiasi momento. 
                    Le modifiche saranno comunicate agli utenti e entreranno in vigore dalla data di pubblicazione.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">9. Legge Applicabile</h2>
                  <p className="text-gray-700 leading-relaxed">
                    I presenti termini sono disciplinati dalla legge italiana. 
                    Per qualsiasi controversia sarà competente il Foro di Roma.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">10. Contatti</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Per domande sui presenti termini: <a href="mailto:legal@fagri.digital" className="text-emerald-600 hover:text-emerald-700">legal@fagri.digital</a>
                  </p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">1. Definitions and Subject Matter</h2>
                  <p className="text-gray-700 leading-relaxed">
                    These Terms and Conditions govern the use of the FAGRI.Digital platform, 
                    operated by <strong>Fagri Digital S.r.l.</strong> (hereinafter "Fagri Digital", "we", "our").
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The platform provides CO₂ certification services for the agricultural sector through 
                    the EUFD2025-001 protocol, developed in partnership with ALPHAG8 Digital Solutions Switzerland.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">2. Acceptance of Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Use of the platform implies full acceptance of these terms. 
                    If you do not accept these terms, do not use the platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">3. Services Offered</h2>
                  <p className="text-gray-700 leading-relaxed">FAGRI.Digital offers:</p>
                  <ul className="text-gray-700 space-y-2 list-disc pl-6">
                    <li>CO₂ certification according to EUFD2025-001 protocol</li>
                    <li>Blockchain platform for carbon credit traceability</li>
                    <li>Consulting services for agricultural sustainability</li>
                    <li>Access to the Italian Agricultural Supply Chain network</li>
                    <li>Technical and educational support</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">4. Registration and Account</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Access to certain services requires registration with accurate and complete information. 
                    Users are responsible for the security of their access credentials.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">5. User Obligations</h2>
                  <p className="text-gray-700 leading-relaxed">Users commit to:</p>
                  <ul className="text-gray-700 space-y-2 list-disc pl-6">
                    <li>Use the platform in compliance with applicable laws</li>
                    <li>Provide truthful and updated information</li>
                    <li>Not compromise platform security</li>
                    <li>Respect intellectual property rights</li>
                    <li>Not use the platform for illegal or fraudulent activities</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">6. Intellectual Property</h2>
                  <p className="text-gray-700 leading-relaxed">
                    All content, software, design and materials on the platform are protected 
                    by intellectual property rights and remain the property of Fagri Digital or respective owners.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">7. Limitation of Liability</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Fagri Digital is committed to providing quality services but does not guarantee specific results. 
                    Liability is limited as provided by applicable law.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">8. Changes to Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Fagri Digital reserves the right to modify these terms at any time. 
                    Changes will be communicated to users and take effect from the publication date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">9. Applicable Law</h2>
                  <p className="text-gray-700 leading-relaxed">
                    These terms are governed by Italian law. 
                    The Court of Rome has jurisdiction for any disputes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">10. Contact</h2>
                  <p className="text-gray-700 leading-relaxed">
                    For questions about these terms: <a href="mailto:legal@fagri.digital" className="text-emerald-600 hover:text-emerald-700">legal@fagri.digital</a>
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

export default TermsOfServicePage;