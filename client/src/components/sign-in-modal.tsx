import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from './language-provider';
import { useToast } from '@/hooks/use-toast';
import { validateAlphaG8Id } from '@shared/alphag8-id-generator';
import { LogIn, Key, Shield, CheckCircle, AlertCircle, X } from 'lucide-react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [alphaG8Id, setAlphaG8Id] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    if (validateAlphaG8Id(alphaG8Id)) {
      setIsSignedIn(true);
      toast({
        title: t('sign-in-successful'),
        description: t('welcome-back-message'),
      });
      
      // Simulate sign-in success and close after 2 seconds
      setTimeout(() => {
        onClose();
        setIsSignedIn(false);
        setAlphaG8Id('');
      }, 2000);
    } else {
      toast({
        title: t('invalid-id'),
        description: t('invalid-id-desc'),
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800 flex items-center space-x-3">
            <LogIn className="h-5 w-5 text-emerald-700" />
            <span>{t('sign-in-to-platform')}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!isSignedIn ? (
            <Card className="border-emerald-200 bg-emerald-50">
              <CardHeader>
                <CardTitle className="text-emerald-800 flex items-center space-x-2">
                  <Key className="h-5 w-5" />
                  <span>{t('enter-your-credentials')}</span>
                </CardTitle>
                <CardDescription className="text-emerald-700">
                  {t('sign-in-with-alphag8-id')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signInId" className="text-emerald-800 font-medium">
                    {t('alphag8-id-key')}
                  </Label>
                  <Input
                    id="signInId"
                    value={alphaG8Id}
                    onChange={(e) => setAlphaG8Id(e.target.value.toUpperCase())}
                    placeholder="ALPHAG8-XXXXXXXX-XXXXXXXX-XX"
                    className="border-emerald-200 focus:border-emerald-500 font-mono"
                    maxLength={30}
                  />
                  <p className="text-sm text-emerald-600 font-light">
                    {t('enter-complete-id-key')}
                  </p>
                </div>

                <Button
                  onClick={handleSignIn}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white"
                  disabled={!alphaG8Id || alphaG8Id.length < 20}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  {t('sign-in')}
                </Button>

                {/* Security Notice */}
                <div className="bg-slate-100 rounded-lg p-4 mt-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-slate-600 mt-0.5" />
                    <div className="text-sm text-slate-600">
                      <p className="font-medium">{t('secure-authentication')}</p>
                      <p className="font-light mt-1">
                        {t('swiss-banking-level-security')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    {t('sign-in-successful')}
                  </h3>
                  <p className="text-green-700 font-light">
                    {t('redirecting-to-dashboard')}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Help Section */}
          {!isSignedIn && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium">{t('need-help-signing-in')}</p>
                  <p className="font-light mt-1">
                    {t('contact-support-for-assistance')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}