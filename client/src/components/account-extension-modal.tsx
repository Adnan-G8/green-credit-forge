import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/components/language-provider';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Building, Download, Check, Calendar, Euro, Clock, ArrowLeft, User, Lock, AlertCircle } from 'lucide-react';
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

interface CreditCardForm {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingAddress: string;
  billingCity: string;
  billingPostal: string;
}

interface BankTransferForm {
  accountHolderName: string;
  iban: string;
  bankName: string;
  transferReference: string;
}

export function AccountExtensionModal({ isOpen, onClose, currentExpiryDate, fagriId }: AccountExtensionModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'selection' | 'card-form' | 'bank-form' | 'processing' | 'receipt'>('selection');
  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);
  const [cardForm, setCardForm] = useState<CreditCardForm>({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    billingCity: '',
    billingPostal: ''
  });
  const [bankForm, setBankForm] = useState<BankTransferForm>({
    accountHolderName: '',
    iban: '',
    bankName: '',
    transferReference: `FAGRI-EXT-${fagriId}-${Date.now()}`
  });

  const extensionPrice = 12; // €12 per year for extension
  const vatRate = 0.22; // 22% Italian VAT
  const vatAmount = extensionPrice * vatRate;
  const totalAmount = extensionPrice + vatAmount;

  const handlePaymentMethodSelection = (method: 'card' | 'bank') => {
    if (method === 'card') {
      setCurrentStep('card-form');
    } else {
      setCurrentStep('bank-form');
    }
  };

  const validateCardForm = (): boolean => {
    const { cardholderName, cardNumber, expiryDate, cvv } = cardForm;
    return cardholderName.trim() !== '' && 
           cardNumber.replace(/\s/g, '').length === 16 && 
           expiryDate.length === 5 && 
           cvv.length >= 3;
  };

  const validateBankForm = (): boolean => {
    const { accountHolderName, iban } = bankForm;
    return accountHolderName.trim() !== '' && iban.trim() !== '';
  };

  const processCardPayment = async () => {
    if (!validateCardForm()) {
      toast({
        title: t('validation-error'),
        description: t('please-fill-required-fields'),
        variant: "destructive"
      });
      return;
    }

    setCurrentStep('processing');
    setProcessing(true);

    // Simulate card payment processing
    setTimeout(() => {
      const newExpiryDate = new Date(new Date(currentExpiryDate).getTime() + 365 * 24 * 60 * 60 * 1000);
      const paymentReceipt: PaymentReceipt = {
        receiptId: `RCP-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        date: new Date().toLocaleDateString(),
        amount: totalAmount,
        paymentMethod: `Credit Card (**** ${cardForm.cardNumber.slice(-4)})`,
        service: 'FAGRI ID KEY Annual Extension',
        newExpiryDate: newExpiryDate.toLocaleDateString()
      };

      setReceipt(paymentReceipt);
      setProcessing(false);
      setCurrentStep('receipt');

      toast({
        title: t('payment-successful-ext'),
        description: t('account-extended-successfully'),
      });
    }, 3000);
  };

  const processBankTransfer = async () => {
    if (!validateBankForm()) {
      toast({
        title: t('validation-error'),
        description: t('please-fill-required-fields'),
        variant: "destructive"
      });
      return;
    }

    setCurrentStep('processing');
    setProcessing(true);

    // Bank transfer requires manual activation
    setTimeout(() => {
      const paymentReceipt: PaymentReceipt = {
        receiptId: `BTR-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        date: new Date().toLocaleDateString(),
        amount: totalAmount,
        paymentMethod: 'Bank Transfer (Pending Manual Verification)',
        service: 'FAGRI ID KEY Annual Extension',
        newExpiryDate: 'Pending Payment Verification'
      };

      setReceipt(paymentReceipt);
      setProcessing(false);
      setCurrentStep('receipt');

      toast({
        title: t('bank-transfer-submitted'),
        description: t('manual-activation-required'),
        variant: "default"
      });
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
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

  if (currentStep === 'receipt' && receipt) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-white z-10 pb-4 border-b border-slate-200">
          <DialogTitle className="flex items-center gap-2 text-2xl font-light text-slate-900">
            <Clock className="h-6 w-6 text-green-600" />
            {t('extend-account')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Current Status */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
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
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
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
            <div className="mt-3 p-2 bg-blue-100 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>{t('pricing-note')}:</strong> {t('first-time-creation-fee')} (€5) {t('only-applies-initial')}. 
                {t('extensions-cost')} €12 {t('per-year')} + VAT.
              </p>
            </div>
          </div>

          {/* Step Content */}
          {currentStep === 'selection' && (
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <h4 className="font-semibold text-slate-900 mb-4">
                {t('select-payment-method-ext')}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => handlePaymentMethodSelection('card')}
                  className="h-auto p-6 bg-green-600 hover:bg-green-700 text-white flex flex-col items-center gap-3"
                >
                  <CreditCard className="h-8 w-8" />
                  <div className="text-center">
                    <div className="font-semibold">{t('credit-card')}</div>
                    <div className="text-sm opacity-90">{t('instant-payment')}</div>
                  </div>
                </Button>

                <Button
                  onClick={() => handlePaymentMethodSelection('bank')}
                  variant="outline"
                  className="h-auto p-6 border-2 border-slate-300 hover:border-slate-400 flex flex-col items-center gap-3"
                >
                  <Building className="h-8 w-8 text-slate-600" />
                  <div className="text-center">
                    <div className="font-semibold text-slate-900">{t('bank-transfer-payment')}</div>
                    <div className="text-sm text-slate-600">{t('traditional-payment')}</div>
                  </div>
                </Button>
              </div>
            </div>
          )}

          {/* Credit Card Form */}
          {currentStep === 'card-form' && (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-green-600" />
                    {t('credit-card-details')}
                  </h4>
                  <Button
                    onClick={() => setCurrentStep('selection')}
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {t('back')}
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="cardholderName">{t('cardholder-name')} *</Label>
                    <Input
                      id="cardholderName"
                      type="text"
                      value={cardForm.cardholderName}
                      onChange={(e) => setCardForm({...cardForm, cardholderName: e.target.value})}
                      placeholder={t('enter-cardholder-name')}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">{t('card-number')} *</Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      value={formatCardNumber(cardForm.cardNumber)}
                      onChange={(e) => setCardForm({...cardForm, cardNumber: e.target.value.replace(/\s/g, '')})}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">{t('expiry-date')} *</Label>
                      <Input
                        id="expiryDate"
                        type="text"
                        value={formatExpiryDate(cardForm.expiryDate)}
                        onChange={(e) => setCardForm({...cardForm, expiryDate: e.target.value.replace(/[^\d]/g, '')})}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">{t('cvv-code')} *</Label>
                      <Input
                        id="cvv"
                        type="text"
                        value={cardForm.cvv}
                        onChange={(e) => setCardForm({...cardForm, cvv: e.target.value.replace(/[^\d]/g, '')})}
                        placeholder="123"
                        maxLength={4}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="billingAddress">{t('billing-address')}</Label>
                    <Input
                      id="billingAddress"
                      type="text"
                      value={cardForm.billingAddress}
                      onChange={(e) => setCardForm({...cardForm, billingAddress: e.target.value})}
                      placeholder={t('enter-billing-address')}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="billingCity">{t('city')}</Label>
                      <Input
                        id="billingCity"
                        type="text"
                        value={cardForm.billingCity}
                        onChange={(e) => setCardForm({...cardForm, billingCity: e.target.value})}
                        placeholder={t('enter-city')}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="billingPostal">{t('postal-code')}</Label>
                      <Input
                        id="billingPostal"
                        type="text"
                        value={cardForm.billingPostal}
                        onChange={(e) => setCardForm({...cardForm, billingPostal: e.target.value})}
                        placeholder="00100"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">{t('name-verification-required')}</p>
                      <p className="text-xs text-amber-700 mt-1">
                        {t('cardholder-name-must-match-account')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-4">
                  <Button
                    onClick={processCardPayment}
                    disabled={!validateCardForm()}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    {t('process-payment')} €{totalAmount.toFixed(2)}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Bank Transfer Form */}
          {currentStep === 'bank-form' && (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    {t('bank-transfer-details')}
                  </h4>
                  <Button
                    onClick={() => setCurrentStep('selection')}
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {t('back')}
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="accountHolderName">{t('account-holder-name')} *</Label>
                    <Input
                      id="accountHolderName"
                      type="text"
                      value={bankForm.accountHolderName}
                      onChange={(e) => setBankForm({...bankForm, accountHolderName: e.target.value})}
                      placeholder={t('enter-account-holder-name')}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="iban">{t('iban-number')} *</Label>
                    <Input
                      id="iban"
                      type="text"
                      value={bankForm.iban}
                      onChange={(e) => setBankForm({...bankForm, iban: e.target.value.toUpperCase()})}
                      placeholder="IT60 X054 2811 1010 0000 0123 456"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bankName">{t('bank-name')}</Label>
                    <Input
                      id="bankName"
                      type="text"
                      value={bankForm.bankName}
                      onChange={(e) => setBankForm({...bankForm, bankName: e.target.value})}
                      placeholder={t('enter-bank-name')}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="transferReference">{t('transfer-reference')}</Label>
                    <Input
                      id="transferReference"
                      type="text"
                      value={bankForm.transferReference}
                      readOnly
                      className="mt-1 bg-slate-50"
                    />
                    <p className="text-xs text-slate-600 mt-1">{t('reference-auto-generated')}</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">{t('bank-transfer-instructions')}</h5>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p><strong>{t('recipient')}:</strong> FAGRI DIGITAL S.r.l.</p>
                    <p><strong>{t('amount')}:</strong> €{totalAmount.toFixed(2)}</p>
                    <p><strong>{t('reference')}:</strong> {bankForm.transferReference}</p>
                    <p><strong>IBAN:</strong> IT60 X054 2811 1010 0000 0123 456</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">{t('manual-activation-notice')}</p>
                      <p className="text-xs text-amber-700 mt-1">
                        {t('bank-transfer-manual-verification')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-4">
                  <Button
                    onClick={processBankTransfer}
                    disabled={!validateBankForm()}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Building className="h-4 w-4 mr-2" />
                    {t('submit-bank-transfer')}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Processing Screen */}
          {currentStep === 'processing' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-yellow-800">
                <div className="animate-spin h-6 w-6 border-3 border-yellow-600 border-t-transparent rounded-full" />
                <span className="font-medium text-lg">{t('processing-payment')}</span>
              </div>
              <p className="text-sm text-yellow-700 mt-2">{t('please-wait-payment')}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}