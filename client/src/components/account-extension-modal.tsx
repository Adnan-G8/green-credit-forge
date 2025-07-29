import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Building, Download, Check, Calendar, Euro, Clock } from 'lucide-react';
import { useState } from 'react';

interface AccountExtensionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentExpiryDate: string;
  fagriId: string;
}

interface PaymentReceipt {
  receiptId: string;
  date: string;
  amount: number;
  paymentMethod: string;
  service: string;
  newExpiryDate: string;
}

export function AccountExtensionModal({ isOpen, onClose, currentExpiryDate, fagriId }: AccountExtensionModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'bank' | null>(null);
  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const extensionPrice = 12; // €12 per year for extension
  const vatRate = 0.22; // 22% Italian VAT
  const vatAmount = extensionPrice * vatRate;
  const totalAmount = extensionPrice + vatAmount;

  const handlePayment = async (method: 'card' | 'bank') => {
    setProcessing(true);
    setSelectedPayment(method);

    // Simulate payment processing
    setTimeout(() => {
      const newExpiryDate = new Date(new Date(currentExpiryDate).getTime() + 365 * 24 * 60 * 60 * 1000);
      const paymentReceipt: PaymentReceipt = {
        receiptId: `RCP-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        date: new Date().toLocaleDateString(),
        amount: totalAmount,
        paymentMethod: method === 'card' ? 'Credit Card' : 'Bank Transfer',
        service: 'ALPHAG8 ID KEY Annual Extension',
        newExpiryDate: newExpiryDate.toLocaleDateString()
      };

      setReceipt(paymentReceipt);
      setProcessing(false);
      setShowReceipt(true);

      toast({
        title: t('payment-successful-ext'),
        description: t('account-extended-successfully'),
      });
    }, 3000);
  };

  const downloadReceipt = () => {
    if (!receipt) return;

    const receiptContent = `
FAGRI DIGITAL S.r.l.
Via Isonzo 38, 00198 Roma, Italy
P.IVA: IT12345678901

═══════════════════════════════════════
           PAYMENT RECEIPT
═══════════════════════════════════════

Receipt ID: ${receipt.receiptId}
Date: ${receipt.date}
Time: ${new Date().toLocaleTimeString()}

Customer: ${fagriId}
Service: ${receipt.service}

PRICING BREAKDOWN:
Annual Extension Fee: €${extensionPrice.toFixed(2)}
VAT (22%): €${vatAmount.toFixed(2)}
Total Amount: €${receipt.amount.toFixed(2)}

Payment Method: ${receipt.paymentMethod}
Status: PAID

ACCOUNT DETAILS:
Previous Expiry: ${currentExpiryDate}
New Expiry: ${receipt.newExpiryDate}
Extension Period: 12 months

═══════════════════════════════════════
Thank you for your payment!

For support, contact: support@fagri.digital
Website: https://fagri.digital

This is an official receipt for tax purposes.
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FAGRI_Extension_Receipt_${receipt.receiptId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (showReceipt && receipt) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl font-light text-green-900">
              <Check className="h-6 w-6 text-green-600" />
              {t('payment-successful-ext')}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                {t('account-extended-successfully')}
              </h3>
              <p className="text-sm text-green-700">
                {t('new-expiry-date')}: <span className="font-semibold">{receipt.newExpiryDate}</span>
              </p>
            </div>

            {/* Receipt Details */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Euro className="h-5 w-5 text-blue-600" />
                {t('payment-receipt-ext')}
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-slate-700">{t('receipt-id-ext')}:</span>
                  <br /><span className="font-mono">{receipt.receiptId}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-700">{t('payment-date-ext')}:</span>
                  <br /><span>{receipt.date}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-700">{t('service-ext')}:</span>
                  <br /><span>{receipt.service}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-700">{t('payment-method-ext')}:</span>
                  <br /><span>{receipt.paymentMethod}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-700">{t('amount-paid-ext')}:</span>
                  <br /><span className="text-lg font-semibold text-green-600">€{receipt.amount.toFixed(2)}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-700">{t('status')}:</span>
                  <br /><span className="text-green-600 font-semibold">{t('paid-ext')}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={downloadReceipt}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                {t('download-receipt-ext')}
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="flex items-center gap-2"
              >
                {t('close')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-light text-slate-900">
            <Clock className="h-6 w-6 text-green-600" />
            {t('extend-account')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Status */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              {t('current-account-status')}
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-slate-700">{t('fagri-id-ext')}:</span>
                <br /><span className="font-mono text-blue-600">{fagriId}</span>
              </div>
              <div>
                <span className="font-medium text-slate-700">{t('current-expiry-ext')}:</span>
                <br /><span className="text-orange-600 font-semibold">{currentExpiryDate}</span>
              </div>
              <div>
                <span className="font-medium text-slate-700">{t('extension-period-ext')}:</span>
                <br /><span className="text-green-600 font-semibold">12 {t('months-ext')}</span>
              </div>
              <div>
                <span className="font-medium text-slate-700">{t('new-expiry-will-be')}:</span>
                <br /><span className="text-green-600 font-semibold">
                  {new Date(new Date(currentExpiryDate).getTime() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
              <Euro className="h-5 w-5 text-blue-600" />
              {t('pricing-breakdown')}
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-800">{t('annual-extension-fee')}:</span>
                <span className="font-mono">€{extensionPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-800">{t('vat')} (22%):</span>
                <span className="font-mono">€{vatAmount.toFixed(2)}</span>
              </div>
              <div className="border-t border-blue-200 pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-blue-900">{t('total-amount')}:</span>
                  <span className="font-mono text-blue-900">€{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>{t('pricing-note')}:</strong> {t('first-time-creation-fee')} (€5) {t('only-applies-initial')}. 
                {t('extensions-cost')} €12 {t('per-year')} + VAT.
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h4 className="font-semibold text-slate-900 mb-4">
              {t('select-payment-method')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => handlePayment('card')}
                disabled={processing}
                className="h-auto p-6 bg-green-600 hover:bg-green-700 text-white flex flex-col items-center gap-3"
              >
                {processing && selectedPayment === 'card' ? (
                  <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <CreditCard className="h-8 w-8" />
                )}
                <div className="text-center">
                  <div className="font-semibold">{t('credit-card')}</div>
                  <div className="text-sm opacity-90">{t('instant-payment')}</div>
                </div>
              </Button>

              <Button
                onClick={() => handlePayment('bank')}
                disabled={processing}
                variant="outline"
                className="h-auto p-6 border-2 border-slate-300 hover:border-slate-400 flex flex-col items-center gap-3"
              >
                {processing && selectedPayment === 'bank' ? (
                  <div className="animate-spin h-6 w-6 border-2 border-slate-600 border-t-transparent rounded-full" />
                ) : (
                  <Building className="h-8 w-8 text-slate-600" />
                )}
                <div className="text-center">
                  <div className="font-semibold text-slate-900">{t('bank-transfer-payment')}</div>
                  <div className="text-sm text-slate-600">{t('traditional-payment')}</div>
                </div>
              </Button>
            </div>
          </div>

          {processing && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-yellow-800">
                <div className="animate-spin h-4 w-4 border-2 border-yellow-600 border-t-transparent rounded-full" />
                <span className="font-medium">{t('processing-payment')}</span>
              </div>
              <p className="text-sm text-yellow-700 mt-2">{t('please-wait-payment')}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}