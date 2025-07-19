import { useLanguage } from './language-provider';
import { Microscope, Tag, Scale, CheckCircle } from 'lucide-react';
import standardImage from '@assets/image_1752936515114.png';

export function StandardSection() {
  const { t } = useLanguage();

  return (
    <section id="standard" className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="animate-slide-up">
              <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 font-sans">
                {t('standard-title')}
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                {t('standard-subtitle')}
              </p>
            </div>
          </div>

          {/* Two Column Layout with Image */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  {t('standard-intro')}
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {t('standard-objective')}
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src={standardImage}
                  alt="Agricultural wheat field"
                  className="w-full h-80 object-cover rounded-3xl shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent rounded-3xl"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-semibold text-lg drop-shadow-lg">
                    Sustainable Agriculture Standards
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-slate-200 animate-scale-in">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Microscope className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                {t('standard-feature1-title')}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {t('standard-feature1-text')}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-slate-200 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Tag className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                {t('standard-feature2-title')}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {t('standard-feature2-text')}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-slate-200 animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Scale className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                {t('standard-feature3-title')}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {t('standard-feature3-text')}
              </p>
            </div>
          </div>

          <div className="glass-morphism rounded-2xl p-8">
            <p className="text-lg text-white leading-relaxed text-center">
              {t('standard-reliability')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
