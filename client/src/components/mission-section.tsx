import { useLanguage } from './language-provider';

export function MissionSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-fagri-green to-fagri-light">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-sans animate-slide-up">
            {t('mission-title')}
          </h2>
          <div className="glass-morphism rounded-2xl p-8 mb-8 animate-fade-in">
            <p className="text-lg text-white leading-relaxed mb-6">
              {t('mission-description1')}
            </p>
            <p className="text-lg text-white leading-relaxed">
              {t('mission-description2')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 animate-scale-in">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">110K+</div>
              <div className="text-gray-100">{t('stat1')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">80K+</div>
              <div className="text-gray-100">{t('stat2')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">30+</div>
              <div className="text-gray-100">{t('stat3')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
