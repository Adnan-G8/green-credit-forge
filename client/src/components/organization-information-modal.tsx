import { useState } from 'react';
import { useLanguage } from './language-provider';
import { X, Building2, MapPin, Phone, Mail, FileText, Users, Calculator, Upload, Save } from 'lucide-react';
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
  const [legalAddress, setLegalAddress] = useState('');
  const [operationalAddress, setOperationalAddress] = useState('');
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
  const [machineryDescription, setMachineryDescription] = useState('');
  const [buildingsDescription, setBuildingsDescription] = useState('');
  const [renewableEnergyInstallations, setRenewableEnergyInstallations] = useState('');

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
        legalAddress,
        operationalAddress,
        phoneNumber,
        emailAddress,
        pecAddress,
        legalRepresentative,
        technicalManager,
        totalLandArea,
        agriculturalLandArea,
        forestLandArea,
        irrigatedArea,
        machineryDescription,
        buildingsDescription,
        renewableEnergyInstallations,
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

      <div className="space-y-4">
        <div>
          <Label htmlFor="legalAddress">{t('org-legal-address')} *</Label>
          <Textarea
            id="legalAddress"
            value={legalAddress}
            onChange={(e) => setLegalAddress(e.target.value)}
            placeholder={t('org-enter-legal-address')}
            rows={2}
            required
          />
        </div>

        <div>
          <Label htmlFor="operationalAddress">{t('org-operational-address')}</Label>
          <Textarea
            id="operationalAddress"
            value={operationalAddress}
            onChange={(e) => setOperationalAddress(e.target.value)}
            placeholder={t('org-enter-operational-address')}
            rows={2}
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
          <Label htmlFor="pecAddress">{t('pec-address')} *</Label>
          <Input
            id="pecAddress"
            type="email"
            value={pecAddress}
            onChange={(e) => setPecAddress(e.target.value)}
            placeholder="company@pec.it"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="legalRepresentative">{t('legal-representative')} *</Label>
          <Input
            id="legalRepresentative"
            value={legalRepresentative}
            onChange={(e) => setLegalRepresentative(e.target.value)}
            placeholder={t('full-name-legal-representative')}
            required
          />
        </div>

        <div>
          <Label htmlFor="technicalManager">{t('technical-manager')} *</Label>
          <Input
            id="technicalManager"
            value={technicalManager}
            onChange={(e) => setTechnicalManager(e.target.value)}
            placeholder={t('full-name-technical-manager')}
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

      <div className="space-y-4">
        <div>
          <Label htmlFor="machineryDescription">{t('machinery-equipment-inventory')} *</Label>
          <Textarea
            id="machineryDescription"
            value={machineryDescription}
            onChange={(e) => setMachineryDescription(e.target.value)}
            placeholder={t('describe-agricultural-machinery')}
            rows={3}
            required
          />
        </div>

        <div>
          <Label htmlFor="buildingsDescription">{t('buildings-structures-inventory')} *</Label>
          <Textarea
            id="buildingsDescription"
            value={buildingsDescription}
            onChange={(e) => setBuildingsDescription(e.target.value)}
            placeholder={t('describe-buildings-structures')}
            rows={3}
            required
          />
        </div>

        <div>
          <Label htmlFor="renewableEnergyInstallations">{t('renewable-energy-installations')}</Label>
          <Textarea
            id="renewableEnergyInstallations"
            value={renewableEnergyInstallations}
            onChange={(e) => setRenewableEnergyInstallations(e.target.value)}
            placeholder={t('describe-renewable-energy-systems')}
            rows={3}
          />
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