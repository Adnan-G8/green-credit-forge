
import { useLanguage } from './language-provider';

export function IntroductionSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
            {t('intro-title') || 'About FAGRI Digital'}
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            {t('intro-description') || 'We are pioneering the future of sustainable digital solutions through innovative technology and environmental responsibility.'}
          </p>
        </div>
      </div>
    </section>
  );
}
