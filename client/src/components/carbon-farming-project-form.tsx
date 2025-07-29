import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/components/language-provider';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Wheat, Upload, Calculator, FileText } from 'lucide-react';
import carbonFarmingImage from '@assets/image_1753778388461.png';

interface CarbonFarmingProjectFormProps {
  onBack: () => void;
  alphaG8Id: string;
  onProjectCreated?: () => void;
}

export function CarbonFarmingProjectForm({ onBack, alphaG8Id, onProjectCreated }: CarbonFarmingProjectFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Form states
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [projectDuration, setProjectDuration] = useState('');
  const [cropType, setCropType] = useState('');
  const [farmingMethod, setFarmingMethod] = useState('');
  const [cultivatedArea, setCultivatedArea] = useState('');
  const [expectedCO2Sequestration, setExpectedCO2Sequestration] = useState('');
  const [investmentCapacity, setInvestmentCapacity] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState('');
  
  // Documentation fields (EUFD2025-001 Sez. 5.6)
  const [seedPurchaseDocuments, setSeedPurchaseDocuments] = useState<FileList | null>(null);
  const [plantingPhotos, setPlantingPhotos] = useState<FileList | null>(null);
  const [plantingDate, setPlantingDate] = useState('');
  const [seedQuantity, setSeedQuantity] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const projectData = {
        id: `PROJ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ownerId: alphaG8Id,
        projectName,
        projectType: 'carbon-farming' as const,
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
        // Carbon farming specific
        cropType,
        farmingMethod,
        cultivatedArea: parseFloat(cultivatedArea),
        expectedCO2Sequestration: parseFloat(expectedCO2Sequestration),
        // Documentation
        plantingDate,
        seedQuantity
      };

      const existingProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
      const updatedProjects = [...existingProjects, projectData];
      localStorage.setItem('userProjects', JSON.stringify(updatedProjects));

      toast({
        title: 'Progetto Carbon Farming Creato',
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
          src={carbonFarmingImage}
          alt="Carbon Farming Project"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-emerald-600/80" />
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
              <Wheat className="h-8 w-8" />
              Progetto Carbon Farming
            </h1>
            <p className="text-white/90 mt-2">
              Sequestro CO₂ attraverso pratiche agricole sostenibili - EUFD2025-001
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Project Information */}
        <div className="bg-white p-6 rounded-lg border border-green-200">
          <h2 className="text-xl font-semibold text-green-900 mb-4 flex items-center gap-2">
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
                placeholder="es. Fattoria Sostenibile Toscana"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="projectLocation">Localizzazione *</Label>
              <Input
                id="projectLocation"
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
                placeholder="es. Siena, Toscana, Italia"
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
                placeholder="es. 5"
                min="1"
                max="20"
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
                placeholder="es. 50000"
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
              placeholder="Descrivi il tuo progetto di carbon farming..."
              rows={3}
              required
            />
          </div>
        </div>

        {/* Carbon Farming Specific Fields */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h2 className="text-xl font-semibold text-green-900 mb-4 flex items-center gap-2">
            <Wheat className="h-5 w-5" />
            Dettagli Carbon Farming
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cropType">Tipo Coltura *</Label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona tipo coltura" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cereali">Cereali (grano, mais, orzo)</SelectItem>
                  <SelectItem value="legumi">Legumi (soia, fagioli, piselli)</SelectItem>
                  <SelectItem value="ortaggi">Ortaggi (pomodori, zucchine, peperoni)</SelectItem>
                  <SelectItem value="frutta">Frutta (mele, pere, pesche)</SelectItem>
                  <SelectItem value="vite">Vite e uva</SelectItem>
                  <SelectItem value="olivo">Olivo</SelectItem>
                  <SelectItem value="foraggio">Colture foraggere</SelectItem>
                  <SelectItem value="misto">Policoltura mista</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="farmingMethod">Metodo Agricolo *</Label>
              <Select value={farmingMethod} onValueChange={setFarmingMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona metodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organic">Agricoltura Biologica</SelectItem>
                  <SelectItem value="regenerative">Agricoltura Rigenerativa</SelectItem>
                  <SelectItem value="agroforestry">Agroforestazione</SelectItem>
                  <SelectItem value="cover-crops">Cover Crops</SelectItem>
                  <SelectItem value="tree-crops">Colture Arboree</SelectItem>
                  <SelectItem value="no-till">No-Till / Sodo</SelectItem>
                  <SelectItem value="precision">Agricoltura di Precisione</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="cultivatedArea">Area Coltivata (ettari) *</Label>
              <Input
                id="cultivatedArea"
                type="number"
                value={cultivatedArea}
                onChange={(e) => setCultivatedArea(e.target.value)}
                placeholder="es. 25.5"
                min="0.1"
                step="0.1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="expectedCO2Sequestration">CO₂ Atteso (t/anno)</Label>
              <Input
                id="expectedCO2Sequestration"
                type="number"
                value={expectedCO2Sequestration}
                onChange={(e) => setExpectedCO2Sequestration(e.target.value)}
                placeholder="Calcolato automaticamente"
                step="0.1"
                disabled
                className="bg-gray-100"
              />
              <p className="text-xs text-green-600 mt-1">Valore calcolato in base ai fattori EUFD2025-001</p>
            </div>
          </div>
        </div>

        {/* Documentation Section (EUFD2025-001 Sez. 5.6) */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Documentazione Richiesta (EUFD2025-001 Sez. 5.6)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="seedPurchase">Documenti Acquisto Semi/Piante *</Label>
              <Input
                id="seedPurchase"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setSeedPurchaseDocuments(e.target.files)}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
              <p className="text-xs text-gray-600 mt-1">PDF, JPG, PNG - Scontrini, fatture, ricevute</p>
            </div>
            
            <div>
              <Label htmlFor="plantingPhotos">Foto Piantagione *</Label>
              <Input
                id="plantingPhotos"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setPlantingPhotos(e.target.files)}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
              <p className="text-xs text-gray-600 mt-1">JPG, PNG - Foto prima/durante/dopo piantagione</p>
            </div>
            
            <div>
              <Label htmlFor="plantingDate">Data Piantagione</Label>
              <Input
                id="plantingDate"
                type="date"
                value={plantingDate}
                onChange={(e) => setPlantingDate(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="seedQuantity">Quantità Semi/Piante</Label>
              <Input
                id="seedQuantity"
                value={seedQuantity}
                onChange={(e) => setSeedQuantity(e.target.value)}
                placeholder="es. 1000 kg semi, 500 piantine"
              />
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
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Creando Progetto...
              </>
            ) : (
              <>
                <Calculator className="h-4 w-4 mr-2" />
                Crea Progetto Carbon Farming
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}