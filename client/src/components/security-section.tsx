import { useLanguage } from './language-provider';
import { Key, Shield, Link, Lock, Database, Eye, Gavel, Globe, Handshake } from 'lucide-react';

export function SecuritySection() {
  const { t } = useLanguage();

  return (
    <section id="security" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-fagri-green mb-6 font-sans animate-slide-up">
              {t('security-title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in">
              {t('security-intro')}
            </p>
          </div>

          {/* 3FA Section */}
          <div className="glass-dark rounded-2xl p-8 mb-12 animate-scale-in">
            <h3 className="text-2xl font-bold text-fagri-green mb-6 text-center">
              {t('security-3fa-title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('security-3fa-description')}
            </p>
            <p className="text-gray-700 leading-relaxed italic">
              {t('security-3fa-guarantee')}
            </p>
          </div>

          {/* Data Sovereignty Section */}
          <div className="glass-dark rounded-2xl p-8 mb-12 animate-scale-in">
            <h3 className="text-2xl font-bold text-fagri-green mb-6 text-center">
              {t('security-data-title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('security-data-description')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('security-data-features')}
            </p>
          </div>

          {/* Digital Integrity Section */}
          <div className="glass-dark rounded-2xl p-8 mb-12 animate-scale-in">
            <h3 className="text-2xl font-bold text-fagri-green mb-6 text-center">
              {t('security-integrity-title')}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {t('security-integrity-description')}
            </p>
          </div>

          {/* Blockchain Section */}
          <div className="glass-dark rounded-2xl p-8 mb-12 animate-scale-in">
            <h3 className="text-2xl font-bold text-fagri-green mb-6 text-center">
              {t('security-blockchain-title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('security-blockchain-intro')}
            </p>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-start space-x-3">
                <Database className="text-fagri-accent mt-1 h-5 w-5 flex-shrink-0" />
                <span>{t('security-blockchain-feature1')}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Link className="text-fagri-accent mt-1 h-5 w-5 flex-shrink-0" />
                <span>{t('security-blockchain-feature2')}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Eye className="text-fagri-accent mt-1 h-5 w-5 flex-shrink-0" />
                <span>{t('security-blockchain-feature3')}</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              {t('security-blockchain-conclusion')}
            </p>
          </div>

          {/* Regulatory Evolution Section */}
          <div className="glass-dark rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-fagri-green mb-6 text-center">
              {t('security-evolution-title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('security-evolution-intro')}
            </p>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-start space-x-3">
                <Gavel className="text-fagri-accent mt-1 h-5 w-5 flex-shrink-0" />
                <span>{t('security-evolution-ets')}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Globe className="text-fagri-accent mt-1 h-5 w-5 flex-shrink-0" />
                <span>{t('security-evolution-cbam')}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Handshake className="text-fagri-accent mt-1 h-5 w-5 flex-shrink-0" />
                <span>{t('security-evolution-integration')}</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              {t('security-evolution-objective')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
