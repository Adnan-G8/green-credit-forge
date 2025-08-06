import { useState } from 'react';
import { useLanguage } from './language-provider';
import { X, Building2, MapPin, Phone, Mail, FileText, Users, Calculator, Upload, Save, Plus, Trash2, Wrench, Home, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OrganizationInformationModalProps {
  isOpen: boolean;
  onClose: () => void;
  alphaG8Id: string;
}

export function OrganizationInformationModal({ isOpen, onClose, alphaG8Id }: OrganizationInformationModalProps) {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);

  // Organization Legal Information
  const [legalForm, setLegalForm] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [fiscalCode, setFiscalCode] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  // Legal Address Fields
  const [legalStreet, setLegalStreet] = useState('');
  const [legalStreet2, setLegalStreet2] = useState('');
  const [legalCity, setLegalCity] = useState('');
  const [legalPostalCode, setLegalPostalCode] = useState('');
  const [legalProvince, setLegalProvince] = useState('');
  const [legalCountry, setLegalCountry] = useState('Italia');
  
  // Operational Address Fields
  const [operationalStreet, setOperationalStreet] = useState('');
  const [operationalStreet2, setOperationalStreet2] = useState('');
  const [operationalCity, setOperationalCity] = useState('');
  const [operationalPostalCode, setOperationalPostalCode] = useState('');
  const [operationalProvince, setOperationalProvince] = useState('');
  const [operationalCountry, setOperationalCountry] = useState('Italia');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [pecAddress, setPecAddress] = useState('');
  const [legalRepresentative, setLegalRepresentative] = useState('');
  const [technicalManager, setTechnicalManager] = useState('');

  // Agricultural Assets Information
  const [totalLandArea, setTotalLandArea] = useState('');
  const [agriculturalLandArea, setAgriculturalLandArea] = useState('');
  const [forestLandArea, setForestLandArea] = useState('');
  const [irrigatedArea, setIrrigatedArea] = useState('');
  // Dynamic Asset Lists
  const [machineryList, setMachineryList] = useState([{ type: '', model: '', capacity: '', description: '' }]);
  const [buildingsList, setBuildingsList] = useState([{ type: '', size: '', purpose: '', description: '' }]);
  const [renewableEnergyList, setRenewableEnergyList] = useState([{ type: '', capacity: '', productionCapacity: '', location: '', description: '' }]);

  // Dynamic List Management Functions
  const addMachinery = () => {
    setMachineryList([...machineryList, { type: '', model: '', capacity: '', description: '' }]);
  };

  const removeMachinery = (index: number) => {
    if (machineryList.length > 1) {
      setMachineryList(machineryList.filter((_, i) => i !== index));
    }
  };

  const updateMachinery = (index: number, field: string, value: string) => {
    const updatedList = [...machineryList];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setMachineryList(updatedList);
  };

  const addBuilding = () => {
    setBuildingsList([...buildingsList, { type: '', size: '', purpose: '', description: '' }]);
  };

  const removeBuilding = (index: number) => {
    if (buildingsList.length > 1) {
      setBuildingsList(buildingsList.filter((_, i) => i !== index));
    }
  };

  const updateBuilding = (index: number, field: string, value: string) => {
    const updatedList = [...buildingsList];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setBuildingsList(updatedList);
  };

  const addRenewableEnergy = () => {
    setRenewableEnergyList([...renewableEnergyList, { type: '', capacity: '', productionCapacity: '', location: '', description: '' }]);
  };

  const removeRenewableEnergy = (index: number) => {
    if (renewableEnergyList.length > 1) {
      setRenewableEnergyList(renewableEnergyList.filter((_, i) => i !== index));
    }
  };

  const updateRenewableEnergy = (index: number, field: string, value: string) => {
    const updatedList = [...renewableEnergyList];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setRenewableEnergyList(updatedList);
  };

  // Certification and Compliance
  const [isocertifications, setIsoCertifications] = useState('');
  const [organicCertification, setOrganicCertification] = useState('');
  const [environmentalCertifications, setEnvironmentalCertifications] = useState('');
  const [complianceDocuments, setComplianceDocuments] = useState('');

  // Project Capacity Information
  const [plannedCo2Projects, setPlannedCo2Projects] = useState('');
  const [expectedAnnualCapture, setExpectedAnnualCapture] = useState('');
  const [projectDuration, setProjectDuration] = useState('');
  const [investmentCapacity, setInvestmentCapacity] = useState('');

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      const organizationData = {
        alphaG8Id,
        legalForm,
        companyName,
        vatNumber,
        fiscalCode,
        registrationNumber,
        legalAddress: {
          street: legalStreet,
          street2: legalStreet2,
          city: legalCity,
          postalCode: legalPostalCode,
          province: legalProvince,
          country: legalCountry
        },
        operationalAddress: {
          street: operationalStreet,
          street2: operationalStreet2,
          city: operationalCity,
          postalCode: operationalPostalCode,
          province: operationalProvince,
          country: operationalCountry
        },
        phoneNumber,
        emailAddress,
        pecAddress,
        legalRepresentative,
        technicalManager,
        totalLandArea,
        agriculturalLandArea,
        forestLandArea,
        irrigatedArea,
        machineryList,
        buildingsList,
        renewableEnergyList,
        isocertifications,
        organicCertification,
        environmentalCertifications,
        complianceDocuments,
        plannedCo2Projects,
        expectedAnnualCapture,
        projectDuration,
        investmentCapacity,
        submittedAt: new Date().toISOString()
      };

      const response = await fetch('/api/organization-information', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(organizationData),
      });

      if (response.ok) {
        console.log('Organization information saved successfully');
        onClose();
      } else {
        console.error('Failed to save organization information');
      }
    } catch (error) {
      console.error('Error saving organization information:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const renderSection1 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
          <Building2 className="h-5 w-5 mr-2" />
          {t('org-legal-entity-info')}
        </h3>
        <p className="text-sm text-blue-800">{t('org-enter-mandatory-data')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="legalForm">{t('org-legal-form')} *</Label>
          <Select value={legalForm} onValueChange={setLegalForm}>
            <SelectTrigger>
              <SelectValue placeholder={t('org-select-legal-form')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="srl">S.r.l. - Società a Responsabilità Limitata</SelectItem>
              <SelectItem value="spa">S.p.A. - Società per Azioni</SelectItem>
              <SelectItem value="snc">S.n.c. - Società in Nome Collettivo</SelectItem>
              <SelectItem value="sas">S.a.s. - Società in Accomandita Semplice</SelectItem>
              <SelectItem value="cooperative">Società Cooperativa Agricola</SelectItem>
              <SelectItem value="individual">Ditta Individuale</SelectItem>
              <SelectItem value="other">Altra Forma Giuridica</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="companyName">{t('org-company-name')} *</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder={t('org-enter-company-name')}
            required
          />
        </div>

        <div>
          <Label htmlFor="vatNumber">{t('org-vat-number')} *</Label>
          <Input
            id="vatNumber"
            value={vatNumber}
            onChange={(e) => setVatNumber(e.target.value)}
            placeholder="IT00000000000"
            required
          />
        </div>

        <div>
          <Label htmlFor="fiscalCode">{t('org-tax-code')} *</Label>
          <Input
            id="fiscalCode"
            value={fiscalCode}
            onChange={(e) => setFiscalCode(e.target.value)}
            placeholder={t('org-enter-tax-code')}
            required
          />
        </div>

        <div>
          <Label htmlFor="registrationNumber">{t('org-chamber-registration')} *</Label>
          <Input
            id="registrationNumber"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            placeholder={t('org-enter-registration')}
            required
          />
        </div>
      </div>

      {/* Legal Address Section */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-gray-100">{t('org-legal-address')} *</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="legalStreet">{t('org-street-address')} *</Label>
            <Input
              id="legalStreet"
              value={legalStreet}
              onChange={(e) => setLegalStreet(e.target.value)}
              placeholder={t('org-enter-street-address')}
              required
            />
          </div>
          <div>
            <Label htmlFor="legalStreet2">{t('org-address-line-2')}</Label>
            <Input
              id="legalStreet2"
              value={legalStreet2}
              onChange={(e) => setLegalStreet2(e.target.value)}
              placeholder={t('org-enter-address-line-2')}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="legalCity">{t('org-city')} *</Label>
            <Input
              id="legalCity"
              value={legalCity}
              onChange={(e) => setLegalCity(e.target.value)}
              placeholder={t('org-enter-city')}
              required
            />
          </div>
          <div>
            <Label htmlFor="legalPostalCode">{t('org-postal-code')} *</Label>
            <Input
              id="legalPostalCode"
              value={legalPostalCode}
              onChange={(e) => setLegalPostalCode(e.target.value)}
              placeholder={t('org-enter-postal-code')}
              required
            />
          </div>
          <div>
            <Label htmlFor="legalProvince">{t('org-province-state')} *</Label>
            <Input
              id="legalProvince"
              value={legalProvince}
              onChange={(e) => setLegalProvince(e.target.value)}
              placeholder={t('org-enter-province-state')}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="legalCountry">{t('org-country')} *</Label>
          <Input
            id="legalCountry"
            value={legalCountry}
            onChange={(e) => setLegalCountry(e.target.value)}
            placeholder={t('org-enter-country')}
            required
          />
        </div>
      </div>

      {/* Operational Address Section */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-gray-100">{t('org-operational-address')}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{t('org-operational-address-note')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="operationalStreet">{t('org-street-address')}</Label>
            <Input
              id="operationalStreet"
              value={operationalStreet}
              onChange={(e) => setOperationalStreet(e.target.value)}
              placeholder={t('org-enter-street-address')}
            />
          </div>
          <div>
            <Label htmlFor="operationalStreet2">{t('org-address-line-2')}</Label>
            <Input
              id="operationalStreet2"
              value={operationalStreet2}
              onChange={(e) => setOperationalStreet2(e.target.value)}
              placeholder={t('org-enter-address-line-2')}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="operationalCity">{t('org-city')}</Label>
            <Input
              id="operationalCity"
              value={operationalCity}
              onChange={(e) => setOperationalCity(e.target.value)}
              placeholder={t('org-enter-city')}
            />
          </div>
          <div>
            <Label htmlFor="operationalPostalCode">{t('org-postal-code')}</Label>
            <Input
              id="operationalPostalCode"
              value={operationalPostalCode}
              onChange={(e) => setOperationalPostalCode(e.target.value)}
              placeholder={t('org-enter-postal-code')}
            />
          </div>
          <div>
            <Label htmlFor="operationalProvince">{t('org-province-state')}</Label>
            <Input
              id="operationalProvince"
              value={operationalProvince}
              onChange={(e) => setOperationalProvince(e.target.value)}
              placeholder={t('org-enter-province-state')}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="operationalCountry">{t('org-country')}</Label>
          <Input
            id="operationalCountry"
            value={operationalCountry}
            onChange={(e) => setOperationalCountry(e.target.value)}
            placeholder={t('org-enter-country')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phoneNumber">{t('org-phone-number')} *</Label>
          <Input
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+39 000 000 0000"
            required
          />
        </div>

        <div>
          <Label htmlFor="emailAddress">{t('org-email-address')} *</Label>
          <Input
            id="emailAddress"
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            placeholder="info@company.it"
            required
          />
        </div>

        <div>
          <Label htmlFor="pecAddress">{t('org-pec-address')} *</Label>
          <Input
            id="pecAddress"
            type="email"
            value={pecAddress}
            onChange={(e) => setPecAddress(e.target.value)}
            placeholder={t('org-enter-pec-address')}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="legalRepresentative">{t('org-legal-representative')} *</Label>
          <Input
            id="legalRepresentative"
            value={legalRepresentative}
            onChange={(e) => setLegalRepresentative(e.target.value)}
            placeholder={t('org-enter-legal-representative')}
            required
          />
        </div>

        <div>
          <Label htmlFor="technicalManager">{t('org-technical-manager')} *</Label>
          <Input
            id="technicalManager"
            value={technicalManager}
            onChange={(e) => setTechnicalManager(e.target.value)}
            placeholder={t('org-enter-technical-manager')}
            required
          />
        </div>
      </div>
    </div>
  );

  const renderSection2 = () => (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-900 mb-2 flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          {t('agricultural-assets-facilities')}
        </h3>
        <p className="text-sm text-green-800">{t('agricultural-assets-description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="totalLandArea">{t('total-land-area-hectares')} *</Label>
          <Input
            id="totalLandArea"
            type="number"
            value={totalLandArea}
            onChange={(e) => setTotalLandArea(e.target.value)}
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>

        <div>
          <Label htmlFor="agriculturalLandArea">{t('agricultural-land-hectares')} *</Label>
          <Input
            id="agriculturalLandArea"
            type="number"
            value={agriculturalLandArea}
            onChange={(e) => setAgriculturalLandArea(e.target.value)}
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>

        <div>
          <Label htmlFor="forestLandArea">{t('forest-agroforest-hectares')}</Label>
          <Input
            id="forestLandArea"
            type="number"
            value={forestLandArea}
            onChange={(e) => setForestLandArea(e.target.value)}
            placeholder="0.00"
            step="0.01"
          />
        </div>

        <div>
          <Label htmlFor="irrigatedArea">{t('irrigated-area-hectares')}</Label>
          <Input
            id="irrigatedArea"
            type="number"
            value={irrigatedArea}
            onChange={(e) => setIrrigatedArea(e.target.value)}
            placeholder="0.00"
            step="0.01"
          />
        </div>
      </div>

      {/* Dynamic Machinery & Equipment Inventory */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-medium flex items-center">
            <Wrench className="h-5 w-5 mr-2 text-orange-600" />
            {t('machinery-equipment-inventory')} *
          </Label>
          <Button
            type="button"
            onClick={addMachinery}
            className="bg-orange-600 hover:bg-orange-700 text-white"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            {t('add-machinery')}
          </Button>
        </div>
        
        <div className="space-y-3">
          {machineryList.map((machinery, index) => (
            <div key={index} className="bg-orange-50 p-4 rounded-lg border border-orange-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-orange-900">
                  {t('machinery-item')} {index + 1}
                </span>
                {machineryList.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeMachinery(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>{t('machinery-type')}</Label>
                  <Select 
                    value={machinery.type} 
                    onValueChange={(value) => updateMachinery(index, 'type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('select-machinery-type')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tractor">{t('tractor')}</SelectItem>
                      <SelectItem value="harvester">{t('harvester')}</SelectItem>
                      <SelectItem value="planter">{t('planter')}</SelectItem>
                      <SelectItem value="sprayer">{t('sprayer')}</SelectItem>
                      <SelectItem value="cultivator">{t('cultivator')}</SelectItem>
                      <SelectItem value="irrigation-system">{t('irrigation-system')}</SelectItem>
                      <SelectItem value="other-machinery">{t('other-machinery')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>{t('model-brand')}</Label>
                  <Input
                    value={machinery.model}
                    onChange={(e) => updateMachinery(index, 'model', e.target.value)}
                    placeholder={t('enter-model-brand')}
                  />
                </div>
                
                <div>
                  <Label>{t('capacity-power')}</Label>
                  <Input
                    value={machinery.capacity}
                    onChange={(e) => updateMachinery(index, 'capacity', e.target.value)}
                    placeholder={t('enter-capacity-power')}
                  />
                </div>
                
                <div>
                  <Label>{t('additional-description')}</Label>
                  <Textarea
                    value={machinery.description}
                    onChange={(e) => updateMachinery(index, 'description', e.target.value)}
                    placeholder={t('enter-additional-info')}
                    rows={2}
                    className="resize-y"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Buildings & Structures Inventory */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-medium flex items-center">
            <Home className="h-5 w-5 mr-2 text-blue-600" />
            {t('buildings-structures-inventory')} *
          </Label>
          <Button
            type="button"
            onClick={addBuilding}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            {t('add-building')}
          </Button>
        </div>
        
        <div className="space-y-3">
          {buildingsList.map((building, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-blue-900">
                  {t('building-item')} {index + 1}
                </span>
                {buildingsList.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeBuilding(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label>{t('building-type')}</Label>
                  <Select 
                    value={building.type} 
                    onValueChange={(value) => updateBuilding(index, 'type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('select-building-type')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warehouse">{t('warehouse')}</SelectItem>
                      <SelectItem value="stable">{t('stable')}</SelectItem>
                      <SelectItem value="greenhouse">{t('greenhouse')}</SelectItem>
                      <SelectItem value="storage-silo">{t('storage-silo')}</SelectItem>
                      <SelectItem value="processing-facility">{t('processing-facility')}</SelectItem>
                      <SelectItem value="office-building">{t('office-building')}</SelectItem>
                      <SelectItem value="other-building">{t('other-building')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>{t('size-area')}</Label>
                  <Input
                    value={building.size}
                    onChange={(e) => updateBuilding(index, 'size', e.target.value)}
                    placeholder={t('enter-size-area')}
                  />
                </div>
                
                <div>
                  <Label>{t('purpose-use')}</Label>
                  <Input
                    value={building.purpose}
                    onChange={(e) => updateBuilding(index, 'purpose', e.target.value)}
                    placeholder={t('enter-purpose-use')}
                  />
                </div>
                
                <div className="md:col-span-3">
                  <Label>{t('additional-description')}</Label>
                  <Textarea
                    value={building.description}
                    onChange={(e) => updateBuilding(index, 'description', e.target.value)}
                    placeholder={t('enter-additional-info')}
                    rows={2}
                    className="resize-y"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Renewable Energy Installations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-medium flex items-center">
            <Zap className="h-5 w-5 mr-2 text-green-600" />
            {t('renewable-energy-installations')}
          </Label>
          <Button
            type="button"
            onClick={addRenewableEnergy}
            className="bg-green-600 hover:bg-green-700 text-white"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            {t('add-renewable-energy')}
          </Button>
        </div>
        
        <div className="space-y-3">
          {renewableEnergyList.map((renewable, index) => (
            <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-green-900">
                  {t('renewable-energy-item')} {index + 1}
                </span>
                {renewableEnergyList.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeRenewableEnergy(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>{t('renewable-energy-type')}</Label>
                  <Select 
                    value={renewable.type} 
                    onValueChange={(value) => updateRenewableEnergy(index, 'type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('select-renewable-type')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solar-photovoltaic">{t('solar-photovoltaic')}</SelectItem>
                      <SelectItem value="solar-thermal">{t('solar-thermal')}</SelectItem>
                      <SelectItem value="wind-turbines">{t('wind-turbines')}</SelectItem>
                      <SelectItem value="hydroelectric">{t('hydroelectric')}</SelectItem>
                      <SelectItem value="biomass-energy">{t('biomass-energy')}</SelectItem>
                      <SelectItem value="biogas-production">{t('biogas-production')}</SelectItem>
                      <SelectItem value="geothermal">{t('geothermal')}</SelectItem>
                      <SelectItem value="agrivoltaics">{t('agrivoltaics')}</SelectItem>
                      <SelectItem value="other-renewable">{t('other-renewable')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>{t('installed-capacity')}</Label>
                  <Input
                    value={renewable.capacity}
                    onChange={(e) => updateRenewableEnergy(index, 'capacity', e.target.value)}
                    placeholder={t('enter-installed-capacity')}
                  />
                </div>
                
                <div>
                  <Label>{t('production-capacity')}</Label>
                  <Input
                    value={renewable.productionCapacity}
                    onChange={(e) => updateRenewableEnergy(index, 'productionCapacity', e.target.value)}
                    placeholder={t('enter-production-capacity')}
                  />
                </div>
                
                <div>
                  <Label>{t('location-area')}</Label>
                  <Input
                    value={renewable.location}
                    onChange={(e) => updateRenewableEnergy(index, 'location', e.target.value)}
                    placeholder={t('enter-location-area')}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label>{t('additional-description')}</Label>
                  <Textarea
                    value={renewable.description}
                    onChange={(e) => updateRenewableEnergy(index, 'description', e.target.value)}
                    placeholder={t('enter-additional-info')}
                    rows={2}
                    className="resize-y"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSection3 = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <h3 className="font-semibold text-purple-900 mb-2 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          {t('certifications-compliance')}
        </h3>
        <p className="text-sm text-purple-800">{t('certifications-compliance-description')}</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="isoCertifications">{t('iso-certifications')}</Label>
          <Textarea
            id="isoCertifications"
            value={isocertifications}
            onChange={(e) => setIsoCertifications(e.target.value)}
            placeholder={t('list-iso-certifications')}
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor="organicCertification">{t('organic-bio-certifications')}</Label>
          <Textarea
            id="organicCertification"
            value={organicCertification}
            onChange={(e) => setOrganicCertification(e.target.value)}
            placeholder={t('list-organic-certifications')}
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor="environmentalCertifications">{t('environmental-certifications')}</Label>
          <Textarea
            id="environmentalCertifications"
            value={environmentalCertifications}
            onChange={(e) => setEnvironmentalCertifications(e.target.value)}
            placeholder={t('list-environmental-certifications')}
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor="complianceDocuments">{t('compliance-documentation')}</Label>
          <Textarea
            id="complianceDocuments"
            value={complianceDocuments}
            onChange={(e) => setComplianceDocuments(e.target.value)}
            placeholder={t('describe-compliance-documentation')}
            rows={3}
          />
        </div>
      </div>

      <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
        <h3 className="font-semibold text-emerald-900 mb-2 flex items-center">
          <Calculator className="h-5 w-5 mr-2" />
          {t('co2-project-capacity')}
        </h3>
        <p className="text-sm text-emerald-800">{t('co2-project-capacity-description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="plannedCo2Projects">{t('planned-co2-projects')}</Label>
          <Select value={plannedCo2Projects} onValueChange={setPlannedCo2Projects}>
            <SelectTrigger>
              <SelectValue placeholder={t('select-project-scope')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="agriculture-only">{t('agriculture-only')}</SelectItem>
              <SelectItem value="forestry-only">{t('forestry-only')}</SelectItem>
              <SelectItem value="renewable-only">{t('renewable-energy-only')}</SelectItem>
              <SelectItem value="agriculture-forestry">{t('agriculture-forestry')}</SelectItem>
              <SelectItem value="agriculture-renewable">{t('agriculture-renewable')}</SelectItem>
              <SelectItem value="forestry-renewable">{t('forestry-renewable')}</SelectItem>
              <SelectItem value="all-three">{t('all-three-sectors')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="expectedAnnualCapture">{t('expected-annual-co2-capture')}</Label>
          <Input
            id="expectedAnnualCapture"
            type="number"
            value={expectedAnnualCapture}
            onChange={(e) => setExpectedAnnualCapture(e.target.value)}
            placeholder={t('tonnes-co2-per-year')}
            step="0.1"
          />
        </div>

        <div>
          <Label htmlFor="projectDuration">{t('project-duration-years')}</Label>
          <Input
            id="projectDuration"
            type="number"
            value={projectDuration}
            onChange={(e) => setProjectDuration(e.target.value)}
            placeholder={t('years')}
            min="1"
            max="30"
          />
        </div>

        <div>
          <Label htmlFor="investmentCapacity">{t('investment-capacity-euros')}</Label>
          <Input
            id="investmentCapacity"
            type="number"
            value={investmentCapacity}
            onChange={(e) => setInvestmentCapacity(e.target.value)}
            placeholder="€ 0"
            step="1000"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-light">{t('org-info-title')}</h2>
              <p className="text-blue-100 text-sm">{t('org-complete-documentation')}</p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-4 flex space-x-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full ${
                  step <= currentSection ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <div className="mt-2 text-sm text-blue-100">
            {t('org-step-1-of-3')}: {
              currentSection === 1 ? t('org-legal-entity-info') :
              currentSection === 2 ? t('agricultural-assets-facilities') :
              t('certifications-compliance')
            }
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentSection === 1 && renderSection1()}
          {currentSection === 2 && renderSection2()}
          {currentSection === 3 && renderSection3()}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 border-t">
          <div className="flex justify-between">
            <Button
              onClick={() => setCurrentSection(Math.max(1, currentSection - 1))}
              variant="outline"
              disabled={currentSection === 1}
            >
              {t('org-previous')}
            </Button>
            
            <div className="flex space-x-3">
              {currentSection < 3 ? (
                <Button
                  onClick={() => setCurrentSection(currentSection + 1)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {t('org-next')}
                </Button>
              ) : (
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? t('saving') : t('save-organization-information')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}