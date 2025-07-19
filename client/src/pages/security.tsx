import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Shield, Database, Globe, Lock, CheckCircle, Server } from 'lucide-react';

export default function Security() {
  return (
    <div className="min-h-screen bg-fagri-bg">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-8">
              Digital Security
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed font-light max-w-3xl mx-auto">
              La sicurezza e l'affidabilità della nostra infrastruttura rappresentano la base della fiducia che riponi in FAGRI Digital.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Infrastructure Overview */}
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <Server className="h-8 w-8 text-emerald-700 mr-4" />
                <h2 className="text-3xl font-light text-slate-900">
                  Our Server Infrastructure: Highest Qualification and Security for Your Data
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-600 leading-relaxed mb-6">
                  At Fagri.Digital, we place the highest value on the security and reliability of the infrastructure where your data and applications are hosted. We understand that not all data is created equal, and we've implemented a robust, multi-tiered approach to ensure optimal security and performance for every piece of information. We achieve this by exclusively collaborating with partners who distinguish themselves through industry-leading qualifications and the highest security standards.
                </p>
              </div>
            </div>

            {/* Data Classification */}
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <Database className="h-8 w-8 text-blue-700 mr-4" />
                <h2 className="text-3xl font-light text-slate-900">
                  Data Classification and Storage Strategy
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-8 border border-slate-200">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                    <Lock className="text-emerald-700 h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-900 mb-4">Premium Data Security</h3>
                  <h4 className="text-lg font-medium text-slate-700 mb-3">Swiss Data Banking Environment</h4>
                  <p className="text-slate-600 leading-relaxed">
                    All personally identifiable data (PII), including information collected during Know Your Customer (KYC) processes, banking details, and other highly sensitive financial or personal information, is exclusively stored and processed within a specialized, highly secure "Data Banking Environment" located in Switzerland. Switzerland is globally recognized for having some of the strongest and most protective data regulation standards.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-8 border border-slate-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <Globe className="text-blue-700 h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-900 mb-4">High-Availability Data</h3>
                  <h4 className="text-lg font-medium text-slate-700 mb-3">Global Distribution</h4>
                  <p className="text-slate-600 leading-relaxed">
                    For all other non-sensitive, "second-class" data—which does not fall under the strict PII or banking categories and is optimized for rapid access and high availability—we leverage a globally distributed infrastructure. This ensures that essential data is delivered with exceptional speed and resilience, optimizing your overall service experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Hardware Security */}
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <Shield className="h-8 w-8 text-purple-700 mr-4" />
                <h2 className="text-3xl font-light text-slate-900">
                  Robust Hardware and Data Center Security
                </h2>
              </div>
              <div className="bg-white rounded-xl p-8 border border-slate-200">
                <p className="text-slate-600 leading-relaxed mb-6">
                  The data centers we use for your services are secured according to the strictest global and national standards. This ensures that you benefit from:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Multi-layered Physical Security</h4>
                      <p className="text-slate-600">Access controls that restrict entry to authorized personnel, 24/7 video surveillance, and advanced intrusion detection systems physically protect the infrastructure.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Fail-safe Infrastructure</h4>
                      <p className="text-slate-600">Redundant power supply, precise climate control, and state-of-the-art fire suppression systems ensure your servers always operate optimally and your services are available without interruption.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Secure Data Disposal and Destruction</h4>
                      <p className="text-slate-600">When hardware reaches its end-of-life, all storage media undergo a rigorous multi-step data destruction process. First, data is forensically wiped using industry-standard secure data erasure software (e.g., following NIST 800-88 guidelines for media sanitization), ensuring data is irrecoverable. Only after this software-based destruction is verified, the media is then physically destroyed through shredding, crushing, or degaussing.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Strategic Geographic Redundancy</h4>
                      <p className="text-slate-600">For our globally distributed non-sensitive data, the infrastructure is spread across multiple geographic regions and availability zones to ensure maximum resilience, data durability, and continuous availability. For sensitive data, the focus is on robust redundancy within the secure Swiss Data Banking Environment.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Enterprise-Grade Network Security</h4>
                      <p className="text-slate-600">This includes advanced firewalls, Intrusion Detection/Prevention Systems (IDS/IPS), and DDoS protection mechanisms that continuously monitor and mitigate traffic threats.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <CheckCircle className="h-8 w-8 text-emerald-700 mr-4" />
                <h2 className="text-3xl font-light text-slate-900">
                  Comprehensive Certifications and Compliance
                </h2>
              </div>
              <div className="bg-white rounded-xl p-8 border border-slate-200 mb-8">
                <p className="text-slate-600 leading-relaxed mb-6">
                  The strict adherence to international security and data protection standards is confirmed by independent audits and certifications. This allows us to ensure that your data resides in an environment that meets the following audit and compliance requirements:
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'ISO/IEC 27001', desc: 'Information Security Management Systems - ISMS' },
                  { name: 'ISO/IEC 27017', desc: 'Information Security for Cloud Services' },
                  { name: 'ISO/IEC 27018', desc: 'Protection of PII in Public Clouds' },
                  { name: 'SOC 1', desc: 'Service Organization Control 1' },
                  { name: 'SOC 2 Type 2', desc: 'Comprehensive Trust Services Criteria' },
                  { name: 'SOC 3', desc: 'Public SOC 2 Overview Report' },
                  { name: 'PCI DSS Level 1', desc: 'Payment Card Industry Data Security Standard' },
                  { name: 'GDPR', desc: 'General Data Protection Regulation - EU' },
                  { name: 'DSG/DSV', desc: 'Swiss Federal Data Protection Laws' },
                  { name: 'FIPS 140-2', desc: 'Federal Information Processing Standard' },
                  { name: 'HIPAA/HITECH', desc: 'Health Insurance Portability & Accountability' },
                  { name: 'CSA STAR', desc: 'Cloud Security Alliance STAR Program' },
                  { name: 'IT-Grundschutz', desc: 'BSI Germany Security Standards' }
                ].map((cert, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 border border-slate-200">
                    <h4 className="font-medium text-slate-900 mb-2">{cert.name}</h4>
                    <p className="text-sm text-slate-600">{cert.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-8">
              <h3 className="text-2xl font-medium text-slate-900 mb-4">
                Your Data, Our Commitment
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Through these stringent measures and our intelligent data classification, Fagri.Digital ensures that your data resides on an infrastructure that meets the highest demands for security, availability, and integrity, thereby offering you the utmost confidence and protection.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}