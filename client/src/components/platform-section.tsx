import { useLanguage } from './language-provider';

export function PlatformSection() {
  const { t } = useLanguage();

  return (
    <section id="platform" className="py-20 bg-gradient-to-br from-gray-900 to-fagri-green relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080"
          alt="Digital platform technology"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-sans animate-slide-up">
              {t('platform-title')}
            </h2>
            <p className="text-xl text-gray-100 max-w-4xl mx-auto leading-relaxed animate-fade-in">
              {t('platform-intro')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="animate-slide-up">
              <div className="glass-morphism rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Processo Passo dopo Passo
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-fagri-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        {t('platform-step1-title')}
                      </h4>
                      <p className="text-gray-100 text-sm">
                        {t('platform-step1-text')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-fagri-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        {t('platform-step2-title')}
                      </h4>
                      <p className="text-gray-100 text-sm">
                        {t('platform-step2-text')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-fagri-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        {t('platform-step3-title')}
                      </h4>
                      <p className="text-gray-100 text-sm">
                        {t('platform-step3-text')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-fagri-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        {t('platform-step4-title')}
                      </h4>
                      <p className="text-gray-100 text-sm">
                        {t('platform-step4-text')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-fade-in">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Digital certification dashboard"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>

          <div className="glass-morphism rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Il Nostro Obiettivo
            </h3>
            <p className="text-lg text-gray-100 leading-relaxed max-w-4xl mx-auto">
              {t('platform-objective')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
