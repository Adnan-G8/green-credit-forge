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
                        Unrivalled Physical Security: Data in Alpine Fortresses
                      </h2>
                      <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        Our data centers use former Swiss military bunkers, repurposed into state-of-the-art data centers, offering a level of physical protection far beyond conventional data centers.
                      </p>
                      <p className="text-sm text-slate-500 mb-8">
                        Secure data center infrastructure with professional server equipment
                      </p>
                    </div>

                    {/* Server Image */}
                    <div className="relative">
                      <img 
                        src="/attached_assets/image_1753693840325.png" 
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
                        Military Standards
                      </h3>
                      <p className="text-sm text-slate-600">
                        Military Standard: built to withstand conventional attacks, chemical/biological threats, and electromagnetic pulses (EMPs)
                      </p>
                    </div>

                    {/* Autonomous Operations */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <Database className="text-blue-700 h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-3">
                        Autonomous Operations
                      </h3>
                      <p className="text-sm text-slate-600">
                        Autonomous Operability: independent power supply systems and autonomous ventilation for operational continuity even during disasters
                      </p>
                    </div>

                    {/* Access Control */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <Eye className="text-emerald-700 h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-3">
                        Access Control
                      </h3>
                      <p className="text-sm text-slate-600">
                        Strict Access Controls: multi-ton security doors, biometric scanners, and 24/7 video surveillance
                      </p>
                    </div>

                    {/* Disaster Recovery */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <Mountain className="text-purple-700 h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-3">
                        Disaster Recovery
                      </h3>
                      <p className="text-sm text-slate-600">
                        Dedicated Alpine recovery site with triple backup systems across geographically dispersed Swiss locations.
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
                      Technical Excellence and Operational Resilience
                    </h2>
                    <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
                      Beyond impressive physical security, we integrate cutting-edge technical measures and comprehensive redundancies to ensure data protection and availability.
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
                            Multi-Layer Encryption
                          </h3>
                          <p className="text-slate-600 leading-relaxed">
                            Data is protected with internationally recognized encryption standards such as AES-256 and RSA-4096. A "Zero-Knowledge Architecture" ensures that only you can decrypt your files.
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
                            Robust Redundancy
                          </h3>
                          <p className="text-slate-600 leading-relaxed">
                            Customer data is triple-backed up, with each file stored simultaneously in different, geographically dispersed locations within Switzerland. A dedicated "Disaster Recovery Site" deep in the Swiss Alps offers maximum protection.
                          </p>
                        </div>
                      </div>
                    </div>
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
                      Alpine Security Meets Global Blockchain Governance
                    </h2>
                    <div className="space-y-4 max-w-4xl mx-auto">
                      <p className="text-lg text-slate-600 leading-relaxed">
                        For the first time, blockchain validators are jointly operated by institutions, social organizations, and partners from multiple countries — all with equal rights and shared responsibilities.
                      </p>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        Housed in Swiss mountain data centers with bank-level security, our 51-node blockchain ensures data integrity, resilience, and sovereignty.
                      </p>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        FAGRI.Digital combines physical protection with decentralized governance, creating a transparent and trustworthy infrastructure for CO₂ certification and agricultural data for the world of tomorrow.
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
                      <h3 className="text-xl font-medium text-slate-900 mb-4">51 Validator Nodes</h3>
                      <p className="text-slate-600 leading-relaxed">Each partner organization controls one validator node, ensuring no single point of failure and creating a truly decentralized governance structure across social and corporate entities.</p>
                    </div>
                    <div className="bg-green-50 p-8 rounded-xl text-center">
                      <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-slate-900 mb-4">DPoS Consensus</h3>
                      <p className="text-slate-600 leading-relaxed">Delegated Proof of Stake ensures energy efficiency while maintaining security. Validators are chosen through democratic participation, creating accountability and trust.</p>
                    </div>
                    <div className="bg-purple-50 p-8 rounded-xl text-center">
                      <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-slate-900 mb-4">EVM Compatibility</h3>
                      <p className="text-slate-600 leading-relaxed">Full Ethereum Virtual Machine compatibility ensures interoperability with existing DeFi protocols while maintaining our specialized agricultural focus.</p>
                    </div>
                  </div>

                  {/* Diversified Trust Network */}
                  <div className="bg-slate-50 p-8 rounded-xl">
                    <h2 className="text-3xl font-light text-slate-900 mb-8 text-center">Diversified Trust Network</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-medium text-slate-900 mb-4">Multi-Stakeholder Governance</h3>
                        <p className="text-slate-600 leading-relaxed mb-6">Our blockchain brings together agricultural cooperatives, environmental organizations, financial institutions, and technology partners. This diversification ensures no single entity can manipulate the network.</p>
                        <ul className="space-y-3">
                          <li className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-slate-600">Agricultural cooperatives and farmers' unions</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-slate-600">Environmental certification bodies</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-slate-600">Financial institutions and impact investors</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-slate-900 mb-4">Technical Security Features</h3>
                        <p className="text-slate-600 leading-relaxed mb-6">Advanced cryptographic mechanisms ensure data integrity and prevent double-counting or manipulation of carbon credits and agricultural certifications.</p>
                        <ul className="space-y-3">
                          <li className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-slate-600">Immutable audit trails for all transactions</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-slate-600">Smart contract validation of sustainability metrics</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-slate-600">Cryptographic proof of agricultural practices</span>
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
                  
                  {/* Server Rack Image at top */}
                  <div className="relative mb-16">
                    <img 
                      src={serverRack} 
                      alt="Swiss data center server infrastructure powered by renewable energy"
                      className="rounded-xl shadow-lg w-full h-64 object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                      <Leaf className="text-green-700 h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-light text-slate-900 mb-8">
                      {t('co2-neutral-title')}
                    </h2>
                    <div className="space-y-6 max-w-4xl mx-auto">
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {t('co2-neutral-paragraph1')}
                      </p>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {t('co2-neutral-paragraph2')}
                      </p>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {t('co2-neutral-paragraph3')}
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