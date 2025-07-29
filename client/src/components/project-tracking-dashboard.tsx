import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from './language-provider';
import { cn } from '@/lib/utils';
import {
  Factory,
  TrendingUp,
  CheckCircle,
  Leaf,
  FileText,
  Search,
  Eye,
  RefreshCw,
  Activity,
  Tractor,
  TreePine,
  Wind
} from 'lucide-react';

// Types
interface DashboardProject {
  id: string;
  projectName: string;
  projectType: string;
  status: string;
  progressPercentage: number;
  currentPhase: string;
  estimatedCO2Reduction: string;
  projectValue: string;
  nextMilestone: string;
  milestoneDate: string;
  lastUpdated: string;
  priority: string;
  complianceScore: number;
  documentsSubmitted: number;
  documentsRequired: number;
  country: string;
  city: string;
  certificationStatus: string;
  certificateNumber?: string;
  certificateIssueDate?: string;
  blockchainRecorded: boolean;
  blockchainTxHash?: string;
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
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  // Load projects from localStorage for design demonstration
  const [projects, setProjects] = useState<DashboardProject[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);

  useEffect(() => {
    // Load projects from localStorage
    try {
      const storedProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
      const mappedProjects = storedProjects.map((project: any) => ({
        ...project, // Keep all original project data
        id: project.id,
        projectName: project.projectName,
        projectType: project.projectType,
        status: project.status || 'draft',
        progressPercentage: project.status === 'approved' ? 90 : project.status === 'in-progress' ? 60 : 30,
        currentPhase: project.certificationStatus === 'approved' ? 'certification' : 'documentation',
        estimatedCO2Reduction: project.expectedCO2Reduction || '0',
        projectValue: project.projectType === 'renewable-energy' ? '€ 45,000' : '€ 25,000',
        nextMilestone: project.status === 'approved' ? 'Certificazione Finale' : 'Verifica Documenti',
        milestoneDate: '2025-08-15',
        lastUpdated: project.createdAt?.split('T')[0] || '2025-07-29',
        priority: project.status === 'approved' ? 'high' : 'medium',
        complianceScore: project.status === 'approved' ? 92 : 76,
        documentsSubmitted: project.status === 'approved' ? 8 : 4,
        documentsRequired: 10,
        country: 'Italia',
        city: project.projectLocation?.split(',')[0] || 'N/A',
        certificationStatus: project.certificationStatus || 'pending',
        certificateNumber: project.certificateNumber,
        certificateIssueDate: project.certificateIssueDate,  
        blockchainRecorded: project.blockchainRecorded || false,
        blockchainTxHash: project.blockchainTxHash
      }));
      setProjects(mappedProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
    }
  }, [refreshKey]);

  const refetchProjects = () => {
    setRefreshKey(prev => prev + 1);
  };

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
        <span className="ml-2">Caricamento progetti...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Monitoraggio Progetti</h1>
          <p className="text-gray-600">Monitora in tempo reale lo stato dei tuoi progetti di certificazione CO₂</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Aggiorna
          </Button>
          <Badge variant="outline" className="flex items-center gap-1">
            <Activity className="h-3 w-3" />
            Tempo Reale
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Progetti Totali</p>
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
                <p className="text-sm text-gray-600">Progetti Attivi</p>
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
                <p className="text-sm text-gray-600">Progetti Completati</p>
                <p className="text-2xl font-bold">
                  {projects.filter((p: DashboardProject) => ['approved', 'completed'].includes(p.status)).length}
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
                <p className="text-sm text-gray-600">Riduzione CO₂ Totale</p>
                <p className="text-2xl font-bold">
                  {projects.reduce((sum, p) => sum + parseFloat(p.estimatedCO2Reduction), 0).toFixed(1)}t
                </p>
              </div>
              <Leaf className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Management Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Panoramica Progetti
              </CardTitle>
              <CardDescription>
                Monitora in tempo reale lo stato dei tuoi progetti di certificazione CO₂
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cerca progetti..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">Tutti gli stati</option>
                <option value="draft">Bozza</option>
                <option value="submitted">Inviato</option>
                <option value="under-review">In Revisione</option>
                <option value="approved">Approvato</option>
                <option value="in-progress">In Corso</option>
                <option value="completed">Completato</option>
                <option value="rejected">Rifiutato</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Seleziona un Progetto</h3>
              <p className="text-gray-600">Scegli un progetto dalla lista per vedere i dettagli completi</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getProjectTypeIcon(project.projectType)}
                        <h3 className="text-lg font-semibold text-gray-900">{project.projectName}</h3>
                        <Badge 
                          variant="outline" 
                          className={cn("text-white", getStatusColor(project.status))}
                        >
                          {project.status.replace('-', ' ')}
                        </Badge>
                        {project.blockchainRecorded && (
                          <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                            Blockchain ✓
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Località:</span> {project.city}, {project.country}
                        </div>
                        <div>
                          <span className="font-medium">CO₂ Riduzione:</span> {project.estimatedCO2Reduction}t
                        </div>
                        <div>
                          <span className="font-medium">Progresso:</span> {project.progressPercentage}%
                        </div>
                        <div>
                          <span className="font-medium">Aggiornato:</span> {project.lastUpdated}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedProjectForDetails(project);
                          setShowProjectDetails(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Dettagli
                      </Button>
                    </div>
                  </div>
                  
                  {/* Progress bar with status-based colors */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Progresso Certificazione</span>
                      <span>{project.progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={cn(
                          "h-2 rounded-full transition-all duration-500",
                          project.status === 'approved' && "bg-gradient-to-r from-green-400 to-green-600",
                          project.status === 'in-progress' && "bg-gradient-to-r from-blue-400 to-blue-600", 
                          project.status === 'under-review' && "bg-gradient-to-r from-yellow-400 to-yellow-600",
                          project.status === 'completed' && "bg-gradient-to-r from-emerald-400 to-emerald-600",
                          !['approved', 'in-progress', 'under-review', 'completed'].includes(project.status) && "bg-gradient-to-r from-gray-400 to-gray-600"
                        )}
                        style={{ width: `${project.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Project Details Modal */}
      {showProjectDetails && selectedProjectForDetails && (
        <ProjectDetailsModal
          project={selectedProjectForDetails}
          isOpen={showProjectDetails}
          onClose={() => {
            setShowProjectDetails(false);
            setSelectedProjectForDetails(null);
          }}
        />
      )}
    </div>
  );
}