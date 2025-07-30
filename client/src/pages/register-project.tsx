import { Navigation } from '@/components/navigation';
import { useLanguage } from '@/components/language-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useLocation } from 'wouter';
import { 
  Upload, 
  FileText, 
  MapPin, 
  Calculator,
  CheckCircle,
  ArrowLeft,
  Leaf,
  Zap,
  Factory
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function RegisterProject() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  // Form state
  const [projectData, setProjectData] = useState({
    projectName: '',
    projectType: '',
    projectDescription: '',
    projectLocation: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    province: '',
    energyType: '',
    electricalCapacity: '',
    historicalYears: '3',
    expectedCO2Reduction: '',
    annualKwhProduction: '',
    alphaG8Id: ''
  });
  
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Document types that need to be uploaded
  const requiredDocuments = [
    {
      id: 'land_analysis',
      name: language === 'it' ? 'Analisi del Terreno' : 'Land Analysis',
      description: language === 'it' ? 'Analisi geologica e chimica del terreno' : 'Geological and chemical land analysis',
      icon: <Leaf className="h-4 w-4" />
    },
    {
      id: 'technical_drawings',
      name: language === 'it' ? 'Disegni Tecnici' : 'Technical Drawings',
      description: language === 'it' ? 'Planimetrie e schemi tecnici dell\'installazione' : 'Site plans and technical installation diagrams',
      icon: <Factory className="h-4 w-4" />
    },
    {
      id: 'permits',
      name: language === 'it' ? 'Autorizzazioni' : 'Permits',
      description: language === 'it' ? 'Permessi comunali e autorizzazioni necessarie' : 'Municipal permits and required authorizations',
      icon: <FileText className="h-4 w-4" />
    },
    {
      id: 'co2_calculations',
      name: language === 'it' ? 'Calcoli CO₂' : 'CO₂ Calculations',
      description: language === 'it' ? 'Calcoli dettagliati delle riduzioni di CO₂' : 'Detailed CO₂ reduction calculations',
      icon: <Calculator className="h-4 w-4" />
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Auto-calculate CO₂ reduction when capacity is entered
    if (field === 'electricalCapacity' && value) {
      const capacity = parseFloat(value);
      if (!isNaN(capacity)) {
        const annualProduction = capacity * 1400; // kWh per year estimate
        const co2Reduction = annualProduction * 0.53; // Italian emission factor
        
        setProjectData(prev => ({
          ...prev,
          annualKwhProduction: annualProduction.toString(),
          expectedCO2Reduction: (co2Reduction / 1000).toFixed(2) // Convert to tons
        }));
      }
    }
  };

  const handleFileUpload = (documentType: string, file: File) => {
    // Simulate file upload and document creation
    const newDocument = {
      id: `doc-${Date.now()}`,
      type: documentType,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      uploadDate: new Date().toLocaleDateString(),
      content: generateDocumentContent(documentType)
    };
    
    setUploadedDocuments(prev => [
      ...prev.filter(doc => doc.type !== documentType), // Remove existing doc of same type
      newDocument
    ]);
    
    toast({
      title: language === 'it' ? 'Documento Caricato' : 'Document Uploaded',
      description: language === 'it' 
        ? `${file.name} caricato con successo` 
        : `${file.name} uploaded successfully`,
    });
  };

  const generateDocumentContent = (documentType: string) => {
    // Generate realistic content based on document type
    switch (documentType) {
      case 'land_analysis':
        return {
          soilType: 'Argilloso-limoso',
          phLevel: '7.2',
          nutrients: 'Azoto: 2.1%, Fosforo: 0.8%, Potassio: 1.5%',
          suitability: 'Ottima per installazioni solari',
          recommendations: 'Fondazioni in calcestruzzo raccomandato'
        };
      case 'co2_calculations':
        return {
          emissionFactor: '0.53 kg CO₂/kWh',
          annualProduction: projectData.annualKwhProduction,
          annualReduction: projectData.expectedCO2Reduction,
          lifetimeReduction: (parseFloat(projectData.expectedCO2Reduction) * 25).toFixed(2),
          methodology: 'ISO 14064-2 Standard'
        };
      default:
        return { status: 'Caricato', verified: false };
    }
  };

  const handleSubmit = async () => {
    if (!projectData.projectName || !projectData.alphaG8Id || uploadedDocuments.length < 4) {
      toast({
        title: language === 'it' ? 'Dati Incompleti' : 'Incomplete Data',
        description: language === 'it' 
          ? 'Compila tutti i campi e carica tutti i documenti richiesti' 
          : 'Fill all fields and upload all required documents',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate project submission
    setTimeout(() => {
      // Store project data
      const newProject = {
        id: `PROJ-${Date.now()}`,
        ...projectData,
        documents: uploadedDocuments,
        status: 'pending_review',
        submissionDate: new Date().toISOString(),
        certificationStatus: 'pending',
        blockchainRecorded: false
      };
      
      const existingProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
      existingProjects.push(newProject);
      localStorage.setItem('userProjects', JSON.stringify(existingProjects));
      
      toast({
        title: language === 'it' ? 'Progetto Registrato' : 'Project Registered',
        description: language === 'it'
          ? 'Il tuo progetto è stato registrato con successo e inviato per la revisione.'
          : 'Your project has been successfully registered and sent for review.',
      });
      
      setIsSubmitting(false);
      
      // Navigate back to team dashboard
      setTimeout(() => setLocation('/team-dashboard'), 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Navigation />
      
      <div className="pt-28 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <Button 
                  variant="ghost" 
                  onClick={() => setLocation('/team-dashboard')}
                  className="mr-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {language === 'it' ? 'Torna al Dashboard' : 'Back to Dashboard'}
                </Button>
                <div>
                  <h1 className="text-3xl font-light text-slate-800">
                    {language === 'it' ? 'Registrazione Nuovo Progetto' : 'New Project Registration'}
                  </h1>
                  <p className="text-slate-600 mt-2">
                    {language === 'it' 
                      ? 'Carica documentazione e registra il tuo progetto CO₂'
                      : 'Upload documentation and register your CO₂ project'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Project Information Form */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  {language === 'it' ? 'Informazioni Progetto' : 'Project Information'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="projectName">{language === 'it' ? 'Nome Progetto' : 'Project Name'}</Label>
                    <Input
                      id="projectName"
                      value={projectData.projectName}
                      onChange={(e) => handleInputChange('projectName', e.target.value)}
                      placeholder={language === 'it' ? 'Es. Impianto Solare Agricolo' : 'Ex. Agricultural Solar Installation'}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="projectType">{language === 'it' ? 'Tipo Progetto' : 'Project Type'}</Label>
                    <Select value={projectData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'it' ? 'Seleziona tipo' : 'Select type'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="renewable-energy">{language === 'it' ? 'Energia Rinnovabile' : 'Renewable Energy'}</SelectItem>
                        <SelectItem value="forestry">{language === 'it' ? 'Forestale' : 'Forestry'}</SelectItem>
                        <SelectItem value="agriculture">{language === 'it' ? 'Agricolo' : 'Agriculture'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="projectDescription">{language === 'it' ? 'Descrizione Progetto' : 'Project Description'}</Label>
                  <Textarea
                    id="projectDescription"
                    value={projectData.projectDescription}
                    onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                    placeholder={language === 'it' ? 'Descrivi il tuo progetto in dettaglio...' : 'Describe your project in detail...'}
                    rows={3}
                  />
                </div>

                {projectData.projectType === 'renewable-energy' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="energyType">{language === 'it' ? 'Tipo Energia' : 'Energy Type'}</Label>
                      <Select value={projectData.energyType} onValueChange={(value) => handleInputChange('energyType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={language === 'it' ? 'Seleziona' : 'Select'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solar">Solare (Solar)</SelectItem>
                          <SelectItem value="wind">Eolico (Wind)</SelectItem>
                          <SelectItem value="hydro">Idroelettrico (Hydro)</SelectItem>
                          <SelectItem value="biomass">Biomasse (Biomass)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="electricalCapacity">{language === 'it' ? 'Capacità (kW)' : 'Capacity (kW)'}</Label>
                      <Input
                        id="electricalCapacity"
                        type="number"
                        value={projectData.electricalCapacity}
                        onChange={(e) => handleInputChange('electricalCapacity', e.target.value)}
                        placeholder="50"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="expectedCO2Reduction">{language === 'it' ? 'Riduzione CO₂ (t/anno)' : 'CO₂ Reduction (t/year)'}</Label>
                      <Input
                        id="expectedCO2Reduction"
                        value={projectData.expectedCO2Reduction}
                        readOnly
                        className="bg-gray-50"
                        placeholder={language === 'it' ? 'Calcolato automaticamente' : 'Auto-calculated'}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="alphaG8Id">{language === 'it' ? 'ALPHAG8 ID KEY' : 'ALPHAG8 ID KEY'}</Label>
                  <Input
                    id="alphaG8Id"
                    value={projectData.alphaG8Id}
                    onChange={(e) => handleInputChange('alphaG8Id', e.target.value)}
                    placeholder="FAGRI-XXXXXXXX-XXXXXXXX-XX"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Document Upload Section */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  {language === 'it' ? 'Caricamento Documenti' : 'Document Upload'}
                  <Badge className="ml-2" variant={uploadedDocuments.length >= 4 ? "default" : "secondary"}>
                    {uploadedDocuments.length}/4 {language === 'it' ? 'Caricati' : 'Uploaded'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {requiredDocuments.map((doc) => {
                    const uploaded = uploadedDocuments.find(d => d.type === doc.id);
                    
                    return (
                      <div key={doc.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {doc.icon}
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-xs text-gray-600">{doc.description}</p>
                            </div>
                          </div>
                          {uploaded && <CheckCircle className="h-4 w-4 text-green-600" />}
                        </div>
                        
                        {!uploaded ? (
                          <div>
                            <Input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(doc.id, file);
                                }
                              }}
                              className="mb-2"
                            />
                          </div>
                        ) : (
                          <div className="text-sm text-green-600">
                            ✓ {uploaded.name} ({uploaded.size})
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !projectData.projectName || !projectData.alphaG8Id || uploadedDocuments.length < 4}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-lg px-8"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{language === 'it' ? 'Registrazione in corso...' : 'Registering...'}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>{language === 'it' ? 'Registra Progetto' : 'Register Project'}</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}