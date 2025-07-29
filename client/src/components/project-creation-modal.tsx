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
import { FormulaDisplay } from '@/components/formula-display';
import { CalculationSummaryModal } from '@/components/calculation-summary-modal';
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
  CheckCircle,
  Calculator
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
  const [projectType, setProjectType] = useState<'carbon-farming' | 'renewable-energy' | 'forestation' | ''>('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [projectDuration, setProjectDuration] = useState('');
  
  // Carbon Farming specific
  const [cropType, setCropType] = useState('');
  const [farmingMethod, setFarmingMethod] = useState('');
  const [cultivatedArea, setCultivatedArea] = useState('');
  const [expectedCO2Sequestration, setExpectedCO2Sequestration] = useState('');
  
  // Renewable Energy specific (EUFD2025-001)
  const [energyType, setEnergyType] = useState('');
  const [historicalYears, setHistoricalYears] = useState('');
  const [electricalCapacity, setElectricalCapacity] = useState('');
  const [thermalCapacity, setThermalCapacity] = useState('');
  const [expectedCO2Reduction, setExpectedCO2Reduction] = useState('');
  const [energyLocation, setEnergyLocation] = useState('');
  
  // Documentation fields (EUFD2025-001 Sez. 5.6 & 6.2)
  const [seedPurchaseDocuments, setSeedPurchaseDocuments] = useState<FileList | null>(null);
  const [plantingPhotos, setPlantingPhotos] = useState<FileList | null>(null);
  const [plantingDate, setPlantingDate] = useState('');
  const [seedQuantity, setSeedQuantity] = useState('');
  const [technologyPurchase, setTechnologyPurchase] = useState<FileList | null>(null);
  const [buildingPermits, setBuildingPermits] = useState<FileList | null>(null);
  const [commissioningDocs, setCommissioningDocs] = useState<FileList | null>(null);
  const [installationPhotos, setInstallationPhotos] = useState<FileList | null>(null);
  const [productionRecords, setProductionRecords] = useState<FileList | null>(null);
  const [forestSeedlings, setForestSeedlings] = useState<FileList | null>(null);
  const [forestPhotos, setForestPhotos] = useState<FileList | null>(null);
  const [forestPlantingDate, setForestPlantingDate] = useState('');

  // Forestation specific
  const [forestType, setForestType] = useState('');
  const [treeSpecies, setTreeSpecies] = useState('');
  const [forestArea, setForestArea] = useState('');
  const [treeDensity, setTreeDensity] = useState('');
  const [expectedForestCO2, setExpectedForestCO2] = useState('');
  
  // Investment and timeline
  const [investmentCapacity, setInvestmentCapacity] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Formula display and calculation summary states
  const [showFormulaFor, setShowFormulaFor] = useState<string>('');
  const [showCalculationSummary, setShowCalculationSummary] = useState(false);

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
    setHistoricalYears('');
    setElectricalCapacity('');
    setThermalCapacity('');
    setExpectedCO2Reduction('');
    setEnergyLocation('');
    setForestType('');
    setTreeSpecies('');
    setForestArea('');
    setTreeDensity('');
    setExpectedForestCO2('');
    setInvestmentCapacity('');
    setProjectStartDate('');
    setEstimatedCompletionDate('');
    // Reset documentation fields
    setSeedPurchaseDocuments(null);
    setPlantingPhotos(null);
    setPlantingDate('');
    setSeedQuantity('');
    setTechnologyPurchase(null);
    setBuildingPermits(null);
    setCommissioningDocs(null);
    setInstallationPhotos(null);
    setProductionRecords(null);
    setForestSeedlings(null);
    setForestPhotos(null);
    setForestPlantingDate('');
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
          historicalYears: parseInt(historicalYears),
          electricalCapacity: parseFloat(electricalCapacity),
          thermalCapacity: parseFloat(thermalCapacity),
          expectedCO2Reduction: parseFloat(expectedCO2Reduction),
          energyLocation,
        }),
        ...(projectType === 'forestation' && {
          forestType,
          treeSpecies,
          forestArea: parseFloat(forestArea),
          treeDensity: parseFloat(treeDensity),
          expectedForestCO2: parseFloat(expectedForestCO2),
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
      case 'forestation': return <TreePine className="h-5 w-5" />;
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              <Card 
                className={`cursor-pointer transition-all ${
                  projectType === 'forestation' 
                    ? 'ring-2 ring-green-500 bg-green-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setProjectType('forestation')}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <TreePine className="h-5 w-5" />
                    {t('project-forestation')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {t('project-forestation-desc')}
                  </p>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-green-700 border-green-200">
                      UNI-PdR 2025 - {t('project-co2-sequestration')}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {projectType && (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">{t('project-basic-info')}</TabsTrigger>
                <TabsTrigger value="technical">{t('project-technical-details')}</TabsTrigger>
                <TabsTrigger value="documents">Documentazione EUFD2025-001</TabsTrigger>
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

                      <div className="space-y-2">
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
                        <FormulaDisplay
                          projectType="carbon-farming"
                          fieldType="co2-sequestration"
                          value={parseFloat(expectedCO2Sequestration) || 0}
                          showCalculation={showFormulaFor === 'carbon-co2'}
                          onToggleCalculation={() => setShowFormulaFor(showFormulaFor === 'carbon-co2' ? '' : 'carbon-co2')}
                        />
                      </div>
                    </div>
                  </>
                )}

                {projectType === 'renewable-energy' && (
                  <>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-700">Requisiti Standard EUFD2025-001</span>
                      </div>
                      <ul className="text-sm text-blue-600 space-y-1">
                        <li>• Potenza minima: 5 kWp (come da Art. 6 Standard)</li>
                        <li>• Possibili carbon credits fino a 5 anni precedenti</li>
                        <li>• Separazione KW elettrici e KW termici obbligatoria</li>
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="energyType">Tipo Energia Rinnovabile (Art. 6 EUFD2025-001) *</Label>
                        <Select value={energyType} onValueChange={setEnergyType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleziona tipo energia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="eolica">Energia Eolica</SelectItem>
                            <SelectItem value="solare">Energia Solare</SelectItem>
                            <SelectItem value="idroelettrica">Energia Idroelettrica</SelectItem>
                            <SelectItem value="biomasse">Energia da Biomasse</SelectItem>
                            <SelectItem value="geotermica">Energia Geotermica</SelectItem>
                            <SelectItem value="marina">Energia Marina</SelectItem>
                            <SelectItem value="idrogeno">Energia Idrogeno</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="historicalYears">Anni Produzione Storica Disponibili</Label>
                        <Select value={historicalYears} onValueChange={setHistoricalYears}>
                          <SelectTrigger>
                            <SelectValue placeholder="Anni dati disponibili" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Nuovo impianto - nessun dato storico</SelectItem>
                            <SelectItem value="1">1 anno di produzione</SelectItem>
                            <SelectItem value="2">2 anni di produzione</SelectItem>
                            <SelectItem value="3">3 anni di produzione</SelectItem>
                            <SelectItem value="4">4 anni di produzione</SelectItem>
                            <SelectItem value="5">5 anni di produzione (max retroattivo EUFD2025-001)</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-blue-600 mt-1">Standard permette carbon credits fino a 5 anni precedenti</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="electricalCapacity">Potenza Elettrica (kW) *</Label>
                        <Input
                          id="electricalCapacity"
                          type="number"
                          value={electricalCapacity}
                          onChange={(e) => setElectricalCapacity(e.target.value)}
                          placeholder="es. 100 kW (min. 5 kWp)"
                          min="5"
                          step="0.1"
                          required
                        />
                        <p className="text-xs text-gray-600">Minimo 5 kWp richiesto da EUFD2025-001</p>
                      </div>

                      <div>
                        <Label htmlFor="thermalCapacity">Potenza Termica (kW)</Label>
                        <Input
                          id="thermalCapacity"
                          type="number"
                          value={thermalCapacity}
                          onChange={(e) => setThermalCapacity(e.target.value)}
                          placeholder="es. 50 kW (se applicabile)"
                          min="0"
                          step="0.1"
                        />
                        <p className="text-xs text-gray-600">Solo per: biomasse, geotermico, idrogeno</p>
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

                {projectType === 'forestation' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="forestType">{t('project-forest-type')} *</Label>
                        <Select value={forestType} onValueChange={setForestType}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('project-select-forest-type')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mixed-forest">{t('project-mixed-forest')}</SelectItem>
                            <SelectItem value="deciduous-forest">{t('project-deciduous-forest')}</SelectItem>
                            <SelectItem value="coniferous-forest">{t('project-coniferous-forest')}</SelectItem>
                            <SelectItem value="mediterranean-forest">{t('project-mediterranean-forest')}</SelectItem>
                            <SelectItem value="riparian-forest">{t('project-riparian-forest')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="treeSpecies">{t('project-tree-species')} *</Label>
                        <Select value={treeSpecies} onValueChange={setTreeSpecies}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('project-select-species')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="oak">{t('project-oak')}</SelectItem>
                            <SelectItem value="beech">{t('project-beech')}</SelectItem>
                            <SelectItem value="pine">{t('project-pine')}</SelectItem>
                            <SelectItem value="spruce">{t('project-spruce')}</SelectItem>
                            <SelectItem value="chestnut">{t('project-chestnut')}</SelectItem>
                            <SelectItem value="poplar">{t('project-poplar')}</SelectItem>
                            <SelectItem value="willow">{t('project-willow')}</SelectItem>
                            <SelectItem value="mixed-native">{t('project-mixed-native')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="forestArea">{t('project-forest-area-hectares')} *</Label>
                        <Input
                          id="forestArea"
                          type="number"
                          value={forestArea}
                          onChange={(e) => setForestArea(e.target.value)}
                          placeholder={t('project-enter-forest-area')}
                          min="0.1"
                          step="0.1"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="treeDensity">{t('project-tree-density-ha')} *</Label>
                        <Input
                          id="treeDensity"
                          type="number"
                          value={treeDensity}
                          onChange={(e) => setTreeDensity(e.target.value)}
                          placeholder={t('project-enter-density')}
                          min="100"
                          step="50"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="expectedForestCO2">{t('project-forest-co2-sequestration')} *</Label>
                        <Input
                          id="expectedForestCO2"
                          type="number"
                          value={expectedForestCO2}
                          onChange={(e) => setExpectedForestCO2(e.target.value)}
                          placeholder={t('project-enter-forest-co2')}
                          min="0.1"
                          step="0.1"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <span className="font-medium text-amber-700">Documentazione Obbligatoria Standard EUFD2025-001</span>
                  </div>
                  <p className="text-sm text-amber-600">
                    Come richiesto nelle Sezioni 5.6 e 6.2 del Standard EUFD2025-001, 
                    è necessario fornire la documentazione completa per la certificazione del progetto.
                  </p>
                </div>

                {projectType === 'carbon-farming' && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-medium text-emerald-700">Documentazione Carbon Farming (Sez. 5.6)</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="seedPurchaseDocuments">Documenti Acquisto Semi/Piante *</Label>
                        <Input
                          id="seedPurchaseDocuments"
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                        />
                        <p className="text-xs text-gray-600">Bolle consegna, fatture, scontrini acquisto semi/piante</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="plantingPhotos">Documentazione Fotografica *</Label>
                        <Input
                          id="plantingPhotos"
                          type="file"
                          multiple
                          accept=".jpg,.jpeg,.png"
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                        />
                        <p className="text-xs text-gray-600">Foto colture al momento domanda inserimento progetti</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="plantingDate">Data Semina/Piantumazione *</Label>
                        <Input
                          id="plantingDate"
                          type="date"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="seedQuantity">Quantità Semi/Piante</Label>
                        <Input
                          id="seedQuantity"
                          type="text"
                          placeholder="es. 50 kg semi frumento / 100 piante olivo"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {projectType === 'renewable-energy' && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-medium text-blue-700">Documentazione Energie Rinnovabili (Sez. 6.2)</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="technologyPurchase">Documenti Acquisto Tecnologia *</Label>
                        <Input
                          id="technologyPurchase"
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="text-xs text-gray-600">Fatture, bolle consegna tecnologia/componenti impianto</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="buildingPermits">Autorizzazioni e Permessi *</Label>
                        <Input
                          id="buildingPermits"
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="text-xs text-gray-600">Autorizzazioni costruzione, permessi ente pubblico</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="commissioningDocs">Documenti Collaudo/Messa in Produzione *</Label>
                        <Input
                          id="commissioningDocs"
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="text-xs text-gray-600">Certificati collaudo, verbali messa in produzione</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="installationPhotos">Documentazione Fotografica Impianto *</Label>
                        <Input
                          id="installationPhotos"
                          type="file"
                          multiple
                          accept=".jpg,.jpeg,.png"
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="text-xs text-gray-600">Foto impianto installato e funzionante</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="productionRecords">Registri Produzione Energetica (fino a 5 anni) *</Label>
                      <Input
                        id="productionRecords"
                        type="file"
                        multiple
                        accept=".pdf,.xlsx,.csv"
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <p className="text-xs text-gray-600">
                        Documenti KW elettrici/termici prodotti e/o immessi in rete ogni anno 
                        (massimo 5 anni precedenti per carbon credits retroattivi)
                      </p>
                    </div>
                  </div>
                )}

                {projectType === 'forestation' && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-medium text-green-700">Documentazione Forestazione (Sez. 5.6)</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="forestSeedlings">Documenti Acquisto Piantine Forestali *</Label>
                        <Input
                          id="forestSeedlings"
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        />
                        <p className="text-xs text-gray-600">Fatture, bolle consegna piante madri forestali</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="forestPhotos">Documentazione Fotografica Forestazione *</Label>
                        <Input
                          id="forestPhotos"
                          type="file"
                          multiple
                          accept=".jpg,.jpeg,.png"
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        />
                        <p className="text-xs text-gray-600">Foto aree forestali al momento domanda</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="forestPlantingDate">Data/Epoca Piantumazione *</Label>
                      <Input
                        id="forestPlantingDate"
                        type="date"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-700">Conservazione Documentazione</span>
                  </div>
                  <p className="text-sm text-blue-600">
                    Tutti i documenti devono essere conservati per un tempo minimo pari alla durata 
                    del progetto di cattura CO₂. Saranno registrate in Blockchain le informazioni 
                    fondamentali per garantire trasparenza e verificabilità.
                  </p>
                </div>
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

          <div className="flex justify-between items-center pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowCalculationSummary(true)}
              disabled={!projectType || !projectName}
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              <Calculator className="h-4 w-4 mr-2" />
              {t('view-full-calculations')}
            </Button>
            
            <div className="flex space-x-2">
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
          </div>
        </form>

        {/* Calculation Summary Modal */}
        <CalculationSummaryModal
          isOpen={showCalculationSummary}
          onClose={() => setShowCalculationSummary(false)}
          projectData={{
            projectType: projectType as 'carbon-farming' | 'renewable-energy' | 'forestation',
            projectName,
            cultivatedArea: parseFloat(cultivatedArea) || 0,
            cropType,
            farmingMethod,
            expectedCO2Sequestration: parseFloat(expectedCO2Sequestration) || 0,
            electricalCapacity: parseFloat(electricalCapacity) || 0,
            energyType,
            expectedCO2Reduction: parseFloat(expectedCO2Reduction) || 0,
            forestArea: parseFloat(forestArea) || 0,
            forestType,
            treeSpecies,
            treeDensity: parseFloat(treeDensity) || 0,
            expectedForestCO2: parseFloat(expectedForestCO2) || 0,
            investmentCapacity: parseFloat(investmentCapacity) || 0,
            projectDuration: parseFloat(projectDuration) || 1
          }}
        />
      </DialogContent>
    </Dialog>
  );
}