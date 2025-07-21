import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { useLanguage } from '@/components/language-provider';
import { Shield, Database, Lock, CheckCircle, Server, Globe, Eye, Key, Mountain, Building, Leaf } from 'lucide-react';
import dataCenter from '@assets/image_1753120952664.png';
import agriculturalLandscape from '@assets/image_1753121514850.png';

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

            {/* Three-Tier Security Architecture */}
            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              
              {/* Tier 1: Access Control */}
              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Key className="text-blue-700 h-8 w-8" />
                </div>
                <h3 className="text-2xl font-medium text-slate-900 mb-4">
                  {t('security-3fa-title')}
                </h3>
                <p className="text-slate-600 mb-6">
                  {t('security-3fa-description')}
                </p>
                <div className="space-y-4">
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
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t('security-3fa-point4')}</span>
                  </div>
                </div>
                
                {/* Digital Fingerprint Section within 3FA */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h4 className="text-lg font-medium text-slate-900 mb-4">
                    {t('security-digital-fingerprint-title')}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t('security-digital-fingerprint-description')}
                  </p>
                </div>
              </div>

              {/* Tier 2: Legal Framework */}
              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                  <Globe className="text-emerald-700 h-8 w-8" />
                </div>
                <h3 className="text-2xl font-medium text-slate-900 mb-4">
                  {t('security-data-title')}
                </h3>
                <p className="text-slate-600 mb-6">
                  {t('security-data-description')}
                </p>
                <div className="space-y-4">
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

              {/* Tier 3: Infrastructure */}
              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                  <Mountain className="text-amber-700 h-8 w-8" />
                </div>
                <h3 className="text-2xl font-medium text-slate-900 mb-4">
                  Alpine Data Centers
                </h3>
                <p className="text-slate-600 mb-6">
                  Our primary data centers are strategically located in former Swiss military bunkers deep in the Alps, offering unparalleled physical security and natural protection from both environmental and human threats.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">EMP-resistant military bunkers</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Autonomous power and cooling systems</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Multi-ton security doors with biometric access</span>
                  </div>
                </div>
              </div>
            </div>



            {/* Physical Infrastructure Security with Data Center Image */}
            <div className="bg-slate-50 rounded-xl p-12 mb-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                <div>
                  <div className="w-20 h-20 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                    <Building className="text-amber-700 h-10 w-10" />
                  </div>
                  <h3 className="text-3xl font-medium text-slate-900 mb-4">
                    {t('security-physical-title')}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {t('security-physical-description')}
                  </p>
                </div>
                <div className="relative">
                  <img 
                    src={dataCenter} 
                    alt="Secure data center infrastructure with professional server equipment"
                    className="rounded-xl shadow-lg w-full h-auto"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-red-700 h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-medium text-slate-900 mb-3">Military Standards</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {t('security-physical-point1')}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Server className="text-blue-700 h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-medium text-slate-900 mb-3">Autonomous Operations</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {t('security-physical-point2')}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Eye className="text-emerald-700 h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-medium text-slate-900 mb-3">Access Control</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {t('security-physical-point3')}
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Mountain className="text-purple-700 h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-medium text-slate-900 mb-3">Disaster Recovery</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Dedicated Alpine recovery site with triple backup systems across geographically dispersed Swiss locations.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Excellence */}
            <div className="bg-white rounded-xl p-12 border border-slate-200 mb-16">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Lock className="text-purple-700 h-10 w-10" />
                </div>
                <h3 className="text-3xl font-medium text-slate-900 mb-4">
                  {t('security-technical-title')}
                </h3>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  {t('security-technical-intro')}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <Lock className="text-blue-700 h-6 w-6" />
                    </div>
                    <h4 className="text-xl font-medium text-slate-900">{t('security-encryption-title')}</h4>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {t('security-encryption-description')}
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                      <Database className="text-emerald-700 h-6 w-6" />
                    </div>
                    <h4 className="text-xl font-medium text-slate-900">{t('security-redundancy-title')}</h4>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {t('security-redundancy-description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Alpine Security Meets Global Blockchain Governance */}
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-12 mb-16">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Mountain className="text-emerald-700 h-10 w-10" />
                </div>
                <h3 className="text-3xl font-medium text-slate-900 mb-6">
                  Alpine Security Meets Global Blockchain Governance
                </h3>
                <div className="max-w-4xl mx-auto space-y-6">
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {t('security-alpine-p1')}
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {t('security-alpine-p2')}
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    {t('security-alpine-p3')}
                  </p>
                </div>
              </div>

              {/* 100% CO₂ Neutral Section */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-12 mb-16">
                <div className="text-center mb-12">
                  <div className="w-20 h-20 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Leaf className="text-emerald-700 h-10 w-10" />
                  </div>
                  <h3 className="text-3xl font-medium text-slate-900 mb-6">
                    {t('security-co2-neutral-title')}
                  </h3>
                  <div className="max-w-4xl mx-auto space-y-6">
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {t('security-co2-neutral-p1')}
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {t('security-co2-neutral-p2')}
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                      {t('security-co2-neutral-p3')}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Server className="text-blue-700 h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-medium text-slate-900 mb-4">{t('security-blockchain-nodes-title')}</h4>
                  <p className="text-slate-700 leading-relaxed">
                    {t('security-blockchain-nodes-description')}
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-emerald-700 h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-medium text-slate-900 mb-4">{t('security-blockchain-dpos-title')}</h4>
                  <p className="text-slate-700 leading-relaxed">
                    {t('security-blockchain-dpos-description')}
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Globe className="text-purple-700 h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-medium text-slate-900 mb-4">{t('security-blockchain-evm-title')}</h4>
                  <p className="text-slate-700 leading-relaxed">
                    {t('security-blockchain-evm-description')}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8">
                <h4 className="text-2xl font-medium text-slate-900 mb-6 text-center">
                  {t('security-blockchain-trust-title')}
                </h4>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-lg font-medium text-slate-900 mb-4">{t('security-blockchain-governance-title')}</h5>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      {t('security-blockchain-governance-description')}
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-slate-700">{t('security-blockchain-governance-point1')}</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-slate-700">{t('security-blockchain-governance-point2')}</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-slate-700">{t('security-blockchain-governance-point3')}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-lg font-medium text-slate-900 mb-4">{t('security-blockchain-technical-title')}</h5>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      {t('security-blockchain-technical-description')}
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-slate-700">{t('security-blockchain-technical-point1')}</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-slate-700">{t('security-blockchain-technical-point2')}</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-slate-700">{t('security-blockchain-technical-point3')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications and Compliance */}
            <div className="bg-slate-50 rounded-xl p-12 mb-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-medium text-slate-900 mb-4">
                  {t('security-compliance-title')}
                </h3>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  Our comprehensive certification portfolio demonstrates our commitment to the highest security standards.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Server className="text-blue-700 h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-medium text-slate-900 mb-3">{t('security-tier-title')}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t('security-tier-description')}
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-emerald-700 h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-medium text-slate-900 mb-3">{t('security-iso-title')}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t('security-iso-description')}
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Globe className="text-amber-700 h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-medium text-slate-900 mb-3">{t('security-cyber-title')}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t('security-cyber-description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-12 text-center">
              <h3 className="text-3xl font-medium text-slate-900 mb-6">
                {t('security-conclusion-title')}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto mb-8">
                {t('security-conclusion-description')}
              </p>
              <div className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white rounded-lg">
                <Shield className="mr-3 h-6 w-6" />
                <span className="text-lg font-medium">{t('security-conclusion-guarantee')}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}