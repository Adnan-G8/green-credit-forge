import { useLanguage } from '../components/language-provider';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { Shield, Globe, CheckCircle, Users, FileText, Lock } from 'lucide-react';

export default function CO2Certification() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              {t('co2-cert-title')}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed font-light">
              {t('co2-cert-subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-12">
            
            {/* Collaborative Framework */}
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
              <h2 className="text-3xl font-light text-slate-900 mb-6">
                {t('co2-cert-framework-title')}
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t('co2-cert-framework-description')}
              </p>
              
              {/* Partners Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="text-blue-700 h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 mb-2">{t('co2-cert-partner-eu')}</h3>
                      <p className="text-slate-600 text-sm">{t('co2-cert-partner-eu-desc')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="text-green-700 h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 mb-2">{t('co2-cert-partner-ministry')}</h3>
                      <p className="text-slate-600 text-sm">{t('co2-cert-partner-ministry-desc')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="text-amber-700 h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 mb-2">{t('co2-cert-partner-gse')}</h3>
                      <p className="text-slate-600 text-sm">{t('co2-cert-partner-gse-desc')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="text-purple-700 h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 mb-2">{t('co2-cert-partner-iso')}</h3>
                      <p className="text-slate-600 text-sm">{t('co2-cert-partner-iso-desc')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="text-emerald-700 h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 mb-2">{t('co2-cert-partner-uni')}</h3>
                      <p className="text-slate-600 text-sm">{t('co2-cert-partner-uni-desc')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Lock className="text-cyan-700 h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 mb-2">{t('co2-cert-partner-suolo')}</h3>
                      <p className="text-slate-600 text-sm">{t('co2-cert-partner-suolo-desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Framework */}
            <div className="bg-white rounded-xl p-8 border border-slate-200">
              <h2 className="text-3xl font-light text-slate-900 mb-6">
                {t('co2-cert-legal-title')}
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t('co2-cert-legal-description')}
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-medium text-slate-900 mb-2">{t('co2-cert-compliance-ets')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-compliance-ets-desc')}</p>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-medium text-slate-900 mb-2">{t('co2-cert-compliance-cbam')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-compliance-cbam-desc')}</p>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-medium text-slate-900 mb-2">{t('co2-cert-compliance-aml')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-compliance-aml-desc')}</p>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-medium text-slate-900 mb-2">{t('co2-cert-compliance-paris')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-compliance-paris-desc')}</p>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-medium text-slate-900 mb-2">{t('co2-cert-compliance-kyoto')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-compliance-kyoto-desc')}</p>
                </div>
              </div>
            </div>

            {/* Technology and Security */}
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
              <h2 className="text-3xl font-light text-slate-900 mb-6">
                {t('co2-cert-technology-title')}
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t('co2-cert-technology-description')}
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-emerald-700 h-8 w-8" />
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">{t('co2-cert-tech-blockchain')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-tech-blockchain-desc')}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Lock className="text-emerald-700 h-8 w-8" />
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">{t('co2-cert-tech-3fa')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-tech-3fa-desc')}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-emerald-700 h-8 w-8" />
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">{t('co2-cert-tech-fingerprint')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-tech-fingerprint-desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}