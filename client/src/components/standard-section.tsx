import { useLanguage } from './language-provider';
import { Microscope, Tag, Scale, CheckCircle } from 'lucide-react';
import standardImage from '@assets/image_1752936515114.png';

export function StandardSection() {
  const { t } = useLanguage();

  return (
    <section id="standard" className="py-20 bg-white">
      <div className="absolute inset-0 opacity-10">
        <img
          src={standardImage}
          alt="Agricultural wheat field"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="animate-slide-up">
              <h2 className="text-4xl md:text-6xl font-bold text-fagri-text mb-6 font-sans">
                {t('standard-title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t('standard-subtitle')}
              </p>
            </div>
          </div>

          <div className="clean-card rounded-2xl p-8 mb-12 animate-fade-in max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('standard-intro')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('standard-objective')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="clean-card rounded-xl p-8 text-center animate-scale-in">
              <div className="w-16 h-16 bg-fagri-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Microscope className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-fagri-text mb-4">
                {t('standard-feature1-title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('standard-feature1-text')}
              </p>
            </div>
            <div className="clean-card rounded-xl p-8 text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-fagri-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Tag className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-fagri-text mb-4">
                {t('standard-feature2-title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('standard-feature2-text')}
              </p>
            </div>
            <div className="clean-card rounded-xl p-8 text-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-fagri-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Scale className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-fagri-text mb-4">
                {t('standard-feature3-title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
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
