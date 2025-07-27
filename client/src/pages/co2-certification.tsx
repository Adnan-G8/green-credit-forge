import { useLanguage } from '../components/language-provider';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { Shield, Globe, CheckCircle, Users, FileText, Lock } from 'lucide-react';

export default function CO2Certification() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              CO₂ Certification
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed font-light">
              Certification system for carbon credits
            </p>
          </div>
        </div>
      </section>

      {/* Trusted Partner Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-light text-slate-900 mb-6">
              Your Trusted Partner for CO₂ Certification
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              On the FAGRI.Digital platform, CO₂ certification is built on a foundation of scientific rigour, cutting-edge technology, and robust legal compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Collaborative Framework */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-light text-slate-900 mb-6">
              Our Collaborative Framework
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our CO₂ certification process operates under the EUFD2025-001 standard, developed over years of research with prominent Italian universities and our technology partner, ALPHAG8 Digital Solutions Switzerland.
            </p>
          </div>
        </div>
      </section>

      {/* Regulatory Framework */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 mb-12">
              <h2 className="text-3xl font-light text-slate-900 mb-6">
                Regulatory Framework
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our certification system complies with the most rigorous international standards
              </p>
            </div>
            
            {/* Partners Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="text-blue-700 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 mb-2">European Commission</h3>
                    <p className="text-slate-600 text-sm">Official partnership with European institutions</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="text-green-700 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 mb-2">Ministry of Environment</h3>
                    <p className="text-slate-600 text-sm">Collaboration with the Italian government</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-amber-700 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 mb-2">GSE - Energy Services Manager</h3>
                    <p className="text-slate-600 text-sm">Partnership with the national energy authority</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="text-purple-700 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 mb-2">ISO Standards</h3>
                    <p className="text-slate-600 text-sm">Compliance with international standards</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="text-emerald-700 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 mb-2">Universities</h3>
                    <p className="text-slate-600 text-sm">Collaboration with academic institutions</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock className="text-cyan-700 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 mb-2">SUOLO E SALUTE</h3>
                    <p className="text-slate-600 text-sm">Organic certification body</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional detailed partner information */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-lg p-8 border border-slate-200">
              <h3 className="text-xl font-medium text-slate-900 mb-4">European Commission</h3>
              <p className="text-slate-600 leading-relaxed">
                Aligning with overarching EU climate policies and goals.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 border border-slate-200">
              <h3 className="text-xl font-medium text-slate-900 mb-4">Italian Ministry of Environment</h3>
              <p className="text-slate-600 leading-relaxed">
                Ensuring compliance with national environmental regulations.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 border border-slate-200">
              <h3 className="text-xl font-medium text-slate-900 mb-4">GSE (Gestore dei Sistemi Energetici)</h3>
              <p className="text-slate-600 leading-relaxed">
                Integrating with established energy and emissions management frameworks.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 border border-slate-200">
              <h3 className="text-xl font-medium text-slate-900 mb-4">ISO (International Organization for Standardization)</h3>
              <p className="text-slate-600 leading-relaxed">
                Upholding globally recognized quality and procedural benchmarks.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 border border-slate-200">
              <h3 className="text-xl font-medium text-slate-900 mb-4">Università degli Studi di Viterbo La Tuscia</h3>
              <p className="text-slate-600 leading-relaxed">
                Scientific partnership with this leading Italian university for research and validation of our EUFD2025-001 certification methodologies.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 border border-slate-200">
              <h3 className="text-xl font-medium text-slate-900 mb-4">SUOLO E SALUTE</h3>
              <p className="text-slate-600 leading-relaxed">
                Our dedicated certification body for independent verification and validation.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}