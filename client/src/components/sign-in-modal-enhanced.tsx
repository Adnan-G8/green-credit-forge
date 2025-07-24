import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from './language-provider';
import { useToast } from '@/hooks/use-toast';
import { validateAlphaG8Id } from '@shared/alphag8-id-generator';
import { LogIn, Key, Shield, CheckCircle, AlertCircle, X, Lock } from 'lucide-react';
import { UserDashboardModal } from './user-dashboard-modal';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInSuccess?: (alphaG8Id: string) => void;
}

export function SignInModal({ isOpen, onClose, onSignInSuccess }: SignInModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [alphaG8Id, setAlphaG8Id] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const TEST_ID = 'ALPHAG8-1BKQE5C3-K9X2P4M7-15';

  const handleAutoFill = () => {
    setAlphaG8Id(TEST_ID);
  };

  const handleSignIn = () => {
    if (validateAlphaG8Id(alphaG8Id)) {
      setIsSignedIn(true);
      toast({
        title: t('sign-in-successful'),
        description: t('welcome-back-message'),
      });
      
      // Show dashboard after brief success display
      setTimeout(() => {
        if (onSignInSuccess) {
          onSignInSuccess(alphaG8Id);
        }
        setShowDashboard(true);
        setIsSignedIn(false);
      }, 1500);
    } else {
      toast({
        title: t('invalid-id'),
        description: t('invalid-id-desc'),
        variant: 'destructive',
      });
    }
  };

  const handleDashboardClose = () => {
    setShowDashboard(false);
    setAlphaG8Id('');
  };

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 shadow-2xl p-0 overflow-hidden z-[10004]">
        <DialogTitle className="sr-only">Sign In</DialogTitle>
        <DialogDescription className="sr-only">Enter your ALPHAG8 ID to sign in</DialogDescription>
        {/* Header Section */}
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 px-8 py-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-emerald-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-4 text-white">
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Shield className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-2xl font-light mb-1">FAGRI.Digital</h2>
              <p className="text-emerald-100 text-sm">Secure Authentication Portal</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-8">
          {!isSignedIn ? (
            <div className="max-w-md mx-auto">
              {/* Main Authentication Card */}
              <Card className="border-2 border-slate-200 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-6 border-b border-slate-200">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Key className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-light text-slate-800 mb-2">
                      {t('enter-your-credentials')}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {t('sign-in-with-alphag8-id')}
                    </p>
                  </div>
                </div>

                <CardContent className="px-6 py-8">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="signInId" className="text-slate-700 font-medium text-base flex items-center space-x-2">
                        <Lock className="h-4 w-4 text-slate-500" />
                        <span>{t('alphag8-id-key')}</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="signInId"
                          value={alphaG8Id}
                          onChange={(e) => setAlphaG8Id(e.target.value.toUpperCase())}
                          placeholder="ALPHAG8-XXXXXXXX-XXXXXXXX-XX"
                          className="h-14 text-center font-mono text-lg border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl shadow-sm transition-all duration-200"
                          maxLength={30}
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <Key className="h-5 w-5 text-slate-400" />
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 text-center">
                        {t('enter-complete-id-key')}
                      </p>
                      
                      {/* Development Test ID */}
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                        <div className="text-center">
                          <p className="text-xs text-amber-700 font-medium mb-2">Test ID for Development:</p>
                          <div className="bg-amber-100 rounded px-3 py-2 font-mono text-sm text-amber-800 mb-2">
                            {TEST_ID}
                          </div>
                          <button
                            type="button"
                            onClick={handleAutoFill}
                            className="text-xs text-amber-700 hover:text-amber-900 underline font-medium"
                          >
                            Click to auto-fill
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      onClick={handleSignIn}
                      disabled={!alphaG8Id || alphaG8Id.length < 20}
                      className="w-full h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <LogIn className="h-5 w-5 mr-3" />
                      {t('sign-in')}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <div className="mt-6 bg-slate-100 border border-slate-200 rounded-xl p-4">
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

              {/* Support Section */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
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
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
                <CardContent className="pt-8 pb-6">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-light text-green-800 mb-2">
                        {t('sign-in-successful')}
                      </h3>
                      <p className="text-green-700 text-base mb-3">
                        {t('welcome-back-message')}
                      </p>
                      <p className="text-sm text-green-600 font-medium">
                        {t('redirecting-to-dashboard')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>

    <UserDashboardModal
      isOpen={showDashboard}
      onClose={handleDashboardClose}
      alphaG8Id={alphaG8Id}
      userRole="FAGRI Member"
    />
  </>
  );
}