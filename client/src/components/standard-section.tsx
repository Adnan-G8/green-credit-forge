import { useLanguage } from './language-provider';
import { Shield, Award, Leaf, Globe2, Users, Building2, CheckCircle } from 'lucide-react';
import { Link } from 'wouter';
import grainImage from '@assets/image_1752936515114.png';

export function StandardSection() {
  const { t } = useLanguage();

  return (
    <section id="standard" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Clean Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              {t('standard-title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light mb-8">
              {t('standard-subtitle')}
            </p>
            
            {/* Read More Button */}
            <div className="text-center">
              <Link 
                href="/co2-certification"
                className="inline-flex items-center px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                {t('standard-read-more')}
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Professional Two-Column Layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Content Side */}
            <div className="space-y-8">
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                <h3 className="text-2xl font-medium text-slate-900 mb-6">
                  {t('standard-certifications-title')}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="text-emerald-700 h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">
                        {t('standard-iso-title')}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {t('standard-iso-description')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="text-blue-700 h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">
                        {t('standard-eufd-title')}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {t('standard-eufd-description')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Leaf className="text-amber-700 h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">
                        {t('standard-sustainability-title')}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {t('standard-sustainability-description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Agricultural Image with Overlay - Matching Left Container Height */}
            <div className="relative h-full">
              <div className="relative overflow-hidden rounded-xl shadow-lg h-full">
                <img
                  src={grainImage}
                  alt="Wheat fields - sustainable agriculture and grain production"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">
                      {t('standard-excellence-title')}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">
                      {t('standard-excellence-description')}
                    </p>
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <Shield className="h-3 w-3 text-emerald-700" />
                        <span className="text-slate-700">{t('standard-eu-certified')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Globe2 className="h-3 w-3 text-blue-700" />
                        <span className="text-slate-700">{t('standard-global-standard')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Banking-Style Process Steps */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200">
            <h3 className="text-2xl font-medium text-slate-900 mb-8 text-center">{t('standard-process-title')}</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-700 text-white rounded-lg font-semibold text-lg mb-4">
                  1
                </div>
                <h4 className="text-lg font-medium text-slate-900 mb-3">{t('standard-step1-title')}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t('standard-step1-description')}
                </p>
                {/* Connection Line */}
                <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-slate-300 -z-10"></div>
              </div>
              
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-700 text-white rounded-lg font-semibold text-lg mb-4">
                  2
                </div>
                <h4 className="text-lg font-medium text-slate-900 mb-3">{t('standard-step2-title')}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t('standard-step2-description')}
                </p>
                {/* Connection Line */}
                <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-slate-300 -z-10"></div>
              </div>
              
              <div>
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-700 text-white rounded-lg font-semibold text-lg mb-4">
                  3
                </div>
                <h4 className="text-lg font-medium text-slate-900 mb-3">{t('standard-step3-title')}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t('standard-step3-description')}
                </p>
              </div>
            </div>
          </div>

          {/* Technology & Institutional Partners Section */}
          <div className="mt-20 bg-gradient-to-br from-slate-50 to-white rounded-2xl p-12 border border-slate-200">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-light text-slate-900 mb-4">
                {t('partners-title')}
              </h3>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                {t('partners-subtitle')}
              </p>
            </div>

            {/* Institutional Partners Section */}
            <div className="mb-12">
              <h4 className="text-xl font-medium text-slate-900 mb-6 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-700 mr-3" />
                {t('partners-institutional-title')}
              </h4>
              
              {/* First Row: 3 partners */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe2 className="text-blue-700 h-6 w-6" />
                    </div>
                    <div>
                      <h5 className="font-medium text-slate-900 mb-2">{t('partners-eu-title')}</h5>
                      <p className="text-slate-600 text-sm leading-relaxed">{t('partners-eu-desc')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="text-green-700 h-6 w-6" />
                    </div>
                    <div>
                      <h5 className="font-medium text-slate-900 mb-2">{t('partners-ministry-title')}</h5>
                      <p className="text-slate-600 text-sm leading-relaxed">{t('partners-ministry-desc')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="text-amber-700 h-6 w-6" />
                    </div>
                    <div>
                      <h5 className="font-medium text-slate-900 mb-2">{t('partners-iso-uni-title')}</h5>
                      <p className="text-slate-600 text-sm leading-relaxed">{t('partners-iso-uni-desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Second Row: 2 partners centered */}
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="text-emerald-700 h-6 w-6" />
                    </div>
                    <div>
                      <h5 className="font-medium text-slate-900 mb-2">{t('partners-suolo-title')}</h5>
                      <p className="text-slate-600 text-sm leading-relaxed">{t('partners-suolo-desc')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="text-purple-700 h-6 w-6" />
                    </div>
                    <div>
                      <h5 className="font-medium text-slate-900 mb-2">{t('partners-universities-title')}</h5>
                      <p className="text-slate-600 text-sm leading-relaxed">{t('partners-universities-desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology Partners Section */}
            <div>
              <h4 className="text-xl font-medium text-slate-900 mb-6 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-emerald-700 mr-3" />
                {t('partners-tech-title')}
              </h4>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="text-blue-700 h-6 w-6" />
                    </div>
                    <div>
                      <h5 className="font-medium text-slate-900 mb-2">{t('partners-alphag8-title')}</h5>
                      <p className="text-slate-600 text-sm leading-relaxed">{t('partners-alphag8-desc')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="text-emerald-700 h-6 w-6" />
                    </div>
                    <div>
                      <h5 className="font-medium text-slate-900 mb-2">{t('partners-g8chain-title')}</h5>
                      <p className="text-slate-600 text-sm leading-relaxed">{t('partners-g8chain-desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}