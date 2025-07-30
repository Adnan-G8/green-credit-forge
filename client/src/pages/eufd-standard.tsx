import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { CheckCircle, Shield, Globe, Users, Download, Lock, FileCheck } from 'lucide-react';
import { Link } from 'wouter';
import italianGovernment from '@assets/image_1753122095811.png';

export default function EufdStandardPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-light text-slate-900 mb-6">
              The EUFD2025-001 Standard
            </h1>
            <p className="text-xl text-slate-600 mb-8 font-light">
              Scientific, concrete, accessible.
            </p>
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full border border-emerald-200">
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">Global Pioneer Standard</span>
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
              <div className="absolute bottom-4 left-4 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                Italian government building representing official EUFD2025-001 standard backing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Pioneers from Italy to the World: Our Blockchain Standard for CO₂ Certificates */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-6">
                Pioneers from Italy to the World: Our Blockchain Standard for CO₂ Certificates
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                At FAGRI.Digital, we are proud to present our new innovative standard: EUFD2025-001. This standard is the result of years of intensive research and development, based on the latest scientific discoveries and created in close collaboration with leading Italian universities.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                The FAGRI Digital platform that supports the EUFD2025-001 standard is designed to usher in a new era of trust, efficiency and transparency in CO₂ certification and trading — powered by blockchain technology, advanced data protection protocols and 3FA security architecture.
              </p>
            </div>

            {/* EUFD2025-001: Scientific, Transparent, Accessible and Secure with Blockchain */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-8">
                EUFD2025-001: Scientific, Transparent, Accessible and Secure with Blockchain
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                The EUFD2025-001 standard represents a groundbreaking approach to agricultural CO₂ certification, combining rigorous scientific methodology with cutting-edge blockchain technology. Developed through extensive collaboration with leading European research institutions and validated by independent certification bodies, this standard ensures that every carbon credit issued is scientifically sound, completely transparent, and legally compliant.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our comprehensive framework addresses the growing need for standardized, verifiable carbon accounting in agriculture while maintaining the flexibility to accommodate diverse farming systems across Europe and beyond.
              </p>
            </div>

            {/* EUFD2025-001 Standard Available Now */}
            <div className="mb-16">
              <div className="bg-white rounded-xl p-8 border border-slate-200 text-center">
                <h3 className="text-2xl font-light text-slate-900 mb-4">
                  EUFD2025-001 Standard Available Now
                </h3>
                <p className="text-slate-600 mb-6">
                  Access the complete EUFD2025-001 certification standard documentation. This comprehensive guide provides detailed methodologies, technical specifications, and implementation guidelines for agricultural CO₂ certification.
                </p>
                <button className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="h-5 w-5" />
                  <span>Download Standard</span>
                </button>
              </div>
            </div>

            {/* Blockchain Technology Integration */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-8">
                Blockchain Technology Integration
              </h2>
              
              <div className="space-y-8">
                <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-200">
                  <h3 className="text-xl font-medium text-slate-900 mb-3">
                    Double-Counting Prevention
                  </h3>
                  <p className="text-slate-600">
                    Advanced cryptographic algorithms ensure each carbon credit can only be issued and traded once, eliminating fraud and double counting through immutable blockchain records.
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
                  <h3 className="text-xl font-medium text-slate-900 mb-3">
                    Greenwashing Protection
                  </h3>
                  <p className="text-slate-600">
                    Complete transparency through public blockchain verification allows stakeholders to independently verify the authenticity and environmental impact of every carbon credit.
                  </p>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-8 border border-purple-200">
                  <h3 className="text-xl font-medium text-slate-900 mb-3">
                    Clear Ownership Verification
                  </h3>
                  <p className="text-slate-600">
                    Smart contracts automatically establish and transfer ownership rights, providing legal certainty and reducing transaction costs in carbon credit markets.
                  </p>
                </div>
                
                <div className="bg-orange-50 rounded-xl p-8 border border-orange-200">
                  <h3 className="text-xl font-medium text-slate-900 mb-3">
                    Maximum Security Standards
                  </h3>
                  <p className="text-slate-600">
                    Military-grade encryption and Swiss banking-level security protocols protect all data, ensuring confidentiality while maintaining transparency where required.
                  </p>
                </div>
              </div>
            </div>

            {/* EUFD2025-001: Scientific, Transparent, Accessible and Secure with Blockchain (Second Section) */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-8">
                EUFD2025-001: Scientific, Transparent, Accessible and Secure with Blockchain
              </h2>
              
              <div className="space-y-6">
                <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Elimination of Double Counting
                  </h3>
                  <p className="text-slate-600">
                    Each certificate is unique and immutable thanks to blockchain technology.
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Prevention of Greenwashing
                  </h3>
                  <p className="text-slate-600">
                    The entire value chain is transparent and traceable.
                  </p>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Clear Ownership
                  </h3>
                  <p className="text-slate-600">
                    Digital registrations are tamper-proof and permanent.
                  </p>
                </div>
                
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Maximum Security
                  </h3>
                  <p className="text-slate-600">
                    Unique digital fingerprint and three-factor authentication (3FA).
                  </p>
                </div>
              </div>
            </div>

            {/* Complete Blockchain Transparency */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-8">
                Complete Blockchain Transparency
              </h2>
              
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 mb-8">
                <h3 className="text-xl font-medium text-slate-900 mb-4">
                  Advanced Blockchain Integration
                </h3>
                <p className="text-slate-600 mb-4">
                  Integrated blockchain technology to ensure maximum transparency and immutability of certification records
                </p>
                <p className="text-slate-600 mb-6">
                  Our platform strategically uses blockchain technology to solve the major problems of carbon credit markets: double counting, greenwashing, and lack of transparency.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-slate-700">
                  Automatic prevention of double counting through advanced cryptographic algorithms
                </p>
                <p className="text-slate-700">
                  Complete transparency with public verification of all issued carbon credits
                </p>
                <p className="text-slate-700">
                  Clear ownership and secure transfer of carbon credit rights
                </p>
              </div>
            </div>

            {/* European Regulatory Framework */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-8">
                European Regulatory Framework
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
                  <h3 className="text-xl font-medium text-slate-900 mb-4">
                    EU Regulation 3012/2024
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Full compliance with the new EU Regulation 3012/2024 for carbon certification
                  </p>
                  <h4 className="font-medium text-slate-900 mb-3">Key Regulatory Requirements</h4>
                  <ul className="space-y-2 text-slate-600">
                    <li>Mandatory use of blockchain platforms for agricultural projects</li>
                    <li>Immutable records to prevent fraud and double counting</li>
                    <li>Public transparency for independent stakeholder verification</li>
                  </ul>
                </div>

                <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-200">
                  <h3 className="text-xl font-medium text-slate-900 mb-4">
                    Integrated ISO 14064 Standards
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Complete implementation of international standards for greenhouse gas accounting
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">ISO 14064-1</h4>
                      <p className="text-sm text-slate-600">
                        Organizational level greenhouse gas inventories. Provides principles and requirements for designing, developing and managing GHG inventories.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">ISO 14064-2</h4>
                      <p className="text-sm text-slate-600">
                        Project level greenhouse gas emission reductions and removal enhancements. Focuses on quantification and reporting of emission reductions.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">ISO 14064-3</h4>
                      <p className="text-sm text-slate-600">
                        Verification and validation of greenhouse gas assertions. Provides requirements for verifying organizational or project GHG inventories.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Vision for Sustainable Agriculture */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-8">
                Our Vision for Sustainable Agriculture
              </h2>
              <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-200">
                <p className="text-lg text-slate-700 mb-4">
                  FAGRI.Digital is transforming Italian agriculture through blockchain-based CO₂ certification, creating concrete economic opportunities for farmers while contributing to European climate goals.
                </p>
                <p className="text-slate-600">
                  We guarantee transparency, security, and complete regulatory compliance for every certification project.
                </p>
              </div>
            </div>

            {/* Global Trust and Recognition */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-8">
                Global Trust and Recognition
              </h2>
              <p className="text-lg text-slate-600 mb-8 text-center">
                The EUFD2025-001 standard is internationally recognized and compatible with major carbon credit markets.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="bg-white rounded-xl p-8 border border-slate-200">
                  <div className="text-4xl font-light text-emerald-600 mb-2">110,000+</div>
                  <div className="text-slate-700">Membri della Rete</div>
                </div>
                <div className="bg-white rounded-xl p-8 border border-slate-200">
                  <div className="text-4xl font-light text-blue-600 mb-2">80,000+</div>
                  <div className="text-slate-700">Aziende Coinvolte</div>
                </div>
                <div className="bg-white rounded-xl p-8 border border-slate-200">
                  <div className="text-4xl font-light text-purple-600 mb-2">30</div>
                  <div className="text-slate-700">Anni di Esperienza</div>
                </div>
              </div>
            </div>

            {/* Join the CO₂ Certification Revolution */}
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-6">
                Join the CO₂ Certification Revolution
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Become part of the future of sustainable agriculture with Europe's most advanced blockchain certification.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  Contact Us
                </Link>
                <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                  Back to Home
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}