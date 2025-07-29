import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';
import { Euro, FileText, Download } from 'lucide-react';

interface CertificationPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CertificationPricingModal({ isOpen, onClose }: CertificationPricingModalProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-light text-slate-900">
            <Euro className="h-6 w-6 text-emerald-600" />
            {t('certification-pricing-structure')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 p-6">
          {/* Environmental Compensation Projects */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-slate-900">{t('environmental-compensation-projects')}</h3>
                <p className="text-slate-600">{t('carbon-credit-creation-fees')}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-medium text-slate-700">{t('price-per-hectare')}</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">{t('project-size-hectares')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium text-emerald-700">€ 10,00/ha + IVA 22%</td>
                    <td className="py-3 px-4 text-slate-600">{t('up-to-1000-hectares')}</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium text-emerald-700">€ 5,00/ha + IVA 22%</td>
                    <td className="py-3 px-4 text-slate-600">{t('1001-to-10000-hectares')}</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium text-emerald-700">€ 2,50/ha + IVA 22%</td>
                    <td className="py-3 px-4 text-slate-600">{t('10001-to-100000-hectares')}</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium text-emerald-700">€ 0,50/ha + IVA 22%</td>
                    <td className="py-3 px-4 text-slate-600">{t('100001-to-1000000-hectares')}</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium text-emerald-700">€ 0,25/ha + IVA 22%</td>
                    <td className="py-3 px-4 text-slate-600">{t('over-1000000-hectares')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Renewable Energy Projects */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-slate-900">{t('renewable-energy-projects')}</h3>
                <p className="text-slate-600">{t('renewable-carbon-credit-fees')}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-medium text-slate-700">{t('price-per-kw')}</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">{t('project-size-kw')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium text-blue-700">€ 10,00/kW + IVA 22%</td>
                    <td className="py-3 px-4 text-slate-600">{t('up-to-1000-kw')}</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium text-blue-700">€ 5,00/kW + IVA 22%</td>
                    <td className="py-3 px-4 text-slate-600">{t('1001-to-10000-kw')}</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium text-blue-700">€ 2,50/kW + IVA 22%</td>
                    <td className="py-3 px-4 text-slate-600">{t('10001-to-100000-kw')}</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium text-blue-700">€ 0,50/kW + IVA 22%</td>
                    <td className="py-3 px-4 text-slate-600">{t('over-100000-kw')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAGRI Platform ID Costs */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-slate-900">{t('blockchain-account-costs')}</h3>
                <p className="text-slate-600">FAGRI Platform ID Registration Costs</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Individual Accounts */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="text-lg font-medium text-blue-900 mb-4">{t('individual-accounts')}</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-800 font-medium">{t('total-opening-cost-individual')}</span>
                  </div>
                  <div className="bg-white border border-blue-200 rounded-lg p-4 space-y-2">
                    <p className="text-blue-700">{t('one-time-registration-fee')}</p>
                    <p className="text-blue-700">{t('monthly-usage-fee-individual')}</p>
                    <p className="text-sm text-blue-600 mt-2">{t('individual-fee-coverage')}</p>
                    <p className="text-sm text-blue-600 font-medium">{t('from-second-year-individual')}</p>
                    <p className="text-xs text-blue-500 italic">{t('collaborators-need-id')}</p>
                  </div>
                </div>
              </div>

              {/* Corporate Accounts */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h4 className="text-lg font-medium text-green-900 mb-4">{t('corporate-accounts')}</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-green-800 font-medium">{t('total-opening-cost-corporate')}</span>
                  </div>
                  <div className="bg-white border border-green-200 rounded-lg p-4 space-y-2">
                    <p className="text-green-700">{t('corporate-registration-fee')}</p>
                    <p className="text-green-700">{t('monthly-usage-fee-corporate')}</p>
                    <p className="text-sm text-green-600 mt-2">{t('corporate-fee-coverage')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h4 className="font-medium text-slate-900 mb-4">{t('payment-information')}</h4>
            <div className="space-y-3 text-sm text-slate-600">
              <p>{t('payment-method-bank-transfer')}</p>
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">{t('company-name')}:</span>
                    <br />FAGRI DIGITAL S.r.l.
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">{t('address')}:</span>
                    <br />Via Isonzo n. 38 – 00198 Roma
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Email:</span>
                    <br />Contact@fagri.digital
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">PEC:</span>
                    <br />fagridigital@legalmail.it
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download Official Tariff */}
          <div className="text-center">
            <Button
              onClick={() => {
                // Download the official tariff PDF
                window.open('/assets/TARIFFE_ONERI_ISTRUTTORI_FAGRI_DIGITAL.pdf', '_blank');
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 mx-auto"
            >
              <Download className="h-4 w-4" />
              {t('download-official-tariff')}
            </Button>
          </div>

          {/* Close Button */}
          <div className="text-center pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="px-8 py-2 rounded-xl"
            >
              {t('close')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}