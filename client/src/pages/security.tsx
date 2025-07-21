import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { useLanguage } from '@/components/language-provider';
import { Shield, Database, Lock, CheckCircle, Server, Globe, Eye, Key, Mountain, Building } from 'lucide-react';

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

      {/* Main Security Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Security Overview */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-slate-900 mb-6">
                Swiss Alpine Security Meets Blockchain Innovation
              </h2>
              <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Our platform combines Switzerland's world-renowned data protection framework with advanced blockchain technology. Physical data centers in Alpine military bunkers provide the foundation, while our 51-node decentralized network ensures cryptographic integrity and tamper-proof agricultural certifications.
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

            {/* Physical Security Details */}
            <div className="bg-white rounded-xl p-12 border border-slate-200 mb-16">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Building className="text-amber-700 h-10 w-10" />
                </div>
                <h3 className="text-3xl font-medium text-slate-900 mb-4">
                  {t('security-physical-title')}
                </h3>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  {t('security-physical-description')}
                </p>
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

            {/* Blockchain Security Infrastructure */}
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-12 mb-16">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Globe className="text-emerald-700 h-10 w-10" />
                </div>
                <h3 className="text-3xl font-medium text-slate-900 mb-4">
                  EVM-Compatible DPoS Blockchain Architecture
                </h3>
                <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  Our platform operates on a decentralized blockchain infrastructure with 51 validator nodes, creating an unbreachable network of trust through diversified social and corporate participation.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Server className="text-blue-700 h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-medium text-slate-900 mb-4">51 Validator Nodes</h4>
                  <p className="text-slate-700 leading-relaxed">
                    Each partner organization controls one validator node, ensuring no single point of failure and creating a truly decentralized governance structure across social and corporate entities.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-emerald-700 h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-medium text-slate-900 mb-4">DPoS Consensus</h4>
                  <p className="text-slate-700 leading-relaxed">
                    Delegated Proof of Stake ensures energy efficiency while maintaining security. Validators are chosen through democratic participation, creating accountability and trust.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Globe className="text-purple-700 h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-medium text-slate-900 mb-4">EVM Compatibility</h4>
                  <p className="text-slate-700 leading-relaxed">
                    Full Ethereum Virtual Machine compatibility ensures interoperability with existing DeFi protocols while maintaining our specialized agricultural focus.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8">
                <h4 className="text-2xl font-medium text-slate-900 mb-6 text-center">
                  Diversified Trust Network
                </h4>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-lg font-medium text-slate-900 mb-4">Multi-Stakeholder Governance</h5>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      Our blockchain brings together agricultural cooperatives, environmental organizations, financial institutions, and technology partners. This diversification ensures no single entity can manipulate the network.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-slate-700">Agricultural cooperatives and farmers' unions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-slate-700">Environmental certification bodies</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-slate-700">Financial institutions and impact investors</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-lg font-medium text-slate-900 mb-4">Technical Security Features</h5>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      Advanced cryptographic mechanisms ensure data integrity and prevent double-counting or manipulation of carbon credits and agricultural certifications.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-slate-700">Immutable audit trails for all transactions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-slate-700">Smart contract validation of sustainability metrics</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-slate-700">Cryptographic proof of agricultural practices</span>
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
                Alpine Data Centers Meet Blockchain Innovation
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto mb-8">
                Our Swiss mountain data centers provide the physical security foundation, while our 51-node blockchain network ensures cryptographic integrity. This combination creates an unprecedented level of protection for agricultural data and carbon certifications. {t('security-blockchain-conclusion')}
              </p>
              <div className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white rounded-lg">
                <Shield className="mr-3 h-6 w-6" />
                <span className="text-lg font-medium">Swiss Security Guarantee</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}