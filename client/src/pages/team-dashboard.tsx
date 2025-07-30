import { Navigation } from '@/components/navigation';
import { useLanguage } from '@/components/language-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Plus, 
  TrendingUp, 
  Calendar, 
  Award, 
  User,
  MessageSquare,
  CheckSquare,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  X,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  Camera,
  Upload,
  Image
} from 'lucide-react';

export default function TeamDashboard() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  // State management
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'messages' | 'todo'>('dashboard');
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [newTodoItem, setNewTodoItem] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  
  // Handler function to open project registration directly
  const handleNewProject = () => {
    // Instead of navigating to dashboard, let's use the register project modal directly
    // This avoids authentication issues
    const registerModal = document.querySelector('[data-register-project-modal]');
    if (registerModal) {
      // If register project modal exists, trigger it
      const event = new CustomEvent('openRegisterProject');
      document.dispatchEvent(event);
    } else {
      // Fallback: navigate to a dedicated project registration page
      setLocation('/register-project');
    }
    
    toast({
      title: language === 'it' ? 'Registrazione Progetto' : 'Project Registration',
      description: language === 'it' 
        ? 'Apertura modulo registrazione progetto...' 
        : 'Opening project registration form...',
    });
  };

  // Profile data
  const [profileData, setProfileData] = useState({
    name: 'Alessandro Rossi',
    email: 'alessandro.rossi@fagri.digital',
    phone: '+39 348 123 4567',
    department: 'CO₂ Certification Team',
    role: 'Senior Certification Specialist',
    location: 'Milano, Italia',
    joinDate: '2024-01-15',
    bio: 'Esperto in certificazione CO₂ con 8 anni di esperienza nel settore agricolo sostenibile.',
    skills: ['ISO 14064', 'Carbon Accounting', 'Renewable Energy', 'Project Management']
  });
  
  // Todo items
  const [todoItems, setTodoItems] = useState([
    {
      id: '1',
      task: 'Revisione documentazione Progetto Solare Toscana',
      priority: 'high' as const,
      completed: false,
      dueDate: '2024-08-02',
      project: 'Tuscany Solar Project'
    },
    {
      id: '2', 
      task: 'Chiamata con cliente Puglia Wind Farm',
      priority: 'medium' as const,
      completed: false,
      dueDate: '2024-08-01',
      project: 'Puglia Wind Farm'
    },
    {
      id: '3',
      task: 'Completare report mensile',
      priority: 'low' as const,
      completed: true,
      dueDate: '2024-07-30',
      project: 'Team Management'
    }
  ]);
  
  // Messages/conversations
  const [conversations, setConversations] = useState([
    {
      id: 'admin-001',
      sender: 'Admin Dashboard',
      senderType: 'admin' as const,
      lastMessage: 'Nuovo progetto assegnato per revisione urgente',
      timestamp: '2024-07-30T14:30:00',
      unread: true,
      messages: [
        {
          id: 'msg-1',
          sender: 'Admin Dashboard',
          message: 'Ciao Alessandro, ti è stato assegnato un nuovo progetto per revisione urgente.',
          timestamp: '2024-07-30T14:30:00',
          isFromMe: false
        },
        {
          id: 'msg-2',
          sender: 'Admin Dashboard', 
          message: 'Il progetto "Solar Panel Installation - Field B" richiede la tua immediate attenzione.',
          timestamp: '2024-07-30T14:31:00',
          isFromMe: false
        }
      ]
    },
    {
      id: 'cert-001',
      sender: 'Certification Authority',
      senderType: 'certification' as const,
      lastMessage: 'Certificato CO₂ pronto per download',
      timestamp: '2024-07-30T10:15:00',
      unread: false,
      messages: [
        {
          id: 'msg-3',
          sender: 'Certification Authority',
          message: 'Il certificato per il progetto Tuscany Solar è stato completato.',
          timestamp: '2024-07-30T10:15:00',
          isFromMe: false
        }
      ]
    },
    {
      id: 'client-001',
      sender: 'Marco Bianchi (Project Owner)',
      senderType: 'client' as const,
      lastMessage: 'Domanda sulla documentazione richiesta',
      timestamp: '2024-07-29T16:45:00',
      unread: true,
      messages: [
        {
          id: 'msg-4',
          sender: 'Marco Bianchi',
          message: 'Ciao Alessandro, ho una domanda sulla documentazione richiesta per il mio progetto eolico.',
          timestamp: '2024-07-29T16:45:00',
          isFromMe: false
        }
      ]
    }
  ]);

  // Sample project data with detailed information
  const activeProjects = [
    {
      id: 'proj-001',
      name: 'Tuscany Solar Project',
      type: 'Solar',
      status: 'In Certification',
      progress: 75,
      co2Reduction: '450t CO₂',
      client: 'Azienda Agricola Rossi',
      location: 'Siena, Tuscany',
      startDate: '2024-03-15',
      estimatedCompletion: '2024-08-30',
      description: 'Installazione di pannelli solari da 500kW su terreni agricoli con coltivazione agrivoltaica.',
      documents: ['Permessi comunali', 'Studio impatto ambientale', 'Contratto GSE'],
      nextActions: ['Ispezione finale tecnica', 'Certificazione ISO 14064-2', 'Rilascio crediti CO₂'],
      teamMembers: ['Alessandro Rossi', 'Maria Bianchi'],
      budget: '€850,000',
      currentPhase: 'Certificazione Finale'
    },
    {
      id: 'proj-002', 
      name: 'Puglia Wind Farm',
      type: 'Wind',
      status: 'Active',
      progress: 45,
      co2Reduction: '1,200t CO₂',
      client: 'Cooperativa Energia Verde Puglia',
      location: 'Foggia, Puglia',
      startDate: '2024-01-20',
      estimatedCompletion: '2024-12-15',
      description: 'Parco eolico da 15 turbine per generazione di energia rinnovabile e certificazione carbon credits.',
      documents: ['VIA Regionale', 'Autorizzazione Unica', 'Studio ornitologico'],
      nextActions: ['Montaggio turbine 8-15', 'Test prestazioni', 'Allacciamento rete'],
      teamMembers: ['Alessandro Rossi', 'Giuseppe Verdi', 'Lucia Romano'],
      budget: '€2,400,000',
      currentPhase: 'Installazione Hardware'
    },
    {
      id: 'proj-003',
      name: 'Lombardy Biomass',
      type: 'Biomass', 
      status: 'Planning',
      progress: 25,
      co2Reduction: '800t CO₂',
      client: 'Consorzio Agricolo Lombardo',
      location: 'Bergamo, Lombardia',
      startDate: '2024-06-01',
      estimatedCompletion: '2025-03-30',
      description: 'Impianto biogas da residui agricoli per produzione energia e certificazione sostenibilità.',
      documents: ['Studio fattibilità', 'Analisi substrati', 'Piano investimenti'],
      nextActions: ['Permesso edilizio', 'Fornitura digestore', 'Preparazione sito'],
      teamMembers: ['Alessandro Rossi', 'Marco Colombo'],
      budget: '€1,200,000',
      currentPhase: 'Autorizzazioni e Permessi'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Navigation />
      
      <div className="pt-28 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header with Navigation Tabs */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-light text-slate-800">
                    {language === 'it' ? 'Dashboard Team Member' : 'Team Member Dashboard'}
                  </h1>
                  <p className="text-slate-600 mt-2">
                    {language === 'it' 
                      ? 'Gestione progetti multipli e coordinamento team FAGRI'
                      : 'Multi-project management and FAGRI team coordination'
                    }
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => handleNewProject()}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {language === 'it' ? 'Nuovo Progetto' : 'New Project'}
                  </Button>
                </div>
              </div>
              
              {/* Navigation Tabs */}
              <div className="flex space-x-1 bg-white rounded-lg p-1 border border-slate-200">
                <Button
                  variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                  className={`flex items-center space-x-2 ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>{language === 'it' ? 'Dashboard' : 'Dashboard'}</span>
                </Button>
                <Button
                  variant={activeTab === 'profile' ? 'default' : 'ghost'}
                  className={`flex items-center space-x-2 ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <User className="h-4 w-4" />
                  <span>{language === 'it' ? 'Il Mio Profilo' : 'My Profile'}</span>
                </Button>
                <Button
                  variant={activeTab === 'messages' ? 'default' : 'ghost'}
                  className={`flex items-center space-x-2 ${activeTab === 'messages' ? 'bg-blue-600 text-white' : 'text-slate-600'} relative`}
                  onClick={() => setActiveTab('messages')}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>{language === 'it' ? 'Messaggi' : 'Messages'}</span>
                  {conversations.filter(c => c.unread).length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-red-500 text-white p-0 flex items-center justify-center">
                      {conversations.filter(c => c.unread).length}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant={activeTab === 'todo' ? 'default' : 'ghost'}
                  className={`flex items-center space-x-2 ${activeTab === 'todo' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
                  onClick={() => setActiveTab('todo')}
                >
                  <CheckSquare className="h-4 w-4" />
                  <span>{language === 'it' ? 'Todo Lista' : 'Todo List'}</span>
                  {todoItems.filter(item => !item.completed).length > 0 && (
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                      {todoItems.filter(item => !item.completed).length}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'dashboard' && (
              <>
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        {language === 'it' ? 'Progetti Team' : 'Team Projects'}
                      </p>
                      <p className="text-2xl font-bold text-blue-900">12</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-200 bg-emerald-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-800">
                        {language === 'it' ? 'Progetti Attivi' : 'Active Projects'}
                      </p>
                      <p className="text-2xl font-bold text-emerald-900">8</p>
                    </div>
                    <FileText className="h-8 w-8 text-emerald-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-800">
                        {language === 'it' ? 'CO₂ Certificata' : 'Certified CO₂'}
                      </p>
                      <p className="text-2xl font-bold text-purple-900">2,450t</p>
                    </div>
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-800">
                        {language === 'it' ? 'Crescita Mensile' : 'Monthly Growth'}
                      </p>
                      <p className="text-2xl font-bold text-orange-900">+18%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Team Projects */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Users className="h-5 w-5 mr-2 text-blue-600" />
                      {language === 'it' ? 'Progetti Team Attivi' : 'Active Team Projects'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activeProjects.map((project) => (
                        <div 
                          key={project.id}
                          className="p-4 border border-slate-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
                          onClick={() => {
                            // Navigate to dedicated project page
                            window.location.href = `/project/${project.id}`;
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                              {project.name}
                            </h3>
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              project.type === 'Solar' ? 'bg-blue-100 text-blue-800' :
                              project.type === 'Wind' ? 'bg-emerald-100 text-emerald-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {project.type}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-slate-600 mb-1">
                            <span>{project.status}</span>
                            <span className="font-medium">{project.co2Reduction}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                            <span>{project.client}</span>
                            <span>{project.currentPhase}</span>
                          </div>
                          <div className="mt-2 bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                project.type === 'Solar' ? 'bg-blue-600' :
                                project.type === 'Wind' ? 'bg-emerald-600' :
                                'bg-green-600'
                              }`}
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
                            <span>{project.progress}% Complete</span>
                            <span className="group-hover:text-blue-600 transition-colors">
                              {language === 'it' ? 'Clicca per dettagli' : 'Click for details'} →
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Team Analytics & Tools */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <BarChart3 className="h-5 w-5 mr-2 text-emerald-600" />
                      {language === 'it' ? 'Analisi Team' : 'Team Analytics'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">{language === 'it' ? 'Efficienza Team' : 'Team Efficiency'}</span>
                      <span className="font-semibold text-emerald-600">92%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">{language === 'it' ? 'Progetti Completati' : 'Completed Projects'}</span>
                      <span className="font-semibold text-blue-600">4</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">{language === 'it' ? 'Media CO₂/Progetto' : 'Avg CO₂/Project'}</span>
                      <span className="font-semibold text-purple-600">306t</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Calendar className="h-5 w-5 mr-2 text-orange-600" />
                      {language === 'it' ? 'Scadenze Team' : 'Team Deadlines'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm font-medium text-red-800">
                        {language === 'it' ? 'Scadenza Certificazione' : 'Certification Deadline'}
                      </p>
                      <p className="text-xs text-red-600">
                        {language === 'it' ? 'Progetto Toscana - 3 giorni' : 'Tuscany Project - 3 days'}
                      </p>
                    </div>
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm font-medium text-amber-800">
                        {language === 'it' ? 'Revisione Documenti' : 'Document Review'}
                      </p>
                      <p className="text-xs text-amber-600">
                        {language === 'it' ? 'Parco Eolico - 1 settimana' : 'Wind Farm - 1 week'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Settings className="h-5 w-5 mr-2 text-slate-600" />
                      {language === 'it' ? 'Strumenti Team' : 'Team Tools'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Report Progetti' : 'Project Reports'}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Gestione Team' : 'Team Management'}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Analisi Avanzate' : 'Advanced Analytics'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
              </>
            )}

            {/* Personal Profile Tab */}
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <User className="h-5 w-5" />
                          <span>{language === 'it' ? 'Il Mio Profilo' : 'My Profile'}</span>
                        </CardTitle>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setShowPhotoUpload(true)}
                          >
                            <Image className="h-4 w-4 mr-2" />
                            {language === 'it' ? 'Cambia Foto' : 'Change Photo'}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            disabled
                            className="opacity-50 cursor-not-allowed"
                            title={language === 'it' ? 'Solo amministratori possono modificare i dati del profilo' : 'Only administrators can edit profile data'}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            {language === 'it' ? 'Modifica Dati' : 'Edit Data'}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Basic Info */}
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                            {profilePhoto ? (
                              <img 
                                src={profilePhoto} 
                                alt="Profile" 
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <User className="h-10 w-10 text-blue-600" />
                            )}
                          </div>
                          <Button
                            size="sm"
                            className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full p-0 bg-blue-600 hover:bg-blue-700"
                            onClick={() => setShowPhotoUpload(true)}
                          >
                            <Camera className="h-3 w-3" />
                          </Button>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800">{profileData.name}</h3>
                          <p className="text-slate-600">{profileData.role}</p>
                          <p className="text-sm text-slate-500">{profileData.department}</p>
                          <Badge className="mt-1 bg-green-100 text-green-800 border-green-200">
                            {language === 'it' ? 'Team Member' : 'Team Member'}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Contact Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Mail className="h-4 w-4 text-slate-500" />
                            <span className="text-sm text-slate-700">{profileData.email}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Phone className="h-4 w-4 text-slate-500" />
                            <span className="text-sm text-slate-700">{profileData.phone}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <MapPin className="h-4 w-4 text-slate-500" />
                            <span className="text-sm text-slate-700">{profileData.location}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-4 w-4 text-slate-500" />
                            <span className="text-sm text-slate-700">
                              {language === 'it' ? 'Dal' : 'Since'} {new Date(profileData.joinDate).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bio */}
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-2">
                          {language === 'it' ? 'Biografia' : 'Biography'}
                        </h4>
                        <p className="text-sm text-slate-600">{profileData.bio}</p>
                      </div>
                      
                      {/* Skills */}
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-3">
                          {language === 'it' ? 'Competenze' : 'Skills'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {profileData.skills.map((skill, index) => (
                            <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Quick Stats */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        {language === 'it' ? 'Statistiche Veloci' : 'Quick Stats'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          {language === 'it' ? 'Progetti Assegnati' : 'Assigned Projects'}
                        </span>
                        <span className="font-semibold">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          {language === 'it' ? 'Completati Questo Mese' : 'Completed This Month'}
                        </span>
                        <span className="font-semibold text-green-600">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          {language === 'it' ? 'Efficienza Team' : 'Team Efficiency'}
                        </span>
                        <span className="font-semibold text-blue-600">92%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Conversations List */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5" />
                        <span>{language === 'it' ? 'Conversazioni' : 'Conversations'}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-1">
                        {conversations.map((conversation) => (
                          <div
                            key={conversation.id}
                            className={`p-4 cursor-pointer border-b hover:bg-slate-50 transition-colors ${
                              selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                            }`}
                            onClick={() => setSelectedConversation(conversation.id)}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center space-x-2">
                                <div className={`h-2 w-2 rounded-full ${
                                  conversation.senderType === 'admin' ? 'bg-red-500' :
                                  conversation.senderType === 'certification' ? 'bg-green-500' : 'bg-blue-500'
                                }`} />
                                <h4 className="text-sm font-medium text-slate-800">{conversation.sender}</h4>
                                {conversation.unread && (
                                  <div className="h-2 w-2 bg-red-500 rounded-full" />
                                )}
                              </div>
                              <span className="text-xs text-slate-500">
                                {new Date(conversation.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 truncate">{conversation.lastMessage}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Chat Area */}
                <div className="lg:col-span-2">
                  {selectedConversation ? (
                    <Card className="h-96 flex flex-col">
                      <CardHeader className="border-b">
                        <CardTitle className="text-lg">
                          {conversations.find(c => c.id === selectedConversation)?.sender}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-4">
                          {conversations.find(c => c.id === selectedConversation)?.messages.map((message) => (
                            <div key={message.id} className={`flex ${message.isFromMe ? 'justify-end' : 'justify-start'}`}>
                              <div className="flex flex-col max-w-xs lg:max-w-md">
                                {!message.isFromMe && (
                                  <div className="mb-1 ml-2">
                                    <span className="text-xs font-medium text-slate-600">
                                      {message.sender}
                                    </span>
                                  </div>
                                )}
                                <div className={`px-4 py-2 rounded-lg ${
                                  message.isFromMe 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-slate-100 text-slate-800'
                                }`}>
                                  <p className="text-sm">{message.message}</p>
                                  <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs opacity-70">
                                      {new Date(message.timestamp).toLocaleTimeString()}
                                    </span>
                                    {message.isFromMe && (
                                      <span className="text-xs opacity-70 ml-2">
                                        {language === 'it' ? 'Tu' : 'You'}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <div className="border-t p-4">
                        <div className="flex space-x-2">
                          <Input
                            placeholder={language === 'it' ? 'Scrivi un messaggio...' : 'Type a message...'}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                toast({
                                  title: language === 'it' ? 'Messaggio Inviato' : 'Message Sent',
                                  description: language === 'it' ? 'Il tuo messaggio è stato inviato' : 'Your message has been sent',
                                });
                                setNewMessage('');
                              }
                            }}
                          />
                          <Button 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: language === 'it' ? 'Messaggio Inviato' : 'Message Sent',
                                description: language === 'it' ? 'Il tuo messaggio è stato inviato' : 'Your message has been sent',
                              });
                              setNewMessage('');
                            }}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ) : (
                    <Card className="h-96 flex items-center justify-center">
                      <div className="text-center">
                        <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-600">
                          {language === 'it' 
                            ? 'Seleziona una conversazione per iniziare' 
                            : 'Select a conversation to start'
                          }
                        </p>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {/* Todo Tab */}
            {activeTab === 'todo' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Todo List */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <CheckSquare className="h-5 w-5" />
                          <span>{language === 'it' ? 'Le Mie Attività' : 'My Tasks'}</span>
                        </CardTitle>
                        <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                          {todoItems.filter(item => !item.completed).length} {language === 'it' ? 'da fare' : 'pending'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Add New Todo */}
                      <div className="mb-6">
                        <div className="flex space-x-2">
                          <Input
                            placeholder={language === 'it' ? 'Aggiungi nuova attività...' : 'Add new task...'}
                            value={newTodoItem}
                            onChange={(e) => setNewTodoItem(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && newTodoItem.trim()) {
                                const newItem = {
                                  id: Date.now().toString(),
                                  task: newTodoItem,
                                  priority: 'medium' as const,
                                  completed: false,
                                  dueDate: new Date().toISOString().split('T')[0],
                                  project: 'General'
                                };
                                setTodoItems([...todoItems, newItem]);
                                setNewTodoItem('');
                                toast({
                                  title: language === 'it' ? 'Attività Aggiunta' : 'Task Added',
                                  description: language === 'it' ? 'Nuova attività aggiunta alla lista' : 'New task added to your list',
                                });
                              }
                            }}
                          />
                          <Button
                            onClick={() => {
                              if (newTodoItem.trim()) {
                                const newItem = {
                                  id: Date.now().toString(),
                                  task: newTodoItem,
                                  priority: 'medium' as const,
                                  completed: false,
                                  dueDate: new Date().toISOString().split('T')[0],
                                  project: 'General'
                                };
                                setTodoItems([...todoItems, newItem]);
                                setNewTodoItem('');
                                toast({
                                  title: language === 'it' ? 'Attività Aggiunta' : 'Task Added',
                                  description: language === 'it' ? 'Nuova attività aggiunta alla lista' : 'New task added to your list',
                                });
                              }
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Todo Items */}
                      <div className="space-y-3">
                        {todoItems.map((item) => (
                          <div
                            key={item.id}
                            className={`p-4 border rounded-lg ${
                              item.completed ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={() => {
                                    setTodoItems(todoItems.map(todo => 
                                      todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
                                    ));
                                  }}
                                  className={`h-5 w-5 border-2 rounded ${
                                    item.completed 
                                      ? 'bg-green-600 border-green-600 text-white' 
                                      : 'border-slate-300 hover:border-slate-400'
                                  }`}
                                >
                                  {item.completed && <CheckCircle className="h-3 w-3" />}
                                </button>
                                <div>
                                  <p className={`${item.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                                    {item.task}
                                  </p>
                                  <div className="flex items-center space-x-4 mt-1">
                                    <span className="text-xs text-slate-500">{item.project}</span>
                                    <Badge 
                                      className={
                                        item.priority === 'high' ? 'bg-red-100 text-red-800 border-red-200' :
                                        item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                        'bg-green-100 text-green-800 border-green-200'
                                      }
                                    >
                                      {item.priority === 'high' && (language === 'it' ? 'Alta' : 'High')}
                                      {item.priority === 'medium' && (language === 'it' ? 'Media' : 'Medium')}
                                      {item.priority === 'low' && (language === 'it' ? 'Bassa' : 'Low')}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-slate-500">
                                  {new Date(item.dueDate).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US')}
                                </span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setTodoItems(todoItems.filter(todo => todo.id !== item.id));
                                    toast({
                                      title: language === 'it' ? 'Attività Eliminata' : 'Task Deleted',
                                      description: language === 'it' ? 'Attività rimossa dalla lista' : 'Task removed from your list',
                                    });
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Todo Summary */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        {language === 'it' ? 'Riassunto Attività' : 'Task Summary'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          {language === 'it' ? 'Totale Attività' : 'Total Tasks'}
                        </span>
                        <span className="font-semibold">{todoItems.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          {language === 'it' ? 'Completate' : 'Completed'}
                        </span>
                        <span className="font-semibold text-green-600">
                          {todoItems.filter(item => item.completed).length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          {language === 'it' ? 'In Sospeso' : 'Pending'}
                        </span>
                        <span className="font-semibold text-orange-600">
                          {todoItems.filter(item => !item.completed).length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          {language === 'it' ? 'Alta Priorità' : 'High Priority'}
                        </span>
                        <span className="font-semibold text-red-600">
                          {todoItems.filter(item => !item.completed && item.priority === 'high').length}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        {language === 'it' ? 'Scadenze Imminenti' : 'Upcoming Deadlines'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {todoItems
                          .filter(item => !item.completed)
                          .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                          .slice(0, 3)
                          .map((item) => (
                            <div key={item.id} className="flex items-center space-x-3">
                              <AlertTriangle className={`h-4 w-4 ${
                                item.priority === 'high' ? 'text-red-500' : 
                                item.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'
                              }`} />
                              <div className="flex-1">
                                <p className="text-sm text-slate-800 truncate">{item.task}</p>
                                <p className="text-xs text-slate-500">
                                  {new Date(item.dueDate).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US')}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Photo Upload Modal */}
            <Dialog open={showPhotoUpload} onOpenChange={setShowPhotoUpload}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <Camera className="h-5 w-5" />
                    <span>{language === 'it' ? 'Cambia Foto Profilo' : 'Change Profile Photo'}</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Current Photo Preview */}
                  <div className="flex justify-center">
                    <div className="h-32 w-32 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-slate-200">
                      {profilePhoto ? (
                        <img 
                          src={profilePhoto} 
                          alt="Profile Preview" 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-16 w-16 text-blue-600" />
                      )}
                    </div>
                  </div>
                  
                  {/* Upload Options */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      {language === 'it' ? 'Scegli nuova foto:' : 'Choose new photo:'}
                    </Label>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="flex flex-col items-center p-4 h-auto"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (e) => {
                                setProfilePhoto(e.target?.result as string);
                                toast({
                                  title: language === 'it' ? 'Foto Caricata' : 'Photo Uploaded',
                                  description: language === 'it' ? 'La tua foto profilo è stata aggiornata' : 'Your profile photo has been updated',
                                });
                                setShowPhotoUpload(false);
                              };
                              reader.readAsDataURL(file);
                            }
                          };
                          input.click();
                        }}
                      >
                        <Upload className="h-6 w-6 mb-2" />
                        <span className="text-xs">
                          {language === 'it' ? 'Carica File' : 'Upload File'}
                        </span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="flex flex-col items-center p-4 h-auto"
                        onClick={() => {
                          // Demo photos for testing
                          const demoPhotos = [
                            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
                            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
                            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'
                          ];
                          const randomPhoto = demoPhotos[Math.floor(Math.random() * demoPhotos.length)];
                          setProfilePhoto(randomPhoto);
                          toast({
                            title: language === 'it' ? 'Foto Demo Selezionata' : 'Demo Photo Selected',
                            description: language === 'it' ? 'Foto demo impostata come profilo' : 'Demo photo set as profile',
                          });
                          setShowPhotoUpload(false);
                        }}
                      >
                        <Image className="h-6 w-6 mb-2" />
                        <span className="text-xs">
                          {language === 'it' ? 'Foto Demo' : 'Demo Photo'}
                        </span>
                      </Button>
                    </div>
                    
                    {profilePhoto && (
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => {
                          setProfilePhoto(null);
                          toast({
                            title: language === 'it' ? 'Foto Rimossa' : 'Photo Removed',
                            description: language === 'it' ? 'Foto profilo rimossa' : 'Profile photo removed',
                          });
                          setShowPhotoUpload(false);
                        }}
                      >
                        <X className="h-4 w-4 mr-2" />
                        {language === 'it' ? 'Rimuovi Foto' : 'Remove Photo'}
                      </Button>
                    )}
                  </div>
                  
                  {/* Guidelines */}
                  <div className="text-xs text-slate-600 space-y-1">
                    <p>{language === 'it' ? 'Linee guida:' : 'Guidelines:'}</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>{language === 'it' ? 'Formato: JPG, PNG o GIF' : 'Format: JPG, PNG or GIF'}</li>
                      <li>{language === 'it' ? 'Dimensione massima: 5MB' : 'Max size: 5MB'}</li>
                      <li>{language === 'it' ? 'Foto professionale consigliata' : 'Professional photo recommended'}</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowPhotoUpload(false)}>
                      {language === 'it' ? 'Annulla' : 'Cancel'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Project Details Modal */}
            <Dialog open={showProjectDetails} onOpenChange={setShowProjectDetails}>
              <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>{selectedProject?.name}</span>
                  </DialogTitle>
                </DialogHeader>
                {selectedProject && (
                  <div className="space-y-6">
                    {/* Project Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {language === 'it' ? 'Informazioni Progetto' : 'Project Information'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-600">{language === 'it' ? 'Cliente:' : 'Client:'}</span>
                            <span className="font-medium">{selectedProject.client}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">{language === 'it' ? 'Tipo:' : 'Type:'}</span>
                            <Badge className={`${
                              selectedProject.type === 'Solar' ? 'bg-blue-100 text-blue-800' :
                              selectedProject.type === 'Wind' ? 'bg-emerald-100 text-emerald-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {selectedProject.type}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">{language === 'it' ? 'Stato:' : 'Status:'}</span>
                            <span className="font-medium">{selectedProject.status}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">{language === 'it' ? 'Località:' : 'Location:'}</span>
                            <span className="font-medium">{selectedProject.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">{language === 'it' ? 'Riduzione CO₂:' : 'CO₂ Reduction:'}</span>
                            <span className="font-medium text-green-600">{selectedProject.co2Reduction}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">{language === 'it' ? 'Budget:' : 'Budget:'}</span>
                            <span className="font-medium">{selectedProject.budget}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {language === 'it' ? 'Timeline Progetto' : 'Project Timeline'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-600">{language === 'it' ? 'Inizio:' : 'Start Date:'}</span>
                            <span className="font-medium">{selectedProject.startDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">{language === 'it' ? 'Completamento:' : 'Completion:'}</span>
                            <span className="font-medium">{selectedProject.estimatedCompletion}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">{language === 'it' ? 'Fase Attuale:' : 'Current Phase:'}</span>
                            <span className="font-medium">{selectedProject.currentPhase}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{language === 'it' ? 'Progresso:' : 'Progress:'}</span>
                              <span>{selectedProject.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  selectedProject.type === 'Solar' ? 'bg-blue-600' :
                                  selectedProject.type === 'Wind' ? 'bg-emerald-600' :
                                  'bg-green-600'
                                }`}
                                style={{ width: `${selectedProject.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Project Description */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {language === 'it' ? 'Descrizione Progetto' : 'Project Description'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-700">{selectedProject.description}</p>
                      </CardContent>
                    </Card>

                    {/* Team Members and Documents */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center space-x-2">
                            <Users className="h-5 w-5" />
                            <span>{language === 'it' ? 'Team Membri' : 'Team Members'}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {selectedProject.teamMembers.map((member: string, index: number) => (
                              <div key={index} className="flex items-center space-x-2">
                                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <User className="h-4 w-4 text-blue-600" />
                                </div>
                                <span className="text-slate-700">{member}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center space-x-2">
                            <FileText className="h-5 w-5" />
                            <span>{language === 'it' ? 'Documenti' : 'Documents'}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {selectedProject.documents.map((doc: string, index: number) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                <span className="text-slate-700">{doc}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Next Actions */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5" />
                          <span>{language === 'it' ? 'Prossime Azioni' : 'Next Actions'}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedProject.nextActions.map((action: string, index: number) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                              <div className="h-6 w-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                                <span className="text-xs font-medium text-orange-600">{index + 1}</span>
                              </div>
                              <span className="text-slate-700 flex-1">{action}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4 border-t">
                      <Button variant="outline" onClick={() => setShowProjectDetails(false)}>
                        {language === 'it' ? 'Chiudi' : 'Close'}
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Edit className="h-4 w-4 mr-2" />
                        {language === 'it' ? 'Modifica Progetto' : 'Edit Project'}
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}