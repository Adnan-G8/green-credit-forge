import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';
import { 
  Tractor, 
  Wind, 
  Trees,
  Calendar, 
  MapPin, 
  Euro,
  TrendingUp,
  Leaf,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProjectDetailsModal } from './project-details-modal';

interface Project {
  id: string;
  ownerId: string;
  projectName: string;
  projectType: 'carbon-farming' | 'renewable-energy' | 'forestation';
  projectDescription: string;
  projectLocation: string;
  projectDuration: number;
  investmentCapacity: number;
  projectStartDate: string;
  estimatedCompletionDate: string;
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'in-progress' | 'completed' | 'rejected';
  certificationStatus: 'pending' | 'approved' | 'certified' | 'rejected';
  createdAt: string;
  blockchainRecorded: boolean;
  // Carbon farming specific
  cropType?: string;
  farmingMethod?: string;
  cultivatedArea?: number;
  expectedCO2Sequestration?: number;
  // Renewable energy specific (EUFD2025-001)
  energyType?: string;
  historicalYears?: number;
  electricalCapacity?: number;
  thermalCapacity?: number;
  installedCapacity?: number; // Legacy field compatibility
  expectedCO2Reduction?: number;
  energyLocation?: string;
  // Forestation specific
  forestType?: string;
  treeSpecies?: string;
  forestArea?: number;
  treeDensity?: number;
  expectedForestCO2?: number;
}

interface MyProjectsDisplayProps {
  userId: string;
  onCreateNew?: () => void;
}

export function MyProjectsDisplay({ userId, onCreateNew }: MyProjectsDisplayProps) {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    // Load projects from localStorage
    const loadProjects = () => {
      try {
        const storedProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
        
        // Filter projects for current user
        const userProjects = storedProjects.filter((project: Project) => project.ownerId === userId);
        
        setProjects(userProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();

    // Listen for storage changes to update projects when new ones are added
    const handleStorageChange = () => {
      loadProjects();
    };

    window.addEventListener('storage', handleStorageChange);
    // Also listen for manual updates (within same tab)
    window.addEventListener('projectsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('projectsUpdated', handleStorageChange);
    };
  }, [userId]);

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'carbon-farming': return <Tractor className="h-5 w-5" />;
      case 'renewable-energy': return <Wind className="h-5 w-5" />;
      case 'forestation': return <Trees className="h-5 w-5" />;
      default: return <Leaf className="h-5 w-5" />;
    }
  };

  const getProjectTypeLabel = (type: string) => {
    switch (type) {
      case 'carbon-farming': return t('project-carbon-farming');
      case 'renewable-energy': return t('project-renewable-energy');
      case 'forestation': return t('project-forestation');
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'approved': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'under-review': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'submitted': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'under-review': return <Clock className="h-4 w-4" />;
      case 'submitted': return <TrendingUp className="h-4 w-4" />;
      case 'rejected': return <AlertCircle className="h-4 w-4" />;
      case 'draft': return <Edit className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT');
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setShowDetailsModal(true);
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-emerald-600" />
            {t('my-projects')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (projects.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-emerald-600" />
            {t('my-projects')}
          </CardTitle>
          <CardDescription>
            Panoramica dei progetti di certificazione CO₂ in corso e completati
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nessun progetto ancora
            </h3>
            <p className="text-gray-600 mb-6">
              Crea il tuo primo progetto di certificazione CO₂ per iniziare il monitoraggio delle emissioni
            </p>
            {onCreateNew && (
              <Button onClick={onCreateNew} className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                {t('project-create-new')}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-emerald-600" />
              {t('my-projects')} ({projects.length})
            </div>
            {onCreateNew && (
              <Button onClick={onCreateNew} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                {t('project-create-new')}
              </Button>
            )}
          </CardTitle>
          <CardDescription>
            Panoramica dei progetti di certificazione CO₂ in corso e completati  
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-700 mb-1">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">{t('active-projects')}</span>
              </div>
              <div className="text-2xl font-bold text-green-800">
                {projects.filter(p => ['approved', 'in-progress', 'completed'].includes(p.status)).length}
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 text-blue-700 mb-1">
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">{t('total-investment')}</span>
              </div>
              <div className="text-2xl font-bold text-blue-800">
                {formatCurrency(projects.reduce((sum, p) => sum + p.investmentCapacity, 0))}
              </div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2 text-emerald-700 mb-1">
                <Leaf className="h-4 w-4" />
                <span className="font-medium">{t('co2-impact')}</span>
              </div>
              <div className="text-2xl font-bold text-emerald-800">
                {Math.round(projects.reduce((sum, p) => {
                  return sum + (p.expectedCO2Sequestration || p.expectedCO2Reduction || 0);
                }, 0))} t/anno
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getProjectTypeIcon(project.projectType)}
                  <div>
                    <CardTitle className="text-lg">
                      {project.projectName || `Progetto ${getProjectTypeLabel(project.projectType)} #${project.id.slice(-6)}`}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      {getProjectTypeLabel(project.projectType)}
                      {project.projectLocation && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {project.projectLocation}
                          </span>
                        </>
                      )}
                    </CardDescription>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={cn("flex items-center gap-1", getStatusColor(project.status))}
                >
                  {getStatusIcon(project.status)}
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">
                {project.projectDescription || `Progetto ${getProjectTypeLabel(project.projectType)} in fase di completamento`}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Euro className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Investimento:</span>
                  <span className="font-medium">
                    {project.investmentCapacity ? formatCurrency(project.investmentCapacity) : 'Da definire'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Durata:</span>
                  <span className="font-medium">
                    {project.projectDuration ? `${project.projectDuration} anni` : 'Da definire'}
                  </span>
                </div>
              </div>

              {project.projectType === 'carbon-farming' && project.cultivatedArea && (
                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                  <div className="text-sm">
                    <span className="text-emerald-700 font-medium">{project.cultivatedArea} ha</span>
                    <span className="text-gray-600 mx-2">•</span>
                    <span className="text-emerald-700 font-medium">{project.expectedCO2Sequestration} t CO₂/anno</span>
                  </div>
                  <div className="text-xs text-emerald-600 mt-1">
                    {project.cropType} - {project.farmingMethod}
                  </div>
                </div>
              )}

              {project.projectType === 'renewable-energy' && project.installedCapacity && (
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="text-sm">
                    <span className="text-blue-700 font-medium">{project.installedCapacity} kW</span>
                    <span className="text-gray-600 mx-2">•</span>
                    <span className="text-blue-700 font-medium">{project.expectedCO2Reduction} t CO₂/anno</span>
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    {project.energyType}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="text-xs text-gray-500">
                  Creato: {formatDate(project.createdAt)}
                </div>
                <div className="flex items-center gap-2">
                  {project.blockchainRecorded && (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      Blockchain
                    </Badge>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(project)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Dettagli
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Project Details Modal */}
      <ProjectDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        project={selectedProject}
      />
    </div>
  );
}