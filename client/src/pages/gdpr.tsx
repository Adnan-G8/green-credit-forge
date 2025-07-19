import { useLanguage } from '@/components/language-provider';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

function GDPRPage() {
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
              {language === 'it' ? 'Informazioni GDPR' : 'GDPR Information'}
            </h1>
            <p className="text-gray-600 mb-6">
              {language === 'it' 
                ? 'Regolamento Generale sulla Protezione dei Dati (UE) 2016/679' 
                : 'General Data Protection Regulation (EU) 2016/679'}
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
                    {language === 'it' ? 'Protezione dei Dati di Livello Bancario' : 'Banking-Level Data Protection'}
                  </h3>
                  <p className="text-emerald-700 mb-3">
                    {language === 'it' 
                      ? 'I tuoi dati GDPR sono gestiti con standard di sicurezza bancaria svizzera, garantendo la massima protezione e conformità normativa europea.'
                      : 'Your GDPR data is managed with Swiss banking security standards, ensuring maximum protection and European regulatory compliance.'}
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
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">Cosa è il GDPR</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Il Regolamento Generale sulla Protezione dei Dati (GDPR) è una normativa europea 
                    che disciplina il trattamento dei dati personali all'interno dell'Unione Europea. 
                    Entrato in vigore il 25 maggio 2018, stabilisce regole precise per la raccolta, 
                    l'utilizzo e la protezione dei dati personali.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">I Tuoi Diritti secondo il GDPR</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Diritto di Accesso (Art. 15)</h3>
                      <p className="text-gray-700">
                        Hai il diritto di sapere se i tuoi dati personali sono trattati e, in caso affermativo, 
                        di accedere a tali dati e ricevere informazioni specifiche sul trattamento.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Diritto di Rettifica (Art. 16)</h3>
                      <p className="text-gray-700">
                        Puoi richiedere la correzione di dati personali inesatti o incompleti che ti riguardano.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Diritto alla Cancellazione (Art. 17)</h3>
                      <p className="text-gray-700">
                        Conosciuto anche come "diritto all'oblio", ti consente di richiedere 
                        la cancellazione dei tuoi dati personali in specifiche circostanze.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Diritto di Limitazione (Art. 18)</h3>
                      <p className="text-gray-700">
                        Puoi richiedere la limitazione del trattamento dei tuoi dati personali 
                        in determinate situazioni specifiche.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Diritto alla Portabilità (Art. 20)</h3>
                      <p className="text-gray-700">
                        Hai il diritto di ricevere i dati personali che ti riguardano in un formato 
                        strutturato e di trasmetterli ad altro titolare del trattamento.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Diritto di Opposizione (Art. 21)</h3>
                      <p className="text-gray-700">
                        Puoi opporti al trattamento dei tuoi dati personali per motivi legittimi 
                        o per finalità di marketing diretto.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">Come Esercitiamo il GDPR in Fagri Digital</h2>
                  <ul className="text-gray-700 space-y-3 list-disc pl-6">
                    <li><strong>Consenso Esplicito:</strong> Raccogliamo i tuoi dati solo con il tuo consenso chiaro e specifico</li>
                    <li><strong>Minimizzazione:</strong> Trattiamo solo i dati strettamente necessari per le finalità dichiarate</li>
                    <li><strong>Trasparenza:</strong> Ti informiamo chiaramente su come utilizziamo i tuoi dati</li>
                    <li><strong>Sicurezza:</strong> Implementiamo misure tecniche e organizzative appropriate per proteggere i tuoi dati</li>
                    <li><strong>Conservazione Limitata:</strong> Conserviamo i dati solo per il tempo necessario agli scopi dichiarati</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">Dati che Trattiamo</h2>
                  <p className="text-gray-700 leading-relaxed">
                    In Fagri Digital trattiamo esclusivamente i dati necessari per:
                  </p>
                  <ul className="text-gray-700 space-y-2 list-disc pl-6">
                    <li>Fornire i servizi di certificazione CO₂</li>
                    <li>Gestire la tua partecipazione alla Filiera Agricola Italiana</li>
                    <li>Comunicare aggiornamenti sui nostri servizi (solo se consenti)</li>
                    <li>Rispettare obblighi legali e normativi</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">Come Esercitare i Tuoi Diritti</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Per esercitare qualsiasi diritto previsto dal GDPR, puoi contattarci tramite:
                  </p>
                  <ul className="text-gray-700 space-y-2">
                    <li><strong>Email:</strong> <a href="mailto:privacy@fagri.digital" className="text-emerald-600 hover:text-emerald-700">privacy@fagri.digital</a></li>
                    <li><strong>Indirizzo:</strong> Via Isonzo 38, 00198 Roma (RM), Italia</li>
                    <li><strong>Oggetto:</strong> "Richiesta GDPR - [Specifica il diritto]"</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Risponderemo alla tua richiesta entro 30 giorni dalla ricezione, 
                    come previsto dall'articolo 12 del GDPR.
                  </p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">What is GDPR</h2>
                  <p className="text-gray-700 leading-relaxed">
                    The General Data Protection Regulation (GDPR) is European legislation 
                    that governs the processing of personal data within the European Union. 
                    Effective from May 25, 2018, it establishes precise rules for the collection, 
                    use and protection of personal data.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">Your Rights under GDPR</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Right of Access (Art. 15)</h3>
                      <p className="text-gray-700">
                        You have the right to know whether your personal data is being processed and, 
                        if so, to access such data and receive specific information about the processing.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Right to Rectification (Art. 16)</h3>
                      <p className="text-gray-700">
                        You can request correction of inaccurate or incomplete personal data concerning you.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Right to Erasure (Art. 17)</h3>
                      <p className="text-gray-700">
                        Also known as the "right to be forgotten", it allows you to request 
                        deletion of your personal data in specific circumstances.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Right to Restriction (Art. 18)</h3>
                      <p className="text-gray-700">
                        You can request restriction of processing of your personal data 
                        in certain specific situations.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-fagri-green mb-2">Right to Data Portability (Art. 20)</h3>
                      <p className="text-gray-700">
                        You have the right to receive personal data concerning you in a structured format 
                        and to transmit it to another data controller.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Right to Object (Art. 21)</h3>
                      <p className="text-gray-700">
                        You can object to the processing of your personal data for legitimate reasons 
                        or for direct marketing purposes.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">How We Implement GDPR at Fagri Digital</h2>
                  <ul className="text-gray-700 space-y-3 list-disc pl-6">
                    <li><strong>Explicit Consent:</strong> We collect your data only with your clear and specific consent</li>
                    <li><strong>Minimization:</strong> We process only data strictly necessary for stated purposes</li>
                    <li><strong>Transparency:</strong> We clearly inform you about how we use your data</li>
                    <li><strong>Security:</strong> We implement appropriate technical and organizational measures to protect your data</li>
                    <li><strong>Limited Retention:</strong> We keep data only for the time necessary for stated purposes</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">Data We Process</h2>
                  <p className="text-gray-700 leading-relaxed">
                    At Fagri Digital we process exclusively data necessary to:
                  </p>
                  <ul className="text-gray-700 space-y-2 list-disc pl-6">
                    <li>Provide CO₂ certification services</li>
                    <li>Manage your participation in the Italian Agricultural Supply Chain</li>
                    <li>Communicate updates about our services (only if you consent)</li>
                    <li>Comply with legal and regulatory obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">How to Exercise Your Rights</h2>
                  <p className="text-gray-700 leading-relaxed">
                    To exercise any right provided by GDPR, you can contact us via:
                  </p>
                  <ul className="text-gray-700 space-y-2">
                    <li><strong>Email:</strong> <a href="mailto:privacy@fagri.digital" className="text-emerald-600 hover:text-emerald-700">privacy@fagri.digital</a></li>
                    <li><strong>Address:</strong> Via Isonzo 38, 00198 Rome (RM), Italy</li>
                    <li><strong>Subject:</strong> "GDPR Request - [Specify the right]"</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    We will respond to your request within 30 days of receipt, 
                    as required by Article 12 of GDPR.
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

export default GDPRPage;