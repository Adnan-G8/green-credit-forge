import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from './language-provider';
import { X, Leaf, Trees, Zap, Key, Shield, CheckCircle, ArrowLeft } from 'lucide-react';

interface RegisterProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ProjectType = 'agriculture' | 'forestation' | 'renewable' | null;

export function RegisterProjectModal({ isOpen, onClose }: RegisterProjectModalProps) {
  const [step, setStep] = useState<'selection' | 'verification'>('selection');
  const [selectedProject, setSelectedProject] = useState<ProjectType>(null);
  const [alphaG8Id, setAlphaG8Id] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep('selection');
      setSelectedProject(null);
      setAlphaG8Id('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const projectTypes = [
    {
      id: 'agriculture' as ProjectType,
      title: language === 'it' ? 'Progetti Agricoli' : 'Agriculture Projects',
      description: language === 'it' 
        ? 'Certificazione CO₂ per pratiche agricole sostenibili e sequestro del carbonio nel suolo'
        : 'CO₂ certification for sustainable farming practices and soil carbon sequestration',
      icon: Leaf,
      color: 'from-green-500 to-emerald-600',
      standards: 'ISO 14064-2 | EUFD2025-001'
    },
    {
      id: 'forestation' as ProjectType,
      title: language === 'it' ? 'Progetti Forestali' : 'Forestation Projects',
      description: language === 'it'
        ? 'Certificazione per rimboschimento, gestione forestale sostenibile e conservazione'
        : 'Certification for reforestation, sustainable forest management and conservation',
      icon: Trees,
      color: 'from-emerald-600 to-green-700',
      standards: 'ISO 14064-2 | EUFD2025-001'
    },
    {
      id: 'renewable' as ProjectType,
      title: language === 'it' ? 'Energia Rinnovabile' : 'Renewable Energy',
      description: language === 'it'
        ? 'Certificazione per progetti di energia solare, eolica e altre fonti rinnovabili'
        : 'Certification for solar, wind and other renewable energy projects',
      icon: Zap,
      color: 'from-blue-500 to-indigo-600',
      standards: 'ISO 14064-1 | EUFD2025-001'
    }
  ];

  const handleProjectSelect = (projectId: ProjectType) => {
    setSelectedProject(projectId);
    setStep('verification');
  };

  const handleVerification = async () => {
    if (!alphaG8Id.trim()) {
      toast({
        title: language === 'it' ? 'Errore' : 'Error',
        description: language === 'it' 
          ? 'Inserisci il tuo ALPHAG8 ID KEY' 
          : 'Please enter your ALPHAG8 ID KEY',
        variant: 'destructive',
      });
      return;
    }

    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      toast({
        title: language === 'it' ? 'Progetto Registrato' : 'Project Registered',
        description: language === 'it'
          ? 'Il tuo progetto è stato registrato con successo. Riceverai conferma via email.'
          : 'Your project has been successfully registered. You will receive confirmation via email.',
      });
      onClose();
    }, 2000);
  };

  const handleBack = () => {
    setStep('selection');
    setSelectedProject(null);
    setAlphaG8Id('');
  };

  const selectedProjectData = projectTypes.find(p => p.id === selectedProject);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-5xl mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
           onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-50/80 to-white border-b border-slate-200/80 px-10 py-8 relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-8 w-10 h-10 rounded-full bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center transition-all duration-200 shadow-sm"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
          
          <div className="flex items-center justify-between pr-16">
            <div className="flex items-center space-x-6">
              {step === 'verification' && (
                <button
                  onClick={handleBack}
                  className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors mr-2"
                >
                  <ArrowLeft className="h-6 w-6 text-slate-600" />
                </button>
              )}
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                {step === 'selection' ? (
                  <Leaf className="h-8 w-8 text-white" />
                ) : (
                  <Key className="h-8 w-8 text-white" />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-light text-slate-900 mb-2">
                  {step === 'selection' 
                    ? (language === 'it' ? 'Registra Progetto' : 'Register Project')
                    : (language === 'it' ? 'Verifica Identità' : 'Identity Verification')
                  }
                </h1>
                <p className="text-slate-600">
                  {step === 'selection' 
                    ? (language === 'it' ? 'Seleziona il tipo di progetto CO₂' : 'Select your CO₂ project type')
                    : (language === 'it' ? 'Verifica il tuo ALPHAG8 ID KEY' : 'Verify your ALPHAG8 ID KEY')
                  }
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-2xl font-medium shadow-lg">
              {language === 'it' ? 'FAGRI Membro' : 'FAGRI Member'}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-10 bg-gradient-to-br from-slate-50/50 to-white min-h-[500px]">
          {step === 'selection' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projectTypes.map((project) => {
                const Icon = project.icon;
                return (
                  <div
                    key={project.id}
                    onClick={() => handleProjectSelect(project.id)}
                    className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] group"
                  >
                    <div className={`w-20 h-20 bg-gradient-to-br ${project.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-medium text-slate-900 mb-4">{project.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{project.description}</p>
                    
                    <div className="bg-slate-50 rounded-xl p-4 mb-6">
                      <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                        {language === 'it' ? 'Standard Applicabili' : 'Applicable Standards'}
                      </p>
                      <p className="text-sm font-mono text-slate-700">{project.standards}</p>
                    </div>
                    
                    <Button 
                      className={`w-full bg-gradient-to-r ${project.color} hover:shadow-lg text-white font-medium transition-all duration-200`}
                      size="lg"
                    >
                      {language === 'it' ? 'Seleziona Progetto' : 'Select Project'}
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              {/* Selected Project Info */}
              {selectedProjectData && (
                <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-lg mb-8">
                  <div className="flex items-center space-x-6 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${selectedProjectData.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <selectedProjectData.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-light text-slate-900 mb-2">{selectedProjectData.title}</h3>
                      <p className="text-slate-600">{selectedProjectData.description}</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                      {language === 'it' ? 'Standard di Certificazione' : 'Certification Standards'}
                    </p>
                    <p className="text-sm font-mono text-slate-700">{selectedProjectData.standards}</p>
                  </div>
                </div>
              )}

              {/* ALPHAG8 ID Verification */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-lg">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Key className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-slate-900">
                      {language === 'it' ? 'Verifica ALPHAG8 ID KEY' : 'ALPHAG8 ID KEY Verification'}
                    </h3>
                    <p className="text-slate-600">
                      {language === 'it' 
                        ? 'Inserisci il tuo ID per procedere con la registrazione del progetto'
                        : 'Enter your ID to proceed with project registration'
                      }
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      {language === 'it' ? 'ALPHAG8 ID KEY' : 'ALPHAG8 ID KEY'}
                    </label>
                    <Input
                      type="text"
                      value={alphaG8Id}
                      onChange={(e) => setAlphaG8Id(e.target.value.toUpperCase())}
                      placeholder="FAGRI-XXXXXXXX-XXXXXXXX-XX"
                      className="w-full text-center font-mono text-lg py-4 rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center space-x-3 text-sm text-slate-600 bg-slate-50 rounded-xl p-4">
                    <Shield className="h-4 w-4 text-emerald-600" />
                    <span>
                      {language === 'it'
                        ? 'Protetto da sicurezza bancaria svizzera'
                        : 'Protected by Swiss banking security'
                      }
                    </span>
                  </div>

                  <Button
                    onClick={handleVerification}
                    disabled={isVerifying || !alphaG8Id.trim()}
                    size="lg"
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-medium shadow-lg"
                  >
                    {isVerifying ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{language === 'it' ? 'Verifica in corso...' : 'Verifying...'}</span>
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
          )}
        </div>
      </div>
    </div>
  );
}