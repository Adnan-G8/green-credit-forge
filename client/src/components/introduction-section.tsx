import { useLanguage } from './language-provider';
import { Leaf, Users, Globe, TrendingUp } from 'lucide-react';

export function IntroductionSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Clean Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              {t('intro-title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              {t('intro-subtitle')}
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="text-emerald-700 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">110,000+</h3>
              <p className="text-slate-600 text-sm">{t('intro-stat1')}</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-blue-700 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">80,000+</h3>
              <p className="text-slate-600 text-sm">{t('intro-stat2')}</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="text-amber-700 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">30+</h3>
              <p className="text-slate-600 text-sm">{t('intro-stat3')}</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Leaf className="text-purple-700 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">5</h3>
              <p className="text-slate-600 text-sm">{t('intro-stat4')}</p>
            </div>
          </div>

          {/* Content Blocks */}
          <div className="space-y-8">
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
              <h3 className="text-2xl font-medium text-emerald-700 mb-4">
                {t('intro-mission-title')}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t('intro-mission')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <h4 className="text-xl font-medium text-slate-900 mb-4">
                  {t('intro-innovation-title')}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {t('intro-innovation-text')}
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <h4 className="text-xl font-medium text-slate-900 mb-4">
                  {t('intro-sustainability-title')}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {t('intro-sustainability-text')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}