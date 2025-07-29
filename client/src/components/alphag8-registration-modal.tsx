import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from './language-provider';
import { AlphaG8IdDisplayModal } from './alphag8-id-display-modal';
import { generateAlphaG8Id } from '@shared/alphag8-id-generator';
import { X, Shield, FileText, CheckCircle, UserCheck, AlertCircle, Fingerprint, CreditCard, User, Phone } from 'lucide-react';

interface AlphaG8RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: 'sales-team' | 'fagri-member' | 'non-member';
}

export function AlphaG8RegistrationModal({ isOpen, onClose, userRole }: AlphaG8RegistrationModalProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [showIdDisplay, setShowIdDisplay] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  
  // Banking KYC Form State
  const [formData, setFormData] = useState({
    fullName: '',
    socialSecurityNumber: '',
    phoneNumber: '',
    bankName: '',
    iban: '',
    paymentMethod: '',
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    {
      icon: User,
      title: t('kyc-step-1'),
      description: t('kyc-desc-1'),
      status: 'pending'
    },
    {
      icon: CreditCard,
      title: t('kyc-step-2'),
      description: t('kyc-desc-2'),
      status: 'pending'
    },
    {
      icon: CheckCircle,
      title: t('kyc-step-3'),
      description: t('kyc-desc-3'),
      status: 'pending'
    }
  ];

  const getStepStatus = (index: number) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'current';
    return 'pending';
  };

  const getProgressValue = () => {
    return ((currentStep) / steps.length) * 100;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="pb-6">
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Fingerprint className="h-8 w-8 text-emerald-700" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-light text-slate-900">
                {t('alphag8-id-key')}
              </DialogTitle>
              <p className="text-slate-600 font-light">
                {t('legal-protection')} • {t('kyc-verification')}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${getProgressValue()}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-slate-500 mt-2">
            <span>{currentStep} / {steps.length} {t('kyc-verification')}</span>
            <span>{Math.round(getProgressValue())}% Complete</span>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Role-Based Access Notice */}
          <Card className={`${
            userRole === 'sales-team' ? 'border-purple-200 bg-purple-50' :
            userRole === 'fagri-member' ? 'border-emerald-200 bg-emerald-50' :
            'border-amber-200 bg-amber-50'
          }`}>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className={`h-6 w-6 mt-0.5 ${
                  userRole === 'sales-team' ? 'text-purple-600' :
                  userRole === 'fagri-member' ? 'text-emerald-600' :
                  'text-amber-600'
                }`} />
                <div>
                  <h3 className={`font-semibold ${
                    userRole === 'sales-team' ? 'text-purple-800' :
                    userRole === 'fagri-member' ? 'text-emerald-800' :
                    'text-amber-800'
                  }`}>
                    {userRole === 'sales-team' ? 'FAGRI Sales Team Access' :
                     userRole === 'fagri-member' ? 'FAGRI Member Access' :
                     t('identity-required')}
                  </h3>
                  <p className={`font-light mt-1 ${
                    userRole === 'sales-team' ? 'text-purple-700' :
                    userRole === 'fagri-member' ? 'text-emerald-700' :
                    'text-amber-700'
                  }`}>
                    {userRole === 'sales-team' ? 'As a Sales Team member, you can create ALPHAG8 IDs for clients and manage multiple accounts with administrator privileges.' :
                     userRole === 'fagri-member' ? 'As a FAGRI member, you can create your own ALPHAG8 ID and access all CO₂ certification features.' :
                     t('identity-required-desc')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KYC Steps */}
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">{t('kyc-process')}</h3>
            
            {steps.map((step, index) => {
              const status = getStepStatus(index);
              const Icon = step.icon;
              
              return (
                <Card key={index} className={`transition-all duration-300 ${
                  status === 'current' ? 'ring-2 ring-emerald-500 border-emerald-200' :
                  status === 'completed' ? 'border-green-200 bg-green-50' :
                  'border-slate-200'
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        status === 'completed' ? 'bg-green-100' :
                        status === 'current' ? 'bg-emerald-100' :
                        'bg-slate-100'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          status === 'completed' ? 'text-green-600' :
                          status === 'current' ? 'text-emerald-600' :
                          'text-slate-500'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base font-medium text-slate-900">
                          {step.title}
                        </CardTitle>
                        <Badge variant={
                          status === 'completed' ? 'default' :
                          status === 'current' ? 'secondary' :
                          'outline'
                        } className="mt-1">
                          {status === 'completed' ? 'Completed' :
                           status === 'current' ? 'In Progress' :
                           'Pending'}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-slate-600">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Legal Protection Information */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-800 flex items-center space-x-2 text-sm">
                  <Shield className="h-4 w-4" />
                  <span>{t('legal-protection')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-blue-700 font-light text-sm">
                  {t('legal-protection-desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-purple-800 flex items-center space-x-2 text-sm">
                  <UserCheck className="h-4 w-4" />
                  <span>{t('privacy-protection')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-purple-700 font-light text-sm">
                  {t('privacy-protection-desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-200 bg-emerald-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-emerald-800 flex items-center space-x-2 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{t('data-security')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-emerald-700 font-light text-sm">
                  {t('data-security-desc')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Banking KYC Form - Step 1 */}
          {currentStep === 1 && (
            <Card className="border-emerald-200 bg-emerald-50">
              <CardHeader>
                <CardTitle className="text-emerald-800 flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{t('kyc-step-1')}</span>
                </CardTitle>
                <CardDescription className="text-emerald-700">
                  {t('kyc-desc-1')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-emerald-800 font-medium">
                      {t('full-name')}
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => updateFormData('fullName', e.target.value)}
                      className="border-emerald-200 focus:border-emerald-500"
                      placeholder={t('full-name')}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="socialSecurityNumber" className="text-emerald-800 font-medium">
                      {t('social-security-number')}
                    </Label>
                    <Input
                      id="socialSecurityNumber"
                      value={formData.socialSecurityNumber}
                      onChange={(e) => updateFormData('socialSecurityNumber', e.target.value)}
                      className="border-emerald-200 focus:border-emerald-500"
                      placeholder={t('social-security-number')}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-emerald-800 font-medium">
                      {t('phone-number')}
                    </Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                      className="border-emerald-200 focus:border-emerald-500"
                      placeholder={t('phone-number')}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bankName" className="text-emerald-800 font-medium">
                      {t('bank-name')}
                    </Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={(e) => updateFormData('bankName', e.target.value)}
                      className="border-emerald-200 focus:border-emerald-500"
                      placeholder={t('bank-name')}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="iban" className="text-emerald-800 font-medium">
                      {t('iban')}
                    </Label>
                    <Input
                      id="iban"
                      value={formData.iban}
                      onChange={(e) => updateFormData('iban', e.target.value)}
                      className="border-emerald-200 focus:border-emerald-500"
                      placeholder="IT60 X054 2811 1010 0000 0123 456"
                    />
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                  <p className="text-amber-800 font-light text-sm">
                    {t('payment-note')}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Method Selection - Step 2 */}
          {currentStep === 2 && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>{t('kyc-step-2')}</span>
                </CardTitle>
                <CardDescription className="text-blue-700">
                  {t('kyc-desc-2')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Summary */}
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">{t('total-amount')}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-700">{t('account-creation-fee')}</span>
                      <span className="font-medium text-blue-900">€5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">{t('first-year-fee')}</span>
                      <span className="font-medium text-blue-900">€12</span>
                    </div>
                    <div className="border-t border-blue-200 pt-2 flex justify-between">
                      <span className="font-semibold text-blue-900">Total</span>
                      <span className="font-bold text-blue-900 text-xl">€17</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-4">
                  <Label className="text-blue-800 font-medium">{t('payment-method')}</Label>
                  <Select value={formData.paymentMethod} onValueChange={(value) => updateFormData('paymentMethod', value)}>
                    <SelectTrigger className="border-blue-200 focus:border-blue-500">
                      <SelectValue placeholder={t('payment-method')} />
                    </SelectTrigger>
                    <SelectContent className="z-[10001] bg-white border shadow-lg">
                      <SelectItem value="bank-transfer">{t('bank-transfer')}</SelectItem>
                      <SelectItem value="credit-card">{t('credit-card')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bank Transfer Instructions */}
                {formData.paymentMethod === 'bank-transfer' && (
                  <div className="space-y-4 p-4 bg-white rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900">{t('bank-transfer-instructions')}</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="font-medium text-blue-800 mb-2">{t('transfer-details')}:</p>
                        <div className="space-y-1 text-blue-700">
                          <p><strong>{t('recipient')}:</strong> FAGRI DIGITAL S.r.l.</p>
                          <p><strong>IBAN:</strong> IT14 U031 2403 2730 0000 0230 152</p>
                          <p><strong>BIC/SWIFT:</strong> BAFUITRR</p>
                          <p><strong>Banca:</strong> BANCA DEL FUCINO - FILIALE DI ROMA</p>
                          <p><strong>Codice Fiscale/P.IVA:</strong> 17843431002</p>
                          <p><strong>{t('amount')}:</strong> €20.74</p>
                          <p><strong>{t('reference')}:</strong> FAGRI-{formData.fullName?.replace(/\s+/g, '').toUpperCase() || 'REG'}</p>
                        </div>
                      </div>
                      <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                        <p className="text-amber-800 text-sm">
                          <strong>{t('important')}:</strong> {t('transfer-verification-note')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Credit Card Fields */}
                {formData.paymentMethod === 'credit-card' && (
                  <div className="space-y-4 p-4 bg-white rounded-lg border border-blue-200">
                    <div className="space-y-2">
                      <Label htmlFor="cardHolderName" className="text-blue-800 font-medium">
                        {t('card-holder-name')}
                      </Label>
                      <Input
                        id="cardHolderName"
                        value={formData.cardHolderName}
                        onChange={(e) => updateFormData('cardHolderName', e.target.value)}
                        className="border-blue-200 focus:border-blue-500"
                        placeholder={t('card-holder-name')}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className="text-blue-800 font-medium">
                        {t('card-number')}
                      </Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => updateFormData('cardNumber', e.target.value)}
                        className="border-blue-200 focus:border-blue-500"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate" className="text-blue-800 font-medium">
                          {t('expiry-date')}
                        </Label>
                        <Input
                          id="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => updateFormData('expiryDate', e.target.value)}
                          className="border-blue-200 focus:border-blue-500"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cvv" className="text-blue-800 font-medium">
                          {t('cvv')}
                        </Label>
                        <Input
                          id="cvv"
                          value={formData.cvv}
                          onChange={(e) => updateFormData('cvv', e.target.value)}
                          className="border-blue-200 focus:border-blue-500"
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Account Activation - Step 3 */}
          {currentStep === 3 && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>{t('kyc-step-3')}</span>
                </CardTitle>
                <CardDescription className="text-green-700">
                  {t('kyc-desc-3')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    ALPHAG8 ID KEY Activated
                  </h3>
                  <p className="text-green-700 font-light">
                    Your secure digital identity is now ready for CO₂ certification applications.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {currentStep === 0 && (
              <Button
                onClick={() => setCurrentStep(1)}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-3"
              >
                <Shield className="h-4 w-4 mr-2" />
                {t('start-kyc')}
              </Button>
            )}
            
            {currentStep === 1 && (
              <Button
                onClick={() => setCurrentStep(2)}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-3"
                disabled={!formData.fullName || !formData.socialSecurityNumber || !formData.phoneNumber || !formData.iban}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Continue to Payment
              </Button>
            )}
            
            {currentStep === 2 && (
              <Button
                onClick={() => setCurrentStep(3)}
                className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-3"
                disabled={!formData.paymentMethod || (formData.paymentMethod === 'credit-card' && (!formData.cardHolderName || !formData.cardNumber || !formData.expiryDate || !formData.cvv))}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {t('proceed-payment')}
              </Button>
            )}
            
            {currentStep === 3 && (
              <Button
                onClick={() => {
                  // Generate ALPHAG8 ID and show display modal
                  const newId = generateAlphaG8Id();
                  setGeneratedId(newId);
                  setShowIdDisplay(true);
                }}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white py-3"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Registration
              </Button>
            )}
            
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50 py-3"
            >
              Close
            </Button>
          </div>

          {/* Security Notice */}
          <div className="bg-slate-100 rounded-lg p-4 mt-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-slate-600 mt-0.5" />
              <div className="text-sm text-slate-600">
                <p className="font-medium">Swiss Banking-Level Security</p>
                <p className="font-light mt-1">
                  Your ALPHAG8 ID is protected by the same security standards used by Swiss financial institutions, 
                  ensuring maximum data protection and identity verification integrity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      {/* ALPHAG8 ID Display Modal */}
      <AlphaG8IdDisplayModal
        isOpen={showIdDisplay}
        onClose={() => {
          setShowIdDisplay(false);
          onClose();
        }}
        alphaG8Id={generatedId}
        userEmail={formData.fullName.includes('@') ? formData.fullName : 'user@fagri.digital'}
        userName={formData.fullName}
        userRole={userRole || 'member'}
      />
    </Dialog>
  );
}