import { useLanguage } from './language-provider';
import { CheckCircle, ArrowRight, Shield, Database, BarChart3 } from 'lucide-react';

export function PlatformSection() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      title: "Registrazione e Valutazione",
      description: "Registrazione dell'azienda agricola e valutazione iniziale delle pratiche di sostenibilità esistenti.",
      icon: CheckCircle
    },
    {
      number: "02", 
      title: "Implementazione del Protocollo",
      description: "Adozione delle metodologie EUP02025-001 per la riduzione verificabile delle emissioni di carbonio.",
      icon: Shield
    },
    {
      number: "03",
      title: "Monitoraggio Digitale",
      description: "Utilizzo di sistemi di monitoraggio IoT e satellitare per tracciare in tempo reale i progressi ambientali.",
      icon: Database
    },
    {
      number: "04",
      title: "Certificazione e Crediti",
      description: "Verifica da parte di terzi e emissione di crediti di carbonio certificati pronti per il mercato.",
      icon: BarChart3
    }
  ];

  return (
    <section id="platform" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Clean Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              {t('platform-title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              {t('platform-intro')}
            </p>
          </div>

          {/* Professional Process Steps */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                      <step.icon className="text-emerald-700 h-8 w-8" />
                    </div>
                    <div className="text-2xl font-light text-slate-400">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-slate-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust and Compliance Section */}
          <div className="bg-slate-50 rounded-xl p-10 border border-slate-200">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-medium text-slate-900 mb-6">
                  Compliance e Trasparenza
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-emerald-600 h-5 w-5 flex-shrink-0" />
                    <span className="text-slate-700">Certificazione ISO 14064-2</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-emerald-600 h-5 w-5 flex-shrink-0" />
                    <span className="text-slate-700">Verifica di terze parti accreditate</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-emerald-600 h-5 w-5 flex-shrink-0" />
                    <span className="text-slate-700">Tracciabilità blockchain</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-emerald-600 h-5 w-5 flex-shrink-0" />
                    <span className="text-slate-700">Audit periodici obbligatori</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-medium text-slate-900 mb-6">
                  Il Nostro Obiettivo
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  {t('platform-objective')}
                </p>
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <h4 className="text-2xl font-semibold text-emerald-700 mb-1">95%</h4>
                      <p className="text-slate-600 text-sm">Accuratezza Verifiche</p>
                    </div>
                    <div>
                      <h4 className="text-2xl font-semibold text-blue-700 mb-1">24/7</h4>
                      <p className="text-slate-600 text-sm">Monitoraggio Attivo</p>
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