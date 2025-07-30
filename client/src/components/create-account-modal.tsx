import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { X, User, Shield, CheckCircle, Copy, Download, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateAlphaG8Id } from '../../../shared/alphag8-id-generator';

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccountCreated?: (fagriId: string) => void;
}

interface DigitalFingerprint {
  firstName: string;
  lastName: string;
  socialSecurityNumber: string;
  telephone: string;
  email: string;
}

export function CreateAccountModal({ isOpen, onClose, onAccountCreated }: CreateAccountModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [generatedFagriId, setGeneratedFagriId] = useState<string>('');
  
  const [digitalFingerprint, setDigitalFingerprint] = useState<DigitalFingerprint>({
    firstName: '',
    lastName: '',
    socialSecurityNumber: '',
    telephone: '',
    email: ''
  });

  const handleInputChange = (field: keyof DigitalFingerprint, value: string) => {
    setDigitalFingerprint(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isStepOneValid = () => {
    return Object.values(digitalFingerprint).every(value => value.trim() !== '');
  };

  const handleCreateAccount = async () => {
    if (!isStepOneValid()) {
      toast({
        title: t('validation-error'),
        description: t('please-fill-all-fields'),
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    
    try {
      // Generate FAGRI ID KEY
      const fagriId = generateAlphaG8Id();
      
      // Create user account via API
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fagriIdKey: fagriId,
          firstName: digitalFingerprint.firstName,
          lastName: digitalFingerprint.lastName,
          email: digitalFingerprint.email,
          socialSecurityNumber: digitalFingerprint.socialSecurityNumber,
          telephone: digitalFingerprint.telephone,
          streetAddress: '', // Will be added in future steps
          city: '',
          postalCode: '',
          province: '',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create account');
      }

      const result = await response.json();
      
      // Store basic account information
      const accountData = {
        fagriIdKey: fagriId,
        fullName: `${digitalFingerprint.firstName} ${digitalFingerprint.lastName}`,
        email: digitalFingerprint.email,
        phone: digitalFingerprint.telephone,
        fiscalCode: digitalFingerprint.socialSecurityNumber,
        kycStatus: 'pending',
        userRole: 'Individual',
        createdAt: new Date().toISOString()
      };

      // Store in localStorage temporarily (in production this would go to backend)
      localStorage.setItem(`account_${fagriId}`, JSON.stringify(accountData));
      
      setGeneratedFagriId(fagriId);
      setCurrentStep(2);
      
      toast({
        title: t('account-created-successfully'),
        description: t('your-digital-identity-is-ready'),
      });

      if (onAccountCreated) {
        onAccountCreated(fagriId);
      }
    } catch (error) {
      toast({
        title: t('creation-failed'),
        description: t('please-try-again'),
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopyFagriId = () => {
    navigator.clipboard.writeText(generatedFagriId);
    toast({
      title: t('copied-to-clipboard'),
      description: t('fagri-id-copied'),
    });
  };

  const handleDownloadCertificate = () => {
    const certificate = `
FAGRI DIGITAL - Digital Identity Certificate

ALPHAG8 ID KEY: ${generatedFagriId}
Full Name: ${digitalFingerprint.firstName} ${digitalFingerprint.lastName}
Email: ${digitalFingerprint.email}
Phone: ${digitalFingerprint.telephone}
Issue Date: ${new Date().toLocaleDateString()}

This certificate confirms the creation of your secure digital identity 
within the FAGRI Digital CO₂ Certification Platform.

Security Level: Swiss Banking Standard
Encryption: AES-256 with RSA-4096
Blockchain Network: G8Chain (EVM Compatible)

Valid for: CO₂ Certification Applications
Issuer: FAGRI DIGITAL S.r.l.
Contact: support@fagri.digital

© 2025 FAGRI DIGITAL - All rights reserved
    `;

    const blob = new Blob([certificate], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FAGRI_Certificate_${generatedFagriId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: t('certificate-downloaded'),
      description: t('certificate-saved-successfully'),
    });
  };

  const handleReset = () => {
    setCurrentStep(1);
    setGeneratedFagriId('');
    setDigitalFingerprint({
      firstName: '',
      lastName: '',
      socialSecurityNumber: '',
      telephone: '',
      email: ''
    });
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light text-slate-800">
            {t('create-digital-identity')}
          </DialogTitle>
        </DialogHeader>

        <div className="px-8 py-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                <User className="h-5 w-5" />
              </div>
              <div className={`h-1 w-16 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`} />
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= 2 ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                <Shield className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Step 1: Digital Fingerprint Collection */}
          {currentStep === 1 && (
            <Card className="border-2 border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
                <CardTitle className="text-xl font-light text-slate-800 text-center">
                  <User className="h-6 w-6 inline-block mr-2" />
                  {t('digital-fingerprint-collection')}
                </CardTitle>
                <p className="text-sm text-slate-600 text-center">
                  {t('create-secure-digital-identity')}
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                      {t('first-name')} *
                    </Label>
                    <Input
                      id="firstName"
                      value={digitalFingerprint.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder={t('enter-first-name')}
                      className="border-slate-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                      {t('last-name')} *
                    </Label>
                    <Input
                      id="lastName"
                      value={digitalFingerprint.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder={t('enter-last-name')}
                      className="border-slate-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="socialSecurity" className="text-sm font-medium text-slate-700">
                      {t('social-security-fiscal-number')} *
                    </Label>
                    <Input
                      id="socialSecurity"
                      value={digitalFingerprint.socialSecurityNumber}
                      onChange={(e) => handleInputChange('socialSecurityNumber', e.target.value)}
                      placeholder={t('enter-fiscal-number')}
                      className="border-slate-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telephone" className="text-sm font-medium text-slate-700">
                      {t('phone-number')} *
                    </Label>
                    <Input
                      id="telephone"
                      value={digitalFingerprint.telephone}
                      onChange={(e) => handleInputChange('telephone', e.target.value)}
                      placeholder="Enter phone number"
                      className="border-slate-300"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                      {t('email-address')} *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={digitalFingerprint.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={t('enter-email')}
                      className="border-slate-300"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={handleCreateAccount}
                    disabled={!isStepOneValid() || isCreating}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                  >
                    {isCreating ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        {t('creating-account')}
                      </>
                    ) : (
                      <>
                        {t('create-digital-identity')}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: FAGRI ID Generated */}
          {currentStep === 2 && (
            <Card className="border-2 border-green-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
                <CardTitle className="text-xl font-light text-green-800 text-center">
                  <CheckCircle className="h-6 w-6 inline-block mr-2" />
                  {t('digital-identity-created')}
                </CardTitle>
                <p className="text-sm text-green-700 text-center">
                  {t('your-alphag8-id-ready')}
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  {/* Generated FAGRI ID Display */}
                  <div className="bg-white border-2 border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-slate-800 mb-4">
                      {t('your-alphag8-id-key')}
                    </h3>
                    <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 font-mono text-lg text-center">
                      {generatedFagriId}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={handleCopyFagriId}
                      variant="outline"
                      className="border-green-300 text-green-700 hover:bg-green-50"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {t('copy-id-key')}
                    </Button>
                    <Button
                      onClick={handleDownloadCertificate}
                      variant="outline"
                      className="border-green-300 text-green-700 hover:bg-green-50"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {t('download-certificate')}
                    </Button>
                  </div>

                  {/* Next Steps Information */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
                    <h4 className="font-medium text-blue-800 mb-3">
                      {t('next-steps')}
                    </h4>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li>• {t('save-your-alphag8-id-securely')}</li>
                      <li>• {t('use-this-id-for-future-access')}</li>
                      <li>• {t('proceed-to-create-account-types')}</li>
                      <li>• {t('access-co2-certification-features')}</li>
                    </ul>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={() => {
                        onClose();
                        // Navigate directly to user dashboard
                        window.location.href = `/user-dashboard?fagriId=${generatedFagriId}`;
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      {t('go-to-dashboard')}
                    </Button>
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