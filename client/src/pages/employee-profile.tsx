import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/components/language-provider';
import { ArrowLeft, MessageCircle, Send, FileText, AlertTriangle, CheckCircle, XCircle, Clock, Eye, Download } from 'lucide-react';
import { useLocation } from 'wouter';

interface EmployeeProfile {
  id: string;
  fagriId: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  avatar: string;
  department: string;
  joinDate: string;
  lastLogin: string;
  totalProjects: number;
  approvedProjects: number;
  pendingProjects: number;
  rejectedProjects: number;
}

interface Project {
  id: string;
  projectName: string;
  projectType: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  submittedAt: string;
  estimatedCO2: number;
  certificationNotes?: string;
  qualityIssues?: string[];
  certificationStatus: 'none' | 'pending' | 'issued' | 'rejected';
  certificateNumber?: string;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  isAdmin: boolean;
}

export function EmployeeProfile({ employeeId }: { employeeId: string }) {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [employee, setEmployee] = useState<EmployeeProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployeeData();
  }, [employeeId]);

  const loadEmployeeData = async () => {
    try {
      // Load employee profile
      const profileResponse = await fetch(`/api/admin/employee/${employeeId}`);
      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setEmployee(profileData.employee);
      }

      // Load employee projects
      const projectsResponse = await fetch(`/api/admin/employee/${employeeId}/projects`);
      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json();
        setProjects(projectsData.projects || []);
      }

      // Load chat messages
      const chatResponse = await fetch(`/api/admin/employee/${employeeId}/chat`);
      if (chatResponse.ok) {
        const chatData = await chatResponse.json();
        setChatMessages(chatData.messages || []);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading employee data:', error);
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(`/api/admin/employee/${employeeId}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: newMessage,
          senderId: 'admin',
          senderName: 'Administrator'
        })
      });

      if (response.ok) {
        const newMsg: ChatMessage = {
          id: `msg-${Date.now()}`,
          senderId: 'admin',
          senderName: 'Administrator',
          message: newMessage,
          timestamp: new Date().toISOString(),
          isAdmin: true
        };
        setChatMessages([...chatMessages, newMsg]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const viewProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">{language === 'it' ? 'Caricamento...' : 'Loading...'}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-slate-600">{language === 'it' ? 'Dipendente non trovato' : 'Employee not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setLocation('/admin-dashboard')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{language === 'it' ? 'Torna al Dashboard' : 'Back to Dashboard'}</span>
            </Button>
            <h1 className="text-2xl font-bold text-slate-800">
              {language === 'it' ? 'Profilo Dipendente' : 'Employee Profile'}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={employee.avatar} alt={employee.fullName} />
                  <AvatarFallback className="text-lg font-semibold bg-emerald-100 text-emerald-800">
                    {employee.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{employee.fullName}</CardTitle>
                <div className="flex justify-center space-x-2">
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    {employee.role}
                  </Badge>
                  <Badge
                    className={
                      employee.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' :
                      employee.status === 'inactive' ? 'bg-gray-100 text-gray-800 border-gray-200' : 
                      'bg-orange-100 text-orange-800 border-orange-200'
                    }
                  >
                    {employee.status === 'active' && (language === 'it' ? 'Attivo' : 'Active')}
                    {employee.status === 'inactive' && (language === 'it' ? 'Inattivo' : 'Inactive')}
                    {employee.status === 'suspended' && (language === 'it' ? 'Sospeso' : 'Suspended')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">ALPHAG8 ID</label>
                  <p className="font-mono text-sm bg-slate-100 p-2 rounded">{employee.fagriId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Email</label>
                  <p className="text-sm">{employee.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">{language === 'it' ? 'Telefono' : 'Phone'}</label>
                  <p className="text-sm">{employee.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">{language === 'it' ? 'Dipartimento' : 'Department'}</label>
                  <p className="text-sm">{employee.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">{language === 'it' ? 'Data Assunzione' : 'Join Date'}</label>
                  <p className="text-sm">{new Date(employee.joinDate).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">{language === 'it' ? 'Ultimo Accesso' : 'Last Login'}</label>
                  <p className="text-sm">{new Date(employee.lastLogin).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US')}</p>
                </div>
              </CardContent>
            </Card>

            {/* Project Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>{language === 'it' ? 'Statistiche Progetti' : 'Project Statistics'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">{language === 'it' ? 'Totale Progetti' : 'Total Projects'}</span>
                  <Badge variant="outline">{employee.totalProjects}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">{language === 'it' ? 'Approvati' : 'Approved'}</span>
                  <Badge className="bg-green-100 text-green-800 border-green-200">{employee.approvedProjects}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">{language === 'it' ? 'In Attesa' : 'Pending'}</span>
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200">{employee.pendingProjects}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">{language === 'it' ? 'Rifiutati' : 'Rejected'}</span>
                  <Badge className="bg-red-100 text-red-800 border-red-200">{employee.rejectedProjects}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Communication */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>{language === 'it' ? 'Comunicazione' : 'Communication'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => setShowChat(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {language === 'it' ? 'Avvia Chat' : 'Start Chat'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Projects */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>{language === 'it' ? 'Progetti del Dipendente' : 'Employee Projects'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {projects.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">
                      {language === 'it' ? 'Nessun progetto trovato' : 'No projects found'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-medium text-slate-800">{project.projectName}</h3>
                              <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                                {project.projectType}
                              </Badge>
                              <Badge
                                className={
                                  project.status === 'approved' ? 'bg-green-100 text-green-800 border-green-200' :
                                  project.status === 'rejected' ? 'bg-red-100 text-red-800 border-red-200' : 
                                  project.status === 'under_review' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                                  'bg-orange-100 text-orange-800 border-orange-200'
                                }
                              >
                                {project.status === 'pending' && (language === 'it' ? 'In Attesa' : 'Pending')}
                                {project.status === 'approved' && (language === 'it' ? 'Approvato' : 'Approved')}
                                {project.status === 'rejected' && (language === 'it' ? 'Rifiutato' : 'Rejected')}
                                {project.status === 'under_review' && (language === 'it' ? 'In Revisione' : 'Under Review')}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600">
                              {language === 'it' ? 'Sottomesso' : 'Submitted'}: {new Date(project.submittedAt).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US')}
                            </p>
                            <p className="text-sm text-slate-600">CO₂ {language === 'it' ? 'Stimato' : 'Estimated'}: {project.estimatedCO2}t</p>
                            {project.qualityIssues && project.qualityIssues.length > 0 && (
                              <div className="flex items-center space-x-2">
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                                <span className="text-sm text-red-600">
                                  {project.qualityIssues.length} {language === 'it' ? 'problemi di qualità' : 'quality issues'}
                                </span>
                              </div>
                            )}
                            {project.certificateNumber && (
                              <p className="text-sm text-emerald-600 font-medium">
                                {language === 'it' ? 'Certificato' : 'Certificate'}: {project.certificateNumber}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => viewProjectDetails(project)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              {language === 'it' ? 'Dettagli' : 'Details'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chat Modal */}
        <Dialog open={showChat} onOpenChange={setShowChat}>
          <DialogContent className="max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>{language === 'it' ? 'Chat con' : 'Chat with'} {employee.fullName}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col h-96">
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 rounded-lg">
                {chatMessages.length === 0 ? (
                  <p className="text-center text-slate-500 py-8">
                    {language === 'it' ? 'Nessun messaggio ancora' : 'No messages yet'}
                  </p>
                ) : (
                  chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isAdmin ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          msg.isAdmin
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white text-slate-800 border'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${msg.isAdmin ? 'text-emerald-100' : 'text-slate-500'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString(language === 'it' ? 'it-IT' : 'en-US')}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex items-center space-x-2 pt-4">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={language === 'it' ? 'Scrivi un messaggio...' : 'Type a message...'}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Project Details Modal */}
        <Dialog open={showProjectModal} onOpenChange={setShowProjectModal}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>{language === 'it' ? 'Dettagli Progetto' : 'Project Details'}</span>
              </DialogTitle>
            </DialogHeader>
            {selectedProject && (
              <div className="space-y-6">
                {/* Project Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">{language === 'it' ? 'Nome Progetto' : 'Project Name'}</label>
                    <p className="font-medium">{selectedProject.projectName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">{language === 'it' ? 'Tipo' : 'Type'}</label>
                    <p>{selectedProject.projectType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">{language === 'it' ? 'Stato' : 'Status'}</label>
                    <Badge
                      className={
                        selectedProject.status === 'approved' ? 'bg-green-100 text-green-800 border-green-200' :
                        selectedProject.status === 'rejected' ? 'bg-red-100 text-red-800 border-red-200' : 
                        'bg-orange-100 text-orange-800 border-orange-200'
                      }
                    >
                      {selectedProject.status === 'pending' && (language === 'it' ? 'In Attesa' : 'Pending')}
                      {selectedProject.status === 'approved' && (language === 'it' ? 'Approvato' : 'Approved')}
                      {selectedProject.status === 'rejected' && (language === 'it' ? 'Rifiutato' : 'Rejected')}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">CO₂ {language === 'it' ? 'Stimato' : 'Estimated'}</label>
                    <p>{selectedProject.estimatedCO2}t</p>
                  </div>
                </div>

                {/* Certification Notes */}
                {selectedProject.certificationNotes && (
                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-2 block">
                      {language === 'it' ? 'Note di Certificazione' : 'Certification Notes'}
                    </label>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">{selectedProject.certificationNotes}</p>
                    </div>
                  </div>
                )}

                {/* Quality Issues */}
                {selectedProject.qualityIssues && selectedProject.qualityIssues.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-2 block flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span>{language === 'it' ? 'Problemi di Qualità' : 'Quality Issues'}</span>
                    </label>
                    <div className="space-y-2">
                      {selectedProject.qualityIssues.map((issue, index) => (
                        <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <p className="text-sm text-red-800">{issue}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certificate Info */}
                {selectedProject.certificateNumber && (
                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-2 block">
                      {language === 'it' ? 'Informazioni Certificato' : 'Certificate Information'}
                    </label>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <p className="text-sm text-emerald-800 font-medium">
                        {language === 'it' ? 'Numero Certificato' : 'Certificate Number'}: {selectedProject.certificateNumber}
                      </p>
                      <Button size="sm" variant="outline" className="mt-2">
                        <Download className="h-4 w-4 mr-1" />
                        {language === 'it' ? 'Scarica Certificato' : 'Download Certificate'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}