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

            {/* Comprehensive Legal Framework Analysis */}
            <div className="mt-12">
              {!expandedSections.includes('comprehensive-legal') && (
                <div className="text-center">
                  <button
                    onClick={() => toggleSection('comprehensive-legal')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium flex items-center space-x-2 mx-auto"
                  >
                    <span>{language === 'it' ? 'Leggi Analisi Completa del Quadro Legale' : 'Read Complete Legal Framework Analysis'}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {expandedSections.includes('comprehensive-legal') && (
                <div className="bg-white rounded-xl p-8 border border-slate-200">
                  <h3 className="text-2xl font-light text-slate-900 mb-6">
                    {language === 'it' ? 'Analisi Completa del Quadro Legale e Normativo' : 'Comprehensive Legal and Regulatory Framework Analysis'}
                  </h3>

                  {/* Detailed Legal Context */}
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 mb-6">
                      {language === 'it' 
                        ? 'Il quadro normativo globale per la certificazione CO₂ rappresenta un ecosistema complesso e in evoluzione che abbraccia molteplici livelli di governance. Dall\'architrave internazionale dell\'UNFCCC, attraverso le direttive europee innovative, fino al quadro nazionale progressivo italiano, ogni livello contribuisce a creare l\'ambiente normativo che consente l\'innovazione blockchain nella certificazione carbonica.'
                        : 'The global regulatory framework for CO₂ certification represents a complex and evolving ecosystem that spans multiple levels of governance. From the international framework of the UNFCCC, through innovative European directives, to Italy\'s progressive national framework, each level contributes to creating the regulatory environment that enables blockchain innovation in carbon certification.'
                      }
                    </p>

                    <h4 className="text-xl font-medium text-slate-900 mb-4">
                      {language === 'it' ? 'Evoluzione della Governance Climatica Internazionale' : 'Evolution of International Climate Governance'}
                    </h4>
                    
                    <p className="text-slate-600 mb-4">
                      {language === 'it' 
                        ? 'La governance climatica internazionale ha subito una trasformazione fondamentale dalla sua nascita con l\'UNFCCC nel 1992. Il principio di "responsabilità comuni ma differenziate" ha guidato l\'evoluzione verso meccanismi sempre più sofisticati di contabilità e verifica delle emissioni. Il Protocollo di Kyoto ha introdotto i primi meccanismi di mercato per la riduzione delle emissioni, mentre l\'Accordo di Parigi ha stabilito un quadro universale che richiede trasparenza e tracciabilità senza precedenti.'
                        : 'International climate governance has undergone fundamental transformation since its inception with the UNFCCC in 1992. The principle of "common but differentiated responsibilities" has guided evolution toward increasingly sophisticated mechanisms for emissions accounting and verification. The Kyoto Protocol introduced the first market mechanisms for emissions reduction, while the Paris Agreement established a universal framework requiring unprecedented transparency and traceability.'
                      }
                    </p>

                    <h4 className="text-xl font-medium text-slate-900 mb-4">
                      {language === 'it' ? 'Leadership Europea nell\'Innovazione Climatica' : 'European Leadership in Climate Innovation'}
                    </h4>
                    
                    <p className="text-slate-600 mb-4">
                      {language === 'it' 
                        ? 'L\'Unione Europea ha consolidato la sua posizione di leader globale nell\'azione climatica attraverso il Green Deal europeo e il pacchetto "Fit for 55". Queste iniziative non rappresentano semplicemente politiche ambientali, ma una trasformazione sistemica dell\'economia europea verso la neutralità climatica. La Direttiva CSRD richiede rendicontazione obbligatoria ESG per le grandi imprese, creando una domanda di mercato immediata per soluzioni di certificazione carbonica trasparenti e verificabili.'
                        : 'The European Union has consolidated its position as a global leader in climate action through the European Green Deal and the "Fit for 55" package. These initiatives represent not simply environmental policies, but a systemic transformation of the European economy toward climate neutrality. The CSRD Directive requires mandatory ESG reporting for large enterprises, creating immediate market demand for transparent and verifiable carbon certification solutions.'
                      }
                    </p>

                    <h4 className="text-xl font-medium text-slate-900 mb-4">
                      {language === 'it' ? 'Vantaggio Strategico Italiano nella Legislazione DLT' : 'Italian Strategic Advantage in DLT Legislation'}
                    </h4>
                    
                    <p className="text-slate-600 mb-4">
                      {language === 'it' 
                        ? 'L\'Italia occupa una posizione unica nell\'ecosistema normativo europeo grazie al Decreto Semplificazioni (Legge 12/2019), che fornisce riconoscimento legale esplicito per le tecnologie di registro distribuito e gli smart contract. Questa legislazione pionieristica crea un ambiente favorevole per l\'innovazione blockchain nella certificazione CO₂, posizionando l\'Italia come hub europeo per lo sviluppo di soluzioni DLT nel settore climatico.'
                        : 'Italy occupies a unique position in the European regulatory ecosystem thanks to the Simplifications Decree (Law 12/2019), which provides explicit legal recognition for distributed ledger technologies and smart contracts. This pioneering legislation creates a favorable environment for blockchain innovation in CO₂ certification, positioning Italy as a European hub for the development of DLT solutions in the climate sector.'
                      }
                    </p>

                    <h4 className="text-xl font-medium text-slate-900 mb-4">
                      {language === 'it' ? 'Integrazione con l\'European Blockchain Sandbox' : 'Integration with European Blockchain Sandbox'}
                    </h4>
                    
                    <p className="text-slate-600 mb-4">
                      {language === 'it' 
                        ? 'La partecipazione al European Blockchain Sandbox rappresenta un vantaggio strategico significativo per FAGRI.Digital. Questo ambiente normativo controllato consente di testare soluzioni blockchain innovative nel settore pubblico, inclusa la certificazione ambientale, garantendo conformità anticipata con le future normative europee. La collaborazione diretta con gli organismi di regolamentazione assicura che le nostre soluzioni siano allineate con l\'evoluzione normativa.'
                        : 'Participation in the European Blockchain Sandbox represents a significant strategic advantage for FAGRI.Digital. This controlled regulatory environment allows testing of innovative blockchain solutions in the public sector, including environmental certification, ensuring early compliance with future European regulations. Direct collaboration with regulatory bodies ensures our solutions are aligned with regulatory evolution.'
                      }
                    </p>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 my-6">
                      <h5 className="font-medium text-emerald-900 mb-3">
                        {language === 'it' ? 'Impatto Trasformativo per FAGRI.Digital' : 'Transformative Impact for FAGRI.Digital'}
                      </h5>
                      <p className="text-emerald-800 text-sm">
                        {language === 'it' 
                          ? 'Questo quadro normativo convergente crea un ambiente ideale per l\'innovazione blockchain nella certificazione CO₂. La combinazione di mandati normativi europei, legislazione DLT progressiva italiana e partecipazione attiva al Blockchain Sandbox posiziona FAGRI.Digital all\'avanguardia dell\'evoluzione del mercato carbonio globale.'
                          : 'This converging regulatory framework creates an ideal environment for blockchain innovation in CO₂ certification. The combination of European regulatory mandates, progressive Italian DLT legislation, and active participation in the Blockchain Sandbox positions FAGRI.Digital at the forefront of global carbon market evolution.'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <button
                      onClick={() => toggleSection('comprehensive-legal')}
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

            {/* Comprehensive Market Analysis */}
            <div className="mt-12">
              {!expandedSections.includes('comprehensive-market') && (
                <div className="text-center">
                  <button
                    onClick={() => toggleSection('comprehensive-market')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium flex items-center space-x-2 mx-auto"
                  >
                    <span>{language === 'it' ? 'Leggi Analisi Completa del Mercato' : 'Read Complete Market Analysis'}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {expandedSections.includes('comprehensive-market') && (
                <div className="bg-white rounded-xl p-8 border border-slate-200">
                  <h3 className="text-2xl font-light text-slate-900 mb-6">
                    {language === 'it' ? 'Analisi Completa dei Problemi del Mercato del Carbonio' : 'Comprehensive Carbon Market Problems Analysis'}
                  </h3>

                  <div className="prose prose-slate max-w-none">
                    <h4 className="text-xl font-medium text-slate-900 mb-4">
                      {language === 'it' ? 'La Crisi di Integrità nel Mercato del Carbonio Globale' : 'The Integrity Crisis in Global Carbon Markets'}
                    </h4>
                    
                    <p className="text-slate-600 mb-4">
                      {language === 'it' 
                        ? 'Il mercato volontario del carbonio (VCM) affronta una crisi di fiducia sistemica che minaccia la sua efficacia come strumento di mitigazione climatica. Nonostante un valore di mercato di oltre 2 miliardi di dollari nel 2022, studi recenti indicano che fino al 90% dei crediti di carbonio forestali più popolari potrebbero essere "fantasmi" - crediti che non rappresentano riduzioni reali di CO₂.'
                        : 'The voluntary carbon market (VCM) faces a systemic trust crisis that threatens its effectiveness as a climate mitigation tool. Despite a market value of over $2 billion in 2022, recent studies indicate that up to 90% of the most popular forest carbon credits may be "phantom" - credits that do not represent real CO₂ reductions.'
                      }
                    </p>

                    <h4 className="text-xl font-medium text-slate-900 mb-4">
                      {language === 'it' ? 'Meccanismi di Fallimento del Mercato' : 'Market Failure Mechanisms'}
                    </h4>
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                      <h5 className="font-medium text-red-900 mb-3">
                        {language === 'it' ? 'Doppio Conteggio: Una Pandemia di Integrità' : 'Double Counting: An Integrity Pandemic'}
                      </h5>
                      <p className="text-red-800 text-sm mb-3">
                        {language === 'it' 
                          ? 'Il doppio conteggio si manifesta in tre forme critiche: doppia vendita (un credito venduto a più acquirenti), doppia emissione (crediti multipli per la stessa riduzione) e doppia rivendicazione (sia il venditore che l\'acquirente rivendicano la riduzione). Questo fenomeno è amplificato dalla mancanza di registri centralizzati e dalla natura frammentata del mercato globale.'
                          : 'Double counting manifests in three critical forms: double selling (one credit sold to multiple buyers), double issuance (multiple credits for the same reduction), and double claiming (both seller and buyer claim the reduction). This phenomenon is amplified by the lack of centralized registries and the fragmented nature of the global market.'
                        }
                      </p>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                      <h5 className="font-medium text-orange-900 mb-3">
                        {language === 'it' ? 'Greenwashing Sistematico' : 'Systematic Greenwashing'}
                      </h5>
                      <p className="text-orange-800 text-sm mb-3">
                        {language === 'it' 
                          ? 'Il greenwashing nel mercato del carbonio va oltre la semplice pubblicità ingannevole. Include progetti con addizionalità dubbia (riduzione che sarebbe avvenuta comunque), sovrastima sistematica dei benefici, permanenza questionabile (rischi di inversione) e metodologie di misurazione inadeguate. Una ricerca di The Guardian ha rivelato che oltre il 90% dei crediti forestali di Verra, il più grande standard mondiale, erano probabilmente "crediti fantasma".'
                          : 'Greenwashing in carbon markets goes beyond simple misleading advertising. It includes projects with questionable additionality (reductions that would have occurred anyway), systematic overestimation of benefits, questionable permanence (reversal risks), and inadequate measurement methodologies. Research by The Guardian revealed that over 90% of Verra\'s forest credits, the world\'s largest standard, were likely "phantom credits".'
                        }
                      </p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                      <h5 className="font-medium text-yellow-900 mb-3">
                        {language === 'it' ? 'Erosione della Fiducia Istituzionale' : 'Institutional Trust Erosion'}
                      </h5>
                      <p className="text-yellow-800 text-sm mb-3">
                        {language === 'it' 
                          ? 'La mancanza di standardizzazione, supervisione limitata e anonimato nella rendicontazione hanno creato un ambiente dove la speculazione prevale sull\'integrità ambientale. Grandi corporazioni come Shell, BP e Disney hanno abbandonato o ridotto significativamente i loro impegni di offsetting dopo scandali di qualità. Questo ha portato a una "tragedia dei beni comuni" dove attori razionali individuali minano l\'integrità sistemica.'
                          : 'The lack of standardization, limited oversight, and anonymity in reporting have created an environment where speculation prevails over environmental integrity. Major corporations like Shell, BP, and Disney have abandoned or significantly reduced their offsetting commitments after quality scandals. This has led to a "tragedy of the commons" where individual rational actors undermine systemic integrity.'
                        }
                      </p>
                    </div>

                    <h4 className="text-xl font-medium text-slate-900 mb-4">
                      {language === 'it' ? 'Conseguenze Macroeconomiche' : 'Macroeconomic Consequences'}
                    </h4>
                    
                    <p className="text-slate-600 mb-4">
                      {language === 'it' 
                        ? 'Le disfunzioni del mercato del carbonio hanno conseguenze che si estendono ben oltre i confini settoriali. L\'allocazione errata di risorse - stimata in miliardi di dollari annui - devia capitale da soluzioni climatiche genuine verso progetti di dubbia efficacia. Questo crea un effetto di spiazzamento dove investimenti reali nella decarbonizzazione vengono sostituiti da compensazioni di bassa qualità.'
                        : 'Carbon market dysfunctions have consequences that extend far beyond sectoral boundaries. Misallocation of resources - estimated in billions of dollars annually - diverts capital from genuine climate solutions toward projects of dubious effectiveness. This creates a crowding-out effect where real investments in decarbonization are replaced by low-quality offsets.'
                      }
                    </p>

                    <div className="bg-slate-100 border border-slate-300 rounded-lg p-6 my-6">
                      <h5 className="font-medium text-slate-900 mb-3">
                        {language === 'it' ? 'Urgenza dell\'Innovazione Tecnologica' : 'Urgency of Technological Innovation'}
                      </h5>
                      <p className="text-slate-700 text-sm">
                        {language === 'it' 
                          ? 'La finestra per limitare il riscaldamento globale a 1,5°C si sta chiudendo rapidamente. Secondo il Panel Intergovernativo sui Cambiamenti Climatici (IPCC), sono necessarie riduzioni delle emissioni del 45% entro il 2030 rispetto ai livelli del 2010. In questo contesto, ogni anno di inefficienza del mercato del carbonio rappresenta un costo opportunità enorme in termini di azione climatica ritardata.'
                          : 'The window to limit global warming to 1.5°C is rapidly closing. According to the Intergovernmental Panel on Climate Change (IPCC), emissions reductions of 45% by 2030 compared to 2010 levels are necessary. In this context, every year of carbon market inefficiency represents a huge opportunity cost in terms of delayed climate action.'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <button
                      onClick={() => toggleSection('comprehensive-market')}
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

            {/* Comprehensive Implementation Strategy */}
            <div className="mt-12">
              {!expandedSections.includes('comprehensive-implementation') && (
                <div className="text-center">
                  <button
                    onClick={() => toggleSection('comprehensive-implementation')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium flex items-center space-x-2 mx-auto"
                  >
                    <span>{language === 'it' ? 'Leggi Strategia di Implementazione Completa' : 'Read Complete Implementation Strategy'}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {expandedSections.includes('comprehensive-implementation') && (
                <div className="bg-white rounded-xl p-8 border border-slate-200">
                  <h3 className="text-2xl font-light text-slate-900 mb-6">
                    {language === 'it' ? 'Strategia di Implementazione Completa e Roadmap di Deployment' : 'Complete Implementation Strategy and Deployment Roadmap'}
                  </h3>

                  <div className="prose prose-slate max-w-none">
                    <h4 className="text-xl font-medium text-slate-900 mb-4">
                      {language === 'it' ? 'Fase 1: Fondazioni Normative e Tecnologiche (Q1-Q2 2025)' : 'Phase 1: Regulatory and Technological Foundations (Q1-Q2 2025)'}
                    </h4>
                    
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
                      <h5 className="font-medium text-emerald-900 mb-3">
                        {language === 'it' ? 'Consolidamento del Vantaggio Normativo Italiano' : 'Consolidation of Italian Regulatory Advantage'}
                      </h5>
                      <p className="text-emerald-800 text-sm mb-3">
                        {language === 'it' 
                          ? 'L\'Italia rappresenta il punto di partenza strategico ottimale grazie al Decreto Semplificazioni (Legge 12/2019) che fornisce riconoscimento legale esplicito per DLT e smart contract. Questo ambiente normativo favorevole consente l\'implementazione completa dell\'infrastruttura FAGRI.Digital senza l\'incertezza normativa che caratterizza altri mercati europei.'
                          : 'Italy represents the optimal strategic starting point thanks to the Simplifications Decree (Law 12/2019) which provides explicit legal recognition for DLT and smart contracts. This favorable regulatory environment allows complete implementation of FAGRI.Digital infrastructure without the regulatory uncertainty that characterizes other European markets.'
                        }
                      </p>
                      <ul className="list-disc list-inside text-emerald-800 text-sm space-y-1">
                        <li>{language === 'it' ? 'Finalizzazione partnership con AgID (Agenzia per l\'Italia Digitale)' : 'Finalization of partnership with AgID (Agency for Digital Italy)'}</li>
                        <li>{language === 'it' ? 'Integrazione con il Sistema Pubblico di Identità Digitale (SPID)' : 'Integration with Public Digital Identity System (SPID)'}</li>
                        <li>{language === 'it' ? 'Conformità completa con il Codice dell\'Amministrazione Digitale' : 'Full compliance with Digital Administration Code'}</li>
                        <li>{language === 'it' ? 'Certificazione presso l\'Istituto Superiore delle Comunicazioni e delle Tecnologie dell\'Informazione' : 'Certification with Higher Institute for Communications and Information Technologies'}</li>
                      </ul>
                    </div>

                    <h4 className="text-xl font-medium text-slate-900 mb-4">
                      {language === 'it' ? 'Fase 2: Scalabilità Europea e Armonizzazione (Q3-Q4 2025)' : 'Phase 2: European Scalability and Harmonization (Q3-Q4 2025)'}
                    </h4>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                      <h5 className="font-medium text-blue-900 mb-3">
                        {language === 'it' ? 'Espansione Coordinata nell\'Unione Europea' : 'Coordinated Expansion within European Union'}
                      </h5>
                      <p className="text-blue-800 text-sm mb-3">
                        {language === 'it' 
                          ? 'La scalabilità europea sfrutta l\'armonizzazione normativa crescente attraverso il Green Deal e la legislazione CSRD. L\'approccio graduato consente l\'adattamento alle specificità normative nazionali mantenendo l\'interoperabilità sistemica.'
                          : 'European scalability leverages increasing regulatory harmonization through the Green Deal and CSRD legislation. The graduated approach allows adaptation to national regulatory specificities while maintaining systemic interoperability.'
                        }
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-medium text-blue-900 mb-2">
                            {language === 'it' ? 'Mercati Prioritari' : 'Priority Markets'}
                          </h6>
                          <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
                            <li>{language === 'it' ? 'Francia: Leadership nell\'agricoltura digitale' : 'France: Leadership in digital agriculture'}</li>
                            <li>{language === 'it' ? 'Germania: Innovazione tecnologica avanzata' : 'Germany: Advanced technological innovation'}</li>
                            <li>{language === 'it' ? 'Paesi Bassi: Hub finanziario sostenibile' : 'Netherlands: Sustainable financial hub'}</li>
                            <li>{language === 'it' ? 'Spagna: Settore agricolo esteso' : 'Spain: Extensive agricultural sector'}</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-blue-900 mb-2">
                            {language === 'it' ? 'Partnership Strategiche' : 'Strategic Partnerships'}
                          </h6>
                          <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
                            <li>{language === 'it' ? 'European Investment Bank (BEI)' : 'European Investment Bank (EIB)'}</li>
                            <li>{language === 'it' ? 'Agenzia Europea per l\'Ambiente' : 'European Environment Agency'}</li>
                            <li>{language === 'it' ? 'Cooperazione con Horizon Europe' : 'Cooperation with Horizon Europe'}</li>
                            <li>{language === 'it' ? 'European Blockchain Partnership' : 'European Blockchain Partnership'}</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-xl font-medium text-slate-900 mb-4">
                      {language === 'it' ? 'Fase 3: Deployment Globale e Leadership Tecnologica (2026+)' : 'Phase 3: Global Deployment and Technological Leadership (2026+)'}
                    </h4>
                    
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                      <h5 className="font-medium text-purple-900 mb-3">
                        {language === 'it' ? 'Espansione nei Mercati Emergenti ad Alto Potenziale' : 'Expansion into High-Potential Emerging Markets'}
                      </h5>
                      <p className="text-purple-800 text-sm mb-3">
                        {language === 'it' 
                          ? 'Il deployment globale sfrutta il precedente normativo europeo e la tecnologia provata per accelerare l\'adozione in mercati con elevate emissioni agricole e quadri normativi in evoluzione. L\'approccio si concentra su paesi con elevato potenziale di mitigazione climatica e stabilità istituzionale crescente.'
                          : 'Global deployment leverages European regulatory precedent and proven technology to accelerate adoption in markets with high agricultural emissions and evolving regulatory frameworks. The approach focuses on countries with high climate mitigation potential and growing institutional stability.'
                        }
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h6 className="font-medium text-purple-900 mb-2">
                            {language === 'it' ? 'Asia-Pacifico' : 'Asia-Pacific'}
                          </h6>
                          <ul className="list-disc list-inside text-purple-800 text-sm space-y-1">
                            <li>{language === 'it' ? 'Australia: Mercato maturo' : 'Australia: Mature market'}</li>
                            <li>{language === 'it' ? 'Nuova Zelanda: Leadership climatica' : 'New Zealand: Climate leadership'}</li>
                            <li>{language === 'it' ? 'Giappone: Innovazione tecnologica' : 'Japan: Technological innovation'}</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-purple-900 mb-2">
                            {language === 'it' ? 'Americhe' : 'Americas'}
                          </h6>
                          <ul className="list-disc list-inside text-purple-800 text-sm space-y-1">
                            <li>{language === 'it' ? 'Canada: Politiche climatiche avanzate' : 'Canada: Advanced climate policies'}</li>
                            <li>{language === 'it' ? 'Cile: Leader regionale sostenibilità' : 'Chile: Regional sustainability leader'}</li>
                            <li>{language === 'it' ? 'Costa Rica: Neutralità carbonica' : 'Costa Rica: Carbon neutrality'}</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-purple-900 mb-2">
                            {language === 'it' ? 'Africa' : 'Africa'}
                          </h6>
                          <ul className="list-disc list-inside text-purple-800 text-sm space-y-1">
                            <li>{language === 'it' ? 'Sudafrica: Hub tecnologico' : 'South Africa: Technology hub'}</li>
                            <li>{language === 'it' ? 'Ruanda: Innovazione digitale' : 'Rwanda: Digital innovation'}</li>
                            <li>{language === 'it' ? 'Kenya: Fintech leadership' : 'Kenya: Fintech leadership'}</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-100 border border-slate-300 rounded-lg p-6 my-6">
                      <h5 className="font-medium text-slate-900 mb-3">
                        {language === 'it' ? 'Metriche di Successo e KPI Strategici' : 'Success Metrics and Strategic KPIs'}
                      </h5>
                      <div className="grid md:grid-cols-2 gap-4 text-slate-700 text-sm">
                        <div>
                          <ul className="space-y-2">
                            <li><strong>{language === 'it' ? '2025:' : '2025:'}</strong> {language === 'it' ? '500+ aziende certificate, 5 paesi europei attivi' : '500+ certified companies, 5 active European countries'}</li>
                            <li><strong>{language === 'it' ? '2026:' : '2026:'}</strong> {language === 'it' ? '2,000+ aziende certificate, 15 paesi globali' : '2,000+ certified companies, 15 global countries'}</li>
                            <li><strong>{language === 'it' ? '2027:' : '2027:'}</strong> {language === 'it' ? '10,000+ aziende certificate, leadership globale' : '10,000+ certified companies, global leadership'}</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-2">
                            <li><strong>{language === 'it' ? 'Impatto CO₂:' : 'CO₂ Impact:'}</strong> {language === 'it' ? '50M tonnellate certificate/anno entro 2027' : '50M tonnes certified/year by 2027'}</li>
                            <li><strong>{language === 'it' ? 'Valore Mercato:' : 'Market Value:'}</strong> {language === 'it' ? '€2B+ in crediti certificati' : '€2B+ in certified credits'}</li>
                            <li><strong>{language === 'it' ? 'Ecosistema:' : 'Ecosystem:'}</strong> {language === 'it' ? '100+ partner tecnologici integrati' : '100+ integrated technology partners'}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <button
                      onClick={() => toggleSection('comprehensive-implementation')}
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

            {/* Comprehensive Technical Architecture */}
            <div className="mt-12">
              {!expandedSections.includes('comprehensive-technical') && (
                <div className="text-center">
                  <button
                    onClick={() => toggleSection('comprehensive-technical')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium flex items-center space-x-2 mx-auto"
                  >
                    <span>{language === 'it' ? 'Leggi Specifica Tecnica Completa' : 'Read Complete Technical Specification'}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {expandedSections.includes('comprehensive-technical') && (
                <div className="bg-white rounded-xl p-8 border border-slate-200">
                  <h3 className="text-2xl font-light text-slate-900 mb-6">
                    {language === 'it' ? 'Specifica Tecnica Completa dell\'Architettura Blockchain' : 'Complete Technical Specification of Blockchain Architecture'}
                  </h3>

                  <div className="prose prose-slate max-w-none">
                    <h4 className="text-xl font-medium text-slate-900 mb-4">
                      {language === 'it' ? 'Architettura di Consensus Delegated Proof of Stake (DPoS)' : 'Delegated Proof of Stake (DPoS) Consensus Architecture'}
                    </h4>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                      <h5 className="font-medium text-blue-900 mb-3">
                        {language === 'it' ? 'Rete di Validatori Distribuita a 51 Nodi' : 'Distributed 51-Node Validator Network'}
                      </h5>
                      <p className="text-blue-800 text-sm mb-3">
                        {language === 'it' 
                          ? 'L\'architettura DPoS di FAGRI.Digital implementa una rete di validatori distribuita ottimizzata per la governance multi-stakeholder. Ogni nodo validatore rappresenta una categoria specifica di attori nell\'ecosistema della certificazione carbonica, garantendo rappresentanza equa e prevenendo la centralizzazione del potere decisionale.'
                          : 'FAGRI.Digital\'s DPoS architecture implements a distributed validator network optimized for multi-stakeholder governance. Each validator node represents a specific category of actors in the carbon certification ecosystem, ensuring equitable representation and preventing centralization of decision-making power.'
                        }
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-medium text-blue-900 mb-2">
                            {language === 'it' ? 'Distribuzione dei Nodi' : 'Node Distribution'}
                          </h6>
                          <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
                            <li>{language === 'it' ? '15 nodi: Cooperative agricole certificate' : '15 nodes: Certified agricultural cooperatives'}</li>
                            <li>{language === 'it' ? '12 nodi: Organizzazioni ambientali accreditate' : '12 nodes: Accredited environmental organizations'}</li>
                            <li>{language === 'it' ? '10 nodi: Istituzioni finanziarie specializzate' : '10 nodes: Specialized financial institutions'}</li>
                            <li>{language === 'it' ? '8 nodi: Partner tecnologici certificati' : '8 nodes: Certified technology partners'}</li>
                            <li>{language === 'it' ? '6 nodi: Enti di ricerca e università' : '6 nodes: Research entities and universities'}</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-blue-900 mb-2">
                            {language === 'it' ? 'Parametri di Consensus' : 'Consensus Parameters'}
                          </h6>
                          <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
                            <li>{language === 'it' ? 'Tempo blocco: 3 secondi' : 'Block time: 3 seconds'}</li>
                            <li>{language === 'it' ? 'Finalità: 21 conferme (63 secondi)' : 'Finality: 21 confirmations (63 seconds)'}</li>
                            <li>{language === 'it' ? 'Soglia Byzantine Fault Tolerance: 2/3+1' : 'Byzantine Fault Tolerance threshold: 2/3+1'}</li>
                            <li>{language === 'it' ? 'Throughput massimo: 10,000 TPS' : 'Maximum throughput: 10,000 TPS'}</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-xl font-medium text-slate-900 mb-4">
                      {language === 'it' ? 'Smart Contract Framework e Virtual Machine' : 'Smart Contract Framework and Virtual Machine'}
                    </h4>
                    
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
                      <h5 className="font-medium text-emerald-900 mb-3">
                        {language === 'it' ? 'Compatibilità EVM e Interoperabilità' : 'EVM Compatibility and Interoperability'}
                      </h5>
                      <p className="text-emerald-800 text-sm mb-3">
                        {language === 'it' 
                          ? 'La blockchain FAGRI implementa una Ethereum Virtual Machine (EVM) completamente compatibile, consentendo l\'esecuzione di smart contract Solidity esistenti senza modifiche. Questa compatibilità garantisce l\'interoperabilità con l\'ecosistema DeFi esistente e facilita l\'integrazione con protocolli di finanza decentralizzata maturi.'
                          : 'The FAGRI blockchain implements a fully compatible Ethereum Virtual Machine (EVM), allowing execution of existing Solidity smart contracts without modifications. This compatibility ensures interoperability with the existing DeFi ecosystem and facilitates integration with mature decentralized finance protocols.'
                        }
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-medium text-emerald-900 mb-2">
                            {language === 'it' ? 'Contratti Core' : 'Core Contracts'}
                          </h6>
                          <ul className="list-disc list-inside text-emerald-800 text-sm space-y-1">
                            <li>{language === 'it' ? 'CarbonCertificateNFT.sol' : 'CarbonCertificateNFT.sol'}</li>
                            <li>{language === 'it' ? 'ValidationOracle.sol' : 'ValidationOracle.sol'}</li>
                            <li>{language === 'it' ? 'StakeholderGovernance.sol' : 'StakeholderGovernance.sol'}</li>
                            <li>{language === 'it' ? 'EmissionCalculator.sol' : 'EmissionCalculator.sol'}</li>
                            <li>{language === 'it' ? 'ComplianceRegistry.sol' : 'ComplianceRegistry.sol'}</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-emerald-900 mb-2">
                            {language === 'it' ? 'Protocolli DeFi Integrati' : 'Integrated DeFi Protocols'}
                          </h6>
                          <ul className="list-disc list-inside text-emerald-800 text-sm space-y-1">
                            <li>{language === 'it' ? 'Uniswap V3 per liquidità' : 'Uniswap V3 for liquidity'}</li>
                            <li>{language === 'it' ? 'Compound per lending' : 'Compound for lending'}</li>
                            <li>{language === 'it' ? 'Chainlink per oracoli' : 'Chainlink for oracles'}</li>
                            <li>{language === 'it' ? 'AAVE per yield farming' : 'AAVE for yield farming'}</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                      <h5 className="font-medium text-purple-900 mb-3">
                        {language === 'it' ? 'Meccanismi di Sicurezza Avanzati' : 'Advanced Security Mechanisms'}
                      </h5>
                      <p className="text-purple-800 text-sm mb-3">
                        {language === 'it' 
                          ? 'L\'implementazione di sicurezza multi-livello combina crittografia post-quantistica, zero-knowledge proofs e threshold cryptography per garantire l\'integrità dei dati di certificazione anche contro attacchi futuri.'
                          : 'Multi-level security implementation combines post-quantum cryptography, zero-knowledge proofs, and threshold cryptography to ensure certification data integrity even against future attacks.'
                        }
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h6 className="font-medium text-purple-900 mb-2">
                            {language === 'it' ? 'Crittografia' : 'Cryptography'}
                          </h6>
                          <ul className="list-disc list-inside text-purple-800 text-sm space-y-1">
                            <li>ECDSA secp256k1</li>
                            <li>BLS12-381 signatures</li>
                            <li>Kyber post-quantum</li>
                            <li>zk-SNARKs Groth16</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-purple-900 mb-2">
                            {language === 'it' ? 'Consensus Security' : 'Consensus Security'}
                          </h6>
                          <ul className="list-disc list-inside text-purple-800 text-sm space-y-1">
                            <li>{language === 'it' ? 'Slashing per misbehavior' : 'Slashing for misbehavior'}</li>
                            <li>{language === 'it' ? 'VRF per randomness' : 'VRF for randomness'}</li>
                            <li>{language === 'it' ? 'Threshold signatures' : 'Threshold signatures'}</li>
                            <li>{language === 'it' ? 'BFT checkpointing' : 'BFT checkpointing'}</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-purple-900 mb-2">
                            {language === 'it' ? 'Audit & Monitoring' : 'Audit & Monitoring'}
                          </h6>
                          <ul className="list-disc list-inside text-purple-800 text-sm space-y-1">
                            <li>{language === 'it' ? 'Formal verification' : 'Formal verification'}</li>
                            <li>{language === 'it' ? 'Runtime monitoring' : 'Runtime monitoring'}</li>
                            <li>{language === 'it' ? 'Anomaly detection' : 'Anomaly detection'}</li>
                            <li>{language === 'it' ? 'Continuous auditing' : 'Continuous auditing'}</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-xl font-medium text-slate-900 mb-4">
                      {language === 'it' ? 'Integrazione con Infrastruttura di Data Center Alpina' : 'Integration with Alpine Data Center Infrastructure'}
                    </h4>
                    
                    <div className="bg-slate-100 border border-slate-300 rounded-lg p-6 my-6">
                      <h5 className="font-medium text-slate-900 mb-3">
                        {language === 'it' ? 'Architettura Hybrid Cloud-Blockchain' : 'Hybrid Cloud-Blockchain Architecture'}
                      </h5>
                      <p className="text-slate-700 text-sm mb-3">
                        {language === 'it' 
                          ? 'L\'integrazione tra l\'infrastruttura blockchain distribuita e i data center alpini ALPHAG8 crea un\'architettura ibrida unica che combina la resilienza della decentralizzazione con la sicurezza fisica di livello militare. I nodi validatori critici sono ospitati in bunker sotterranei con alimentazione autonoma e raffreddamento naturale.'
                          : 'Integration between distributed blockchain infrastructure and ALPHAG8 alpine data centers creates a unique hybrid architecture that combines decentralization resilience with military-grade physical security. Critical validator nodes are hosted in underground bunkers with autonomous power and natural cooling.'
                        }
                      </p>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium text-slate-900 mb-2">
                              {language === 'it' ? 'Specificazioni Hardware' : 'Hardware Specifications'}
                            </h6>
                            <ul className="list-disc list-inside text-slate-700 text-sm space-y-1">
                              <li>{language === 'it' ? 'CPU: 64-core ARM Neoverse N2' : 'CPU: 64-core ARM Neoverse N2'}</li>
                              <li>{language === 'it' ? 'RAM: 512GB DDR5 ECC' : 'RAM: 512GB DDR5 ECC'}</li>
                              <li>{language === 'it' ? 'Storage: 50TB NVMe SSD RAID' : 'Storage: 50TB NVMe SSD RAID'}</li>
                              <li>{language === 'it' ? 'Network: 100Gbps fiber redundant' : 'Network: 100Gbps fiber redundant'}</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="font-medium text-slate-900 mb-2">
                              {language === 'it' ? 'Resilienza e Backup' : 'Resilience and Backup'}
                            </h6>
                            <ul className="list-disc list-inside text-slate-700 text-sm space-y-1">
                              <li>{language === 'it' ? 'UPS: 72h autonomia garantita' : 'UPS: 72h guaranteed autonomy'}</li>
                              <li>{language === 'it' ? 'Backup: Triplica in 3 siti alpini' : 'Backup: Triplicated in 3 alpine sites'}</li>
                              <li>{language === 'it' ? 'Connettività: 5 ISP indipendenti' : 'Connectivity: 5 independent ISPs'}</li>
                              <li>{language === 'it' ? 'Disaster Recovery: <15min RTO' : 'Disaster Recovery: <15min RTO'}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <button
                      onClick={() => toggleSection('comprehensive-technical')}
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