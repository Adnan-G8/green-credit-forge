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

  const content = {
    en: {
      heroTitle: "Digital Security",
      heroSubtitle: "Security and reliability of our infrastructure represent the foundation of trust you place in FAGRI Digital.",
      
      overviewTitle: "Security Overview",
      overviewDesc: "Our comprehensive security framework combines access control, legal protection, and Swiss infrastructure excellence.",
      
      accessTitle: "Access Control",
      accessDesc: "Three-factor authentication and digital identity verification",
      access1: "3-Factor Authentication (3FA)",
      access2: "Digital Identity Verification", 
      access3: "Role-Based Permissions",
      
      legalTitle: "Legal Framework",
      legalDesc: "Swiss data protection and banking compliance standards",
      legal1: "Swiss Federal Data Protection",
      legal2: "FINMA Banking Compliance",
      legal3: "GDPR Full Compliance",
      
      infraTitle: "Infrastructure", 
      infraDesc: "Military-grade physical security and disaster resilience",
      infra1: "Swiss Military Bunkers",
      infra2: "EMP & Disaster Resistant",
      infra3: "100% Renewable Energy",
      
      physicalTitle: "Physical Security Pillars",
      physicalDesc: "Our data centers utilize former Swiss military bunkers, offering unmatched physical protection.",
      
      pillar1Title: "Military Standards",
      pillar1Desc: "Built to withstand conventional attacks, chemical/biological threats, and electromagnetic pulses (EMPs).",
      
      pillar2Title: "Autonomous Operations", 
      pillar2Desc: "Independent power supply systems and autonomous ventilation for operational continuity during disasters.",
      
      pillar3Title: "Access Control",
      pillar3Desc: "Multi-ton security doors, biometric scanners, and 24/7 video surveillance systems.",
      
      pillar4Title: "Disaster Recovery",
      pillar4Desc: "Dedicated recovery site deep in the Swiss Alps for maximum protection and business continuity.",
      
      technicalTitle: "Technical Excellence",
      technicalDesc: "Advanced encryption and redundancy systems ensure maximum data protection.",
      
      encryptionTitle: "Multi-Layer Encryption",
      encryptionDesc: "Data protected with AES-256 and RSA-4096 standards. Zero-Knowledge Architecture ensures only you can decrypt your files.",
      
      redundancyTitle: "Robust Redundancy", 
      redundancyDesc: "Triple backup system with geographically dispersed storage across Switzerland. Dedicated Alpine disaster recovery site.",
      
      complianceTitle: "Professional Certifications",
      complianceDesc: "International standards and Swiss regulatory compliance for maximum trust.",
      
      tierTitle: "Tier Classifications",
      tierDesc: "Data centers comply with highest Uptime Institute standards (Tier III/IV) for concurrent maintainability.",
      
      isoTitle: "ISO Standards",
      isoDesc: "ISO/IEC 27001 and PCI DSS certified for systematic management of sensitive information.",
      
      cyberTitle: "Cyber Resilience",
      cyberDesc: "Advanced threat detection and response systems with 24/7 monitoring and incident response capabilities."
    },
    it: {
      heroTitle: "Sicurezza Digitale",
      heroSubtitle: "La sicurezza e l'affidabilità della nostra infrastruttura rappresentano le fondamenta della fiducia che riponete in FAGRI Digital.",
      
      overviewTitle: "Panoramica della Sicurezza",
      overviewDesc: "Il nostro framework di sicurezza comprende controllo accessi, protezione legale ed eccellenza dell'infrastruttura svizzera.",
      
      accessTitle: "Controllo degli Accessi",
      accessDesc: "Autenticazione a tre fattori e verifica dell'identità digitale",
      access1: "Autenticazione a 3 Fattori (3FA)",
      access2: "Verifica Identità Digitale",
      access3: "Permessi Basati sui Ruoli",
      
      legalTitle: "Quadro Legale",
      legalDesc: "Protezione dati svizzera e standard di conformità bancaria",
      legal1: "Protezione Dati Federale Svizzera",
      legal2: "Conformità Bancaria FINMA",
      legal3: "Piena Conformità GDPR",
      
      infraTitle: "Infrastruttura",
      infraDesc: "Sicurezza fisica di livello militare e resilienza ai disastri",
      infra1: "Bunker Militari Svizzeri",
      infra2: "Resistente a EMP e Disastri",
      infra3: "100% Energia Rinnovabile",
      
      physicalTitle: "Pilastri della Sicurezza Fisica",
      physicalDesc: "I nostri data center utilizzano ex bunker militari svizzeri, offrendo protezione fisica ineguagliabile.",
      
      pillar1Title: "Standard Militari",
      pillar1Desc: "Costruiti per resistere ad attacchi convenzionali, minacce chimiche/biologiche e impulsi elettromagnetici (EMP).",
      
      pillar2Title: "Operazioni Autonome",
      pillar2Desc: "Sistemi di alimentazione indipendenti e ventilazione autonoma per continuità operativa durante i disastri.",
      
      pillar3Title: "Controllo Accessi",
      pillar3Desc: "Porte di sicurezza multi-tonnellaggio, scanner biometrici e sistemi di videosorveglianza 24/7.",
      
      pillar4Title: "Disaster Recovery",
      pillar4Desc: "Sito di recupero dedicato nelle profondità delle Alpi svizzere per massima protezione e continuità aziendale.",
      
      technicalTitle: "Eccellenza Tecnica",
      technicalDesc: "Sistemi avanzati di crittografia e ridondanza garantiscono massima protezione dei dati.",
      
      encryptionTitle: "Crittografia Multi-Livello",
      encryptionDesc: "Dati protetti con standard AES-256 e RSA-4096. Architettura Zero-Knowledge garantisce che solo voi possiate decrittare i vostri file.",
      
      redundancyTitle: "Ridondanza Robusta",
      redundancyDesc: "Sistema di backup triplo con archiviazione geograficamente dispersa in Svizzera. Sito dedicato di disaster recovery alpino.",
      
      complianceTitle: "Certificazioni Professionali", 
      complianceDesc: "Standard internazionali e conformità normativa svizzera per massima fiducia.",
      
      tierTitle: "Classificazioni Tier",
      tierDesc: "I data center rispettano i più alti standard Uptime Institute (Tier III/IV) per manutenibilità concorrente.",
      
      isoTitle: "Standard ISO",
      isoDesc: "Certificati ISO/IEC 27001 e PCI DSS per gestione sistematica di informazioni sensibili.",
      
      cyberTitle: "Resilienza Cyber",
      cyberDesc: "Sistemi avanzati di rilevamento e risposta alle minacce con monitoraggio 24/7 e capacità di risposta agli incidenti."
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-20 relative">
        <div className="absolute inset-0">
          <img 
            src={agriculturalLandscape} 
            alt="Agricultural landscape representing digital security for farming"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-900/30"></div>
        </div>
        <div className="relative container mx-auto px-6 pt-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light text-white mb-8">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed font-light max-w-3xl mx-auto">
              {t.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Security Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-slate-900 mb-6">
                {t.overviewTitle}
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                {t.overviewDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Access Control */}
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Key className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-light text-slate-900 mb-3">
                    {t.accessTitle}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t.access1}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t.access2}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t.access3}</span>
                  </div>
                </div>
              </div>

              {/* Legal Framework */}
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-light text-slate-900 mb-3">
                    {t.legalTitle}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t.legal1}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t.legal2}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t.legal3}</span>
                  </div>
                </div>
              </div>

              {/* Infrastructure */}
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mountain className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-light text-slate-900 mb-3">
                    {t.infraTitle}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t.infra1}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t.infra2}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t.infra3}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Physical Security Pillars */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-slate-900 mb-6">
                {t.physicalTitle}
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                {t.physicalDesc}
              </p>
            </div>

            {/* Swiss Alps Image */}
            <div className="mb-16">
              <div className="relative rounded-xl overflow-hidden shadow-lg max-w-4xl mx-auto">
                <img 
                  src={swissAlps} 
                  alt="Swiss Alps data center location"
                  className="w-full h-64 md:h-80 object-cover object-center"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-900">
                    {t.pillar1Title}
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {t.pillar1Desc}
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Server className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-900">
                    {t.pillar2Title}
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {t.pillar2Desc}
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Lock className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-900">
                    {t.pillar3Title}
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {t.pillar3Desc}
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <Mountain className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-900">
                    {t.pillar4Title}
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {t.pillar4Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Excellence */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-slate-900 mb-6">
                {t.technicalTitle}
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                {t.technicalDesc}
              </p>
            </div>

            {/* Data Center Image */}
            <div className="mb-16">
              <div className="relative rounded-xl overflow-hidden shadow-lg max-w-4xl mx-auto">
                <img 
                  src={dataCenterCorridor} 
                  alt="Data center technical infrastructure"
                  className="w-full h-64 md:h-80 object-cover object-center"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                    <Key className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-900">
                    {t.encryptionTitle}
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {t.encryptionDesc}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Database className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-900">
                    {t.redundancyTitle}
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {t.redundancyDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Certifications */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-slate-900 mb-6">
                {t.complianceTitle}
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                {t.complianceDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 border border-slate-200 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Server className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-3">
                  {t.tierTitle}
                </h3>
                <p className="text-slate-600">
                  {t.tierDesc}
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 border border-slate-200 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-3">
                  {t.isoTitle}
                </h3>
                <p className="text-slate-600">
                  {t.isoDesc}
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 border border-slate-200 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-3">
                  {t.cyberTitle}
                </h3>
                <p className="text-slate-600">
                  {t.cyberDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}