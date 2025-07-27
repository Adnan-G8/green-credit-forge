import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { useLanguage } from '@/components/language-provider';
import { Shield, Database, Lock, CheckCircle, Server, Globe, Eye, Key, Mountain, Building, Leaf } from 'lucide-react';
import dataCenter from '@assets/image_1753120952664.png';
import agriculturalLandscape from '@assets/image_1753121514850.png';
import italianGovernment from '@assets/image_1753122095811.png';
import swissAlps from '@assets/image_1753202443401.png';

export default function Security() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-fagri-bg">
      <Navigation />
      
      {/* Hero Section with Agricultural Image */}
      <section className="pt-20 pb-20 relative">
        <div className="absolute inset-0">
          <img 
            src={agriculturalLandscape} 
            alt="Agricultural landscape representing digital security for farming"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-900/30"></div>
        </div>
        <div className="relative container mx-auto px-6 pt-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light text-white mb-8">
              {t('security-page-title')}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed font-light max-w-3xl mx-auto">
              {t('security-page-subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Security Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Security Overview */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-slate-900 mb-6">
                {t('security-page-overview-title')}
              </h2>
              <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
                {t('security-page-overview-subtitle')}
              </p>
            </div>

            {/* Three Main Security Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Three-Factor Authentication */}
              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Key className="text-blue-700 h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-4 text-center">
                  {t('security-3fa-title')}
                </h3>
                <p className="text-slate-600 text-sm mb-6 text-center">
                  {t('security-3fa-description')}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{t('security-3fa-point1')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{t('security-3fa-point2')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{t('security-3fa-point3')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{t('security-3fa-point4')}</span>
                  </div>
                </div>
              </div>

              {/* Data Sovereignty */}
              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="text-emerald-700 h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-4 text-center">
                  {t('security-data-title')}
                </h3>
                <p className="text-slate-600 text-sm mb-6 text-center">
                  {t('security-data-description')}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{t('security-data-point1')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{t('security-data-point2')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{t('security-data-point3')}</span>
                  </div>
                </div>
              </div>

              {/* Alpine Data Centers */}
              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Mountain className="text-amber-700 h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-4 text-center">
                  {t('security-alpine-datacenters-title')}
                </h3>
                <p className="text-slate-600 text-sm mb-6 text-center">
                  {t('security-alpine-datacenters-description')}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{t('security-alpine-datacenters-point1')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{t('security-alpine-datacenters-point2')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{t('security-alpine-datacenters-point3')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Three-Factor Authentication (3FA) Detailed Section */}
            <div className="bg-white rounded-xl p-8 border border-slate-200 mb-16">
              <h3 className="text-2xl font-light text-slate-900 mb-6">
                Three-Factor Authentication (3FA)
              </h3>
              <div className="mb-6">
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Access to the platform is secured via:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0 mt-0.5 mr-3" />
                    <span>Certified user identity</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0 mt-0.5 mr-3" />
                    <span>Authorized device (computer, smartphone, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0 mt-0.5 mr-3" />
                    <span>Active user session</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0 mt-0.5 mr-3" />
                    <span>Obligatory digital fingerprint for ecosystem of trust and respect</span>
                  </li>
                </ul>
              </div>
              
              {/* Obligatory Digital Fingerprint Section */}
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h4 className="text-xl font-medium text-slate-900 mb-4">
                  Obligatory Digital Fingerprint for Every User and Active Member
                </h4>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  For an ecosystem of trust and respect, every user and active member on the platform must provide their obligatory digital fingerprint. This ensures accountability, transparency, and a secure environment for all participants.
                </p>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  has to go through a KYC process in order to create its digital fingerprint. After the Digital Fingerprint is issued the Data and all other informations are highly encrypted on a seperate server structurte to protect it against every and all misues. All this information are only used for legal and regulation processing and nothing else and not shared with any other organisation.
                </p>
                
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-3 px-4 rounded-lg transition-colors">
                    Complete KYC Verification
                  </button>
                </div>
              </div>
            </div>

            {/* Data Sovereignty & Access Control Section */}
            <div className="bg-white rounded-xl p-8 border border-slate-200 mb-16">
              <h3 className="text-2xl font-light text-slate-900 mb-6">
                Data Sovereignty & Access Control
              </h3>
              <p className="text-lg text-slate-700 font-medium mb-4">
                Your Data. Our Fortress. Swiss Precision for a Global Platform.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Our infrastructure is designed to connect nations worldwide and enable international applications. To ensure the highest data sovereignty and neutrality, we rely on a specialized Swiss service provider for secure data management.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0 mt-0.5 mr-3" />
                  <div>
                    <span className="font-medium text-slate-900">Strictest Data Protection Laws:</span>
                    <span className="text-slate-600"> subject to the New Federal Act on Data Protection (nFADP), one of the world's strictest data protection laws</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0 mt-0.5 mr-3" />
                  <div>
                    <span className="font-medium text-slate-900">FINMA Standards:</span>
                    <span className="text-slate-600"> infrastructure meets Swiss Financial Market Supervisory Authority requirements (FINMA-RS 18/3 compliance)</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0 mt-0.5 mr-3" />
                  <div>
                    <span className="font-medium text-slate-900">Unrivalled Physical Security:</span>
                    <span className="text-slate-600"> data centers in Alpine fortresses, former Swiss military bunkers repurposed into state-of-the-art data centers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Alpine Data Centers Section */}
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 mb-16">
              <h3 className="text-2xl font-light text-slate-900 mb-6">
                Alpine Data Centers
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Our primary data centers are strategically located in former Swiss military bunkers deep in the Alps, offering unparalleled physical security and natural protection from both environmental and human threats.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-slate-600">EMP-resistant military bunkers</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-slate-600">Autonomous power and cooling systems</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-emerald-500 h-5 w-5 flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-slate-600">Multi-ton security doors with biometric access</span>
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