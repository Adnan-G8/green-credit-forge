import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/components/language-provider';
import { 
  Calendar, 
  TrendingUp, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Euro,
  Leaf,
  Factory,
  Wind,
  TreePine,
  Tractor,
  Activity,
  Bell,
  Filter,
  Search,
  RefreshCw,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardProject {
  id: string;
  projectName: string;
  projectType: 'farming' | 'forest' | 'renewable-energy';
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'in-progress' | 'completed' | 'rejected';
  progressPercentage: number;
  currentPhase: 'application' | 'documentation' | 'verification' | 'certification' | 'issuance';
  estimatedCO2Reduction: string;
  projectValue: string;
  nextMilestone: string;
  milestoneDate: string;
  lastUpdated: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  complianceScore: number;
  documentsSubmitted: number;
  documentsRequired: number;
  country: string;
  city: string;
  certificationStatus: 'pending' | 'approved' | 'certified' | 'rejected';
  certificateNumber?: string;
  certificateIssueDate?: string;
  blockchainRecorded: boolean;
  blockchainTxHash?: string;
}

interface ProjectActivity {
  id: string;
  title: string;
  description: string;
  activityType: 'status_change' | 'document_upload' | 'communication' | 'milestone_update';
  timestamp: string;
  performedByName: string;
}

interface ProjectMilestone {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  dueDate: string;
  milestoneType: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface ProjectTrackingDashboardProps {
  userId?: string;
}

// Import ProjectDetailsModal
import { ProjectDetailsModal } from './project-details-modal';

export function ProjectTrackingDashboard({ userId }: ProjectTrackingDashboardProps) {
  const { t } = useLanguage();
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProjectForDetails, setSelectedProjectForDetails] = useState<DashboardProject | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch projects data
  const { data: projects = [], isLoading: projectsLoading, refetch: refetchProjects } = useQuery({
    queryKey: ['/api/projects', refreshKey],
    refetchInterval: 30000, // Refresh every 30 seconds for real-time updates
  });

  // Fetch project activities
  const { data: activities = [], isLoading: activitiesLoading } = useQuery({
    queryKey: ['/api/projects/activities', selectedProject, refreshKey],
    enabled: !!selectedProject,
    refetchInterval: 15000, // More frequent updates for activities
  });

  // Fetch project milestones
  const { data: milestones = [], isLoading: milestonesLoading } = useQuery({
    queryKey: ['/api/projects/milestones', selectedProject, refreshKey],
    enabled: !!selectedProject,
    refetchInterval: 30000,
  });

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    refetchProjects();
  };

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'farming': return <Tractor className="h-4 w-4" />;
      case 'forest': return <TreePine className="h-4 w-4" />;
      case 'renewable-energy': return <Wind className="h-4 w-4" />;
      default: return <Leaf className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'approved': return 'bg-blue-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'under-review': return 'bg-orange-500';
      case 'rejected': return 'bg-red-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const filteredProjects = projects.filter((project: DashboardProject) => {
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (projectsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="h-8 w-8 animate-spin text-emerald-600" />
        <span className="ml-2">{t('loading-projects')}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('project-tracking-dashboard')}</h1>
          <p className="text-gray-600">{t('project-dashboard-subtitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            {t('refresh')}
          </Button>
          <Badge variant="outline" className="flex items-center gap-1">
            <Activity className="h-3 w-3" />
            {t('real-time')}
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('total-projects')}</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
              <Factory className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('active-projects')}</p>
                <p className="text-2xl font-bold">
                  {projects.filter((p: DashboardProject) => ['in-progress', 'under-review'].includes(p.status)).length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('completed-projects')}</p>
                <p className="text-2xl font-bold">
                  {projects.filter((p: DashboardProject) => p.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('total-co2-reduction')}</p>
                <p className="text-2xl font-bold">
                  {projects.reduce((sum: number, p: DashboardProject) => 
                    sum + (parseFloat(p.estimatedCO2Reduction) || 0), 0
                  ).toFixed(1)}t
                </p>
              </div>
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t('projects-overview')}
                </CardTitle>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t('search-projects')}
                      className="pl-8 pr-3 py-2 border rounded-md text-sm w-full sm:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="all">{t('all-status')}</option>
                    <option value="draft">{t('draft')}</option>
                    <option value="submitted">{t('submitted')}</option>
                    <option value="under-review">{t('under-review')}</option>
                    <option value="approved">{t('approved')}</option>
                    <option value="in-progress">{t('in-progress')}</option>
                    <option value="completed">{t('completed')}</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {filteredProjects.map((project: DashboardProject) => (
                    <div
                      key={project.id}
                      className={cn(
                        "border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md",
                        selectedProject === project.id ? "ring-2 ring-emerald-500 bg-emerald-50" : "hover:bg-gray-50"
                      )}
                      onClick={() => setSelectedProject(project.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getProjectTypeIcon(project.projectType)}
                          <div>
                            <h3 className="font-semibold text-gray-900">{project.projectName}</h3>
                            <p className="text-sm text-gray-600">{project.city}, {project.country}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityColor(project.priority)}>
                            {t(project.priority)}
                          </Badge>
                          <div className={cn("w-3 h-3 rounded-full", getStatusColor(project.status))} />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProjectForDetails(project);
                              setShowProjectDetails(true);
                            }}
                            className="ml-2"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Dettagli
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{t('progress')}</span>
                          <span className="font-medium">{project.progressPercentage}%</span>
                        </div>
                        <Progress value={project.progressPercentage} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                        <div>
                          <span className="text-gray-600">{t('co2-reduction')}:</span>
                          <span className="ml-1 font-medium">{project.estimatedCO2Reduction}t</span>
                        </div>
                        <div>
                          <span className="text-gray-600">{t('value')}:</span>
                          <span className="ml-1 font-medium">€{project.projectValue}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 text-sm">
                        <span className="text-gray-600">{t('next-milestone')}: {project.nextMilestone}</span>
                        <span className="text-gray-500">{project.milestoneDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Project Details Panel */}
        <div className="space-y-6">
          {selectedProject ? (
            <>
              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    {t('project-details')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
                      <TabsTrigger value="milestones">{t('milestones')}</TabsTrigger>
                      <TabsTrigger value="activity">{t('activity')}</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-4">
                      {/* Selected project overview content */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{t('compliance-score')}</span>
                          <span className="font-medium">
                            {projects.find((p: DashboardProject) => p.id === selectedProject)?.complianceScore || 0}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{t('documents')}</span>
                          <span className="font-medium">
                            {projects.find((p: DashboardProject) => p.id === selectedProject)?.documentsSubmitted || 0}/
                            {projects.find((p: DashboardProject) => p.id === selectedProject)?.documentsRequired || 0}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{t('current-phase')}</span>
                          <Badge variant="outline">
                            {t(projects.find((p: DashboardProject) => p.id === selectedProject)?.currentPhase || 'application')}
                          </Badge>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="milestones" className="space-y-4">
                      <ScrollArea className="h-[300px]">
                        {milestonesLoading ? (
                          <div className="flex items-center justify-center py-8">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {milestones.map((milestone: ProjectMilestone) => (
                              <div key={milestone.id} className="border rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium text-sm">{milestone.title}</h4>
                                  <Badge 
                                    variant={milestone.status === 'completed' ? 'default' : 'outline'}
                                    className={cn(
                                      milestone.status === 'overdue' && 'border-red-500 text-red-700'
                                    )}
                                  >
                                    {t(milestone.status)}
                                  </Badge>
                                </div>
                                <div className="flex items-center text-xs text-gray-600">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {milestone.dueDate}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </ScrollArea>
                    </TabsContent>
                    
                    <TabsContent value="activity" className="space-y-4">
                      <ScrollArea className="h-[300px]">
                        {activitiesLoading ? (
                          <div className="flex items-center justify-center py-8">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {activities.map((activity: ProjectActivity) => (
                              <div key={activity.id} className="border-l-2 border-emerald-200 pl-3 pb-3">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-medium text-sm">{activity.title}</h4>
                                  <span className="text-xs text-gray-500">{activity.timestamp}</span>
                                </div>
                                <p className="text-xs text-gray-600 mb-1">{activity.description}</p>
                                <span className="text-xs text-gray-500">{activity.performedByName}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">{t('quick-actions')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      {t('view-documents')}
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      {t('set-notifications')}
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Euro className="h-4 w-4 mr-2" />
                      {t('view-financials')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">{t('select-project')}</h3>
                <p className="text-sm text-gray-600">{t('select-project-desc')}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Project Details Modal */}
      {selectedProjectForDetails && (
        <ProjectDetailsModal
          isOpen={showProjectDetails}
          onClose={() => {
            setShowProjectDetails(false);
            setSelectedProjectForDetails(null);
          }}
          project={selectedProjectForDetails}
        />
      )}
    </div>
  );
}