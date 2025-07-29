import { useState } from 'react';
import { useLanguage } from '@/components/language-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User, Building2, X, Shield, Lock, CreditCard, Banknote, Key, CheckCircle2 } from 'lucide-react';
import personalKycImage from '@assets/image_1753788790320.png';
// Import the ALPHAG8 ID generator function
const generateAlphaG8Id = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const part1 = Array.from({length: 8}, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  const part2 = Array.from({length: 8}, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  const part3 = Array.from({length: 2}, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  return `FAGRI-${part1}-${part2}-${part3}`;
};

interface EmployeeKYCData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  province: string;
  codiceFiscale: string;
}

interface KYCAlphaG8IntegrationProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
  onIdKeyGenerated?: (idKey: string) => void;
}

export default function KYCAlphaG8Integration({ 
  isOpen, 
  onClose, 
  userRole = 'FAGRI Member',
  onIdKeyGenerated 
}: KYCAlphaG8IntegrationProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<'kyc' | 'payment' | 'completion'>('kyc');
  const [employeeData, setEmployeeData] = useState<EmployeeKYCData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    province: '',
    codiceFiscale: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [generatedIdKey, setGeneratedIdKey] = useState<string>('');

  const isEmployee = userRole === 'FAGRI Sales Team';

  const handleKYCSubmit = () => {
    if (!isFormValid()) return;
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async () => {
    setIsProcessingPayment(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate ALPHAG8 ID KEY
      const newIdKey = generateAlphaG8Id();
      setGeneratedIdKey(newIdKey);
      
      // Store user data
      const userData = {
        fagriIdKey: newIdKey,
        ...employeeData,
        userRole,
        kycStatus: 'approved',
        createdAt: new Date().toISOString()
      };
      
      const storedProfiles = JSON.parse(localStorage.getItem('userProfiles') || '[]');
      storedProfiles.push(userData);
      localStorage.setItem('userProfiles', JSON.stringify(storedProfiles));
      
      setCurrentStep('completion');
      onIdKeyGenerated?.(newIdKey);
      
    } catch (error) {
      alert('Bezahlung fehlgeschlagen. Bitte versuchen Sie es erneut.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const isFormValid = () => {
    return employeeData.firstName && 
           employeeData.lastName && 
           employeeData.phone && 
           employeeData.email && 
           employeeData.province && 
           employeeData.codiceFiscale;
  };

  const handleClose = () => {
    // Reset form when closing
    setCurrentStep('kyc');
    setEmployeeData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      province: '',
      codiceFiscale: ''
    });
    setGeneratedIdKey('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-white">
        <DialogHeader className="border-b border-slate-200 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                {currentStep === 'completion' ? <Key className="h-6 w-6 text-white" /> : <Shield className="h-6 w-6 text-white" />}
              </div>
              <div>
                <DialogTitle className="text-2xl font-light text-slate-800">
                  {currentStep === 'completion' 
                    ? 'ALPHAG8 ID KEY Erstellt' 
                    : currentStep === 'payment' 
                      ? 'Bezahlung - €17 Account Gebühr'
                      : 'KYC - Know Your Customer'
                  }
                </DialogTitle>
                <DialogDescription className="text-slate-600 mt-1">
                  {currentStep === 'completion' 
                    ? 'Ihr ALPHAG8 ID KEY wurde erfolgreich erstellt'
                    : currentStep === 'payment' 
                      ? 'Bezahlen Sie €17 für die Account-Erstellung'
                      : 'Identitätsverifikation nach EUFD2025-001 Standard'
                  }
                </DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose} className="text-slate-400 hover:text-slate-600">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* KYC Step */}
        {currentStep === 'kyc' && (
          <div className="py-6">
            <Card className="border-blue-200 shadow-lg bg-white/80 backdrop-blur-sm max-w-2xl mx-auto">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={personalKycImage} 
                      alt="Employee KYC" 
                      className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-800 font-light flex items-center">
                      <User className="h-5 w-5 mr-2 text-blue-500" />
                      {isEmployee ? 'Mitarbeiter Verifikation' : 'Persönliche Verifikation'}
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      {isEmployee ? 'FAGRI Mitarbeiterdaten erforderlich' : 'Persönliche Identitätsdokumente erforderlich'}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-700 font-medium">Vorname</Label>
                    <Input
                      id="firstName"
                      value={employeeData.firstName}
                      onChange={(e) => setEmployeeData({...employeeData, firstName: e.target.value})}
                      className="border-slate-300 focus:border-blue-500"
                      placeholder="Mario"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-700 font-medium">Nachname</Label>
                    <Input
                      id="lastName"
                      value={employeeData.lastName}
                      onChange={(e) => setEmployeeData({...employeeData, lastName: e.target.value})}
                      className="border-slate-300 focus:border-blue-500"
                      placeholder="Rossi"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-700 font-medium">Telefonnummer</Label>
                    <Input
                      id="phone"
                      value={employeeData.phone}
                      onChange={(e) => setEmployeeData({...employeeData, phone: e.target.value})}
                      className="border-slate-300 focus:border-blue-500"
                      placeholder="+39 123 456 7890"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 font-medium">E-Mail Adresse</Label>
                    <Input
                      id="email"
                      type="email"
                      value={employeeData.email}
                      onChange={(e) => setEmployeeData({...employeeData, email: e.target.value})}
                      className="border-slate-300 focus:border-blue-500"
                      placeholder="mario.rossi@fagri.digital"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="province" className="text-slate-700 font-medium">Provinz/Region</Label>
                    <Select value={employeeData.province} onValueChange={(value) => setEmployeeData({...employeeData, province: value})}>
                      <SelectTrigger className="border-slate-300 focus:border-blue-500">
                        <SelectValue placeholder="Provinz auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="roma">Roma</SelectItem>
                        <SelectItem value="milano">Milano</SelectItem>
                        <SelectItem value="napoli">Napoli</SelectItem>
                        <SelectItem value="torino">Torino</SelectItem>
                        <SelectItem value="palermo">Palermo</SelectItem>
                        <SelectItem value="genova">Genova</SelectItem>
                        <SelectItem value="bologna">Bologna</SelectItem>
                        <SelectItem value="firenze">Firenze</SelectItem>
                        <SelectItem value="bari">Bari</SelectItem>
                        <SelectItem value="catania">Catania</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="codiceFiscale" className="text-slate-700 font-medium">Codice Fiscale (Steuernummer)</Label>
                    <Input
                      id="codiceFiscale"
                      value={employeeData.codiceFiscale}
                      onChange={(e) => setEmployeeData({...employeeData, codiceFiscale: e.target.value.toUpperCase()})}
                      className="border-slate-300 focus:border-blue-500"
                      placeholder="RSSMRA85M01H501Z"
                      maxLength={16}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Payment Step */}
        {currentStep === 'payment' && (
          <div className="py-6">
            <Card className="border-green-200 shadow-lg bg-white/80 backdrop-blur-sm max-w-2xl mx-auto">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-slate-800 font-light flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-green-500" />
                  Bezahlung - €17 Account Gebühr
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Wählen Sie Ihre bevorzugte Zahlungsmethode für die ALPHAG8 ID Erstellung
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-slate-200 bg-white hover:border-green-300'
                    }`}
                  >
                    <CreditCard className="h-6 w-6 text-green-600" />
                    <span className="font-medium">Kreditkarte</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('bank')}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'bank' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-slate-200 bg-white hover:border-green-300'
                    }`}
                  >
                    <Banknote className="h-6 w-6 text-green-600" />
                    <span className="font-medium">Banküberweisung</span>
                  </button>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">Gebührenübersicht:</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">ALPHAG8 ID Account Erstellung</span>
                    <span className="font-bold text-lg">€17.00</span>
                  </div>
                  <div className="text-sm text-slate-500 mt-2">
                    {paymentMethod === 'card' 
                      ? 'Sichere Kreditkartenzahlung über Stripe'
                      : 'Banküberweisung an FAGRI DIGITAL S.r.l.'
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Completion Step */}
        {currentStep === 'completion' && (
          <div className="py-6">
            <Card className="border-green-200 shadow-lg bg-white/80 backdrop-blur-sm max-w-2xl mx-auto">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-800 font-light">
                      ALPHAG8 ID KEY Erfolgreich Erstellt!
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Ihr ALPHAG8 ID KEY wurde generiert und ist sofort einsatzbereit.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-800">Ihr ALPHAG8 ID KEY:</h4>
                      <p className="text-2xl font-mono font-bold text-blue-600 mt-2">{generatedIdKey}</p>
                    </div>
                    <Button
                      onClick={() => navigator.clipboard.writeText(generatedIdKey)}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Kopieren
                    </Button>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Lock className="h-5 w-5 text-amber-600" />
                    <div>
                      <h4 className="font-medium text-amber-800">Wichtiger Sicherheitshinweis</h4>
                      <p className="text-sm text-amber-700 mt-1">
                        Bewahren Sie diesen ID KEY sicher auf. Er wird für alle CO₂-Zertifizierungsaktivitäten benötigt.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <DialogFooter className="border-t border-slate-200 pt-6">
          <div className="flex justify-between items-center w-full">
            {currentStep === 'kyc' && (
              <>
                <div className="text-sm text-slate-600">
                  Schritt 1 von 3: KYC Verifikation
                </div>
                <div className="space-x-3">
                  <Button variant="outline" onClick={handleClose} className="border-slate-300 text-slate-600 hover:bg-slate-50">
                    Abbrechen
                  </Button>
                  <Button 
                    onClick={handleKYCSubmit}
                    disabled={!isFormValid()}
                    className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white shadow-md"
                  >
                    Weiter zur Bezahlung
                  </Button>
                </div>
              </>
            )}

            {currentStep === 'payment' && (
              <>
                <div className="text-sm text-slate-600">
                  Schritt 2 von 3: Bezahlung €17
                </div>
                <div className="space-x-3">
                  <Button variant="outline" onClick={() => setCurrentStep('kyc')} className="border-slate-300 text-slate-600 hover:bg-slate-50">
                    Zurück
                  </Button>
                  <Button 
                    onClick={handlePaymentSubmit}
                    disabled={isProcessingPayment}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md"
                  >
                    {isProcessingPayment ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Zahlung wird verarbeitet...
                      </>
                    ) : (
                      `Bezahlen €17 - ${paymentMethod === 'card' ? 'Karte' : 'Bank'}`
                    )}
                  </Button>
                </div>
              </>
            )}

            {currentStep === 'completion' && (
              <>
                <div className="text-sm text-green-600 font-medium">
                  ✓ ALPHAG8 ID KEY erfolgreich erstellt
                </div>
                <div className="space-x-3">
                  <Button 
                    onClick={handleClose}
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-md"
                  >
                    Zum Dashboard
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}