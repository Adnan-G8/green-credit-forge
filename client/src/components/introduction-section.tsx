import { useLanguage } from './language-provider';

export function IntroductionSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-fagri-green mb-6 font-sans animate-slide-up">
              {t('intro-title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in">
              {t('intro-subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <img
                src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Digital agriculture innovation"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
            <div className="space-y-6 animate-fade-in">
              <div className="glass-dark rounded-xl p-6">
                <h3 className="text-2xl font-bold text-fagri-green mb-4">
                  {t('intro-point1-title')}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('intro-point1-text')}
                </p>
              </div>
              <div className="glass-dark rounded-xl p-6">
                <h3 className="text-2xl font-bold text-fagri-green mb-4">
                  {t('intro-point2-title')}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('intro-point2-text')}
                </p>
              </div>
              <div className="glass-dark rounded-xl p-6">
                <h3 className="text-2xl font-bold text-fagri-green mb-4">
                  {t('intro-point3-title')}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('intro-point3-text')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
