import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from './language-provider';
import { Key, Calendar, CreditCard, RefreshCw, Shield, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface KeyInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  alphaG8Id: string;
}

export function KeyInfoModal({ isOpen, onClose, alphaG8Id }: KeyInfoModalProps) {
  const { t } = useLanguage();
  const [showRenewalOptions, setShowRenewalOptions] = useState(false);
  const [renewalMethod, setRenewalMethod] = useState<'auto' | 'manual'>('auto');
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'card'>('card');

  // Calculate dates
  const issueDate = new Date();
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleRenewal = () => {
    // Here would be the payment processing logic
    console.log('Processing renewal with:', { renewalMethod, paymentMethod });
    // For now, just close the modal
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Key className="h-6 w-6 text-emerald-600" />
            {t('alphag8-id-key-info')}
          </DialogTitle>
          <DialogDescription>
            {t('manage-your-key-subscription')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                {t('key-details')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('key-id')}</label>
                  <p className="font-mono text-sm bg-gray-50 p-2 rounded border">
                    FAGRI-{alphaG8Id.replace('ALPHAG8-', '')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('status')}</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {t('active')}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('issue-date')}</label>
                  <p className="text-sm mt-1">{formatDate(issueDate)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('expiry-date')}</label>
                  <p className="text-sm mt-1 font-medium">{formatDate(expiryDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-emerald-600" />
                {t('subscription-management')}
              </CardTitle>
              <CardDescription>
                {t('manage-automatic-renewal')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!showRenewalOptions ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-emerald-800">{t('annual-subscription')}</p>
                        <p className="text-sm text-emerald-600">€12 {t('per-year')}</p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-600">
                      <Clock className="h-3 w-3 mr-1" />
                      {t('expires-in-year')}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => setShowRenewalOptions(true)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      {t('renew-now')}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      {t('manage-auto-renewal')}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Renewal Options */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      {t('renewal-type')}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <button
                        onClick={() => setRenewalMethod('auto')}
                        className={`p-3 border rounded-lg text-left transition-colors ${
                          renewalMethod === 'auto' 
                            ? 'border-emerald-500 bg-emerald-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">{t('auto-renewal')}</div>
                        <div className="text-sm text-gray-600">{t('auto-renewal-desc')}</div>
                      </button>
                      <button
                        onClick={() => setRenewalMethod('manual')}
                        className={`p-3 border rounded-lg text-left transition-colors ${
                          renewalMethod === 'manual' 
                            ? 'border-emerald-500 bg-emerald-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">{t('manual-renewal')}</div>
                        <div className="text-sm text-gray-600">{t('manual-renewal-desc')}</div>
                      </button>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      {t('payment-method')}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 border rounded-lg text-left transition-colors ${
                          paymentMethod === 'card' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span className="font-medium">{t('credit-card')}</span>
                        </div>
                        <div className="text-sm text-gray-600">{t('credit-card-desc')}</div>
                      </button>
                      <button
                        onClick={() => setPaymentMethod('bank')}
                        className={`p-3 border rounded-lg text-left transition-colors ${
                          paymentMethod === 'bank' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4" />
                          <span className="font-medium">{t('bank-transfer')}</span>
                        </div>
                        <div className="text-sm text-gray-600">{t('bank-transfer-desc')}</div>
                      </button>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{t('subscription-cost')}</span>
                      <span className="font-bold text-emerald-600">€12.00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>{t('renewal-date')}</span>
                      <span>{formatDate(expiryDate)}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={handleRenewal}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      {t('proceed-with-renewal')}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowRenewalOptions(false)}
                      className="flex-1"
                    >
                      {t('cancel')}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Swiss Security Notice */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800 mb-1">{t('swiss-security-protection')}</p>
                  <p className="text-sm text-blue-700">{t('key-protected-swiss-infrastructure')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}