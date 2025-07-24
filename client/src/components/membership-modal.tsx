import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from './language-provider';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { X, Building, User, MapPin, Phone, Mail, Globe, Briefcase, CheckCircle } from 'lucide-react';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MembershipModal({ isOpen, onClose }: MembershipModalProps) {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Membership Type
    membershipType: '', // 'individual' or 'company'
    
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Company Information (if applicable)
    companyName: '',
    companyRole: '',
    
    // Location
    country: '',
    region: '', // for Italy
    fullAddress: '',
    
    // Agricultural Business
    businessSector: '',
    agriculturalActivity: '',
    hectares: '',
    
    // Contact Preferences
    websiteUrl: '',
    emailContact: false,
    phoneContact: false,
    
    // Agreements
    marketingConsent: false,
    privacyPolicy: false,
    
    // Additional Information
    additionalNotes: ''
  });

  const italianRegions = [
    'Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna',
    'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche',
    'Molise', 'Piemonte', 'Puglia', 'Sardegna', 'Sicilia', 'Toscana',
    'Trentino-Alto Adige', 'Umbria', 'Valle d\'Aosta', 'Veneto'
  ];

  const agriculturalSectors = [
    'crop-production', 'livestock', 'dairy-farming', 'viticulture', 
    'olive-growing', 'fruit-growing', 'organic-farming', 'agroforestry',
    'renewable-energy', 'agritourism', 'food-processing', 'other'
  ];

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const membershipMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('POST', '/api/membership', { 
        ...data, 
        language 
      });
    },
    onSuccess: () => {
      toast({
        title: t('membership-success-title'),
        description: t('membership-success-desc'),
      });
      // Reset form
      setFormData({
        membershipType: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyName: '',
        companyRole: '',
        country: '',
        region: '',
        fullAddress: '',
        businessSector: '',
        agriculturalActivity: '',
        hectares: '',
        websiteUrl: '',
        emailContact: false,
        phoneContact: false,
        marketingConsent: false,
        privacyPolicy: false,
        additionalNotes: ''
      });
      onClose();
    },
    onError: () => {
      toast({
        title: t('membership-error-title'),
        description: t('membership-error-desc'),
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    // Validation
    if (!formData.membershipType || !formData.firstName || !formData.lastName || 
        !formData.email || !formData.phone || !formData.country || 
        !formData.businessSector || !formData.privacyPolicy) {
      toast({
        title: t('validation-error'),
        description: t('required-fields-missing'),
        variant: "destructive",
      });
      return;
    }

    if (formData.membershipType === 'company' && !formData.companyName) {
      toast({
        title: t('validation-error'),
        description: t('company-name-required'),
        variant: "destructive",
      });
      return;
    }

    if (formData.country === 'Italy' && !formData.region) {
      toast({
        title: t('validation-error'),
        description: t('region-required-italy'),
        variant: "destructive",
      });
      return;
    }

    membershipMutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="pb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Building className="h-8 w-8 text-emerald-700" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-light text-slate-900">
                {t('fagri-membership-application')}
              </DialogTitle>
              <p className="text-slate-600 font-light">
                {t('professional-membership-desc')}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Membership Type Selection */}
          <Card className="border-emerald-200 bg-emerald-50">
            <CardHeader>
              <CardTitle className="text-emerald-800 flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>{t('membership-type')}</span>
              </CardTitle>
              <CardDescription className="text-emerald-700">
                {t('select-membership-type')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant={formData.membershipType === 'individual' ? 'default' : 'outline'}
                  onClick={() => updateFormData('membershipType', 'individual')}
                  className={`h-20 flex flex-col space-y-2 ${
                    formData.membershipType === 'individual' 
                      ? 'bg-emerald-600 hover:bg-emerald-700' 
                      : 'border-emerald-300 hover:bg-emerald-50'
                  }`}
                >
                  <User className="h-6 w-6" />
                  <span>{t('individual-membership')}</span>
                </Button>
                
                <Button
                  variant={formData.membershipType === 'company' ? 'default' : 'outline'}
                  onClick={() => updateFormData('membershipType', 'company')}
                  className={`h-20 flex flex-col space-y-2 ${
                    formData.membershipType === 'company' 
                      ? 'bg-emerald-600 hover:bg-emerald-700' 
                      : 'border-emerald-300 hover:bg-emerald-50'
                  }`}
                >
                  <Building className="h-6 w-6" />
                  <span>{t('company-membership')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          {formData.membershipType && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{t('personal-information')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder={t('phone-number')}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Company Information */}
          {formData.membershipType === 'company' && (
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-800 flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>{t('company-information')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-purple-800 font-medium">
                    {t('company-name')} *
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => updateFormData('companyName', e.target.value)}
                    className="border-purple-200 focus:border-purple-500"
                    placeholder={t('company-name')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyRole" className="text-purple-800 font-medium">
                    {t('your-role')}
                  </Label>
                  <Input
                    id="companyRole"
                    value={formData.companyRole}
                    onChange={(e) => updateFormData('companyRole', e.target.value)}
                    className="border-purple-200 focus:border-purple-500"
                    placeholder={t('your-role')}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Location Information */}
          {formData.membershipType && (
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-amber-800 flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>{t('location-information')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-amber-800 font-medium">
                      {t('country')} *
                    </Label>
                    <Select value={formData.country} onValueChange={(value) => updateFormData('country', value)}>
                      <SelectTrigger className="border-amber-200 focus:border-amber-500">
                        <SelectValue placeholder={t('select-country')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Italy">Italy</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Spain">Spain</SelectItem>
                        <SelectItem value="Austria">Austria</SelectItem>
                        <SelectItem value="Switzerland">Switzerland</SelectItem>
                        <SelectItem value="Other">{t('other')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {formData.country === 'Italy' && (
                    <div className="space-y-2">
                      <Label htmlFor="region" className="text-amber-800 font-medium">
                        {t('italian-region')} *
                      </Label>
                      <Select value={formData.region} onValueChange={(value) => updateFormData('region', value)}>
                        <SelectTrigger className="border-amber-200 focus:border-amber-500">
                          <SelectValue placeholder={t('select-region')} />
                        </SelectTrigger>
                        <SelectContent>
                          {italianRegions.map((region) => (
                            <SelectItem key={region} value={region}>{region}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fullAddress" className="text-amber-800 font-medium">
                    {t('full-address')}
                  </Label>
                  <Textarea
                    id="fullAddress"
                    value={formData.fullAddress}
                    onChange={(e) => updateFormData('fullAddress', e.target.value)}
                    className="border-amber-200 focus:border-amber-500"
                    placeholder={t('full-address-placeholder')}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Agricultural Business */}
          {formData.membershipType && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>{t('agricultural-business')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessSector" className="text-green-800 font-medium">
                      {t('business-sector')} *
                    </Label>
                    <Select value={formData.businessSector} onValueChange={(value) => updateFormData('businessSector', value)}>
                      <SelectTrigger className="border-green-200 focus:border-green-500">
                        <SelectValue placeholder={t('select-sector')} />
                      </SelectTrigger>
                      <SelectContent>
                        {agriculturalSectors.map((sector) => (
                          <SelectItem key={sector} value={sector}>{t(sector)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hectares" className="text-green-800 font-medium">
                      {t('hectares')}
                    </Label>
                    <Input
                      id="hectares"
                      value={formData.hectares}
                      onChange={(e) => updateFormData('hectares', e.target.value)}
                      className="border-green-200 focus:border-green-500"
                      placeholder={t('hectares-placeholder')}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="agriculturalActivity" className="text-green-800 font-medium">
                    {t('agricultural-activity-detail')}
                  </Label>
                  <Textarea
                    id="agriculturalActivity"
                    value={formData.agriculturalActivity}
                    onChange={(e) => updateFormData('agriculturalActivity', e.target.value)}
                    className="border-green-200 focus:border-green-500"
                    placeholder={t('describe-activities')}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Preferences */}
          {formData.membershipType && (
            <Card className="border-indigo-200 bg-indigo-50">
              <CardHeader>
                <CardTitle className="text-indigo-800 flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>{t('contact-preferences')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl" className="text-indigo-800 font-medium">
                    {t('website-url')}
                  </Label>
                  <Input
                    id="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={(e) => updateFormData('websiteUrl', e.target.value)}
                    className="border-indigo-200 focus:border-indigo-500"
                    placeholder="https://your-website.com"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label className="text-indigo-800 font-medium">{t('preferred-contact-methods')}</Label>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="emailContact"
                      checked={formData.emailContact}
                      onCheckedChange={(checked) => updateFormData('emailContact', checked)}
                    />
                    <Label htmlFor="emailContact" className="text-indigo-700">
                      {t('contact-by-email')}
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="phoneContact"
                      checked={formData.phoneContact}
                      onCheckedChange={(checked) => updateFormData('phoneContact', checked)}
                    />
                    <Label htmlFor="phoneContact" className="text-indigo-700">
                      {t('contact-by-phone')}
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Agreements */}
          {formData.membershipType && (
            <Card className="border-slate-200 bg-slate-50">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>{t('agreements-consent')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="marketingConsent"
                    checked={formData.marketingConsent}
                    onCheckedChange={(checked) => updateFormData('marketingConsent', checked)}
                  />
                  <Label htmlFor="marketingConsent" className="text-slate-700 leading-relaxed">
                    {t('marketing-consent-text')}
                  </Label>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="privacyPolicy"
                    checked={formData.privacyPolicy}
                    onCheckedChange={(checked) => updateFormData('privacyPolicy', checked)}
                  />
                  <Label htmlFor="privacyPolicy" className="text-slate-700 leading-relaxed">
                    {t('privacy-policy-agreement')} *
                  </Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="additionalNotes" className="text-slate-800 font-medium">
                    {t('additional-notes')}
                  </Label>
                  <Textarea
                    id="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                    className="border-slate-200 focus:border-slate-500"
                    placeholder={t('additional-notes-placeholder')}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          {formData.membershipType && (
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={handleSubmit}
                disabled={membershipMutation.isPending}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-3"
              >
                {membershipMutation.isPending ? t('submitting') : t('submit-application')}
              </Button>
              
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50 py-3"
              >
                {t('cancel')}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}