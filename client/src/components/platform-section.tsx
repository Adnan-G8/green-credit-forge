import { useLanguage } from './language-provider';
import { CheckCircle, ArrowRight, Shield, Database, BarChart3 } from 'lucide-react';
import { Link } from 'wouter';

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
    <section id="platform" className="py-8 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Clean Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              {t('platform-title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              {t('platform-intro')}
            </p>
          </div>

          {/* Professional Process Steps */}
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8">
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

          {/* Impact and Value Proposition */}
          <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-light text-slate-900 mb-4">
                {t('platform-impact-title')}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                {t('platform-impact-description')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="text-emerald-700 h-8 w-8" />
                </div>
                <h4 className="text-lg font-medium text-slate-900 mb-2">{t('platform-carbon-credits')}</h4>
                <p className="text-slate-600 text-sm">{t('platform-carbon-credits-desc')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="text-blue-700 h-8 w-8" />
                </div>
                <h4 className="text-lg font-medium text-slate-900 mb-2">{t('platform-revenue-stream')}</h4>
                <p className="text-slate-600 text-sm">{t('platform-revenue-stream-desc')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-purple-700 h-8 w-8" />
                </div>
                <h4 className="text-lg font-medium text-slate-900 mb-2">{t('platform-market-access')}</h4>
                <p className="text-slate-600 text-sm">{t('platform-market-access-desc')}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h4 className="text-xl font-medium text-slate-900 mb-3">
                    {t('platform-standards-title')}
                  </h4>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-emerald-700">EUFD</div>
                      <div className="text-xs text-slate-600">{t('platform-impact-eufd')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-blue-700">ISO</div>
                      <div className="text-xs text-slate-600">{t('platform-impact-iso')}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-600 text-white rounded-lg p-4">
                  <h5 className="font-medium mb-2 flex items-center">
                    🇪🇺 {t('platform-eu-standards-title')}
                  </h5>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    {t('platform-eu-standards-description')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Learn More Button */}
            <div className="text-center mt-8">
              <Link href="/certification-dashboard">
                <button className="inline-flex items-center px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                  {t('platform-learn-more')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}