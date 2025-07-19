import { useLanguage } from './language-provider';
import { Shield, Award, Leaf, Globe2 } from 'lucide-react';
import standardImage from '@assets/image_1752936515114.png';

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
                        Protocollo EUP02025-001
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

            {/* Image Side */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img
                  src={standardImage}
                  alt="Agricultural standards"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Trust Metrics */}
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe2 className="text-emerald-700 h-8 w-8" />
              </div>
              <h4 className="text-2xl font-semibold text-slate-900 mb-2">110,000+</h4>
              <p className="text-slate-600 text-sm">Membri Attivi</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="text-blue-700 h-8 w-8" />
              </div>
              <h4 className="text-2xl font-semibold text-slate-900 mb-2">80,000+</h4>
              <p className="text-slate-600 text-sm">Imprese Certificate</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="text-amber-700 h-8 w-8" />
              </div>
              <h4 className="text-2xl font-semibold text-slate-900 mb-2">30+</h4>
              <p className="text-slate-600 text-sm">Anni di Esperienza</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Leaf className="text-purple-700 h-8 w-8" />
              </div>
              <h4 className="text-2xl font-semibold text-slate-900 mb-2">5</h4>
              <p className="text-slate-600 text-sm">Continenti</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}