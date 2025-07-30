import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { CheckCircle, Shield, Globe, Users, Download, Lock, FileCheck } from 'lucide-react';
import { Link } from 'wouter';
import { useLanguage } from '../components/language-provider';
import italianGovernment from '@assets/image_1753122095811.png';

export default function EufdStandardPage() {
  const { language } = useLanguage();
  
  const content = {
    en: {
      heroTitle: "The EUFD2025-001 Standard",
      heroSubtitle: "Scientific, concrete, accessible.",
      pioneerBadge: "Global Pioneer Standard",
      pioneersTitle: "Pioneers from Italy to the World: Our Blockchain Standard for CO₂ Certificates",
      pioneersText1: "At FAGRI.Digital, we are proud to present our new innovative standard: EUFD2025-001. This standard is the result of years of intensive research and development, based on the latest scientific discoveries and created in close collaboration with leading Italian universities.",
      pioneersText2: "The FAGRI Digital platform that supports the EUFD2025-001 standard is designed to usher in a new era of trust, efficiency and transparency in CO₂ certification and trading — powered by blockchain technology, advanced data protection protocols and 3FA security architecture.",
      scientificTitle: "EUFD2025-001: Scientific, Transparent, Accessible and Secure with Blockchain",
      scientificText1: "The EUFD2025-001 standard represents a groundbreaking approach to agricultural CO₂ certification, combining rigorous scientific methodology with cutting-edge blockchain technology. Developed through extensive collaboration with leading European research institutions and validated by independent certification bodies, this standard ensures that every carbon credit issued is scientifically sound, completely transparent, and legally compliant.",
      scientificText2: "Our comprehensive framework addresses the growing need for standardized, verifiable carbon accounting in agriculture while maintaining the flexibility to accommodate diverse farming systems across Europe and beyond.",
      availableTitle: "EUFD2025-001 Standard Available Now",
      availableDesc: "Access the complete EUFD2025-001 certification standard documentation. This comprehensive guide provides detailed methodologies, technical specifications, and implementation guidelines for agricultural CO₂ certification.",
      downloadBtn: "Download Standard",
      blockchainTitle: "Blockchain Technology Integration",
      doubleCountingTitle: "Double-Counting Prevention",
      doubleCountingDesc: "Advanced cryptographic algorithms ensure each carbon credit can only be issued and traded once, eliminating fraud and double counting through immutable blockchain records.",
      greenwashingTitle: "Greenwashing Protection",
      greenwashingDesc: "Complete transparency through public blockchain verification allows stakeholders to independently verify the authenticity and environmental impact of every carbon credit.",
      ownershipTitle: "Clear Ownership Verification",
      ownershipDesc: "Smart contracts automatically establish and transfer ownership rights, providing legal certainty and reducing transaction costs in carbon credit markets.",
      securityTitle: "Maximum Security Standards",
      securityDesc: "Military-grade encryption and Swiss banking-level security protocols protect all data, ensuring confidentiality while maintaining transparency where required.",
      eliminationTitle: "Elimination of Double Counting",
      eliminationDesc: "Each certificate is unique and immutable thanks to blockchain technology.",
      preventionTitle: "Prevention of Greenwashing",
      preventionDesc: "The entire value chain is transparent and traceable.",
      clearOwnershipTitle: "Clear Ownership",
      clearOwnershipDesc: "Digital registrations are tamper-proof and permanent.",
      maxSecurityTitle: "Maximum Security",
      maxSecurityDesc: "Unique digital fingerprint and three-factor authentication (3FA).",
      transparencyTitle: "Complete Blockchain Transparency",
      advancedTitle: "Advanced Blockchain Integration",
      advancedDesc: "Integrated blockchain technology to ensure maximum transparency and immutability of certification records",
      strategicDesc: "Our platform strategically uses blockchain technology to solve the major problems of carbon credit markets: double counting, greenwashing, and lack of transparency.",
      benefit1: "Automatic prevention of double counting through advanced cryptographic algorithms",
      benefit2: "Complete transparency with public verification of all issued carbon credits",
      benefit3: "Clear ownership and secure transfer of carbon credit rights",
      frameworkTitle: "European Regulatory Framework",
      euRegTitle: "EU Regulation 3012/2024",
      euRegDesc: "Full compliance with the new EU Regulation 3012/2024 for carbon certification",
      keyReqTitle: "Key Regulatory Requirements",
      req1: "Mandatory use of blockchain platforms for agricultural projects",
      req2: "Immutable records to prevent fraud and double counting",
      req3: "Public transparency for independent stakeholder verification",
      isoTitle: "Integrated ISO 14064 Standards",
      isoDesc: "Complete implementation of international standards for greenhouse gas accounting",
      iso1Title: "ISO 14064-1",
      iso1Desc: "Organizational level greenhouse gas inventories. Provides principles and requirements for designing, developing and managing GHG inventories.",
      iso2Title: "ISO 14064-2",
      iso2Desc: "Project level greenhouse gas emission reductions and removal enhancements. Focuses on quantification and reporting of emission reductions.",
      iso3Title: "ISO 14064-3",
      iso3Desc: "Verification and validation of greenhouse gas assertions. Provides requirements for verifying organizational or project GHG inventories.",
      visionTitle: "Our Vision for Sustainable Agriculture",
      visionText1: "FAGRI.Digital is transforming Italian agriculture through blockchain-based CO₂ certification, creating concrete economic opportunities for farmers while contributing to European climate goals.",
      visionText2: "We guarantee transparency, security, and complete regulatory compliance for every certification project.",
      trustTitle: "Global Trust and Recognition",
      trustDesc: "The EUFD2025-001 standard is internationally recognized and compatible with major carbon credit markets.",
      members: "Membri della Rete",
      companies: "Aziende Coinvolte",
      experience: "Anni di Esperienza",
      revolutionTitle: "Join the CO₂ Certification Revolution",
      revolutionDesc: "Become part of the future of sustainable agriculture with Europe's most advanced blockchain certification.",
      contactUs: "Contact Us",
      backHome: "Back to Home"
    },
    it: {
      heroTitle: "Lo Standard EUFD2025-001",
      heroSubtitle: "Scientifico, concreto, accessibile.",
      pioneerBadge: "Standard Pioniere Globale",
      pioneersTitle: "Pionieri dall'Italia al Mondo: Il Nostro Standard Blockchain per i Certificati CO₂",
      pioneersText1: "In FAGRI.Digital, siamo orgogliosi di presentare il nostro nuovo standard innovativo: EUFD2025-001. Questo standard è il risultato di anni di ricerca e sviluppo intensivi, basato sulle ultime scoperte scientifiche e creato in stretta collaborazione con le principali università italiane.",
      pioneersText2: "La piattaforma FAGRI Digital che supporta lo standard EUFD2025-001 è progettata per inaugurare una nuova era di fiducia, efficienza e trasparenza nella certificazione e nel commercio di CO₂ — alimentata dalla tecnologia blockchain, protocolli avanzati di protezione dei dati e architettura di sicurezza 3FA.",
      scientificTitle: "EUFD2025-001: Scientifico, Trasparente, Accessibile e Sicuro con Blockchain",
      scientificText1: "Lo standard EUFD2025-001 rappresenta un approccio rivoluzionario alla certificazione agricola CO₂, combinando metodologia scientifica rigorosa con tecnologia blockchain all'avanguardia. Sviluppato attraverso un'ampia collaborazione con le principali istituzioni di ricerca europee e validato da organismi di certificazione indipendenti, questo standard assicura che ogni credito di carbonio emesso sia scientificamente solido, completamente trasparente e legalmente conforme.",
      scientificText2: "Il nostro framework completo affronta la crescente necessità di contabilizzazione del carbonio standardizzata e verificabile in agricoltura mantenendo la flessibilità per accogliere diversi sistemi agricoli in Europa e oltre.",
      availableTitle: "Standard EUFD2025-001 Disponibile Ora",
      availableDesc: "Accedi alla documentazione completa dello standard di certificazione EUFD2025-001. Questa guida completa fornisce metodologie dettagliate, specifiche tecniche e linee guida per l'implementazione della certificazione agricola CO₂.",
      downloadBtn: "Scarica Standard",
      blockchainTitle: "Integrazione Tecnologia Blockchain",
      doubleCountingTitle: "Prevenzione Doppio Conteggio",
      doubleCountingDesc: "Algoritmi crittografici avanzati assicurano che ogni credito di carbonio possa essere emesso e commercializzato solo una volta, eliminando frodi e doppio conteggio attraverso record blockchain immutabili.",
      greenwashingTitle: "Protezione Greenwashing",
      greenwashingDesc: "Completa trasparenza attraverso verifica blockchain pubblica permette agli stakeholder di verificare indipendentemente l'autenticità e l'impatto ambientale di ogni credito di carbonio.",
      ownershipTitle: "Verifica Proprietà Chiara",
      ownershipDesc: "Smart contract stabiliscono automaticamente e trasferiscono diritti di proprietà, fornendo certezza legale e riducendo costi di transazione nei mercati dei crediti di carbonio.",
      securityTitle: "Standard di Sicurezza Massimi",
      securityDesc: "Crittografia di livello militare e protocolli di sicurezza di livello bancario svizzero proteggono tutti i dati, assicurando confidenzialità mantenendo trasparenza dove richiesto.",
      eliminationTitle: "Eliminazione del Doppio Conteggio",
      eliminationDesc: "Ogni certificato è unico e immutabile grazie alla tecnologia blockchain.",
      preventionTitle: "Prevenzione del Greenwashing",
      preventionDesc: "L'intera catena del valore è trasparente e tracciabile.",
      clearOwnershipTitle: "Proprietà Chiara",
      clearOwnershipDesc: "Le registrazioni digitali sono a prova di manomissione e permanenti.",
      maxSecurityTitle: "Sicurezza Massima",
      maxSecurityDesc: "Impronta digitale unica e autenticazione a tre fattori (3FA).",
      transparencyTitle: "Completa Trasparenza Blockchain",
      advancedTitle: "Integrazione Blockchain Avanzata",
      advancedDesc: "Tecnologia blockchain integrata per garantire massima trasparenza e immutabilità dei record di certificazione",
      strategicDesc: "La nostra piattaforma utilizza strategicamente la tecnologia blockchain per risolvere i principali problemi dei mercati dei crediti di carbonio: doppio conteggio, greenwashing e mancanza di trasparenza.",
      benefit1: "Prevenzione automatica del doppio conteggio attraverso algoritmi crittografici avanzati",
      benefit2: "Completa trasparenza con verifica pubblica di tutti i crediti di carbonio emessi",
      benefit3: "Proprietà chiara e trasferimento sicuro dei diritti dei crediti di carbonio",
      frameworkTitle: "Framework Normativo Europeo",
      euRegTitle: "Regolamento UE 3012/2024",
      euRegDesc: "Piena conformità al nuovo Regolamento UE 3012/2024 per la certificazione del carbonio",
      keyReqTitle: "Requisiti Normativi Chiave",
      req1: "Uso obbligatorio di piattaforme blockchain per progetti agricoli",
      req2: "Record immutabili per prevenire frodi e doppio conteggio",
      req3: "Trasparenza pubblica per verifica indipendente degli stakeholder",
      isoTitle: "Standard ISO 14064 Integrati",
      isoDesc: "Implementazione completa degli standard internazionali per la contabilizzazione dei gas serra",
      iso1Title: "ISO 14064-1",
      iso1Desc: "Inventari di gas serra a livello organizzativo. Fornisce principi e requisiti per progettare, sviluppare e gestire inventari GHG.",
      iso2Title: "ISO 14064-2",
      iso2Desc: "Riduzioni delle emissioni di gas serra a livello di progetto e miglioramenti di rimozione. Si concentra sulla quantificazione e reporting delle riduzioni di emissioni.",
      iso3Title: "ISO 14064-3",
      iso3Desc: "Verifica e validazione delle asserzioni sui gas serra. Fornisce requisiti per verificare inventari GHG organizzativi o di progetto.",
      visionTitle: "La Nostra Visione per l'Agricoltura Sostenibile",
      visionText1: "FAGRI.Digital sta trasformando l'agricoltura italiana attraverso la certificazione CO₂ basata su blockchain, creando opportunità economiche concrete per gli agricoltori mentre contribuiamo agli obiettivi climatici europei.",
      visionText2: "Garantiamo trasparenza, sicurezza e conformità normativa completa per ogni progetto di certificazione.",
      trustTitle: "Fiducia e Riconoscimento Globale",
      trustDesc: "Lo standard EUFD2025-001 è riconosciuto internazionalmente e compatibile con i principali mercati dei crediti di carbonio.",
      members: "Membri della Rete",
      companies: "Aziende Coinvolte",
      experience: "Anni di Esperienza",
      revolutionTitle: "Unisciti alla Rivoluzione della Certificazione CO₂",
      revolutionDesc: "Diventa parte del futuro dell'agricoltura sostenibile con la certificazione blockchain più avanzata d'Europa.",
      contactUs: "Contattaci",
      backHome: "Torna alla Home"
    }
  };

  const t = content[language] || content.en;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-light text-slate-900 mb-6">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-slate-600 mb-8 font-light">
              {t.heroSubtitle}
            </p>
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full border border-emerald-200">
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{t.pioneerBadge}</span>
            </div>
          </div>
          
          {/* Italian Government Building Image */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img 
                src={italianGovernment} 
                alt="Italian government building representing official EUFD2025-001 standard backing"
                className="w-full h-64 md:h-80 object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                Italian government building representing official EUFD2025-001 standard backing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Pioneers from Italy to the World: Our Blockchain Standard for CO₂ Certificates */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-6">
                {t.pioneersTitle}
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {t.pioneersText1}
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t.pioneersText2}
              </p>
            </div>

            {/* EUFD2025-001: Scientific, Transparent, Accessible and Secure with Blockchain */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-8">
                {t.scientificTitle}
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {t.scientificText1}
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t.scientificText2}
              </p>
            </div>

            {/* EUFD2025-001 Standard Available Now */}
            <div className="mb-16">
              <div className="bg-white rounded-xl p-8 border border-slate-200 text-center">
                <h3 className="text-2xl font-light text-slate-900 mb-4">
                  {t.availableTitle}
                </h3>
                <p className="text-slate-600 mb-6">
                  {t.availableDesc}
                </p>
                <button className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="h-5 w-5" />
                  <span>{t.downloadBtn}</span>
                </button>
              </div>
            </div>

            {/* Blockchain Technology Integration */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-8">
                {t.blockchainTitle}
              </h2>
              
              <div className="space-y-8">
                <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-200">
                  <h3 className="text-xl font-medium text-slate-900 mb-3">
                    {t.doubleCountingTitle}
                  </h3>
                  <p className="text-slate-600">
                    {t.doubleCountingDesc}
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
                  <h3 className="text-xl font-medium text-slate-900 mb-3">
                    {t.greenwashingTitle}
                  </h3>
                  <p className="text-slate-600">
                    {t.greenwashingDesc}
                  </p>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-8 border border-purple-200">
                  <h3 className="text-xl font-medium text-slate-900 mb-3">
                    {t.ownershipTitle}
                  </h3>
                  <p className="text-slate-600">
                    {t.ownershipDesc}
                  </p>
                </div>
                
                <div className="bg-orange-50 rounded-xl p-8 border border-orange-200">
                  <h3 className="text-xl font-medium text-slate-900 mb-3">
                    {t.securityTitle}
                  </h3>
                  <p className="text-slate-600">
                    {t.securityDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* EUFD2025-001: Scientific, Transparent, Accessible and Secure with Blockchain (Second Section) */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-8">
                {t.scientificTitle}
              </h2>
              
              <div className="space-y-6">
                <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    {t.eliminationTitle}
                  </h3>
                  <p className="text-slate-600">
                    {t.eliminationDesc}
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    {t.preventionTitle}
                  </h3>
                  <p className="text-slate-600">
                    {t.preventionDesc}
                  </p>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    {t.clearOwnershipTitle}
                  </h3>
                  <p className="text-slate-600">
                    {t.clearOwnershipDesc}
                  </p>
                </div>
                
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    {t.maxSecurityTitle}
                  </h3>
                  <p className="text-slate-600">
                    {t.maxSecurityDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Complete Blockchain Transparency */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-8">
                {t.transparencyTitle}
              </h2>
              
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 mb-8">
                <h3 className="text-xl font-medium text-slate-900 mb-4">
                  {t.advancedTitle}
                </h3>
                <p className="text-slate-600 mb-4">
                  {t.advancedDesc}
                </p>
                <p className="text-slate-600 mb-6">
                  {t.strategicDesc}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-slate-700">
                  {t.benefit1}
                </p>
                <p className="text-slate-700">
                  {t.benefit2}
                </p>
                <p className="text-slate-700">
                  {t.benefit3}
                </p>
              </div>
            </div>

            {/* European Regulatory Framework */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-8">
                {t.frameworkTitle}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
                  <h3 className="text-xl font-medium text-slate-900 mb-4">
                    {t.euRegTitle}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {t.euRegDesc}
                  </p>
                  <h4 className="font-medium text-slate-900 mb-3">{t.keyReqTitle}</h4>
                  <ul className="space-y-2 text-slate-600">
                    <li>{t.req1}</li>
                    <li>{t.req2}</li>
                    <li>{t.req3}</li>
                  </ul>
                </div>

                <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-200">
                  <h3 className="text-xl font-medium text-slate-900 mb-4">
                    {t.isoTitle}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {t.isoDesc}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">{t.iso1Title}</h4>
                      <p className="text-sm text-slate-600">
                        {t.iso1Desc}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">{t.iso2Title}</h4>
                      <p className="text-sm text-slate-600">
                        {t.iso2Desc}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">{t.iso3Title}</h4>
                      <p className="text-sm text-slate-600">
                        {t.iso3Desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Vision for Sustainable Agriculture */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-8">
                {t.visionTitle}
              </h2>
              <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-200">
                <p className="text-lg text-slate-700 mb-4">
                  {t.visionText1}
                </p>
                <p className="text-slate-600">
                  {t.visionText2}
                </p>
              </div>
            </div>

            {/* Global Trust and Recognition */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-8">
                {t.trustTitle}
              </h2>
              <p className="text-lg text-slate-600 mb-8 text-center">
                {t.trustDesc}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="bg-white rounded-xl p-8 border border-slate-200">
                  <div className="text-4xl font-light text-emerald-600 mb-2">110,000+</div>
                  <div className="text-slate-700">{t.members}</div>
                </div>
                <div className="bg-white rounded-xl p-8 border border-slate-200">
                  <div className="text-4xl font-light text-blue-600 mb-2">80,000+</div>
                  <div className="text-slate-700">{t.companies}</div>
                </div>
                <div className="bg-white rounded-xl p-8 border border-slate-200">
                  <div className="text-4xl font-light text-purple-600 mb-2">30</div>
                  <div className="text-slate-700">{t.experience}</div>
                </div>
              </div>
            </div>

            {/* Join the CO₂ Certification Revolution */}
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-6">
                {t.revolutionTitle}
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                {t.revolutionDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  {t.contactUs}
                </Link>
                <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                  {t.backHome}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}