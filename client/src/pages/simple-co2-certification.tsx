import { useLanguage } from '../components/language-provider';
import { SimpleNavigation } from '../components/simple-navigation';
import { Footer } from '../components/footer';
import { Shield, Globe, CheckCircle, Users, FileText, Lock, Check } from 'lucide-react';

export default function SimpleCO2Certification() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <SimpleNavigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              Your Trusted Partner for CO₂ Certification
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed font-light">
              On the FAGRI.Digital platform, CO₂ certification is built on foundations of scientific rigor, cutting-edge technology and solid legal compliance.
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
                Our Collaborative Framework
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our CO₂ certification process operates under the EUFD2025-001 standard, developed over years of research with important Italian universities and our technology partner, ALPHAG8 Digital Solutions Switzerland.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">European Commission</h3>
                  <p className="text-slate-600 text-sm">Alignment with the EU's comprehensive climate policies and objectives.</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Italian Ministry of Environment</h3>
                  <p className="text-slate-600 text-sm">Ensuring compliance with national environmental regulations.</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">GSE (Energy Systems Operator)</h3>
                  <p className="text-slate-600 text-sm">Integration with established energy and emissions management frameworks.</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">ISO (International Organization for Standardization)</h3>
                  <p className="text-slate-600 text-sm">Maintaining globally recognized quality and procedural benchmarks.</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">University of Tuscia at Viterbo</h3>
                  <p className="text-slate-600 text-sm">Scientific partnership with this important Italian university for research and validation of our EUFD2025-001 certification methodologies.</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <Check className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">SOIL AND HEALTH</h3>
                  <p className="text-slate-600 text-sm">Our dedicated certification body for verification and independent validation.</p>
                </div>
              </div>
            </div>

            {/* Legal and Technological Foundation */}
            <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
              <h2 className="text-3xl font-light text-slate-900 mb-6">
                Legal and Technological Foundation
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our certification process is firmly rooted in a comprehensive legal and technological framework.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">EU Emissions Trading System (EU ETS)</h3>
                  <p className="text-slate-600 text-sm">Ensuring compliance with the cornerstone of EU climate policy.</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Carbon Border Adjustment Mechanism (CBAM)</h3>
                  <p className="text-slate-600 text-sm">Proactively addressing future reporting requirements and embedded emissions.</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Lock className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Anti-Money Laundering (AML) and Know Your Customer (KYC) Framework</h3>
                  <p className="text-slate-600 text-sm">Implementation of rigorous due diligence for all participants.</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Paris Agreement (Article 6)</h3>
                  <p className="text-slate-600 text-sm">Supporting mechanisms for Internationally Transferable Mitigation Results.</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Kyoto Protocol</h3>
                  <p className="text-slate-600 text-sm">Based on established international accounting principles.</p>
                </div>
              </div>
            </div>

            {/* Technology and Security */}
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
              <h2 className="text-3xl font-light text-slate-900 mb-6">
                Technology and Security
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our platform uses blockchain technology for immutable document storage, creating unparalleled transparency and eliminating issues like double counting and greenwashing.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <Lock className="h-6 w-6 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Blockchain Technology</h3>
                  <p className="text-slate-600 text-sm">Immutable storage and complete transparency of documents.</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Three-Factor Authentication (3FA)</h3>
                  <p className="text-slate-600 text-sm">Unparalleled secure and reliable environment for all participants.</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Unique Digital Fingerprint</h3>
                  <p className="text-slate-600 text-sm">Secure identification and clear ownership for every user.</p>
                </div>
              </div>
            </div>

            {/* Certification Process */}
            <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-200">
              <h2 className="text-3xl font-light text-slate-900 mb-8 text-center">
                Certification Process
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    1
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">Project Registration</h3>
                  <p className="text-slate-600 text-sm">Submit project details and documentation through secure platform</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    2
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">Multi-Stakeholder Review</h3>
                  <p className="text-slate-600 text-sm">Collaborative validation by partner organizations</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    3
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">Blockchain Recording</h3>
                  <p className="text-slate-600 text-sm">Immutable certification recorded on G8Chain network</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    4
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">Credit Issuance</h3>
                  <p className="text-slate-600 text-sm">Verified carbon credits issued and available for trading</p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="text-center">
              <h2 className="text-3xl font-light text-slate-900 mb-8">
                Platform Benefits
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