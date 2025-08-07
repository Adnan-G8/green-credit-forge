
import { useLanguage } from './language-provider';
import { Shield, Lock, Key } from 'lucide-react';

export function SecurityMainSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            {t('security-title') || 'Enterprise Security'}
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed mb-12">
            {t('security-description') || 'Bank-level security protocols protecting your digital assets.'}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Protected</h3>
              <p className="text-slate-300">Advanced encryption protocols</p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure</h3>
              <p className="text-slate-300">Multi-layer security architecture</p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <Key className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Authenticated</h3>
              <p className="text-slate-300">Unique digital identity system</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
