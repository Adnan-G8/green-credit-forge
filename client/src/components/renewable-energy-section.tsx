import { useLanguage } from './language-provider';
import { Zap, Sun, Leaf, TrendingUp, Users, Globe, Download, FileText } from 'lucide-react';
import windFarmImage from '@assets/image_1752942713929.png';
import solarImage from '@assets/image_1752942192290.png';
import eufdStandardPdf from '@assets/STANDARD DI FAGRI DIGITAL_1753380505244.pdf';

export function RenewableEnergySection() {
  const { t } = useLanguage();

  const handleDownloadStandard = () => {
    const link = document.createElement('a');
    link.href = eufdStandardPdf;
    link.download = 'FAGRI_DIGITAL_EUFD2025-001_STANDARD.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              {t('renewable-title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              {t('renewable-subtitle')}
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
                  <h4 className="font-medium text-slate-900">{t('renewable-solar')}</h4>
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
                  <h4 className="font-medium text-slate-900">{t('renewable-wind')}</h4>
                </div>
              </div>
            </div>
          </div>

          {/* FAGRI DIGITAL CERTIFICATION STANDARD Download Button */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 max-w-2xl mx-auto">
              <button
                onClick={handleDownloadStandard}
                className="inline-flex items-center px-12 py-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-bold text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-blue-500 w-full justify-center"
                style={{
                  background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #1e3a8a 100%)',
                  boxShadow: '0 10px 25px rgba(30, 64, 175, 0.3)'
                }}
              >
                <FileText className="mr-4 h-8 w-8" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black tracking-wide">
                    {t('download-eufd-standard')}
                  </span>
                  <span className="text-blue-100 text-sm font-light mt-1">
                    {t('download-standard-desc')}
                  </span>
                </div>
                <Download className="ml-4 h-8 w-8" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}