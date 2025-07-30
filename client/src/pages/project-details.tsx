import React, { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { Navigation } from '@/components/navigation';
import { useLanguage } from '@/components/language-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// Progress component is not available, using custom implementation
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  Home,
  FileText,
  Users,
  Calendar,
  MapPin,
  Euro,
  Leaf,
  Clock,
  CheckCircle,
  AlertTriangle,
  Edit,
  Save,
  MessageSquare,
  Upload,
  Download,
  Phone,
  Mail,
  Building,
  Target,
  TrendingUp,
  Award,
  Settings,
  Camera,
  User
} from 'lucide-react';

export default function ProjectDetails() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const [match, params] = useRoute('/project/:id');
  
  // State management
  const [project, setProject] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newUpdate, setNewUpdate] = useState('');
  const [showContactClient, setShowContactClient] = useState(false);

  // Get project data based on ID
  useEffect(() => {
    const projectId = params?.id;
    if (projectId) {
      // Simulate loading project data
      const projectData = getProjectData(projectId);
      setProject(projectData);
    }
  }, [params?.id]);

  // Sample detailed project data
  const getProjectData = (id: string) => {
    const projects = {
      'proj-001': {
        id: 'proj-001',
        name: 'Tuscany Solar Project',
        type: 'Solar',
        status: 'In Certification',
        progress: 75,
        co2Reduction: '450t CO₂',
        client: {
          name: 'Azienda Agricola Rossi',
          contact: 'Mario Rossi',
          email: 'mario.rossi@agricola-rossi.it',
          phone: '+39 055 123 4567',
          address: 'Via dei Campi 25, 53100 Siena'
        },
        location: 'Siena, Tuscany',
        startDate: '2024-03-15',
        estimatedCompletion: '2024-08-30',
        description: 'Installazione di pannelli solari da 500kW su terreni agricoli con coltivazione agrivoltaica. Il progetto prevede l\'installazione di 1.500 pannelli fotovoltaici su strutture elevate che permettono la continuazione dell\'attività agricola sottostante.',
        technicalSpecs: {
          capacity: '500kW',
          panels: '1,500 unità',
          inverters: '10 x 50kW',
          expectedYield: '650,000 kWh/anno'
        },
        documents: [
          { name: 'Permessi comunali', status: 'Approvato', date: '2024-02-15' },
          { name: 'Studio impatto ambientale', status: 'Completato', date: '2024-01-30' },
          { name: 'Contratto GSE', status: 'Firmato', date: '2024-03-01' },
          { name: 'Certificazione pannelli', status: 'In corso', date: '2024-07-15' }
        ],
        nextActions: [
          { action: 'Ispezione finale tecnica', deadline: '2024-08-05', responsible: 'Alessandro Rossi' },
          { action: 'Certificazione ISO 14064-2', deadline: '2024-08-15', responsible: 'Maria Bianchi' },
          { action: 'Rilascio crediti CO₂', deadline: '2024-08-25', responsible: 'Giuseppe Verdi' }
        ],
        teamMembers: [
          { name: 'Alessandro Rossi', role: 'Project Manager', email: 'alessandro@fagri.digital' },
          { name: 'Maria Bianchi', role: 'Certification Specialist', email: 'maria@fagri.digital' }
        ],
        budget: {
          total: '€850,000',
          spent: '€637,500',
          remaining: '€212,500',
          breakdown: [
            { item: 'Pannelli solari', amount: '€400,000', status: 'Pagato' },
            { item: 'Inverter e componenti', amount: '€150,000', status: 'Pagato' },
            { item: 'Installazione', amount: '€200,000', status: 'In corso' },
            { item: 'Certificazione', amount: '€100,000', status: 'Pianificato' }
          ]
        },
        currentPhase: 'Certificazione Finale',
        timeline: [
          { phase: 'Progettazione', status: 'Completato', date: '2024-01-15 - 2024-02-28' },
          { phase: 'Permessi e autorizzazioni', status: 'Completato', date: '2024-02-01 - 2024-03-15' },
          { phase: 'Installazione hardware', status: 'Completato', date: '2024-03-15 - 2024-06-30' },
          { phase: 'Testing e commissioning', status: 'Completato', date: '2024-07-01 - 2024-07-30' },
          { phase: 'Certificazione finale', status: 'In corso', date: '2024-07-30 - 2024-08-30' },
          { phase: 'Rilascio crediti CO₂', status: 'Pianificato', date: '2024-08-30 - 2024-09-15' }
        ],
        updates: [
          { date: '2024-07-30', author: 'Alessandro Rossi', update: 'Completati i test di performance. Tutti i parametri rientrano nelle specifiche.' },
          { date: '2024-07-25', author: 'Maria Bianchi', update: 'Iniziate le procedure per la certificazione ISO 14064-2.' },
          { date: '2024-07-20', author: 'Alessandro Rossi', update: 'Installazione completata al 100%. Sistema operativo.' }
        ]
      },
      'proj-002': {
        id: 'proj-002',
        name: 'Puglia Wind Farm',
        type: 'Wind',
        status: 'Active',
        progress: 45,
        co2Reduction: '1,200t CO₂',
        client: {
          name: 'Cooperativa Energia Verde Puglia',
          contact: 'Giuseppe Bianchi',
          email: 'g.bianchi@energiaverde-puglia.coop',
          phone: '+39 080 987 6543',
          address: 'Via del Vento 15, 71100 Foggia'
        },
        location: 'Foggia, Puglia',
        startDate: '2024-01-20',
        estimatedCompletion: '2024-12-15',
        description: 'Parco eolico da 15 turbine per generazione di energia rinnovabile e certificazione carbon credits. Il progetto prevede l\'installazione di turbine eoliche di ultima generazione su terreni collinari con velocità del vento ottimali.',
        technicalSpecs: {
          capacity: '30MW',
          turbines: '15 unità',
          hubHeight: '120m',
          expectedYield: '85,000 MWh/anno'
        },
        documents: [
          { name: 'VIA Regionale', status: 'Approvato', date: '2023-11-15' },
          { name: 'Autorizzazione Unica', status: 'Approvato', date: '2023-12-20' },
          { name: 'Studio ornitologico', status: 'Completato', date: '2023-10-30' },
          { name: 'Contratto allacciamento rete', status: 'In corso', date: '2024-07-01' }
        ],
        nextActions: [
          { action: 'Montaggio turbine 8-15', deadline: '2024-09-30', responsible: 'Alessandro Rossi' },
          { action: 'Test prestazioni', deadline: '2024-10-15', responsible: 'Giuseppe Verdi' },
          { action: 'Allacciamento rete', deadline: '2024-11-30', responsible: 'Lucia Romano' }
        ],
        teamMembers: [
          { name: 'Alessandro Rossi', role: 'Project Manager', email: 'alessandro@fagri.digital' },
          { name: 'Giuseppe Verdi', role: 'Technical Engineer', email: 'giuseppe@fagri.digital' },
          { name: 'Lucia Romano', role: 'Grid Specialist', email: 'lucia@fagri.digital' }
        ],
        budget: {
          total: '€2,400,000',
          spent: '€1,080,000',
          remaining: '€1,320,000',
          breakdown: [
            { item: 'Turbine eoliche', amount: '€1,800,000', status: 'Parziale' },
            { item: 'Opere civili', amount: '€300,000', status: 'Completato' },
            { item: 'Allacciamento rete', amount: '€200,000', status: 'Pianificato' },
            { item: 'Certificazione', amount: '€100,000', status: 'Pianificato' }
          ]
        },
        currentPhase: 'Installazione Hardware',
        timeline: [
          { phase: 'Progettazione', status: 'Completato', date: '2023-09-01 - 2023-11-30' },
          { phase: 'Permessi e autorizzazioni', status: 'Completato', date: '2023-10-01 - 2024-01-20' },
          { phase: 'Preparazione sito', status: 'Completato', date: '2024-01-20 - 2024-04-30' },
          { phase: 'Installazione turbine 1-7', status: 'Completato', date: '2024-05-01 - 2024-07-30' },
          { phase: 'Installazione turbine 8-15', status: 'In corso', date: '2024-08-01 - 2024-09-30' },
          { phase: 'Commissioning e test', status: 'Pianificato', date: '2024-10-01 - 2024-11-30' }
        ],
        updates: [
          { date: '2024-07-30', author: 'Alessandro Rossi', update: 'Prime 7 turbine installate e operative. Produzione conforme alle aspettative.' },
          { date: '2024-07-15', author: 'Giuseppe Verdi', update: 'Iniziata installazione turbine 8-10. Condizioni meteo favorevoli.' },
          { date: '2024-07-01', author: 'Lucia Romano', update: 'Completata preparazione fondazioni per turbine 8-15.' }
        ]
      }
    };
    return projects[id as keyof typeof projects] || null;
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
        <Navigation />
        <div className="pt-28 pb-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl font-bold text-slate-800 mb-4">
                {language === 'it' ? 'Progetto non trovato' : 'Project not found'}
              </h1>
              <Button onClick={() => setLocation('/team-dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {language === 'it' ? 'Torna al Dashboard' : 'Back to Dashboard'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Navigation />
      
      <div className="pt-28 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header with Back Navigation */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setLocation('/team-dashboard')}
                    className="flex items-center space-x-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>{language === 'it' ? 'Team Dashboard' : 'Team Dashboard'}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setLocation('/')}
                    className="flex items-center space-x-2"
                  >
                    <Home className="h-4 w-4" />
                    <span>{language === 'it' ? 'Home' : 'Home'}</span>
                  </Button>
                </div>
                <div className="flex items-center space-x-3">
                  <Button 
                    onClick={() => setShowContactClient(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {language === 'it' ? 'Contatta Cliente' : 'Contact Client'}
                  </Button>
                  <Button 
                    onClick={() => setShowEditModal(true)}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {language === 'it' ? 'Modifica Progetto' : 'Edit Project'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Project Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-800 mb-2">{project.name}</h1>
                  <div className="flex items-center space-x-4">
                    <Badge className={`${
                      project.type === 'Solar' ? 'bg-blue-100 text-blue-800' :
                      project.type === 'Wind' ? 'bg-emerald-100 text-emerald-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {project.type}
                    </Badge>
                    <span className="text-slate-600">{project.status}</span>
                    <span className="text-slate-600 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {project.location}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{project.co2Reduction}</div>
                  <div className="text-sm text-slate-600">{language === 'it' ? 'Riduzione CO₂' : 'CO₂ Reduction'}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">{language === 'it' ? 'Progresso Progetto:' : 'Project Progress:'}</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      project.type === 'Solar' ? 'bg-blue-600' :
                      project.type === 'Wind' ? 'bg-emerald-600' :
                      'bg-green-600'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-slate-600">{project.currentPhase}</div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Project Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Project Description */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>{language === 'it' ? 'Descrizione Progetto' : 'Project Description'}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 leading-relaxed">{project.description}</p>
                    
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-slate-800">{language === 'it' ? 'Specifiche Tecniche:' : 'Technical Specs:'}</h4>
                        <div className="space-y-1 text-sm">
                          {Object.entries(project.technicalSpecs).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-slate-600 capitalize">{key}:</span>
                              <span className="font-medium">{value as string}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-slate-800">{language === 'it' ? 'Timeline:' : 'Timeline:'}</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">{language === 'it' ? 'Inizio:' : 'Start:'}</span>
                            <span className="font-medium">{project.startDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">{language === 'it' ? 'Fine:' : 'End:'}</span>
                            <span className="font-medium">{project.estimatedCompletion}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>{language === 'it' ? 'Timeline Progetto' : 'Project Timeline'}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.timeline.map((phase: any, index: number) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className={`w-4 h-4 rounded-full mt-1 ${
                            phase.status === 'Completato' ? 'bg-green-500' :
                            phase.status === 'In corso' ? 'bg-blue-500' :
                            'bg-slate-300'
                          }`} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-slate-800">{phase.phase}</h4>
                              <Badge variant={
                                phase.status === 'Completato' ? 'default' :
                                phase.status === 'In corso' ? 'secondary' :
                                'outline'
                              }>
                                {phase.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 mt-1">{phase.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Documents */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>{language === 'it' ? 'Documenti Progetto' : 'Project Documents'}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project.documents.map((doc: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <div className="font-medium text-slate-800">{doc.name}</div>
                              <div className="text-sm text-slate-600">{doc.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={doc.status === 'Approvato' || doc.status === 'Completato' || doc.status === 'Firmato' ? 'default' : 'secondary'}>
                              {doc.status}
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

                {/* Project Updates */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5" />
                      <span>{language === 'it' ? 'Aggiornamenti Progetto' : 'Project Updates'}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.updates.map((update: any, index: number) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-slate-800">{update.author}</span>
                            <span className="text-sm text-slate-600">{update.date}</span>
                          </div>
                          <p className="text-slate-700">{update.update}</p>
                        </div>
                      ))}
                      
                      <div className="mt-6 pt-4 border-t">
                        <Textarea
                          placeholder={language === 'it' ? 'Aggiungi un aggiornamento al progetto...' : 'Add a project update...'}
                          value={newUpdate}
                          onChange={(e) => setNewUpdate(e.target.value)}
                          className="mb-3"
                        />
                        <Button 
                          onClick={() => {
                            if (newUpdate.trim()) {
                              toast({
                                title: language === 'it' ? 'Aggiornamento Aggiunto' : 'Update Added',
                                description: language === 'it' ? 'L\'aggiornamento del progetto è stato salvato' : 'Project update has been saved',
                              });
                              setNewUpdate('');
                            }
                          }}
                          disabled={!newUpdate.trim()}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {language === 'it' ? 'Salva Aggiornamento' : 'Save Update'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Client Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5" />
                      <span>{language === 'it' ? 'Informazioni Cliente' : 'Client Information'}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="font-medium text-slate-800">{project.client.name}</div>
                      <div className="text-sm text-slate-600">{project.client.contact}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-700">{project.client.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-700">{project.client.phone}</span>
                      </div>
                      <div className="flex items-start space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-slate-500 mt-0.5" />
                        <span className="text-slate-700">{project.client.address}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Team Members */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>{language === 'it' ? 'Team Progetto' : 'Project Team'}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project.teamMembers.map((member: any, index: number) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-800">{member.name}</div>
                            <div className="text-sm text-slate-600">{member.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Budget Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Euro className="h-5 w-5" />
                      <span>{language === 'it' ? 'Budget Progetto' : 'Project Budget'}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">{language === 'it' ? 'Budget Totale:' : 'Total Budget:'}</span>
                        <span className="font-bold">{project.budget.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">{language === 'it' ? 'Speso:' : 'Spent:'}</span>
                        <span className="font-medium text-red-600">{project.budget.spent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">{language === 'it' ? 'Rimanente:' : 'Remaining:'}</span>
                        <span className="font-medium text-green-600">{project.budget.remaining}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-slate-800">{language === 'it' ? 'Dettaglio Budget:' : 'Budget Breakdown:'}</h4>
                      {project.budget.breakdown.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-slate-600">{item.item}</span>
                          <div className="text-right">
                            <div className="font-medium">{item.amount}</div>
                            <Badge variant="outline" className="text-xs">
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Next Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5" />
                      <span>{language === 'it' ? 'Prossime Azioni' : 'Next Actions'}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project.nextActions.map((action: any, index: number) => (
                        <div key={index} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <div className="font-medium text-slate-800 mb-1">{action.action}</div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600">{action.responsible}</span>
                            <span className="text-orange-600 font-medium">{action.deadline}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Client Modal */}
            <Dialog open={showContactClient} onOpenChange={setShowContactClient}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <Phone className="h-5 w-5" />
                    <span>{language === 'it' ? 'Contatta Cliente' : 'Contact Client'}</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-slate-800">{project.client.name}</h3>
                    <p className="text-slate-600">{project.client.contact}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => window.open(`tel:${project.client.phone}`)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      {project.client.phone}
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => window.open(`mailto:${project.client.email}`)}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      {project.client.email}
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full" onClick={() => setShowContactClient(false)}>
                      {language === 'it' ? 'Chiudi' : 'Close'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Edit Project Modal */}
            <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <Edit className="h-5 w-5" />
                    <span>{language === 'it' ? 'Modifica Progetto' : 'Edit Project'}</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        {language === 'it' ? 'Nome Progetto:' : 'Project Name:'}
                      </label>
                      <Input defaultValue={project.name} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        {language === 'it' ? 'Stato:' : 'Status:'}
                      </label>
                      <Input defaultValue={project.status} />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      {language === 'it' ? 'Descrizione:' : 'Description:'}
                    </label>
                    <Textarea defaultValue={project.description} rows={4} />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setShowEditModal(false)}>
                      {language === 'it' ? 'Annulla' : 'Cancel'}
                    </Button>
                    <Button 
                      onClick={() => {
                        toast({
                          title: language === 'it' ? 'Progetto Aggiornato' : 'Project Updated',
                          description: language === 'it' ? 'Le modifiche sono state salvate' : 'Changes have been saved',
                        });
                        setShowEditModal(false);
                      }}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Salva Modifiche' : 'Save Changes'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}