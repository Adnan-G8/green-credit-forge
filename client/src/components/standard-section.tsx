import { useLanguage } from './language-provider';
import { Microscope, Tag, Scale, CheckCircle } from 'lucide-react';

export function StandardSection() {
  const { t } = useLanguage();

  return (
    <section id="standard" className="py-20 bg-gradient-to-br from-fagri-green to-fagri-light relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080"
          alt="Scientific research laboratory"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="animate-slide-up">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 font-sans tracking-tight text-balance">
                {t('standard-title')}
              </h2>
              <div className="relative">
                <p className="text-2xl md:text-3xl text-gray-100 max-w-4xl mx-auto leading-relaxed animate-fade-in font-light tracking-wide">
                  {t('standard-subtitle')}
                </p>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
              </div>
            </div>
          </div>

          <div className="glass-morphism rounded-2xl p-8 mb-12 animate-fade-in">
            <p className="text-lg text-white leading-relaxed mb-6">
              {t('standard-intro')}
            </p>
            <p className="text-lg text-white leading-relaxed">
              {t('standard-objective')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="glass-morphism rounded-xl p-8 text-center animate-scale-in">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Microscope className="text-fagri-green h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {t('standard-feature1-title')}
              </h3>
              <p className="text-gray-100 leading-relaxed">
                {t('standard-feature1-text')}
              </p>
            </div>
            <div className="glass-morphism rounded-xl p-8 text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Tag className="text-fagri-green h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {t('standard-feature2-title')}
              </h3>
              <p className="text-gray-100 leading-relaxed">
                {t('standard-feature2-text')}
              </p>
            </div>
            <div className="glass-morphism rounded-xl p-8 text-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Scale className="text-fagri-green h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {t('standard-feature3-title')}
              </h3>
              <p className="text-gray-100 leading-relaxed">
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
