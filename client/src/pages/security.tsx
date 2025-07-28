import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { useLanguage } from '@/components/language-provider';
import { Shield, Database, Lock, CheckCircle, Server, Globe, Eye, Key, Mountain, Building, Leaf } from 'lucide-react';
import dataCenter from '@assets/image_1753120952664.png';
import agriculturalLandscape from '@assets/image_1753121514850.png';
import italianGovernment from '@assets/image_1753122095811.png';
import swissAlps from '@assets/image_1753202443401.png';
import swissBunker from '@assets/image_1753694170930.png';
import serverRack from '@assets/image_1753694751730.png';
import swissAlpsLake from '@assets/image_1753695152431.png';
import dataCenterCorridor from '@assets/image_1753695626105.png';

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
              {t('security-page-hero-title')}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed font-light max-w-3xl mx-auto">
              {t('security-page-hero-subtitle')}
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
                {t('security-overview-main-title')}
              </h2>
              <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
                {t('security-overview-main-desc')}
              </p>
            </div>



            {/* Three-Tier Security Architecture - Original Grid Layout */}
            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              
              {/* Tier 1: Three-Factor Authentication */}
              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Key className="text-blue-700 h-8 w-8" />
                </div>
                <h3 className="text-2xl font-medium text-slate-900 mb-4">
                  {t('three-factor-auth-title')}
                </h3>
                <p className="text-slate-600 mb-6">
                  {t('access-platform-secured')}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t('certified-user-identity')}</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t('authorized-device')}</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t('active-user-session')}</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t('obligatory-digital-fingerprint')}</span>
                  </div>
                </div>
                
                {/* Digital Fingerprint Section within 3FA */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h4 className="text-lg font-medium text-slate-900 mb-4">
                    {t('digital-fingerprint-kyc-title')}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {t('digital-fingerprint-ecosystem-desc')}
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {t('kyc-process-encryption-desc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tier 2: Data Sovereignty & Access Control */}
              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                  <Globe className="text-emerald-700 h-8 w-8" />
                </div>
                <h3 className="text-2xl font-medium text-slate-900 mb-4">
                  {t('data-sovereignty-access-title')}
                </h3>
                <p className="text-slate-600 mb-6">
                  {t('your-data-fortress-swiss')}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t('strictest-data-protection-laws')}</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t('finma-banking-compliance-desc')}</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t('bank-level-security-platforms')}</span>
                  </div>
                </div>
              </div>

              {/* Tier 3: Alpine Data Centers */}
              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                  <Mountain className="text-amber-700 h-8 w-8" />
                </div>
                <h3 className="text-2xl font-medium text-slate-900 mb-4">
                  {t('alpine-data-centers-title')}
                </h3>
                <p className="text-slate-600 mb-6">
                  {t('primary-data-centers-located')}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t('emp-resistant-bunkers')}</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t('autonomous-power-cooling')}</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t('multi-ton-security-doors')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Unrivalled Physical Security Section */}
            <section className="py-20 bg-slate-50">
              <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Content */}
                    <div>
                      <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                        <Building className="text-orange-700 h-8 w-8" />
                      </div>
                      <h2 className="text-3xl font-light text-slate-900 mb-6">
                        {t('unrivalled-physical-security-title')}
                      </h2>
                      <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        {t('data-centers-swiss-military')}
                      </p>
                      <p className="text-sm text-slate-500 mb-8">
                        {t('secure-infrastructure-equipment')}
                      </p>
                    </div>

                    {/* Server Image */}
                    <div className="relative">
                      <img 
                        src={dataCenterCorridor} 
                        alt="Professional data center with server infrastructure"
                        className="rounded-xl shadow-lg w-full h-auto"
                      />
                    </div>
                  </div>

                  {/* Four Security Pillars */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                    
                    {/* Military Standards */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <Shield className="text-red-700 h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-3">
                        {t('military-standards-physical-title')}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {t('military-standard-physical-built')}
                      </p>
                    </div>

                    {/* Autonomous Operations */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <Database className="text-blue-700 h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-3">
                        {t('autonomous-operations-physical-title')}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {t('autonomous-operability-physical-power')}
                      </p>
                    </div>

                    {/* Access Control */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <Eye className="text-emerald-700 h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-3">
                        {t('access-control-physical-title')}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {t('strict-access-controls-physical-multi-ton')}
                      </p>
                    </div>

                    {/* Disaster Recovery */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <Mountain className="text-purple-700 h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-3">
                        {t('disaster-recovery-physical-title')}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {t('dedicated-alpine-recovery-physical-site')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Technical Excellence Section */}
            <section className="py-20">
              <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                  
                  {/* Header */}
                  <div className="text-center mb-16">
                    <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                      <Lock className="text-purple-700 h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-light text-slate-900 mb-6">
                      {t('technical-excellence-operational-title')}
                    </h2>
                    <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
                      {t('beyond-impressive-physical-security')}
                    </p>
                  </div>

                  {/* Two-Column Technical Features */}
                  <div className="grid lg:grid-cols-2 gap-12">
                    
                    {/* Multi-Layer Encryption */}
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Lock className="text-blue-700 h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-medium text-slate-900 mb-4">
                            {t('multi-layer-encryption-title')}
                          </h3>
                          <p className="text-slate-600 leading-relaxed">
                            {t('data-protected-encryption-standards')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Robust Redundancy */}
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Database className="text-emerald-700 h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-medium text-slate-900 mb-4">
                            {t('robust-redundancy-title')}
                          </h3>
                          <p className="text-slate-600 leading-relaxed">
                            {t('customer-data-triple-backed')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Certifications and Compliance Section */}
            <section className="py-20 bg-white">
              <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                  
                  {/* Header */}
                  <div className="text-center mb-16">
                    <h2 className="text-3xl font-light text-slate-900 mb-4">
                      {t('certifications-compliance-title')}
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                      {t('comprehensive-certification-portfolio')}
                    </p>
                  </div>

                  {/* Three Certification Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    <div className="bg-blue-50 p-8 rounded-xl text-center">
                      <Database className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-slate-900 mb-4">{t('highest-availability-title')}</h3>
                      <p className="text-slate-600 leading-relaxed">{t('data-centers-comply-uptime')}</p>
                    </div>
                    <div className="bg-green-50 p-8 rounded-xl text-center">
                      <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-slate-900 mb-4">{t('iso-iec-pci-title')}</h3>
                      <p className="text-slate-600 leading-relaxed">{t('internationally-recognized-standards')}</p>
                    </div>
                    <div className="bg-orange-50 p-8 rounded-xl text-center">
                      <Globe className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-slate-900 mb-4">{t('national-cyber-resilience-title')}</h3>
                      <p className="text-slate-600 leading-relaxed">{t('integrated-switzerland-cyber')}</p>
                    </div>
                  </div>

                  {/* Alpine Data Centers Summary */}
                  <div className="bg-green-50 p-8 rounded-xl text-center">
                    <h3 className="text-2xl font-light text-slate-900 mb-6">
                      {t('alpine-blockchain-title')}
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-4xl mx-auto">
                      {t('swiss-mountain-blockchain-desc')}
                    </p>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center mx-auto">
                      <Shield className="h-5 w-5 mr-2" />
                      {t('swiss-security-guarantee')}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Alpine Security Meets Blockchain Section */}
            <section className="py-20 bg-emerald-50">
              <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                  
                  {/* Header */}
                  <div className="text-center mb-16">
                    <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                      <Mountain className="text-emerald-700 h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-light text-slate-900 mb-6">
                      {t('alpine-security-global-blockchain')}
                    </h2>
                    <div className="space-y-4 max-w-4xl mx-auto">
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {t('first-time-blockchain-validators')}
                      </p>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {t('housed-swiss-mountain-data')}
                      </p>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {t('fagri-digital-combines-physical')}
                      </p>
                    </div>
                  </div>

                  {/* Swiss Alps Image */}
                  <div className="relative">
                    <img 
                      src={swissBunker} 
                      alt="Swiss Alps representing the secure mountain data centers"
                      className="rounded-xl shadow-lg w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed Blockchain Architecture Section */}
            <section className="py-20 bg-white">
              <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                  
                  {/* Three Feature Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    <div className="bg-blue-50 p-8 rounded-xl text-center">
                      <Database className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-slate-900 mb-4">{t('validator-nodes-51')}</h3>
                      <p className="text-slate-600 leading-relaxed">{t('each-partner-organization-controls')}</p>
                    </div>
                    <div className="bg-green-50 p-8 rounded-xl text-center">
                      <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-slate-900 mb-4">{t('dpos-consensus')}</h3>
                      <p className="text-slate-600 leading-relaxed">{t('delegated-proof-stake-ensures')}</p>
                    </div>
                    <div className="bg-purple-50 p-8 rounded-xl text-center">
                      <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-slate-900 mb-4">{t('evm-compatibility')}</h3>
                      <p className="text-slate-600 leading-relaxed">{t('full-ethereum-virtual-machine')}</p>
                    </div>
                  </div>

                  {/* Diversified Trust Network */}
                  <div className="bg-slate-50 p-8 rounded-xl">
                    <h2 className="text-3xl font-light text-slate-900 mb-8 text-center">{t('diversified-trust-network')}</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-medium text-slate-900 mb-4">{t('multi-stakeholder-governance')}</h3>
                        <p className="text-slate-600 leading-relaxed mb-6">{t('blockchain-brings-together-agricultural')}</p>
                        <ul className="space-y-3">
                          <li className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-slate-600">{t('agricultural-cooperatives-farmers')}</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-slate-600">{t('environmental-certification-bodies')}</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-slate-600">{t('financial-institutions-impact')}</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-slate-900 mb-4">{t('technical-security-features')}</h3>
                        <p className="text-slate-600 leading-relaxed mb-6">{t('advanced-cryptographic-mechanisms')}</p>
                        <ul className="space-y-3">
                          <li className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-slate-600">{t('immutable-audit-trails')}</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-slate-600">{t('smart-contract-validation')}</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-slate-600">{t('cryptographic-proof-agricultural')}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 100% CO₂ Neutral Section */}
            <section className="py-20 bg-slate-50">
              <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                  
                  {/* Swiss Alps Lake Image at top */}
                  <div className="relative mb-16">
                    <img 
                      src={swissAlpsLake} 
                      alt="Swiss Alps with turquoise lake representing clean hydropower energy"
                      className="rounded-xl shadow-lg w-full h-64 object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                      <Leaf className="text-green-700 h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-light text-slate-900 mb-8">
                      {t('co2-neutral-sustainable-technology')}
                    </h2>
                    <div className="space-y-6 max-w-4xl mx-auto">
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {t('all-data-centers-operate')}
                      </p>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {t('naturally-cool-climate')}
                      </p>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {t('fagri-digital-represents-ecosystem')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}