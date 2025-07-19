import { useLanguage } from './language-provider';
import { Shield, Award, Leaf, Globe2 } from 'lucide-react';
import grainImage from '@assets/image_1752936515114.png';

export function StandardSection() {
  const { t } = useLanguage();

  return (
    <section id="standard" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Clean Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              {t('standard-title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              {t('standard-subtitle')}
            </p>
          </div>

          {/* Professional Two-Column Layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Content Side */}
            <div className="space-y-8">
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                <h3 className="text-2xl font-medium text-slate-900 mb-6">
                  Standard di Certificazione
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="text-emerald-700 h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">
                        Certificazione ISO 14064
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Standard internazionale per la quantificazione e reporting delle emissioni di gas serra
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="text-blue-700 h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">
                        Standard EUFD2025-001
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Metodologia proprietaria per la certificazione di crediti di carbonio agricoli
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Leaf className="text-amber-700 h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">
                        Sostenibilità Verificata
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Audit indipendenti e verifiche di terze parti per garantire l'integrità
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Agricultural Image with Overlay */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img
                  src={grainImage}
                  alt="Wheat fields - sustainable agriculture and grain production"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-slate-900 mb-3">
                      Eccellenza nella Certificazione Agricola
                    </h4>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Il protocollo EUFD2025-001 garantisce la certificazione di pratiche agricole sostenibili che riducono le emissioni di carbonio mantenendo alta produttività e qualità dei raccolti.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-emerald-700" />
                        <span className="text-slate-700">Certificato UE</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe2 className="h-4 w-4 text-blue-700" />
                        <span className="text-slate-700">Standard Globale</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Banking-Style Process Steps */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200">
            <h3 className="text-2xl font-medium text-slate-900 mb-8 text-center">Processo di Certificazione EUFD2025-001</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-700 text-white rounded-lg font-semibold text-lg mb-4">
                  1
                </div>
                <h4 className="text-lg font-medium text-slate-900 mb-3">Valutazione Iniziale</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Analisi dell'azienda agricola e dei dati preliminari per determinare il potenziale di certificazione dei crediti di carbonio
                </p>
                {/* Connection Line */}
                <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-slate-300 -z-10"></div>
              </div>
              
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-700 text-white rounded-lg font-semibold text-lg mb-4">
                  2
                </div>
                <h4 className="text-lg font-medium text-slate-900 mb-3">Implementazione</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Applicazione delle metodologie EUFD2025-001 con monitoraggio continuo e documentazione dettagliata delle pratiche sostenibili
                </p>
                {/* Connection Line */}
                <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-slate-300 -z-10"></div>
              </div>
              
              <div>
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-700 text-white rounded-lg font-semibold text-lg mb-4">
                  3
                </div>
                <h4 className="text-lg font-medium text-slate-900 mb-3">Certificazione</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Verifica indipendente da parte di enti accreditati e rilascio ufficiale dei crediti di carbonio certificati
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}