import { useLanguage } from './language-provider';
import { CheckCircle, ArrowRight, Shield, Database, BarChart3 } from 'lucide-react';

export function PlatformSection() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      title: t('platform-step1-title'),
      description: t('platform-step1-text'),
      icon: CheckCircle
    },
    {
      number: "02", 
      title: t('platform-step2-title'),
      description: t('platform-step2-text'),
      icon: Database
    },
    {
      number: "03",
      title: t('platform-step3-title'),
      description: t('platform-step3-text'),
      icon: Shield
    },
    {
      number: "04",
      title: t('platform-step4-title'),
      description: t('platform-step4-text'),
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
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light mb-4">
              {t('platform-intro')}
            </p>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              {t('platform-availability')}
            </p>
          </div>

          {/* Professional Process Steps */}
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6 sm:p-8 border border-slate-200">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex-shrink-0 flex sm:flex-col items-center sm:items-start space-x-4 sm:space-x-0">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 bg-emerald-100 rounded-lg flex items-center justify-center mb-0 sm:mb-4">
                      <step.icon className="text-emerald-700 h-6 sm:h-8 w-6 sm:w-8" />
                    </div>
                    <div className="text-xl sm:text-2xl font-light text-slate-400">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-medium text-slate-900 mb-3 sm:mb-4">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
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
                  {t('platform-compliance-title')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-emerald-600 h-5 w-5 flex-shrink-0" />
                    <span className="text-slate-700">{t('platform-iso-cert')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-emerald-600 h-5 w-5 flex-shrink-0" />
                    <span className="text-slate-700">{t('platform-third-party')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-emerald-600 h-5 w-5 flex-shrink-0" />
                    <span className="text-slate-700">{t('platform-blockchain')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-emerald-600 h-5 w-5 flex-shrink-0" />
                    <span className="text-slate-700">{t('platform-audits')}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-medium text-slate-900 mb-6">
                  {t('platform-impact-title')}
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  {t('platform-impact-description')}
                </p>
                <div className="bg-white rounded-lg p-6 border border-slate-200 mb-6">
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <h4 className="text-2xl font-semibold text-emerald-700 mb-1">EUFD</h4>
                      <p className="text-slate-600 text-sm">{t('platform-impact-eufd')}</p>
                    </div>
                    <div>
                      <h4 className="text-2xl font-semibold text-blue-700 mb-1">ISO</h4>
                      <p className="text-slate-600 text-sm">{t('platform-impact-iso')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-600 text-white rounded-lg p-4">
                  <h4 className="font-medium mb-2">🇪🇺 {t('platform-eu-standards-title')}</h4>
                  <p className="text-blue-100 text-sm">
                    {t('platform-eu-standards-description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}