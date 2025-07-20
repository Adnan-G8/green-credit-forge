import { useLanguage } from './language-provider';
import transitionImage from '@assets/image_1753017077677.png';

export function TransitionSection() {
  const { t } = useLanguage();

  return (
    <section className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${transitionImage})`
        }}
      >
        {/* Subtle Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      </div>

      {/* Optional Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/20">
            <h3 className="text-2xl md:text-3xl font-light mb-3">
              {t('transition-title')}
            </h3>
            <p className="text-lg font-light opacity-90">
              {t('transition-subtitle')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}