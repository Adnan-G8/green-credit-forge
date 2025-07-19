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
      title: "Agricoltori e Produttori",
      description: "Rete di oltre 110.000 membri che implementano pratiche sostenibili certificate per la riduzione delle emissioni di carbonio.",
    },
    {
      icon: Building,
      title: "Istituzioni Finanziarie",
      description: "Partnership con banche e fondi di investimento per finanziare progetti di agricoltura sostenibile e crediti di carbonio.",
    },
    {
      icon: Globe,
      title: "Organizzazioni Internazionali",
      description: "Collaborazioni con enti internazionali per l'implementazione di standard globali di certificazione ambientale.",
    },
    {
      icon: Handshake,
      title: "Partner Tecnologici",
      description: "Integrazione con piattaforme di monitoraggio digitale e sistemi di tracciabilità per garantire trasparenza.",
    },
    {
      icon: TrendingUp,
      title: "Consulenti di Sostenibilità",
      description: "Rete di esperti per supportare la transizione verso pratiche agricole a basso impatto ambientale.",
    },
    {
      icon: Target,
      title: "Enti di Certificazione",
      description: "Collaborazione con organismi accreditati per la verifica e validazione dei crediti di carbonio agricoli.",
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
              La Nostra Rete Globale
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-3xl font-semibold text-emerald-700 mb-2">5</h4>
                <p className="text-slate-600">Continenti Attivi</p>
              </div>
              <div>
                <h4 className="text-3xl font-semibold text-blue-700 mb-2">25+</h4>
                <p className="text-slate-600">Paesi Partner</p>
              </div>
              <div>
                <h4 className="text-3xl font-semibold text-amber-700 mb-2">1000+</h4>
                <p className="text-slate-600">Progetti Certificati</p>
              </div>
            </div>
          </div>

          {/* Hero Image Section - Wind Farm Integration */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={windFarmImage}
              alt="Wind turbines and livestock - sustainable agriculture and renewable energy integration"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="max-w-4xl">
                <h3 className="text-3xl font-semibold text-white mb-4">
                  Agricoltura e Energia Rinnovabile in Sinergia
                </h3>
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  Il futuro dell'agricoltura sostenibile integra perfettamente allevamento tradizionale e produzione di energia pulita. I nostri partner combinano pratiche agricole certificate con impianti eolici, creando un ecosistema produttivo che genera sia alimenti che crediti di carbonio.
                </p>
                <div className="flex items-center space-x-6 text-sm text-white/80">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>+35% Reddito Agricolo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span>-60% Emissioni CO₂</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>2.800+ Aziende Partner</span>
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