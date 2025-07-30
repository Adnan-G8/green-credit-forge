import { useState, useMemo } from 'react';
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
import { X, Building, User, MapPin, Phone, Mail, Globe, Briefcase, CheckCircle, Search } from 'lucide-react';
import { FagriLogo } from '../assets/fagri-logo';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MembershipModal({ isOpen, onClose }: MembershipModalProps) {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  // Country search state
  const [countrySearch, setCountrySearch] = useState('');
  
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
    streetAddress: '',
    city: '',
    postalCode: '',
    province: '', // for detailed location info
    
    // Agricultural Business - Hierarchical Structure
    businessSector: '', // Main category
    businessSubSector: '', // Sub-category based on main sector
    agriculturalActivity: '', // Specific activities within sub-sector
    hectares: '',
    renewableEnergyType: '', // for renewable energy sector
    renewableCapacity: '', // MW or kW for renewable energy
    specificActivities: [], // Multiple choice array for specific activities
    
    // Contact Preferences
    websiteUrl: '',
    emailContact: false,
    phoneContact: false,
    
    // Agreements
    marketingConsent: false,
    
    // Additional Information
    additionalNotes: ''
  });

  // Italian Regions - 20 total
  const italianRegions = [
    'Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna',
    'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche',
    'Molise', 'Piemonte', 'Puglia', 'Sardegna', 'Sicilia',
    'Toscana', 'Trentino-Alto Adige', 'Umbria', "Valle d'Aosta", 'Veneto'
  ];

  const countries = [
    // EU Member States  
    'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic',
    'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece',
    'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg',
    'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia',
    'Slovenia', 'Spain', 'Sweden',
    // EEA Countries
    'Iceland', 'Liechtenstein', 'Norway', 'Switzerland',
    // Partner Countries
    'Albania', 'Bosnia and Herzegovina', 'Georgia', 'Moldova', 'Montenegro',
    'North Macedonia', 'Serbia', 'Turkey'
  ];

  const filteredCountries = useMemo(() => {
    if (!countrySearch) return countries;
    return countries.filter(country => 
      country.toLowerCase().includes(countrySearch.toLowerCase())
    );
  }, [countrySearch]);



  // Hierarchical Agricultural Business Structure
  const businessSectors = [
    'farmer-producer', 
    'cooperative-association', 
    'agricultural-industry', 
    'renewable-energy', 
    'agri-services'
  ];

  // Sub-sectors for each main business sector
  const subSectorsByCategory = {
    'farmer-producer': [
      'crop-production', 'livestock-farming', 'dairy-farming', 'viticulture', 
      'olive-production', 'fruit-growing', 'organic-farming', 'mixed-farming'
    ],
    'cooperative-association': [
      'agricultural-cooperative', 'wine-cooperative', 'dairy-cooperative',
      'fruit-vegetable-cooperative', 'marketing-cooperative', 'supply-cooperative'
    ],
    'agricultural-industry': [
      'food-processing', 'dairy-industry', 'wine-industry', 'olive-oil-production',
      'grain-milling', 'meat-processing', 'agricultural-machinery', 'fertilizer-production'
    ],
    'renewable-energy': [
      'solar-farms', 'wind-energy', 'biomass-energy', 'biogas-production',
      'agrivoltaics', 'energy-storage', 'green-hydrogen'
    ],
    'agri-services': [
      'consulting-services', 'certification-services', 'logistics-transport',
      'agricultural-technology', 'financing-services', 'insurance-services'
    ]
  };

  // Specific activities for each sub-sector
  const activitiesBySubSector = {
    // Farmer-Producer Activities
    'crop-production': ['cereals', 'vegetables', 'legumes', 'oilseeds', 'industrial-crops'],
    'livestock-farming': ['cattle', 'sheep', 'goats', 'pigs', 'poultry', 'aquaculture'],
    'dairy-farming': ['milk-production', 'cheese-making', 'yogurt-production', 'organic-dairy'],
    'viticulture': ['wine-grapes', 'table-grapes', 'organic-wine', 'sparkling-wine'],
    'olive-production': ['oil-olives', 'table-olives', 'organic-olives', 'premium-oil'],
    'fruit-growing': ['citrus', 'stone-fruits', 'berries', 'nuts', 'tropical-fruits'],
    'organic-farming': ['organic-cereals', 'organic-vegetables', 'organic-livestock', 'biodynamic'],
    'mixed-farming': ['crop-livestock', 'agrotourism', 'direct-sales', 'farm-to-table'],
    
    // Cooperative Activities
    'agricultural-cooperative': ['member-services', 'bulk-purchasing', 'marketing-support', 'storage-facilities'],
    'wine-cooperative': ['grape-processing', 'wine-production', 'bottling', 'marketing'],
    'dairy-cooperative': ['milk-collection', 'processing', 'distribution', 'quality-control'],
    'fruit-vegetable-cooperative': ['collection', 'packaging', 'distribution', 'quality-standards'],
    'marketing-cooperative': ['brand-development', 'sales-channels', 'export', 'promotion'],
    'supply-cooperative': ['input-purchasing', 'equipment-sharing', 'technical-support', 'financing'],
    
    // Industry Activities
    'food-processing': ['preservation', 'packaging', 'value-addition', 'ready-meals'],
    'dairy-industry': ['pasteurization', 'cheese-production', 'powder-production', 'fermented-products'],
    'wine-industry': ['winemaking', 'aging', 'blending', 'bottling', 'distribution'],
    'olive-oil-production': ['extraction', 'refining', 'packaging', 'quality-testing'],
    'grain-milling': ['flour-production', 'feed-production', 'grain-cleaning', 'storage'],
    'meat-processing': ['slaughtering', 'butchering', 'packaging', 'distribution'],
    'agricultural-machinery': ['manufacturing', 'sales', 'maintenance', 'technology-development'],
    'fertilizer-production': ['organic-fertilizers', 'mineral-fertilizers', 'specialty-products', 'research'],
    
    // Renewable Energy Activities
    'solar-farms': ['photovoltaic-systems', 'solar-thermal', 'maintenance', 'grid-connection'],
    'wind-energy': ['wind-turbines', 'maintenance', 'grid-integration', 'energy-storage'],
    'biomass-energy': ['biomass-production', 'energy-conversion', 'waste-management', 'sustainability'],
    'biogas-production': ['anaerobic-digestion', 'gas-upgrading', 'electricity-generation', 'heat-production'],
    'agrivoltaics': ['dual-use-systems', 'crop-energy-optimization', 'research', 'development'],
    'energy-storage': ['battery-systems', 'grid-services', 'peak-shaving', 'backup-power'],
    'green-hydrogen': ['electrolysis', 'storage', 'transport', 'industrial-applications'],
    
    // Services Activities
    'consulting-services': ['technical-advice', 'business-planning', 'sustainability-consulting', 'certification-support'],
    'certification-services': ['organic-certification', 'quality-standards', 'co2-certification', 'auditing'],
    'logistics-transport': ['farm-to-market', 'cold-chain', 'warehousing', 'distribution'],
    'agricultural-technology': ['precision-agriculture', 'iot-sensors', 'data-analytics', 'automation'],
    'financing-services': ['agricultural-loans', 'investment-funding', 'insurance-products', 'risk-management'],
    'insurance-services': ['crop-insurance', 'livestock-insurance', 'equipment-insurance', 'liability-coverage']
  };

  const renewableEnergyTypes = [
    'solar-photovoltaic', 'solar-thermal', 'wind-turbines', 'hydropower',
    'biomass-energy', 'biogas-production', 'geothermal', 'agrivoltaics',
    'energy-storage', 'grid-integration', 'green-hydrogen', 'other-renewable'
  ];

  const updateFormData = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      // Reset dependent fields when business sector changes
      ...(field === 'businessSector' && { businessSubSector: '', specificActivities: [] }),
      ...(field === 'businessSubSector' && { specificActivities: [] })
    }));
  };

  // Helper functions for hierarchical options
  const getSubSectors = () => {
    if (!formData.businessSector) return [];
    return subSectorsByCategory[formData.businessSector as keyof typeof subSectorsByCategory] || [];
  };

  const getSpecificActivities = () => {
    if (!formData.businessSubSector) return [];
    return activitiesBySubSector[formData.businessSubSector as keyof typeof activitiesBySubSector] || [];
  };

  const handleSpecificActivityToggle = (activity: string) => {
    const currentActivities = formData.specificActivities;
    const newActivities = currentActivities.includes(activity)
      ? currentActivities.filter(a => a !== activity)
      : [...currentActivities, activity];
    updateFormData('specificActivities', newActivities);
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
        streetAddress: '',
        city: '',
        postalCode: '',
        province: '',
        businessSector: '',
        businessSubSector: '',
        agriculturalActivity: '',
        hectares: '',
        renewableEnergyType: '',
        renewableCapacity: '',
        specificActivities: [],
        websiteUrl: '',
        emailContact: false,
        phoneContact: false,
        marketingConsent: false,
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
        !formData.businessSector) {
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
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader className="pb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
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
              
              {/* FAGRI Logo */}
              <div className="flex items-center">
                <FagriLogo className="w-24 h-14" />
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
                    <Label htmlFor="region" className="text-amber-800 font-medium">
                      {t('italian-region')} *
                    </Label>
                    <Select value={formData.region} onValueChange={(value) => {
                      updateFormData('region', value);
                    }}>
                      <SelectTrigger className="border-amber-200 focus:border-amber-500">
                        <SelectValue placeholder={t('select-region')} />
                      </SelectTrigger>
                      <SelectContent>
                        {italianRegions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="province" className="text-amber-800 font-medium">
                      {t('province-state')}
                    </Label>
                    <Input
                      id="province"
                      value={formData.province}
                      onChange={(e) => updateFormData('province', e.target.value)}
                      className="border-amber-200 focus:border-amber-500"
                      placeholder={t('province-placeholder')}
                    />
                  </div>
                </div>
                
                {/* Structured Address Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="streetAddress" className="text-amber-800 font-medium">
                      {t('street-address')} *
                    </Label>
                    <Input
                      id="streetAddress"
                      value={formData.streetAddress}
                      onChange={(e) => updateFormData('streetAddress', e.target.value)}
                      className="border-amber-200 focus:border-amber-500"
                      placeholder={t('street-address-placeholder')}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-amber-800 font-medium">
                      {t('city')} *
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateFormData('city', e.target.value)}
                      className="border-amber-200 focus:border-amber-500"
                      placeholder={t('city-placeholder')}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode" className="text-amber-800 font-medium">
                      {t('postal-code')} *
                    </Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => updateFormData('postalCode', e.target.value)}
                      className="border-amber-200 focus:border-amber-500"
                      placeholder={t('postal-code-placeholder')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Hierarchical Agricultural Business */}
          {formData.membershipType && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>{t('agricultural-business')}</span>
                </CardTitle>
                <CardDescription className="text-green-700">
                  {t('business-hierarchy-desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Level 1: Main Business Sector */}
                <div className="space-y-2">
                  <Label htmlFor="businessSector" className="text-green-800 font-medium">
                    {t('main-business-sector')} *
                  </Label>
                  <Select value={formData.businessSector} onValueChange={(value) => updateFormData('businessSector', value)}>
                    <SelectTrigger className="border-green-200 focus:border-green-500">
                      <SelectValue placeholder={t('select-main-sector')} />
                    </SelectTrigger>
                    <SelectContent>
                      {businessSectors.map((sector) => (
                        <SelectItem key={sector} value={sector}>{t(sector)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Level 2: Sub-Sector (appears when main sector is selected) */}
                {formData.businessSector && (
                  <div className="space-y-2">
                    <Label htmlFor="businessSubSector" className="text-green-800 font-medium">
                      {t('business-sub-sector')} *
                    </Label>
                    <Select value={formData.businessSubSector} onValueChange={(value) => updateFormData('businessSubSector', value)}>
                      <SelectTrigger className="border-green-200 focus:border-green-500">
                        <SelectValue placeholder={t('select-sub-sector')} />
                      </SelectTrigger>
                      <SelectContent>
                        {getSubSectors().map((subSector) => (
                          <SelectItem key={subSector} value={subSector}>{t(subSector)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Level 3: Specific Activities (Multiple Choice Checkboxes) */}
                {formData.businessSubSector && getSpecificActivities().length > 0 && (
                  <div className="space-y-3">
                    <Label className="text-green-800 font-medium">
                      {t('specific-activities')} ({t('multiple-choice')})
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-48 overflow-y-auto border border-green-200 rounded-lg p-4 bg-white">
                      {getSpecificActivities().map((activity) => (
                        <div key={activity} className="flex items-center space-x-2">
                          <Checkbox
                            id={`activity-${activity}`}
                            checked={formData.specificActivities.includes(activity)}
                            onCheckedChange={() => handleSpecificActivityToggle(activity)}
                            className="border-green-300"
                          />
                          <Label 
                            htmlFor={`activity-${activity}`} 
                            className="text-sm text-green-700 cursor-pointer leading-tight"
                          >
                            {t(activity)}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {formData.specificActivities.length > 0 && (
                      <div className="text-sm text-green-600">
                        {t('selected-activities')}: {formData.specificActivities.length}
                      </div>
                    )}
                  </div>
                )}

                {/* Additional Information Field */}
                {formData.businessSector && (
                  <div className="space-y-2">
                    <Label htmlFor="agriculturalActivity" className="text-green-800 font-medium">
                      {t('additional-business-info')}
                    </Label>
                    <Textarea
                      id="agriculturalActivity"
                      value={formData.agriculturalActivity}
                      onChange={(e) => updateFormData('agriculturalActivity', e.target.value)}
                      className="border-green-200 focus:border-green-500"
                      placeholder={t('describe-additional-info')}
                      rows={3}
                    />
                  </div>
                )}

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
    </>
  );
}