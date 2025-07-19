import { useLanguage } from '@/components/language-provider';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

function CookiesPage() {
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
              {language === 'it' ? 'Politica sui Cookie' : 'Cookie Policy'}
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
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">Cosa sono i Cookie</h2>
                  <p className="text-gray-700 leading-relaxed">
                    I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo 
                    quando visiti un sito web. Consentono al sito di ricordare le tue azioni e preferenze 
                    per un determinato periodo di tempo, migliorando la tua esperienza di navigazione.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">Tipologie di Cookie Utilizzati</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookie Tecnici Necessari</h3>
                      <p className="text-gray-700 mb-2">
                        Questi cookie sono essenziali per il corretto funzionamento del sito web e non possono essere disabilitati:
                      </p>
                      <ul className="text-gray-700 space-y-2 list-disc pl-6">
                        <li><strong>Cookie di sessione:</strong> Mantengono la tua sessione attiva durante la navigazione</li>
                        <li><strong>Cookie di preferenze linguistiche:</strong> Ricordano la lingua selezionata (italiano/inglese)</li>
                        <li><strong>Cookie di sicurezza:</strong> Proteggono da attacchi informatici e garantiscono l'integrità dei dati</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookie Funzionali</h3>
                      <p className="text-gray-700 mb-2">
                        Migliorano l'esperienza utente ricordando le tue preferenze:
                      </p>
                      <ul className="text-gray-700 space-y-2 list-disc pl-6">
                        <li>Preferenze di visualizzazione e layout</li>
                        <li>Impostazioni di accessibilità</li>
                        <li>Moduli compilati parzialmente (per evitare perdita dati)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookie Analitici</h3>
                      <p className="text-gray-700 mb-2">
                        Ci aiutano a comprendere come gli utenti interagiscono con il sito (utilizzati solo con il tuo consenso):
                      </p>
                      <ul className="text-gray-700 space-y-2 list-disc pl-6">
                        <li>Statistiche di utilizzo anonimizzate</li>
                        <li>Analisi delle pagine più visitate</li>
                        <li>Tempo di permanenza sul sito</li>
                        <li>Sorgenti di traffico</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">Cookie di Terze Parti</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Il nostro sito potrebbe utilizzare cookie di terze parti per servizi specifici:
                  </p>
                  <ul className="text-gray-700 space-y-2 list-disc pl-6">
                    <li><strong>Servizi di mappe:</strong> Per mostrare la nostra ubicazione</li>
                    <li><strong>Sistemi di supporto:</strong> Per fornire assistenza clienti</li>
                    <li><strong>Sistemi di pagamento:</strong> Per elaborare transazioni sicure</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">Durata dei Cookie</h2>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">Cookie di Sessione</h4>
                      <p className="text-gray-700">Vengono eliminati automaticamente quando chiudi il browser</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Cookie Persistenti</h4>
                      <p className="text-gray-700">Rimangono sul dispositivo per un periodo specifico:</p>
                      <ul className="text-gray-700 space-y-1 list-disc pl-6">
                        <li>Cookie di preferenze linguistiche: 1 anno</li>
                        <li>Cookie analitici: 2 anni (se autorizzati)</li>
                        <li>Cookie funzionali: 6 mesi</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">Gestione dei Cookie</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Puoi gestire i cookie in diversi modi:
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Banner Cookie</h4>
                      <p className="text-gray-700">
                        Al primo accesso al sito, apparirà un banner che ti permetterà di scegliere 
                        quali tipologie di cookie accettare.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900">Impostazioni del Browser</h4>
                      <p className="text-gray-700">
                        Puoi configurare il tuo browser per bloccare o eliminare i cookie. 
                        Tieni presente che questo potrebbe limitare alcune funzionalità del sito.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900">Revoca del Consenso</h4>
                      <p className="text-gray-700">
                        Puoi revocare il consenso ai cookie non essenziali in qualsiasi momento 
                        contattandoci all'indirizzo: <a href="mailto:privacy@fagri.digital" className="text-emerald-600 hover:text-emerald-700">privacy@fagri.digital</a>
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">Aggiornamenti</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Questa politica sui cookie può essere aggiornata periodicamente. 
                    Ti informeremo di eventuali modifiche significative tramite il nostro sito web 
                    o altri canali di comunicazione appropriati.
                  </p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">What are Cookies</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Cookies are small text files that are stored on your device 
                    when you visit a website. They allow the site to remember your actions and preferences 
                    for a certain period of time, improving your browsing experience.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">Types of Cookies Used</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Necessary Technical Cookies</h3>
                      <p className="text-gray-700 mb-2">
                        These cookies are essential for the proper functioning of the website and cannot be disabled:
                      </p>
                      <ul className="text-gray-700 space-y-2 list-disc pl-6">
                        <li><strong>Session cookies:</strong> Keep your session active during navigation</li>
                        <li><strong>Language preference cookies:</strong> Remember selected language (Italian/English)</li>
                        <li><strong>Security cookies:</strong> Protect from cyber attacks and ensure data integrity</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Functional Cookies</h3>
                      <p className="text-gray-700 mb-2">
                        Improve user experience by remembering your preferences:
                      </p>
                      <ul className="text-gray-700 space-y-2 list-disc pl-6">
                        <li>Display and layout preferences</li>
                        <li>Accessibility settings</li>
                        <li>Partially filled forms (to avoid data loss)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Analytics Cookies</h3>
                      <p className="text-gray-700 mb-2">
                        Help us understand how users interact with the site (used only with your consent):
                      </p>
                      <ul className="text-gray-700 space-y-2 list-disc pl-6">
                        <li>Anonymized usage statistics</li>
                        <li>Analysis of most visited pages</li>
                        <li>Time spent on site</li>
                        <li>Traffic sources</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">Third-Party Cookies</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our site may use third-party cookies for specific services:
                  </p>
                  <ul className="text-gray-700 space-y-2 list-disc pl-6">
                    <li><strong>Map services:</strong> To show our location</li>
                    <li><strong>Support systems:</strong> To provide customer assistance</li>
                    <li><strong>Payment systems:</strong> To process secure transactions</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">Cookie Duration</h2>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">Session Cookies</h4>
                      <p className="text-gray-700">Automatically deleted when you close the browser</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Persistent Cookies</h4>
                      <p className="text-gray-700">Remain on the device for a specific period:</p>
                      <ul className="text-gray-700 space-y-1 list-disc pl-6">
                        <li>Language preference cookies: 1 year</li>
                        <li>Analytics cookies: 2 years (if authorized)</li>
                        <li>Functional cookies: 6 months</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">Cookie Management</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You can manage cookies in different ways:
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Cookie Banner</h4>
                      <p className="text-gray-700">
                        On first access to the site, a banner will appear allowing you to choose 
                        which types of cookies to accept.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900">Browser Settings</h4>
                      <p className="text-gray-700">
                        You can configure your browser to block or delete cookies. 
                        Please note that this may limit some site functionality.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900">Consent Withdrawal</h4>
                      <p className="text-gray-700">
                        You can withdraw consent for non-essential cookies at any time 
                        by contacting us at: <a href="mailto:privacy@fagri.digital" className="text-emerald-600 hover:text-emerald-700">privacy@fagri.digital</a>
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-fagri-green mb-4">Updates</h2>
                  <p className="text-gray-700 leading-relaxed">
                    This cookie policy may be updated periodically. 
                    We will inform you of any significant changes through our website 
                    or other appropriate communication channels.
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

export default CookiesPage;