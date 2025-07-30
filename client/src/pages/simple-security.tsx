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

export default function SimpleSecurity() {
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
              {t('security-page-hero-title') || 'Swiss Banking-Level Security'}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed font-light max-w-3xl mx-auto">
              {t('security-page-hero-subtitle') || 'Advanced data protection through Alpine fortress infrastructure and blockchain technology'}
            </p>
          </div>
        </div>
      </section>

      {/* Security Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-slate-900 mb-6">
                {t('security-overview-title') || 'Three-Tier Security Architecture'}
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                {t('security-overview-description') || 'Our comprehensive security framework combines Swiss military infrastructure, banking-grade protocols, and blockchain verification'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Access Control */}
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Key className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-light text-slate-900 mb-3">
                    {t('access-control-title') || 'Access Control'}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">3-Factor Authentication (3FA)</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Digital Identity Verification</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Role-Based Permissions</span>
                  </div>
                </div>
              </div>

              {/* Legal Framework */}
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-light text-slate-900 mb-3">
                    {t('legal-framework-title') || 'Legal Framework'}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Swiss Federal Data Protection</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">FINMA Banking Compliance</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">GDPR Full Compliance</span>
                  </div>
                </div>
              </div>

              {/* Infrastructure */}
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mountain className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-light text-slate-900 mb-3">
                    {t('infrastructure-title') || 'Alpine Infrastructure'}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Swiss Military Bunkers</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">EMP & Disaster Resistant</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">100% Renewable Energy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alpine Fortress Infrastructure */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-light text-slate-900 mb-6">
                  {t('alpine-fortress-title') || 'Alpine Fortress Infrastructure'}
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {t('alpine-fortress-description') || 'Your agricultural data is protected in former Swiss military bunkers, built to withstand nuclear attacks and natural disasters.'}
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
                    <div className="text-sm text-slate-600">Uptime Guarantee</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">AES-256</div>
                    <div className="text-sm text-slate-600">Encryption Standard</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                    <div className="text-sm text-slate-600">Security Monitoring</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">0 CO₂</div>
                    <div className="text-sm text-slate-600">Carbon Footprint</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src={swissAlps} 
                  alt="Swiss Alps data center location"
                  className="w-full rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blockchain Security */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-slate-900 mb-6">
                {t('blockchain-security-title') || 'Blockchain Governance & Verification'}
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                {t('blockchain-security-description') || 'Immutable audit trails and smart contract validation ensure complete transparency in CO₂ certification'}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">51-Node Network</h3>
                  <p className="text-sm text-slate-600">Decentralized validation across partner organizations</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">Smart Contracts</h3>
                  <p className="text-sm text-slate-600">Automated validation and certification processes</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">Full Transparency</h3>
                  <p className="text-sm text-slate-600">Complete audit trail for all transactions</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Server className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">EVM Compatible</h3>
                  <p className="text-sm text-slate-600">Ethereum Virtual Machine compatibility</p>
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