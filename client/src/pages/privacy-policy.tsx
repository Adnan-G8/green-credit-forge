import { useLanguage } from '@/components/language-provider';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

function PrivacyPolicyPage() {
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
              {language === 'it' ? 'Privacy Policy' : 'Privacy Policy'}
            </h1>
            <p className="text-gray-600 mb-6">
              {language === 'it' 
                ? 'Ultima modifica: 19 luglio 2025' 
                : 'Last updated: July 19, 2025'}
            </p>
            
            {/* Security Notice */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                    {language === 'it' ? 'Sicurezza dei Tuoi Dati' : 'Your Data Security'}
                  </h3>
                  <p className="text-emerald-700 mb-3">
                    {language === 'it' 
                      ? 'I tuoi dati sono protetti dai più alti standard di sicurezza internazionali, inclusi ambienti bancari svizzeri per dati sensibili e infrastrutture globali ridondanti per massima disponibilità.'
                      : 'Your data is protected by the highest international security standards, including Swiss banking environments for sensitive data and redundant global infrastructure for maximum availability.'}
                  </p>
                  <Link href="/security">
                    <Button variant="outline" size="sm" className="text-emerald-700 border-emerald-300 hover:bg-emerald-100">
                      {language === 'it' ? 'Scopri la Nostra Sicurezza Digitale' : 'Learn About Our Digital Security'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            {language === 'it' ? (
              <>
                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">1. Titolare del Trattamento</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Il Titolare del trattamento dei dati personali è <strong>Fagri Digital S.r.l.</strong>, con sede legale in Via Isonzo 38, 00198 Roma (RM), Italia.
                  </p>
                  <ul className="text-gray-700 space-y-2">
                    <li>C.F./P.IVA: 17843431002</li>
                    <li>REA RM-1745329</li>
                    <li>Email: privacy@fagri.digital</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">2. Tipologia di Dati Raccolti</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Raccogliamo e trattiamo le seguenti categorie di dati personali:
                  </p>
                  <ul className="text-gray-700 space-y-2 list-disc pl-6">
                    <li><strong>Dati di contatto:</strong> nome, cognome, indirizzo email, numero di telefono</li>
                    <li><strong>Dati aziendali:</strong> nome dell'azienda o organizzazione, settore di attività</li>
                    <li><strong>Dati di navigazione:</strong> indirizzi IP, cookie tecnici, log di accesso</li>
                    <li><strong>Dati per membership:</strong> informazioni sulla superficie agricola, tipo di attività, interessi specifici</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">3. Finalità del Trattamento</h2>
                  <p className="text-gray-700 leading-relaxed">
                    I dati personali sono trattati per le seguenti finalità:
                  </p>
                  <ul className="text-gray-700 space-y-2 list-disc pl-6">
                    <li>Rispondere alle richieste di informazioni e contatti</li>
                    <li>Gestire le domande di adesione alla Filiera Agricola Italiana</li>
                    <li>Fornire supporto tecnico e assistenza</li>
                    <li>Invio di comunicazioni relative ai servizi offerti (previo consenso)</li>
                    <li>Adempimenti di obblighi legali e fiscali</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">4. Base Giuridica</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Il trattamento è basato su:
                  </p>
                  <ul className="text-gray-700 space-y-2 list-disc pl-6">
                    <li>Consenso esplicito dell'interessato per comunicazioni marketing</li>
                    <li>Esecuzione di misure precontrattuali per le richieste di membership</li>
                    <li>Legittimo interesse per migliorare i nostri servizi</li>
                    <li>Adempimento di obblighi legali</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">5. Conservazione dei Dati</h2>
                  <p className="text-gray-700 leading-relaxed">
                    I dati personali saranno conservati per il tempo strettamente necessario alle finalità per cui sono stati raccolti:
                  </p>
                  <ul className="text-gray-700 space-y-2 list-disc pl-6">
                    <li>Dati di contatto: fino a 2 anni dalla raccolta o revoca del consenso</li>
                    <li>Dati di membership: per tutta la durata dell'adesione alla filiera</li>
                    <li>Dati di navigazione: massimo 12 mesi</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">6. Diritti dell'Interessato</h2>
                  <p className="text-gray-700 leading-relaxed">
                    In conformità al GDPR, l'interessato ha diritto a:
                  </p>
                  <ul className="text-gray-700 space-y-2 list-disc pl-6">
                    <li>Accesso ai propri dati personali</li>
                    <li>Rettifica o cancellazione dei dati</li>
                    <li>Limitazione del trattamento</li>
                    <li>Portabilità dei dati</li>
                    <li>Opposizione al trattamento</li>
                    <li>Revoca del consenso in qualsiasi momento</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Per esercitare questi diritti, contattare: <a href="mailto:privacy@fagri.digital" className="text-emerald-600 hover:text-emerald-700">privacy@fagri.digital</a>
                  </p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">1. Data Controller</h2>
                  <p className="text-gray-700 leading-relaxed">
                    The Data Controller for personal data processing is <strong>Fagri Digital S.r.l.</strong>, with registered office at Via Isonzo 38, 00198 Rome (RM), Italy.
                  </p>
                  <ul className="text-gray-700 space-y-2">
                    <li>Tax Code/VAT: 17843431002</li>
                    <li>REA RM-1745329</li>
                    <li>Email: privacy@fagri.digital</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">2. Types of Data Collected</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We collect and process the following categories of personal data:
                  </p>
                  <ul className="text-gray-700 space-y-2 list-disc pl-6">
                    <li><strong>Contact data:</strong> name, surname, email address, phone number</li>
                    <li><strong>Business data:</strong> company or organization name, sector of activity</li>
                    <li><strong>Navigation data:</strong> IP addresses, technical cookies, access logs</li>
                    <li><strong>Membership data:</strong> information about agricultural surface area, type of activity, specific interests</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">3. Purpose of Processing</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Personal data is processed for the following purposes:
                  </p>
                  <ul className="text-gray-700 space-y-2 list-disc pl-6">
                    <li>Responding to information requests and contacts</li>
                    <li>Managing membership applications to the Italian Agricultural Supply Chain</li>
                    <li>Providing technical support and assistance</li>
                    <li>Sending communications related to offered services (with prior consent)</li>
                    <li>Compliance with legal and fiscal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">4. Legal Basis</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Processing is based on:
                  </p>
                  <ul className="text-gray-700 space-y-2 list-disc pl-6">
                    <li>Explicit consent of the data subject for marketing communications</li>
                    <li>Performance of pre-contractual measures for membership requests</li>
                    <li>Legitimate interest to improve our services</li>
                    <li>Compliance with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">5. Data Retention</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Personal data will be retained for the time strictly necessary for the purposes for which it was collected:
                  </p>
                  <ul className="text-gray-700 space-y-2 list-disc pl-6">
                    <li>Contact data: up to 2 years from collection or consent withdrawal</li>
                    <li>Membership data: for the entire duration of supply chain membership</li>
                    <li>Navigation data: maximum 12 months</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">6. Data Subject Rights</h2>
                  <p className="text-gray-700 leading-relaxed">
                    In accordance with GDPR, the data subject has the right to:
                  </p>
                  <ul className="text-gray-700 space-y-2 list-disc pl-6">
                    <li>Access to their personal data</li>
                    <li>Rectification or erasure of data</li>
                    <li>Restriction of processing</li>
                    <li>Data portability</li>
                    <li>Object to processing</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    To exercise these rights, contact: <a href="mailto:privacy@fagri.digital" className="text-emerald-600 hover:text-emerald-700">privacy@fagri.digital</a>
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

export default PrivacyPolicyPage;