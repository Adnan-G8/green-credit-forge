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
              {t('co2-cert-title') || 'CO₂ Certification Platform'}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed font-light">
              {t('co2-cert-subtitle') || 'Advanced blockchain-based certification system for agricultural carbon credits'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-12">
            
            {/* Collaborative Framework */}
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
              <h2 className="text-3xl font-light text-slate-900 mb-6">
                {t('co2-cert-framework-title') || 'Collaborative Certification Framework'}
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t('co2-cert-framework-description') || 'Our certification platform brings together leading agricultural cooperatives, environmental organizations, and financial institutions to create a transparent and trusted carbon credit ecosystem.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Agricultural Cooperatives</h3>
                  <p className="text-slate-600 text-sm">Direct farmer representation and expertise</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Environmental Organizations</h3>
                  <p className="text-slate-600 text-sm">Scientific validation and environmental oversight</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Financial Institutions</h3>
                  <p className="text-slate-600 text-sm">Market infrastructure and trading platforms</p>
                </div>
              </div>
            </div>

            {/* Technology Partners */}
            <div>
              <h2 className="text-3xl font-light text-slate-900 mb-8 text-center">
                {t('co2-cert-partners-title') || 'Technology & Institutional Partners'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* ALPHAG8 */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Globe className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-slate-900">ALPHAG8 Switzerland</h3>
                  </div>
                  <p className="text-slate-600 text-sm mb-3">Swiss blockchain technology provider and G8Chain infrastructure partner</p>
                  <div className="text-xs text-blue-600 font-medium">Technology Partner</div>
                </div>

                {/* EU Commission */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="font-medium text-slate-900">European Commission</h3>
                  </div>
                  <p className="text-slate-600 text-sm mb-3">Regulatory framework development and EUFD2025-001 standard oversight</p>
                  <div className="text-xs text-emerald-600 font-medium">Institutional Partner</div>
                </div>

                {/* Italian Ministry */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="font-medium text-slate-900">Italian Ministry of Agriculture</h3>
                  </div>
                  <p className="text-slate-600 text-sm mb-3">National implementation and agricultural sector coordination</p>
                  <div className="text-xs text-purple-600 font-medium">Government Partner</div>
                </div>

                {/* ISO */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-orange-600" />
                    </div>
                    <h3 className="font-medium text-slate-900">ISO Standards Organization</h3>
                  </div>
                  <p className="text-slate-600 text-sm mb-3">ISO 14064-1, 14064-2, 14064-3 compliance and certification standards</p>
                  <div className="text-xs text-orange-600 font-medium">Standards Partner</div>
                </div>

                {/* G8Chain */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Lock className="h-5 w-5 text-slate-600" />
                    </div>
                    <h3 className="font-medium text-slate-900">G8Chain Network</h3>
                  </div>
                  <p className="text-slate-600 text-sm mb-3">EVM-compatible blockchain infrastructure with 51-node validator network</p>
                  <div className="text-xs text-slate-600 font-medium">Blockchain Partner</div>
                </div>

                {/* Italian Universities */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-red-600" />
                    </div>
                    <h3 className="font-medium text-slate-900">Italian University Consortium</h3>
                  </div>
                  <p className="text-slate-600 text-sm mb-3">Research institutions providing scientific validation and methodology development</p>
                  <div className="text-xs text-red-600 font-medium">Academic Partner</div>
                </div>
              </div>
            </div>

            {/* Certification Process */}
            <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-200">
              <h2 className="text-3xl font-light text-slate-900 mb-8 text-center">
                {t('co2-cert-process-title') || 'Certification Process'}
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
                {t('co2-cert-benefits-title') || 'Platform Benefits'}
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