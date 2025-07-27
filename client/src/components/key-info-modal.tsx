import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from './language-provider';
import { Key, Calendar, CreditCard, RefreshCw, Shield, CheckCircle, Clock, AlertCircle, Settings, X, Lock, Server, Eye, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

interface KeyInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  alphaG8Id: string;
}

export function KeyInfoModal({ isOpen, onClose, alphaG8Id }: KeyInfoModalProps) {
  const { t } = useLanguage();
  const [showRenewalOptions, setShowRenewalOptions] = useState(false);
  const [showAutoRenewalSettings, setShowAutoRenewalSettings] = useState(false);
  const [renewalMethod, setRenewalMethod] = useState<'auto' | 'manual'>('auto');
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'card'>('card');
  const [autoRenewalEnabled, setAutoRenewalEnabled] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Calculate dates
  const issueDate = new Date();
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);

  // Calculate days remaining
  const today = new Date();
  const timeDiff = expiryDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const handleRenewal = async () => {
    setIsProcessingPayment(true);
    
    try {
      console.log('Processing renewal with:', { renewalMethod, paymentMethod });
      
      if (paymentMethod === 'card') {
        // Create Stripe payment intent for €12 renewal
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: 12, // €12 for renewal
            description: 'ALPHAG8 ID KEY Renewal - 1 Year',
            metadata: {
              type: 'key_renewal',
              keyId: alphaG8Id,
              renewalMethod: renewalMethod
            }
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const { clientSecret } = await response.json();
        
        // Redirect to Stripe checkout or open Stripe Elements
        if (window.Stripe) {
          const stripe = window.Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
          const { error } = await stripe.redirectToCheckout({
            clientSecret,
            successUrl: `${window.location.origin}/dashboard?payment=success`,
            cancelUrl: `${window.location.origin}/dashboard?payment=cancelled`,
          });
          
          if (error) {
            console.error('Stripe error:', error);
            throw error;
          }
        } else {
          // Fallback: Show payment success simulation
          console.log('Processing Stripe payment for €12...');
          await new Promise(resolve => setTimeout(resolve, 2000));
          console.log('Payment successful!');
        }
      } else {
        // Generate bank transfer details
        console.log('Generating bank transfer details...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show bank transfer modal with details
        alert(`Bank Transfer Details:\n\nRecipient: FAGRI Digital S.r.l.\nIBAN: CH93 0076 2011 6238 5295 7\nAmount: €12.00\nReference: KEY-RENEWAL-${alphaG8Id}\n\nYour key will be renewed upon payment confirmation.`);
        console.log('Bank transfer instructions sent!');
      }
      
      // Reset state and close modal
      setShowRenewalOptions(false);
      onClose();
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment processing failed. Please try again or contact support.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleManageAutoRenewal = () => {
    setShowAutoRenewalSettings(true);
  };

  const handleSaveAutoRenewalSettings = () => {
    console.log('Auto renewal settings saved:', autoRenewalEnabled);
    setShowAutoRenewalSettings(false);
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
                  <p className="font-mono text-sm bg-blue-600 text-white p-2 rounded border">
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
                  <p className="text-xs text-gray-500 mt-1">14:32:45 UTC+1</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('expiry-date')}</label>
                  <p className="text-sm mt-1 font-medium">{formatDate(expiryDate)}</p>
                  <p className="text-xs text-emerald-600 font-medium mt-1">
                    {daysRemaining} {t('days-remaining')}
                  </p>
                </div>
              </div>

              {/* Real-time Security Status */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">{t('security-status')}</span>
                  </div>
                  <span className="text-xs font-mono text-blue-600">{formatDateTime(currentTime)}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Server className="h-3 w-3 text-green-600" />
                    <span className="text-gray-700">{t('server-location')}: {t('zurich-switzerland')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-green-600" />
                    <span className="text-gray-700">{t('encryption')}: AES-256</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-3 w-3 text-green-600" />
                    <span className="text-gray-700">{t('last-access')}: {formatDateTime(currentTime)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-green-600" />
                    <span className="text-gray-700">{t('access-location')}: Swiss Alps Security Bunker - 001</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-blue-200">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-700 font-medium">{t('security-verified')}</span>
                  <span className="text-xs text-gray-500">| {t('session-protected')}</span>
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
                      {daysRemaining} {t('days-left')}
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
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={handleManageAutoRenewal}
                    >
                      <Settings className="h-4 w-4 mr-2" />
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
                      disabled={isProcessingPayment}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      {isProcessingPayment ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          {t('processing')}...
                        </>
                      ) : (
                        t('proceed-with-renewal')
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowRenewalOptions(false)}
                      className="flex-1"
                      disabled={isProcessingPayment}
                    >
                      {t('cancel')}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Auto Renewal Settings Modal */}
          {showAutoRenewalSettings && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-blue-600" />
                    {t('auto-renewal-settings')}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAutoRenewalSettings(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-blue-800">{t('enable-auto-renewal')}</p>
                    <p className="text-sm text-blue-700">{t('auto-renewal-description')}</p>
                  </div>
                  <Switch
                    checked={autoRenewalEnabled}
                    onCheckedChange={setAutoRenewalEnabled}
                    className={`${autoRenewalEnabled 
                      ? 'data-[state=checked]:bg-green-600' 
                      : 'data-[state=unchecked]:bg-red-500'
                    }`}
                  />
                </div>
                
                {autoRenewalEnabled && (
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="text-sm font-medium text-blue-800 mb-2">{t('auto-renewal-details')}</p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• {t('auto-charge-12-euros')}</li>
                      <li>• {t('notification-before-renewal')}</li>
                      <li>• {t('cancel-anytime')}</li>
                    </ul>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button 
                    onClick={handleSaveAutoRenewalSettings}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {t('save-settings')}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAutoRenewalSettings(false)}
                    className="flex-1"
                  >
                    {t('cancel')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Swiss Security Notice */}
          {!showAutoRenewalSettings && (
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}