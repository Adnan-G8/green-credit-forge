import { useLanguage } from './language-provider';
import { Shield, Lock, Eye, CheckCircle, Database, UserCheck } from 'lucide-react';

export function SecuritySection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: "Sicurezza dei Dati",
      description: "Crittografia end-to-end e protocolli di sicurezza di livello bancario per proteggere tutte le informazioni sensibili."
    },
    {
      icon: Lock,
      title: "Accesso Controllato",
      description: "Autenticazione multi-fattore e controlli granulari per garantire l'accesso solo ad utenti autorizzati."
    },
    {
      icon: Eye,
      title: "Trasparenza Totale",
      description: "Tutti i processi di certificazione sono tracciabili e verificabili attraverso tecnologia blockchain."
    },
    {
      icon: UserCheck,
      title: "Compliance Normativa",
      description: "Piena conformità con GDPR, ISO 27001 e altri standard internazionali di sicurezza e privacy."
    }
  ];

  return (
    <section id="security" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Clean Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              {t('security-title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              {t('security-subtitle')}
            </p>
          </div>

          {/* Security Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="text-slate-700 h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-xl p-10 border border-slate-200">
            <h3 className="text-2xl font-medium text-slate-900 mb-8 text-center">
              Certificazioni e Standard
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Database className="text-blue-700 h-10 w-10" />
                </div>
                <h4 className="font-medium text-slate-900 mb-2">ISO 27001</h4>
                <p className="text-slate-600 text-sm">Gestione della Sicurezza Informatica</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-emerald-700 h-10 w-10" />
                </div>
                <h4 className="font-medium text-slate-900 mb-2">GDPR</h4>
                <p className="text-slate-600 text-sm">Protezione Dati Personali</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-amber-700 h-10 w-10" />
                </div>
                <h4 className="font-medium text-slate-900 mb-2">SOC 2</h4>
                <p className="text-slate-600 text-sm">Controlli di Sicurezza Operativa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}