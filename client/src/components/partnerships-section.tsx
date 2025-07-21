import { useLanguage } from './language-provider';
import { 
  Users, 
  Handshake, 
  Building, 
  Globe, 
  TrendingUp, 
  Target 
} from 'lucide-react';
import windFarmImage from '@assets/image_1752942713929.png';

export function PartnershipsSection() {
  const { t } = useLanguage();

  const partnerships = [
    {
      icon: Globe,
      title: 'European Commission',
      description: t('partnerships-eu-commission'),
    },
    {
      icon: Building,
      title: 'Italian Ministry of Environment and Energy Security',
      description: t('partnerships-italian-ministry'),
    },
    {
      icon: Users,
      title: 'GSE (Italian Energy Services Manager)',
      description: t('partnerships-gse'),
    },
    {
      icon: Target,
      title: 'Non-EU governments',
      description: t('partnerships-non-eu'),
    },
    {
      icon: Handshake,
      title: 'SUOLO E SALUTE',
      description: t('partnerships-suolo-salute'),
    },
    {
      icon: TrendingUp,
      title: 'ISO and UNI',
      description: t('partnerships-iso-uni'),
    },
  ];

  return (
    <section id="partnerships" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Clean Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              {t('partnerships-title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              {t('partnerships-subtitle')}
            </p>
          </div>

          {/* Professional Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {partnerships.map((partnership, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 border border-slate-200 hover:border-slate-300 transition-all duration-200 hover:shadow-lg"
              >
                <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mb-6">
                  <partnership.icon className="text-slate-700 h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-4">
                  {partnership.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {partnership.description}
                </p>
              </div>
            ))}
          </div>

          {/* Trust Section */}
          <div className="bg-white rounded-xl p-10 border border-slate-200 text-center">
            <h3 className="text-2xl font-medium text-slate-900 mb-6">
              {t('partnerships-network-title')}
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-3xl font-semibold text-emerald-700 mb-2">5</h4>
                <p className="text-slate-600">{t('partnerships-stat1')}</p>
              </div>
              <div>
                <h4 className="text-3xl font-semibold text-blue-700 mb-2">25+</h4>
                <p className="text-slate-600">{t('partnerships-stat2')}</p>
              </div>
              <div>
                <h4 className="text-3xl font-semibold text-amber-700 mb-2">1000+</h4>
                <p className="text-slate-600">{t('partnerships-stat3')}</p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}