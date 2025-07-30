import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/components/language-provider';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Users, 
  Shield, 
  CrownIcon,
  LogIn,
  KeyRound,
  ChevronRight,
  Building2
} from 'lucide-react';

interface RoleBasedSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInSuccess: (alphaG8Id: string, userRole: string) => void;
}

type UserRole = 'fagri-member' | 'team-member' | 'certification' | 'administration';

export function RoleBasedSignInModal({ isOpen, onClose, onSignInSuccess }: RoleBasedSignInModalProps) {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [step, setStep] = useState<'role-selection' | 'signin'>('role-selection');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [alphaG8Id, setAlphaG8Id] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const roles = [
    {
      id: 'fagri-member' as UserRole,
      title: language === 'it' ? 'Membro FAGRI' : 'FAGRI Member',
      description: language === 'it' 
        ? 'Accesso individuale per certificazione progetti personali'
        : 'Individual access for personal project certification',
      icon: User,
      color: 'emerald',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      iconColor: 'text-emerald-600'
    },
    {
      id: 'team-member' as UserRole,
      title: language === 'it' ? 'Team Member' : 'Team Member',
      description: language === 'it' 
        ? 'Gestione progetti multipli e coordinamento team'
        : 'Multi-project management and team coordination',
      icon: Users,
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      id: 'certification' as UserRole,
      title: language === 'it' ? 'Certificazione' : 'Certification',
      description: language === 'it' 
        ? 'Validazione e certificazione progetti CO₂'
        : 'CO₂ project validation and certification',
      icon: Shield,
      color: 'purple',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      id: 'administration' as UserRole,
      title: language === 'it' ? 'Amministrazione' : 'Administration',
      description: language === 'it' 
        ? 'Controllo completo sistema e gestione utenti'
        : 'Complete system control and user management',
      icon: CrownIcon,
      color: 'red',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-600'
    }
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('signin');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!alphaG8Id.trim() || !selectedRole) {
      toast({
        title: language === 'it' ? 'Errore' : 'Error',
        description: language === 'it' 
          ? 'Inserisci un FAGRI ID KEY valido'
          : 'Please enter a valid FAGRI ID KEY',
        variant: 'destructive',
      });
      return;
    }

    // Validate FAGRI ID format
    const idPattern = /^FAGRI-[A-Z0-9]{8}-[A-Z0-9]{8}-[A-Z0-9]{2}$/;
    if (!idPattern.test(alphaG8Id)) {
      toast({
        title: language === 'it' ? 'Formato Non Valido' : 'Invalid Format',
        description: language === 'it' 
          ? 'Il FAGRI ID KEY deve seguire il formato: FAGRI-XXXXXXXX-XXXXXXXX-XX'
          : 'FAGRI ID KEY must follow format: FAGRI-XXXXXXXX-XXXXXXXX-XX',
        variant: 'destructive',
      });
      return;
    }

    setIsSigningIn(true);

    try {
      // Simulate authentication process
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store sign-in info in localStorage
      localStorage.setItem('fagri_signed_in', 'true');
      localStorage.setItem('fagri_user_id', alphaG8Id);
      localStorage.setItem('fagri_user_role', selectedRole);
      localStorage.setItem('fagri_signin_timestamp', Date.now().toString());

      toast({
        title: language === 'it' ? 'Accesso Effettuato' : 'Sign In Successful',
        description: language === 'it' 
          ? `Benvenuto nel sistema FAGRI Digital`
          : `Welcome to FAGRI Digital system`,
      });

      onSignInSuccess(alphaG8Id, selectedRole);
      
      // Reset state
      setStep('role-selection');
      setSelectedRole(null);
      setAlphaG8Id('');
      
    } catch (error) {
      toast({
        title: language === 'it' ? 'Errore di Accesso' : 'Sign In Error',
        description: language === 'it' 
          ? 'Si è verificato un errore durante l\'accesso'
          : 'An error occurred during sign in',
        variant: 'destructive',
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleClose = () => {
    setStep('role-selection');
    setSelectedRole(null);
    setAlphaG8Id('');
    onClose();
  };

  const selectedRoleData = roles.find(role => role.id === selectedRole);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        {step === 'role-selection' ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center text-slate-800">
                <LogIn className="h-5 w-5 mr-2 text-emerald-600" />
                {language === 'it' ? 'Seleziona Ruolo Utente' : 'Select User Role'}
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                {language === 'it' 
                  ? 'Scegli il tuo ruolo per accedere alla dashboard appropriata'
                  : 'Choose your role to access the appropriate dashboard'
                }
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              {roles.map((role) => {
                const IconComponent = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className={`w-full p-4 rounded-lg border-2 ${role.borderColor} ${role.bgColor} hover:shadow-md transition-all duration-200 text-left group`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                          <IconComponent className={`h-5 w-5 ${role.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800 group-hover:text-slate-900">
                            {role.title}
                          </h3>
                          <p className="text-sm text-slate-600 group-hover:text-slate-700">
                            {role.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600" />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center pt-4">
              <Button variant="outline" onClick={handleClose}>
                {language === 'it' ? 'Annulla' : 'Cancel'}
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center text-slate-800">
                <KeyRound className="h-5 w-5 mr-2 text-emerald-600" />
                {language === 'it' ? 'Accesso con FAGRI ID' : 'Sign In with FAGRI ID'}
              </DialogTitle>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-sm text-slate-600">
                  {language === 'it' ? 'Ruolo selezionato:' : 'Selected role:'}
                </span>
                {selectedRoleData && (
                  <Badge className={`${selectedRoleData.bgColor} ${selectedRoleData.iconColor} border-0`}>
                    {selectedRoleData.title}
                  </Badge>
                )}
              </div>
            </DialogHeader>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fagri-id" className="text-slate-700">
                  FAGRI ID KEY
                </Label>
                <Input
                  id="fagri-id"
                  type="text"
                  value={alphaG8Id}
                  onChange={(e) => setAlphaG8Id(e.target.value.toUpperCase())}
                  placeholder="FAGRI-XXXXXXXX-XXXXXXXX-XX"
                  className="font-mono text-sm"
                  disabled={isSigningIn}
                />
                <p className="text-xs text-slate-500">
                  {language === 'it' 
                    ? 'Inserisci il tuo FAGRI ID KEY per accedere al sistema'
                    : 'Enter your FAGRI ID KEY to access the system'
                  }
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('role-selection')}
                  disabled={isSigningIn}
                  className="flex-1"
                >
                  {language === 'it' ? 'Indietro' : 'Back'}
                </Button>
                <Button
                  type="submit"
                  disabled={isSigningIn || !alphaG8Id.trim()}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {isSigningIn ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      <span>{language === 'it' ? 'Accesso...' : 'Signing In...'}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <LogIn className="h-4 w-4" />
                      <span>{language === 'it' ? 'Accedi' : 'Sign In'}</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-4 p-3 bg-slate-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <Building2 className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-slate-600">
                  <p className="font-medium mb-1">
                    {language === 'it' ? 'Sistema Sicuro FAGRI Digital' : 'FAGRI Digital Secure System'}
                  </p>
                  <p>
                    {language === 'it' 
                      ? 'Accesso protetto con standard di sicurezza bancari svizzeri'
                      : 'Access protected with Swiss banking security standards'
                    }
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}