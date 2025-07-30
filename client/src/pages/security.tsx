import React from 'react';
import { useScrollToTop } from '../hooks/use-scroll-to-top';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { useLanguage } from '../components/language-provider';
import { Shield, Database, Lock, CheckCircle, Server, Globe, Eye, Key, Mountain, Building, Leaf } from 'lucide-react';
import agriculturalLandscape from '@assets/image_1753121514850.png';
import swissAlps from '@assets/image_1753202443401.png';
import swissBunker from '@assets/image_1753694170930.png';
import serverRack from '@assets/image_1753694751730.png';
import swissAlpsLake from '@assets/image_1753695152431.png';
import dataCenterCorridor from '@assets/image_1753695626105.png';

export default function Security() {
  const { language } = useLanguage();
  useScrollToTop();

  const content = {
    en: {
      heroTitle: "Digital Security",
      heroSubtitle: "Security and reliability of our infrastructure represent the foundation of trust you place in FAGRI Digital.",
      
      overviewTitle: "Security Overview",
      overviewDesc: "Our multi-level security architecture ensures maximum protection for your agricultural data.",
      
      accessTitle: "Three-Factor Authentication (3FA)",
      accessDesc: "Platform access is secured through:",
      access1: "Certified user identity",
      access2: "Authorized device (computer, smartphone, etc.)", 
      access3: "Active user session",
      access4: "Mandatory digital fingerprint for trust and respect ecosystem",
      
      fingerprintTitle: "Mandatory Digital Fingerprint for Every User and Active Member",
      fingerprintDesc: "For an ecosystem of trust and respect, every user and active member on the platform must provide their mandatory digital fingerprint. This ensures accountability, transparency and a secure environment for all participants.",
      fingerprintKyc: "All users and companies on the platform are required to undergo a full KYC (Know Your Customer) process in order to create their unique digital fingerprint. This step is crucial to ensure the highest level of security for all participants and to clearly identify every actor on the platform, thereby protecting against fraud, identity misuse, and any form of harmful activity. Once the digital fingerprint has been issued, all associated data and personal information are securely encrypted using advanced cryptographic techniques, ensuring that sensitive information remains protected while maintaining the transparency and traceability required for our trust ecosystem.",
      
      dataTitle: "Data Sovereignty and Access Control",
      dataSubtitle: "Your Data. Our Fortress. Swiss Precision for a Global Platform.",
      dataDesc: "Our infrastructure is designed to connect nations worldwide and enable international applications. To ensure maximum data sovereignty and neutrality, we rely on a specialized Swiss service provider for secure data management.",
      dataPoint1: "Strictest Data Protection Laws: subject to the new Federal Data Protection Act (nFADP), one of the world's most rigorous data protection regulations",
      dataPoint2: "Banking FINMA Compliance: compliant with Federal Financial Market Supervisory Authority requirements (FINMA-RS 18/3)",
      dataPoint3: "Banking-level security with controlled access through banking sector-compliant platforms",
      
      alpineTitle: "Alpine Data Centers",
      alpineDesc: "Our primary data centers are strategically located in former Swiss military bunkers deep in the Alps, offering unparalleled physical security and natural protection from environmental and human threats.",
      alpine1: "EMP-resistant military bunkers",
      alpine2: "Autonomous power and cooling systems", 
      alpine3: "Multi-ton security doors with biometric access",
      
      physicalTitle: "Unrivaled Physical Security: Data in Alpine Fortresses",
      physicalDesc: "Our data centers utilize former Swiss military bunkers, repurposed as state-of-the-art data centers, offering a level of physical protection far beyond conventional data centers.",
      
      pillar1Title: "Military Standards",
      pillar1Desc: "Military Standard: built to withstand conventional attacks, chemical/biological threats and electromagnetic pulses (EMP)",
      
      pillar2Title: "Autonomous Operations", 
      pillar2Desc: "Autonomous Operability: independent power systems and autonomous ventilation for operational continuity even during disasters",
      
      pillar3Title: "Access Control",
      pillar3Desc: "Rigorous Access Controls: multi-ton security doors, biometric scanners and 24/7 video surveillance",
      
      pillar4Title: "Disaster Recovery",
      pillar4Desc: "Dedicated alpine recovery site with triple backup systems geographically distributed across dispersed Swiss locations",
      
      technicalTitle: "Technical Excellence and Operational Resilience",
      technicalDesc: "Beyond impressive physical security, we integrate cutting-edge technical measures and complete redundancies to ensure data protection and availability.",
      
      encryptionTitle: "Multi-Layer Encryption",
      encryptionDesc: "Data is protected with internationally recognized encryption standards such as AES-256 and RSA-4096. A 'Zero-Knowledge' architecture ensures that only you can decrypt your files.",
      
      redundancyTitle: "Robust Redundancy", 
      redundancyDesc: "Customer data is triple-backed up, with each file stored simultaneously in different and geographically dispersed locations within Switzerland. A dedicated 'Disaster Recovery Site' in the depths of the Swiss Alps offers maximum protection.",
      
      complianceTitle: "Certifications and Compliance: The Highest Standards for Your Security",
      complianceDesc: "Our comprehensive certification portfolio demonstrates our commitment to the highest security standards.",
      
      tierTitle: "Maximum Availability",
      tierDesc: "Data centers comply with the highest Uptime Institute Tier Classifications (Tier III/IV), ensuring concurrent maintainability and fault tolerance.",
      
      isoTitle: "ISO/IEC 27001 & PCI DSS",
      isoDesc: "Internationally recognized standards for systematic management of sensitive business information and payment data protection.",
      
      cyberTitle: "National Cyber Resilience",
      cyberDesc: "Integrated into Switzerland's national cyber resilience strategy with mandatory 24-hour cyber attack reporting to the National Cyber Security Centre (NCSC).",
      
      blockchainTitle: "Alpine Data Centers Meet Blockchain Innovation",
      blockchainDesc: "Our Swiss mountain data centers provide the physical security foundation, while our decentralized blockchain network ensures cryptographic integrity. This combination creates an unprecedented level of protection for your agricultural data, with the same security standards used by Swiss banks and government institutions.",
      
      guaranteeTitle: "Swiss Security Guarantee",
      guaranteeSubtitle: "Alpine Security Meets Global Blockchain Governance",
      guaranteeDesc: "Blockchain validators are managed jointly by institutions, social organizations and partners from multiple countries — all with equal rights and shared responsibilities. Hosted in Swiss mountain data centers with banking-level security, our decentralized blockchain ensures integrity, resilience and data sovereignty. FAGRI.Digital combines physical protection with decentralized governance, creating a transparent and reliable infrastructure for CO₂ certification and agricultural data for tomorrow's world.",
      
      nodes51Title: "Decentralized Blockchain Network",
      nodes51Desc: "Each partner organization controls a single validator node, ensuring no single point of failure and creating a truly decentralized governance structure among social and corporate entities.",
      
      dposTitle: "DPoS Consensus",
      dposDesc: "Delegated Proof of Stake ensures energy efficiency while maintaining security. Validators are chosen through democratic participation, creating shared responsibility and trust.",
      
      evmTitle: "EVM Compatibility",
      evmDesc: "Full Ethereum Virtual Machine compatibility guarantees interoperability with existing DeFi protocols while maintaining our specialized agricultural focus.",
      
      trustTitle: "Diversified Trust Network",
      trustSubtitle: "Multi-Stakeholder Governance",
      trustDesc: "Our blockchain brings together agricultural cooperatives, environmental organizations, financial institutions and technology partners. This diversification ensures that no single entity can manipulate the network.",
      trust1: "Agricultural cooperatives and farmers' unions",
      trust2: "Environmental certification bodies",
      trust3: "Financial institutions and impact investors",
      
      technicalSecTitle: "Technical Security Features",
      technicalSecDesc: "Advanced cryptographic mechanisms guarantee data integrity and prevent double counting or manipulation of carbon credits and agricultural certifications.",
      techSec1: "Immutable audit trails for all transactions",
      techSec2: "Smart contract validation of sustainability metrics",
      techSec3: "Cryptographic proof of agricultural practices",
      
      neutralTitle: "100% CO₂ Neutral – Sustainable Technology for a New Era of Digital Infrastructure",
      neutralDesc: "All our data centers and digital services operate on a completely CO₂-neutral basis. Located in the Swiss Alps, within repurposed military bunkers, our infrastructure is powered entirely by certified 100% Swiss hydropower. The naturally cool climate of the mountain region significantly reduces the need for high-intensity energy cooling, lowering overall energy consumption without compromising performance or security. FAGRI.Digital represents a digital ecosystem that is not only secure and sovereign, but also ecologically responsible. Every data process, every certification, every transaction is conducted climate-neutrally – a commitment to our partners, members and future generations."
    },
    it: {
      heroTitle: "Sicurezza Digitale",
      heroSubtitle: "La sicurezza e l'affidabilità della nostra infrastruttura rappresentano il fondamento della fiducia che riponete in FAGRI Digital.",
      
      overviewTitle: "Panoramica della Sicurezza",
      overviewDesc: "La nostra architettura di sicurezza multi-livello garantisce la massima protezione per i vostri dati agricoli.",
      
      accessTitle: "Autenticazione a Tre Fattori (3FA)",
      accessDesc: "L'accesso alla piattaforma è protetto attraverso:",
      access1: "Identità utente certificata",
      access2: "Dispositivo autorizzato (computer, smartphone, ecc.)", 
      access3: "Sessione utente attiva",
      access4: "Impronta digitale obbligatoria per l'ecosistema di fiducia e rispetto",
      
      fingerprintTitle: "Impronta Digitale Obbligatoria per Ogni Utente e Membro Attivo",
      fingerprintDesc: "Per un ecosistema di fiducia e rispetto, ogni utente e membro attivo della piattaforma deve fornire la propria impronta digitale obbligatoria. Questo garantisce responsabilità, trasparenza e un ambiente sicuro per tutti i partecipanti.",
      fingerprintKyc: "Tutti gli utenti e le aziende sulla piattaforma sono tenuti a sottoporsi a un processo completo di KYC (Know Your Customer) per creare la loro impronta digitale unica. Questo passaggio è fondamentale per garantire il massimo livello di sicurezza per tutti i partecipanti e per identificare chiaramente ogni attore sulla piattaforma, proteggendo così da frodi, uso improprio dell'identità e qualsiasi forma di attività dannosa. Una volta rilasciata l'impronta digitale, tutti i dati associati e le informazioni personali vengono crittografati in modo sicuro utilizzando tecniche crittografiche avanzate, garantendo che le informazioni sensibili rimangano protette mantenendo la trasparenza e la tracciabilità richieste per il nostro ecosistema di fiducia.",
      
      dataTitle: "Sovranità dei Dati e Controllo degli Accessi",
      dataSubtitle: "I Vostri Dati. La Nostra Fortezza. Precisione Svizzera per una Piattaforma Globale.",
      dataDesc: "La nostra infrastruttura è progettata per collegare nazioni in tutto il mondo e abilitare applicazioni internazionali. Per garantire la massima sovranità e neutralità dei dati, ci affidiamo a un fornitore di servizi svizzero specializzato per la gestione sicura dei dati.",
      dataPoint1: "Leggi sulla Protezione dei Dati più Rigorose: soggetti alla nuova Legge Federale sulla Protezione dei Dati (nFADP), una delle normative sulla protezione dei dati più rigorose al mondo",
      dataPoint2: "Conformità FINMA Bancaria: conforme ai requisiti dell'Autorità Federale di Vigilanza sui Mercati Finanziari (FINMA-RS 18/3)",
      dataPoint3: "Sicurezza di livello bancario con accesso controllato attraverso piattaforme conformi al settore bancario",
      
      alpineTitle: "Data Center Alpini",
      alpineDesc: "I nostri data center primari sono strategicamente situati in ex bunker militari svizzeri nelle profondità delle Alpi, offrendo una sicurezza fisica senza pari e protezione naturale da minacce ambientali e umane.",
      alpine1: "Bunker militari resistenti agli EMP",
      alpine2: "Sistemi di alimentazione e raffreddamento autonomi", 
      alpine3: "Porte di sicurezza multi-tonnellata con accesso biometrico",
      
      physicalTitle: "Sicurezza Fisica Impareggiabile: Dati nelle Fortezze Alpine",
      physicalDesc: "I nostri data center utilizzano ex bunker militari svizzeri, riconvertiti come data center all'avanguardia, offrendo un livello di protezione fisica molto superiore ai data center convenzionali.",
      
      pillar1Title: "Standard Militari",
      pillar1Desc: "Standard Militare: costruito per resistere ad attacchi convenzionali, minacce chimiche/biologiche e impulsi elettromagnetici (EMP)",
      
      pillar2Title: "Operazioni Autonome", 
      pillar2Desc: "Operabilità Autonoma: sistemi di alimentazione indipendenti e ventilazione autonoma per la continuità operativa anche durante i disastri",
      
      pillar3Title: "Controllo degli Accessi",
      pillar3Desc: "Controlli di Accesso Rigorosi: porte di sicurezza multi-tonnellata, scanner biometrici e videosorveglianza 24/7",
      
      pillar4Title: "Disaster Recovery",
      pillar4Desc: "Sito di recupero alpino dedicato con sistemi di backup triplo distribuiti geograficamente in località svizzere disperse",
      
      technicalTitle: "Eccellenza Tecnica e Resilienza Operativa",
      technicalDesc: "Oltre all'impressionante sicurezza fisica, integriamo misure tecniche all'avanguardia e ridondanze complete per garantire la protezione e la disponibilità dei dati.",
      
      encryptionTitle: "Crittografia Multi-Livello",
      encryptionDesc: "I dati sono protetti con standard di crittografia riconosciuti internazionalmente come AES-256 e RSA-4096. Un'architettura 'Zero-Knowledge' garantisce che solo voi possiate decrittografare i vostri file.",
      
      redundancyTitle: "Ridondanza Robusta", 
      redundancyDesc: "I dati dei clienti sono sottoposti a backup triplo, con ogni file archiviato simultaneamente in location diverse e geograficamente disperse all'interno della Svizzera. Un 'Sito di Disaster Recovery' dedicato nelle profondità delle Alpi svizzere offre la massima protezione.",
      
      complianceTitle: "Certificazioni e Conformità: I Più Alti Standard per la Vostra Sicurezza",
      complianceDesc: "Il nostro portafoglio completo di certificazioni dimostra il nostro impegno verso i più alti standard di sicurezza.",
      
      tierTitle: "Massima Disponibilità",
      tierDesc: "I data center sono conformi alle più alte Classificazioni Tier dell'Uptime Institute (Tier III/IV), garantendo manutenibilità concorrente e tolleranza ai guasti.",
      
      isoTitle: "ISO/IEC 27001 & PCI DSS",
      isoDesc: "Standard riconosciuti internazionalmente per la gestione sistematica di informazioni commerciali sensibili e protezione dei dati di pagamento.",
      
      cyberTitle: "Resilienza Cyber Nazionale",
      cyberDesc: "Integrato nella strategia nazionale svizzera di resilienza cyber con segnalazione obbligatoria di attacchi cyber entro 24 ore al Centro Nazionale per la Cybersicurezza (NCSC).",
      
      blockchainTitle: "I Data Center Alpini Incontrano l'Innovazione Blockchain",
      blockchainDesc: "I nostri data center di montagna svizzeri forniscono la base di sicurezza fisica, mentre la nostra rete blockchain decentralizzata garantisce l'integrità crittografica. Questa combinazione crea un livello di protezione senza precedenti per i vostri dati agricoli, con gli stessi standard di sicurezza utilizzati dalle banche svizzere e dalle istituzioni governative.",
      
      guaranteeTitle: "Garanzia di Sicurezza Svizzera",
      guaranteeSubtitle: "La Sicurezza Alpina Incontra la Governance Blockchain Globale",
      guaranteeDesc: "I validatori blockchain sono gestiti congiuntamente da istituzioni, organizzazioni sociali e partner di più paesi — tutti con pari diritti e responsabilità condivise. Ospitata in data center di montagna svizzeri con sicurezza di livello bancario, la nostra blockchain decentralizzata garantisce integrità, resilienza e sovranità dei dati. FAGRI.Digital combina protezione fisica con governance decentralizzata, creando un'infrastruttura trasparente e affidabile per la certificazione CO₂ e i dati agricoli del mondo di domani.",
      
      nodes51Title: "Rete Blockchain Decentralizzata",
      nodes51Desc: "Ogni organizzazione partner partecipa alla governance distribuita, garantendo nessun singolo punto di fallimento e creando una struttura veramente decentralizzata tra entità sociali e aziendali.",
      
      dposTitle: "Consenso DPoS",
      dposDesc: "Il Delegated Proof of Stake garantisce efficienza energetica mantenendo la sicurezza. I validatori sono scelti attraverso partecipazione democratica, creando responsabilità condivisa e fiducia.",
      
      evmTitle: "Compatibilità EVM",
      evmDesc: "La piena compatibilità con Ethereum Virtual Machine garantisce interoperabilità con i protocolli DeFi esistenti mantenendo il nostro focus agricolo specializzato.",
      
      trustTitle: "Rete di Fiducia Diversificata",
      trustSubtitle: "Governance Multi-Stakeholder",
      trustDesc: "La nostra blockchain riunisce cooperative agricole, organizzazioni ambientali, istituzioni finanziarie e partner tecnologici. Questa diversificazione garantisce che nessuna singola entità possa manipolare la rete.",
      trust1: "Cooperative agricole e sindacati degli agricoltori",
      trust2: "Organismi di certificazione ambientale",
      trust3: "Istituzioni finanziarie e investitori d'impatto",
      
      technicalSecTitle: "Caratteristiche di Sicurezza Tecnica",
      technicalSecDesc: "Meccanismi crittografici avanzati garantiscono l'integrità dei dati e prevengono il doppio conteggio o la manipolazione di crediti di carbonio e certificazioni agricole.",
      techSec1: "Tracce di audit immutabili per tutte le transazioni",
      techSec2: "Validazione smart contract delle metriche di sostenibilità",
      techSec3: "Prova crittografica delle pratiche agricole",
      
      neutralTitle: "100% CO₂ Neutro – Tecnologia Sostenibile per una Nuova Era di Infrastruttura Digitale",
      neutralDesc: "Tutti i nostri data center e servizi digitali operano su base completamente CO₂-neutrale. Situati nelle Alpi svizzere, all'interno di bunker militari riconvertiti, la nostra infrastruttura è alimentata interamente da energia idroelettrica svizzera certificata al 100%. Il clima naturalmente fresco della regione montana riduce significativamente il bisogno di raffreddamento ad alta intensità energetica, abbassando il consumo energetico complessivo senza compromettere prestazioni o sicurezza. FAGRI.Digital rappresenta un ecosistema digitale che non è solo sicuro e sovrano, ma anche ecologicamente responsabile. Ogni processo di dati, ogni certificazione, ogni transazione è condotta in modo climate-neutral – un impegno verso i nostri partner, membri e generazioni future."
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={agriculturalLandscape} 
            alt="Agricultural landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>
        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light text-white mb-6">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-slate-200 leading-relaxed">
              {t.heroSubtitle}
            </p>
          </div>
        </div>
      </section>



      {/* Three-Factor Authentication */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-slate-900 mb-4">
                {t.accessTitle}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                {t.accessDesc}
              </p>
            </div>



            {/* ALPHAG8 ID KEY Section */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 mb-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-light text-slate-900 mb-2">ALPHAG8 ID KEY</h3>
                <p className="text-lg text-slate-600 mb-1">{t['alphag8-secure-access']}</p>
                <h4 className="text-xl font-medium text-slate-800">{t['three-factor-auth']}</h4>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <p className="text-base text-slate-600 leading-relaxed mb-6 text-center">
                  {t['alphag8-description']}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center mt-1">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{t['three-factor-title']}</p>
                      <p className="text-slate-600 text-sm">{t['three-factor-desc']}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                      <Shield className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{t['zero-trust-title']}</p>
                      <p className="text-slate-600 text-sm">{t['zero-trust-desc']}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center mt-1">
                      <Key className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{t['phone-key-title']}</p>
                      <p className="text-slate-600 text-sm">{t['phone-key-desc']}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
                      <Eye className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{t['biometric-title']}</p>
                      <p className="text-slate-600 text-sm">{t['biometric-desc']}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center mt-1">
                      <Lock className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{t['silent-secure-title']}</p>
                      <p className="text-slate-600 text-sm">{t['silent-secure-desc']}</p>
                    </div>
                  </div>
                  
                  <div className="text-center pt-4 border-t border-slate-200">
                    <p className="text-slate-700 font-medium mb-1">{t['identity-private']}</p>
                    <p className="text-slate-600 text-sm">{t['trust-invisible']}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Digital Fingerprint Section - Banking Style */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-xl font-medium text-slate-900 mb-4">{t.fingerprintTitle}</h3>
              <p className="text-base text-slate-600 leading-relaxed mb-4">{t.fingerprintDesc}</p>
              <p className="text-sm text-slate-600 leading-relaxed">{t.fingerprintKyc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Alpine Data Centers - Combined Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-slate-900 mb-3">
                {t.dataTitle}
              </h2>
              <h3 className="text-xl text-emerald-600 font-medium mb-4">
                {t.dataSubtitle}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mb-8">
                {t.dataDesc}
              </p>
            </div>

            {/* Combined Alpine + Data Sovereignty Features */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-medium text-slate-900 mb-3">Swiss Data Protection</h4>
                <p className="text-slate-600 leading-relaxed">{t.dataPoint1}</p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-medium text-slate-900 mb-3">FINMA Banking Compliance</h4>
                <p className="text-slate-600 leading-relaxed">{t.dataPoint2}</p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="text-lg font-medium text-slate-900 mb-3">Banking-Level Security</h4>
                <p className="text-slate-600 leading-relaxed">{t.dataPoint3}</p>
              </div>
            </div>

            {/* Alpine Infrastructure */}
            <div className="bg-white p-12 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-light text-slate-900 mb-6">{t.alpineTitle}</h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">{t.alpineDesc}</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium">{t.alpine1}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Server className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-slate-700 font-medium">{t.alpine2}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Lock className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-slate-700 font-medium">{t.alpine3}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Physical Security Pillars */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-slate-900 mb-4">
                {t.physicalTitle}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                {t.physicalDesc}
              </p>
            </div>

            {/* Swiss Alps Image */}
            <div className="mb-12">
              <div className="relative rounded-lg overflow-hidden shadow-sm border border-slate-200 max-w-3xl mx-auto">
                <img 
                  src={swissAlps} 
                  alt="Swiss Alps data center location"
                  className="w-full h-48 md:h-64 object-cover object-center"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-4">{t.pillar1Title}</h3>
                <p className="text-slate-600 leading-relaxed">{t.pillar1Desc}</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <Server className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-4">{t.pillar2Title}</h3>
                <p className="text-slate-600 leading-relaxed">{t.pillar2Desc}</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-4">{t.pillar3Title}</h3>
                <p className="text-slate-600 leading-relaxed">{t.pillar3Desc}</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                  <Mountain className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-4">{t.pillar4Title}</h3>
                <p className="text-slate-600 leading-relaxed">{t.pillar4Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Excellence */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-slate-900 mb-4">
                {t.technicalTitle}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                {t.technicalDesc}
              </p>
            </div>

            {/* Data Center Image */}
            <div className="mb-12">
              <div className="relative rounded-lg overflow-hidden shadow-sm border border-slate-200 max-w-3xl mx-auto">
                <img 
                  src={dataCenterCorridor} 
                  alt="Data center technical infrastructure"
                  className="w-full h-48 md:h-64 object-cover object-center"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-4">{t.encryptionTitle}</h3>
                <p className="text-slate-600 leading-relaxed">{t.encryptionDesc}</p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                  <Database className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-4">{t.redundancyTitle}</h3>
                <p className="text-slate-600 leading-relaxed">{t.redundancyDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications and Compliance */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-slate-900 mb-4">
                {t.complianceTitle}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                {t.complianceDesc}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-4">{t.tierTitle}</h3>
                <p className="text-slate-600 leading-relaxed">{t.tierDesc}</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-4">{t.isoTitle}</h3>
                <p className="text-slate-600 leading-relaxed">{t.isoDesc}</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-4">{t.cyberTitle}</h3>
                <p className="text-slate-600 leading-relaxed">{t.cyberDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blockchain Innovation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-slate-900 mb-4">
                {t.blockchainTitle}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                {t.blockchainDesc}
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg mb-12 shadow-sm border border-slate-200">
              <h3 className="text-2xl font-light text-slate-900 mb-3">{t.guaranteeTitle}</h3>
              <h4 className="text-lg text-slate-700 font-medium mb-4">{t.guaranteeSubtitle}</h4>
              <p className="text-base text-slate-600 leading-relaxed">{t.guaranteeDesc}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-6">
                  <Server className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-4">{t.nodes51Title}</h3>
                <p className="text-slate-600 leading-relaxed">{t.nodes51Desc}</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-4">{t.dposTitle}</h3>
                <p className="text-slate-600 leading-relaxed">{t.dposDesc}</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-4">{t.evmTitle}</h3>
                <p className="text-slate-600 leading-relaxed">{t.evmDesc}</p>
              </div>
            </div>

            {/* Trust Network */}
            <div className="bg-slate-50 p-8 rounded-lg mb-12 shadow-sm border border-slate-200">
              <h3 className="text-2xl font-light text-slate-900 mb-3">{t.trustTitle}</h3>
              <h4 className="text-lg text-slate-700 font-medium mb-4">{t.trustSubtitle}</h4>
              <p className="text-base text-slate-600 leading-relaxed mb-6">{t.trustDesc}</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-slate-700">{t.trust1}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-slate-700">{t.trust2}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-slate-700">{t.trust3}</span>
                </div>
              </div>
            </div>

            {/* Technical Security Features */}
            <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-light text-slate-900 mb-4">{t.technicalSecTitle}</h3>
              <p className="text-base text-slate-600 leading-relaxed mb-6">{t.technicalSecDesc}</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Lock className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-slate-700">{t.techSec1}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-slate-700">{t.techSec2}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-rose-600" />
                  </div>
                  <span className="text-slate-700">{t.techSec3}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CO₂ Neutral Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image on left */}
              <div>
                <div className="relative rounded-lg overflow-hidden shadow-sm border border-slate-200">
                  <img 
                    src={swissAlpsLake} 
                    alt="Swiss Alps with turquoise lake representing clean hydropower energy"
                    className="w-full h-80 object-cover object-center"
                  />
                </div>
              </div>
              
              {/* Content on right */}
              <div>
                <h2 className="text-3xl font-light text-slate-900 mb-6">
                  {t.neutralTitle}
                </h2>
                <div className="bg-slate-50 p-8 rounded-lg shadow-sm border border-slate-200">
                  <p className="text-base text-slate-600 leading-relaxed">{t.neutralDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}