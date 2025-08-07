
import { useLanguage } from './language-provider';
import { Leaf, Sun, Wind, Battery } from 'lucide-react';

export function RenewableEnergySection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
              {t('renewable-title') || 'Renewable Energy'}
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              {t('renewable-description') || 'Powering digital transformation with sustainable energy solutions.'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Carbon Neutral</h3>
              <p className="text-slate-600">100% sustainable operations</p>
            </div>
            
            <div className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Sun className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Solar Powered</h3>
              <p className="text-slate-600">Clean energy infrastructure</p>
            </div>
            
            <div className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Wind className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Wind Energy</h3>
              <p className="text-slate-600">Renewable power sources</p>
            </div>
            
            <div className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Battery className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Energy Storage</h3>
              <p className="text-slate-600">Advanced battery systems</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
