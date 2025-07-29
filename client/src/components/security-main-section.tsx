import { useLanguage } from './language-provider';
import { Shield, Lock, Database, CheckCircle } from 'lucide-react';
import { Link } from 'wouter';

export function SecurityMainSection() {
  const { t } = useLanguage();

  return (
    <section id="security-main" className="py-12 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              {t('security-title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              {t('security-intro')}
            </p>
          </div>

          {/* Compact Security Summary */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            
            {/* 3FA */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="text-blue-700 h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-3">
                {t('security-3fa-title')}
              </h3>
              <p className="text-slate-600 text-sm">
                {t('security-3fa-summary')}
              </p>
            </div>

            {/* Data Sovereignty */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Database className="text-emerald-700 h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-3">
                {t('security-data-title')}
              </h3>
              <p className="text-slate-600 text-sm">
                {t('security-data-summary')}
              </p>
            </div>

            {/* Infrastructure */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="text-amber-700 h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-3">
                {t('security-summary-title')}
              </h3>
              <p className="text-slate-600 text-sm">
                {t('security-infrastructure-summary')}
              </p>
            </div>
          </div>

          {/* Call to Action for Full Security Details */}
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-10 text-center">
            <h3 className="text-3xl font-medium text-slate-900 mb-4">
              {t('security-cta-title')}
            </h3>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              {t('security-cta-description')}
            </p>
            <Link
              href="/security"
              className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-lg shadow-lg hover:shadow-xl"
            >
              <Shield className="mr-3 h-6 w-6" />
              {t('security-cta-button')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}