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
      icon: Users,
      title: t('partner1-title'),
      description: t('partner1-description'),
    },
    {
      icon: Building,
      title: t('partner2-title'),
      description: t('partner2-description'),
    },
    {
      icon: Globe,
      title: t('partner3-title'),
      description: t('partner3-description'),
    },
    {
      icon: Handshake,
      title: t('partner4-title'),
      description: t('partner4-description'),
    },
    {
      icon: TrendingUp,
      title: t('partner5-title'),
      description: t('partner5-description'),
    },
    {
      icon: Target,
      title: t('partner6-title'),
      description: t('partner6-description'),
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