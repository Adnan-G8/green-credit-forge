
import { useLanguage } from './language-provider';

export function PlatformSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-slate-100">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
            {t('platform-title') || 'Our Platform'}
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            {t('platform-description') || 'A comprehensive digital ecosystem designed for the future.'}
          </p>
        </div>
      </div>
    </section>
  );
}
