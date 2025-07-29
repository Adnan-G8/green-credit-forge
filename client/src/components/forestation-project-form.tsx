import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/components/language-provider';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Trees, Upload, Calculator, FileText } from 'lucide-react';
import forestationImage from '@assets/image_1753778463931.png';

interface ForestationProjectFormProps {
  onBack: () => void;
  alphaG8Id: string;
  onProjectCreated?: () => void;
}

export function ForestationProjectForm({ onBack, alphaG8Id, onProjectCreated }: ForestationProjectFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Form states
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [projectDuration, setProjectDuration] = useState('');
  const [forestType, setForestType] = useState('');
  const [treeSpecies, setTreeSpecies] = useState('');
  const [forestArea, setForestArea] = useState('');
  const [treeDensity, setTreeDensity] = useState('');
  const [expectedForestCO2, setExpectedForestCO2] = useState('');
  const [investmentCapacity, setInvestmentCapacity] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState('');
  
  // Documentation fields (EUFD2025-001 Sez. 7.1)
  const [forestSeedlings, setForestSeedlings] = useState<FileList | null>(null);
  const [forestPhotos, setForestPhotos] = useState<FileList | null>(null);
  const [forestPlantingDate, setForestPlantingDate] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const projectData = {
        id: `PROJ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ownerId: alphaG8Id,
        projectName,
        projectType: 'forestation' as const,
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
        // Forestation specific
        forestType,
        treeSpecies,
        forestArea: parseFloat(forestArea),
        treeDensity: parseFloat(treeDensity),
        expectedForestCO2: parseFloat(expectedForestCO2),
        // Documentation
        forestPlantingDate
      };

      const existingProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
      const updatedProjects = [...existingProjects, projectData];
      localStorage.setItem('userProjects', JSON.stringify(updatedProjects));

      toast({
        title: 'Progetto Forestazione Creato',
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
          src={forestationImage}
          alt="Forestation Project"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-700/80 to-green-700/80" />
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
              <Trees className="h-8 w-8" />
              Progetto Forestazione
            </h1>
            <p className="text-white/90 mt-2">
              Assorbimento CO₂ attraverso imboschimento e riforestazione - EUFD2025-001
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Project Information */}
        <div className="bg-white p-6 rounded-lg border border-emerald-200">
          <h2 className="text-xl font-semibold text-emerald-900 mb-4 flex items-center gap-2">
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
                placeholder="es. Riforestazione Monti Appennini"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="projectLocation">Localizzazione *</Label>
              <Input
                id="projectLocation"
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
                placeholder="es. Umbria, Italia"
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
                placeholder="es. 10"
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
                placeholder="es. 75000"
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
              placeholder="Descrivi il tuo progetto di forestazione..."
              rows={3}
              required
            />
          </div>
        </div>

        {/* Forestation Specific Fields */}
        <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
          <h2 className="text-xl font-semibold text-emerald-900 mb-4 flex items-center gap-2">
            <Trees className="h-5 w-5" />
            Dettagli Forestazione
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="forestType">Tipo Foresta *</Label>
              <Select value={forestType} onValueChange={setForestType}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona tipo foresta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deciduous">Bosco Deciduo (Latifoglie)</SelectItem>
                  <SelectItem value="coniferous">Bosco Conifero (Aghifoglie)</SelectItem>
                  <SelectItem value="mixed">Bosco Misto</SelectItem>
                  <SelectItem value="fast-growing">Bosco a Crescita Rapida</SelectItem>
                  <SelectItem value="mediterranean">Macchia Mediterranea</SelectItem>
                  <SelectItem value="riparian">Bosco Ripariale</SelectItem>
                  <SelectItem value="urban">Forestazione Urbana</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="treeSpecies">Specie Arboree *</Label>
              <Input
                id="treeSpecies"
                value={treeSpecies}
                onChange={(e) => setTreeSpecies(e.target.value)}
                placeholder="es. Quercia, Castagno, Faggio"
                required
              />
              <p className="text-xs text-emerald-600 mt-1">Specificare le specie principali</p>
            </div>
            
            <div>
              <Label htmlFor="forestArea">Area Forestale (ettari) *</Label>
              <Input
                id="forestArea"
                type="number"
                value={forestArea}
                onChange={(e) => setForestArea(e.target.value)}
                placeholder="es. 50.0"
                min="0.1"
                step="0.1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="treeDensity">Densità Alberi (alberi/ha) *</Label>
              <Input
                id="treeDensity"
                type="number"
                value={treeDensity}
                onChange={(e) => setTreeDensity(e.target.value)}
                placeholder="es. 1000"
                min="100"
                required
              />
              <p className="text-xs text-emerald-600 mt-1">Tipicamente 800-1500 alberi/ha</p>
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="expectedForestCO2">CO₂ Atteso (t/anno)</Label>
              <Input
                id="expectedForestCO2"
                type="number"
                value={expectedForestCO2}
                onChange={(e) => setExpectedForestCO2(e.target.value)}
                placeholder="Calcolato automaticamente"
                step="0.1"
                disabled
                className="bg-gray-100"
              />
              <p className="text-xs text-emerald-600 mt-1">Valore calcolato in base ai fattori EUFD2025-001</p>
            </div>
          </div>
        </div>

        {/* Documentation Section (EUFD2025-001 Sez. 7.1) */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Documentazione Richiesta (EUFD2025-001 Sez. 7.1)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="forestSeedlings">Documenti Acquisto Piantine *</Label>
              <Input
                id="forestSeedlings"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setForestSeedlings(e.target.files)}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
              <p className="text-xs text-gray-600 mt-1">PDF, JPG, PNG - Scontrini, fatture piantine</p>
            </div>
            
            <div>
              <Label htmlFor="forestPhotos">Foto Imboschimento *</Label>
              <Input
                id="forestPhotos"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setForestPhotos(e.target.files)}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
              <p className="text-xs text-gray-600 mt-1">JPG, PNG - Foto terreno prima/durante/dopo imboschimento</p>
            </div>
            
            <div>
              <Label htmlFor="forestPlantingDate">Data Imboschimento</Label>
              <Input
                id="forestPlantingDate"
                type="date"
                value={forestPlantingDate}
                onChange={(e) => setForestPlantingDate(e.target.value)}
              />
            </div>
            
            <div className="flex items-center p-4 bg-emerald-100 rounded-lg">
              <Trees className="h-5 w-5 text-emerald-600 mr-3" />
              <div className="text-sm">
                <div className="font-medium text-emerald-900">Certificazione FSC/PEFC</div>
                <div className="text-emerald-700">Consigliata per progetti su larga scala</div>
              </div>
            </div>
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
          
          <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Nota:</strong> I progetti di forestazione richiedono tipicamente 10-30 anni per 
              raggiungere la maturità e il massimo assorbimento di CO₂.
            </p>
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
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Creando Progetto...
              </>
            ) : (
              <>
                <Calculator className="h-4 w-4 mr-2" />
                Crea Progetto Forestazione
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}