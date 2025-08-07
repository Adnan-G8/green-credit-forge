
import { useLanguage } from './language-provider';

export function StandardSection() {
  const { t } = useLanguage();

  return (
    <section id="standard" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
            {t('standard-title') || 'Industry Standards'}
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            {t('standard-description') || 'Meeting and exceeding international standards for quality and sustainability.'}
          </p>
        </div>
      </div>
    </section>
  );
}
