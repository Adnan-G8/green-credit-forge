import { useLanguage } from '../components/language-provider';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { Shield, Globe, CheckCircle, Users, FileText, Lock, Check } from 'lucide-react';

export default function SimpleCO2Certification() {
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
            
            {/* Our Collaborative Framework */}
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
              <h2 className="text-3xl font-light text-slate-900 mb-6">
                {t('co2-cert-framework-title')}
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t('co2-cert-framework-description')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{t('co2-cert-partner-eu')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-partner-eu-desc')}</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{t('co2-cert-partner-ministry')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-partner-ministry-desc')}</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{t('co2-cert-partner-gse')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-partner-gse-desc')}</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{t('co2-cert-partner-iso')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-partner-iso-desc')}</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{t('co2-cert-partner-uni')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-partner-uni-desc')}</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <Check className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{t('co2-cert-partner-suolo')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-partner-suolo-desc')}</p>
                </div>
              </div>
            </div>

            {/* Legal and Technological Foundation */}
            <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
              <h2 className="text-3xl font-light text-slate-900 mb-6">
                {t('co2-cert-legal-title')}
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t('co2-cert-legal-description')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{t('co2-cert-compliance-ets')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-compliance-ets-desc')}</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{t('co2-cert-compliance-cbam')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-compliance-cbam-desc')}</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Lock className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{t('co2-cert-compliance-aml')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-compliance-aml-desc')}</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{t('co2-cert-compliance-paris')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-compliance-paris-desc')}</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{t('co2-cert-compliance-kyoto')}</h3>
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <Lock className="h-6 w-6 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{t('co2-cert-tech-blockchain')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-tech-blockchain-desc')}</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{t('co2-cert-tech-3fa')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-tech-3fa-desc')}</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{t('co2-cert-tech-fingerprint')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-tech-fingerprint-desc')}</p>
                </div>
              </div>
            </div>

            {/* Certification Process */}
            <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-200">
              <h2 className="text-3xl font-light text-slate-900 mb-8 text-center">
                {t('co2-cert-process-title')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    1
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">{t('co2-cert-process-step1')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-process-step1-desc')}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    2
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">{t('co2-cert-process-step2')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-process-step2-desc')}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    3
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">{t('co2-cert-process-step3')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-process-step3-desc')}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    4
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">{t('co2-cert-process-step4')}</h3>
                  <p className="text-slate-600 text-sm">{t('co2-cert-process-step4-desc')}</p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="text-center">
              <h2 className="text-3xl font-light text-slate-900 mb-8">
                {t('co2-cert-benefits-title')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="text-left">
                  <div className="flex items-start space-x-3 mb-4">
                    <Check className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-slate-900 mb-1">Complete Transparency</h3>
                      <p className="text-slate-600 text-sm">Full audit trail and blockchain verification for all transactions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 mb-4">
                    <Check className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-slate-900 mb-1">Regulatory Compliance</h3>
                      <p className="text-slate-600 text-sm">EUFD2025-001 and ISO 14064 standards compliance</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-slate-900 mb-1">Market Access</h3>
                      <p className="text-slate-600 text-sm">Direct access to European carbon credit markets</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-left">
                  <div className="flex items-start space-x-3 mb-4">
                    <Check className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-slate-900 mb-1">Swiss Security</h3>
                      <p className="text-slate-600 text-sm">Banking-level data protection in Alpine infrastructure</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 mb-4">
                    <Check className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-slate-900 mb-1">Collaborative Governance</h3>
                      <p className="text-slate-600 text-sm">Multi-stakeholder decision making and validation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-slate-900 mb-1">Sustainable Finance</h3>
                      <p className="text-slate-600 text-sm">Access to green financing and sustainable investment opportunities</p>
                    </div>
                  </div>
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