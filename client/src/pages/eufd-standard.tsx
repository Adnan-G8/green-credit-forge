import { useLanguage } from '../components/language-provider';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { CheckCircle, Shield, Globe, Users } from 'lucide-react';
import { Link } from 'wouter';
import italianGovernment from '@assets/image_1753122095811.png';

export default function EufdStandardPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-light text-slate-900 mb-6">
              {t('eufd-hero-title')}
            </h1>
            <p className="text-xl text-slate-600 mb-8 font-light">
              {t('eufd-hero-subtitle')}
            </p>
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full border border-emerald-200">
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{t('eufd-status')}</span>
            </div>
          </div>
          
          {/* Italian Government Building Image */}
          <div className="mt-16">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img 
                src={italianGovernment} 
                alt="Italian government building representing official EUFD2025-001 standard backing"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-6">
                {t('eufd-intro-title')}
              </h2>
              <div className="prose prose-lg text-slate-600 max-w-none">
                <p className="mb-6 leading-relaxed">
                  {t('eufd-intro-text1')}
                </p>
                <p className="mb-6 leading-relaxed">
                  {t('eufd-intro-text2')}
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                  <p className="text-slate-700 font-medium mb-2">
                    {t('eufd-launch-info')}
                  </p>
                  <p className="text-slate-600 text-sm">
                    {t('eufd-global-vision')}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-8">
                {t('eufd-features-title')}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-6 w-6 text-emerald-600 mr-3" />
                    <h3 className="text-xl font-medium text-slate-900">
                      {t('eufd-feature1-title')}
                    </h3>
                  </div>
                  <p className="text-slate-600">
                    {t('eufd-feature1-description')}
                  </p>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-medium text-slate-900">
                      {t('eufd-feature2-title')}
                    </h3>
                  </div>
                  <p className="text-slate-600">
                    {t('eufd-feature2-description')}
                  </p>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                  <div className="flex items-center mb-4">
                    <Globe className="h-6 w-6 text-purple-600 mr-3" />
                    <h3 className="text-xl font-medium text-slate-900">
                      {t('eufd-feature3-title')}
                    </h3>
                  </div>
                  <p className="text-slate-600">
                    {t('eufd-feature3-description')}
                  </p>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                  <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 text-orange-600 mr-3" />
                    <h3 className="text-xl font-medium text-slate-900">
                      {t('eufd-feature4-title')}
                    </h3>
                  </div>
                  <p className="text-slate-600">
                    {t('eufd-feature4-description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Blockchain Technology */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-6">
                {t('eufd-blockchain-title')}
              </h2>
              <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-200 mb-8">
                <div className="bg-blue-600 text-white rounded-lg p-4 mb-6">
                  <h3 className="text-xl font-medium mb-2">{t('eufd-blockchain-mandate-title')}</h3>
                  <p className="text-blue-100">
                    {t('eufd-blockchain-mandate-description')}
                  </p>
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  {t('eufd-blockchain-intro')}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t('eufd-blockchain-benefit1')}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t('eufd-blockchain-benefit2')}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{t('eufd-blockchain-benefit3')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Regulatory Framework */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-8">
                {t('eufd-regulatory-title')}
              </h2>
              
              {/* EU Regulation 3012/2024 Box */}
              <div className="bg-white rounded-xl p-8 border-2 border-blue-200 mb-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="text-blue-700 h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-medium text-slate-900 mb-3">
                      {t('eufd-eu-regulation-title')}
                    </h3>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      {t('eufd-eu-regulation-description')}
                    </p>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">{t('eufd-eu-regulation-requirements')}:</h4>
                      <ul className="space-y-2 text-sm text-blue-800">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                          <span>{t('eufd-eu-regulation-req1')}</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                          <span>{t('eufd-eu-regulation-req2')}</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                          <span>{t('eufd-eu-regulation-req3')}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* ISO Standards Box */}
              <div className="bg-white rounded-xl p-8 border-2 border-emerald-200 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="text-emerald-700 h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-medium text-slate-900 mb-3">
                      {t('eufd-iso-standards-title')}
                    </h3>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      {t('eufd-iso-standards-description')}
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-emerald-50 rounded-lg p-4">
                        <h4 className="font-medium text-emerald-900 mb-2">{t('eufd-iso-14064-1-title')}</h4>
                        <p className="text-sm text-emerald-800">
                          {t('eufd-iso-14064-1-description')}
                        </p>
                      </div>
                      
                      <div className="bg-emerald-50 rounded-lg p-4">
                        <h4 className="font-medium text-emerald-900 mb-2">{t('eufd-iso-14064-2-title')}</h4>
                        <p className="text-sm text-emerald-800">
                          {t('eufd-iso-14064-2-description')}
                        </p>
                      </div>
                      
                      <div className="bg-emerald-50 rounded-lg p-4">
                        <h4 className="font-medium text-emerald-900 mb-2">{t('eufd-iso-14064-3-title')}</h4>
                        <p className="text-sm text-emerald-800">
                          {t('eufd-iso-14064-3-description')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision and Goals */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-6">
                {t('eufd-vision-title')}
              </h2>
              <div className="prose prose-lg text-slate-600 max-w-none">
                <p className="mb-6 leading-relaxed">
                  {t('eufd-vision-text1')}
                </p>
                <p className="mb-6 leading-relaxed">
                  {t('eufd-vision-text2')}
                </p>
              </div>
            </div>

            {/* Trust and Network */}
            <div className="mb-16">
              <h2 className="text-3xl font-light text-slate-900 mb-6">
                {t('eufd-trust-title')}
              </h2>
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                <p className="text-slate-700 mb-8 leading-relaxed">
                  {t('eufd-trust-text')}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h4 className="text-3xl font-semibold text-emerald-600 mb-2">110,000+</h4>
                    <p className="text-slate-600 text-sm">{t('eufd-network-members')}</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-semibold text-blue-600 mb-2">80,000+</h4>
                    <p className="text-slate-600 text-sm">{t('eufd-network-companies')}</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-semibold text-purple-600 mb-2">30</h4>
                    <p className="text-slate-600 text-sm">{t('eufd-network-years')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-12 border border-slate-200">
              <h2 className="text-3xl font-light text-slate-900 mb-6">
                {t('eufd-cta-title')}
              </h2>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                {t('eufd-cta-text')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/#contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                  onClick={() => {
                    window.location.href = '/#contact';
                    setTimeout(() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                >
                  {t('eufd-cta-contact')}
                </a>
                <Link 
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-slate-700 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors font-medium"
                >
                  {t('eufd-cta-back')}
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