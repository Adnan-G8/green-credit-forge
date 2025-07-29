import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/components/language-provider';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Tractor, 
  TreePine, 
  Wind, 
  Leaf, 
  MapPin, 
  Calendar, 
  Euro,
  Plus,
  Minus,
  Info,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface ProjectCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  alphaG8Id: string;
  onProjectCreated?: () => void;
}

export function ProjectCreationModal({ isOpen, onClose, alphaG8Id, onProjectCreated }: ProjectCreationModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Project basic information
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState<'carbon-farming' | 'renewable-energy' | ''>('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [projectDuration, setProjectDuration] = useState('');
  
  // Carbon Farming specific
  const [cropType, setCropType] = useState('');
  const [farmingMethod, setFarmingMethod] = useState('');
  const [cultivatedArea, setCultivatedArea] = useState('');
  const [expectedCO2Sequestration, setExpectedCO2Sequestration] = useState('');
  
  // Renewable Energy specific
  const [energyType, setEnergyType] = useState('');
  const [installedCapacity, setInstalledCapacity] = useState('');
  const [expectedCO2Reduction, setExpectedCO2Reduction] = useState('');
  const [energyLocation, setEnergyLocation] = useState('');
  
  // Investment and timeline
  const [investmentCapacity, setInvestmentCapacity] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setProjectName('');
    setProjectType('');
    setProjectDescription('');
    setProjectLocation('');
    setProjectDuration('');
    setCropType('');
    setFarmingMethod('');
    setCultivatedArea('');
    setExpectedCO2Sequestration('');
    setEnergyType('');
    setInstalledCapacity('');
    setExpectedCO2Reduction('');
    setEnergyLocation('');
    setInvestmentCapacity('');
    setProjectStartDate('');
    setEstimatedCompletionDate('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create project data based on UNI-PdR requirements
      const projectData = {
        id: `PROJ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ownerId: alphaG8Id,
        projectName,
        projectType,
        projectDescription,
        projectLocation,
        projectDuration: parseInt(projectDuration),
        investmentCapacity: parseFloat(investmentCapacity),
        projectStartDate,
        estimatedCompletionDate,
        status: 'draft' as const,
        certificationStatus: 'pending' as const,
        createdAt: new Date().toISOString(),
        blockchainRecorded: false,
        // Type-specific data
        ...(projectType === 'carbon-farming' && {
          cropType,
          farmingMethod,
          cultivatedArea: parseFloat(cultivatedArea),
          expectedCO2Sequestration: parseFloat(expectedCO2Sequestration),
        }),
        ...(projectType === 'renewable-energy' && {
          energyType,
          installedCapacity: parseFloat(installedCapacity),
          expectedCO2Reduction: parseFloat(expectedCO2Reduction),
          energyLocation,
        }),
      };

      // Store project in localStorage (following current storage pattern)
      const existingProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
      const updatedProjects = [...existingProjects, projectData];
      localStorage.setItem('userProjects', JSON.stringify(updatedProjects));

      toast({
        title: t('project-created-success'),
        description: t('project-submitted-review'),
      });

      resetForm();
      onClose();
      if (onProjectCreated) {
        onProjectCreated();
      }
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: t('error'),
        description: t('project-failed-create'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'carbon-farming': return <Tractor className="h-5 w-5" />;
      case 'renewable-energy': return <Wind className="h-5 w-5" />;
      default: return <Leaf className="h-5 w-5" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Plus className="h-6 w-6 text-emerald-600" />
            {t('project-create-new')}
          </DialogTitle>
          <DialogDescription>
            {t('project-create-description')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Type Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              {t('project-type-selection')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all ${
                  projectType === 'carbon-farming' 
                    ? 'ring-2 ring-emerald-500 bg-emerald-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setProjectType('carbon-farming')}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-emerald-700">
                    <Tractor className="h-5 w-5" />
                    {t('project-carbon-farming')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {t('project-carbon-farming-desc')}
                  </p>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-emerald-700 border-emerald-200">
                      UNI-PdR 2025 - {t('project-co2-sequestration')}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${
                  projectType === 'renewable-energy' 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setProjectType('renewable-energy')}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Wind className="h-5 w-5" />
                    {t('project-renewable-energy')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {t('project-renewable-energy-desc')}
                  </p>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-blue-700 border-blue-200">
                      UNI-PdR 2025 - {t('project-co2-reduction')}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {projectType && (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">{t('project-basic-info')}</TabsTrigger>
                <TabsTrigger value="technical">{t('project-technical-details')}</TabsTrigger>
                <TabsTrigger value="investment">{t('project-investment-timeline')}</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="projectName">{t('project-name-field')} *</Label>
                    <Input
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder={t('project-enter-name')}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="projectLocation">{t('project-location-field')} *</Label>
                    <Input
                      id="projectLocation"
                      value={projectLocation}
                      onChange={(e) => setProjectLocation(e.target.value)}
                      placeholder={t('project-enter-location')}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="projectDescription">{t('project-description-field')} *</Label>
                  <Textarea
                    id="projectDescription"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder={t('project-describe-objectives')}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="projectDuration">{t('project-duration-field')} *</Label>
                  <Input
                    id="projectDuration"
                    type="number"
                    value={projectDuration}
                    onChange={(e) => setProjectDuration(e.target.value)}
                    placeholder={t('project-enter-duration')}
                    min="1"
                    max="25"
                    required
                  />
                </div>
              </TabsContent>

              <TabsContent value="technical" className="space-y-4">
                {projectType === 'carbon-farming' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cropType">{t('project-crop-type')} *</Label>
                        <Select value={cropType} onValueChange={setCropType}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('project-select-crop')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="herbaceous-crops">{t('project-herbaceous-crops')}</SelectItem>
                            <SelectItem value="tree-crops">{t('project-tree-crops')}</SelectItem>
                            <SelectItem value="agroforestry">{t('project-agroforestry')}</SelectItem>
                            <SelectItem value="pasture-grassland">{t('project-pasture-grassland')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="farmingMethod">{t('project-farming-method')} *</Label>
                        <Select value={farmingMethod} onValueChange={setFarmingMethod}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('project-select-method')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conventional">{t('project-conventional')}</SelectItem>
                            <SelectItem value="organic">{t('project-organic')}</SelectItem>
                            <SelectItem value="conservation">{t('project-conservation')}</SelectItem>
                            <SelectItem value="regenerative">{t('project-regenerative')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cultivatedArea">{t('project-area-hectares')} *</Label>
                        <Input
                          id="cultivatedArea"
                          type="number"
                          value={cultivatedArea}
                          onChange={(e) => setCultivatedArea(e.target.value)}
                          placeholder={t('project-enter-area')}
                          min="0.1"
                          step="0.1"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="expectedCO2Sequestration">{t('project-co2-sequestration-expected')} *</Label>
                        <Input
                          id="expectedCO2Sequestration"
                          type="number"
                          value={expectedCO2Sequestration}
                          onChange={(e) => setExpectedCO2Sequestration(e.target.value)}
                          placeholder={t('project-enter-co2-tons')}
                          min="0.1"
                          step="0.1"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {projectType === 'renewable-energy' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="energyType">{t('project-energy-type')} *</Label>
                        <Select value={energyType} onValueChange={setEnergyType}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('project-select-energy')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="solar-photovoltaic">{t('project-solar-pv')}</SelectItem>
                            <SelectItem value="solar-thermal">{t('project-solar-thermal')}</SelectItem>
                            <SelectItem value="wind-turbines">{t('project-wind')}</SelectItem>
                            <SelectItem value="hydroelectric">{t('project-hydro')}</SelectItem>
                            <SelectItem value="biomass-energy">{t('project-biomass')}</SelectItem>
                            <SelectItem value="biogas-production">{t('project-biogas')}</SelectItem>
                            <SelectItem value="geothermal">{t('project-geothermal')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="installedCapacity">{t('project-capacity-kw')} *</Label>
                        <Input
                          id="installedCapacity"
                          type="number"
                          value={installedCapacity}
                          onChange={(e) => setInstalledCapacity(e.target.value)}
                          placeholder={t('project-enter-capacity')}
                          min="1"
                          step="0.1"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expectedCO2Reduction">{t('project-co2-reduction-expected')} *</Label>
                        <Input
                          id="expectedCO2Reduction"
                          type="number"
                          value={expectedCO2Reduction}
                          onChange={(e) => setExpectedCO2Reduction(e.target.value)}
                          placeholder={t('project-enter-co2-tons')}
                          min="0.1"
                          step="0.1"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="energyLocation">{t('project-installation-location')} *</Label>
                        <Input
                          id="energyLocation"
                          value={energyLocation}
                          onChange={(e) => setEnergyLocation(e.target.value)}
                          placeholder={t('project-enter-installation')}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>

              <TabsContent value="investment" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="investmentCapacity">{t('project-investment-euro')} *</Label>
                    <Input
                      id="investmentCapacity"
                      type="number"
                      value={investmentCapacity}
                      onChange={(e) => setInvestmentCapacity(e.target.value)}
                      placeholder={t('project-enter-investment')}
                      min="1000"
                      step="100"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="projectStartDate">{t('project-start-date')} *</Label>
                    <Input
                      id="projectStartDate"
                      type="date"
                      value={projectStartDate}
                      onChange={(e) => setProjectStartDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="estimatedCompletionDate">{t('project-completion-date')} *</Label>
                  <Input
                    id="estimatedCompletionDate"
                    type="date"
                    value={estimatedCompletionDate}
                    onChange={(e) => setEstimatedCompletionDate(e.target.value)}
                    required
                  />
                </div>

                {/* UNI-PdR Compliance Information */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <CheckCircle className="h-5 w-5" />
                      UNI-PdR 2025 {t('project-compliance-requirements')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <CheckCircle className="h-4 w-4" />
                      {t('project-documentation-required')}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <CheckCircle className="h-4 w-4" />
                      {t('project-blockchain-automatic')}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <CheckCircle className="h-4 w-4" />
                      {t('project-buffer-required')}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <CheckCircle className="h-4 w-4" />
                      {t('project-verification-needed')}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              {t('project-cancel')}
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !projectType}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  {t('project-creating')}...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  {t('project-create-btn')}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}