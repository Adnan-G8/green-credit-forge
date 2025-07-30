import { useLanguage } from '../components/language-provider';
import { SimpleNavigation } from '../components/simple-navigation';
import { Footer } from '../components/footer';
import { CheckCircle, Shield, Globe, Users } from 'lucide-react';
import { Link } from 'wouter';
import italianGovernment from '@assets/image_1753122095811.png';

export default function SimpleEufdStandardPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <SimpleNavigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-light text-slate-900 mb-6">
              {t('eufd-hero-title') || 'EUFD2025-001 Standard'}
            </h1>
            <p className="text-xl text-slate-600 mb-8 font-light">
              {t('eufd-hero-subtitle') || 'European Union Framework Directive for CO₂ Certification in Agricultural Sector'}
            </p>
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full border border-emerald-200">
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{t('eufd-status') || 'EU Official Standard'}</span>
            </div>
          </div>
          
          {/* Italian Government Building Image */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img 
                src={italianGovernment} 
                alt="Italian government building representing official EUFD2025-001 standard backing"
                className="w-full h-64 md:h-80 object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Standard Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-light text-slate-900 mb-6">
                  {t('eufd-overview-title') || 'Comprehensive CO₂ Framework'}
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  {t('eufd-overview-description') || 'The EUFD2025-001 standard establishes the definitive framework for agricultural CO₂ certification across the European Union, ensuring standardized, transparent, and verifiable carbon credit generation.'}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-slate-700">ISO 14064-1, 14064-2, 14064-3 Compliance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-slate-700">Blockchain Integration Mandate</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-slate-700">Multi-Stakeholder Validation</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                <h3 className="text-2xl font-light text-slate-900 mb-6">Standard Specifications</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Standard Code:</span>
                    <span className="font-medium text-slate-900">EUFD2025-001</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Effective Date:</span>
                    <span className="font-medium text-slate-900">January 1, 2025</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Scope:</span>
                    <span className="font-medium text-slate-900">EU Agricultural Sector</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Validation:</span>
                    <span className="font-medium text-slate-900">Blockchain Required</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Components */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-3">
                  {t('eufd-verification-title') || 'Verification Protocol'}
                </h3>
                <p className="text-slate-600">
                  {t('eufd-verification-description') || 'Multi-tier verification system ensuring data accuracy and compliance with EU regulations'}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-3">
                  {t('eufd-blockchain-title') || 'Blockchain Integration'}
                </h3>
                <p className="text-slate-600">
                  {t('eufd-blockchain-description') || 'Mandatory blockchain recording for all carbon credit transactions and certifications'}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-3">
                  {t('eufd-stakeholder-title') || 'Stakeholder Governance'}
                </h3>
                <p className="text-slate-600">
                  {t('eufd-stakeholder-description') || 'Collaborative governance model involving agricultural cooperatives, environmental organizations, and financial institutions'}
                </p>
              </div>
            </div>

            {/* Regulatory Framework */}
            <div className="bg-blue-50 rounded-xl p-8 border border-blue-200 mb-16">
              <h3 className="text-2xl font-light text-slate-900 mb-6 text-center">
                {t('eufd-regulatory-title') || 'EU Regulatory Framework'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-blue-900 mb-3">EU Regulation 3012/2024</h4>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    {t('eufd-regulation-description') || 'Establishes mandatory blockchain integration for all carbon credit issuance and trading within the European Union agricultural sector.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-3">ISO Standards Compliance</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-800 text-sm">ISO 14064-1: GHG quantification</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-800 text-sm">ISO 14064-2: Project-level quantification</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-800 text-sm">ISO 14064-3: Validation and verification</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Implementation Timeline */}
            <div className="text-center">
              <h3 className="text-2xl font-light text-slate-900 mb-8">
                {t('eufd-implementation-title') || 'Implementation Timeline'}
              </h3>
              <div className="max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
                    <div className="text-2xl font-bold text-emerald-600 mb-2">Phase 1</div>
                    <div className="text-sm text-emerald-800 font-medium mb-2">Q1 2025</div>
                    <div className="text-emerald-700 text-sm">Standard Publication & Training</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600 mb-2">Phase 2</div>
                    <div className="text-sm text-blue-800 font-medium mb-2">Q2 2025</div>
                    <div className="text-blue-700 text-sm">Platform Deployment & Testing</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600 mb-2">Phase 3</div>
                    <div className="text-sm text-purple-800 font-medium mb-2">Q3 2025</div>
                    <div className="text-purple-700 text-sm">Full Implementation & Certification</div>
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