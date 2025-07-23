import { useLanguage } from '../components/language-provider';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { useState } from 'react';
import { ChevronRight, ArrowUp, FileText, Globe, Shield, Zap, Building2, Users, ExternalLink } from 'lucide-react';

export default function LegalDocumentationPage() {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { 
      id: 'executive-summary', 
      title: language === 'it' ? 'Riassunto Esecutivo' : 'Executive Summary', 
      icon: FileText 
    },
    { 
      id: 'regulatory-framework', 
      title: language === 'it' ? 'Quadro Normativo Globale' : 'Global Regulatory Framework', 
      icon: Globe 
    },
    { 
      id: 'market-problems', 
      title: language === 'it' ? 'Problemi di Mercato Attuali' : 'Current Market Problems', 
      icon: Shield 
    },
    { 
      id: 'fagri-solution', 
      title: language === 'it' ? 'La Soluzione FAGRI.Digital' : 'FAGRI.Digital Solution', 
      icon: Zap 
    },
    { 
      id: 'implementation', 
      title: language === 'it' ? 'Strategia di Implementazione' : 'Implementation Strategy', 
      icon: Building2 
    },
    { 
      id: 'technical-architecture', 
      title: language === 'it' ? 'Architettura Tecnica' : 'Technical Architecture', 
      icon: Users 
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-light text-slate-900 mb-6">
              {language === 'it' ? 'Documentazione Legale' : 'Legal Documentation'}
            </h1>
            <p className="text-xl text-slate-600 mb-12 font-light">
              {language === 'it' 
                ? 'Guida completa alla nostra piattaforma di certificazione CO₂ basata su blockchain'
                : 'Comprehensive guide to our blockchain-powered CO₂ certification platform'
              }
            </p>

            {/* Navigation Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200 text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                        <IconComponent className="h-5 w-5 text-emerald-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {section.title}
                        </h3>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section id="executive-summary" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 mb-8">
              <FileText className="h-6 w-6 text-emerald-700" />
              <h2 className="text-3xl font-light text-slate-900">
                {language === 'it' ? 'Riassunto Esecutivo' : 'Executive Summary'}
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 mb-8">
                <h3 className="text-xl font-medium text-emerald-900 mb-4">
                  {language === 'it' 
                    ? 'Rivoluzionare i Mercati del Carbonio per un Futuro Sostenibile'
                    : 'Revolutionizing Carbon Markets for a Sustainable Future'
                  }
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {language === 'it' 
                    ? 'Lo sforzo globale per mitigare il cambiamento climatico si basa criticamente sull\'efficacia dei mercati del carbonio. Tuttavia, il panorama attuale è significativamente ostacolato da sfide sistemiche, inclusi i problemi pervasivi del doppio conteggio, la pratica ingannevole del greenwashing e una fondamentale mancanza di integrità e trasparenza dei dati.'
                    : 'The global effort to mitigate climate change critically relies on the efficacy of carbon markets. However, the current landscape is significantly hindered by systemic challenges, including the pervasive issues of double counting, the deceptive practice of greenwashing, and a fundamental lack of data integrity and transparency.'
                  }
                </p>
              </div>

              <p className="text-slate-600 leading-relaxed mb-6">
                {language === 'it' 
                  ? 'FAGRI.Digital è posizionata per trasformare fondamentalmente questo ambiente sfruttando strategicamente la Distributed Ledger Technology (DLT), con un focus particolare sulla nostra G8Chain proprietaria, basata su tecnologia blockchain EVM-compatibile. Questa fondazione tecnologica è progettata per stabilire un nuovo paradigma per la conformità legislativa CO₂, tracciabilità migliorata e accessibilità di mercato espansa.'
                  : 'FAGRI.Digital is positioned to fundamentally transform this environment by strategically leveraging Distributed Ledger Technology (DLT), with a particular focus on our proprietary G8Chain, which is based on EVM-compatible blockchain technology. This technological foundation is designed to establish a new paradigm for CO₂ legislation compliance, enhanced traceability, and expanded market accessibility.'
                }
              </p>

              <p className="text-slate-600 leading-relaxed mb-8">
                {language === 'it' 
                  ? 'La piattaforma offre un ecosistema immutabile, verificabile e trasparente per la gestione dei crediti di carbonio che affronta le carenze fondamentali che affliggono i mercati attuali del carbonio. Con un lancio meticolosamente pianificato iniziando dall\'Italia, progredendo attraverso l\'Europa e aspirando infine a stabilire uno standard globale unico, FAGRI.Digital è impegnata a democratizzare i mercati del carbonio.'
                  : 'The platform offers an immutable, verifiable, and transparent ecosystem for carbon credit management that addresses the core deficiencies plaguing current carbon markets. With a meticulously planned rollout commencing in Italy, progressing across Europe, and ultimately aspiring to establish a unique global standard, FAGRI.Digital is committed to democratizing carbon markets.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Regulatory Framework */}
      <section id="regulatory-framework" className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 mb-8">
              <Globe className="h-6 w-6 text-emerald-700" />
              <h2 className="text-3xl font-light text-slate-900">
                {language === 'it' ? 'Quadro Normativo Globale' : 'Global Regulatory Framework'}
              </h2>
            </div>

            {/* International Frameworks */}
            <div className="mb-12">
              <h3 className="text-2xl font-light text-slate-900 mb-6">International Frameworks for Climate Action</h3>
              
              <div className="grid gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h4 className="font-medium text-slate-900 mb-3">United Nations Framework Convention on Climate Change (UNFCCC) - 1992</h4>
                  <p className="text-slate-600 text-sm mb-3">
                    The foundational international treaty for addressing climate change, establishing the framework for stabilizing greenhouse gas concentrations in the atmosphere.
                  </p>
                  <a href="https://unfccc.int" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center">
                    Official Website <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h4 className="font-medium text-slate-900 mb-3">Kyoto Protocol - 1997</h4>
                  <p className="text-slate-600 text-sm mb-3">
                    Legally binding greenhouse gas emission reduction targets for developed countries, spanning 2008-2012 and 2013-2020 periods.
                  </p>
                  <a href="https://unfccc.int/kyoto_protocol" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center">
                    Official Documentation <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h4 className="font-medium text-slate-900 mb-3">Paris Agreement - 2015</h4>
                  <p className="text-slate-600 text-sm mb-3">
                    Legally binding international treaty keeping global temperature rise "well below 2°C above pre-industrial levels and pursue efforts to limit the temperature increase to 1.5°C."
                  </p>
                  <a href="https://unfccc.int/process-and-meetings/the-paris-agreement" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center">
                    Official Text <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* European Union Framework */}
            <div className="mb-12">
              <h3 className="text-2xl font-light text-slate-900 mb-6">European Union's Climate and Digital Agenda</h3>
              
              <div className="bg-white rounded-xl p-8 border border-slate-200 mb-6">
                <h4 className="font-medium text-slate-900 mb-4">European Green Deal & "Fit for 55" Package</h4>
                <p className="text-slate-600 mb-4">
                  Comprehensive legislative proposals designed to cut net greenhouse gas emissions by at least 55% by 2030 compared to 1990 levels, aiming for climate neutrality by 2050.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h5 className="font-medium text-slate-900 mb-2">EU ETS Expansion</h5>
                    <p className="text-slate-600 text-sm">Covers 45% of EU's greenhouse gas emissions with new ETS2 system for buildings and transport from 2027.</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h5 className="font-medium text-slate-900 mb-2">Carbon Border Adjustment (CBAM)</h5>
                    <p className="text-slate-600 text-sm">Prevents carbon leakage by imposing tariffs on carbon-intensive imports from 2026.</p>
                  </div>
                </div>

                <a href="https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/european-green-deal" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center">
                  European Green Deal <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>

              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <h4 className="font-medium text-slate-900 mb-4">Corporate Sustainability Reporting Directive (CSRD)</h4>
                <p className="text-slate-600 mb-4">
                  Mandatory ESG reporting for large enterprises starting fiscal year 2024, requiring detailed Scope 1, 2, and 3 carbon emissions reporting with "double materiality" assessment.
                </p>
                <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022L2464" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center">
                  CSRD Directive <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Italy's Progressive Stance */}
            <div>
              <h3 className="text-2xl font-light text-slate-900 mb-6">Italy's Progressive Stance on CO₂ Legislation and DLT</h3>
              
              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <h4 className="font-medium text-slate-900 mb-4">Legal Recognition of DLT and Smart Contracts</h4>
                <p className="text-slate-600 mb-4">
                  Italian Law no. 12/2019 ("Decreto Semplificazioni") provides explicit legal definitions for Distributed Ledger Technologies and Smart Contracts, creating legal certainty for DLT-based applications.
                </p>
                
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 text-sm font-medium">Key Legal Framework:</p>
                  <ul className="text-emerald-700 text-sm mt-2 space-y-1">
                    <li>• DLT defined as "shared, distributed, replicable ledger accessible"</li>
                    <li>• Smart contracts legally binding when parties are electronically identified</li>
                    <li>• DLT storage produces legal effects of electronic time validation</li>
                  </ul>
                </div>

                <p className="text-slate-600 mb-4">
                  The Italian Ministry of Economic Development has actively explored blockchain for traceability in the "Made in Italy" initiative, with direct applicability to CO₂ emissions tracking.
                </p>

                <a href="https://www.gazzettaufficiale.it/eli/id/2019/02/12/19G00017/sg" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center">
                  Italian Law 12/2019 <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Market Problems */}
      <section id="market-problems" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 mb-8">
              <Shield className="h-6 w-6 text-emerald-700" />
              <h2 className="text-3xl font-light text-slate-900">Current Market Problems</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="font-medium text-red-900 mb-3">Double Counting</h3>
                <p className="text-red-700 text-sm">
                  A single carbon credit counted multiple times through double selling, double issuance, or double claiming, severely undermining market integrity.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3 className="font-medium text-orange-900 mb-3">Greenwashing</h3>
                <p className="text-orange-700 text-sm">
                  Deceptive practices where companies claim environmental benefits without genuine emission reductions, often through low-quality offset projects.
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="font-medium text-yellow-900 mb-3">Data Integrity Issues</h3>
                <p className="text-yellow-700 text-sm">
                  Flawed data, lack of standardization, limited oversight, and anonymity in reporting create systemic trust issues in carbon markets.
                </p>
              </div>
            </div>

            <div className="bg-slate-100 rounded-xl p-8">
              <h3 className="text-xl font-medium text-slate-900 mb-4">Impact on Climate Action</h3>
              <p className="text-slate-600 leading-relaxed">
                These interconnected problems create a "tragedy of the commons" scenario where individual actors may not prioritize data integrity without systemic incentives, leading to collective market failure. The result is misallocated resources, delayed meaningful action, and erosion of trust in carbon markets as effective climate solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAGRI.Digital Solution */}
      <section id="fagri-solution" className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 mb-8">
              <Zap className="h-6 w-6 text-emerald-700" />
              <h2 className="text-3xl font-light text-slate-900">{t('legal-doc-fagri-solution')}</h2>
            </div>

            <div className="bg-white rounded-xl p-8 border border-slate-200 mb-8">
              <h3 className="text-2xl font-light text-slate-900 mb-6">
                FAGRI.Digital: {language === 'it' ? 'Piattaforma Globale per la Certificazione CO₂' : 'Global Platform for CO₂ Certification'}
              </h3>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 mb-8">
                <h4 className="text-xl font-medium text-emerald-900 mb-4">
                  {language === 'it' ? 'Chi Siamo' : 'Who We Are'}
                </h4>
                <p className="text-emerald-800 leading-relaxed mb-4">
                  {language === 'it' 
                    ? 'FAGRI.Digital, nata in seno alla FAGRI (Federazione Agricoltori Italiani), è un Sistema di Certificazione con piattaforma digitale globale per il mercato del carbonio e per le certificazioni in blockchain in agricoltura. Con oltre 30 anni di esperienza nel settore agricolo italiano, rappresentiamo più di 110.000 membri e quasi 80.000 imprese.'
                    : 'FAGRI.Digital, born within FAGRI (Italian Farmers Federation), is a Certification System with a global digital platform for the carbon market and blockchain certifications in agriculture. With over 30 years of experience in the Italian agricultural sector, we represent more than 110,000 members and nearly 80,000 enterprises.'
                  }
                </p>
                <p className="text-emerald-800 leading-relaxed">
                  {language === 'it' 
                    ? 'La nostra missione è creare un ponte tra la concretezza dell\'esperienza agricola e gli strumenti digitali moderni, per una partecipazione equa e trasparente ai programmi ambientali e climatici – in particolare nella certificazione della CO₂.'
                    : 'Our mission is to create a bridge between the concreteness of agricultural experience and modern digital tools, for fair and transparent participation in environmental and climate programs – particularly in CO₂ certification.'
                  }
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h4 className="font-medium text-slate-900 mb-3">
                    {language === 'it' ? 'La Nostra Esperienza' : 'Our Experience'}
                  </h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{language === 'it' ? 'Oltre 30 anni di esperienza nel settore agricolo italiano' : 'Over 30 years of experience in the Italian agricultural sector'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{language === 'it' ? 'Rete di più di 110.000 membri attivi' : 'Network of more than 110,000 active members'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{language === 'it' ? 'Quasi 80.000 imprese agricole coinvolte' : 'Nearly 80,000 agricultural enterprises involved'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{language === 'it' ? 'Collaborazioni internazionali attive in Europa, America Latina, Africa' : 'Active international collaborations in Europe, Latin America, Africa'}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-3">
                    {language === 'it' ? 'Il Nostro Processo di Certificazione' : 'Our Certification Process'}
                  </h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{language === 'it' ? 'Accettazione progetti di compensazione ambientale da carbon farming' : 'Acceptance of environmental compensation projects from carbon farming'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{language === 'it' ? 'Certificazione di conformità attraverso Organismo designato' : 'Compliance certification through designated Organization'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{language === 'it' ? 'Pubblicazione su Registro Digitale in blockchain' : 'Publication on Digital Registry in blockchain'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{language === 'it' ? 'Vendita carbon credits sui mercati volontari e regolamentati' : 'Sale of carbon credits on voluntary and regulated markets'}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="font-medium text-blue-900 mb-3">
                  {language === 'it' ? 'Partnership Tecnologica con ALPHAG8 Switzerland' : 'Technology Partnership with ALPHAG8 Switzerland'}
                </h4>
                <p className="text-blue-800 text-sm mb-3">
                  {language === 'it' 
                    ? 'La piattaforma FAGRI.Digital è sviluppata in collaborazione con ALPHAG8 Digital Solutions Switzerland, nostro partner tecnologico per la sicurezza completa, la progettazione della piattaforma e il concetto di infrastruttura digitale.'
                    : 'The FAGRI.Digital platform is developed in collaboration with ALPHAG8 Digital Solutions Switzerland, our technology partner for complete security, platform design and digital infrastructure concept.'
                  }
                </p>
                <p className="text-blue-800 text-sm">
                  {language === 'it' 
                    ? 'Utilizziamo la tecnologia blockchain G8Chain (EVM-compatibile) per garantire tracciabilità, immutabilità e sicurezza di livello bancario svizzero per tutti i certificati CO₂.'
                    : 'We use G8Chain blockchain technology (EVM-compatible) to ensure traceability, immutability and Swiss banking-level security for all CO₂ certificates.'
                  }
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <h4 className="font-medium text-emerald-900 mb-3">
                  {language === 'it' ? 'Standard EUFD2025-001: La Nostra Innovazione' : 'EUFD2025-001 Standard: Our Innovation'}
                </h4>
                <p className="text-emerald-800 text-sm mb-3">
                  {language === 'it' 
                    ? 'Sviluppato in collaborazione con le principali università italiane, tra cui l\'Università degli Studi di Viterbo La Tuscia, lo standard EUFD2025-001 rappresenta un nuovo paradigma globale per l\'emissione di crediti di carbonio.'
                    : 'Developed in collaboration with leading Italian universities, including the University of Viterbo La Tuscia, the EUFD2025-001 standard represents a new global paradigm for carbon credit issuance.'
                  }
                </p>
                <p className="text-emerald-800 text-sm">
                  {language === 'it' 
                    ? 'Il nostro standard integra obbligatoriamente la tecnologia blockchain per l\'emissione e la registrazione di crediti di carbonio certificati, garantendo tracciabilità, trasparenza e immutabilità in conformità al Regolamento UE 3012/2024 e agli standard ISO 14064-1, 14064-2, e 14064-3.'
                    : 'Our standard mandatorily integrates blockchain technology for the issuance and registration of certified carbon credits, ensuring traceability, transparency and immutability in compliance with EU Regulation 3012/2024 and ISO 14064-1, 14064-2, and 14064-3 standards.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Strategy */}
      <section id="implementation" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 mb-8">
              <Building2 className="h-6 w-6 text-emerald-700" />
              <h2 className="text-3xl font-light text-slate-900">Implementation Strategy</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-emerald-700 font-bold">1</span>
                </div>
                <h3 className="font-medium text-emerald-900 mb-3">Italy-First Launch</h3>
                <p className="text-emerald-700 text-sm">
                  Leverage Italy's progressive DLT legislation and supportive regulatory framework for initial deployment and testing.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-700 font-bold">2</span>
                </div>
                <h3 className="font-medium text-blue-900 mb-3">European Expansion</h3>
                <p className="text-blue-700 text-sm">
                  Scale across EU member states leveraging harmonized climate legislation and CSRD reporting requirements.
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-purple-700 font-bold">3</span>
                </div>
                <h3 className="font-medium text-purple-900 mb-3">Global Deployment</h3>
                <p className="text-purple-700 text-sm">
                  Expand to international markets with established legal precedent and proven technology platform.
                </p>
              </div>
            </div>

            <div className="bg-slate-100 rounded-xl p-8">
              <h3 className="text-xl font-medium text-slate-900 mb-4">Strategic Advantages</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Regulatory Alignment</h4>
                  <p className="text-slate-600 text-sm">
                    Direct alignment with EU ETS, CSRD requirements, and national climate adaptation plans creates immediate market demand.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Technology Leadership</h4>
                  <p className="text-slate-600 text-sm">
                    First-mover advantage in blockchain-based CO₂ certification with legally recognized smart contract framework.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section id="technical-architecture" className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 mb-8">
              <Users className="h-6 w-6 text-emerald-700" />
              <h2 className="text-3xl font-light text-slate-900">Technical Architecture</h2>
            </div>

            <div className="bg-white rounded-xl p-8 border border-slate-200 mb-8">
              <h3 className="text-2xl font-light text-slate-900 mb-6">Multi-Stakeholder Blockchain Governance</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-slate-900 mb-4">51-Node Validator Network</h4>
                  <p className="text-slate-600 text-sm mb-4">
                    Each partner organization controls one validator node, ensuring true decentralization and preventing single points of control in the carbon certification process.
                  </p>
                  
                  <div className="space-y-2">
                    <div className="bg-emerald-50 rounded p-3">
                      <span className="text-emerald-800 text-sm font-medium">Agricultural Cooperatives</span>
                    </div>
                    <div className="bg-blue-50 rounded p-3">
                      <span className="text-blue-800 text-sm font-medium">Environmental Organizations</span>
                    </div>
                    <div className="bg-purple-50 rounded p-3">
                      <span className="text-purple-800 text-sm font-medium">Financial Institutions</span>
                    </div>
                    <div className="bg-orange-50 rounded p-3">
                      <span className="text-orange-800 text-sm font-medium">Technology Partners</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-4">Smart Contract Framework</h4>
                  <ul className="space-y-3 text-slate-600 text-sm">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Immutable Audit Trails:</strong> Every certification process permanently recorded</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Automated Validation:</strong> Smart contracts verify agricultural practice compliance</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Cryptographic Proof:</strong> Mathematical verification of environmental impact claims</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>DeFi Integration:</strong> Seamless connection to decentralized finance protocols</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h4 className="font-medium text-slate-900 mb-3">Data Security & Privacy</h4>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• Zero-knowledge encryption architecture</li>
                  <li>• AES-256 and RSA-4096 encryption standards</li>
                  <li>• Swiss Alpine data center infrastructure</li>
                  <li>• FINMA banking compliance level security</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h4 className="font-medium text-slate-900 mb-3">Compliance & Standards</h4>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• ISO 14064-1, 14064-2, 14064-3 compliance</li>
                  <li>• EU Regulation 3012/2024 alignment</li>
                  <li>• EUFD2025-001 standard implementation</li>
                  <li>• Swiss Federal Data Protection Act compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg transition-colors flex items-center justify-center z-50"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      <Footer />
    </div>
  );
}