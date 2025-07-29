import { useState } from 'react';
import { useLanguage } from '@/components/language-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User, Building2, X, Shield, Lock, CreditCard, Banknote, Key, CheckCircle2, Camera, Upload } from 'lucide-react';
import personalKycImage from '@assets/image_1753788790320.png';
import { AlphaG8IdDisplayModal } from './alphag8-id-display-modal';
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
  profilePhoto?: string;
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
    codiceFiscale: '',
    profilePhoto: ''
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const photoInputRef = useState<HTMLInputElement | null>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('La foto deve essere inferiore a 5MB');
        return;
      }
      
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setEmployeeData({
          ...employeeData,
          profilePhoto: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setEmployeeData({
      ...employeeData,
      profilePhoto: ''
    });
  };
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [generatedIdKey, setGeneratedIdKey] = useState<string>('');
  const [showIdModal, setShowIdModal] = useState(false);

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
                        <SelectItem value="agrigento">Agrigento</SelectItem>
                        <SelectItem value="alessandria">Alessandria</SelectItem>
                        <SelectItem value="ancona">Ancona</SelectItem>
                        <SelectItem value="aosta">Aosta</SelectItem>
                        <SelectItem value="arezzo">Arezzo</SelectItem>
                        <SelectItem value="ascoli-piceno">Ascoli Piceno</SelectItem>
                        <SelectItem value="asti">Asti</SelectItem>
                        <SelectItem value="avellino">Avellino</SelectItem>
                        <SelectItem value="bari">Bari</SelectItem>
                        <SelectItem value="barletta-andria-trani">Barletta-Andria-Trani</SelectItem>
                        <SelectItem value="belluno">Belluno</SelectItem>
                        <SelectItem value="benevento">Benevento</SelectItem>
                        <SelectItem value="bergamo">Bergamo</SelectItem>
                        <SelectItem value="biella">Biella</SelectItem>
                        <SelectItem value="bologna">Bologna</SelectItem>
                        <SelectItem value="bolzano">Bolzano</SelectItem>
                        <SelectItem value="brescia">Brescia</SelectItem>
                        <SelectItem value="brindisi">Brindisi</SelectItem>
                        <SelectItem value="cagliari">Cagliari</SelectItem>
                        <SelectItem value="caltanissetta">Caltanissetta</SelectItem>
                        <SelectItem value="campobasso">Campobasso</SelectItem>
                        <SelectItem value="carbonia-iglesias">Carbonia-Iglesias</SelectItem>
                        <SelectItem value="caserta">Caserta</SelectItem>
                        <SelectItem value="catania">Catania</SelectItem>
                        <SelectItem value="catanzaro">Catanzaro</SelectItem>
                        <SelectItem value="chieti">Chieti</SelectItem>
                        <SelectItem value="como">Como</SelectItem>
                        <SelectItem value="cosenza">Cosenza</SelectItem>
                        <SelectItem value="cremona">Cremona</SelectItem>
                        <SelectItem value="crotone">Crotone</SelectItem>
                        <SelectItem value="cuneo">Cuneo</SelectItem>
                        <SelectItem value="enna">Enna</SelectItem>
                        <SelectItem value="fermo">Fermo</SelectItem>
                        <SelectItem value="ferrara">Ferrara</SelectItem>
                        <SelectItem value="firenze">Firenze</SelectItem>
                        <SelectItem value="foggia">Foggia</SelectItem>
                        <SelectItem value="forli-cesena">Forlì-Cesena</SelectItem>
                        <SelectItem value="frosinone">Frosinone</SelectItem>
                        <SelectItem value="genova">Genova</SelectItem>
                        <SelectItem value="gorizia">Gorizia</SelectItem>
                        <SelectItem value="grosseto">Grosseto</SelectItem>
                        <SelectItem value="imperia">Imperia</SelectItem>
                        <SelectItem value="isernia">Isernia</SelectItem>
                        <SelectItem value="la-spezia">La Spezia</SelectItem>
                        <SelectItem value="laquila">L'Aquila</SelectItem>
                        <SelectItem value="latina">Latina</SelectItem>
                        <SelectItem value="lecce">Lecce</SelectItem>
                        <SelectItem value="lecco">Lecco</SelectItem>
                        <SelectItem value="livorno">Livorno</SelectItem>
                        <SelectItem value="lodi">Lodi</SelectItem>
                        <SelectItem value="lucca">Lucca</SelectItem>
                        <SelectItem value="macerata">Macerata</SelectItem>
                        <SelectItem value="mantova">Mantova</SelectItem>
                        <SelectItem value="massa-carrara">Massa-Carrara</SelectItem>
                        <SelectItem value="matera">Matera</SelectItem>
                        <SelectItem value="messina">Messina</SelectItem>
                        <SelectItem value="milano">Milano</SelectItem>
                        <SelectItem value="modena">Modena</SelectItem>
                        <SelectItem value="monza-brianza">Monza e della Brianza</SelectItem>
                        <SelectItem value="napoli">Napoli</SelectItem>
                        <SelectItem value="novara">Novara</SelectItem>
                        <SelectItem value="nuoro">Nuoro</SelectItem>
                        <SelectItem value="oristano">Oristano</SelectItem>
                        <SelectItem value="padova">Padova</SelectItem>
                        <SelectItem value="palermo">Palermo</SelectItem>
                        <SelectItem value="parma">Parma</SelectItem>
                        <SelectItem value="pavia">Pavia</SelectItem>
                        <SelectItem value="perugia">Perugia</SelectItem>
                        <SelectItem value="pesaro-urbino">Pesaro e Urbino</SelectItem>
                        <SelectItem value="pescara">Pescara</SelectItem>
                        <SelectItem value="piacenza">Piacenza</SelectItem>
                        <SelectItem value="pisa">Pisa</SelectItem>
                        <SelectItem value="pistoia">Pistoia</SelectItem>
                        <SelectItem value="pordenone">Pordenone</SelectItem>
                        <SelectItem value="potenza">Potenza</SelectItem>
                        <SelectItem value="prato">Prato</SelectItem>
                        <SelectItem value="ragusa">Ragusa</SelectItem>
                        <SelectItem value="ravenna">Ravenna</SelectItem>
                        <SelectItem value="reggio-calabria">Reggio Calabria</SelectItem>
                        <SelectItem value="reggio-emilia">Reggio Emilia</SelectItem>
                        <SelectItem value="rieti">Rieti</SelectItem>
                        <SelectItem value="rimini">Rimini</SelectItem>
                        <SelectItem value="roma">Roma</SelectItem>
                        <SelectItem value="rovigo">Rovigo</SelectItem>
                        <SelectItem value="salerno">Salerno</SelectItem>
                        <SelectItem value="sassari">Sassari</SelectItem>
                        <SelectItem value="savona">Savona</SelectItem>
                        <SelectItem value="siena">Siena</SelectItem>
                        <SelectItem value="siracusa">Siracusa</SelectItem>
                        <SelectItem value="sondrio">Sondrio</SelectItem>
                        <SelectItem value="taranto">Taranto</SelectItem>
                        <SelectItem value="teramo">Teramo</SelectItem>
                        <SelectItem value="terni">Terni</SelectItem>
                        <SelectItem value="torino">Torino</SelectItem>
                        <SelectItem value="trapani">Trapani</SelectItem>
                        <SelectItem value="trento">Trento</SelectItem>
                        <SelectItem value="treviso">Treviso</SelectItem>
                        <SelectItem value="trieste">Trieste</SelectItem>
                        <SelectItem value="udine">Udine</SelectItem>
                        <SelectItem value="varese">Varese</SelectItem>
                        <SelectItem value="venezia">Venezia</SelectItem>
                        <SelectItem value="verbano-cusio-ossola">Verbano-Cusio-Ossola</SelectItem>
                        <SelectItem value="vercelli">Vercelli</SelectItem>
                        <SelectItem value="verona">Verona</SelectItem>
                        <SelectItem value="vibo-valentia">Vibo Valentia</SelectItem>
                        <SelectItem value="vicenza">Vicenza</SelectItem>
                        <SelectItem value="viterbo">Viterbo</SelectItem>
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
                  
                  {/* Profile Photo Upload */}
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium flex items-center">
                      <Camera className="h-4 w-4 mr-2" />
                      {t('profile-photo')}
                    </Label>
                    <div className="flex items-center space-x-4">
                      {employeeData.profilePhoto ? (
                        <div className="relative">
                          <img 
                            src={employeeData.profilePhoto} 
                            alt="Profile" 
                            className="w-20 h-20 rounded-full object-cover border-2 border-slate-200"
                          />
                          <button
                            type="button"
                            onClick={removePhoto}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center">
                          <Camera className="h-8 w-8 text-slate-400" />
                        </div>
                      )}
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          id="profile-photo-input"
                        />
                        <label
                          htmlFor="profile-photo-input"
                          className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {employeeData.profilePhoto ? t('remove-photo') : t('select-photo')}
                        </label>
                        <p className="text-xs text-slate-500 mt-1">{t('photo-upload-optional')}</p>
                      </div>
                    </div>
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
                  Bezahlung - €20.74 (inkl. 22% MwSt)
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
                  <h4 className="font-semibold text-slate-800 mb-3">Gebührenübersicht:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Digitaler Fingerprint Erstellung</span>
                      <span className="text-slate-800">€5.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Erste Jahresgebühr</span>
                      <span className="text-slate-800">€12.00</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Zwischensumme</span>
                        <span className="text-slate-800">€17.00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Italienische MwSt (22%)</span>
                        <span className="text-slate-800">€3.74</span>
                      </div>
                    </div>
                    <div className="border-t border-slate-300 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-slate-800">Gesamtbetrag</span>
                        <span className="font-bold text-lg text-green-600">€20.74</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500 mt-3">
                    {paymentMethod === 'card' 
                      ? 'Sichere Kreditkartenzahlung über Stripe'
                      : 'Banküberweisung an FAGRI DIGITAL S.r.l.'
                    }
                  </div>
                  <div className="text-xs text-blue-600 mt-2 bg-blue-50 p-2 rounded">
                    <strong>Hinweis:</strong> Jedes Folgejahr beträgt die Gebühr €14.64 (€12.00 + 22% MwSt)
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
                    onClick={() => setShowIdModal(true)}
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-md"
                  >
                    ID KEY Anzeigen
                  </Button>
                  <Button 
                    onClick={handleClose}
                    variant="outline"
                    className="border-slate-300 text-slate-600 hover:bg-slate-50"
                  >
                    Zum Dashboard
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>

      {/* ALPHAG8 ID Display Modal with Profile Photo */}
      <AlphaG8IdDisplayModal
        isOpen={showIdModal}
        onClose={() => setShowIdModal(false)}
        alphaG8Id={generatedIdKey}
        userName={`${employeeData.firstName} ${employeeData.lastName}`}
        userEmail={employeeData.email}
        userRole={userRole}
        profilePhoto={employeeData.profilePhoto}
      />
    </Dialog>
  );
}