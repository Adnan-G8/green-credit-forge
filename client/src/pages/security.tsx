import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { useLanguage } from '@/components/language-provider';
import { Shield, Database, Globe, Lock, CheckCircle, Server } from 'lucide-react';

export default function Security() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-fagri-bg">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-8">
              {t('security-page-title')}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed font-light max-w-3xl mx-auto">
              {t('security-page-subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Infrastructure Overview */}
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <Server className="h-8 w-8 text-emerald-700 mr-4" />
                <h2 className="text-3xl font-light text-slate-900">
                  {t('security-infrastructure-title')}
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-600 leading-relaxed mb-6">
                  {t('security-infrastructure-text')}
                </p>
              </div>
            </div>

            {/* Data Classification */}
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <Database className="h-8 w-8 text-blue-700 mr-4" />
                <h2 className="text-3xl font-light text-slate-900">
                  {t('security-classification-title')}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-8 border border-slate-200">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                    <Lock className="text-emerald-700 h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-900 mb-4">{t('security-premium-title')}</h3>
                  <h4 className="text-lg font-medium text-slate-700 mb-3">{t('security-premium-subtitle')}</h4>
                  <p className="text-slate-600 leading-relaxed">
                    {t('security-premium-text')}
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-8 border border-slate-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <Globe className="text-blue-700 h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-900 mb-4">{t('security-highavail-title')}</h3>
                  <h4 className="text-lg font-medium text-slate-700 mb-3">{t('security-highavail-subtitle')}</h4>
                  <p className="text-slate-600 leading-relaxed">
                    {t('security-highavail-text')}
                  </p>
                </div>
              </div>
            </div>

            {/* Hardware Security */}
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <Shield className="h-8 w-8 text-purple-700 mr-4" />
                <h2 className="text-3xl font-light text-slate-900">
                  {t('security-hardware-title')}
                </h2>
              </div>
              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <p className="text-slate-600 leading-relaxed mb-6">
                  {t('security-hardware-text')}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">{t('security-physical-title')}</h4>
                      <p className="text-slate-600">{t('security-physical-text')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">{t('security-failsafe-title')}</h4>
                      <p className="text-slate-600">{t('security-failsafe-text')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">{t('security-disposal-title')}</h4>
                      <p className="text-slate-600">{t('security-disposal-text')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">{t('security-redundancy-title')}</h4>
                      <p className="text-slate-600">{t('security-redundancy-text')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">{t('security-network-title')}</h4>
                      <p className="text-slate-600">{t('security-network-text')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <CheckCircle className="h-8 w-8 text-emerald-700 mr-4" />
                <h2 className="text-3xl font-light text-slate-900">
                  {t('security-certifications-title')}
                </h2>
              </div>
              <div className="bg-white rounded-xl p-8 border border-slate-200 mb-8">
                <p className="text-slate-600 leading-relaxed mb-6">
                  {t('security-certifications-text')}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'ISO/IEC 27001', desc: 'Information Security Management Systems - ISMS' },
                  { name: 'ISO/IEC 27017', desc: 'Information Security for Cloud Services' },
                  { name: 'ISO/IEC 27018', desc: 'Protection of PII in Public Clouds' },
                  { name: 'SOC 1', desc: 'Service Organization Control 1' },
                  { name: 'SOC 2 Type 2', desc: 'Comprehensive Trust Services Criteria' },
                  { name: 'SOC 3', desc: 'Public SOC 2 Overview Report' },
                  { name: 'PCI DSS Level 1', desc: 'Payment Card Industry Data Security Standard' },
                  { name: 'GDPR', desc: 'General Data Protection Regulation - EU' },
                  { name: 'DSG/DSV', desc: 'Swiss Federal Data Protection Laws' },
                  { name: 'FIPS 140-2', desc: 'Federal Information Processing Standard' },
                  { name: 'HIPAA/HITECH', desc: 'Health Insurance Portability & Accountability' },
                  { name: 'CSA STAR', desc: 'Cloud Security Alliance STAR Program' },
                  { name: 'IT-Grundschutz', desc: 'BSI Germany Security Standards' }
                ].map((cert, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 border border-slate-200">
                    <h4 className="font-medium text-slate-900 mb-2">{cert.name}</h4>
                    <p className="text-sm text-slate-600">{cert.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Swiss Alpine Fortress Infrastructure */}
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <Lock className="h-8 w-8 text-amber-700 mr-4" />
                <h2 className="text-3xl font-light text-slate-900">
                  Swiss Alpine Fortress Infrastructure
                </h2>
              </div>
              
              <div className="bg-white rounded-xl p-10 border border-slate-200 mb-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Lock className="text-amber-700 h-10 w-10" />
                  </div>
                  <h3 className="text-3xl font-medium text-slate-900 mb-4">
                    {t('security-physical-title')}
                  </h3>
                  <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    {t('security-physical-description')}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Shield className="text-red-700 h-8 w-8" />
                    </div>
                    <h4 className="text-lg font-medium text-slate-900 mb-2">Military-Grade Protection</h4>
                    <p className="text-slate-700 leading-relaxed">
                      {t('security-physical-point1')}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Database className="text-blue-700 h-8 w-8" />
                    </div>
                    <h4 className="text-lg font-medium text-slate-900 mb-2">Autonomous Operations</h4>
                    <p className="text-slate-700 leading-relaxed">
                      {t('security-physical-point2')}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="text-emerald-700 h-8 w-8" />
                    </div>
                    <h4 className="text-lg font-medium text-slate-900 mb-2">Maximum Access Control</h4>
                    <p className="text-slate-700 leading-relaxed">
                      {t('security-physical-point3')}
                    </p>
                  </div>
                </div>

                {/* Technical Excellence Integration */}
                <div className="bg-slate-50 rounded-lg p-8">
                  <h4 className="text-2xl font-medium text-slate-900 mb-6 text-center">
                    {t('security-technical-title')}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Lock className="text-blue-700 h-6 w-6" />
                      </div>
                      <h5 className="font-medium text-slate-900 mb-2">{t('security-encryption-title')}</h5>
                      <p className="text-sm text-slate-600">{t('security-encryption-description')}</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Shield className="text-emerald-700 h-6 w-6" />
                      </div>
                      <h5 className="font-medium text-slate-900 mb-2">{t('security-redundancy-title')}</h5>
                      <p className="text-sm text-slate-600">{t('security-redundancy-description')}</p>
                    </div>
                  </div>

                  {/* Comprehensive Certifications */}
                  <div className="border-t border-slate-200 pt-6">
                    <h5 className="text-lg font-medium text-slate-900 mb-4 text-center">{t('security-compliance-title')}</h5>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <CheckCircle className="text-blue-700 h-5 w-5" />
                        </div>
                        <h6 className="font-medium text-slate-900 text-sm mb-1">{t('security-tier-title')}</h6>
                        <p className="text-xs text-slate-600">{t('security-tier-description')}</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Shield className="text-emerald-700 h-5 w-5" />
                        </div>
                        <h6 className="font-medium text-slate-900 text-sm mb-1">{t('security-iso-title')}</h6>
                        <p className="text-xs text-slate-600">{t('security-iso-description')}</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Lock className="text-amber-700 h-5 w-5" />
                        </div>
                        <h6 className="font-medium text-slate-900 text-sm mb-1">{t('security-cyber-title')}</h6>
                        <p className="text-xs text-slate-600">{t('security-cyber-description')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-8">
              <h3 className="text-2xl font-medium text-slate-900 mb-4">
                {t('security-conclusion-title')}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {t('security-conclusion-text')}
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}