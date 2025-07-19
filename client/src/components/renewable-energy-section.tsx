import { useLanguage } from './language-provider';
import { Zap, Sun, Leaf, TrendingUp, Users, Globe } from 'lucide-react';
import solarImage from '@assets/image_1752942192290.png';

export function RenewableEnergySection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              Energia Rinnovabile & Sostenibilità
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              FAGRI Digital certifica crediti di carbonio sia per l'agricoltura sostenibile che per progetti di energia rinnovabile, creando un ecosistema integrato per la lotta al cambiamento climatico.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <Sun className="text-emerald-700 h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-3">Solare Fotovoltaico</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Certificazione di impianti solari per la generazione di energia pulita e crediti di carbonio verificabili
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="text-blue-700 h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-3">Energia Eolica</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Monitoraggio e certificazione di turbine eoliche per massimizzare l'impatto ambientale positivo
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                    <Leaf className="text-amber-700 h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-3">Biomasse Agricole</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Valorizzazione degli scarti agricoli per produzione energetica sostenibile e certificata
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="text-purple-700 h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-3">Efficienza Energetica</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Ottimizzazione dei consumi energetici in agricoltura per ridurre l'impronta di carbonio
                  </p>
                </div>
              </div>

              {/* Statistics */}
              <div className="mt-12 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-8">
                <h3 className="text-2xl font-medium text-slate-900 mb-6 text-center">
                  Impatto del Nostro Network Energetico
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-emerald-700 mb-2">2.5 GW</div>
                    <p className="text-slate-600 text-sm">Capacità Rinnovabile Installata</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-blue-700 mb-2">850K</div>
                    <p className="text-slate-600 text-sm">Tonnellate CO₂ Ridotte/Anno</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-purple-700 mb-2">450+</div>
                    <p className="text-slate-600 text-sm">Progetti Certificati</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={solarImage}
                  alt="Solar panels and renewable energy infrastructure"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6">
                    <h4 className="text-2xl font-semibold text-slate-900 mb-3">
                      Tecnologia Avanzata per l'Energia Pulita
                    </h4>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      I nostri impianti utilizzano tecnologie di ultima generazione per massimizzare l'efficienza energetica e la produzione di crediti di carbonio certificati secondo il protocollo EUFD2025-001.
                    </p>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-emerald-700" />
                        <span className="text-slate-600">1200+ Installazioni</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-blue-700" />
                        <span className="text-slate-600">15 Paesi Attivi</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}