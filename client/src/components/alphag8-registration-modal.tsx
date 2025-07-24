import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from './language-provider';
import { X, Shield, FileText, CheckCircle, UserCheck, AlertCircle, Fingerprint } from 'lucide-react';

interface AlphaG8RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AlphaG8RegistrationModal({ isOpen, onClose }: AlphaG8RegistrationModalProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Shield,
      title: t('kyc-step-1'),
      description: t('kyc-desc-1'),
      status: 'pending'
    },
    {
      icon: FileText,
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
        <DialogHeader className="relative pb-6">
          <button
            onClick={onClose}
            className="absolute right-0 top-0 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Fingerprint className="h-8 w-8 text-emerald-700" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-light text-slate-900">
                {t('create-alphag8-id')}
              </DialogTitle>
              <p className="text-slate-600 font-light">
                {t('digital-identity')} • {t('kyc-verification')}
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
          {/* Identity Required Notice */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-6 w-6 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-800">{t('identity-required')}</h3>
                  <p className="text-amber-700 font-light mt-1">
                    {t('identity-required-desc')}
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

          {/* CO2 Access Information */}
          <Card className="border-emerald-200 bg-emerald-50">
            <CardHeader>
              <CardTitle className="text-emerald-800 flex items-center space-x-2">
                <UserCheck className="h-5 w-5" />
                <span>{t('co2-access-title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-emerald-700 font-light">
                {t('co2-access-desc')}
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={() => {
                // Simulate progression through KYC steps
                if (currentStep < steps.length) {
                  setCurrentStep(currentStep + 1);
                }
              }}
              className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-3"
              disabled={currentStep >= steps.length}
            >
              <Shield className="h-4 w-4 mr-2" />
              {currentStep >= steps.length ? 'KYC Complete' : t('start-kyc')}
            </Button>
            
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
    </Dialog>
  );
}