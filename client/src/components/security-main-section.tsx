import { useLanguage } from './language-provider';
import { Shield, Lock, Database, CheckCircle } from 'lucide-react';

export function SecurityMainSection() {
  const { t } = useLanguage();

  return (
    <section id="security-main" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              {t('security-title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              {t('security-intro')}
            </p>
          </div>

          {/* Three Security Pillars */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            
            {/* 3FA Section */}
            <div className="bg-white rounded-xl p-8 border border-slate-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="text-blue-700 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-medium text-slate-900 mb-4">
                {t('security-3fa-title')}
              </h3>
              <p className="text-slate-600 mb-4">
                {t('security-3fa-description')}
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">{t('security-3fa-point1')}</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">{t('security-3fa-point2')}</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">{t('security-3fa-point3')}</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-4 italic">
                {t('security-3fa-guarantee')}
              </p>
            </div>

            {/* Data Sovereignty Section */}
            <div className="bg-white rounded-xl p-8 border border-slate-200">
              <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <Database className="text-emerald-700 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-medium text-slate-900 mb-4">
                {t('security-data-title')}
              </h3>
              <p className="text-slate-600 mb-4">
                {t('security-data-description')}
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">{t('security-data-point1')}</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">{t('security-data-point2')}</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">{t('security-data-point3')}</span>
                </div>
              </div>
            </div>

            {/* Digital Integrity Section */}
            <div className="bg-white rounded-xl p-8 border border-slate-200">
              <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                <Lock className="text-amber-700 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-medium text-slate-900 mb-4">
                {t('security-integrity-title')}
              </h3>
              <p className="text-slate-600">
                {t('security-integrity-description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}