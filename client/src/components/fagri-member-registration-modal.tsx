import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from './language-provider';
import { MapPin, User, CheckCircle } from 'lucide-react';

interface FagriMemberRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistrationComplete: (memberData: any) => void;
}

export function FagriMemberRegistrationModal({ isOpen, onClose, onRegistrationComplete }: FagriMemberRegistrationModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    region: '',
    fullAddress: '',
    city: '',
    postalCode: '',
    dateOfBirth: '',
    fiscalCode: '' // Italian Tax ID for identification
  });

  const italianRegions = [
    'Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna',
    'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche',
    'Molise', 'Piemonte', 'Puglia', 'Sardegna', 'Sicilia', 'Toscana',
    'Trentino-Alto Adige', 'Umbria', 'Valle d\'Aosta', 'Veneto'
  ];

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validation for FAGRI member requirements
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.phone || !formData.region || !formData.fullAddress || 
        !formData.city || !formData.postalCode) {
      toast({
        title: t('validation-error'),
        description: t('fagri-member-fields-required'),
        variant: "destructive",
      });
      return;
    }

    // Pass registration data to complete the process
    onRegistrationComplete({
      ...formData,
      userRole: 'fagri-member'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="pb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <MapPin className="h-8 w-8 text-emerald-700" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-light text-slate-900">
                {t('fagri-member-registration')}
              </DialogTitle>
              <p className="text-slate-600 font-light">
                {t('fagri-member-identification-desc')}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Regional Identification Requirements */}
          <Card className="border-emerald-200 bg-emerald-50">
            <CardHeader>
              <CardTitle className="text-emerald-800 flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>{t('regional-identification')}</span>
              </CardTitle>
              <CardDescription className="text-emerald-700">
                {t('fagri-member-location-requirement')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region" className="text-emerald-800 font-medium">
                    {t('italian-region')} *
                  </Label>
                  <Select value={formData.region} onValueChange={(value) => updateFormData('region', value)}>
                    <SelectTrigger className="border-emerald-200 focus:border-emerald-500">
                      <SelectValue placeholder={t('select-region')} />
                    </SelectTrigger>
                    <SelectContent>
                      {italianRegions.map((region) => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-emerald-800 font-medium">
                    {t('city')} *
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                    className="border-emerald-200 focus:border-emerald-500"
                    placeholder={t('city')}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="fullAddress" className="text-emerald-800 font-medium">
                    {t('full-address')} *
                  </Label>
                  <Textarea
                    id="fullAddress"
                    value={formData.fullAddress}
                    onChange={(e) => updateFormData('fullAddress', e.target.value)}
                    className="border-emerald-200 focus:border-emerald-500"
                    placeholder={t('street-address-placeholder')}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="postalCode" className="text-emerald-800 font-medium">
                    {t('postal-code')} *
                  </Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => updateFormData('postalCode', e.target.value)}
                    className="border-emerald-200 focus:border-emerald-500"
                    placeholder="00100"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Identification */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>{t('personal-identification')}</span>
              </CardTitle>
              <CardDescription className="text-blue-700">
                {t('identification-verification-desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-blue-800 font-medium">
                    {t('first-name')} *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className="border-blue-200 focus:border-blue-500"
                    placeholder={t('first-name')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-blue-800 font-medium">
                    {t('last-name')} *
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className="border-blue-200 focus:border-blue-500"
                    placeholder={t('last-name')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-blue-800 font-medium">
                    {t('email')} *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="border-blue-200 focus:border-blue-500"
                    placeholder={t('email')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-blue-800 font-medium">
                    {t('phone-number')} *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="border-blue-200 focus:border-blue-500"
                    placeholder="+39 123 456 7890"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-blue-800 font-medium">
                    {t('date-of-birth')}
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fiscalCode" className="text-blue-800 font-medium">
                    {t('fiscal-code')}
                  </Label>
                  <Input
                    id="fiscalCode"
                    value={formData.fiscalCode}
                    onChange={(e) => updateFormData('fiscalCode', e.target.value.toUpperCase())}
                    className="border-blue-200 focus:border-blue-500"
                    placeholder="RSSMRA85M01H501Z"
                    maxLength={16}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Notice */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-800">{t('verification-notice')}</h3>
                  <p className="text-amber-700 font-light mt-1">
                    {t('fagri-verification-process-desc')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-3"
            >
              {t('proceed-to-alphag8-registration')}
            </Button>
            
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50 py-3"
            >
              {t('cancel')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}