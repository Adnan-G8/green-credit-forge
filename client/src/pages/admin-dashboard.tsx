import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/components/language-provider';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Search, 
  Activity, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Shield, 
  Database, 
  BarChart3, 
  Settings, 
  ArrowLeft, 
  Home,
  Eye,
  UserPlus,
  AlertTriangle,
  Calendar,
  TrendingUp,
  FileText,
  Lock,
  Unlock,
  Download
} from 'lucide-react';

interface AuthorizationRequest {
  id: string;
  fagriId: string;
  accountType: string;
  authorizationType?: string;
  authorizationDescription?: string;
  requestReason?: string;
  assignedTeamMember?: string;
  assignedTeamMemberEmail?: string;
  projectsRequested?: string[];
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  fullName?: string;
  email?: string;
  company?: string;
  notes?: string;
}

interface UserActivity {
  id: string;
  fagriId: string;
  action: string;
  timestamp: string;
  details: string;
  ipAddress?: string;
}

interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  systemUptime: string;
  lastBackup: string;
}

export function AdminDashboard() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const [authorizationRequests, setAuthorizationRequests] = useState<AuthorizationRequest[]>([]);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<AuthorizationRequest | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'requests' | 'activities' | 'team' | 'applications' | 'certifications' | 'system'>('requests');
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load authorization requests
      const authResponse = await fetch('/api/admin/authorization-requests');
      if (authResponse.ok) {
        const authData = await authResponse.json();
        setAuthorizationRequests(authData.requests || []);
      }

      // Load user activities
      const activityResponse = await fetch('/api/admin/user-activities');
      if (activityResponse.ok) {
        const activityData = await activityResponse.json();
        setUserActivities(activityData.activities || []);
      }

      // Load system metrics
      const metricsResponse = await fetch('/api/admin/system-metrics');
      if (metricsResponse.ok) {
        const metricsData = await metricsResponse.json();
        setSystemMetrics(metricsData.metrics || null);
      }

      // Load team members
      const teamResponse = await fetch('/api/admin/team-members');
      if (teamResponse.ok) {
        const teamData = await teamResponse.json();
        setTeamMembers(teamData.members || []);
      }

      // Load applications
      const appsResponse = await fetch('/api/admin/applications');
      if (appsResponse.ok) {
        const appsData = await appsResponse.json();
        setApplications(appsData.applications || []);
      }

      // Load certifications
      const certsResponse = await fetch('/api/admin/certifications');
      if (certsResponse.ok) {
        const certsData = await certsResponse.json();
        setCertifications(certsData.certifications || []);
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: language === 'it' ? 'Errore' : 'Error',
        description: language === 'it' ? 'Errore nel caricamento dei dati' : 'Error loading dashboard data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (requestId: string, action: 'approve' | 'reject', notes?: string) => {
    try {
      const response = await fetch(`/api/admin/authorization-requests/${requestId}/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes }),
      });

      if (response.ok) {
        toast({
          title: language === 'it' ? 'Successo' : 'Success',
          description: language === 'it' 
            ? `Richiesta ${action === 'approve' ? 'approvata' : 'rifiutata'} con successo`
            : `Request ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
        });
        loadDashboardData(); // Refresh data
        setShowRequestModal(false);
        setSelectedRequest(null);
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      toast({
        title: language === 'it' ? 'Errore' : 'Error',
        description: language === 'it' ? 'Errore nell\'elaborazione della richiesta' : 'Error processing request',
        variant: 'destructive',
      });
    }
  };

  const filteredRequests = authorizationRequests.filter(request =>
    request.fagriId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredActivities = userActivities.filter(activity =>
    activity.fagriId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTeamMembers = teamMembers.filter(member =>
    member.fagriId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApplications = applications.filter(app =>
    app.fagriId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.projectType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCertifications = certifications.filter(cert =>
    cert.fagriId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.certificateNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">
            {language === 'it' ? 'Caricamento dashboard...' : 'Loading dashboard...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Navigation Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              onClick={() => setLocation('/')}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 text-slate-600 hover:text-white hover:bg-slate-600 border-slate-300 hover:border-slate-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{language === 'it' ? 'Indietro' : 'Back'}</span>
            </Button>
            <Button
              onClick={() => setLocation('/')}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 text-blue-600 hover:text-white hover:bg-blue-600 border-blue-300 hover:border-blue-600 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>{language === 'it' ? 'Home' : 'Home'}</span>
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-slate-800 mb-2">
                {language === 'it' ? 'Dashboard Amministrazione' : 'Administration Dashboard'}
              </h1>
              <p className="text-slate-600">
                {language === 'it' ? 'Controllo completo del sistema FAGRI Digital e gestione utenti globale' : 'Complete FAGRI Digital system control and global user management'}
              </p>
            </div>
            <Button
              onClick={loadDashboardData}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Activity className="h-4 w-4" />
              <span>{language === 'it' ? 'Aggiorna' : 'Refresh'}</span>
            </Button>
          </div>
        </div>

        {/* System Metrics Cards */}
        {systemMetrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      {language === 'it' ? 'Utenti Totali' : 'Total Users'}
                    </p>
                    <p className="text-2xl font-semibold text-slate-800">{systemMetrics.totalUsers.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      {language === 'it' ? 'Richieste Approvate' : 'Approved Requests'}
                    </p>
                    <p className="text-2xl font-semibold text-slate-800">{systemMetrics.approvedRequests}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      {language === 'it' ? 'Richieste Pendenti' : 'Pending Requests'}
                    </p>
                    <p className="text-2xl font-semibold text-slate-800">{systemMetrics.pendingRequests}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      {language === 'it' ? 'Utenti Attivi' : 'Active Users'}
                    </p>
                    <p className="text-2xl font-semibold text-slate-800">{systemMetrics.activeUsers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder={language === 'it' ? 'Cerca utenti, richieste, attività...' : 'Search users, requests, activities...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={activeTab === 'requests' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('requests')}
                  size="sm"
                >
                  {language === 'it' ? 'Richieste' : 'Requests'}
                </Button>
                <Button
                  variant={activeTab === 'activities' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('activities')}
                  size="sm"
                >
                  {language === 'it' ? 'Attività' : 'Activities'}
                </Button>
                <Button
                  variant={activeTab === 'team' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('team')}
                  size="sm"
                >
                  {language === 'it' ? 'Team' : 'Team'}
                </Button>
                <Button
                  variant={activeTab === 'applications' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('applications')}
                  size="sm"
                >
                  {language === 'it' ? 'Applicazioni' : 'Applications'}
                </Button>
                <Button
                  variant={activeTab === 'certifications' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('certifications')}
                  size="sm"
                >
                  {language === 'it' ? 'Certificazioni' : 'Certifications'}
                </Button>
                <Button
                  variant={activeTab === 'system' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('system')}
                  size="sm"
                >
                  {language === 'it' ? 'Sistema' : 'System'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'requests' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserPlus className="h-5 w-5" />
                    <span>{language === 'it' ? 'Richieste di Autorizzazione' : 'Authorization Requests'}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredRequests.length === 0 ? (
                    <div className="text-center py-8">
                      <UserCheck className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600">
                        {language === 'it' ? 'Nessuna richiesta di autorizzazione trovata' : 'No authorization requests found'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredRequests.map((request) => (
                        <div key={request.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-3">
                                <h3 className="font-medium text-slate-800">{request.fullName || request.fagriId}</h3>
                                <Badge
                                  className={
                                    request.status === 'approved' ? 'bg-green-100 text-green-800 border-green-200' :
                                    request.status === 'rejected' ? 'bg-red-100 text-red-800 border-red-200' : 
                                    'bg-orange-100 text-orange-800 border-orange-200'
                                  }
                                >
                                  {request.status === 'pending' && (language === 'it' ? 'In Attesa' : 'Pending')}
                                  {request.status === 'approved' && (language === 'it' ? 'Approvato' : 'Approved')}
                                  {request.status === 'rejected' && (language === 'it' ? 'Rifiutato' : 'Rejected')}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600">ALPHAG8 ID: {request.fagriId}</p>
                              <p className="text-sm text-slate-600">{language === 'it' ? 'Typ' : 'Type'}: {request.accountType}</p>
                              {request.authorizationType && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                                  <p className="text-sm font-medium text-blue-800 mb-1">
                                    {language === 'it' ? 'Berechtigung' : 'Authorization'}: {request.authorizationType}
                                  </p>
                                  {request.authorizationDescription && (
                                    <p className="text-xs text-blue-700 mb-2">{request.authorizationDescription}</p>
                                  )}
                                  {request.assignedTeamMember && (
                                    <div className="bg-green-50 border border-green-200 rounded p-2 mb-2">
                                      <p className="text-xs font-medium text-green-800">
                                        {language === 'it' ? 'Zugewiesenes Team-Mitglied' : 'Assigned Team Member'}: {request.assignedTeamMember}
                                      </p>
                                      <p className="text-xs text-green-700">{request.assignedTeamMemberEmail}</p>
                                    </div>
                                  )}
                                  {request.projectsRequested && request.projectsRequested.length > 0 && (
                                    <div className="bg-orange-50 border border-orange-200 rounded p-2 mb-2">
                                      <p className="text-xs font-medium text-orange-800 mb-1">
                                        {language === 'it' ? 'Angeforderte Projekte' : 'Requested Projects'}:
                                      </p>
                                      <ul className="text-xs text-orange-700 space-y-1">
                                        {request.projectsRequested.map((project, index) => (
                                          <li key={index}>• {project}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {request.requestReason && (
                                    <p className="text-xs text-blue-600">
                                      <strong>{language === 'it' ? 'Grund' : 'Reason'}:</strong> {request.requestReason}
                                    </p>
                                  )}
                                </div>
                              )}
                              {request.email && (
                                <p className="text-sm text-slate-600">Email: {request.email}</p>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedRequest(request);
                                  setShowRequestModal(true);
                                }}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                {language === 'it' ? 'Dettagli' : 'Details'}
                              </Button>
                              {request.status === 'pending' && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleRequestAction(request.id, 'approve')}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    {language === 'it' ? 'Approva' : 'Approve'}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleRequestAction(request.id, 'reject')}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    {language === 'it' ? 'Rifiuta' : 'Reject'}
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'activities' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>{language === 'it' ? 'Attività Utenti' : 'User Activities'}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredActivities.length === 0 ? (
                    <div className="text-center py-8">
                      <Activity className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600">
                        {language === 'it' ? 'Nessuna attività trovata' : 'No activities found'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredActivities.map((activity) => (
                        <div key={activity.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h3 className="font-medium text-slate-800">{activity.action}</h3>
                              <p className="text-sm text-slate-600">ALPHAG8 ID: {activity.fagriId}</p>
                              <p className="text-sm text-slate-600">{activity.details}</p>
                              {activity.ipAddress && (
                                <p className="text-xs text-slate-500">IP: {activity.ipAddress}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-slate-600">
                                {new Date(activity.timestamp).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US')}
                              </p>
                              <p className="text-xs text-slate-500">
                                {new Date(activity.timestamp).toLocaleTimeString(language === 'it' ? 'it-IT' : 'en-US')}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'team' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>{language === 'it' ? 'Gestione Team' : 'Team Management'}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredTeamMembers.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600">
                        {language === 'it' ? 'Nessun membro del team trovato' : 'No team members found'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredTeamMembers.map((member) => (
                        <div key={member.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-3">
                                <h3 className="font-medium text-slate-800">{member.fullName}</h3>
                                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                  {member.role}
                                </Badge>
                                <Badge
                                  className={
                                    member.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' :
                                    member.status === 'inactive' ? 'bg-gray-100 text-gray-800 border-gray-200' : 
                                    'bg-orange-100 text-orange-800 border-orange-200'
                                  }
                                >
                                  {member.status === 'active' && (language === 'it' ? 'Attivo' : 'Active')}
                                  {member.status === 'inactive' && (language === 'it' ? 'Inattivo' : 'Inactive')}
                                  {member.status === 'suspended' && (language === 'it' ? 'Sospeso' : 'Suspended')}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600">ALPHAG8 ID: {member.fagriId}</p>
                              <p className="text-sm text-slate-600">Email: {member.email}</p>
                              <p className="text-sm text-slate-600">{language === 'it' ? 'Ultimo accesso' : 'Last login'}: {new Date(member.lastLogin).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US')}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => window.open(`/employee-profile?id=${member.id}`, '_blank')}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                {language === 'it' ? 'Dettagli' : 'Details'}
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => window.open(`/employee-profile?id=${member.id}`, '_blank')}
                              >
                                <Settings className="h-4 w-4 mr-1" />
                                {language === 'it' ? 'Gestisci' : 'Manage'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'applications' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>{language === 'it' ? 'Gestione Applicazioni' : 'Application Management'}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredApplications.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600">
                        {language === 'it' ? 'Nessuna applicazione trovata' : 'No applications found'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredApplications.map((app) => (
                        <div key={app.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-3">
                                <h3 className="font-medium text-slate-800">{app.projectName}</h3>
                                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                                  {app.projectType}
                                </Badge>
                                <Badge
                                  className={
                                    app.status === 'approved' ? 'bg-green-100 text-green-800 border-green-200' :
                                    app.status === 'rejected' ? 'bg-red-100 text-red-800 border-red-200' : 
                                    'bg-orange-100 text-orange-800 border-orange-200'
                                  }
                                >
                                  {app.status === 'pending' && (language === 'it' ? 'In Attesa' : 'Pending')}
                                  {app.status === 'approved' && (language === 'it' ? 'Approvato' : 'Approved')}
                                  {app.status === 'rejected' && (language === 'it' ? 'Rifiutato' : 'Rejected')}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600">ALPHAG8 ID: {app.fagriId}</p>
                              <p className="text-sm text-slate-600">{language === 'it' ? 'Sottomesso' : 'Submitted'}: {new Date(app.submittedAt).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US')}</p>
                              <p className="text-sm text-slate-600">CO₂ {language === 'it' ? 'Stimato' : 'Estimated'}: {app.estimatedCO2}t</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                {language === 'it' ? 'Dettagli' : 'Details'}
                              </Button>
                              {app.status === 'pending' && (
                                <>
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    {language === 'it' ? 'Approva' : 'Approve'}
                                  </Button>
                                  <Button size="sm" variant="destructive">
                                    <XCircle className="h-4 w-4 mr-1" />
                                    {language === 'it' ? 'Rifiuta' : 'Reject'}
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'certifications' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>{language === 'it' ? 'Gestione Certificazioni' : 'Certification Management'}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredCertifications.length === 0 ? (
                    <div className="text-center py-8">
                      <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600">
                        {language === 'it' ? 'Nessuna certificazione trovata' : 'No certifications found'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredCertifications.map((cert) => (
                        <div key={cert.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-3">
                                <h3 className="font-medium text-slate-800">{cert.projectName}</h3>
                                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                                  {cert.certificateNumber}
                                </Badge>
                                <Badge
                                  className={
                                    cert.status === 'valid' ? 'bg-green-100 text-green-800 border-green-200' :
                                    cert.status === 'expired' ? 'bg-red-100 text-red-800 border-red-200' : 
                                    'bg-orange-100 text-orange-800 border-orange-200'
                                  }
                                >
                                  {cert.status === 'valid' && (language === 'it' ? 'Valido' : 'Valid')}
                                  {cert.status === 'expired' && (language === 'it' ? 'Scaduto' : 'Expired')}
                                  {cert.status === 'pending' && (language === 'it' ? 'In Elaborazione' : 'Processing')}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600">ALPHAG8 ID: {cert.fagriId}</p>
                              <p className="text-sm text-slate-600">{language === 'it' ? 'Emesso' : 'Issued'}: {new Date(cert.issuedAt).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US')}</p>
                              <p className="text-sm text-slate-600">{language === 'it' ? 'Scadenza' : 'Expires'}: {new Date(cert.expiresAt).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US')}</p>
                              <p className="text-sm text-slate-600">CO₂ {language === 'it' ? 'Certificato' : 'Certified'}: {cert.certifiedCO2}t</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                {language === 'it' ? 'Dettagli' : 'Details'}
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 mr-1" />
                                {language === 'it' ? 'Scarica' : 'Download'}
                              </Button>
                              {cert.status === 'valid' && (
                                <Button size="sm" variant="outline">
                                  <Lock className="h-4 w-4 mr-1" />
                                  {language === 'it' ? 'Revoca' : 'Revoke'}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - System Controls */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>{language === 'it' ? 'Controlli Admin' : 'Admin Tools'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => setActiveTab('team')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  {language === 'it' ? 'Team Management' : 'Team Management'}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => setActiveTab('applications')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {language === 'it' ? 'Application Management' : 'Application Management'}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => setActiveTab('certifications')}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  {language === 'it' ? 'Certification Management' : 'Certification Management'}
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Database className="h-4 w-4 mr-2" />
                  {language === 'it' ? 'Database Admin' : 'Database Admin'}
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  {language === 'it' ? 'System Reports' : 'System Reports'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>{language === 'it' ? 'Avvisi Sistema' : 'System Alerts'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-yellow-600" />
                    <p className="text-sm font-medium text-yellow-800">
                      {language === 'it' ? 'Backup Programmato' : 'Scheduled Backup'}
                    </p>
                  </div>
                  <p className="text-xs text-yellow-700 mt-1">
                    {language === 'it' ? 'Backup database in 2 ore' : 'Database backup in 2 hours'}
                  </p>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <p className="text-sm font-medium text-blue-800">
                      {language === 'it' ? 'Aggiornamento Sicurezza' : 'Security Update'}
                    </p>
                  </div>
                  <p className="text-xs text-blue-700 mt-1">
                    {language === 'it' ? 'Patch disponibile' : 'Patch available'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Request Details Modal */}
        <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {language === 'it' ? 'Dettagli Richiesta Autorizzazione' : 'Authorization Request Details'}
              </DialogTitle>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">ALPHAG8 ID</label>
                    <p className="font-mono text-sm bg-slate-100 p-2 rounded">{selectedRequest.fagriId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      {language === 'it' ? 'Stato' : 'Status'}
                    </label>
                    <div className="mt-1">
                      <Badge
                        className={
                          selectedRequest.status === 'approved' ? 'bg-green-100 text-green-800 border-green-200' :
                          selectedRequest.status === 'rejected' ? 'bg-red-100 text-red-800 border-red-200' : 
                          'bg-orange-100 text-orange-800 border-orange-200'
                        }
                      >
                        {selectedRequest.status === 'pending' && (language === 'it' ? 'In Attesa' : 'Pending')}
                        {selectedRequest.status === 'approved' && (language === 'it' ? 'Approvato' : 'Approved')}
                        {selectedRequest.status === 'rejected' && (language === 'it' ? 'Rifiutato' : 'Rejected')}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {selectedRequest.fullName && (
                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      {language === 'it' ? 'Nome Completo' : 'Full Name'}
                    </label>
                    <p className="text-sm bg-slate-100 p-2 rounded">{selectedRequest.fullName}</p>
                  </div>
                )}
                
                {selectedRequest.email && (
                  <div>
                    <label className="text-sm font-medium text-slate-600">Email</label>
                    <p className="text-sm bg-slate-100 p-2 rounded">{selectedRequest.email}</p>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    {language === 'it' ? 'Tipo Account' : 'Account Type'}
                  </label>
                  <p className="text-sm bg-slate-100 p-2 rounded">{selectedRequest.accountType}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    {language === 'it' ? 'Data Richiesta' : 'Request Date'}
                  </label>
                  <p className="text-sm bg-slate-100 p-2 rounded">
                    {new Date(selectedRequest.requestedAt).toLocaleString(language === 'it' ? 'it-IT' : 'en-US')}
                  </p>
                </div>
                
                {selectedRequest.notes && (
                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      {language === 'it' ? 'Note' : 'Notes'}
                    </label>
                    <p className="text-sm bg-slate-100 p-2 rounded">{selectedRequest.notes}</p>
                  </div>
                )}
                
                {selectedRequest.status === 'pending' && (
                  <div className="flex space-x-3 pt-4">
                    <Button
                      onClick={() => handleRequestAction(selectedRequest.id, 'approve')}
                      className="bg-green-600 hover:bg-green-700 text-white flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Approva Richiesta' : 'Approve Request'}
                    </Button>
                    <Button
                      onClick={() => handleRequestAction(selectedRequest.id, 'reject')}
                      variant="destructive"
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Rifiuta Richiesta' : 'Reject Request'}
                    </Button>
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