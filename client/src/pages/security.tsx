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
              Digital Security
            </h1>
            <p className="text-xl text-white/90 leading-relaxed font-light max-w-3xl mx-auto">
              The security and reliability of our infrastructure represent the foundation of trust you place in FAGRI Digital.
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
                Security Overview
              </h2>
              <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Our multi-layered security architecture ensures maximum protection for your agricultural data.
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
                  Three-Factor Authentication (3FA)
                </h3>
                <p className="text-slate-600 mb-6">
                  Access to the platform is secured via:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Certified user identity</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Authorized device (computer, smartphone, etc.)</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Active user session</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Obligatory digital fingerprint for ecosystem of trust and respect</span>
                  </div>
                </div>
                
                {/* Digital Fingerprint Section within 3FA */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h4 className="text-lg font-medium text-slate-900 mb-4">
                    Obligatory Digital Fingerprint for Every User and Active Member
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    For an ecosystem of trust and respect, every user and active member on the platform must provide their obligatory digital fingerprint. This ensures accountability, transparency, and a secure environment for all participants.
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-slate-700 text-sm leading-relaxed">
                      has to go through a KYC process in order to create its digital fingerprint. After the Digital Fingerprint is issued the Data and all other informations are highly encrypted on a seperate server structurte to protect it against every and all misues. All this information are only used for legal and regulation processing and nothing else and not shared with any other organisation.
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
                  Data Sovereignty & Access Control
                </h3>
                <p className="text-slate-600 mb-6">
                  Your Data. Our Fortress. Swiss Precision for a Global Platform. Our infrastructure is designed to connect nations worldwide and enable international applications. To ensure the highest data sovereignty and neutrality, we rely on a specialized Swiss service provider for secure data management.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Strictest Data Protection Laws: subject to the New Federal Act on Data Protection (nFADP), one of the world's strictest data protection laws</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">FINMA Standards: infrastructure meets Swiss Financial Market Supervisory Authority requirements (FINMA-RS 18/3 compliance)</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Unrivalled Physical Security: data centers in Alpine fortresses, former Swiss military bunkers repurposed into state-of-the-art data centers</span>
                  </div>
                </div>
              </div>

              {/* Tier 3: Alpine Data Centers */}
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

          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}