import { useLanguage } from './language-provider';
import { Sprout, Factory, TrendingUp, Globe, Leaf, Zap, Award, Database } from 'lucide-react';

export default function OpportunitiesSection() {
  const { t } = useLanguage();

  return (
    <section id="opportunities" className="py-8 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-6 leading-tight">
              {t('opportunities-title')}
            </h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mb-8"></div>
            <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
              {t('opportunities-subtitle')}
            </p>
          </div>

          {/* What Are Carbon Credits Section */}
          <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-2xl p-8 mb-12 text-white">
            <div className="text-center mb-8">
              <div className="inline-flex p-3 bg-emerald-500 rounded-full mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-light mb-4">
                {t('opportunities-credits-title')}
              </h3>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-lg leading-relaxed text-emerald-100">
                {t('opportunities-credits-definition')}
              </p>
              
              <p className="text-lg leading-relaxed text-slate-200">
                {t('opportunities-credits-origin')}
              </p>
              
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center mb-4">
                  <Database className="h-6 w-6 text-emerald-400 mr-3" />
                  <h4 className="text-xl font-medium text-emerald-400">FAGRI.Digital Process</h4>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {t('opportunities-fagri-process')}
                </p>
              </div>
            </div>
          </div>

          {/* Paris Agreement Context */}
          <div className="bg-slate-50 rounded-2xl p-8 mb-12 border border-slate-100">
            <div className="flex items-start space-x-4 mb-6">
              <div className="p-3 bg-emerald-100 rounded-full">
                <Globe className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-slate-900 mb-2">Paris Agreement 2015</h3>
                <p className="text-slate-600">194 countries committed to climate neutrality by 2050</p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            
            {/* Agricultural & Agroforestry Companies */}
            <div className="group">
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-emerald-500 rounded-2xl mr-4">
                    <Sprout className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-medium text-slate-900">
                    {t('opportunities-agricultural-title')}
                  </h3>
                </div>
                
                <p className="text-slate-700 leading-relaxed mb-6">
                  {t('opportunities-agricultural-description')}
                </p>

                {/* Key Features */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Leaf className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-slate-600">{t('opportunities-carbon-farming')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-slate-600">{t('opportunities-co2-sequestration')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-slate-600">{t('opportunities-market-voluntary')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Factory className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-slate-600">Multi-year Projects</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Energy Companies */}
            <div className="group">
              <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-8 border border-blue-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-blue-500 rounded-2xl mr-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-medium text-slate-900">
                    {t('opportunities-energy-title')}
                  </h3>
                </div>
                
                <p className="text-slate-700 leading-relaxed mb-6">
                  {t('opportunities-energy-description')}
                </p>

                {/* Key Features */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-slate-600">Renewable Energy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-slate-600">CO₂ Avoidance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-slate-600">{t('opportunities-market-voluntary')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Factory className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-slate-600">{t('opportunities-market-regulated')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Market Types */}
          <div className="bg-slate-900 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-light text-white mb-8">{t('opportunities-markets-title')}</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
                <h4 className="text-lg font-medium text-emerald-400 mb-2">{t('opportunities-market-voluntary')}</h4>
                <p className="text-slate-300 text-sm">{t('opportunities-market-voluntary-desc')}</p>
              </div>
              <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
                <h4 className="text-lg font-medium text-blue-400 mb-2">{t('opportunities-market-regulated')}</h4>
                <p className="text-slate-300 text-sm">{t('opportunities-market-regulated-desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}