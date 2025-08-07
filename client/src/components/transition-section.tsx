
import { useLanguage } from './language-provider';

export function TransitionSection() {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('transition-title') || 'Digital Transformation'}
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            {t('transition-description') || 'Leading the way in sustainable digital solutions'}
          </p>
        </div>
      </div>
    </section>
  );
}
