import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/components/language-provider';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Zap, Upload, Calculator, FileText, Info } from 'lucide-react';
import renewableEnergyImage from '@assets/image_1753778575362.png';

interface RenewableEnergyProjectFormProps {
  onBack: () => void;
  alphaG8Id: string;
  onProjectCreated?: () => void;
}

export function RenewableEnergyProjectForm({ onBack, alphaG8Id, onProjectCreated }: RenewableEnergyProjectFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Form states
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [projectDuration, setProjectDuration] = useState('');
  const [energyType, setEnergyType] = useState('');
  const [historicalYears, setHistoricalYears] = useState('');
  const [electricalCapacity, setElectricalCapacity] = useState('');
  const [thermalCapacity, setThermalCapacity] = useState('');
  const [expectedCO2Reduction, setExpectedCO2Reduction] = useState('');
  const [investmentCapacity, setInvestmentCapacity] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState('');
  
  // Documentation fields (EUFD2025-001 Sez. 6.2)
  const [equipmentPurchase, setEquipmentPurchase] = useState<FileList | null>(null);
  const [installationPhotos, setInstallationPhotos] = useState<FileList | null>(null);
  const [installationDate, setInstallationDate] = useState('');
  const [technicalSpecs, setTechnicalSpecs] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // CO₂ Calculation States (Italian Standard: 0.53 kg CO₂/kWh)
  const [annualKwhProduction, setAnnualKwhProduction] = useState('');
  const [co2SavedPerYear, setCo2SavedPerYear] = useState('');
  const [co2SavedLifetime, setCo2SavedLifetime] = useState('');

  // Calculate CO2 reduction based on Italian methodology (0.53 kg CO₂/kWh)
  useEffect(() => {
    if (annualKwhProduction && !isNaN(Number(annualKwhProduction))) {
      const kwhValue = Number(annualKwhProduction);
      const italianEmissionFactor = 0.53; // kg CO₂/kWh for Italy
      const solarLifetime = 30; // years
      
      const yearlyReduction = kwhValue * italianEmissionFactor;
      const lifetimeReduction = yearlyReduction * solarLifetime;
      
      setCo2SavedPerYear(yearlyReduction.toFixed(2));
      setCo2SavedLifetime(lifetimeReduction.toFixed(2));
      setExpectedCO2Reduction((lifetimeReduction / 1000).toFixed(2)); // Convert to tons
    } else {
      setCo2SavedPerYear('');
      setCo2SavedLifetime('');
      setExpectedCO2Reduction('');
    }
  }, [annualKwhProduction]);

  // Calculate CO2 reduction based on EUFD2025-001 methodology
  useEffect(() => {
    if (energyType && electricalCapacity && historicalYears) {
      const capacity = parseFloat(electricalCapacity);
      const years = parseFloat(historicalYears);
      
      let emissionFactor = 0.4; // Default EU grid emission factor (kg CO2/kWh)
      let capacityFactor = 0.25; // Default capacity factor
      
      // Italian standard emission factors (0.53 kg CO₂/kWh)
      switch (energyType) {
        case 'solar':
          emissionFactor = 0.53; // kg CO2/kWh Italian standard
          capacityFactor = 0.18; // 18% capacity factor for solar in Italy
          break;
        case 'wind':
          emissionFactor = 0.53;
          capacityFactor = 0.27; // 27% capacity factor for wind in Italy
          break;
        case 'hydro':
          emissionFactor = 0.53;
          capacityFactor = 0.45; // 45% capacity factor for small hydro
          break;
        case 'biomass':
          emissionFactor = 0.53;
          capacityFactor = 0.75; // 75% capacity factor for biomass
          break;
        case 'geothermal':
          emissionFactor = 0.53;
          capacityFactor = 0.90; // 90% capacity factor for geothermal
          break;
        case 'marine':
          emissionFactor = 0.53;
          capacityFactor = 0.30; // 30% capacity factor for marine energy
          break;
        case 'hydrogen':
          emissionFactor = 0.53;
          capacityFactor = 0.70; // 70% capacity factor for hydrogen production
          break;
      }
      
      // Annual CO2 reduction calculation (EUFD2025-001 formula)
      const annualEnergyProduction = capacity * capacityFactor * 8760; // kWh/year
      const annualCO2Reduction = (annualEnergyProduction * emissionFactor) / 1000; // tonnes CO2/year
      const totalCO2Reduction = annualCO2Reduction * years;
      
      setExpectedCO2Reduction(totalCO2Reduction.toFixed(2));
    }
  }, [energyType, electricalCapacity, historicalYears]);

  const processFiles = async (fileList: FileList | null): Promise<any[]> => {
    if (!fileList) return [];
    
    const processedFiles = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const base64Content = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      
      processedFiles.push({
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date().toISOString(),
        category: file.type.startsWith('image/') ? 'image' : 'document',
        content: base64Content
      });
    }
    return processedFiles;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Process all uploaded files
      const equipmentDocuments = await processFiles(equipmentPurchase);
      const installationImages = await processFiles(installationPhotos);
      
      const projectData = {
        id: `PROJ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ownerId: alphaG8Id,
        projectName,
        projectType: 'renewable-energy' as const,
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
        // Renewable energy specific (EUFD2025-001)
        energyType,
        historicalYears: parseInt(historicalYears),
        electricalCapacity: parseFloat(electricalCapacity),
        thermalCapacity: thermalCapacity ? parseFloat(thermalCapacity) : undefined,
        installedCapacity: parseFloat(electricalCapacity), // Legacy compatibility
        expectedCO2Reduction: parseFloat(expectedCO2Reduction),
        energyLocation: projectLocation,
        // CO₂ Calculation Data (Italian Standard: 0.53 kg CO₂/kWh)
        annualKwhProduction: Number(annualKwhProduction) || 0,
        co2SavedPerYear: co2SavedPerYear,
        co2SavedLifetime: co2SavedLifetime,
        emissionFactor: "0.53",
        // Documentation fields
        installationDate,
        technicalSpecs,
        // Document storage
        documents: {
          technologyPurchase: equipmentDocuments,
          installationPhotos: installationImages,
          // Placeholder for additional renewable energy documents
          buildingPermits: [],
          commissioningDocs: [],
          productionRecords: []
        }
      };

      const existingProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
      const updatedProjects = [...existingProjects, projectData];
      localStorage.setItem('userProjects', JSON.stringify(updatedProjects));

      toast({
        title: 'Progetto Energia Rinnovabile Creato',
        description: 'Il progetto è stato sottomesso per revisione EUFD2025-001',
      });

      if (onProjectCreated) {
        onProjectCreated();
      }
      onBack();
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: 'Errore',
        description: 'Si è verificato un errore nella creazione del progetto',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with Background Image */}
      <div className="relative h-48 mb-8 rounded-lg overflow-hidden">
        <img
          src={renewableEnergyImage}
          alt="Renewable Energy Project"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-cyan-600/80" />
        <div className="absolute inset-0 flex items-center justify-between p-6">
          <div>
            <Button
              variant="outline"
              onClick={onBack}
              className="bg-white/90 backdrop-blur-sm mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna alla Selezione
            </Button>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Zap className="h-8 w-8" />
              Progetto Energia Rinnovabile
            </h1>
            <p className="text-white/90 mt-2">
              Riduzione emissioni CO₂ tramite energie rinnovabili - EUFD2025-001
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Project Information */}
        <div className="bg-white p-6 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Informazioni Progetto Base
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projectName">Nome Progetto *</Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="es. Impianto Fotovoltaico Fattoria"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="projectLocation">Localizzazione *</Label>
              <Input
                id="projectLocation"
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
                placeholder="es. Puglia, Italia"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="projectDuration">Durata Progetto (anni) *</Label>
              <Input
                id="projectDuration"
                type="number"
                value={projectDuration}
                onChange={(e) => setProjectDuration(e.target.value)}
                placeholder="es. 20"
                min="1"
                max="30"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="investmentCapacity">Capacità Investimento (€) *</Label>
              <Input
                id="investmentCapacity"
                type="number"
                value={investmentCapacity}
                onChange={(e) => setInvestmentCapacity(e.target.value)}
                placeholder="es. 100000"
                min="0"
                required
              />
            </div>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="projectDescription">Descrizione Progetto *</Label>
            <Textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Descrivi il tuo progetto di energia rinnovabile..."
              rows={3}
              required
            />
          </div>
        </div>

        {/* CO₂ Calculation Section (Italian Standard) */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h2 className="text-xl font-semibold text-green-900 mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Calcolo CO₂ Evitata (Standard Italiano: 0.53 kg CO₂/kWh)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="annualKwh">Produzione Annua Energia (kWh) *</Label>
              <Input
                id="annualKwh"
                type="number"
                value={annualKwhProduction}
                onChange={(e) => setAnnualKwhProduction(e.target.value)}
                placeholder="Es. 3000"
                className="border-green-300 focus:border-green-500"
              />
              <p className="text-xs text-green-600 mt-1">
                Inserisci la produzione energetica annuale stimata in kWh
              </p>
            </div>
          </div>

          {co2SavedPerYear && (
            <div className="bg-white p-4 rounded-lg border border-green-300">
              <h3 className="font-semibold text-green-800 mb-3">Risultati Calcolo CO₂:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">{co2SavedPerYear} kg</div>
                  <div className="text-sm text-green-600">CO₂ Evitata/Anno</div>
                </div>
                <div className="text-center p-3 bg-green-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">{(Number(co2SavedLifetime) / 1000).toFixed(2)} t</div>
                  <div className="text-sm text-green-600">CO₂ Evitata/30 Anni</div>
                </div>
              </div>
              <div className="text-xs text-green-600 mt-2 text-center">
                * Calcolo basato su fattore di emissione italiano: 0.53 kg CO₂/kWh
              </div>
            </div>
          )}
        </div>

        {/* Renewable Energy Specific Fields (EUFD2025-001) */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Dettagli Energia Rinnovabile (EUFD2025-001)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="energyType">Tipo Energia Rinnovabile *</Label>
              <Select value={energyType} onValueChange={setEnergyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona tipo energia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wind">Windenergie (energia eolica)</SelectItem>
                  <SelectItem value="solar">Solarenergie (energia solare)</SelectItem>
                  <SelectItem value="hydro">Wasserkraft (energia idroelettrica)</SelectItem>
                  <SelectItem value="biomass">Biomasseenergie (energia da biomasse)</SelectItem>
                  <SelectItem value="geothermal">Geothermie (energia geotermica)</SelectItem>
                  <SelectItem value="marine">Meeresenergie (energia marina)</SelectItem>
                  <SelectItem value="hydrogen">Wasserstoffenergie (energia idrogeno)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="historicalYears">Anni Storici Riferimento *</Label>
              <Input
                id="historicalYears"
                type="number"
                value={historicalYears}
                onChange={(e) => setHistoricalYears(e.target.value)}
                placeholder="es. 3"
                min="1"
                max="10"
                required
              />
              <p className="text-xs text-blue-600 mt-1">Anni per calcolo baseline emissioni (EUFD2025-001 Sez. 6.1)</p>
            </div>
            
            <div>
              <Label htmlFor="electricalCapacity">Capacità Elettrica (kW) *</Label>
              <Input
                id="electricalCapacity"
                type="number"
                value={electricalCapacity}
                onChange={(e) => setElectricalCapacity(e.target.value)}
                placeholder="es. 100"
                min="0.1"
                step="0.1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="thermalCapacity">Capacità Termica (kW)</Label>
              <Input
                id="thermalCapacity"
                type="number"
                value={thermalCapacity}
                onChange={(e) => setThermalCapacity(e.target.value)}
                placeholder="es. 50 (opzionale)"
                min="0"
                step="0.1"
              />
              <p className="text-xs text-blue-600 mt-1">Solo per impianti con cogenerazione</p>
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="expectedCO2Reduction">CO₂ Riduzione Attesa (t) *</Label>
              <Input
                id="expectedCO2Reduction"
                type="number"
                value={expectedCO2Reduction}
                onChange={(e) => setExpectedCO2Reduction(e.target.value)}
                placeholder="Calcolato automaticamente"
                step="0.1"
                disabled
                className="bg-gray-100"
              />
              <p className="text-xs text-blue-600 mt-1">
                Calcolato con fattori emissione EUFD2025-001: {energyType && (
                  <>
                    {energyType === 'solar' && '0.53 kg CO₂/kWh, 18% capacity factor'}
                    {energyType === 'wind' && '0.53 kg CO₂/kWh, 27% capacity factor'}
                    {energyType === 'hydro' && '0.53 kg CO₂/kWh, 45% capacity factor'}
                    {energyType === 'biomass' && '0.53 kg CO₂/kWh, 75% capacity factor'}
                    {energyType === 'geothermal' && '0.53 kg CO₂/kWh, 90% capacity factor'}
                    {energyType === 'marine' && '0.53 kg CO₂/kWh, 30% capacity factor'}
                    {energyType === 'hydrogen' && '0.53 kg CO₂/kWh, H₂ production'}
                  </>
                )}
              </p>
            </div>
          </div>

          {/* EUFD2025-001 Calculation Information */}
          <div className="mt-4 p-4 bg-blue-100 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-blue-900 mb-1">Metodologia EUFD2025-001 (Sez. 6.2)</div>
                <div className="text-blue-700 space-y-1">
                  <div>• Baseline: Media emissioni grid nazionale ultimi {historicalYears || 'X'} anni</div>
                  <div>• Fattore emissione: 0.53 kg CO₂/kWh (grid italiano standard)</div>
                  <div>• Addizionalità: Verifica che impianto non sia già previsto</div>
                  <div>• Permanenza: Garanzia funzionamento per durata progetto</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation Section (EUFD2025-001 Sez. 6.2) */}
        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
          <h2 className="text-xl font-semibold text-amber-900 mb-4 flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Documentazione Richiesta (EUFD2025-001 Sez. 6.2)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="equipmentPurchase">Documenti Acquisto Equipaggiamento *</Label>
              <Input
                id="equipmentPurchase"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setEquipmentPurchase(e.target.files)}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-600 mt-1">PDF, JPG, PNG - Fatture pannelli, inverter, batterie</p>
            </div>
            
            <div>
              <Label htmlFor="installationPhotos">Foto Installazione *</Label>
              <Input
                id="installationPhotos"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setInstallationPhotos(e.target.files)}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-600 mt-1">JPG, PNG - Foto prima/durante/dopo installazione</p>
            </div>
            
            <div>
              <Label htmlFor="installationDate">Data Installazione</Label>
              <Input
                id="installationDate"
                type="date"
                value={installationDate}
                onChange={(e) => setInstallationDate(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="technicalSpecs">Specifiche Tecniche</Label>
              <Input
                id="technicalSpecs"
                value={technicalSpecs}
                onChange={(e) => setTechnicalSpecs(e.target.value)}
                placeholder="es. Pannelli 400W monocristallini"
              />
            </div>
          </div>

          <div className="mt-4 p-3 bg-amber-100 rounded border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Documentazione aggiuntiva richiesta:</strong> Autorizzazioni comunali, 
              connessione alla rete elettrica, certificazioni CE degli equipaggiamenti.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Timeline Progetto</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projectStartDate">Data Inizio</Label>
              <Input
                id="projectStartDate"
                type="date"
                value={projectStartDate}
                onChange={(e) => setProjectStartDate(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="estimatedCompletionDate">Data Completamento Stimata</Label>
              <Input
                id="estimatedCompletionDate"
                type="date"
                value={estimatedCompletionDate}
                onChange={(e) => setEstimatedCompletionDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
          >
            Indietro
          </Button>
          
          <Button
            type="submit"
            disabled={isSubmitting || !projectName || !projectLocation || !projectDuration}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Creando Progetto...
              </>
            ) : (
              <>
                <Calculator className="h-4 w-4 mr-2" />
                Crea Progetto Energia Rinnovabile
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}