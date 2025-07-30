import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { useLanguage } from '@/components/language-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Shield, CheckCircle, AlertTriangle, Clock, FileCheck, Award, TrendingUp, Search, User, Calendar, MapPin, Download, MessageSquare, X, Check } from 'lucide-react';

interface ProjectReviewData {
  id: string;
  name: string;
  type: string;
  co2: string;
  status: string;
  priority: string;
  submittedBy: string;
  assignedTo: string;
  daysLeft: number;
  submissionDate: string;
  location: string;
  capacity: string;
  projectDescription: string;
  documents: Array<{
    name: string;
    type: string;
    uploadDate: string;
    size: string;
    status: string;
  }>;
  teamNotes: Array<{
    author: string;
    date: string;
    note: string;
    type: 'info' | 'warning' | 'success';
  }>;
  technicalSpecs: {
    energyType: string;
    installedCapacity: string;
    expectedAnnualProduction: string;
    co2ReductionCalculation: string;
    emissionFactor: string;
  };
}

export default function CertificationDashboard() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<ProjectReviewData | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewDecision, setReviewDecision] = useState<'approve' | 'corrections' | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  
  // Current reviewer's ALPHAG8 ID (from localStorage)
  const reviewerAlphaG8Id = localStorage.getItem('alphaG8Id') || 'FAGRI-XXXXXXXX-XXXXXXXX-XX';

  // Mock comprehensive project data with all details needed for review
  const getProjectDetails = (project: any): ProjectReviewData => {
    const projectData: { [key: string]: ProjectReviewData } = {
      'PV-2024-001': {
        id: 'PV-2024-001',
        name: language === 'it' ? 'Progetto Solare Milano' : 'Milan Solar Project',
        type: 'Solar',
        co2: '750t',
        status: 'validation',
        priority: 'high',
        submittedBy: 'Marco Rossi',
        assignedTo: 'Alessandro Bianchi',
        daysLeft: 2,
        submissionDate: '2024-07-28',
        location: 'Milano, Lombardia, Italia',
        capacity: '500 kW',
        projectDescription: 'Installazione di pannelli solari fotovoltaici su terreni agricoli per produzione di energia rinnovabile e riduzione delle emissioni CO₂.',
        documents: [
          { name: 'Analisi_Suolo_Milano.pdf', type: 'Soil Analysis', uploadDate: '2024-07-28', size: '2.1 MB', status: 'verified' },
          { name: 'Calcoli_CO2_Fotovoltaico.xlsx', type: 'CO₂ Calculations', uploadDate: '2024-07-28', size: '850 KB', status: 'pending' },
          { name: 'Schemi_Tecnici_Impianto.dwg', type: 'Technical Drawings', uploadDate: '2024-07-28', size: '4.2 MB', status: 'verified' },
          { name: 'Autorizzazioni_Comune.pdf', type: 'Permits', uploadDate: '2024-07-27', size: '1.8 MB', status: 'verified' }
        ],
        teamNotes: [
          { author: 'Alessandro Bianchi', date: '2024-07-29', note: 'Documentazione tecnica completa. Necessaria verifica calcoli CO₂.', type: 'info' },
          { author: 'Marco Rossi', date: '2024-07-28', note: 'Progetto sottomesso con tutta la documentazione richiesta.', type: 'success' }
        ],
        technicalSpecs: {
          energyType: 'Solarenergie (Energia Solare)',
          installedCapacity: '500 kW',
          expectedAnnualProduction: '650 MWh/anno',
          co2ReductionCalculation: '650 MWh × 0.53 kg CO₂/kWh = 344.5 t CO₂/anno',
          emissionFactor: '0.53 kg CO₂/kWh (Standard Italia)'
        }
      },
      'WF-2024-008': {
        id: 'WF-2024-008',
        name: language === 'it' ? 'Parco Eolico Sardegna' : 'Sardinia Wind Farm',
        type: 'Wind',
        co2: '1,850t',
        status: 'review',
        priority: 'medium',
        submittedBy: 'Sofia Bianchi',
        assignedTo: 'Giuseppe Verdi',
        daysLeft: 5,
        submissionDate: '2024-07-25',
        location: 'Cagliari, Sardegna, Italia',
        capacity: '2 MW',
        projectDescription: 'Installazione di turbine eoliche per produzione di energia rinnovabile nel sud Sardegna.',
        documents: [
          { name: 'Studio_Vento_Sardegna.pdf', type: 'Wind Analysis', uploadDate: '2024-07-25', size: '3.5 MB', status: 'verified' },
          { name: 'Impatto_Ambientale_Eolico.pdf', type: 'Environmental Impact', uploadDate: '2024-07-25', size: '2.8 MB', status: 'verified' },
          { name: 'Calcoli_Produzione_Energia.xlsx', type: 'Energy Production', uploadDate: '2024-07-25', size: '1.2 MB', status: 'pending' }
        ],
        teamNotes: [
          { author: 'Giuseppe Verdi', date: '2024-07-26', note: 'Documentazione ambientale eccellente. Verificare calcoli di produzione.', type: 'info' },
          { author: 'Sofia Bianchi', date: '2024-07-25', note: 'Progetto completo con tutte le autorizzazioni necessarie.', type: 'success' }
        ],
        technicalSpecs: {
          energyType: 'Windenergie (Energia Eolica)',
          installedCapacity: '2 MW',
          expectedAnnualProduction: '4,200 MWh/anno',
          co2ReductionCalculation: '4,200 MWh × 0.53 kg CO₂/kWh = 2,226 t CO₂/anno',
          emissionFactor: '0.53 kg CO₂/kWh (Standard Italia)'
        }
      },
      'HY-2024-003': {
        id: 'HY-2024-003',
        name: language === 'it' ? 'Idroelettrico Valle d\'Aosta' : 'Valle d\'Aosta Hydroelectric',
        type: 'Hydro',
        co2: '1,200t',
        status: 'corrections',
        priority: 'high',
        submittedBy: 'Giuseppe Verdi',
        assignedTo: 'Maria Rossi',
        daysLeft: 1,
        submissionDate: '2024-07-22',
        location: 'Aosta, Valle d\'Aosta, Italia',
        capacity: '1.5 MW',
        projectDescription: 'Impianto idroelettrico a filo d\'acqua per sfruttamento sostenibile delle risorse idriche alpine.',
        documents: [
          { name: 'Studio_Idrologico_Aosta.pdf', type: 'Hydrological Study', uploadDate: '2024-07-22', size: '4.1 MB', status: 'verified' },
          { name: 'Autorizzazioni_Regione.pdf', type: 'Regional Permits', uploadDate: '2024-07-22', size: '2.3 MB', status: 'corrections_needed' },
          { name: 'Calcoli_Portata_Acqua.xlsx', type: 'Water Flow Calculations', uploadDate: '2024-07-22', size: '980 KB', status: 'corrections_needed' }
        ],
        teamNotes: [
          { author: 'Maria Rossi', date: '2024-07-29', note: 'URGENTE: Autorizzazioni regionali incomplete. Mancano firme autorità competenti.', type: 'warning' },
          { author: 'Giuseppe Verdi', date: '2024-07-22', note: 'Progetto sottomesso. In attesa di verifica documentazione.', type: 'info' }
        ],
        technicalSpecs: {
          energyType: 'Wasserkraft (Energia Idroelettrica)',
          installedCapacity: '1.5 MW',
          expectedAnnualProduction: '2,800 MWh/anno',
          co2ReductionCalculation: '2,800 MWh × 0.53 kg CO₂/kWh = 1,484 t CO₂/anno',
          emissionFactor: '0.53 kg CO₂/kWh (Standard Italia)'
        }
      }
    };
    
    return projectData[project.id] || projectData['PV-2024-001'];
  };

  const handleOpenReview = (project: any) => {
    const fullProjectData = getProjectDetails(project);
    setSelectedProject(fullProjectData);
    setShowReviewModal(true);
    setReviewDecision(null);
    setReviewNotes('');
  };

  const handleCertifyProject = (project: any) => {
    const fullProjectData = getProjectDetails(project);
    setSelectedProject(fullProjectData);
    setReviewDecision('approve');
    setShowReviewModal(true);
  };

  const handleSubmitReview = async () => {
    if (!selectedProject || !reviewDecision) return;

    try {
      // Log the review action with ALPHAG8 ID
      const reviewAction = {
        projectId: selectedProject.id,
        reviewerId: reviewerAlphaG8Id,
        reviewerName: 'Current Certification Officer',
        decision: reviewDecision,
        notes: reviewNotes,
        timestamp: new Date().toISOString(),
        projectName: selectedProject.name
      };

      // Store review action (in production this would go to backend)
      const existingReviews = JSON.parse(localStorage.getItem('reviewActions') || '[]');
      existingReviews.push(reviewAction);
      localStorage.setItem('reviewActions', JSON.stringify(existingReviews));

      toast({
        title: language === 'it' ? 'Review Completato' : 'Review Completed',
        description: language === 'it' 
          ? `Progetto ${selectedProject.name} ${reviewDecision === 'approve' ? 'approvato' : 'richiede correzioni'}`
          : `Project ${selectedProject.name} ${reviewDecision === 'approve' ? 'approved' : 'needs corrections'}`,
      });

      setShowReviewModal(false);
      setSelectedProject(null);
    } catch (error) {
      toast({
        title: language === 'it' ? 'Errore' : 'Error',
        description: language === 'it' ? 'Errore durante il salvataggio del review' : 'Error saving review',
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-light text-slate-800">
                    {language === 'it' ? 'Dashboard Certificazione' : 'Certification Dashboard'}
                  </h1>
                  <p className="text-slate-600 mt-2">
                    {language === 'it' 
                      ? 'Validazione e certificazione progetti CO₂ secondo standard EUFD2025-001'
                      : 'CO₂ project validation and certification according to EUFD2025-001 standard'
                    }
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Search className="h-4 w-4 mr-2" />
                    {language === 'it' ? 'Cerca Progetti' : 'Search Projects'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Certification Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-amber-800">
                        {language === 'it' ? 'In Revisione' : 'Under Review'}
                      </p>
                      <p className="text-2xl font-bold text-amber-900">7</p>
                    </div>
                    <Clock className="h-8 w-8 text-amber-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        {language === 'it' ? 'In Validazione' : 'In Validation'}
                      </p>
                      <p className="text-2xl font-bold text-blue-900">5</p>
                    </div>
                    <FileCheck className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-200 bg-emerald-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-800">
                        {language === 'it' ? 'Certificati' : 'Certified'}
                      </p>
                      <p className="text-2xl font-bold text-emerald-900">23</p>
                    </div>
                    <Award className="h-8 w-8 text-emerald-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-800">
                        {language === 'it' ? 'Richiede Correzioni' : 'Needs Corrections'}
                      </p>
                      <p className="text-2xl font-bold text-red-900">3</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Projects Pending Certification */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Shield className="h-5 w-5 mr-2 text-purple-600" />
                      {language === 'it' ? 'Progetti in Certificazione' : 'Projects Under Certification'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: language === 'it' ? 'Progetto Fotovoltaico Milano' : 'Milan Solar Project',
                          id: 'PV-2024-001',
                          type: 'Solar',
                          co2: '750t',
                          status: 'validation',
                          priority: 'high',
                          submittedBy: 'Marco Rossi',
                          daysLeft: 2
                        },
                        {
                          name: language === 'it' ? 'Parco Eolico Sardegna' : 'Sardinia Wind Farm',
                          id: 'WF-2024-008',
                          type: 'Wind',
                          co2: '1,850t',
                          status: 'review',
                          priority: 'medium',
                          submittedBy: 'Sofia Bianchi',
                          daysLeft: 5
                        },
                        {
                          name: language === 'it' ? 'Idroelettrico Valle d\'Aosta' : 'Valle d\'Aosta Hydroelectric',
                          id: 'HY-2024-003',
                          type: 'Hydro',
                          co2: '1,200t',
                          status: 'corrections',
                          priority: 'high',
                          submittedBy: 'Giuseppe Verdi',
                          daysLeft: 1
                        }
                      ].map((project, index) => (
                        <div key={index} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-medium text-slate-800">{project.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {project.id}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              {project.status === 'validation' && (
                                <Badge className="bg-blue-100 text-blue-800">
                                  {language === 'it' ? 'Validazione' : 'Validation'}
                                </Badge>
                              )}
                              {project.status === 'review' && (
                                <Badge className="bg-amber-100 text-amber-800">
                                  {language === 'it' ? 'Revisione' : 'Review'}
                                </Badge>
                              )}
                              {project.status === 'corrections' && (
                                <Badge variant="destructive">
                                  {language === 'it' ? 'Correzioni' : 'Corrections'}
                                </Badge>
                              )}
                              {project.priority === 'high' && (
                                <Badge variant="destructive" className="text-xs">
                                  {language === 'it' ? 'Alta' : 'High'}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600 mb-3">
                            <div>
                              <span className="font-medium">{language === 'it' ? 'Tipo:' : 'Type:'}</span>
                              <span className="ml-1">{project.type}</span>
                            </div>
                            <div>
                              <span className="font-medium">CO₂:</span>
                              <span className="ml-1">{project.co2}</span>
                            </div>
                            <div>
                              <span className="font-medium">{language === 'it' ? 'Inviato da:' : 'Submitted by:'}</span>
                              <span className="ml-1">{project.submittedBy}</span>
                            </div>
                            <div>
                              <span className="font-medium">{language === 'it' ? 'Scadenza:' : 'Deadline:'}</span>
                              <span className={`ml-1 ${project.daysLeft <= 2 ? 'text-red-600 font-medium' : ''}`}>
                                {project.daysLeft} {language === 'it' ? 'giorni' : 'days'}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-end space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleOpenReview(project)}
                            >
                              {language === 'it' ? 'Rivedi' : 'Review'}
                            </Button>
                            {project.status === 'validation' && (
                              <Button 
                                size="sm" 
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                onClick={() => handleCertifyProject(project)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                {language === 'it' ? 'Certifica' : 'Certify'}
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Certification Tools & Analytics */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <TrendingUp className="h-5 w-5 mr-2 text-emerald-600" />
                      {language === 'it' ? 'Statistiche Mensili' : 'Monthly Statistics'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">{language === 'it' ? 'Progetti Certificati' : 'Certified Projects'}</span>
                      <span className="font-semibold text-emerald-600">23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">{language === 'it' ? 'CO₂ Totale Certificata' : 'Total Certified CO₂'}</span>
                      <span className="font-semibold text-blue-600">15,420t</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">{language === 'it' ? 'Tempo Medio' : 'Average Time'}</span>
                      <span className="font-semibold text-purple-600">4.2 giorni</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">{language === 'it' ? 'Tasso Approvazione' : 'Approval Rate'}</span>
                      <span className="font-semibold text-emerald-600">87%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <FileCheck className="h-5 w-5 mr-2 text-blue-600" />
                      {language === 'it' ? 'Standard EUFD2025-001' : 'EUFD2025-001 Standard'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm font-medium text-green-800">
                        {language === 'it' ? 'Conformità ISO 14064-1' : 'ISO 14064-1 Compliance'}
                      </p>
                      <p className="text-xs text-green-600">100% {language === 'it' ? 'Conforme' : 'Compliant'}</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">
                        {language === 'it' ? 'Blockchain Verifiche' : 'Blockchain Verifications'}
                      </p>
                      <p className="text-xs text-blue-600">
                        {language === 'it' ? 'Attive su G8Chain' : 'Active on G8Chain'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Shield className="h-5 w-5 mr-2 text-slate-600" />
                      {language === 'it' ? 'Strumenti Certificazione' : 'Certification Tools'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FileCheck className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Valida Documenti' : 'Validate Documents'}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Award className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Genera Certificati' : 'Generate Certificates'}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Report Audit' : 'Audit Reports'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Project Review Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light text-slate-800">
              {language === 'it' ? 'Review Progetto Certificazione' : 'Project Certification Review'}
            </DialogTitle>
          </DialogHeader>

          {selectedProject && (
            <div className="space-y-6 p-6">
              {/* Reviewer Information */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        {language === 'it' ? 'Revisore Corrente' : 'Current Reviewer'}
                      </p>
                      <p className="text-lg font-semibold text-blue-900">{reviewerAlphaG8Id}</p>
                    </div>
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              {/* Project Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileCheck className="h-5 w-5 mr-2" />
                    {language === 'it' ? 'Panoramica Progetto' : 'Project Overview'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-slate-600">{language === 'it' ? 'Nome Progetto' : 'Project Name'}</p>
                        <p className="text-lg font-semibold">{selectedProject.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">ID</p>
                        <p className="font-mono text-blue-600">{selectedProject.id}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">{language === 'it' ? 'Tipo' : 'Type'}</p>
                        <p>{selectedProject.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">CO₂ {language === 'it' ? 'Riduzione' : 'Reduction'}</p>
                        <p className="text-lg font-semibold text-green-600">{selectedProject.co2}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-slate-600">{language === 'it' ? 'Sottomesso da' : 'Submitted by'}</p>
                        <p className="font-semibold">{selectedProject.submittedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">{language === 'it' ? 'Assegnato a' : 'Assigned to'}</p>
                        <p className="font-semibold">{selectedProject.assignedTo}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">{language === 'it' ? 'Localizzazione' : 'Location'}</p>
                        <p>{selectedProject.location}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">{language === 'it' ? 'Capacità' : 'Capacity'}</p>
                        <p>{selectedProject.capacity}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">{language === 'it' ? 'Descrizione' : 'Description'}</p>
                    <p className="text-slate-700 bg-slate-50 p-3 rounded">{selectedProject.projectDescription}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Technical Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    {language === 'it' ? 'Specifiche Tecniche' : 'Technical Specifications'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{language === 'it' ? 'Tipo Energia' : 'Energy Type'}</p>
                      <p>{selectedProject.technicalSpecs.energyType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">{language === 'it' ? 'Capacità Installata' : 'Installed Capacity'}</p>
                      <p>{selectedProject.technicalSpecs.installedCapacity}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">{language === 'it' ? 'Produzione Annuale' : 'Annual Production'}</p>
                      <p>{selectedProject.technicalSpecs.expectedAnnualProduction}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">{language === 'it' ? 'Fattore Emissione' : 'Emission Factor'}</p>
                      <p>{selectedProject.technicalSpecs.emissionFactor}</p>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-green-800 mb-2">{language === 'it' ? 'Calcolo Riduzione CO₂' : 'CO₂ Reduction Calculation'}</p>
                    <p className="font-mono text-green-700">{selectedProject.technicalSpecs.co2ReductionCalculation}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileCheck className="h-5 w-5 mr-2" />
                    {language === 'it' ? 'Documentazione' : 'Documentation'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedProject.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileCheck className="h-4 w-4 text-slate-500" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-slate-600">{doc.type} • {doc.size} • {language === 'it' ? 'Caricato' : 'Uploaded'} {doc.uploadDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={
                            doc.status === 'verified' ? 'bg-green-100 text-green-800' :
                            doc.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {doc.status === 'verified' ? (language === 'it' ? 'Verificato' : 'Verified') :
                             doc.status === 'pending' ? (language === 'it' ? 'In Attesa' : 'Pending') :
                             (language === 'it' ? 'Correzioni' : 'Corrections')}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Team Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    {language === 'it' ? 'Note del Team' : 'Team Notes'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedProject.teamNotes.map((note, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${
                        note.type === 'warning' ? 'bg-amber-50 border-amber-200' :
                        note.type === 'success' ? 'bg-green-50 border-green-200' :
                        'bg-blue-50 border-blue-200'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-slate-800">{note.author}</p>
                          <p className="text-sm text-slate-600">{note.date}</p>
                        </div>
                        <p className="text-slate-700">{note.note}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Review Decision */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    {language === 'it' ? 'Decisione Review' : 'Review Decision'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-4">
                    <Button
                      onClick={() => setReviewDecision('approve')}
                      className={`flex-1 ${reviewDecision === 'approve' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Approva Progetto' : 'Approve Project'}
                    </Button>
                    <Button
                      onClick={() => setReviewDecision('corrections')}
                      className={`flex-1 ${reviewDecision === 'corrections' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Richiedi Correzioni' : 'Request Corrections'}
                    </Button>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">
                      {language === 'it' ? 'Note del Review' : 'Review Notes'}
                    </p>
                    <Textarea
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder={language === 'it' 
                        ? 'Aggiungi note dettagliate sul tuo review...' 
                        : 'Add detailed notes about your review...'}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setShowReviewModal(false)}>
                      {language === 'it' ? 'Annulla' : 'Cancel'}
                    </Button>
                    <Button
                      onClick={handleSubmitReview}
                      disabled={!reviewDecision}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      {language === 'it' ? 'Completa Review' : 'Complete Review'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}