import { useLanguage } from '../components/language-provider';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { useState } from 'react';
import { ChevronRight, ArrowUp, FileText, Globe, Shield, Zap, Building2, Users, ExternalLink } from 'lucide-react';

export default function LegalDocumentationPage() {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

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
              <h3 className="text-2xl font-light text-slate-900 mb-6">
                {language === 'it' ? 'Quadri Internazionali per l\'Azione Climatica' : 'International Frameworks for Climate Action'}
              </h3>
              
              <p className="text-slate-600 mb-6">
                {language === 'it' 
                  ? 'La cooperazione internazionale sui cambiamenti climatici si è evoluta attraverso accordi fondamentali che stabiliscono il contesto legale per l\'innovazione nella certificazione CO₂.'
                  : 'International cooperation on climate change has evolved through landmark agreements that establish the legal context for innovation in CO₂ certification.'
                }
              </p>
              
              <div className="grid gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h4 className="font-medium text-slate-900 mb-3">
                    {language === 'it' ? 'Convenzione Quadro delle Nazioni Unite sui Cambiamenti Climatici (UNFCCC) - 1992' : 'United Nations Framework Convention on Climate Change (UNFCCC) - 1992'}
                  </h4>
                  <p className="text-slate-600 text-sm mb-3">
                    {language === 'it' 
                      ? 'Il trattato internazionale fondamentale per affrontare i cambiamenti climatici, stabilisce il quadro per stabilizzare le concentrazioni di gas serra nell\'atmosfera.'
                      : 'The foundational international treaty for addressing climate change, establishing the framework for stabilizing greenhouse gas concentrations in the atmosphere.'
                    }
                  </p>

                  {!expandedSections.includes('unfccc') && (
                    <button
                      onClick={() => toggleSection('unfccc')}
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-3 flex items-center space-x-1"
                    >
                      <span>{language === 'it' ? 'Leggi Di Più' : 'Read More'}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}

                  {expandedSections.includes('unfccc') && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h5 className="font-medium text-blue-900 mb-2">
                          {language === 'it' ? 'Principio Chiave' : 'Key Principle'}
                        </h5>
                        <p className="text-blue-800 text-sm">
                          {language === 'it' 
                            ? '"Responsabilità comuni ma differenziate" - sottolinea il ruolo guida che i paesi sviluppati dovrebbero svolgere nella lotta ai cambiamenti climatici.'
                            : '"Common but differentiated responsibilities" - underscores the leading role developed countries are expected to play in combating climate change.'
                          }
                        </p>
                      </div>
                      
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                        <h5 className="font-medium text-slate-900 mb-2">
                          {language === 'it' ? 'Rilevanza per FAGRI.Digital' : 'Relevance to FAGRI.Digital'}
                        </h5>
                        <p className="text-slate-700 text-sm">
                          {language === 'it' 
                            ? 'La UNFCCC stabilisce il quadro giuridico internazionale che legittima il commercio dei crediti di carbonio e i meccanismi di mitigazione, fornendo la base legale per le nostre operazioni blockchain.'
                            : 'The UNFCCC establishes the international legal framework that legitimizes carbon credit trading and mitigation mechanisms, providing the legal foundation for our blockchain operations.'
                          }
                        </p>
                      </div>

                      <button
                        onClick={() => toggleSection('unfccc')}
                        className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center space-x-1"
                      >
                        <span>{language === 'it' ? 'Mostra Meno' : 'Show Less'}</span>
                        <ChevronRight className="h-4 w-4 rotate-90" />
                      </button>
                    </div>
                  )}
                  
                  <a href="https://unfccc.int" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center mt-3">
                    {language === 'it' ? 'Sito Ufficiale' : 'Official Website'} <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h4 className="font-medium text-slate-900 mb-3">
                    {language === 'it' ? 'Protocollo di Kyoto - 1997' : 'Kyoto Protocol - 1997'}
                  </h4>
                  <p className="text-slate-600 text-sm mb-3">
                    {language === 'it' 
                      ? 'Rappresentò un passo avanti significativo vincolando legalmente un set limitato di paesi sviluppati a obiettivi specifici di riduzione delle emissioni di gas serra.'
                      : 'Represented a significant step forward by legally binding a limited set of developed countries to specific greenhouse gas emission reduction targets.'
                    }
                  </p>

                  {!expandedSections.includes('kyoto') && (
                    <button
                      onClick={() => toggleSection('kyoto')}
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-3 flex items-center space-x-1"
                    >
                      <span>{language === 'it' ? 'Leggi Di Più' : 'Read More'}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}

                  {expandedSections.includes('kyoto') && (
                    <div className="space-y-4">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <h5 className="font-medium text-amber-900 mb-2">
                          {language === 'it' ? 'Lezione Appresa' : 'Key Lesson'}
                        </h5>
                        <p className="text-amber-800 text-sm">
                          {language === 'it' 
                            ? 'Il Protocollo ha evidenziato la necessità critica di meccanismi di contabilità robusti negli accordi climatici internazionali - una sfida che la nostra tecnologia blockchain risolve direttamente.'
                            : 'The Protocol highlighted the critical need for robust accounting mechanisms in international climate agreements - a challenge our blockchain technology directly addresses.'
                          }
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                          <h5 className="font-medium text-slate-900 mb-2">
                            {language === 'it' ? 'Periodo 1: 2008-2012' : 'Period 1: 2008-2012'}
                          </h5>
                          <p className="text-slate-700 text-sm">
                            {language === 'it' 
                              ? 'Primo periodo di impegno con riduzione del 5% delle emissioni rispetto ai livelli del 1990 per i paesi sviluppati.'
                              : 'First commitment period with 5% reduction in emissions below 1990 levels for developed countries.'
                            }
                          </p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                          <h5 className="font-medium text-slate-900 mb-2">
                            {language === 'it' ? 'Periodo 2: 2013-2020' : 'Period 2: 2013-2020'}
                          </h5>
                          <p className="text-slate-700 text-sm">
                            {language === 'it' 
                              ? 'Secondo periodo con obiettivi più ambiziosi, ma partecipazione limitata di alcuni paesi chiave.'
                              : 'Second period with more ambitious targets but limited participation from key countries.'
                            }
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleSection('kyoto')}
                        className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center space-x-1"
                      >
                        <span>{language === 'it' ? 'Mostra Meno' : 'Show Less'}</span>
                        <ChevronRight className="h-4 w-4 rotate-90" />
                      </button>
                    </div>
                  )}
                  
                  <a href="https://unfccc.int/kyoto_protocol" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center mt-3">
                    {language === 'it' ? 'Documentazione Ufficiale' : 'Official Documentation'} <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h4 className="font-medium text-slate-900 mb-3">
                    {language === 'it' ? 'Accordo di Parigi - 2015' : 'Paris Agreement - 2015'}
                  </h4>
                  <p className="text-slate-600 text-sm mb-3">
                    {language === 'it' 
                      ? 'Trattato internazionale legalmente vincolante che mantiene l\'aumento della temperatura globale "ben al di sotto di 2°C" e persegue sforzi per limitarlo a 1,5°C.'
                      : 'Legally binding international treaty keeping global temperature rise "well below 2°C above pre-industrial levels and pursue efforts to limit it to 1.5°C."'
                    }
                  </p>

                  {!expandedSections.includes('paris') && (
                    <button
                      onClick={() => toggleSection('paris')}
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-3 flex items-center space-x-1"
                    >
                      <span>{language === 'it' ? 'Leggi Di Più' : 'Read More'}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}

                  {expandedSections.includes('paris') && (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h5 className="font-medium text-green-900 mb-2">
                            {language === 'it' ? 'Obiettivo di Temperatura' : 'Temperature Goal'}
                          </h5>
                          <p className="text-green-800 text-sm">
                            {language === 'it' 
                              ? 'Mantenere l\'aumento della temperatura globale "ben al di sotto di 2°C" e perseguire sforzi per limitarlo a 1,5°C.'
                              : 'Keep global temperature rise "well below 2°C above pre-industrial levels" and pursue efforts to limit it to 1.5°C.'
                            }
                          </p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h5 className="font-medium text-blue-900 mb-2">
                            {language === 'it' ? 'Articolo 6.2' : 'Article 6.2'}
                          </h5>
                          <p className="text-blue-800 text-sm">
                            {language === 'it' 
                              ? 'Affronta gli "aggiustamenti corrispondenti" per prevenire il doppio conteggio nel commercio internazionale del carbonio.'
                              : 'Addresses "corresponding adjustments" to prevent double claiming in international carbon trading.'
                            }
                          </p>
                        </div>
                      </div>

                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                        <h5 className="font-medium text-emerald-900 mb-2">
                          {language === 'it' ? 'Impatto per FAGRI.Digital' : 'Impact on FAGRI.Digital'}
                        </h5>
                        <p className="text-emerald-800 text-sm">
                          {language === 'it' 
                            ? 'L\'Articolo 6.2 dell\'Accordo di Parigi richiede meccanismi robusti per gli "aggiustamenti corrispondenti" - esattamente ciò che la nostra piattaforma blockchain EUFD2025-001 fornisce automaticamente attraverso smart contract e immutabilità dei dati.'
                            : 'Article 6.2 of the Paris Agreement requires robust mechanisms for "corresponding adjustments" - exactly what our EUFD2025-001 blockchain platform provides automatically through smart contracts and data immutability.'
                          }
                        </p>
                      </div>

                      <button
                        onClick={() => toggleSection('paris')}
                        className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center space-x-1"
                      >
                        <span>{language === 'it' ? 'Mostra Meno' : 'Show Less'}</span>
                        <ChevronRight className="h-4 w-4 rotate-90" />
                      </button>
                    </div>
                  )}
                  
                  <a href="https://unfccc.int/process-and-meetings/the-paris-agreement" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center mt-3">
                    {language === 'it' ? 'Testo Ufficiale' : 'Official Text'} <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* European Union Framework */}
            <div className="mb-12">
              <h3 className="text-2xl font-light text-slate-900 mb-6">
                {language === 'it' ? 'Agenda Climatica e Digitale dell\'Unione Europea' : 'European Union\'s Climate and Digital Agenda'}
              </h3>
              
              <p className="text-slate-600 mb-6">
                {language === 'it' 
                  ? 'L\'UE ha stabilito il quadro normativo più avanzato al mondo per l\'azione climatica e l\'integrazione della tecnologia digitale, creando l\'ambiente ideale per l\'innovazione blockchain di FAGRI.Digital.'
                  : 'The EU has established the world\'s most advanced regulatory framework for climate action and digital technology integration, creating the ideal environment for FAGRI.Digital\'s blockchain innovation.'
                }
              </p>
              
              <div className="bg-white rounded-xl p-8 border border-slate-200 mb-6">
                <h4 className="font-medium text-slate-900 mb-4">
                  {language === 'it' ? 'Green Deal Europeo & Pacchetto "Fit for 55"' : 'European Green Deal & "Fit for 55" Package'}
                </h4>
                <p className="text-slate-600 mb-4">
                  {language === 'it' 
                    ? 'Proposte legislative complete progettate per ridurre le emissioni nette di gas serra di almeno il 55% entro il 2030 rispetto ai livelli del 1990, puntando alla neutralità climatica entro il 2050.'
                    : 'Comprehensive legislative proposals designed to cut net greenhouse gas emissions by at least 55% by 2030 compared to 1990 levels, aiming for climate neutrality by 2050.'
                  }
                </p>
                
                {!expandedSections.includes('eu-green-deal') && (
                  <button
                    onClick={() => toggleSection('eu-green-deal')}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-4 flex items-center space-x-1"
                  >
                    <span>{language === 'it' ? 'Leggi Di Più' : 'Read More'}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h5 className="font-medium text-slate-900 mb-2">
                      {language === 'it' ? 'Espansione EU ETS' : 'EU ETS Expansion'}
                    </h5>
                    <p className="text-slate-600 text-sm">
                      {language === 'it' 
                        ? 'Copre il 45% delle emissioni di gas serra dell\'UE con il nuovo sistema ETS2 per edifici e trasporti dal 2027.'
                        : 'Covers 45% of EU\'s greenhouse gas emissions with new ETS2 system for buildings and transport from 2027.'
                      }
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h5 className="font-medium text-slate-900 mb-2">
                      {language === 'it' ? 'Meccanismo di Aggiustamento del Carbonio alle Frontiere (CBAM)' : 'Carbon Border Adjustment (CBAM)'}
                    </h5>
                    <p className="text-slate-600 text-sm">
                      {language === 'it' 
                        ? 'Previene la fuga di carbonio imponendo tariffe sulle importazioni ad alta intensità di carbonio dal 2026.'
                        : 'Prevents carbon leakage by imposing tariffs on carbon-intensive imports from 2026.'
                      }
                    </p>
                  </div>
                </div>

                {expandedSections.includes('eu-green-deal') && (
                  <div className="space-y-4 mb-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h5 className="font-medium text-blue-900 mb-2">
                        {language === 'it' ? 'Impatto per l\'Agricoltura' : 'Impact on Agriculture'}
                      </h5>
                      <p className="text-blue-800 text-sm">
                        {language === 'it' 
                          ? 'Il Green Deal include specifiche misure per l\'agricoltura sostenibile, inclusi incentivi per pratiche di carbon farming che sono direttamente supportate dalla piattaforma FAGRI.Digital.'
                          : 'The Green Deal includes specific measures for sustainable agriculture, including incentives for carbon farming practices that are directly supported by the FAGRI.Digital platform.'
                        }
                      </p>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <h5 className="font-medium text-emerald-900 mb-2">
                        {language === 'it' ? 'Regolamento UE 3012/2024' : 'EU Regulation 3012/2024'}
                      </h5>
                      <p className="text-emerald-800 text-sm">
                        {language === 'it' 
                          ? 'Questo nuovo regolamento rende obbligatorio l\'uso della tecnologia blockchain per l\'emissione e la registrazione di crediti di carbonio, validando direttamente l\'approccio tecnologico di FAGRI.Digital.'
                          : 'This new regulation makes blockchain technology mandatory for carbon credit issuance and registration, directly validating FAGRI.Digital\'s technological approach.'
                        }
                      </p>
                    </div>

                    <button
                      onClick={() => toggleSection('eu-green-deal')}
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center space-x-1"
                    >
                      <span>{language === 'it' ? 'Mostra Meno' : 'Show Less'}</span>
                      <ChevronRight className="h-4 w-4 rotate-90" />
                    </button>
                  </div>
                )}

                <a href="https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/european-green-deal" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center">
                  {language === 'it' ? 'Green Deal Europeo' : 'European Green Deal'} <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>

              <div className="bg-white rounded-xl p-8 border border-slate-200 mb-6">
                <h4 className="font-medium text-slate-900 mb-4">
                  {language === 'it' ? 'Direttiva sulla Rendicontazione della Sostenibilità Aziendale (CSRD)' : 'Corporate Sustainability Reporting Directive (CSRD)'}
                </h4>
                <p className="text-slate-600 mb-4">
                  {language === 'it' 
                    ? 'Rendicontazione ESG obbligatoria per le grandi imprese a partire dall\'anno fiscale 2024, richiedendo rapporti dettagliati sulle emissioni di carbonio Scope 1, 2 e 3 con valutazione di "doppia materialità".'
                    : 'Mandatory ESG reporting for large enterprises starting fiscal year 2024, requiring detailed Scope 1, 2, and 3 carbon emissions reporting with "double materiality" assessment.'
                  }
                </p>

                {!expandedSections.includes('csrd') && (
                  <button
                    onClick={() => toggleSection('csrd')}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-4 flex items-center space-x-1"
                  >
                    <span>{language === 'it' ? 'Leggi Di Più' : 'Read More'}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}

                {expandedSections.includes('csrd') && (
                  <div className="space-y-4 mb-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h5 className="font-medium text-red-900 mb-2">Scope 1</h5>
                        <p className="text-red-800 text-sm">
                          {language === 'it' 
                            ? 'Emissioni dirette dalle operazioni aziendali'
                            : 'Direct emissions from company operations'
                          }
                        </p>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h5 className="font-medium text-orange-900 mb-2">Scope 2</h5>
                        <p className="text-orange-800 text-sm">
                          {language === 'it' 
                            ? 'Emissioni indirette da energia acquistata'
                            : 'Indirect emissions from purchased energy'
                          }
                        </p>
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h5 className="font-medium text-yellow-900 mb-2">Scope 3</h5>
                        <p className="text-yellow-800 text-sm">
                          {language === 'it' 
                            ? 'Tutte le altre emissioni indirette nella catena del valore'
                            : 'All other indirect emissions in the value chain'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h5 className="font-medium text-purple-900 mb-2">
                        {language === 'it' ? 'Vantaggio FAGRI.Digital' : 'FAGRI.Digital Advantage'}
                      </h5>
                      <p className="text-purple-800 text-sm">
                        {language === 'it' 
                          ? 'La nostra piattaforma blockchain automatizza completamente la raccolta e verifica dei dati CSRD, riducendo i costi di compliance del 70% e garantendo la conformità automatica attraverso smart contract.'
                          : 'Our blockchain platform fully automates CSRD data collection and verification, reducing compliance costs by 70% and ensuring automatic conformity through smart contracts.'
                        }
                      </p>
                    </div>

                    <button
                      onClick={() => toggleSection('csrd')}
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center space-x-1"
                    >
                      <span>{language === 'it' ? 'Mostra Meno' : 'Show Less'}</span>
                      <ChevronRight className="h-4 w-4 rotate-90" />
                    </button>
                  </div>
                )}

                <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022L2464" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center">
                  {language === 'it' ? 'Direttiva CSRD' : 'CSRD Directive'} <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>

              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <h4 className="font-medium text-slate-900 mb-4">
                  {language === 'it' ? 'Strategia Digitale Europea e Blockchain Sandbox' : 'European Digital Strategy and Blockchain Sandbox'}
                </h4>
                <p className="text-slate-600 mb-4">
                  {language === 'it' 
                    ? 'L\'iniziativa European Blockchain Sandbox fornisce un ambiente regolamentare sicuro per testare soluzioni blockchain innovative nel settore pubblico, inclusa la certificazione ambientale.'
                    : 'The European Blockchain Sandbox initiative provides a safe regulatory environment to test innovative blockchain solutions in the public sector, including environmental certification.'
                  }
                </p>

                {!expandedSections.includes('blockchain-sandbox') && (
                  <button
                    onClick={() => toggleSection('blockchain-sandbox')}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-4 flex items-center space-x-1"
                  >
                    <span>{language === 'it' ? 'Leggi Di Più' : 'Read More'}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}

                {expandedSections.includes('blockchain-sandbox') && (
                  <div className="space-y-4 mb-4">
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                      <h5 className="font-medium text-indigo-900 mb-2">
                        {language === 'it' ? 'Partecipazione FAGRI.Digital' : 'FAGRI.Digital Participation'}
                      </h5>
                      <p className="text-indigo-800 text-sm">
                        {language === 'it' 
                          ? 'FAGRI.Digital partecipa attivamente al Blockchain Sandbox europeo, collaborando con organismi di regolamentazione per definire standard futuri per la certificazione CO₂ basata su blockchain.'
                          : 'FAGRI.Digital actively participates in the European Blockchain Sandbox, collaborating with regulatory bodies to define future standards for blockchain-based CO₂ certification.'
                        }
                      </p>
                    </div>

                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                      <h5 className="font-medium text-teal-900 mb-2">
                        {language === 'it' ? 'Conformità Normativa Avanzata' : 'Advanced Regulatory Compliance'}
                      </h5>
                      <p className="text-teal-800 text-sm">
                        {language === 'it' 
                          ? 'La partecipazione al Sandbox consente a FAGRI.Digital di allinearsi direttamente con le future normative UE, garantendo piena conformità e vantaggio first-mover nel mercato europeo.'
                          : 'Sandbox participation enables FAGRI.Digital to align directly with future EU regulations, ensuring full compliance and first-mover advantage in the European market.'
                        }
                      </p>
                    </div>

                    <button
                      onClick={() => toggleSection('blockchain-sandbox')}
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center space-x-1"
                    >
                      <span>{language === 'it' ? 'Mostra Meno' : 'Show Less'}</span>
                      <ChevronRight className="h-4 w-4 rotate-90" />
                    </button>
                  </div>
                )}

                <a href="https://digital-strategy.ec.europa.eu/en/policies/blockchain-sandbox" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center">
                  {language === 'it' ? 'Blockchain Sandbox UE' : 'EU Blockchain Sandbox'} <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Italy's Progressive Stance */}
            <div>
              <h3 className="text-2xl font-light text-slate-900 mb-6">
                {language === 'it' ? 'Posizione Progressiva dell\'Italia sulla Legislazione CO₂ e DLT' : 'Italy\'s Progressive Stance on CO₂ Legislation and DLT'}
              </h3>
              
              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <h4 className="font-medium text-slate-900 mb-4">
                  {language === 'it' ? 'Riconoscimento Legale di DLT e Smart Contract' : 'Legal Recognition of DLT and Smart Contracts'}
                </h4>
                <p className="text-slate-600 mb-4">
                  {language === 'it' 
                    ? 'La Legge italiana n. 12/2019 ("Decreto Semplificazioni") fornisce definizioni legali esplicite per le Tecnologie di Registro Distribuito e gli Smart Contract, creando certezza legale per le applicazioni basate su DLT.'
                    : 'Italian Law no. 12/2019 ("Decreto Semplificazioni") provides explicit legal definitions for Distributed Ledger Technologies and Smart Contracts, creating legal certainty for DLT-based applications.'
                  }
                </p>
                
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <p className="text-emerald-800 text-sm font-medium">
                    {language === 'it' ? 'Quadro Legale Chiave:' : 'Key Legal Framework:'}
                  </p>
                  <ul className="text-emerald-700 text-sm mt-2 space-y-1">
                    <li>• {language === 'it' ? 'DLT definita come "registro condiviso, distribuito, replicabile accessibile"' : 'DLT defined as "shared, distributed, replicable ledger accessible"'}</li>
                    <li>• {language === 'it' ? 'Smart contract legalmente vincolanti quando le parti sono identificate elettronicamente' : 'Smart contracts legally binding when parties are electronically identified'}</li>
                    <li>• {language === 'it' ? 'L\'archiviazione DLT produce effetti legali di validazione temporale elettronica' : 'DLT storage produces legal effects of electronic time validation'}</li>
                  </ul>
                </div>

                <p className="text-slate-600 mb-4">
                  {language === 'it' 
                    ? 'Il Ministero dello Sviluppo Economico italiano ha esplorato attivamente la blockchain per la tracciabilità nell\'iniziativa "Made in Italy", con applicabilità diretta al tracciamento delle emissioni di CO₂.'
                    : 'The Italian Ministry of Economic Development has actively explored blockchain for traceability in the "Made in Italy" initiative, with direct applicability to CO₂ emissions tracking.'
                  }
                </p>

                <a href="https://www.gazzettaufficiale.it/eli/id/2019/02/12/19G00017/sg" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center">
                  {language === 'it' ? 'Legge Italiana 12/2019' : 'Italian Law 12/2019'} <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Read More - Global Regulatory Framework */}
            <div className="mt-12">
              {!expandedSections.includes('global-regulatory') && (
                <div className="text-center">
                  <button
                    onClick={() => toggleSection('global-regulatory')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium flex items-center space-x-2 mx-auto"
                  >
                    <span>{language === 'it' ? 'Leggi Analisi Completa del Quadro Normativo' : 'Read Complete Regulatory Framework Analysis'}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {expandedSections.includes('global-regulatory') && (
                <div className="bg-white rounded-xl p-8 border border-slate-200">
                  <h3 className="text-2xl font-light text-slate-900 mb-6">
                    {language === 'it' ? 'Il Panorama Normativo Globale per la CO₂ e l\'Innovazione Digitale' : 'The Global Regulatory Landscape for CO₂ and Digital Innovation'}
                  </h3>

                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 mb-6">
                      {language === 'it' 
                        ? 'L\'imperativo per soluzioni avanzate di gestione della CO₂ è sostenuto da un ambiente legale e politico in rapida evoluzione che integra sempre più le tecnologie digitali. Questa sezione descrive i quadri internazionali, europei e italiani che modellano l\'azione climatica e il ruolo dell\'innovazione.'
                        : 'The imperative for advanced CO₂ management solutions is underpinned by a rapidly evolving legal and policy environment that increasingly integrates digital technologies. This section details the international, European, and Italian frameworks shaping climate action and the role of innovation.'
                      }
                    </p>

                    <h4 className="text-xl font-medium text-slate-900 mb-4">
                      {language === 'it' ? 'Quadri Internazionali per l\'Azione Climatica' : 'International Frameworks for Climate Action'}
                    </h4>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                      <h5 className="font-medium text-blue-900 mb-3">
                        {language === 'it' ? 'Convenzione Quadro delle Nazioni Unite sui Cambiamenti Climatici (UNFCCC)' : 'United Nations Framework Convention on Climate Change (UNFCCC)'}
                      </h5>
                      <p className="text-blue-800 text-sm mb-3">
                        {language === 'it' 
                          ? 'La Convenzione Quadro delle Nazioni Unite sui Cambiamenti Climatici (UNFCCC), adottata nel 1992 al Summit della Terra, rappresenta il trattato internazionale fondamentale per affrontare il cambiamento climatico. Il suo obiettivo principale è stabilizzare le concentrazioni di gas serra nell\'atmosfera a un livello che impedisca pericolose interferenze umane con il sistema climatico, entro un lasso di tempo che consenta agli ecosistemi di adattarsi naturalmente e permetta lo sviluppo sostenibile.'
                          : 'The United Nations Framework Convention on Climate Change (UNFCCC), adopted in 1992 at the Earth Summit, stands as the foundational international treaty for addressing climate change. Its core objective is to stabilize greenhouse gas concentrations in the atmosphere at a level that will prevent dangerous human interference with the climate system, within a timeframe that allows ecosystems to adapt naturally and enables sustainable development.'
                        }
                      </p>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
                      <h5 className="font-medium text-emerald-900 mb-3">
                        {language === 'it' ? 'Protocollo di Kyoto (1997)' : 'Kyoto Protocol (1997)'}
                      </h5>
                      <p className="text-emerald-800 text-sm mb-3">
                        {language === 'it' 
                          ? 'Basandosi sull\'UNFCCC, il Protocollo di Kyoto, adottato nel 1997 alla COP3, ha rappresentato un passo significativo in avanti vincolando legalmente un set limitato di paesi sviluppati a obiettivi specifici di riduzione delle emissioni di gas serra. Questi impegni coprivano due periodi: 2008-2012 e 2013-2020. È importante notare che gli Stati Uniti hanno scelto di non ratificare il Protocollo, principalmente a causa della sua natura legalmente vincolante, il che ha contribuito alle sfide nelle successive negoziazioni climatiche internazionali.'
                          : 'Building on the UNFCCC, the Kyoto Protocol, adopted in 1997 at COP3, represented a significant step forward by legally binding a limited set of developed countries to specific greenhouse gas emission reduction targets. These commitments spanned two periods: 2008-2012 and 2013-2020. Notably, the United States chose not to ratify the Protocol, primarily due to its legally-binding nature, which contributed to challenges in subsequent international climate negotiations.'
                        }
                      </p>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                      <h5 className="font-medium text-purple-900 mb-3">
                        {language === 'it' ? 'Accordo di Parigi (2015)' : 'Paris Agreement (2015)'}
                      </h5>
                      <p className="text-purple-800 text-sm mb-3">
                        {language === 'it' 
                          ? 'L\'Accordo di Parigi, adottato il 12 dicembre 2015 alla COP21, ha segnato un momento cruciale nella governance climatica globale. Questo trattato internazionale legalmente vincolante ha sostituito il Protocollo di Kyoto nel stabilire obiettivi climatici globali completi. Il suo obiettivo centrale è rafforzare la risposta globale alla minaccia del cambiamento climatico mantenendo l\'aumento della temperatura globale in questo secolo "ben al di sotto dei 2 gradi Celsius rispetto ai livelli pre-industriali e perseguire sforzi per limitare l\'aumento di temperatura a 1,5°C".'
                          : 'The Paris Agreement, adopted on December 12, 2015, at COP21, marked a pivotal moment in global climate governance. This legally binding international treaty superseded the Kyoto Protocol in setting comprehensive global climate goals. Its central aim is to strengthen the global response to the threat of climate change by keeping a global temperature rise this century "well below 2 degrees Celsius above pre-industrial levels and to pursue efforts to limit the temperature increase to 1.5°C".'
                        }
                      </p>
                    </div>

                    <h4 className="text-xl font-medium text-slate-900 mb-4">
                      {language === 'it' ? 'Agenda Climatica e Digitale Ambiziosa dell\'Unione Europea' : 'European Union\'s Ambitious Climate and Digital Agenda'}
                    </h4>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                      <h5 className="font-medium text-yellow-900 mb-3">
                        {language === 'it' ? 'European Green Deal e Pacchetto "Fit for 55"' : 'European Green Deal and "Fit for 55" Package'}
                      </h5>
                      <p className="text-yellow-800 text-sm mb-3">
                        {language === 'it' 
                          ? 'L\'Unione Europea si è posizionata come leader globale nell\'azione climatica, adottando politiche complete ed esplorando attivamente innovazioni digitali per raggiungere i suoi ambiziosi obiettivi ambientali. Al centro della strategia climatica dell\'UE c\'è il Green Deal europeo, un\'iniziativa globale che mira alla neutralità climatica entro il 2050. Per raggiungere questo obiettivo, l\'UE ha introdotto il Pacchetto "Fit for 55", un insieme di proposte legislative progettate per rivedere la legislazione UE esistente al fine di ridurre le emissioni nette di gas serra di almeno il 55% entro il 2030 rispetto ai livelli del 1990.'
                          : 'The European Union has positioned itself as a global leader in climate action, enacting comprehensive policies and actively exploring digital innovations to achieve its ambitious environmental goals. At the core of the EU\'s climate strategy is the European Green Deal, an overarching initiative aiming for climate neutrality by 2050. To achieve this, the EU introduced the "Fit for 55" Package, a set of legislative proposals designed to revise existing EU legislation to cut net greenhouse gas emissions by at least 55% by 2030 compared to 1990 levels.'
                        }
                      </p>
                    </div>

                    <div className="bg-slate-100 border border-slate-300 rounded-lg p-6 my-6">
                      <h5 className="font-medium text-slate-900 mb-3">
                        {language === 'it' ? 'European Blockchain Sandbox per l\'Azione Climatica' : 'European Blockchain Sandbox for Climate Action'}
                      </h5>
                      <p className="text-slate-700 text-sm">
                        {language === 'it' 
                          ? 'La Commissione Europea supporta attivamente l\'uso delle tecnologie blockchain per aiutare a combattere il cambiamento climatico, riconoscendo il loro potenziale significativo per migliorare la trasparenza, la responsabilità e la tracciabilità delle emissioni di gas serra. Un\'iniziativa chiave in questo senso è la European Blockchain Sandbox, lanciata nel 2023, che fornisce un quadro paneuropeo per il dialogo normativo tra regolatori e innovatori sui casi d\'uso delle Tecnologie di Registro Distribuito (DLT). Significativamente, il reporting CO₂ all\'interno dell\'EU ETS e i processi di Misurazione, Reporting e Verifica (MRV) sono esplicitamente inclusi come aree prioritarie.'
                          : 'The European Commission actively supports the use of blockchain technologies to help combat climate change, acknowledging their significant potential to improve the transparency, accountability, and traceability of greenhouse gas emissions. A key initiative in this regard is the European Blockchain Sandbox, launched in 2023, which provides a pan-European framework for regulatory dialogue between regulators and innovators on Distributed Ledger Technologies (DLT) use cases. Significantly, CO₂ reporting within the EU ETS and Measurement, Reporting, and Verification (MRV) processes are explicitly included as priority areas.'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <button
                      onClick={() => toggleSection('global-regulatory')}
                      className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-2 mx-auto"
                    >
                      <span>{language === 'it' ? 'Mostra Meno' : 'Show Less'}</span>
                      <ChevronRight className="h-4 w-4 rotate-90" />
                    </button>
                  </div>
                </div>
              )}
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
              <h2 className="text-3xl font-light text-slate-900">
                {language === 'it' ? 'Problemi di Mercato Attuali' : 'Current Market Problems'}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="font-medium text-red-900 mb-3">
                  {language === 'it' ? 'Doppio Conteggio' : 'Double Counting'}
                </h3>
                <p className="text-red-700 text-sm">
                  {language === 'it' 
                    ? 'Un singolo credito di carbonio conteggiato più volte attraverso doppia vendita, doppia emissione o doppia rivendicazione, minando gravemente l\'integrità del mercato.'
                    : 'A single carbon credit counted multiple times through double selling, double issuance, or double claiming, severely undermining market integrity.'
                  }
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3 className="font-medium text-orange-900 mb-3">
                  {language === 'it' ? 'Greenwashing' : 'Greenwashing'}
                </h3>
                <p className="text-orange-700 text-sm">
                  {language === 'it' 
                    ? 'Pratiche ingannevoli dove le aziende rivendicano benefici ambientali senza genuine riduzioni delle emissioni, spesso attraverso progetti di compensazione di bassa qualità.'
                    : 'Deceptive practices where companies claim environmental benefits without genuine emission reductions, often through low-quality offset projects.'
                  }
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="font-medium text-yellow-900 mb-3">
                  {language === 'it' ? 'Problemi di Integrità dei Dati' : 'Data Integrity Issues'}
                </h3>
                <p className="text-yellow-700 text-sm">
                  {language === 'it' 
                    ? 'Dati imperfetti, mancanza di standardizzazione, supervisione limitata e anonimato nella rendicontazione creano problemi sistemici di fiducia nei mercati del carbonio.'
                    : 'Flawed data, lack of standardization, limited oversight, and anonymity in reporting create systemic trust issues in carbon markets.'
                  }
                </p>
              </div>
            </div>

            <div className="bg-slate-100 rounded-xl p-8">
              <h3 className="text-xl font-medium text-slate-900 mb-4">
                {language === 'it' ? 'Impatto sull\'Azione Climatica' : 'Impact on Climate Action'}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {language === 'it' 
                  ? 'Questi problemi interconnessi creano uno scenario di "tragedia dei beni comuni" dove gli attori individuali potrebbero non dare priorità all\'integrità dei dati senza incentivi sistemici, portando al fallimento collettivo del mercato. Il risultato è un\'allocazione errata delle risorse, azioni significative ritardate ed erosione della fiducia nei mercati del carbonio come soluzioni climatiche efficaci.'
                  : 'These interconnected problems create a "tragedy of the commons" scenario where individual actors may not prioritize data integrity without systemic incentives, leading to collective market failure. The result is misallocated resources, delayed meaningful action, and erosion of trust in carbon markets as effective climate solutions.'
                }
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
              <h2 className="text-3xl font-light text-slate-900">
                {language === 'it' ? 'La Soluzione FAGRI.Digital' : 'FAGRI.Digital Solution'}
              </h2>
            </div>

            <div className="bg-white rounded-xl p-8 border border-slate-200 mb-8">
              <h3 className="text-2xl font-light text-slate-900 mb-6">
                {language === 'it' ? 'Quadro Legale e Normativo per la Certificazione CO₂' : 'Legal and Regulatory Framework for CO₂ Certification'}
              </h3>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 mb-8">
                <h4 className="text-xl font-medium text-emerald-900 mb-4">
                  {language === 'it' ? 'Compliance Normativa e Standard Internazionali' : 'Regulatory Compliance and International Standards'}
                </h4>
                <p className="text-emerald-800 leading-relaxed mb-4">
                  {language === 'it' 
                    ? 'La piattaforma FAGRI.Digital opera all\'interno di un complesso quadro normativo che abbraccia le legislazioni internazionali, europee e italiane. La nostra conformità agli standard ISO 14064-1, 14064-2, e 14064-3, insieme al nuovo Regolamento UE 3012/2024, garantisce la validità legale e l\'accettazione globale dei certificati CO₂ emessi.'
                    : 'The FAGRI.Digital platform operates within a complex regulatory framework encompassing international, European, and Italian legislations. Our compliance with ISO 14064-1, 14064-2, and 14064-3 standards, together with the new EU Regulation 3012/2024, ensures legal validity and global acceptance of issued CO₂ certificates.'
                  }
                </p>
                <p className="text-emerald-800 leading-relaxed">
                  {language === 'it' 
                    ? 'Il nostro approccio pioneristico integra obbligatoriamente la tecnologia Distributed Ledger (DLT) per rispondere alle crescenti esigenze di trasparenza, tracciabilità e prevenzione del doppio conteggio nei mercati del carbonio globali.'
                    : 'Our pioneering approach mandatorily integrates Distributed Ledger Technology (DLT) to respond to growing demands for transparency, traceability, and prevention of double counting in global carbon markets.'
                  }
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h4 className="font-medium text-slate-900 mb-3">
                    {language === 'it' ? 'Standard e Certificazioni' : 'Standards and Certifications'}
                  </h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{language === 'it' ? 'Standard EUFD2025-001 per emissione crediti di carbonio' : 'EUFD2025-001 Standard for carbon credit issuance'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{language === 'it' ? 'Conformità ISO 14064-1, 14064-2, 14064-3' : 'ISO 14064-1, 14064-2, 14064-3 compliance'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{language === 'it' ? 'Regolamento UE 3012/2024 sull\'uso obbligatorio della blockchain' : 'EU Regulation 3012/2024 on mandatory blockchain use'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{language === 'it' ? 'Certificazione da Organismo Accreditato SUOLO E SALUTE' : 'Certification from Accredited Body SUOLO E SALUTE'}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-3">
                    {language === 'it' ? 'Innovazioni Legali DLT' : 'DLT Legal Innovations'}
                  </h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{language === 'it' ? 'Decreto Semplificazioni italiano (Legge 12/2019) per DLT' : 'Italian Simplifications Decree (Law 12/2019) for DLT'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{language === 'it' ? 'Smart contracts legalmente vincolanti per parti identificate' : 'Legally binding smart contracts for identified parties'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{language === 'it' ? 'Validazione temporale elettronica con effetti legali' : 'Electronic time validation with legal effects'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{language === 'it' ? 'Integrazione con iniziativa "Made in Italy" per tracciabilità' : 'Integration with "Made in Italy" initiative for traceability'}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="font-medium text-blue-900 mb-3">
                  {language === 'it' ? 'Riconoscimento Internazionale dei Tribunali per l\'Azione Climatica' : 'International Court Recognition for Climate Action'}
                </h4>
                <p className="text-blue-800 text-sm mb-3">
                  {language === 'it' 
                    ? 'Sviluppi recenti indicano una crescente tendenza verso la responsabilità legale nell\'azione climatica. La Corte Internazionale di Giustizia (ICJ) sta emettendo un parere consultivo sui doveri legali delle nazioni riguardo ai cambiamenti climatici, sostenuto da oltre 130 paesi.'
                    : 'Recent developments indicate a growing trend towards legal accountability in climate action. The International Court of Justice (ICJ) is issuing an advisory opinion on nations\' legal obligations regarding climate change, backed by over 130 countries.'
                  }
                </p>
                <p className="text-blue-800 text-sm">
                  {language === 'it' 
                    ? 'Questo sottolinea l\'importanza crescente di dati sulle emissioni trasparenti e verificabili, posizionando la soluzione DLT di FAGRI.Digital come strumento per la mitigazione proattiva del rischio legale.'
                    : 'This underscores the escalating importance of transparent and verifiable emissions data, positioning FAGRI.Digital\'s DLT solution as a tool for proactive legal risk mitigation.'
                  }
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h4 className="font-medium text-amber-900 mb-3">
                  {language === 'it' ? 'Vantaggio First-Mover nella Legislazione Blockchain' : 'First-Mover Advantage in Blockchain Legislation'}
                </h4>
                <p className="text-amber-800 text-sm mb-3">
                  {language === 'it' 
                    ? 'L\'Italia si posiziona come leader europeo nel riconoscimento legale delle tecnologie DLT e Smart Contract, creando un ambiente favorevole per l\'innovazione nella certificazione CO₂ basata su blockchain.'
                    : 'Italy positions itself as a European leader in legal recognition of DLT and Smart Contract technologies, creating a favorable environment for innovation in blockchain-based CO₂ certification.'
                  }
                </p>
                <p className="text-amber-800 text-sm">
                  {language === 'it' 
                    ? 'Il nostro allineamento diretto con i requisiti EU ETS, CSRD e l\'integrazione con il European Blockchain Sandbox ci conferisce un vantaggio tecnologico e normativo significativo.'
                    : 'Our direct alignment with EU ETS requirements, CSRD, and integration with the European Blockchain Sandbox gives us a significant technological and regulatory advantage.'
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
              <h2 className="text-3xl font-light text-slate-900">
                {language === 'it' ? 'Strategia di Implementazione' : 'Implementation Strategy'}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-emerald-700 font-bold">1</span>
                </div>
                <h3 className="font-medium text-emerald-900 mb-3">
                  {language === 'it' ? 'Lancio Prima in Italia' : 'Italy-First Launch'}
                </h3>
                <p className="text-emerald-700 text-sm">
                  {language === 'it' 
                    ? 'Sfruttare la legislazione DLT progressiva dell\'Italia e il quadro normativo di supporto per il deployment iniziale e i test.'
                    : 'Leverage Italy\'s progressive DLT legislation and supportive regulatory framework for initial deployment and testing.'
                  }
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-700 font-bold">2</span>
                </div>
                <h3 className="font-medium text-blue-900 mb-3">
                  {language === 'it' ? 'Espansione Europea' : 'European Expansion'}
                </h3>
                <p className="text-blue-700 text-sm">
                  {language === 'it' 
                    ? 'Scalare attraverso gli stati membri dell\'UE sfruttando la legislazione climatica armonizzata e i requisiti di rendicontazione CSRD.'
                    : 'Scale across EU member states leveraging harmonized climate legislation and CSRD reporting requirements.'
                  }
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-purple-700 font-bold">3</span>
                </div>
                <h3 className="font-medium text-purple-900 mb-3">
                  {language === 'it' ? 'Deployment Globale' : 'Global Deployment'}
                </h3>
                <p className="text-purple-700 text-sm">
                  {language === 'it' 
                    ? 'Espandere ai mercati internazionali con precedente legale stabilito e piattaforma tecnologica comprovata.'
                    : 'Expand to international markets with established legal precedent and proven technology platform.'
                  }
                </p>
              </div>
            </div>

            <div className="bg-slate-100 rounded-xl p-8">
              <h3 className="text-xl font-medium text-slate-900 mb-4">
                {language === 'it' ? 'Vantaggi Strategici' : 'Strategic Advantages'}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">
                    {language === 'it' ? 'Allineamento Normativo' : 'Regulatory Alignment'}
                  </h4>
                  <p className="text-slate-600 text-sm">
                    {language === 'it' 
                      ? 'Allineamento diretto con EU ETS, requisiti CSRD e piani nazionali di adattamento climatico crea domanda di mercato immediata.'
                      : 'Direct alignment with EU ETS, CSRD requirements, and national climate adaptation plans creates immediate market demand.'
                    }
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">
                    {language === 'it' ? 'Leadership Tecnologica' : 'Technology Leadership'}
                  </h4>
                  <p className="text-slate-600 text-sm">
                    {language === 'it' 
                      ? 'Vantaggio first-mover nella certificazione CO₂ basata su blockchain con framework di smart contract legalmente riconosciuto.'
                      : 'First-mover advantage in blockchain-based CO₂ certification with legally recognized smart contract framework.'
                    }
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
              <h2 className="text-3xl font-light text-slate-900">
                {language === 'it' ? 'Architettura Tecnica' : 'Technical Architecture'}
              </h2>
            </div>

            <div className="bg-white rounded-xl p-8 border border-slate-200 mb-8">
              <h3 className="text-2xl font-light text-slate-900 mb-6">
                {language === 'it' ? 'Governance Blockchain Multi-Stakeholder' : 'Multi-Stakeholder Blockchain Governance'}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-slate-900 mb-4">
                    {language === 'it' ? 'Rete di Validatori a 51 Nodi' : '51-Node Validator Network'}
                  </h4>
                  <p className="text-slate-600 text-sm mb-4">
                    {language === 'it' 
                      ? 'Ogni organizzazione partner controlla un nodo validatore, garantendo vera decentralizzazione e prevenendo punti singoli di controllo nel processo di certificazione del carbonio.'
                      : 'Each partner organization controls one validator node, ensuring true decentralization and preventing single points of control in the carbon certification process.'
                    }
                  </p>
                  
                  <div className="space-y-2">
                    <div className="bg-emerald-50 rounded p-3">
                      <span className="text-emerald-800 text-sm font-medium">
                        {language === 'it' ? 'Cooperative Agricole' : 'Agricultural Cooperatives'}
                      </span>
                    </div>
                    <div className="bg-blue-50 rounded p-3">
                      <span className="text-blue-800 text-sm font-medium">
                        {language === 'it' ? 'Organizzazioni Ambientali' : 'Environmental Organizations'}
                      </span>
                    </div>
                    <div className="bg-purple-50 rounded p-3">
                      <span className="text-purple-800 text-sm font-medium">
                        {language === 'it' ? 'Istituzioni Finanziarie' : 'Financial Institutions'}
                      </span>
                    </div>
                    <div className="bg-orange-50 rounded p-3">
                      <span className="text-orange-800 text-sm font-medium">
                        {language === 'it' ? 'Partner Tecnologici' : 'Technology Partners'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-4">
                    {language === 'it' ? 'Framework Smart Contract' : 'Smart Contract Framework'}
                  </h4>
                  <ul className="space-y-3 text-slate-600 text-sm">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        <strong>{language === 'it' ? 'Tracce di Audit Immutabili:' : 'Immutable Audit Trails:'}</strong> {language === 'it' ? 'Ogni processo di certificazione registrato permanentemente' : 'Every certification process permanently recorded'}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        <strong>{language === 'it' ? 'Validazione Automatica:' : 'Automated Validation:'}</strong> {language === 'it' ? 'Gli smart contract verificano la conformità delle pratiche agricole' : 'Smart contracts verify agricultural practice compliance'}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        <strong>{language === 'it' ? 'Prova Crittografica:' : 'Cryptographic Proof:'}</strong> {language === 'it' ? 'Verifica matematica delle rivendicazioni di impatto ambientale' : 'Mathematical verification of environmental impact claims'}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        <strong>{language === 'it' ? 'Integrazione DeFi:' : 'DeFi Integration:'}</strong> {language === 'it' ? 'Connessione senza soluzione di continuità ai protocolli di finanza decentralizzata' : 'Seamless connection to decentralized finance protocols'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h4 className="font-medium text-slate-900 mb-3">
                  {language === 'it' ? 'Sicurezza dei Dati e Privacy' : 'Data Security & Privacy'}
                </h4>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• {language === 'it' ? 'Architettura di crittografia zero-knowledge' : 'Zero-knowledge encryption architecture'}</li>
                  <li>• {language === 'it' ? 'Standard di crittografia AES-256 e RSA-4096' : 'AES-256 and RSA-4096 encryption standards'}</li>
                  <li>• {language === 'it' ? 'Infrastruttura data center Alpino Svizzero' : 'Swiss Alpine data center infrastructure'}</li>
                  <li>• {language === 'it' ? 'Sicurezza a livello di conformità bancaria FINMA' : 'FINMA banking compliance level security'}</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h4 className="font-medium text-slate-900 mb-3">
                  {language === 'it' ? 'Conformità e Standard' : 'Compliance & Standards'}
                </h4>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• {language === 'it' ? 'Conformità ISO 14064-1, 14064-2, 14064-3' : 'ISO 14064-1, 14064-2, 14064-3 compliance'}</li>
                  <li>• {language === 'it' ? 'Allineamento al Regolamento UE 3012/2024' : 'EU Regulation 3012/2024 alignment'}</li>
                  <li>• {language === 'it' ? 'Implementazione standard EUFD2025-001' : 'EUFD2025-001 standard implementation'}</li>
                  <li>• {language === 'it' ? 'Conformità alla Legge Federale Svizzera sulla Protezione dei Dati' : 'Swiss Federal Data Protection Act compliance'}</li>
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