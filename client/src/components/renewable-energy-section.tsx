import { useLanguage } from './language-provider';
import { Zap, Sun, Leaf, TrendingUp, Users, Globe } from 'lucide-react';
import windFarmImage from '@assets/image_1752942713929.png';
import solarImage from '@assets/image_1752942192290.png';

export function RenewableEnergySection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              Energia Rinnovabile & Sostenibilità
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              FAGRI Digital certifica crediti di carbonio sia per l'agricoltura sostenibile che per progetti di energia rinnovabile, creando un ecosistema integrato per la lotta al cambiamento climatico.
            </p>
          </div>

          {/* Clean Image Gallery - Solar and Wind */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Solar Panel Image */}
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img
                src={solarImage}
                alt="Solar panels reflecting in water at sunset"
                className="w-full h-80 object-cover"
              />
              <div className="absolute bottom-4 left-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                  <h4 className="font-medium text-slate-900">Energia Solare</h4>
                </div>
              </div>
            </div>

            {/* Wind Farm Image */}
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img
                src={windFarmImage}
                alt="Wind turbines and sheep at sunset"
                className="w-full h-80 object-cover"
              />
              <div className="absolute bottom-4 left-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                  <h4 className="font-medium text-slate-900">Energia Eolica</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}