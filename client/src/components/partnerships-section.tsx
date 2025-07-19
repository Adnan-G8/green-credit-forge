import { useLanguage } from './language-provider';
import { Flag, Building, Zap, Shield, Globe, GraduationCap } from 'lucide-react';

export function PartnershipsSection() {
  const { t } = useLanguage();

  const partners = [
    {
      icon: Flag,
      title: t('partner1-title'),
      description: t('partner1-description'),
      delay: '0s'
    },
    {
      icon: Building,
      title: t('partner2-title'),
      description: t('partner2-description'),
      delay: '0.1s'
    },
    {
      icon: Zap,
      title: t('partner3-title'),
      description: t('partner3-description'),
      delay: '0.2s'
    },
    {
      icon: Shield,
      title: t('partner4-title'),
      description: t('partner4-description'),
      delay: '0.3s'
    },
    {
      icon: Globe,
      title: t('partner5-title'),
      description: t('partner5-description'),
      delay: '0.4s'
    },
    {
      icon: GraduationCap,
      title: 'Università Italiane',
      description: 'Collaborazioni con importanti università per garantire la solidità scientifica dei nostri standard.',
      delay: '0.5s'
    }
  ];

  return (
    <section id="partnerships" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-fagri-green mb-6 font-sans animate-slide-up">
              {t('partnerships-title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in">
              {t('partnerships-subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="glass-dark rounded-xl p-6 text-center animate-scale-in hover:scale-105 transition-all duration-300"
                style={{ animationDelay: partner.delay }}
              >
                <div className="w-16 h-16 bg-fagri-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <partner.icon className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-fagri-green mb-4">
                  {partner.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>

          <div className="glass-dark rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-fagri-green mb-4">
              Garanzie di Qualità
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              {t('partnerships-guarantee')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
